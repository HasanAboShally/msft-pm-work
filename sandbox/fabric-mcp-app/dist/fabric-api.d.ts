/**
 * Fabric API Client
 * Wraps Microsoft Fabric REST APIs for workspace/dataset refresh operations.
 * Uses bearer token from FABRIC_TOKEN env var.
 */
export interface FabricWorkspace {
    id: string;
    displayName: string;
    description: string;
    type: string;
    capacityId: string;
}
export declare function listWorkspaces(): Promise<FabricWorkspace[]>;
export interface FabricItem {
    id: string;
    displayName: string;
    description: string;
    type: string;
    workspaceId: string;
}
export declare function listItems(workspaceId: string, type?: string): Promise<FabricItem[]>;
export declare function listSemanticModels(workspaceId: string): Promise<FabricItem[]>;
export declare function listLakehouses(workspaceId: string): Promise<FabricItem[]>;
export interface RefreshEntry {
    requestId: string;
    id: number;
    refreshType: string;
    startTime: string;
    endTime: string;
    status: "Unknown" | "Completed" | "Failed" | "Disabled" | "InProgress" | "Cancelled";
    serviceExceptionJson?: string;
}
export declare function getRefreshHistory(groupId: string, datasetId: string): Promise<RefreshEntry[]>;
export declare function triggerRefresh(groupId: string, datasetId: string): Promise<{
    status: string;
    requestId?: string | null;
}>;
export interface PbiDataset {
    id: string;
    name: string;
    isRefreshable: boolean;
    configuredBy: string;
    defaultRetentionPolicy: string;
    createdDate: string;
}
export declare function listDatasets(groupId: string): Promise<PbiDataset[]>;
export interface CreateWorkspaceRequest {
    displayName: string;
    description?: string;
    capacityId?: string;
}
export declare function createWorkspace(req: CreateWorkspaceRequest): Promise<FabricWorkspace>;
export declare function deleteWorkspace(workspaceId: string): Promise<void>;
export type FabricItemType = "Lakehouse" | "Warehouse" | "Notebook" | "SemanticModel" | "DataPipeline" | "Report" | "Eventhouse" | "KQLDatabase" | "Environment" | "SparkJobDefinition" | "MLExperiment" | "MLModel" | "Eventstream" | "SQLDatabase" | "Dataflow" | "GraphQLApi";
export interface CreateItemRequest {
    displayName: string;
    type: FabricItemType;
    description?: string;
}
export declare function createItem(workspaceId: string, req: CreateItemRequest): Promise<FabricItem & {
    status?: string;
}>;
export interface FabricCapacity {
    id: string;
    displayName: string;
    sku: string;
    region: string;
    state: string;
}
export declare function listCapacities(): Promise<FabricCapacity[]>;
export interface DeploymentPipeline {
    id: string;
    displayName: string;
    description: string;
}
export declare function listPipelines(): Promise<DeploymentPipeline[]>;
export interface PipelineStage {
    id: string;
    order: number;
    displayName: string;
    description: string;
    workspaceId?: string;
    workspaceName?: string;
    isPublic: boolean;
}
export declare function getPipelineStages(pipelineId: string): Promise<PipelineStage[]>;
export interface StageItem {
    itemId: string;
    itemDisplayName: string;
    itemType: string;
    lastDeploymentTime?: string;
    sourceItemId?: string;
    targetItemId?: string;
}
export declare function getStageItems(pipelineId: string, stageId: string): Promise<StageItem[]>;
export interface PipelineOperation {
    id: string;
    type: string;
    status: "NotStarted" | "Running" | "Succeeded" | "Failed";
    lastUpdatedTime: string;
    executionStartTime: string;
    executionEndTime: string;
    sourceStageId: string;
    targetStageId: string;
    note?: {
        content: string;
        isTruncated: boolean;
    };
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
export declare function getPipelineOperations(pipelineId: string): Promise<PipelineOperation[]>;
export interface DeployRequest {
    sourceStageId: string;
    targetStageId: string;
    note?: string;
    items?: {
        sourceItemId: string;
        itemType: string;
    }[];
}
export declare function deployStage(pipelineId: string, req: DeployRequest): Promise<{
    status: string;
    operationId?: string | null;
}>;
export interface WorkspaceRoleAssignment {
    id: string;
    principal: {
        id: string;
        displayName: string;
        type: "User" | "Group" | "ServicePrincipal" | "ServicePrincipalProfile";
    };
    role: "Admin" | "Member" | "Contributor" | "Viewer";
}
export declare function getWorkspaceRoleAssignments(workspaceId: string): Promise<WorkspaceRoleAssignment[]>;
