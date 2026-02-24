# Fabric Local MCP: Write Capabilities Spec

**Status:** Draft  
**Author:** Hasan Abo-Shally  
**Date:** February 5, 2026  
**Version:** 2.0

---

## 1. Overview

### Current State

The Fabric Local MCP (v0.0.0-beta.2) provides **read-only** capabilities—listing workspaces, items, files, and retrieving documentation. Users can explore Fabric resources but cannot modify them through AI agents.

**Current architecture note:**  
The capabilities to execute on Fabric (listing workspaces, creating items, file operations) are currently part of the **OneLake tools** which were added to the MCP server. These tools live under the `onelake_*` namespace (e.g., `list_onelake_workspaces`, `create_fabric_item`). 

**Planned improvements:**
- **Generalize tool namespace:** Move Fabric-wide operations out of OneLake namespace into a unified `fabric_*` namespace (e.g., `list_workspaces`, `list_items`). OneLake-specific tools (file/directory operations) remain under `onelake_*`.
- **Rename tools** to follow MCP best practices (action-first naming, clearer descriptions)
- See [Appendix D: Tool Naming Standards](#appendix-d-tool-naming-standards)

### What's New

This spec proposes adding **write capabilities** to enable AI agents to create, update, and import Fabric items through the Local MCP.

### Phased Approach

| Phase | Focus | Status |
|-------|-------|--------|
| **Phase 1** | Item Editing & Authoring (single items) | **Active** — detailed spec below |
| **Phase 2** | Workspace Operations (batch/deploy) | Future — initial requirements outlined |

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

# Phase 1: Item Editing & Authoring

> **Scope:** Single-item operations — export, import, edit, and author individual Fabric items.

---

## 3. Phase 1 Scenarios

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

## 4. Phase 1 Requirements

### Functional Requirements

| ID | Requirement | Description |
|----|-------------|-------------|
| **FR-1** | **Export item definition** | Download a single Fabric item's definition (all file types) to a local folder. The exported folder contains the item's metadata and content files as structured by Fabric's item definition format. Supports all item types (notebooks, reports, semantic models, etc.). |
| **FR-2** | **Import item definition** | Upload a local item definition folder to a Fabric workspace. Creates a new item if it doesn't exist, or updates an existing item. Returns success/failure status and any validation errors. |
| **FR-3** | **Import strategy support** | When importing, allow the user to specify a conflict strategy: `create` (fail if exists), `update` (overwrite if exists), or `skip` (ignore if exists). Default behavior should be safe (e.g., fail on conflict). |
| **FR-4** | **Workspace access** | Support all workspaces the user has access to, not just personal workspaces. User should be able to select target workspace by name or ID. |
| **FR-5** | **Validate definition** | Before importing, validate the item definition against Fabric schemas. Return clear error messages if validation fails (e.g., missing required fields, invalid format). This enables "check before import" workflows. |
| **FR-6** | **Get item schema** | Retrieve the JSON schema for a specific item type (e.g., notebook, report). The AI needs this to understand item structure for editing or authoring. Returns the full schema with property descriptions. |
| **FR-7** | **Scaffold new item** | Generate a new, valid item definition from a template. Given an item type, return a minimal but complete definition that can be customized and imported. This enables "author from scratch" workflows. |

### Non-Functional Requirements

| ID | Requirement | Description |
|----|-------------|-------------|
| **NF-1** | **Human-in-the-loop** | User must approve before any destructive or write operation executes. The MCP should show what will happen and wait for confirmation. |
| **NF-2** | **Clear error messages** | All errors should be actionable — tell the user what went wrong and how to fix it. Include relevant context (item name, workspace, field name). |
| **NF-3** | **Minimal prerequisites** | Keep setup simple. Today: install VS Code extension. Avoid requiring additional tools unless necessary. |
| **NF-4** | **Consistent tool naming** | Follow MCP best practices for tool names and descriptions (see Appendix D). |

---

## 5. Phase 1 Proposed Tools

Following the naming pattern from [Appendix D: Tool Naming Standards](#appendix-d-tool-naming-standards):
- **Action-first naming** (verb_object)
- **Clear descriptions** with usage conditions and constraints

| Tool Name | Description | Requirement |
|-----------|-------------|-------------|
| `export_item_definition` | Exports a Fabric item's definition to a local folder. Use this when the user wants to download an item for editing, backup, or version control. Returns the folder path of the exported definition. | FR-1 |
| `import_item_definition` | Imports a Fabric item definition from a local folder to a workspace. Use this when the user wants to create or update an item from a local definition. Supports strategy flag (create, update, skip) for conflict handling. | FR-2, FR-3 |
| `validate_item_definition` | Validates a local item definition against Fabric schemas without importing. Use this when the user wants to check a definition before import. Returns validation results and any errors. | FR-5 |
| `get_item_schema` | Retrieves the JSON schema for a specific item type. Use this when the AI needs to understand the structure of an item definition for editing or authoring. Returns the full schema with property descriptions. | FR-6 |
| `scaffold_item_definition` | Generates a new item definition from a template. Use this when the user wants to author a new item from scratch. Returns a valid definition structure that can be customized and imported. | FR-7 |
| `list_item_types` | Lists all Fabric item types that support definition import/export. Use this when the user needs to know which items can be managed through definitions. Returns type names and supported operations. | Supporting |

---

## 6. Phase 1 Open Questions

| # | Question | Context | Owner | Status |
|---|----------|---------|-------|--------|
| 1 | What's the approval UX for write operations? | Human-in-the-loop requirement — show command, wait for approval | Design | Open |
| 2 | Which item types are supported initially? | Start with notebooks? All types? | PM | Open |
| 3 | How do we handle large item definitions? | Some items may have many files | Engineering | Open |

---

# Phase 2: Workspace Operations (Future)

> **Scope:** Batch operations — import/export entire workspaces, handle dependencies, support deployment workflows.  
> **Status:** Initial requirements only. Implementation details TBD based on Phase 1 learnings.

---

## 7. Phase 2 Scenarios

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

## 8. Phase 2 Initial Requirements

> **Note:** These requirements are preliminary. Implementation approach (batch API vs. Fabric CI/CD library vs. CLI) will be determined when we start Phase 2.

| ID | Requirement | Description | Notes |
|----|-------------|-------------|-------|
| **FR-8** | **Batch export** | Export all items from a workspace to a local folder. Preserves folder structure and item relationships. | May use batch API or iterate single-item export |
| **FR-9** | **Batch import** | Import all items from a local folder to a workspace. Handle item dependencies and conflicts. | May use batch API or Fabric CI/CD library |
| **FR-10** | **Dependency resolution** | When importing multiple items, resolve cross-item references. Items referencing other items (e.g., report → semantic model) should be imported in correct order. | Complex — may defer to CLI/CI/CD library |
| **FR-11** | **ID remapping** | When deploying to a different workspace/tenant, remap internal IDs to new targets. Bind items to correct data sources in target environment. | Complex — may use parameterization |
| **FR-12** | **Dry-run mode** | Preview what will happen during import without actually applying changes. Show what items will be created/updated/skipped. | Nice-to-have for confidence |

### Open Questions for Phase 2

| # | Question | Context |
|---|----------|---------|
| 1 | Use batch import/export API or Fabric CI/CD library? | CI/CD library has parameterization, binding, etc. |
| 2 | How to handle deployment configuration (environment-specific settings)? | May need parameter files or config templates |
| 3 | What's the UX for reviewing batch changes? | Many items = complex diff |

---

# Appendix

## Appendix A: CLI as Execution Engine

> **Status:** Proposed approach for implementation. Final decision TBD with engineering.

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

### Technical Considerations

| Concern | Consideration |
|---------|---------------|
| **Language mismatch** | MCP is .NET, CLI is Python. Need to handle Python environment setup. |
| **User prerequisites** | Today: Install VS Code extension. With CLI: Also need Python + CLI installed. |
| **Error handling** | CLI errors need to be surfaced clearly through MCP responses. |
| **Approval flow** | MCP should show the CLI command before execution for user approval. |

**Mitigation:** Consider bundling CLI with the MCP extension, or providing clear setup guidance.

---

## Appendix B: Remote Agents Using Local MCPs

**Question:** Can remote/cloud-hosted agents (e.g., GitHub Copilot, Copilot Studio) use Local MCPs?

**Industry context:**  
This is an emerging pattern. Some approaches:
- **Tunneling:** Local MCP exposes an endpoint via secure tunnel (ngrok-style)
- **Hybrid execution:** Remote agent generates instructions, local runtime executes
- **MCP proxies:** Gateway services that route remote requests to local MCPs

**Recommendation:** Track this as a future exploration. For now, focus on local agent scenarios (VS Code, Cursor, local Copilot).

---

## Appendix C: Existing Tools — Namespace Reorganization

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

---

## Appendix D: Tool Naming Standards

### Naming Pattern

```
Name:        <verb>_<object>
Description: <Primary action>. Use this when <condition>. <Constraints/notes>.
```

### Research & Methodology

**AI tools used:**
- Manual research and ChatGPT Deep Research on industry standards and best practices  
- VS Code, GitHub Copilot  
- Model: Claude Sonnet 4.5  
- Custom content-writing agent (style guide and writing principles)  

**Main changes following best practices:**
- Removed redundant `mcp_fabric_mcp` from tool names  
- Moved action to front of tool name for clarity  
- Expanded descriptions with consistent pattern including action, usage condition, and constraints  
- Followed Microsoft Fabric style guide and writing principles

### Complete Tool Renaming Reference

#### Microsoft/Azure Documentation & Code Samples

| Current | Proposed | Description |
|---------|----------|-------------|
| `mcp_fabric_mcp_microsoft_docs_search` | `search_microsoft_docs` | Searches official Microsoft and Azure documentation for relevant content. Use this when the user needs information about Microsoft products, services, or Azure resources. Returns up to 10 content chunks with titles, URLs, and excerpts. |
| `mcp_fabric_mcp_microsoft_docs_fetch` | `get_microsoft_docs` | Retrieves the complete content of a specific Microsoft documentation page in markdown format. Use this when search results identify a high-value page that needs full detail. |
| `mcp_fabric_mcp_microsoft_code_sample_search` | `search_microsoft_code_samples` | Searches official Microsoft and Azure code samples by topic, service, or SDK name. Use this when generating code or providing implementation examples. Can filter by programming language. |

#### Subscriptions & Resource Groups

| Current | Proposed | Description |
|---------|----------|-------------|
| `mcp_fabric_mcp_subscription_list` | `list_azure_subscriptions` | Lists all Azure subscriptions accessible to the current account. Use this when the user needs to select a subscription or view available Azure environments. |
| `mcp_fabric_mcp_group_list` | `list_resource_groups` | Lists all resource groups in an Azure subscription. Use this when the user needs to view Azure resource organization or select a resource group. |

#### OneLake Storage & Items

| Current | Proposed | Description |
|---------|----------|-------------|
| `mcp_fabric_mcp_onelake_workspace_list` | `list_workspaces` | Lists all Fabric workspaces accessible via OneLake data plane API. Use this when the user needs to view available workspaces or select a workspace. |
| `mcp_fabric_mcp_onelake_item_list` | `list_workspace_items` | Lists items in a Fabric workspace. Use this when the user needs to see what items exist in a workspace. |
| `mcp_fabric_mcp_onelake_item_list-data` | `list_onelake_items_dfs` | Lists items using the DFS-style data API. Use this when detailed filesystem-level access is needed. |
| `mcp_fabric_mcp_onelake_item_create` | `create_item` | Creates a new item in a Fabric workspace. Use this when the user wants to create a Lakehouse, Notebook, or other item type. |
| `mcp_fabric_mcp_onelake_file_list` | `list_onelake_files` | Lists files and directories in OneLake storage. Use this when the user needs to explore OneLake content in a filesystem structure. |
| `mcp_fabric_mcp_onelake_directory_create` | `create_onelake_directory` | Creates a directory in OneLake storage. Use this when the user needs to organize files or prepare folder structures. |
| `mcp_fabric_mcp_onelake_directory_delete` | `delete_onelake_directory` | Deletes a directory from OneLake storage. Use this when the user needs to remove a folder. |
| `mcp_fabric_mcp_onelake_upload_file` | `upload_onelake_file` | Uploads a file to OneLake storage. Use this when the user needs to store data in OneLake. |
| `mcp_fabric_mcp_onelake_download_file` | `download_onelake_file` | Downloads a file from OneLake storage. Use this when the user needs to retrieve file content or metadata. |
| `mcp_fabric_mcp_onelake_file_delete` | `delete_onelake_file` | Deletes a file from OneLake storage. Use this when the user wants to remove a specific file. |

#### Fabric Public APIs

| Current | Proposed | Description |
|---------|----------|-------------|
| `mcp_fabric_mcp_publicapis_list` | `list_fabric_api_workloads` | Lists Fabric workload types that have public API specifications available. Use this when the user needs to discover what APIs exist. |
| `mcp_fabric_mcp_publicapis_get` | `get_fabric_api_spec` | Retrieves the complete OpenAPI specification for a specific Fabric workload. Use this when the user needs detailed API documentation. |
| `mcp_fabric_mcp_publicapis_platform_get` | `get_fabric_platform_api_spec` | Retrieves the OpenAPI specification for core Fabric platform APIs. Use this when the user needs documentation for cross-workload APIs. |
| `mcp_fabric_mcp_publicapis_itemdefinition_get` | `get_fabric_item_schema` | Retrieves JSON schema definitions for a Fabric workload API. Use this when the user needs to understand item structure or validate definitions. |
| `mcp_fabric_mcp_publicapis_bestpractices_get` | `get_fabric_best_practices` | Retrieves embedded best-practice documentation for a specific Fabric topic. Use this when the user needs guidance or implementation patterns. |

---

## References

- [Fabric CLI Documentation](https://learn.microsoft.com/fabric/cli)
- [MCP Specification](https://modelcontextprotocol.io)
- [Fabric Item Definition API](https://learn.microsoft.com/fabric/api/item-definition)
