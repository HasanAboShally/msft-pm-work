# Agentic Fabric: Fabric's Platform MCP Servers

> **Status:** DRAFT — for FabCon Atlanta, March 2026  
> **Author:** Hasan Abo Shally  
> **Categories:** AI, Announcements, Fabric Platform, Fabric Public APIs, Microsoft Fabric

---

Last October, we [introduced the Fabric MCP](https://blog.fabric.microsoft.com/en-us/blog/introducing-fabric-mcp-public-preview) — a local MCP server that gives AI agents contextual knowledge about Fabric's APIs, best practices, and item definitions. In five months, that blog has been viewed over 93,000 times. The signal was clear: developers want their AI assistants to understand Fabric — deeply and natively.

Today at FabCon Atlanta, we're announcing the next chapter: **the Local MCP is now Generally Available**, and we're launching a **Public Preview of the Fabric Remote MCP** — a cloud-hosted MCP server that lets AI agents perform real operations in your Fabric environment.

Together, these two servers form a complete agentic platform for Fabric: one that gives agents knowledge, and one that gives agents the ability to act.

---

## What's MCP — and Why Does It Matter for Fabric?

The [Model Context Protocol (MCP)](https://modelcontextprotocol.io) is an open standard that lets AI applications connect to external tools and data sources through a consistent interface. Think of it as a USB port for AI: instead of building custom integrations for every AI tool, you expose your platform as an MCP server — and any MCP-compatible client (GitHub Copilot, Claude, Cursor, Copilot Studio, and others) can connect immediately.

For Fabric, this means your AI assistant doesn't just know how to write Python or SQL. It knows how to create a lakehouse. It knows how to set permissions on a workspace. It knows the right API to refresh a semantic model. And it does all of this through the same security model, audit trail, and RBAC boundaries you already have in place.

No special plugins. No separate authentication. Just add a server URL and go.

---

## Local MCP: Now Generally Available

The Fabric Local MCP runs on your machine and provides AI agents with two categories of capabilities:

### Context Tools — No Cloud Connection Required

These tools give your AI agent access to Fabric's entire API surface — without ever connecting to your environment:

- **API Discovery** — `publicapis_list` and `publicapis_get` return full OpenAPI specifications for Fabric REST APIs. Your agent reads the real spec, not a stale training snapshot.
- **Best Practices** — `bestpractices_get` provides patterns for pagination, error handling, retry logic, and idempotent operations — the things that separate production code from throwaway scripts.
- **Examples & Item Definitions** — `examples_get` and `itemdefinition_get` show actual payload structures so agents generate code that works on the first try.

The result: **zero-hallucination code generation** for Fabric APIs. When your agent writes code to create a workspace or query a lakehouse table, it's reading from the source — not guessing.

### OneLake Tools — Live File Operations

These tools connect to OneLake and let agents work with files and items directly:

- Upload and download files to OneLake
- Create and delete directories
- List files and items across workspaces
- Create new Fabric items

Paired with the context tools, this means an agent can look up the correct API spec, generate the code, and then execute file operations — all within a single conversation.

### What's New for GA

Since the Public Preview launch, we've focused on production readiness:

- **Integrated authentication** — seamless sign-in flow, no manual token management
- **Error polish and auto-retry** — agents recover gracefully from transient failures
- **Production SLAs** — backed by Microsoft's standard reliability commitments
- **Telemetry and diagnostics** — visibility into tool usage and performance
- **Import/Export tools** — export and import item definitions, enabling workspace cloning and migration scenarios

### Get Started

**VS Code (one-click):** Install the Fabric MCP extension — it configures everything automatically.

**Any MCP client (manual):** Add the server to your MCP configuration:

```json
{
  "mcpServers": {
    "fabric-local": {
      "command": "npx",
      "args": ["-y", "@microsoft/fabric-mcp"]
    }
  }
}
```

Works in VS Code with GitHub Copilot, Cursor, Claude Desktop, and any MCP-compatible client.

<!-- TODO: Add link to GA documentation on Microsoft Learn -->

---

## Remote MCP: Public Preview

Here's what changes everything: the **Fabric Remote MCP** is a cloud-hosted MCP server at `https://api.fabric.microsoft.com/v1/mcp` that lets AI agents perform real operations in your Fabric environment — create workspaces, manage permissions, read schemas, upload files, and more.

No local installation. No local process. Point your AI client to the endpoint, sign in, and start asking.

### How It Works

```
Your AI Assistant  →  MCP Protocol (Streamable HTTP)  →  Fabric Remote MCP  →  Fabric REST APIs
                                                              ↓
                                                      Entra ID Auth + RBAC
                                                              ↓
                                                      Fabric Audit Logs
```

Every request flows through **Entra ID authentication** — the agent operates with your identity (or a Service Principal's identity for automation). It can never exceed your permissions. Every action is recorded in **Fabric Audit Logs**, giving admins full visibility into what agents do.

### What Agents Can Do Today (Public Preview)

The Remote MCP launches with **26 capabilities** across workspace management, item operations, permissions, data access, and more:

**Workspace Management**
- Create, read, update, delete workspaces
- List workspaces with filtering

**Item Operations**
- Full CRUD for Fabric items across 50+ types
- Get item definitions (the actual structure — notebooks, reports, semantic models)
- List items with type and name filtering

**Permissions & Identity**
- Add, remove, and list workspace role assignments
- Resolve users by email or name to Entra ID (so you can say *"add sarah@contoso.com as a contributor"* and the agent handles the lookup)

**OneLake Schema & Data**
- List schemas, tables, and columns via Unity Catalog APIs
- Upload, download, list, and delete OneLake files

**Connections & Gateways**
- List and create data connections
- Discover gateways
- Bind connections to items

**Agent Safety Controls**
- `is_consequential` flags on destructive actions — agents confirm before deleting
- `undo_action` suggestions in responses — making reversal straightforward
- Change tracking with dependency warnings

### Setup: Two Minutes, No Installation

1. In VS Code: **Cmd+Shift+P** → "MCP: Add Server" → choose HTTP
2. Enter URL: `https://api.fabric.microsoft.com/v1/mcp`
3. Sign in via browser (your Microsoft account)
4. Ask your AI assistant: *"List all my Fabric workspaces"*

That's it. You're connected.

<!-- TODO: Add links to documentation and getting-started guide on Microsoft Learn -->

---

## What Becomes Possible

The real value isn't in any single tool — it's in what agents can compose when they have both knowledge (Local MCP) and execution (Remote MCP). Here are scenarios that are now possible:

### Scenario 1: "Set Up My Project"

*"Create a new workspace called 'Q2-Analytics', add a lakehouse, upload these CSV files, and give read access to the analytics team."*

The agent creates the workspace (Remote MCP), creates the lakehouse item, uploads files to OneLake, and adds workspace roles — all through natural language, all within your permissions, all audited.

### Scenario 2: "Help Me Build a Pipeline"

*"I need a Python script that reads from my lakehouse, transforms the data, and loads it into a warehouse. Show me the right APIs."*

The agent queries the Local MCP for the correct OpenAPI specs, checks best practices for pagination and error handling, looks at your actual lakehouse schema via Remote MCP, and generates code that's grounded in reality — not hallucinated from training data.

### Scenario 3: "Audit My Environment"

*"List all workspaces I have access to, check which ones have no admin assigned, and flag any that haven't been accessed in 90 days."*

A scheduled agent in Copilot Studio runs this weekly — no developer needed. The Remote MCP supports Service Principal authentication, so this can run fully headless.

### Scenario 4: "Onboard a New Team Member"

*"Add priya@contoso.com as a contributor to the Sales-Analytics workspace, the Marketing-Reports workspace, and the Shared-Data workspace."*

The agent resolves the email to an Entra ID, then adds the role across three workspaces — a task that normally requires navigating to each workspace in the portal.

---

## Local + Remote: Better Together

The two MCP servers are designed to complement each other:

| | Local MCP | Remote MCP |
|---|-----------|------------|
| **Runs** | On your machine | In the cloud |
| **Purpose** | API knowledge + file operations | Real operations in Fabric |
| **Auth** | Local credentials | Entra ID (delegated or SPN) |
| **Connection** | stdio (local process) | HTTPS (Streamable HTTP) |
| **Use case** | Code generation, learning APIs, file upload/download | Workspace management, permissions, governance, automation |
| **Best for** | Developer inner loop | Production outer loop |

You can — and should — use both. Point your AI client at the Local MCP for code generation grounded in real API specs, and at the Remote MCP for executing operations in your Fabric environment. The combination gives agents the full picture: what's possible (Local) and what's real (Remote).

---

## Security by Design

We know that giving AI agents the ability to operate in production environments raises important questions. Here's how we've addressed them:

- **RBAC enforcement.** Agents operate with the signed-in user's permissions or the Service Principal's permissions. Period. No elevation, no bypass.
- **Audit trail.** Every operation performed through MCP is recorded in Fabric Audit Logs — the same audit infrastructure that tracks portal and API actions.
- **Consequential action controls.** Destructive operations are flagged, and agents are expected to confirm before proceeding. The protocol supports this natively.
- **No data exfiltration.** The Remote MCP returns metadata and schema information. Bulk data access flows through OneLake with its own security boundaries.
- **Admin controls.** Fabric administrators can manage MCP access through the same tenant settings they use for API access.

---

## The Road to GA

The Remote MCP Public Preview launches today. General Availability is targeted for **Microsoft Build in May 2026**, adding:

- Deployment pipelines and Git integration
- Job scheduling and monitoring
- Domain and folder management
- OneLake shortcuts and data access security
- Dry-run/simulation mode for safe experimentation
- Multi-workspace operations
- OpenAPI export for custom integrations

We're working closely with design partners and the community to shape these capabilities. If you try the preview and find gaps — or discover scenarios we haven't thought of — [tell us](https://github.com/microsoft/fabric-mcp/issues).

---

## Documentation

Detailed documentation for both MCP servers is available on Microsoft Learn:

- **Local MCP — Getting Started:** [TODO: Add Learn link]
- **Local MCP — Tool Reference:** [TODO: Add Learn link]
- **Remote MCP — Getting Started:** [TODO: Add Learn link]
- **Remote MCP — Capabilities Reference:** [TODO: Add Learn link]
- **Fabric MCP FAQ:** [TODO: Add Learn link]

---

## Get Started Today

**Local MCP (GA):**
```bash
# Via npm
npx @microsoft/fabric-mcp

# Or install the VS Code extension
# Search "Fabric MCP" in the Extensions marketplace
```

**Remote MCP (Public Preview):**
```
Server URL: https://api.fabric.microsoft.com/v1/mcp
Auth: Sign in with your Microsoft account
```

Add either (or both) to your AI tool of choice — VS Code with GitHub Copilot, Cursor, Claude Desktop, Copilot Studio, or any MCP-compatible client.

The era of agentic data platforms is here. Your AI assistant now speaks Fabric — fluently.

---

<!-- 
REVIEW NOTES:
- [ ] Confirm Local MCP GA is shipping at FabCon (March 16, 2026)
- [ ] Confirm Remote MCP Public Preview is shipping at FabCon
- [ ] Confirm Remote MCP endpoint URL is correct and public
- [ ] Confirm the 26 capabilities count for M1
- [ ] Add all Microsoft Learn documentation links (docs need to be written first)
- [ ] Add images: architecture diagram, setup screenshots, scenario demos
- [ ] Confirm Service Principal auth is available in Public Preview (vs. GA only)
- [ ] Confirm Copilot Studio integration is ready for PP
- [ ] Verify identity resolution (resolve_user) is shipping in M1
- [ ] Legal/security review for the "Security by Design" section
- [ ] Get screenshots of actual agent conversations for scenarios section
- [ ] Cross-reference with FabCon session content for consistency
- [ ] Consider adding link to previous MCP blog for continuity
-->
