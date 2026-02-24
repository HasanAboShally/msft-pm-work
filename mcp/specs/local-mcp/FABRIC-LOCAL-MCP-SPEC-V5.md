# Fabric Local MCP: AI-Powered Local Development

**Feature:** Fabric Local MCP  
**PM:** Hasan Abo-Shally  
**Engineering Lead:** Amos Hersch  
**Status:** Public Preview  
**Current Version:** 0.0.0-beta.2  
**Last Updated:** December 1, 2025

---

## Executive Summary

Fabric Local MCP is an open-source Model Context Protocol (MCP) server that runs locally on a developer's machine, bridging the gap between AI coding assistants (GitHub Copilot, Claude, VS Code) and Microsoft Fabric. It solves the "hallucination" and "context switching" problems by providing real-time API schemas, validation, and execution tools directly to the AI agent. This enables developers to generate accurate code, author complex item definitions with confidence, and execute seamless bidirectional workflows without leaving their IDE.

**Distribution Channels (All Live):**
- **VS Code Extension:** "Microsoft Fabric MCP Server" on VS Code Marketplace
- **NuGet Package:** `Microsoft.Fabric.Mcp`
- **NPM Package:** `@microsoft/fabric-mcp`

---

## 1. Problem Statement

Developers building on Fabric today face a fragmented and friction-filled experience. While Fabric offers powerful APIs, integrating them into a development workflow is manual and error-prone.

**The Core Friction:**
- **AI Hallucination:** LLMs lack knowledge of the latest Fabric APIs. They frequently generate code with incorrect endpoints or outdated schemas, forcing developers to spend **15-20 minutes** debugging non-existent APIs.
- **Context Switching:** To find the correct schema for a `Lakehouse` or `Warehouse`, a developer must leave their IDE, search Microsoft Learn, and manually copy-paste JSON/YAML examples. Research shows this context switching costs **~23 minutes** of focus time per interruption.
- **Authentication Complexity:** Writing a simple script to upload a file requires 30-40 lines of boilerplate OAuth2 code. This high barrier prevents ad-hoc automation.

**Why Existing Solutions Fail:**
- **Manual Documentation:** Static, often outdated, requires leaving flow state.
- **Portal UI:** Great for low-code, but lacks version control, bulk operations, CI/CD.
- **Custom Scripts:** Fragile, hard to maintain, require deep auth expertise.

**The Opportunity:**
By providing a Local MCP Server, we give AI agents a "brain upgrade"—direct access to the latest Fabric schemas and a secure way to execute local commands. This transforms the IDE into a true Fabric control center.

---

## 2. Goals & Non-Goals

### Goals

| Pri | Goal | Success Metric |
|-----|------|----------------|
| P0 | **Eliminate Hallucinations.** AI assistants have 100% accurate, real-time schema context. | Code gen accuracy (user feedback) |
| P0 | **Streamline Local Workflows.** Seamless bidirectional data/config movement between IDE and Fabric. | Time to complete download-fix-upload loop |
| P0 | **Zero-Friction Auth.** Abstract OAuth2 complexity—developers never write auth code again. | Time to first successful API call |
| P1 | **CLI-First Code Generation.** Generate Fabric CLI scripts (not SDK code) for readability and adoption. | CLI command generation accuracy |

### Non-Goals

- **Not a Cloud Service:** This server runs locally. For cloud-hosted agents, see *Remote MCP*.
- **Not a UI Replacement:** We enable code-first workflows, not visual drag-and-drop.
- **Not for Production Pipelines:** This is a *development* tool. Production ETL should use Fabric Pipelines or Data Factory.
- **Not JetBrains (Yet):** IDE support limited to VS Code. JetBrains deferred post-GA.

---

## 3. Guiding Principles

1. **Trust agents, verify destructive actions.** Assume AI can plan effectively. Destructive operations (delete, overwrite) require confirmation; everything else defaults to enabled.

2. **Agents inherit user permissions, never exceed them.** Every MCP tool executes within user's RBAC boundaries. If you can't do it in the portal, you can't do it via MCP.

3. **Offline-first for context, cloud-when-needed for execution.** Context tools (schemas, docs) work without internet. Execution tools authenticate lazily—only when cloud operations are required.

4. **CLI over SDK for agent code generation.** Generate Fabric CLI scripts instead of Python/C# SDK code. CLI commands are human-readable, easier for agents to debug, and promote CLI adoption.

5. **Errors must teach, not just fail.** Error messages include: (1) what went wrong, (2) why, (3) how to fix it, (4) link to docs. Transient failures retry automatically with exponential backoff.

6. **Optimize for LLM context windows.** Return concise, structured responses. Large datasets support filtering and pagination by default. Never return raw API payloads when a summary suffices.

---

## 4. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         USER / AI AGENT                                 │
│                       (Natural Language)                                │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                       CLIENT HOST                                       │
│               (VS Code / GitHub Copilot / Claude)                       │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │ MCP Protocol (stdio)
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      FABRIC LOCAL MCP                                   │
│                   (Runs on Developer Machine)                           │
├─────────────────────────────────────────────────────────────────────────┤
│  CONTEXT TOOLS (Offline)          │  EXECUTION TOOLS (Cloud)            │
│  • publicapis list/get            │  • upload_file        ← OneLake     │
│  • itemdefinition get             │  • download_file      ← OneLake     │
│  • search_documentation           │  • list_files         ← OneLake     │
│  • get_fabric_glossary            │  • create_item / update_item        │
│  • generate_cli_script            │  • delete_item                      │
│  • best practices guidance        │  • create_deployment (dry_run)      │
└───────────┬─────────────────────────────────────────┬───────────────────┘
            │                                         │
            ▼                                         ▼
    ┌───────────────┐                         ┌───────────────────────────┐
    │  Local Files  │                         │      FABRIC CLOUD         │
    │  Embedded     │                         │  (REST APIs + OneLake)    │
    │  Schemas      │                         └───────────────────────────┘
    └───────────────┘
```

### Key Concepts

| Concept | Description |
|---------|-------------|
| **Context Tools** | Read-only, run locally, no auth required. Provide schemas, docs, examples, best practices. |
| **Execution Tools** | Write operations, require OAuth2, interact with Fabric cloud. |
| **MCP Resources** | Static knowledge (glossary, templates) agents reference without API calls. |
| **Dry Run** | Simulation mode for destructive operations—shows diff before execution. |
| **Local-First Security** | All context is offline; developer controls when cloud calls happen. |

### Integration Flow

1. **User Prompt:** Developer asks Copilot: *"Upload this CSV to my Lakehouse."*
2. **Local Routing:** VS Code routes request to Fabric Local MCP (background process).
3. **Context Check:** MCP validates request against embedded schemas.
4. **Cloud Execution:** If cloud access needed, uses cached OAuth2 token to call Fabric APIs.
5. **Result:** Operation completes; agent returns success message with item link.

---

## 5. Hero Scenarios

### Scenario A: Zero-Hallucination Code Gen (Jian — Developer)
Jian types: *"@fabric Write a function to create a Lakehouse and upload a CSV."*
→ Local MCP provides exact OpenAPI spec via `publicapis get`
→ Agent generates code with correct endpoints
→ **Result:** Code compiles and runs on first try. No documentation lookup.

### Scenario B: First-Try Deployment (Ari — Data Architect)
Ari opens a new `warehouse.yml` in VS Code.
→ Local MCP detects file type, provides JSON schema via `itemdefinition get`
→ IntelliSense, autocomplete, real-time validation (red squiggles)
→ **Result:** Deploys successfully on first attempt. No deploy-fail-fix cycles.

### Scenario C: Bidirectional Workflow (Ren — Data Engineer)
Ren asks: *"Download 'sales_error.csv' from Prod, let me fix it, upload to Staging."*
→ Agent calls `download_file` → Ren fixes locally → Agent calls `upload_file`
→ **Result:** Cloud-local-cloud workflow completed in minutes without OAuth scripts.

### Scenario D: Dry Run Safety Check (Ren — Data Engineer)
Ren asks: *"Deploy this config, but show me what would happen first."*
→ Agent calls `create_deployment` with `dry_run=true`
→ MCP returns diff: *"Would create 3 items, update 2, DELETE 'Old_Lakehouse'."*
→ **Result:** Ren reviews, confirms, authorizes real deployment.

---

## 6. Milestones Overview

| Milestone | Target | Theme | Key Deliverables |
|-----------|--------|-------|------------------|
| **Current** | Live (beta.2) | Context, Validation & Distribution | OpenAPI specs, JSON schemas, VS Code extension, NuGet, NPM |
| **M1** | Q1 2026 | OneLake & Auth | File operations (upload/download/list), integrated auth, error handling |
| **M2** | Q2 2026 | Execution & CLI | Item CRUD, CLI generation, dry run, deployment planning |
| **GA** | Mar 2026 | Production Ready | FabCon Atlanta launch, full docs, production SLAs |

---

## 7. Requirements by Milestone

### 7.1 Current (Public Preview — Live)

| Pri | Category | I can... | Requester | Status |
|-----|----------|----------|-----------|--------|
| P0 | Context | Generate accurate Fabric code without looking up docs | Developer | ✅ |
| P0 | Context | Validate item definitions (YAML/JSON) as I type | Developer | ✅ |
| P0 | Context | See best-practice examples for my specific task | Developer | ✅ |
| P0 | Context | Search Fabric documentation semantically | Developer | ✅ |
| P0 | Context | Get definitions of key Fabric concepts (glossary) | Developer | ✅ |
| P0 | Context | Access best-practice guidance (pagination, error handling, LRO) | Developer | ✅ |
| P0 | Security | Trust that my tokens are never logged | Platform | ✅ |
| P0 | Distribution | Install via VS Code Marketplace extension | Developer | ✅ |
| P0 | Distribution | Install via NuGet (`Microsoft.Fabric.Mcp`) | Developer | ✅ |
| P0 | Distribution | Install via NPM (`@microsoft/fabric-mcp`) | Developer | ✅ |

### 7.2 M1 (Q1 2026) — OneLake & Auth

| Pri | Category | I can... | Requester | Status |
|-----|----------|----------|-----------|--------|
| P0 | Data | Upload local files to OneLake/Lakehouse | Data Engineer | 🔄 OneLake contributing |
| P0 | Data | Download files from OneLake to local | Data Engineer | 🔄 OneLake contributing |
| P0 | Data | List files and directories in OneLake | Data Engineer | 🔄 OneLake contributing |
| P0 | Auth | Authenticate once and stay logged in (token cached) | Developer | 🔄 |
| P1 | Auth | Use my Azure CLI credentials if I prefer | Developer | 🔄 |
| P0 | Reliability | Trust the agent to retry transient failures automatically | Platform | 🔄 |
| P0 | Errors | See structured error messages with actionable guidance | Developer | 🔄 |
| P0 | Errors | Get clear distinction: "user lacks permission" vs "MCP misconfigured" | Developer | 🔄 |

### 7.3 M2 (Q2 2026) — Execution & CLI

| Pri | Category | I can... | Requester | Status |
|-----|----------|----------|-----------|--------|
| P0 | Items | Deploy a new item (Lakehouse, Warehouse) from my IDE | Developer | 🔄 |
| P0 | Items | Update an existing item's definition | Developer | 🔄 |
| P0 | Items | Delete a Fabric item (with confirmation) | Developer | 🔄 |
| P1 | Safety | Simulate a deployment to see what would happen (dry run) | Data Engineer | 🔄 |
| P1 | CLI | Generate Fabric CLI scripts from natural language | Developer | 🔄 |
| P1 | Search | Search for items by display name, not just ID | Developer | ⚠️ Needs Catalog API |
| P1 | Planning | Plan multi-item deployments with dependency analysis | Platform | 🔄 |
| P0 | Progress | See progress updates for long-running operations (>10s) | Developer | 🔄 |

### 7.4 GA (Mar 2026)

| Pri | Category | I can... | Requester | Status |
|-----|----------|----------|-----------|--------|
| P0 | Docs | Access complete documentation and tutorials | Developer | 🔄 |
| P0 | SLA | Rely on production-grade SLAs | Platform | 🔄 |
| P1 | Telemetry | Trust that MCP usage is tracked for product improvements | Platform | 🔄 |

### 7.5 Post-GA Backlog

| Pri | Category | I can... | Notes |
|-----|----------|----------|-------|
| P2 | CLI | Get CLI IntelliSense and inline docs in VS Code | Enhances CLI adoption |
| P2 | Telemetry | Have user agent propagation (track VS Code vs Claude vs Cursor) | Informs prioritization |
| P2 | Planning | Perform multi-workspace dependency analysis | Advanced deployment |
| P2 | Templates | Access community-contributed Blueprint templates | Ecosystem growth |
| P2 | Notebooks | Use `!fabric` magic command in Jupyter notebooks | Python wrapper for CLI |
| P2 | Container | Run Fabric MCP in Docker container | User request |
| P2 | IDE | Support JetBrains IDEs (IntelliJ, PyCharm) | Broader reach |

---

## 8. Success Metrics

| Outcome | Metric | Target (at GA) | Source |
|---------|--------|----------------|--------|
| **Adoption** | Weekly Active Users (WAU) | **5,000+** | Azure MCP adoption curve (6 months) |
| **Code Quality** | First-attempt deployment success | **75%+** | Internal pilot (50 devs, Q4 2025) |
| **Efficiency** | Time to author complex item | **< 5 min** (vs 30+) | Customer time-motion studies |
| **Satisfaction** | VS Code Marketplace Rating | **4.5/5** | Top 10% of VS Code extensions |
| **Safety** | Critical Security Incidents | **0** | Non-negotiable |

---

## 9. Open Questions & Risks

### Open Questions

| # | Question | Working Answer |
|---|----------|----------------|
| Q1 | How do we handle large file uploads (>1GB)? | Chunked upload via OneLake DFS API. |
| Q2 | Should we use MCP Resources (static) vs Tools (dynamic)? | Yes—Resources for glossary, templates. Tools for execution. |
| Q3 | What's the distinction between "Blueprint" and "Template"? | Requires PM alignment with Unified Copilot team. |
| Q4 | How do we coordinate with OneLake team on file operations? | Active collaboration (Srinivas Thatipamula contributing). |
| Q5 | Should `generate_cli_script` require Fabric CLI installed? | Engineering investigating hybrid approach. |
| Q6 | Will Fabric MCP merge into unified "Microsoft MCP" at GA? | Direction from Azure MCP leadership (Josh Free). Under discussion. |
| Q7 | Should we provide Docker image for containerized usage? | User request exists. Can add if demand grows. |

### Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Fabric API breaking changes | High | Automated daily integration tests |
| CLI adoption via MCP bypasses telemetry | Medium | User agent propagation (Post-GA) |
| OAuth token management complexity | Medium | OS keychain integration, clear error messages |
| OneLake contribution delays | Medium | Clear interface contracts, parallel development |
| Scope creep (execution tools blur Local vs Remote) | Medium | Clear ownership: Local = dev workflows, Remote = Copilot/agents |

---

## 10. Resources & References

- **GitHub Repository:** [github.com/microsoft/mcp](https://github.com/microsoft/mcp) *(Fabric MCP is part of Microsoft MCP monorepo)*
- **VS Code Extension:** [Microsoft Fabric MCP Server](https://marketplace.visualstudio.com/items?itemName=fabric.fabric-mcp) on VS Code Marketplace
- **NuGet Package:** [Microsoft.Fabric.Mcp](https://www.nuget.org/packages/Microsoft.Fabric.Mcp)
- **NPM Package:** [@microsoft/fabric-mcp](https://www.npmjs.com/package/@microsoft/fabric-mcp)
- **Blog Announcement:** [Introducing Fabric MCP (Public Preview)](https://blog.fabric.microsoft.com/en-us/blog/introducing-fabric-mcp-public-preview/) — Oct 2, 2025
- **Related Spec:** `FABRIC-REMOTE-MCP-SPEC-V5.md` (cloud-hosted MCP for Unified Copilot)
- **MCP Standard:** [modelcontextprotocol.io](https://modelcontextprotocol.io)
- **Fabric CLI Docs:** [Microsoft Learn — Fabric CLI](https://learn.microsoft.com/fabric/cli)

---

# Appendices

---

## Appendix A: Tool Capabilities

### A.1 Context Tools (Live)

| Tool | Operation | Description | Status |
|------|-----------|-------------|--------|
| `publicapis list` | List | Discover available Fabric workloads and items | ✅ |
| `publicapis get` | Read | Get full OpenAPI spec for a workload | ✅ |
| `publicapis itemdefinition get` | Read | Get JSON/YAML schema for item definition | ✅ |
| `publicapis examples get` | Read | Retrieve code samples for common tasks | ✅ |
| `search_documentation` | Search | Semantic search over embedded Fabric docs | ✅ |
| `get_fabric_glossary` | Read | Retrieve definitions of key Fabric concepts | ✅ |

### A.2 OneLake Tools (M1 — In Progress)

| Tool | Operation | Description | Status |
|------|-----------|-------------|--------|
| `upload_file` | Write | Upload local file to OneLake | 🔄 OneLake contributing |
| `download_file` | Read | Download file from OneLake to local | 🔄 OneLake contributing |
| `list_files` | List | List files/directories in OneLake path | 🔄 OneLake contributing |

### A.3 Execution Tools (M2)

| Tool | Operation | Description | Status |
|------|-----------|-------------|--------|
| `create_item` | Create | Create new Fabric item from local definition | 🔄 |
| `update_item` | Update | Update existing item's definition | 🔄 |
| `delete_item` | Delete | Delete Fabric item (requires confirmation) | 🔄 |
| `create_deployment` | Create | Orchestrate multi-item deployment (supports dry_run) | 🔄 |
| `plan_deployment` | Read | Analyze item dependencies, suggest deployment order | 🔄 |
| `generate_cli_script` | Generate | Create Fabric CLI commands from natural language | 🔄 |
| `search_items_by_name` | Search | Find items by display name (fuzzy search) | ⚠️ Needs Catalog API |

### A.4 MCP Resources

| Resource | Description | Milestone |
|----------|-------------|-----------|
| Fabric Glossary | Definitions of key concepts (Lakehouse, Warehouse, etc.) | ✅ Live |
| Best Practices | Pagination, error handling, LRO patterns | ✅ Live |
| Blueprint Templates | Common workspace patterns (Data Science, BI Analytics) | M2 |
| Example Scripts Library | Curated CLI/Python scripts for common tasks | M2 |

> **Note:** MCP Resources provide static knowledge for agent learning. Tools provide dynamic execution.

---

## Appendix B: User Personas

### Jian — Developer (The App Builder)
- **Role:** Builds custom applications integrating with Fabric
- **Pain:** *"I spend half my time looking up API docs and debugging 400 Bad Request errors."*
- **Delighter:** Zero-hallucination code gen. Code that just works.

### Ren — Data Engineer (The Automator)
- **Role:** Builds and maintains data pipelines
- **Pain:** *"Moving data between my laptop and the cloud for testing is a manual nightmare."*
- **Delighter:** Bidirectional workflow. Upload/download as easy as `cp`.

### Ari — Data Architect (The Guardian)
- **Role:** Designs schemas and ensures governance
- **Pain:** *"I catch schema errors only after deployment fails."*
- **Delighter:** Validation. Red squiggles in VS Code *before* deploying.

---

## Appendix C: API Dependencies & Gaps

### C.1 Required APIs

| API | Owner | Used For | Status |
|-----|-------|----------|--------|
| Fabric REST API (Items) | Control Plane | Item CRUD, workspace operations | ✅ Available |
| OneLake DFS API | OneLake | File upload/download | ✅ Available |
| Fabric OpenAPI Specs | DevX | Schema context for code gen | ✅ Available |
| Item Definition Schemas | DevX | YAML/JSON validation | ✅ Available |

### C.2 Gap Summary

| Gap | Severity | Owner | Resolution | Target |
|-----|----------|-------|------------|--------|
| Catalog Search API (fuzzy by name) | Medium | Catalog Team | API in development | M2 |
| Large file chunked upload (>1GB) | Low | OneLake | Use DFS multipart | Post-GA |

### C.3 Cross-Team Dependencies

| Team | Dependency | Status | Contributor |
|------|------------|--------|-------------|
| OneLake | File operation tools (upload/download/list) | 🔄 Active contribution | Srinivas Thatipamula |
| Azure MCP | Shared release pipeline, marketplace publishing | ✅ Working | Azure MCP team |
| Unified Copilot | Blueprint/Template terminology alignment | 🔄 PM alignment | — |
| DevX | OpenAPI spec freshness (daily sync) | ✅ Automated | — |

---

## Appendix D: Glossary

| Term | Definition |
|------|------------|
| **Local MCP** | MCP server running on developer's machine |
| **Remote MCP** | MCP server running in Fabric cloud (for Unified Copilot) |
| **Context Tools** | Read-only tools, local execution, no auth required |
| **Execution Tools** | Write operations, require OAuth2, interact with cloud |
| **MCP Resources** | Static knowledge (glossary, templates) agents reference without API calls |
| **Dry Run** | Simulation of an operation without side effects |
| **Blueprint** | Reusable workspace provisioning pattern |
| **Item Definition** | YAML/JSON schema defining a Fabric item's structure |
| **OneLake** | Unified data lake for Microsoft Fabric |

---

## Appendix E: Release History

| Version | Date | Highlights |
|---------|------|------------|
| **0.0.0-beta.2** | Nov 21, 2025 | VS Code extension published, NuGet + NPM packages live |
| **0.0.0-beta.1** | Nov 18, 2025 | First pre-release, all context tools functional |
| **Public Preview Announced** | Oct 2, 2025 | Blog announcement, open-source on GitHub |
