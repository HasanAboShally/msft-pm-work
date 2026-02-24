/**
 * Fabric API Client
 * Wraps Microsoft Fabric REST APIs for workspace/dataset refresh operations.
 * Uses bearer token from FABRIC_TOKEN env var.
 */

const FABRIC_API_BASE = "https://api.fabric.microsoft.com/v1";

function getToken(): string {
  const token = process.env.FABRIC_TOKEN;
  if (!token) {
    throw new Error(
      "FABRIC_TOKEN environment variable is not set. " +
      "Get a token from https://learn.microsoft.com/en-us/rest/api/fabric/articles/get-started/fabric-api-quickstart"
    );
  }
  return token;
}

async function fabricFetch(path: string, options: RequestInit = {}): Promise<any> {
  const token = getToken();
  const url = `${FABRIC_API_BASE}${path}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    throw new Error(`Fabric API error ${response.status}: ${response.statusText}\n${errorBody}`);
  }

  // Some endpoints return 202 with no body (async operations)
  if (response.status === 202) {
    return { status: "accepted", operationId: response.headers.get("x-ms-operation-id") };
  }

  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

// ─── Workspace Operations ───────────────────────────────────

export interface FabricWorkspace {
  id: string;
  displayName: string;
  description: string;
  type: string;
  capacityId: string;
}

export async function listWorkspaces(): Promise<FabricWorkspace[]> {
  const result = await fabricFetch("/workspaces");
  return result.value || [];
}

// ─── Item (Dataset / Semantic Model) Operations ─────────────

export interface FabricItem {
  id: string;
  displayName: string;
  description: string;
  type: string;
  workspaceId: string;
}

export async function listItems(workspaceId: string, type?: string): Promise<FabricItem[]> {
  let path = `/workspaces/${workspaceId}/items`;
  if (type) path += `?type=${type}`;
  const result = await fabricFetch(path);
  return result.value || [];
}

export async function listSemanticModels(workspaceId: string): Promise<FabricItem[]> {
  return listItems(workspaceId, "SemanticModel");
}

export async function listLakehouses(workspaceId: string): Promise<FabricItem[]> {
  return listItems(workspaceId, "Lakehouse");
}

// ─── Refresh Operations (Enhanced Power BI API) ─────────────

const PBI_API_BASE = "https://api.powerbi.com/v1.0/myorg";

async function pbiFetch(path: string, options: RequestInit = {}): Promise<any> {
  const token = getToken();
  const url = `${PBI_API_BASE}${path}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    throw new Error(`Power BI API error ${response.status}: ${response.statusText}\n${errorBody}`);
  }

  if (response.status === 202) {
    return { status: "accepted", requestId: response.headers.get("requestid") };
  }

  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

export interface RefreshEntry {
  requestId: string;
  id: number;
  refreshType: string;
  startTime: string;
  endTime: string;
  status: "Unknown" | "Completed" | "Failed" | "Disabled" | "InProgress" | "Cancelled";
  serviceExceptionJson?: string;
}

export async function getRefreshHistory(groupId: string, datasetId: string): Promise<RefreshEntry[]> {
  const result = await pbiFetch(`/groups/${groupId}/datasets/${datasetId}/refreshes?$top=10`);
  return result.value || [];
}

export async function triggerRefresh(groupId: string, datasetId: string): Promise<{ status: string; requestId?: string | null }> {
  return pbiFetch(`/groups/${groupId}/datasets/${datasetId}/refreshes`, {
    method: "POST",
    body: JSON.stringify({ notifyOption: "NoNotification" }),
  });
}

// ─── Datasets list (Power BI API — needed for refresh ops) ──

export interface PbiDataset {
  id: string;
  name: string;
  isRefreshable: boolean;
  configuredBy: string;
  defaultRetentionPolicy: string;
  createdDate: string;
}

export async function listDatasets(groupId: string): Promise<PbiDataset[]> {
  const result = await pbiFetch(`/groups/${groupId}/datasets`);
  return result.value || [];
}

// ─── Workspace Provisioning ─────────────────────────────────

export interface CreateWorkspaceRequest {
  displayName: string;
  description?: string;
  capacityId?: string;
}

export async function createWorkspace(req: CreateWorkspaceRequest): Promise<FabricWorkspace> {
  return fabricFetch("/workspaces", {
    method: "POST",
    body: JSON.stringify(req),
  });
}

export async function deleteWorkspace(workspaceId: string): Promise<void> {
  await fabricFetch(`/workspaces/${workspaceId}`, { method: "DELETE" });
}

export type FabricItemType =
  | "Lakehouse" | "Warehouse" | "Notebook" | "SemanticModel"
  | "DataPipeline" | "Report" | "Eventhouse" | "KQLDatabase"
  | "Environment" | "SparkJobDefinition" | "MLExperiment" | "MLModel"
  | "Eventstream" | "SQLDatabase" | "Dataflow" | "GraphQLApi";

export interface CreateItemRequest {
  displayName: string;
  type: FabricItemType;
  description?: string;
}

export async function createItem(workspaceId: string, req: CreateItemRequest): Promise<FabricItem & { status?: string }> {
  return fabricFetch(`/workspaces/${workspaceId}/items`, {
    method: "POST",
    body: JSON.stringify(req),
  });
}

export interface FabricCapacity {
  id: string;
  displayName: string;
  sku: string;
  region: string;
  state: string;
}

export async function listCapacities(): Promise<FabricCapacity[]> {
  const result = await fabricFetch("/capacities");
  return result.value || [];
}

// ─── Deployment Pipelines ───────────────────────────────────

export interface DeploymentPipeline {
  id: string;
  displayName: string;
  description: string;
}

export async function listPipelines(): Promise<DeploymentPipeline[]> {
  const result = await fabricFetch("/deploymentPipelines");
  return result.value || [];
}

export interface PipelineStage {
  id: string;
  order: number;
  displayName: string;
  description: string;
  workspaceId?: string;
  workspaceName?: string;
  isPublic: boolean;
}

export async function getPipelineStages(pipelineId: string): Promise<PipelineStage[]> {
  const result = await fabricFetch(`/deploymentPipelines/${pipelineId}/stages`);
  return result.value || [];
}

export interface StageItem {
  itemId: string;
  itemDisplayName: string;
  itemType: string;
  lastDeploymentTime?: string;
  sourceItemId?: string;
  targetItemId?: string;
}

export async function getStageItems(pipelineId: string, stageId: string): Promise<StageItem[]> {
  const result = await fabricFetch(`/deploymentPipelines/${pipelineId}/stages/${stageId}/items`);
  return result.value || [];
}

export interface PipelineOperation {
  id: string;
  type: string;
  status: "NotStarted" | "Running" | "Succeeded" | "Failed";
  lastUpdatedTime: string;
  executionStartTime: string;
  executionEndTime: string;
  sourceStageId: string;
  targetStageId: string;
  note?: { content: string; isTruncated: boolean };
  preDeploymentDiffInformation: {
    newItemsCount: number;
    differentItemsCount: number;
    noDifferenceItemsCount: number;
  };
  performedBy: {
    id: string;
    type: string;
    displayName?: string;
  };
}

export async function getPipelineOperations(pipelineId: string): Promise<PipelineOperation[]> {
  const result = await fabricFetch(`/deploymentPipelines/${pipelineId}/operations`);
  return result.value || [];
}

export interface DeployRequest {
  sourceStageId: string;
  targetStageId: string;
  note?: string;
  items?: { sourceItemId: string; itemType: string }[];
}

export async function deployStage(pipelineId: string, req: DeployRequest): Promise<{ status: string; operationId?: string | null }> {
  return fabricFetch(`/deploymentPipelines/${pipelineId}/deploy`, {
    method: "POST",
    body: JSON.stringify(req),
  });
}

// ─── Workspace Role Assignments ─────────────────────────────

export interface WorkspaceRoleAssignment {
  id: string;
  principal: {
    id: string;
    displayName: string;
    type: "User" | "Group" | "ServicePrincipal" | "ServicePrincipalProfile";
  };
  role: "Admin" | "Member" | "Contributor" | "Viewer";
}

export async function getWorkspaceRoleAssignments(workspaceId: string): Promise<WorkspaceRoleAssignment[]> {
  const result = await fabricFetch(`/workspaces/${workspaceId}/roleAssignments`);
  return result.value || [];
}
