# Fabric Local MCP: Write Capabilities Spec

**Status:** Draft  
**Author:** Hasan Abo-Shally  
**Date:** February 4, 2026

---

## 1. Overview

### Current State
The Fabric Local MCP (v0.0.0-beta.2) provides **read-only** capabilities—listing workspaces, items, files, and retrieving documentation. Users can explore Fabric resources but cannot modify them through AI agents.

**Current architecture note:**  
The capabilities to execute on Fabric (listing workspaces, creating items, file operations) are currently part of the **OneLake tools** which were added to the MCP server. These tools live under the `onelake_*` namespace (e.g., `list_onelake_workspaces`, `create_fabric_item`). 

**Planned improvements:**
- **Generalize tool namespace:** Move Fabric-wide operations out of OneLake namespace into a unified `fabric_*` namespace (e.g., `list_workspaces`, `list_items`). OneLake-specific tools (file/directory operations) remain under `onelake_*`.
- **Rename tools** to follow MCP best practices (action-first naming, clearer descriptions)
- See [Tool Naming Standards](#tool-naming-standards) section

### What's New
This spec proposes adding **write capabilities** to enable AI agents to create, update, and import Fabric items through the Local MCP.

---

## 2. Target Users

| User Type | Description |
|-----------|-------------|
| **Pro-developers** | Code-first developers who prefer CLI/API over UI |
| **AI-assisted developers** | Users working with AI agents in VS Code, Cursor, or other coding environments |
| **ISVs & Partners** | Teams deploying solutions to customer tenants |
| **Platform engineers** | Teams managing Fabric resources across environments |

**Common trait:** These users work locally with AI agents and want to interact with Fabric with minimal switching to the portal.

---

## 3. User Scenarios

We've identified three main categories of scenarios:

| Category | Scenarios | Priority |
|----------|-----------|----------|
| **Item Editing** | Edit existing items (manual or AI-assisted) | P0 |
| **Item Authoring** | Create new items from scratch or upload local content | P0 |
| **Workspace Operations** | Import/deploy multiple items or entire workspaces | P1 |

---

### Scenario 1: Edit Item (Manual)
> "I want to download a report's definition, review it locally, and push changes back."

**User journey:**
1. User asks: "Export the sales report definition to my local folder"
2. Agent exports the item definition
3. User manually reviews/edits the definition in their IDE
4. User asks: "Import the updated definition back to Fabric"
5. Agent imports the modified definition

**Why this matters:** Developers want to version-control item definitions and make precise edits in their IDE before pushing changes.

---

### Scenario 2: Edit Item (AI-Assisted)
> "I want Copilot to modify my report based on my instructions."

**User journey:**
1. User asks: "In the Q4 Sales Report, remove the chart in the top-right corner and add a table showing regional breakdown"
2. Agent exports the item definition
3. Agent analyzes the definition structure and makes the requested changes
4. Agent shows the user what changed (diff view)
5. User approves, agent imports the updated definition

**Why this matters:** Users want AI to do the editing work, not just facilitate export/import. This is the "Copilot edits my Fabric items" experience.

---

### Scenario 3: Author New Item
> "I want to create a new notebook without starting in the Fabric portal."

**User journey:**
1. User asks: "Create a new Spark notebook that loads sales data from the lakehouse and aggregates it by region"
2. Agent generates the item definition based on user requirements
3. Agent saves the definition locally for review
4. User reviews/refines the definition (optionally with AI assistance)
5. User asks: "Import this notebook to my workspace"
6. Agent imports the new item to Fabric

**Why this matters:** Users want to author Fabric items entirely from their IDE with AI assistance, without needing to start in the portal. This enables a true "code-first" experience for Fabric development.

---

### Scenario 4: Upload Local Item
> "I have a notebook on my machine that I want to upload to my Fabric workspace."

**User journey:**
1. User asks: "Upload this notebook to my development workspace"
2. Agent reads the local file
3. Agent creates/updates the item in the target workspace

**Why this matters:** Developers often prototype locally before deploying to Fabric. This enables a seamless local-to-cloud workflow.

---

### Scenario 5: Import Solution (ISV)
> "I'm an ISV and need to deploy my solution to a customer's workspace."

**User journey:**
1. User has a local repo with item definitions (reports, semantic models, notebooks)
2. User asks: "Import this solution to workspace X in tenant Y"
3. Agent imports all items, handling dependencies and conflicts

**Why this matters:** ISVs need repeatable deployment without manual portal work. This enables AI-assisted solution delivery.

---

### Scenario 6: Deploy Workspace (CI/CD)
> "Promote my workspace from dev to production."

**User journey:**
1. User asks: "Deploy my dev workspace to production"
2. Agent exports all items from source workspace
3. Agent imports to target workspace, handling ID remapping and dependency resolution
4. Agent reports what was deployed and any conflicts resolved

**Why this matters:** CI/CD patterns require moving entire workspaces between environments (dev → test → prod). This enables AI-assisted deployment workflows at workspace scale.

---

## 4. Requirements

### Functional Requirements

| ID | Requirement | Priority | Scenarios | Notes |
|----|-------------|----------|-----------|-------|
| FR-1 | Export item definition to local folder | P0 | 1, 2 | Single item, all item types |
| FR-2 | Import item definition from local folder | P0 | 1, 2, 3, 4 | Single item, create or update |
| FR-3 | Support import strategy (create/update/skip) | P0 | 4 | Handle conflicts (single item) |
| FR-4 | Support all workspaces user has access to | P0 | All | Not just personal |
| FR-5 | Validate definition before import | P0 | 2, 3 | Schema validation |
| FR-6 | Get item definition schema | P0 | 2, 3 | AI needs structure to edit/author |
| FR-7 | Generate item definition scaffold | P0 | 3 | Create new item from template |
| FR-8 | Batch export/import (workspace-level) | P1 | 5, 6 | Export/import entire workspace |
| FR-9 | Dependency resolution during import | P1 | 5, 6 | Handle cross-item refs |
| FR-10 | Dry-run mode for import | P2 | 5, 6 | Preview changes without applying |

### Non-Functional Requirements

| ID | Requirement | Notes |
|----|-------------|-------|
| NF-1 | Human-in-the-loop | User approves before destructive operations |
| NF-2 | Clear error messages | Actionable feedback on failures |
| NF-3 | Minimal prerequisites | Easy setup for end users |
| NF-4 | Consistent tool naming | Follow MCP best practices |

---

## 5. Proposed Tools

Following the naming pattern from [MCP Tool Naming Standards](renaming-tools.md):
- **Action-first naming** (verb_object)
- **Clear descriptions** with usage conditions and constraints

### P0 Tools (Item Editing & Authoring)

| Tool Name | Description |
|-----------|-------------|
| `export_item_definition` | Exports a Fabric item's definition to a local folder. Use this when the user wants to download an item for editing, backup, or version control. Returns the folder path of the exported definition. |
| `import_item_definition` | Imports a Fabric item definition from a local folder to a workspace. Use this when the user wants to create or update an item from a local definition. Supports strategy flag (create, update, skip) for conflict handling. |
| `validate_item_definition` | Validates a local item definition against Fabric schemas without importing. Use this when the user wants to check a definition before import. Returns validation results and any errors. |
| `get_item_schema` | Retrieves the JSON schema for a specific item type. Use this when the AI needs to understand the structure of an item definition for editing or authoring. Returns the full schema with property descriptions. |
| `scaffold_item_definition` | Generates a new item definition from a template. Use this when the user wants to author a new item from scratch. Returns a valid definition structure that can be customized and imported. |
| `list_item_types` | Lists all Fabric item types that support definition import/export. Use this when the user needs to know which items can be managed through definitions. Returns type names and supported operations. |

### P1 Tools (Workspace Operations)

| Tool Name | Description |
|-----------|-------------|
| `export_workspace` | Exports all item definitions from a workspace to a local folder. Use this when the user wants to backup, version control, or deploy an entire workspace. Returns the folder path containing exported definitions. |
| `import_workspace` | Imports all item definitions from a local folder to a workspace. Use this when the user wants to deploy a solution or restore a workspace. Supports strategy flag and handles dependencies. |

### Existing Tools: Namespace Reorganization

Current Fabric execution tools live under the OneLake namespace but should be generalized:

| Current (OneLake namespace) | Proposed (Fabric namespace) | Notes |
|-----------------------------|----------------------------|-------|
| `mcp_fabric_mcp_onelake_workspace_list` | `list_workspaces` | Fabric-wide, not OneLake-specific |
| `mcp_fabric_mcp_onelake_item_list` | `list_workspace_items` | Fabric-wide |
| `mcp_fabric_mcp_onelake_item_create` | `create_item` | Fabric-wide |

**Keep under OneLake namespace** (storage-specific operations):

| Current | Proposed | Notes |
|---------|----------|-------|
| `mcp_fabric_mcp_onelake_file_list` | `list_onelake_files` | Storage operation |
| `mcp_fabric_mcp_onelake_upload_file` | `upload_onelake_file` | Storage operation |
| `mcp_fabric_mcp_onelake_download_file` | `download_onelake_file` | Storage operation |

See [renaming-tools.md](renaming-tools.md) for full mapping.

---

## 6. Implementation Considerations

### CLI as Execution Engine

**Proposal:** MCP tools invoke Fabric CLI commands rather than directly calling Fabric APIs.

**Rationale:**

1. **Avoid duplicating complex work**  
   The CLI team has invested significant effort in handling complex Fabric operations—deployment strategies, bulk import/export, conflict resolution, ID remapping. Re-implementing this logic in the MCP would be wasteful.

2. **Proven patterns in the industry**  
   Many MCP servers follow this pattern of wrapping CLI tools:

   | MCP Server | CLI Used | Notes |
   |------------|----------|-------|
   | [AWS API MCP Server](https://awslabs.github.io/mcp/servers/aws-api-mcp-server) | AWS CLI | Runs `aws ...` commands |
   | [gcloud MCP](https://github.com/googleapis/gcloud-mcp) | gcloud CLI | Google Cloud operations |
   | [kubectl MCP](https://github.com/rohitg00/kubectl-mcp-server) | kubectl | Kubernetes operations |
   | [Helm CLI MCP](https://github.com/jeff-nasseri/helm-chart-cli-mcp) | helm | Chart management |
   | [azure-api-mcp](https://github.com/Azure/azure-api-mcp) | Azure CLI | Runs `az ...` commands |
   | Git MCP servers | git | Version control operations |
   | npm-run MCP | npm | Runs npm scripts |

   **Note on Azure MCP variants:**
   - **`@azure/mcp`** (Microsoft's official): Primarily uses Entra ID/Azure Identity for auth; can auto-discover credentials from `az login`, VS Code sign-in, etc. Also includes Azure CLI tooling for command generation.
   - **`azure-api-mcp`**: Explicitly executes Azure CLI commands under the hood, requires Azure CLI installed.

3. **Future-proof**  
   When the CLI adds new capabilities (e.g., deployment pipelines, Git integration), the MCP automatically benefits without additional work.

4. **Local execution**  
   The CLI runs locally, aligning with the Local MCP's architecture. No additional service dependencies.

### Implementation Options

| Option | Description | Trade-offs |
|--------|-------------|------------|
| **A: Wrap CLI commands** | MCP tools directly invoke `fab export`, `fab import` | Simpler, but tight coupling |
| **B: Generate CLI scripts** | MCP generates CLI scripts, user reviews, then executes | More transparent, supports version control |
| **C: Hybrid** | Simple ops use direct invocation, complex ops generate scripts | Balanced approach |

**Recommendation:** Start with Option A for P0, evolve to Option C as we learn.

### Technical Considerations

| Concern | Consideration |
|---------|---------------|
| **Language mismatch** | MCP is .NET, CLI is Python. Need to handle Python environment setup. |
| **User prerequisites** | Today: Install VS Code extension. With CLI: Also need Python + CLI installed. |
| **Error handling** | CLI errors need to be surfaced clearly through MCP responses. |
| **Approval flow** | MCP should show the CLI command before execution for user approval. |

**Mitigation:** Consider bundling CLI with the MCP extension, or providing clear setup guidance.

---

## 7. Open Questions

| # | Question | Context | Owner | Status |
|---|----------|---------|-------|--------|
| 1 | Do we use CLI as execution engine for write operations? | Recommended approach — see section 6 | Engineering | **Key Decision** |
| 2 | If not CLI, how do we handle workspace-level imports (dependency resolution, ID remapping)? | Only relevant if we don't use CLI | Engineering | Blocked on #1 |
| 3 | What are the user prerequisites if we require CLI? | Python + CLI installation vs. bundling | Engineering | Open |
| 4 | What's the approval UX for destructive operations? | Human-in-the-loop requirement | Design | Open |

**Note:** Other implementation details could be deferred to CLI capabilities if we adopt the CLI-as-engine approach.

---

## Appendix

### A. Remote Agents Using Local MCPs

**Question:** Can remote/cloud-hosted agents (e.g., GitHub Copilot, Copilot Studio) use Local MCPs?

**Industry context:**  
This is an emerging pattern. Some approaches:
- **Tunneling:** Local MCP exposes an endpoint via secure tunnel (ngrok-style)
- **Hybrid execution:** Remote agent generates instructions, local runtime executes
- **MCP proxies:** Gateway services that route remote requests to local MCPs

**Recommendation:** Track this as a future exploration. For now, focus on local agent scenarios (VS Code, Cursor, local Copilot).

### B. Tool Naming Standards

Tools should follow this pattern:

```
Name:        <verb>_<object>
Description: <Primary action>. Use this when <condition>. <Constraints/notes>.
```

**Examples:**
- `export_item_definition` — Exports a Fabric item's definition to a local folder. Use this when the user wants to download an item for editing or backup.
- `import_item_definition` — Imports a Fabric item definition from a local folder. Use this when the user wants to create or update an item in a workspace.

---

## References

- [MCP Tool Naming Standards](renaming-tools.md)
- [Fabric CLI Documentation](https://learn.microsoft.com/fabric/cli)
- [MCP Specification](https://modelcontextprotocol.io)
