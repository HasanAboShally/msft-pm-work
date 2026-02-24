/**
 * Fabric MCP App Server
 * Registers interactive UI tools for Fabric workspace management.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerAppTool, registerAppResource, RESOURCE_MIME_TYPE, } from "@modelcontextprotocol/ext-apps/server";
import { z } from "zod";
import { listWorkspaces, listDatasets, listItems, getRefreshHistory, triggerRefresh, createWorkspace, deleteWorkspace, createItem, listCapacities, listPipelines, getPipelineStages, getStageItems, getPipelineOperations, deployStage, getWorkspaceRoleAssignments, } from "./fabric-api.js";
// Resolve the dist directory (works both in dev/tsx and compiled mode)
const DIST_DIR = import.meta.filename?.endsWith(".ts")
    ? path.join(import.meta.dirname, "dist")
    : import.meta.dirname;
// ─── Create Server ──────────────────────────────────────────
export function createServer() {
    const server = new McpServer({
        name: "fabric-mcp-app",
        version: "1.0.0",
    });
    // ── Refresh Card App (UI tool) ──────────────────────────────
    const refreshCardUri = "ui://refresh-card/mcp-app.html";
    registerAppTool(server, "workspace_refresh_card", {
        title: "Workspace Refresh Card",
        description: "Open an interactive Fabric-styled dashboard to view and manage dataset refreshes in a workspace. " +
            "Shows refresh history, status indicators, and lets you trigger new refreshes.",
        inputSchema: {
            workspaceId: z.string().optional().describe("The Fabric workspace ID (GUID). If omitted, the app will let you pick a workspace."),
        },
        _meta: { ui: { resourceUri: refreshCardUri } },
    }, async (args) => {
        // When the tool is called by the LLM, return initial data
        if (args.workspaceId) {
            const datasets = await listDatasets(args.workspaceId);
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify({
                            workspaceId: args.workspaceId,
                            datasets: datasets.map((d) => ({
                                id: d.id,
                                name: d.name,
                                isRefreshable: d.isRefreshable,
                                configuredBy: d.configuredBy,
                            })),
                        }),
                    },
                ],
            };
        }
        // No workspace specified — list available workspaces
        const workspaces = await listWorkspaces();
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({
                        workspaces: workspaces.map((w) => ({
                            id: w.id,
                            displayName: w.displayName,
                        })),
                    }),
                },
            ],
        };
    });
    // Serve the bundled HTML app as a resource
    registerAppResource(server, refreshCardUri, refreshCardUri, { mimeType: RESOURCE_MIME_TYPE }, async () => {
        const htmlPath = path.join(DIST_DIR, "mcp-app.html");
        const html = await fs.readFile(htmlPath, "utf-8");
        return {
            contents: [
                {
                    uri: refreshCardUri,
                    mimeType: RESOURCE_MIME_TYPE,
                    text: html,
                },
            ],
        };
    });
    // ── Backend tools (called by the app UI via app.callServerTool) ──
    registerAppTool(server, "list_workspaces", {
        title: "List Workspaces",
        description: "List all accessible Fabric workspaces",
        inputSchema: {},
        _meta: { ui: { resourceUri: refreshCardUri, visibility: ["app"] } },
    }, async () => {
        const workspaces = await listWorkspaces();
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(workspaces.map((w) => ({
                        id: w.id,
                        displayName: w.displayName,
                        description: w.description,
                    }))),
                },
            ],
        };
    });
    registerAppTool(server, "list_datasets", {
        title: "List Datasets",
        description: "List datasets (semantic models) in a workspace",
        inputSchema: { workspaceId: z.string().describe("Workspace ID (GUID)") },
        _meta: { ui: { resourceUri: refreshCardUri, visibility: ["app"] } },
    }, async ({ workspaceId }) => {
        const datasets = await listDatasets(workspaceId);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(datasets.map((d) => ({
                        id: d.id,
                        name: d.name,
                        isRefreshable: d.isRefreshable,
                        configuredBy: d.configuredBy,
                        createdDate: d.createdDate,
                    }))),
                },
            ],
        };
    });
    registerAppTool(server, "get_refresh_history", {
        title: "Get Refresh History",
        description: "Get refresh history for a dataset",
        inputSchema: {
            workspaceId: z.string().describe("Workspace ID (GUID)"),
            datasetId: z.string().describe("Dataset ID (GUID)"),
        },
        _meta: { ui: { resourceUri: refreshCardUri, visibility: ["app"] } },
    }, async ({ workspaceId, datasetId }) => {
        const history = await getRefreshHistory(workspaceId, datasetId);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(history),
                },
            ],
        };
    });
    registerAppTool(server, "trigger_refresh", {
        title: "Trigger Refresh",
        description: "Trigger a dataset refresh",
        inputSchema: {
            workspaceId: z.string().describe("Workspace ID (GUID)"),
            datasetId: z.string().describe("Dataset ID (GUID)"),
        },
        _meta: { ui: { resourceUri: refreshCardUri, visibility: ["app"] } },
    }, async ({ workspaceId, datasetId }) => {
        const result = await triggerRefresh(workspaceId, datasetId);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({
                        success: true,
                        message: "Refresh triggered successfully",
                        ...result,
                    }),
                },
            ],
        };
    });
    // ════════════════════════════════════════════════════════════
    // ── Workspace Quick-Provisioner App ─────────────────────────
    // ════════════════════════════════════════════════════════════
    const provisionerUri = "ui://workspace-provisioner/workspace-provisioner.html";
    registerAppTool(server, "workspace_provisioner", {
        title: "Workspace Quick-Provisioner",
        description: "Open an interactive wizard to quickly provision a new Fabric workspace with pre-configured items " +
            "(Lakehouse, Warehouse, Notebook, Pipeline, etc.). Supports templates for common scenarios.",
        inputSchema: {
            workspaceName: z.string().optional().describe("Pre-fill the workspace name"),
            template: z.enum(["analytics", "dataeng", "realtime", "warehouse"]).optional().describe("Quick template to auto-select items"),
        },
        _meta: { ui: { resourceUri: provisionerUri } },
    }, async (args) => {
        // Return available capacities as initial data
        const [capacities, workspaces] = await Promise.all([
            listCapacities().catch(() => []),
            listWorkspaces(),
        ]);
        return {
            content: [{
                    type: "text",
                    text: JSON.stringify({
                        capacities: capacities.map((c) => ({ id: c.id, displayName: c.displayName, sku: c.sku, region: c.region })),
                        existingWorkspaceCount: workspaces.length,
                        ...(args.workspaceName ? { suggestedName: args.workspaceName } : {}),
                        ...(args.template ? { template: args.template } : {}),
                    }),
                }],
        };
    });
    registerAppResource(server, provisionerUri, provisionerUri, { mimeType: RESOURCE_MIME_TYPE }, async () => {
        const htmlPath = path.join(DIST_DIR, "workspace-provisioner.html");
        const html = await fs.readFile(htmlPath, "utf-8");
        return { contents: [{ uri: provisionerUri, mimeType: RESOURCE_MIME_TYPE, text: html }] };
    });
    // Provisioner backend tools
    registerAppTool(server, "list_capacities", {
        title: "List Capacities", description: "List available Fabric capacities",
        inputSchema: {},
        _meta: { ui: { resourceUri: provisionerUri, visibility: ["app"] } },
    }, async () => {
        const caps = await listCapacities();
        return { content: [{ type: "text", text: JSON.stringify(caps) }] };
    });
    registerAppTool(server, "create_workspace", {
        title: "Create Workspace", description: "Create a new Fabric workspace",
        inputSchema: {
            displayName: z.string().describe("Workspace name"),
            description: z.string().optional().describe("Workspace description"),
            capacityId: z.string().optional().describe("Capacity ID"),
        },
        _meta: { ui: { resourceUri: provisionerUri, visibility: ["app"] } },
    }, async (args) => {
        const ws = await createWorkspace(args);
        return { content: [{ type: "text", text: JSON.stringify(ws) }] };
    });
    registerAppTool(server, "create_item", {
        title: "Create Item", description: "Create an item in a workspace",
        inputSchema: {
            workspaceId: z.string().describe("Workspace ID"),
            displayName: z.string().describe("Item name"),
            type: z.string().describe("Item type (Lakehouse, Warehouse, Notebook, etc.)"),
            description: z.string().optional().describe("Item description"),
        },
        _meta: { ui: { resourceUri: provisionerUri, visibility: ["app"] } },
    }, async (args) => {
        const item = await createItem(args.workspaceId, {
            displayName: args.displayName,
            type: args.type,
            description: args.description,
        });
        return { content: [{ type: "text", text: JSON.stringify(item) }] };
    });
    // ════════════════════════════════════════════════════════════
    // ── Pipeline Run Status App ─────────────────────────────────
    // ════════════════════════════════════════════════════════════
    const pipelineUri = "ui://pipeline-status/pipeline-status.html";
    registerAppTool(server, "pipeline_run_status", {
        title: "Pipeline Run Status",
        description: "Open an interactive dashboard to monitor deployment pipeline stages, view recent deployment history, " +
            "and trigger deployments between stages (Dev → Test → Prod).",
        inputSchema: {
            pipelineId: z.string().optional().describe("Deployment pipeline ID. If omitted, shows a pipeline picker."),
        },
        _meta: { ui: { resourceUri: pipelineUri } },
    }, async (args) => {
        if (args.pipelineId) {
            const [stages, ops] = await Promise.all([
                getPipelineStages(args.pipelineId),
                getPipelineOperations(args.pipelineId),
            ]);
            return {
                content: [{
                        type: "text",
                        text: JSON.stringify({
                            pipelineId: args.pipelineId,
                            stages: stages.map((s) => ({ id: s.id, order: s.order, displayName: s.displayName, workspaceId: s.workspaceId, workspaceName: s.workspaceName })),
                            recentOperations: ops.slice(0, 5).map((o) => ({ id: o.id, status: o.status, sourceStageId: o.sourceStageId, targetStageId: o.targetStageId, executionStartTime: o.executionStartTime })),
                        }),
                    }],
            };
        }
        const pipelines = await listPipelines();
        return {
            content: [{
                    type: "text",
                    text: JSON.stringify({ pipelines: pipelines.map((p) => ({ id: p.id, displayName: p.displayName, description: p.description })) }),
                }],
        };
    });
    registerAppResource(server, pipelineUri, pipelineUri, { mimeType: RESOURCE_MIME_TYPE }, async () => {
        const htmlPath = path.join(DIST_DIR, "pipeline-status.html");
        const html = await fs.readFile(htmlPath, "utf-8");
        return { contents: [{ uri: pipelineUri, mimeType: RESOURCE_MIME_TYPE, text: html }] };
    });
    // Pipeline backend tools
    registerAppTool(server, "list_pipelines", {
        title: "List Pipelines", description: "List deployment pipelines",
        inputSchema: {},
        _meta: { ui: { resourceUri: pipelineUri, visibility: ["app"] } },
    }, async () => {
        const pipelines = await listPipelines();
        return { content: [{ type: "text", text: JSON.stringify(pipelines) }] };
    });
    registerAppTool(server, "get_pipeline_stages", {
        title: "Get Pipeline Stages", description: "Get stages for a deployment pipeline",
        inputSchema: { pipelineId: z.string().describe("Pipeline ID") },
        _meta: { ui: { resourceUri: pipelineUri, visibility: ["app"] } },
    }, async ({ pipelineId }) => {
        const s = await getPipelineStages(pipelineId);
        return { content: [{ type: "text", text: JSON.stringify(s) }] };
    });
    registerAppTool(server, "get_stage_items", {
        title: "Get Stage Items", description: "List items in a pipeline stage",
        inputSchema: {
            pipelineId: z.string().describe("Pipeline ID"),
            stageId: z.string().describe("Stage ID"),
        },
        _meta: { ui: { resourceUri: pipelineUri, visibility: ["app"] } },
    }, async ({ pipelineId, stageId }) => {
        const items = await getStageItems(pipelineId, stageId);
        return { content: [{ type: "text", text: JSON.stringify(items) }] };
    });
    registerAppTool(server, "get_pipeline_operations", {
        title: "Get Pipeline Operations", description: "Get recent deployment operations",
        inputSchema: { pipelineId: z.string().describe("Pipeline ID") },
        _meta: { ui: { resourceUri: pipelineUri, visibility: ["app"] } },
    }, async ({ pipelineId }) => {
        const ops = await getPipelineOperations(pipelineId);
        return { content: [{ type: "text", text: JSON.stringify(ops) }] };
    });
    registerAppTool(server, "deploy_pipeline_stage", {
        title: "Deploy Stage", description: "Deploy content between pipeline stages",
        inputSchema: {
            pipelineId: z.string().describe("Pipeline ID"),
            sourceStageId: z.string().describe("Source stage ID"),
            targetStageId: z.string().describe("Target stage ID"),
            note: z.string().optional().describe("Deployment note"),
        },
        _meta: { ui: { resourceUri: pipelineUri, visibility: ["app"] } },
    }, async (args) => {
        const result = await deployStage(args.pipelineId, {
            sourceStageId: args.sourceStageId,
            targetStageId: args.targetStageId,
            note: args.note,
        });
        return { content: [{ type: "text", text: JSON.stringify({ success: true, ...result }) }] };
    });
    // ════════════════════════════════════════════════════════════
    // ── Empty Workspaces App ─────────────────────────────────────
    // ════════════════════════════════════════════════════════════
    const emptyWsUri = "ui://empty-workspaces/empty-workspaces.html";
    registerAppTool(server, "empty_workspaces", {
        title: "Empty Workspaces",
        description: "Open a dashboard showing all Fabric workspaces that contain no items. " +
            "Useful for identifying workspaces that can be cleaned up or need provisioning.",
        inputSchema: {},
        _meta: { ui: { resourceUri: emptyWsUri } },
    }, async () => {
        // Quick summary for the LLM — the app will fetch details itself
        const workspaces = await listWorkspaces();
        return {
            content: [{
                    type: "text",
                    text: JSON.stringify({ totalWorkspaces: workspaces.length }),
                }],
        };
    });
    registerAppResource(server, emptyWsUri, emptyWsUri, { mimeType: RESOURCE_MIME_TYPE }, async () => {
        const htmlPath = path.join(DIST_DIR, "empty-workspaces.html");
        const html = await fs.readFile(htmlPath, "utf-8");
        return { contents: [{ uri: emptyWsUri, mimeType: RESOURCE_MIME_TYPE, text: html }] };
    });
    // Backend tool: scans all workspaces and returns empty ones (called by the app)
    registerAppTool(server, "ew_find_empty_workspaces", {
        title: "Find Empty Workspaces",
        description: "Scan all workspaces and return the ones with no items",
        inputSchema: {},
        _meta: { ui: { resourceUri: emptyWsUri, visibility: ["app"] } },
    }, async () => {
        const workspaces = await listWorkspaces();
        const emptyWorkspaces = [];
        for (const ws of workspaces) {
            try {
                const items = await listItems(ws.id);
                if (items.length === 0) {
                    emptyWorkspaces.push(ws);
                }
            }
            catch {
                // Skip workspaces we can't access
            }
        }
        return {
            content: [{
                    type: "text",
                    text: JSON.stringify({
                        totalWorkspaces: workspaces.length,
                        emptyWorkspaces: emptyWorkspaces.map((w) => ({
                            id: w.id,
                            displayName: w.displayName,
                            description: w.description,
                            type: w.type,
                            capacityId: w.capacityId,
                        })),
                    }),
                }],
        };
    });
    // Backend tool: delete a single workspace by ID (called by the app)
    registerAppTool(server, "ew_delete_workspace", {
        title: "Delete Workspace",
        description: "Delete a workspace by ID",
        inputSchema: { workspaceId: z.string().describe("Workspace ID (GUID)") },
        _meta: { ui: { resourceUri: emptyWsUri, visibility: ["app"] } },
    }, async ({ workspaceId }) => {
        await deleteWorkspace(workspaceId);
        return {
            content: [{ type: "text", text: JSON.stringify({ deleted: true, workspaceId }) }],
        };
    });
    // ════════════════════════════════════════════════════════════
    // ── Single-Admin Workspaces App ─────────────────────────────
    // ════════════════════════════════════════════════════════════
    const singleAdminUri = "ui://single-admin-workspaces/single-admin-workspaces.html";
    registerAppTool(server, "single_admin_workspaces", {
        title: "Single-Admin Workspaces",
        description: "Open a dashboard showing Fabric workspaces that have only one admin. " +
            "These represent a governance risk — if the sole admin leaves, no one can manage the workspace.",
        inputSchema: {},
        _meta: { ui: { resourceUri: singleAdminUri } },
    }, async () => {
        // Quick summary for the LLM — the app will fetch details itself
        const workspaces = await listWorkspaces();
        return {
            content: [{
                    type: "text",
                    text: JSON.stringify({ totalWorkspaces: workspaces.length }),
                }],
        };
    });
    registerAppResource(server, singleAdminUri, singleAdminUri, { mimeType: RESOURCE_MIME_TYPE }, async () => {
        const htmlPath = path.join(DIST_DIR, "single-admin-workspaces.html");
        const html = await fs.readFile(htmlPath, "utf-8");
        return { contents: [{ uri: singleAdminUri, mimeType: RESOURCE_MIME_TYPE, text: html }] };
    });
    // Backend tool: scans all workspaces and returns single-admin ones (called by the app)
    registerAppTool(server, "sa_find_single_admin_workspaces", {
        title: "Find Single-Admin Workspaces",
        description: "Scan all workspaces and return the ones with only one admin",
        inputSchema: {},
        _meta: { ui: { resourceUri: singleAdminUri, visibility: ["app"] } },
    }, async () => {
        const workspaces = await listWorkspaces();
        const singleAdminWorkspaces = [];
        for (const ws of workspaces) {
            try {
                const roles = await getWorkspaceRoleAssignments(ws.id);
                const admins = roles.filter((r) => r.role === "Admin");
                if (admins.length === 1) {
                    singleAdminWorkspaces.push({
                        id: ws.id,
                        displayName: ws.displayName,
                        description: ws.description,
                        type: ws.type,
                        soleAdmin: admins[0],
                        totalMembers: roles.length,
                        allRoles: roles,
                    });
                }
            }
            catch {
                // Skip workspaces we can't access
            }
        }
        return {
            content: [{
                    type: "text",
                    text: JSON.stringify({
                        totalWorkspaces: workspaces.length,
                        singleAdminWorkspaces,
                    }),
                }],
        };
    });
    return server;
}
