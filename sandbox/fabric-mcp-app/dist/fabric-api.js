/**
 * Fabric API Client
 * Wraps Microsoft Fabric REST APIs for workspace/dataset refresh operations.
 * Uses bearer token from FABRIC_TOKEN env var.
 */
const FABRIC_API_BASE = "https://api.fabric.microsoft.com/v1";
function getToken() {
    const token = process.env.FABRIC_TOKEN;
    if (!token) {
        throw new Error("FABRIC_TOKEN environment variable is not set. " +
            "Get a token from https://learn.microsoft.com/en-us/rest/api/fabric/articles/get-started/fabric-api-quickstart");
    }
    return token;
}
async function fabricFetch(path, options = {}) {
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
export async function listWorkspaces() {
    const result = await fabricFetch("/workspaces");
    return result.value || [];
}
export async function listItems(workspaceId, type) {
    let path = `/workspaces/${workspaceId}/items`;
    if (type)
        path += `?type=${type}`;
    const result = await fabricFetch(path);
    return result.value || [];
}
export async function listSemanticModels(workspaceId) {
    return listItems(workspaceId, "SemanticModel");
}
export async function listLakehouses(workspaceId) {
    return listItems(workspaceId, "Lakehouse");
}
// ─── Refresh Operations (Enhanced Power BI API) ─────────────
const PBI_API_BASE = "https://api.powerbi.com/v1.0/myorg";
async function pbiFetch(path, options = {}) {
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
export async function getRefreshHistory(groupId, datasetId) {
    const result = await pbiFetch(`/groups/${groupId}/datasets/${datasetId}/refreshes?$top=10`);
    return result.value || [];
}
export async function triggerRefresh(groupId, datasetId) {
    return pbiFetch(`/groups/${groupId}/datasets/${datasetId}/refreshes`, {
        method: "POST",
        body: JSON.stringify({ notifyOption: "NoNotification" }),
    });
}
export async function listDatasets(groupId) {
    const result = await pbiFetch(`/groups/${groupId}/datasets`);
    return result.value || [];
}
export async function createWorkspace(req) {
    return fabricFetch("/workspaces", {
        method: "POST",
        body: JSON.stringify(req),
    });
}
export async function deleteWorkspace(workspaceId) {
    await fabricFetch(`/workspaces/${workspaceId}`, { method: "DELETE" });
}
export async function createItem(workspaceId, req) {
    return fabricFetch(`/workspaces/${workspaceId}/items`, {
        method: "POST",
        body: JSON.stringify(req),
    });
}
export async function listCapacities() {
    const result = await fabricFetch("/capacities");
    return result.value || [];
}
export async function listPipelines() {
    const result = await fabricFetch("/deploymentPipelines");
    return result.value || [];
}
export async function getPipelineStages(pipelineId) {
    const result = await fabricFetch(`/deploymentPipelines/${pipelineId}/stages`);
    return result.value || [];
}
export async function getStageItems(pipelineId, stageId) {
    const result = await fabricFetch(`/deploymentPipelines/${pipelineId}/stages/${stageId}/items`);
    return result.value || [];
}
export async function getPipelineOperations(pipelineId) {
    const result = await fabricFetch(`/deploymentPipelines/${pipelineId}/operations`);
    return result.value || [];
}
export async function deployStage(pipelineId, req) {
    return fabricFetch(`/deploymentPipelines/${pipelineId}/deploy`, {
        method: "POST",
        body: JSON.stringify(req),
    });
}
export async function getWorkspaceRoleAssignments(workspaceId) {
    const result = await fabricFetch(`/workspaces/${workspaceId}/roleAssignments`);
    return result.value || [];
}
