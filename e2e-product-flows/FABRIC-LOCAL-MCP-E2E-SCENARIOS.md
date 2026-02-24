# Fabric Local MCP — E2E Scenarios

> **Product:** Fabric Local MCP (Model Context Protocol Server)  
> **PM:** Hasan  
> **Last Updated:** Jan 2026  
> **Status:** Public Preview  
> **Repo:** [github.com/microsoft/mcp/servers/Fabric.Mcp.Server](https://github.com/microsoft/mcp/tree/main/servers/Fabric.Mcp.Server)

---

## What is Fabric Local MCP?

A **local-first** MCP server that runs on your machine, providing AI agents with:
- **Complete API Context**: Full OpenAPI specs for all Fabric workloads
- **Item Definition Schemas**: JSON schemas for Lakehouses, Pipelines, Semantic Models, Notebooks, etc.
- **Best Practices**: Embedded guidance on pagination, error handling, retry logic
- **OneLake Operations**: Upload/download files, create directories, list items

**Key Principle:** Runs entirely on your machine — provides API knowledge without connecting to live Fabric environments (for context tools). Execution tools (OneLake) do connect to Fabric.

---

## Scenario 1: Developer Building Local-to-Cloud Solutions

| | |
|---|---|
| **Persona** | **Jian** (Developer) / **Desi** (Data Scientist) |
| **JTBD** | *"Wants easier way to understand connections to models"* — Jian · *"Deploy and operationalize ML model"* — Desi |

### E2E Flow
1. Developer installs Fabric MCP VS Code extension (or manual setup)
2. Opens VS Code with GitHub Copilot in Agent mode
3. Asks: *"What Fabric workload types are available?"* → Agent uses `publicapis_list`
4. Asks: *"Show me the OpenAPI spec for creating a Lakehouse"* → Agent uses `publicapis_get`
5. Agent generates accurate code using real schemas (no hallucinations)
6. Asks: *"Upload my local CSV to the Lakehouse"* → Agent uses `onelake_upload_file`
7. Validates and tests solution

### Example Prompts
- *"Generate code to create a Lakehouse with a schema that has a string and datetime column"*
- *"Show me the JSON schema for a Data Pipeline item definition"*
- *"What properties are required for creating a KQL Database?"*

### Happy Path Outcome
✅ Zero-hallucination code generation — AI agent has accurate API schemas, developer ships on first try.

---

## Scenario 2: Building Internal Apps / ISV Solutions Using Fabric APIs

| | |
|---|---|
| **Persona** | **Jian** (Developer) / **Binh** (BI Engineer) / Platform Admin / ISV |
| **JTBD** | *"Manage database security and access control"* · *"Administer the database"* — Jian · *"Maintaining source control over BI assets"* — Binh |

### E2E Flow
1. Developer sets up local MCP with Fabric authentication
2. Uses context tools to understand Fabric APIs: `publicapis_get`, `publicapis_bestpractices_get`
3. Asks: *"Show me best practices for handling API throttling in Fabric"*
4. Agent retrieves guidance on retry logic, pagination patterns, error handling
5. Developer builds internal utility app using accurate API knowledge
6. For ISVs: Uses patterns to handle multi-tenant scenarios

### Who Uses This?

| Type | Example Use Case |
|------|------------------|
| **Internal Developer** | Build a "Workspace Health Dashboard" — agent helps generate API calls |
| **Platform Admin** | Build a "Security Posture Checker" — agent knows permission APIs |
| **BI Engineer (Binh)** | Build a tool to audit report permissions — agent provides schema knowledge |
| **ISV / SaaS Builder** | Multi-tenant management — agent guides on auth patterns, rate limiting |

### Example Prompts
- *"How should I implement retry logic for Fabric API rate limits?"*
- *"What's the recommended error handling pattern for Fabric API calls?"*
- *"Show me example request/response payloads for creating a Notebook"*

### Happy Path Outcome
✅ Internal apps or ISV integrations built faster with accurate API knowledge and best practices.

---

## Summary Table

| Scenario | Persona | Core JTBD |
|----------|---------|-----------|
| Local-to-Cloud Dev | Jian, Desi | Understand APIs, Operationalize ML |
| Internal Apps / ISV | Jian, Binh, Admin, ISV | Security, Admin, API integration |

---

## Appendix

### A1. Available MCP Tools (Actual)

**Context Tools (Live — No Fabric Connection Needed):**
| Tool | Description |
|------|-------------|
| `publicapis_list` | List all Fabric workload types with public API specs |
| `publicapis_get` | Get complete OpenAPI/Swagger spec for a workload |
| `publicapis_platform_get` | Get platform-level API specs |
| `publicapis_bestpractices_get` | Get best practice docs for a topic |
| `publicapis_bestpractices_examples_get` | Get example API request/response files |
| `publicapis_bestpractices_itemdefinition_get` | Get JSON schema for item definitions |

**OneLake Tools (Live — Connects to Fabric):**
| Tool | Description |
|------|-------------|
| `onelake_upload_file` | Upload a local file to OneLake |
| `onelake_download_file` | Download a file from OneLake |
| `onelake_directory_create` | Create a directory in OneLake |
| `onelake_directory_delete` | Delete a directory (optionally recursive) |
| `onelake_file_list` | List files in a directory |
| `onelake_file_delete` | Delete a file from OneLake |
| `onelake_item_list` | List workspace items and metadata |
| `onelake_item_create` | Create new Fabric items (Lakehouse, Notebook, etc.) |

### A2. Installation Options

**VS Code (Recommended):**
1. Install [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension
2. Install [Fabric MCP Server](https://marketplace.visualstudio.com/items?itemName=fabric.vscode-fabric-mcp-server) extension
3. Open Copilot in Agent mode, refresh tools list

**Manual Setup (Other IDEs/CLIs):**
- Supports any MCP-compatible client
- See [README](https://github.com/microsoft/mcp/tree/main/servers/Fabric.Mcp.Server) for configuration

### A3. Persona Pain Points Addressed

| Persona | Pain Point | How Local MCP Helps |
|---------|------------|---------------------|
| Jian | *"Data coming from different stores"* | Agent knows all Fabric APIs and schemas |
| Desi | *"Locating data in decentralized org"* | OneLake tools help explore and move data |
| Desi | *"Delayed adoption of novel tools"* | MCP works in VS Code, Cursor, Claude — no context switch |
| Binh | *"Maintaining source control over BI assets"* | Agent helps generate accurate code for automation |

### A4. What Local MCP Does NOT Do
- ❌ Not a cloud service (for that, see Remote MCP)
- ❌ Not a UI replacement
- ❌ Not for production pipelines (use Fabric Pipelines/Data Factory)
- ❌ Context tools don't connect to live Fabric (by design — for security)
