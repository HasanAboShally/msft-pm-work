# Getting Started with Fabric MCP Server (Private Preview)

**Welcome.** You are part of a select group helping shape how AI agents interact with Microsoft Fabric. This guide will get you connected and productive in under 15 minutes.

---

## TL;DR (2-Minute Setup)

If you are familiar with MCP, here is the fast path:

**VS Code + GitHub Copilot:**
1. `Cmd+Shift+P` (or `Ctrl+Shift+P`) > **"MCP: Add Server"** > **HTTP**
2. Enter URL: `https://api.fabric.microsoft.com/v1/mcp`
3. Sign in when prompted (browser-based, uses your Microsoft account)
4. Ask Copilot: *"List all my Fabric workspaces"*

**Optional but recommended:** Also add [Microsoft Graph MCP](https://learn.microsoft.com/en-us/graph/mcp-server/get-started) to enable commands like *"Add john@contoso.com to my workspace"*

**Questions or feedback?** [Submit via our feedback form](https://forms.microsoft.com/TODO-REPLACE-WITH-ACTUAL-LINK) or email habos@microsoft.com

---

## Table of Contents

1. [What is MCP?](#what-is-mcp)
2. [What is Fabric MCP Server?](#what-is-fabric-mcp-server)
3. [Prerequisites](#prerequisites)
4. [Quick Start](#quick-start)
5. [Recommended: Add Microsoft Graph MCP](#recommended-add-microsoft-graph-mcp)
6. [Available Tools Reference](#available-tools-reference)
7. [Example Workflows](#example-workflows)
8. [Troubleshooting](#troubleshooting)
9. [Providing Feedback](#providing-feedback)

---

## What is MCP?

**Model Context Protocol (MCP)** is an open standard that enables AI agents to access external data and perform real actions, moving beyond conversation to actual system control.

Think of MCP as a universal adapter between AI agents and the systems they need to work with:

```
+------------------+     MCP Protocol     +------------------+
|    AI Agent      |<------------------->|   MCP Server     |
| (VS Code Copilot,|                      | (Fabric, Graph,  |
|  Claude, etc.)   |                      |  databases...)   |
+------------------+                      +------------------+
```

**Key benefits:**

- **Standardized** - One protocol works across all MCP-compatible agents
- **Secure** - Authentication, RBAC, and audit trails built in
- **Typed** - Tools have defined schemas, reducing errors
- **Discoverable** - Agents can explore available capabilities

Learn more: [modelcontextprotocol.io](https://modelcontextprotocol.io)

### Local vs. Remote MCP Servers

MCP servers can run in two modes:

| Mode | Description | Example |
|------|-------------|---------|
| **Local** | Runs on your machine, typically as a subprocess | File system access, local databases |
| **Remote** | Cloud-hosted, accessed over HTTPS | Fabric MCP Server, Microsoft Graph MCP |

Fabric MCP Server is a **remote** server, which means you do not need to install or host anything locally.

---

## What is Fabric MCP Server?

**Fabric MCP Server** is a remote, cloud-hosted MCP endpoint that exposes Microsoft Fabric's public APIs as typed tools. Any MCP-compatible AI agent can safely discover and execute Fabric operations through this server.

### Key Characteristics

| Feature | Description |
|---------|-------------|
| **Remote Server** | Cloud-hosted via HTTPS, no local installation required |
| **Public API Tools** | Each tool maps to a Fabric REST API for workspaces, items, permissions |
| **OAuth2 Auth** | Automatic authentication via Entra ID, inherits your existing permissions |
| **Interactive Login** | VS Code supports browser-based sign-in when connecting |
| **RBAC Enforced** | All operations respect your Fabric role-based access |
| **Audit Logged** | Every action is recorded in Fabric Audit Logs |

### Benefits of Remote MCP

- **No local setup or hosting required** - Just point your agent to the endpoint
- **Enterprise policies and RBAC work out of the box** - Your existing permissions apply
- **Centralized auditing for compliance** - All actions logged in Fabric
- **Authenticates via your existing Microsoft identity** - No separate credentials needed

---

## Prerequisites

Before you begin, ensure you have:

| Requirement | Details |
|-------------|---------|
| **Private Preview Access** | You should have received confirmation of your enrollment |
| **Microsoft Fabric Access** | An active Fabric tenant with at least one workspace you can access |
| **MCP-Compatible Agent** | VS Code with GitHub Copilot (recommended), Claude Desktop, Copilot Studio, or any MCP client |
| **Entra ID Account** | Your Microsoft work or school account with Fabric permissions |


---

## Quick Start

### For VS Code with GitHub Copilot (Recommended)

VS Code provides the simplest setup experience with built-in interactive authentication.

**Step 1: Open the MCP Server Configuration**

Use the keyboard shortcut or Command Palette:

- Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux)
- Type **"MCP: Add Server"** and select it
- Choose **"HTTP (HTTP or Server-Sent Events)"**

**Step 2: Enter the Fabric MCP Server URL**

When prompted for the server URL, enter:

```
https://api.fabric.microsoft.com/v1/mcp
```

Give it a name like `fabric` when prompted.

**Step 3: Authenticate**

When you first use the server, VS Code will prompt you to sign in via your browser. This uses interactive authentication with your Microsoft Entra ID account. Simply follow the browser prompts to authorize access.

**Step 4: Verify Connection**

Open GitHub Copilot Chat and ask:

```
List all my Fabric workspaces
```

You should see a list of workspaces you have access to. If this works, you are connected.

**Alternative: Manual Configuration**

If you prefer manual configuration, add to your VS Code `settings.json` or workspace `.vscode/mcp.json`:

```json
{
  "mcp": {
    "servers": {
      "fabric": {
        "type": "http",
        "url": "https://api.fabric.microsoft.com/v1/mcp"
      }
    }
  }
}
```

VS Code will handle authentication interactively when you first connect.

---

### For Claude Desktop

Add to your Claude Desktop config file:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "fabric": {
      "type": "http", 
      "url": "https://api.fabric.microsoft.com/v1/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_ACCESS_TOKEN"
      }
    }
  }
}
```

To obtain an access token, use Azure CLI:

```bash
# Login to Azure
az login

# Get access token for Fabric API
az account get-access-token --resource https://api.fabric.microsoft.com --query accessToken -o tsv
```

Replace `YOUR_ACCESS_TOKEN` with the output from the command above.

---

### For Other MCP Clients

Use these connection details:

| Property | Value |
|----------|-------|
| **Endpoint URL** | `https://api.fabric.microsoft.com/v1/mcp` |
| **Auth Type** | OAuth2 Bearer Token |
| **Auth Scope** | `https://api.fabric.microsoft.com/.default` |
| **Identity Provider** | Microsoft Entra ID |

---

## Recommended: Add Microsoft Graph MCP

To enable user and group resolution (e.g., adding users by email address), we recommend also connecting the **Microsoft Graph MCP Server**. This allows you to say things like:

> "Add john@contoso.com as a Contributor to my Dev workspace"

Without Graph MCP, you would need to know the user's principal ID. With it, the agent can resolve email addresses to user IDs automatically.

### Setup Microsoft Graph MCP in VS Code

1. Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux)
2. Type **"MCP: Add Server"** and select it
3. Follow the setup instructions at: [Microsoft Graph MCP Server](https://learn.microsoft.com/en-us/graph/mcp-server/get-started)

### Using Both Servers Together

With both Fabric MCP and Graph MCP configured, you can issue natural commands like:

```
"Add the Marketing team to the Sales Analytics workspace as Viewers"

"Grant john@contoso.com Contributor access to my development workspace"

"Who are the members of the Finance Admins group?"
```

The agent will use Graph MCP to resolve identities and Fabric MCP to apply permissions.

---

## Available Tools Reference

The Fabric MCP Server exposes the following tools in the private preview:

### Workspace Management

| Tool | Description | Parameters |
|------|-------------|------------|
| `list_workspaces` | Lists all workspaces you have access to | `Roles` (optional filter), `ContinuationToken` |
| `get_workspace` | Gets detailed info about a specific workspace | `WorkspaceId` (required) |
| `create_workspace` | Creates a new workspace | `displayName` (required), `description`, `capacityId` |
| `update_workspace` | Updates workspace name or description | `WorkspaceId`, `Details` (displayName, description) |
| `delete_workspace` | Permanently deletes a workspace | `WorkspaceId` (required) |

### Workspace Role Assignments

| Tool | Description | Parameters |
|------|-------------|------------|
| `add_workspace_role` | Grant access to a user, group, or service principal | `WorkspaceId`, `Details` (principal, role) |
| `list_workspace_roles` | List all role assignments for a workspace | `WorkspaceId`, `ContinuationToken` |
| `get_workspace_role` | Get details of a specific role assignment | `WorkspaceId`, `RoleAssignmentId` |
| `update_workspace_role` | Change a user's role (Admin/Member/Contributor/Viewer) | `WorkspaceId`, `RoleAssignmentId`, `Details` |
| `delete_workspace_role` | Revoke access from a workspace | `WorkspaceId`, `RoleAssignmentId` |

### Item Management

| Tool | Description | Parameters |
|------|-------------|------------|
| `list_items` | Lists all items in a workspace | `WorkspaceId` (required), `Type` (optional filter), `RootFolderId`, `Recursive` |
| `get_item` | Get metadata for a specific item | `WorkspaceId`, `ItemId` |
| `create_item` | Creates a new Fabric item | `WorkspaceId`, `Details` (displayName, type, definition) |
| `update_item` | Update item metadata | `WorkspaceId`, `ItemId`, `Details` |
| `delete_item` | Permanently delete an item | `WorkspaceId`, `ItemId` |
| `get_item_definition` | Retrieve the definition/schema of an item | `WorkspaceId`, `ItemId`, `Format` |
| `update_item_definition` | Update an item's definition | `WorkspaceId`, `ItemId`, `Details`, `UpdateMetadata` |
| `bulk_move_items` | Move multiple items to a folder | `WorkspaceId`, `Details` (items[], targetFolderId) |

**Supported Item Types:**

Dashboard, Report, SemanticModel, PaginatedReport, Datamart, Lakehouse, Eventhouse, Environment, KQLDatabase, KQLQueryset, KQLDashboard, DataPipeline, Notebook, SparkJobDefinition, MLExperiment, MLModel, Warehouse, Eventstream, SQLEndpoint, MirroredWarehouse, MirroredDatabase, Reflex, GraphQLApi, SQLDatabase, CopyJob, VariableLibrary, Dataflow, and more.

### Folder Management

| Tool | Description | Parameters |
|------|-------------|------------|
| `create_folder` | Create a folder in a workspace | `WorkspaceId`, `Details` (displayName, parentFolderId) |
| `list_folders` | List folders in a workspace | `WorkspaceId`, `RootFolderId`, `Recursive` |
| `get_folder` | Get metadata for a single folder | `WorkspaceId`, `FolderId` |
| `update_folder` | Rename a folder | `WorkspaceId`, `FolderId`, `Details` |
| `delete_folder` | Delete an empty folder | `WorkspaceId`, `FolderId` |
| `move_folder` | Move a folder to a different parent | `WorkspaceId`, `FolderId`, `Details` (targetFolderId) |

### Capacity Management

| Tool | Description | Parameters |
|------|-------------|------------|
| `list_capacities` | List all Fabric capacities you can access | `ContinuationToken` |

### Long-Running Operations

| Tool | Description | Parameters |
|------|-------------|------------|
| `get_operation_state` | Check status of an async operation | `OperationId` (from `x-ms-operation-id` header) |
| `get_operation_result` | Get the result once operation succeeds | `OperationId` |

### Knowledge Base

| Tool | Description | Parameters |
|------|-------------|------------|
| `get_knowledge` | Get context/guidelines for creating items | `topics[]`: Notebook, Dataflow, Blueprint, Lakehouse, Report, SemanticModel |

---

## Example Workflows

### Workflow 1: Explore Your Environment (Read-Only)

Start with discovery to understand what you have access to:

```
You: "List all my Fabric workspaces"

You: "Show me all the items in the Sales Analytics workspace"

You: "What Lakehouses exist in this workspace?"

You: "Get the definition of the CustomerData semantic model"
```

### Workflow 2: Create a Development Environment

Clone a production setup for development:

```
You: "Create a new workspace called Sales Analytics Dev with description 
      Development environment for sales team"

You: "Create a Lakehouse called CustomerData_Dev in the new workspace"

You: "Add john@contoso.com as a Contributor to the Sales Analytics Dev workspace"
```

Note: The last command works best when you also have Microsoft Graph MCP configured.

### Workflow 3: Manage Permissions

Audit and update access:

```
You: "List all role assignments for the Finance Reports workspace"

You: "Who has Admin access to this workspace?"

You: "Change the Marketing group from Viewer to Contributor role"

You: "Remove access for the user that left the team"
```

### Workflow 4: Organize Items

Clean up workspace structure:

```
You: "Create a folder called Archive in my workspace"

You: "Move all reports from 2023 to the Archive folder"

You: "List all items in the root folder only, not recursive"
```

---

## Troubleshooting

### "Invalid workspace ID" or "Invalid item ID"

**Cause:** IDs must be valid UUIDs (e.g., `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

**Solution:** Use `list_workspaces` or `list_items` first to get the correct IDs.

### Authentication Failed (401/403)

**Cause:** Token expired, wrong scope, or insufficient permissions

**Solution:**

1. In VS Code, try disconnecting and reconnecting the MCP server to trigger a fresh login
2. Verify you have access in the Fabric portal first
3. For manual tokens, refresh with: `az account get-access-token --resource https://api.fabric.microsoft.com`

### "Workspace not found" but it exists

**Cause:** Your identity does not have permission to that workspace

**Solution:** Ask a workspace Admin to grant you at least Viewer access.

### Long-running operation timeout

**Cause:** Some operations (like creating Lakehouses) are asynchronous

**Solution:** Use `get_operation_state` with the `operationId` from the response header, then `get_operation_result` once it succeeds.

### Agent picks wrong tool or parameters

**Cause:** This is exactly the feedback we need.

**Solution:** Note down:
- What you asked
- What tool/parameters the agent chose
- What you expected

Then share via feedback (see below).

---

## Providing Feedback

Your feedback directly shapes the public preview release. Here is what we are looking for:

### What to Report

| Category | Questions |
|----------|-----------|
| **Tool Accuracy** | Does the agent pick the right tool? Are parameters correct on first try? |
| **Auth/Permissions** | Is sign-in smooth? Any RBAC confusion? |
| **Success Rate** | Do multi-step workflows complete end-to-end? Where do they fail? |
| **Trust and Guardrails** | Do you feel in control? Where would you want approval steps? |
| **Coverage Gaps** | What Fabric operations did you expect but could not find? |
| **Onboarding** | How long to first successful action? What was confusing? |

### How to Submit Feedback

**Feedback Form (Preferred):** [Submit Feedback via Microsoft Forms](https://forms.microsoft.com/TODO-REPLACE-WITH-ACTUAL-LINK)

**Direct Contact:**
| Channel | Details |
|---------|---------|
| **Email** | habos@microsoft.com (include "Fabric MCP Feedback" in subject) |
| **Teams** | Ping Hasan Abo-Shally directly |

---

## Roadmap

| Milestone | Timing | Features |
|-----------|--------|----------|
| **Private Preview** (current) | Jan 2026 | Core platform, workspace/item CRUD, permissions |
| **Public Preview** | Mar 2026  | TBD |
| **GA Release** | TBD (2026) |  |

---

## Quick Reference

```
+--------------------------------------------------------------+
|                    FABRIC MCP QUICK REFERENCE                |
+--------------------------------------------------------------+
| Endpoint:    https://api.fabric.microsoft.com/v1/mcp         |
| Auth:        OAuth2 via Microsoft Entra ID                   |
| VS Code:     Cmd+Shift+P > "MCP: Add Server" > HTTP          |
+--------------------------------------------------------------+
| WORKSPACES            | ITEMS                 | FOLDERS      |
| - list_workspaces     | - list_items          | - create_    |
| - get_workspace       | - get_item            |   folder     |
| - create_workspace    | - create_item         | - list_      |
| - update_workspace    | - update_item         |   folders    |
| - delete_workspace    | - delete_item         | - get_folder |
|                       | - get_item_definition | - update_    |
| ROLES                 | - update_item_def     |   folder     |
| - add_workspace_role  | - bulk_move_items     | - delete_    |
| - list_workspace_     |                       |   folder     |
|   roles               | CAPACITY              | - move_folder|
| - get_workspace_role  | - list_capacities     |              |
| - update_workspace_   |                       | OPERATIONS   |
|   role                | KNOWLEDGE             | - get_op_    |
| - delete_workspace_   | - get_knowledge       |   state      |
|   role                |                       | - get_op_    |
|                       |                       |   result     |
+--------------------------------------------------------------+
| RECOMMENDED: Also add Microsoft Graph MCP for user/group     |
| resolution. See: https://learn.microsoft.com/graph/mcp-server|
+--------------------------------------------------------------+
| FEEDBACK: habos@microsoft.com | Teams: Hasan Boshra          |
+--------------------------------------------------------------+
```

---

Thank you for being part of this private preview. Your early feedback is invaluable in making Fabric MCP Server the best way for AI agents to work with Microsoft Fabric.

*Last updated: January 2026 | Private Preview v1*
