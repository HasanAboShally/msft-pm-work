# Fabric Remote MCP — E2E Scenarios

> **Product:** Fabric Remote MCP (Cloud-Hosted MCP Server)  
> **PM:** Hasan  
> **Last Updated:** Jan 2026  
> **Status:** Private Preview (M0: Jan 2026) → Public Preview (M1: Mar 2026)

---

## What is Fabric Remote MCP?

A **cloud-hosted** execution engine that enables AI agents to interact with Microsoft Fabric. Unlike Local MCP (which provides API knowledge), Remote MCP **executes operations** in Fabric on behalf of users/agents.

**Key Capabilities:**
- **Workspace CRUD**: Create, read, update, delete workspaces
- **Item CRUD**: Create/manage Lakehouses, Notebooks, Pipelines, Semantic Models, etc.
- **OneLake Access**: Upload/download files, list schemas, tables
- **Permissions**: Add/remove role assignments
- **Connections**: List, create, bind connections to semantic models

**Key Principle:** Agents inherit user permissions, never exceed them (RBAC enforcement).

---

## Scenario 1: Unified Copilot Using Fabric MCP

| | |
|---|---|
| **Persona** | **AI Agent** (acting on behalf of user: Ash, Ren, Binh) |
| **JTBD** | *"Creating workspaces"* · *"Perform database operations"* — on behalf of users |

### E2E Flow
1. User asks Unified Copilot in Fabric Portal: *"Create a workspace called 'Sales-Analytics'"*
2. Copilot routes request to Fabric Remote MCP
3. MCP authenticates via user's delegated OAuth2 token
4. MCP calls `create_workspace` tool
5. Workspace created, response returned to user
6. Operation logged in Fabric Audit Logs

### Example Copilot Interactions
- *"List all lakehouses with a 'customers' table"* → `list_items` + `list_tables`
- *"Add Sarah as Viewer to this workspace"* → `resolve_user` + `add_workspace_role`
- *"Rename 'cust_' columns to 'customer_'"* → Preview changes, user approves, execute

### Happy Path Outcome
✅ Natural language → Fabric action. User completes tasks without leaving Copilot.

---

## Scenario 2: Custom Agent in Copilot Studio

| | |
|---|---|
| **Persona** | **Citizen Developer** / **Ash** (Analyst) / **Binh** (BI Engineer) |
| **JTBD** | *"Creating workspaces"* · *"Managing access to workspaces and reports"* — Ash · *"Create reports that meet business needs"* — Binh |

### E2E Flow
1. User opens Copilot Studio
2. Creates a custom agent with instructions (e.g., "Help users manage their Fabric workspaces")
3. Connects agent to **Fabric Remote MCP** (+ other MCPs if needed)
4. Defines behaviors and guardrails
5. Publishes agent for team/org use
6. End users interact: *"Show me workspaces I own"* → Agent calls `list_workspaces`

### Example Custom Agents

| Agent | Description | Built By |
|-------|-------------|----------|
| "Report Finder" | Helps users discover reports across workspaces | Ash (Analyst) |
| "Workspace Setup Assistant" | Guides workspace creation with best practices | Binh (BI Engineer) |
| "Permission Manager" | Automates role assignment requests | Platform Admin |
| "Compliance Scanner" | Nightly scan to enforce governance rules | Ari (Data Architect) |

### Happy Path Outcome
✅ Custom multi-system agents that orchestrate Fabric + other platforms — built by non-developers.

---

## Scenario 3: Local Coding Agent Connected to Remote MCP

| | |
|---|---|
| **Persona** | **Jian** (Developer) / **Desi** (Data Scientist) |
| **JTBD** | *"Researching and implementing better tools and IDEs"* — Desi · *"Perform database operations"* — Jian |

### E2E Flow
1. Developer configures VS Code to connect to Fabric Remote MCP
2. Authenticates via delegated OAuth2 (browser login)
3. Agent gains ability to **execute** Fabric operations
4. Developer: *"Create a Lakehouse called 'RawData' in my workspace"* → MCP executes
5. Developer: *"Upload this CSV to the Lakehouse"* → MCP calls OneLake APIs
6. Developer: *"List all tables in the Lakehouse"* → MCP returns schema info

### Happy Path Outcome
✅ Local IDE + Remote MCP = Full Fabric control from your terminal/editor.

---

## Summary Table

| Scenario | Persona | Core JTBD |
|----------|---------|-----------|
| Unified Copilot | AI Agent (on behalf of users) | Perform operations, Create workspaces |
| Copilot Studio Agent | Ash, Binh, Citizen Dev | Manage access, Create reports, Automate |
| Local Coding Agent | Jian, Desi | Execute operations, Explore Fabric |

---

## Appendix

### A1. Remote MCP vs Local MCP

| Aspect | Local MCP | Remote MCP |
|--------|-----------|------------|
| **Where it runs** | Developer's machine | Cloud-hosted by Fabric |
| **Primary Purpose** | API knowledge & schemas | Execute operations |
| **Auth** | User's local credentials | Delegated OAuth2 or Service Principal |
| **Best for** | Code generation, learning APIs | Copilots, automation, governance |
| **Connects to Fabric** | Only for OneLake tools | Yes, for all operations |

### A2. Available Tools (M0 — Private Preview)

**Workspace Tools:**
| Tool | Description |
|------|-------------|
| `create_workspace` | Create a new workspace |
| `get_workspace` | Get workspace details |
| `update_workspace` | Update workspace properties |
| `delete_workspace` | Delete a workspace |
| `list_workspaces` | List workspaces (with filtering in M1) |

**Item Tools:**
| Tool | Description |
|------|-------------|
| `create_item` | Create Fabric items (Lakehouse, Notebook, etc.) |
| `get_item` | Get item details |
| `update_item` | Update item properties |
| `delete_item` | Delete an item |
| `list_items` | List items in a workspace |
| `get_item_definition` | Get item definition (TMDL, JSON, etc.) |

**Permission Tools:**
| Tool | Description |
|------|-------------|
| `add_workspace_role` | Add role assignment |
| `remove_workspace_role` | Remove role assignment |
| `list_workspace_roles` | List role assignments |

**Semantic Model Tools:**
| Tool | Description |
|------|-------------|
| `create_semantic_model` | Create a semantic model |

### A3. M1 Additions (Public Preview — March 2026)

- OneLake schema/table operations (`list_schemas`, `list_tables`, `get_table_details`)
- OneLake file operations (`upload_file`, `download_file`, `list_files`, `delete_file`)
- Identity resolution (`resolve_user` — email/name to Entra ID)
- Connections (`list_connections`, `create_connection`, `bind_connection`)
- Enhanced filtering on `list_workspaces` and `list_items`

### A4. Authentication Options

| Method | Use Case |
|--------|----------|
| **Delegated OAuth2** | Human-in-the-loop (Copilot, VS Code) |
| **Service Principal** | Headless agents, scheduled governance |

### A5. Persona Pain Points Addressed

| Persona | Pain Point | How Remote MCP Helps |
|---------|------------|----------------------|
| Ash | *"Managing workspaces and access is time-consuming"* | Agent automates workspace/permission tasks |
| Binh | *"End users don't know what they want"* | Agents help users self-serve with guided flows |
| Desi | *"Delayed adoption of novel tools"* | MCP works in any agent platform instantly |
| Jian | *"Wishes for seamless handoff"* | Agents bridge gap between teams and Fabric |

### A6. Security Model
- **RBAC Enforcement**: Agent cannot exceed user's permissions
- **Audit Trail**: All operations logged in Fabric Audit Logs
- **Rate Limiting**: Prevents tenant overload
- **Destructive Actions**: Require explicit user confirmation
