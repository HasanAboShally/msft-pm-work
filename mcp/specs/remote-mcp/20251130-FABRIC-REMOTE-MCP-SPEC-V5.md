# Fabric Remote MCP: Cloud-Hosted Agent Execution Platform

**Feature:** Fabric Remote MCP  
**PM:** Hasan Abo-Shally  
**Engineering Lead:** Mahir Diab  
**Status:** Draft  
**Last Updated:** December 1, 2025

---

## Executive Summary

Fabric Remote MCP is a secure, cloud-hosted execution engine that enables AI agents to interact with Microsoft Fabric. It solves the "integration complexity" barrier by providing a standardized, pre-authenticated "socket" for agents, eliminating the need for developers to build custom OAuth2 stacks or API wrappers. 

**Remote MCP is the execution backbone for the Unified Copilot initiative.** The Unified Copilot is Microsoft Fabric's overarching AI assistant that provides a consistent, persistent, and intelligent interface across all Fabric workloads. It orchestrates multiple specialized agents—including the **Blueprint Agent** (spec-driven development), **Modeling Agent** (semantic model operations via AS MCP), and others—to deliver end-to-end AI-powered workflows.

**For Public Preview (M1), the scope is delivering all P0 (must-have) requirements of the Unified Copilot initiative, with the Blueprint Agent as a key specialized agent.** P1 and P2 requirements will be delivered in subsequent milestones. This focus allows us to deliver a cohesive, consistent Copilot across all Fabric workloads—the #1 customer ask for AI in Fabric. Secondary scenarios (pro-code automation, autonomous governance agents) remain in scope for GA.

---

## 1. Problem Statement

Organizations are racing to adopt AI agents, but integrating them with Fabric's infrastructure is blocked by technical complexity. **62% of enterprises** cite "integration complexity" as their top barrier to AI adoption. [1]

Currently, building an agent that can simply "create a workspace" requires a developer to build a full OAuth2 stack, handle token rotation, implement rate-limiting logic, and maintain API clients. This friction forces teams into two bad choices: wasting **~30% of development time** on plumbing [2] or falling back to unscalable manual operations. [3]

**Why Existing Solutions Fail:**

*   **Direct Public APIs:** High friction. Developers must implement complex OAuth2 flows (Delegated & App-only), handle token refresh, and manage API versioning. *Result: High barrier to entry.*
*   **Platform-Specific Connectors (e.g., Power Automate):** Low-code solutions are great for simple tasks but lack the version control, testing, and logic capabilities required for pro-code agents. They also create vendor lock-in. *Result: Limited scalability for complex scenarios.*
*   **Custom Middleware:** Large enterprises build their own "Fabric wrappers," creating security risks, maintenance burdens, and duplicated effort across the industry. *Result: Wasted engineering resources.*

**The Opportunity:** Fabric Remote MCP provides a standardized, secure, cloud-hosted "socket" that allows *any* AI agent (VS Code, Copilot, Custom) to execute Fabric operations via the open Model Context Protocol.

---
*[1] Gartner, "Top Barriers to Enterprise AI Adoption", October 2024.*  
*[2] GitHub, "State of the Octoverse: Enterprise Edition", 2023.*  
*[3] Internal customer interviews with Fortune 500 design partners (PwC, KPMG), Q4 2025.*

---

## 2. Goals & Non-Goals

### Goals

*   **Goal 1: Enable Unified Copilot & Specialized Agents (P0).** Provide the execution backbone for a single, consistent Copilot across all Fabric workloads, with specialized agents (Blueprint Agent, Modeling Agent) for domain-specific tasks.
    *   *M1 Scope: Full CRUD for Fabric items, OneLake APIs, context binding, actionable controls, connections.*

*   **Goal 2: Empower Pro-Developers (P1).** Reduce deployment and management time from days to minutes via conversational automation.
    *   *GA Scope: VS Code integration, template-based provisioning.*

*   **Goal 3: Grow the Ecosystem (P2).** Enable ISVs and enterprises to build custom agents that work with Fabric out-of-the-box.
    *   *GA Scope: Copilot Studio connector, OpenAPI spec.*

### Non-Goals

*   **Not Local Execution:** Cloud-hosted only. Local workflows handled by *Local MCP*.
*   **Not a UI Replacement:** Enabling automation, not replacing the Fabric Portal.
*   **Not Building Models:** We provide tools and context, not the LLMs themselves.
*   **Not Report/Visualization Creation:** Covered in separate specs.

---

## 3. Guiding Principles

*   **Agents inherit user permissions, never exceed them.** Every MCP tool call executes within the caller's RBAC boundaries.

*   **Trust the agent's reasoning, verify destructive actions.** Destructive operations require explicit confirmation, but the default stance is enablement.

*   **Production-ready by default.** Tools handle transient failures with automatic retry. Errors include what went wrong, why, and how to fix it.

*   **Optimize for LLM context windows.** Concise responses, pagination by default, filter parameters required.

*   **Open standards over vendor lock-in.** Built on Model Context Protocol (MCP) to work with any agent platform.

---

## 4. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              USER                                       │
│                         (Natural Language)                              │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         UNIFIED COPILOT                                 │
│                       (Fabric Portal / VS Code)                         │
├─────────────────────────────────────────────────────────────────────────┤
│  Connects directly to all MCP servers via registered endpoints          │
└───────┬─────────────────────────┬─────────────────────┬─────────────────┘
        │ MCP                     │ MCP                 │ MCP
        ▼                         ▼                     ▼
┌───────────────────┐     ┌───────────────┐     ┌───────────────┐
│ FABRIC REMOTE MCP │     │    AS MCP     │     │ NOTEBOOK MCP  │
│  (This Spec)      │     │  (Workload)   │     │  (Workload)   │
├───────────────────┤     ├───────────────┤     ├───────────────┤
│ • Workspace CRUD  │     │ • Semantic    │     │ • Cell exec   │
│ • Item CRUD       │     │   modeling    │     │ • Kernel mgmt │
│ • OneLake access  │     │ • DAX/MDX     │     │ • Outputs     │
│ • Connections     │     │ • Refresh     │     │               │
│ • Identity xlat   │     │               │     │               │
└─────────┬─────────┘     └───────┬───────┘     └───────┬───────┘
          │                       │                     │
          ▼                       ▼                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        FABRIC PLATFORM                                  │
│    (REST APIs, OneLake DFS/Unity, Entra ID, Audit Logs)                │
└─────────────────────────────────────────────────────────────────────────┘
```

### Integration Flow

1.  **User Prompt:** User asks Copilot to perform a task.
2.  **Context Binding:** Copilot inherits user's current workspace/item context.
3.  **Auth:** Each MCP server handles OAuth2 authentication via Entra ID.
4.  **Tool Selection:** Agent selects tool(s) from the appropriate MCP server(s).
5.  **Preview & Confirm:** High-impact actions require explicit confirmation.
6.  **Execute:** Each MCP executes against its respective Fabric APIs.
7.  **Audit:** All operations logged in Fabric Audit Logs.

---

## 5. Hero Scenarios

### Scenario A: Unified Copilot in Fabric Portal (Ash) — PRIMARY M1 SCENARIO

Ash (Analyst) uses Copilot in the Fabric Portal:

1. **Discovery:** *"List all lakehouses with a 'customers' table"* → MCP calls `list_items` + `list_tables`, returns 3 matches.
2. **Bulk Operation:** *"Rename 'cust_' columns to 'customer_'"* → Copilot previews changes, Ash approves, 12 columns renamed.
3. **Permissions:** *"Add Sarah as Viewer"* → MCP resolves name via `resolve_user`, confirms, adds role.
4. **Undo:** Ash clicks Undo → MCP reverts the permission change.
5. **Semantic Model:** *"Optimize Sales Model for AI"* → Routes to AS MCP, captures version, warns about downstream reports, applies changes.

### Scenario B: Environment Replication in VS Code (Ren) — GA

Ren (Data Engineer) in VS Code: *"Clone Finance_Prod to Finance_Dev without data"* → MCP replicates 15 items in minutes.

### Scenario C: Continuous Compliance (Ari) — GA

Ari (Architect) schedules agent in Copilot Studio → Nightly scan removes external Admins from Finance workspaces.

### Scenario D: Rapid Onboarding (Binh) — GA

Binh (BI Engineer): *"Onboard Contoso using Standard Retail Template"* → MCP provisions workspace + items in 2 minutes.

---

## 6. Milestones Overview

| Milestone | Date | Focus | Key Deliverables |
|-----------|------|-------|------------------|
| **M0** | Jan 2026 | Private Preview | Core platform with existing tools. Auth (User + SP), workspace/item CRUD, permissions, semantic model create. Design partner feedback. |
| **M1** | Mar 2026 | Public Preview (FabCon Atlanta) | **All P0 Unified Copilot requirements.** OneLake APIs, Blueprint CRUD, Copilot UX patterns, Connections, AS MCP integration. |
| **M2** | Apr 2026 | P1 Enhancements | Selective accept/reject, explicit context selectors, cross-agent carry-over, additional workload MCPs. |
| **GA** | May 2026 | General Availability (MS Build) | P2 nice-to-have, pro-dev scenarios (VS Code, Copilot Studio), production SLAs, full region support. |

---

## 7. Requirements

All requirements are organized by **Remote MCP milestone**. Each requirement includes a source indicating its origin.

**Legend:**
- ✅ Ready (API/capability exists)
- 🔄 In Progress (being built)
- ⚠️ Gap (needs API work or custom MCP tools)

**Sources:**
- `Unified Copilot` — From Unified Copilot requirements
- `Platform` — Core Remote MCP platform capability
- `Blueprint Agent` — Specific to Blueprint Agent needs
- `Modeling Agent` — Specific to AS MCP / Modeling Agent
- `Pro-Dev` — Developer automation scenarios

---

### 7.1 M0 Requirements — Private Preview (January 2026)

Core platform capabilities with existing tools. Validate with design partners and gather feedback.

| Pri | Category | I can... | Requester | Status |
|-----|----------|----------|-----------|--------|
| P0 | Auth | I can connect my agent to Fabric using my own user identity (delegated OAuth2). | Platform | ✅ |
| P0 | Auth | I can connect a headless agent using a Service Principal (app-only flow). | Platform | ✅ |
| P0 | Auth | I can trust that the agent cannot do anything I don't have permission to do (RBAC enforcement). | Platform | ✅ |
| P0 | Workspace | I can create, get, update, and delete workspaces. | Platform | ✅ |
| P0 | Items | I can create, get, update, and delete Fabric items. | Platform | ✅ |
| P0 | Permissions | I can add, remove, and list workspace role assignments. | Platform | ✅ |
| P0 | Semantic Model | I can create semantic models. | Platform | ✅ |
| P0 | Audit | I can see exactly what the agent did in the Fabric Audit Logs. | Platform | ✅ |
| P0 | Governance | I can schedule agents to enforce governance rules continuously (Service Principal auth). | Platform | ✅ |
| P0 | VS Code | I can connect VS Code to Fabric without writing any auth code. | Pro-Dev | ✅ |

**Legend:** ✅ Ready | 🔄 In Progress | ⚠️ Gap (needs work) | ❓ Needs clarification

---

### 7.2 M1 Requirements — Public Preview (March 2026)

MCP platform capabilities needed for Unified Copilot and Blueprint Agent. Columns: Pri (priority), Category, Requirement, Requester (who asked for this), Status.

| Pri | Category | I can... | Requester | Status |
|-----|----------|----------|-----------|--------|
| P0 | Workspace | I can list workspaces with filtering (name, capacity, permission). | Unified Copilot | ⚠️ |
| P0 | Items | I can list items with filtering (name, type, exclude system objects). | Unified Copilot | ⚠️ |
| P0 | Items | I can get item definitions to share Fabric artifact context with agents. | Blueprint Agent | ⚠️ |
| P0 | Items | I can create, read, update, and delete Fabric items. | Unified Copilot | ✅ |
| P0 | Items | I can bulk rename items using pattern matching. | Unified Copilot | ❓ |
| P0 | OneLake Schema | I can list schemas in a lakehouse. | Blueprint Agent | ⚠️ |
| P0 | OneLake Schema | I can list tables in a schema. | Blueprint Agent | ⚠️ |
| P0 | OneLake Schema | I can get full table details (columns, types, metadata). | Blueprint Agent | ⚠️ |
| P0 | OneLake Files | I can create/upload files to OneLake. | Blueprint Agent | ⚠️ |
| P0 | OneLake Files | I can read file content from OneLake. | Blueprint Agent | ⚠️ |
| P0 | OneLake Files | I can list files in a directory. | Blueprint Agent | ⚠️ |
| P0 | OneLake Files | I can delete files from OneLake. | Blueprint Agent | ⚠️ |
| P0 | Identity | I can resolve usernames/emails to Entra IDs for permission operations. | Unified Copilot | ⚠️ |
| P0 | Blueprint | I can perform CRUD operations on Blueprint artifacts. | Blueprint Agent | 🔄 |
| P0 | Connections | I can list connections (with filtering). | Unified Copilot | ⚠️ |
| P0 | Connections | I can create new connections. | Unified Copilot | ✅ |
| P0 | Connections | I can list gateways. | Unified Copilot | ✅ |
| P0 | Connections | I can bind semantic models to connections. | Unified Copilot | ✅ |
| P0 | Semantic Model | I can create semantic models. | Unified Copilot | ✅ |
| P0 | Errors | I can return clear error messages with actionable remediation steps. | Platform | ✅ |
| P0 | Errors | I can retry transient failures automatically. | Platform | ✅ |
| P0 | Errors | I can distinguish "user lacks permission" vs. "app not configured" errors. | Platform | ✅ |
| P0 | Reliability | I can handle long-running tasks without timing out (async polling). | Platform | ✅ |
| P0 | Reliability | I can return real-time progress updates for long tasks. | Platform | ✅ |
| P0 | Reliability | I can paginate large results to avoid context window overflow. | Platform | ✅ |
| P0 | Security | I can support secret rotation without breaking connections. | Platform | ✅ |
| P0 | Security | I can enforce rate limiting to prevent tenant overload. | Platform | ✅ |

**Legend:** ✅ Ready | 🔄 In Progress | ⚠️ Gap (needs work) | ❓ Needs clarification

---

### 7.3 M2 Requirements — Post-M1 (April 2026)

P1 MCP platform enhancements.

| Pri | Category | I can... | Requester | Status |
|-----|----------|----------|-----------|--------|
| P1 | Workloads | I can route to other MCPs (Notebooks, DFG2, Lakehouse) for workload-specific tasks. | Platform | 🔄 |
| P1 | Workloads | I can orchestrate complex multi-step agentic workflows. | Platform | 🔄 |
| P1 | Errors | I can return specific field and format details when API validation fails. | Platform | 🔄 |
| P1 | Platform | I can simulate complex operations before execution (dry run). | Platform | 🔄 |
| P1 | Items | I can support item-level permission management. | Unified Copilot | 🔄 |

---

### 7.4 GA+ Requirements — General Availability (May 2026+)

P2 MCP platform nice-to-have.

| Pri | Category | I can... | Requester | Status |
|-----|----------|----------|-----------|--------|
| P2 | Multi-Workspace | I can operate across multiple workspaces in a single request. | Unified Copilot | 🔄 |
| P2 | Pro-Dev | I can expose tool definitions as OpenAPI spec for Copilot Studio. | Pro-Dev | 🔄 |
| P2 | Admin | I can support tenant-wide agent access controls. | Platform | 🔄 |

**Infrastructure Deferred (GA+):**
- Advanced "Undo" history (multi-step rollback)
- Cross-tenant agent delegation
- Custom tool definitions by end-users

---

## 8. Success Metrics

| Outcome | Metric | Target (at GA) | Source |
| :--- | :--- | :--- | :--- |
| **Adoption** | Monthly Active Users (MAU) | **50,000+** | Projected from Unified Copilot user base (500K MAU × 10% agent adoption) |
| **Copilot Integration** | MAU for Copilot entry points using MCP | **25,000+** | Unified Copilot telemetry |
| **Efficiency** | Time to provision customer environment | **< 5 minutes** (vs 2-3 days) | Baseline: BI Engineer customer interviews, Q4 2025 |
| **Semantic Model AI Prep** | Models marked as 'Prepped for AI' via Copilot | **10,000+** | AS MCP telemetry |
| **Ecosystem** | Integrated Agent Platforms | **20+** (VS Code, Copilot Studio, etc.) | MCP protocol compatibility ensures broad support |
| **Performance** | Tool Execution Latency (p95) | **< 2 seconds** | Fabric API SLA (p95 < 1s) + 1s overhead budget |
| **Satisfaction** | User Satisfaction (CSAT) | **4.5/5** | Measured via in-product feedback and NPS surveys |

---

## 9. Open Questions & Risks

### Open Questions

*   **Q1:** How do we balance priority between Unified Copilot (internal) and Pro-Dev (external) scenarios if resources are tight?
    *   *Working Answer:* M1 is explicitly scoped to Unified Copilot. Pro-Dev is P1/GA.
*   **Q2:** What is the acceptable latency for "human-in-the-loop" scenarios vs. autonomous agents?
    *   *Working Answer:* Human-in-the-loop requires <2s p95. Autonomous can tolerate higher latency with async patterns.
*   **Q3:** How do we handle conflicts when multiple agents/users act on the same item concurrently?
    *   *Working Answer:* Detect and report conflicts clearly. Optimistic locking with retry-after guidance.
*   **Q4:** How will Remote MCP integrate with Blueprint artifacts?
    *   *Working Answer:* Blueprint CRUD is in scope for M1. Spec-driven development and hybrid (vibe → spec → deploy) is P1.
*   **Q5:** How will we handle context/history carry-over between modeling and Blueprint workflows?
    *   *Working Answer:* P1 - requires orchestration layer beyond MCP.

### Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Accelerated timeline (GA pulled forward 4 months) | High | Tight coordination with Identity and Governance teams. Weekly syncs. |
| Workload MCP dependencies (AS MCP, Notebook MCP) not ready for M1 | High | Define clear interface contracts. Mock implementations for testing. |
| Context binding complexity across multi-workspace scenarios | Medium | Scope multi-workspace to GA. Focus on single-workspace for M1. |
| Performance degradation with batch operations | Medium | Implement pagination and streaming. Set clear size limits. |

---

## 10. Resources & References

*   **Presentation:** `20251118-slides-content-minimal.md` (Strategy Deck)
*   **Related Spec:** `FABRIC-LOCAL-MCP-SPEC.md` (Local developer tools)
*   **Unified Copilot Requirements:** `tmp-context/202511302348-unified-copilot-requirements.md`
*   **Standard:** [Model Context Protocol](https://modelcontextprotocol.io)

---

# Appendices

---

## Appendix A: Tool Capabilities

### A.1 Control Plane Tools (Core REST API)

| Tool | Operation | API Endpoint | Milestone | Gap? |
|------|-----------|--------------|-----------|------|
| `create_workspace` | Create | POST /workspaces | M0 | ✅ |
| `get_workspace` | Read | GET /workspaces/{id} | M0 | ✅ |
| `update_workspace` | Update | PATCH /workspaces/{id} | M0 | ✅ |
| `delete_workspace` | Delete | DELETE /workspaces/{id} | M0 | ✅ |
| `list_workspaces` | List | GET /workspaces | M0 | ⚠️ Needs filter |
| `create_item` | Create | POST /workspaces/{id}/items | M0 | ✅ |
| `get_item` | Read | GET /workspaces/{id}/items/{itemId} | M0 | ✅ |
| `update_item` | Update | PATCH /workspaces/{id}/items/{itemId} | M0 | ✅ |
| `delete_item` | Delete | DELETE /workspaces/{id}/items/{itemId} | M0 | ✅ |
| `list_items` | List | GET /workspaces/{id}/items | M0 | ⚠️ Needs filter + non-system |
| `get_item_definition` | Read | GET /workspaces/{id}/items/{itemId}/getDefinition | M0 | ✅ |

### A.2 Permission Tools

| Tool | Operation | Milestone | Gap? |
|------|-----------|-----------|------|
| `add_workspace_role` | Add role assignment | M0 | ✅ |
| `remove_workspace_role` | Remove role assignment | M0 | ✅ |
| `list_workspace_roles` | List role assignments | M0 | ✅ |
| `add_item_role` | Add item-level role | M1 | ✅ |
| `remove_item_role` | Remove item-level role | M1 | ✅ |

### A.3 OneLake Schema Tools (Unity Catalog API)

| Tool | Operation | Endpoint Pattern | Milestone | Gap? |
|------|-----------|------------------|-----------|------|
| `list_schemas` | List schemas | GET /{workspace}/{item}/api/2.1/unity-catalog/schemas | M0 | ⚠️ Custom tool |
| `list_tables` | List tables in schema | GET /{workspace}/{item}/api/2.1/unity-catalog/tables | M0 | ⚠️ Custom tool |
| `get_table` | Get table details | GET /{workspace}/{item}/api/2.1/unity-catalog/tables/{name} | M0 | ⚠️ Custom tool |

### A.4 OneLake File CRUD Tools (DFS API)

| Tool | Operation | Endpoint Pattern | Milestone | Gap? |
|------|-----------|------------------|-----------|------|
| `create_file` | Create/upload file | PUT onelake.dfs.fabric.microsoft.com/{ws}/{item}/Files/{path}?resource=file | M0 | ⚠️ Custom tool |
| `read_file` | Read file content | GET onelake.dfs.fabric.microsoft.com/{ws}/{item}/Files/{path} | M0 | ⚠️ Custom tool |
| `list_files` | List directory | GET (Path - List API) | M0 | ⚠️ Custom tool |
| `delete_file` | Delete file | DELETE onelake.dfs.fabric.microsoft.com/{ws}/{item}/Files/{path} | M0 | ⚠️ Custom tool |

### A.5 Connection & Gateway Tools

| Tool | Operation | Milestone | Gap? |
|------|-----------|-----------|------|
| `list_connections` | List all connections | M1 | ⚠️ Needs filter |
| `create_connection` | Create new connection | M1 | ✅ |
| `list_gateways` | List all gateways | M1 | ✅ |
| `bind_semantic_model_connection` | Bind model to connection | M1 | ✅ |

### A.6 Semantic Model Tools

| Tool | Operation | Milestone | Gap? |
|------|-----------|-----------|------|
| `create_semantic_model` | Create model | M0 | ✅ |
| Routes to AS MCP for advanced operations | — | M1 | ✅ |

### A.7 Identity Resolution Tools

| Tool | Operation | API Source | Milestone | Gap? |
|------|-----------|------------|-----------|------|
| `resolve_user` | Resolve name/email to Entra ID | Graph API | M0 | ⚠️ Custom tool |
| `validate_context` | Validate bound context | MCP Layer | M0 | ✅ |

### A.8 Unified Copilot Support Tools

| Tool | Operation | Milestone | Gap? |
|------|-----------|-----------|------|
| `batch_update_items` | Bulk update multiple items | M1 | ✅ |
| `batch_rename` | Bulk rename with pattern | M1 | ✅ |
| `capture_version` | Capture version before change (routes to AS MCP) | M1 | ✅ |
| `list_versions` | List version history | M1 | ✅ |
| `restore_version` | Restore to previous version | M1 | ✅ |

## Appendix B: User Personas

*   **Ash (Analyst) - The Insight Creator:** ← **PRIMARY M1 PERSONA**
    *   *Quote:* "I spend way too much time formatting reports for my end users."
    *   *Role:* Produces accurate insights and manages workspace access for stakeholders.
    *   *Pain:* "Managing workspaces and access to reports is time-consuming and tedious."
    *   *Delighter:* **Seamless Management via Copilot.** Wants to ensure the right people have the right access without navigating complex settings.
    *   *M1 Focus:* Unified Copilot in Portal with context binding, actionable controls, change tracking.

*   **Ren (Data Engineer) - The Automator:**
    *   *Quote:* "The pipelines that I build are the foundation of our business intelligence."
    *   *Role:* Designs and maintains data pipelines and infrastructure.
    *   *Pain:* "Creating and testing pipelines when we make a change to our architecture is slow and error-prone."
    *   *Delighter:* **Automation of testing.** Wants to validate configs programmatically before production to save time.

*   **Binh (BI Engineer) - The Builder:**
    *   *Quote:* "I am jack of all trades, master of one (BI)."
    *   *Role:* Bridges business needs with technical setup; manages data models and reports.
    *   *Pain:* "Maintaining source control and managing environments is difficult. I'm the bottleneck for new project setups."
    *   *Delighter:* **Speed & Consistency.** Wants repeatable templates to onboard customers in minutes.

*   **Ari (Data Architect) - The Guardian:**
    *   *Quote:* "To design effective infrastructure, I need to be up-to-date on technology."
    *   *Role:* Plans and designs secure, scalable data infrastructure.
    *   *Pain:* "Managing security concerns and ensuring compliance across disparate data sources is overwhelming."
    *   *Delighter:* **Governance.** Wants comprehensive audit trails and rate limiting to ensure security.

---

## Appendix C: API Dependencies & Gap Summary

### C.1 API Dependency Matrix

| API Category | Source | Documentation | M0 Required | M1 Required |
|--------------|--------|---------------|-------------|-------------|
| **Fabric Core REST API** | Microsoft Learn | [Core API Docs](https://learn.microsoft.com/en-us/rest/api/fabric/core) | ✅ | ✅ |
| **Semantic Model REST API** | Microsoft Learn | [SemanticModel API Docs](https://learn.microsoft.com/en-us/rest/api/fabric/semanticmodel) | ✅ | ✅ |
| **OneLake Unity Catalog API** | Microsoft Learn | [Delta Table APIs](https://learn.microsoft.com/en-us/fabric/onelake/table-apis/delta-table-apis-overview) | ✅ | ✅ |
| **OneLake DFS API** | Microsoft Learn | [OneLake Access API](https://learn.microsoft.com/en-us/fabric/onelake/onelake-access-api) | ✅ | ✅ |
| **Microsoft Graph API** | Microsoft Learn | [Graph API Docs](https://learn.microsoft.com/en-us/graph/overview) | ✅ | ✅ |
| **Blueprint Public API** | Internal (shipping) | TBD | ✅ | ✅ |

### C.2 Gap Summary

| Gap ID | Description | Impact | Severity | Owner | Target Resolution |
|--------|-------------|--------|----------|-------|-------------------|
| **GAP-001** | `list_workspaces` lacks search filter | Token overflow, hallucination | 🔴 Critical | MCP Team | M1 (MCP-level filter) |
| **GAP-002** | `list_items` lacks search filter + non-system filter | Token overflow, hallucination | 🔴 Critical | MCP Team | M1 (MCP-level filter) |
| **GAP-003** | OneLake Schema APIs not exposed as MCP tools | Cannot create semantic models from lakehouse | 🔴 Critical | MCP Team | M1 (Custom tools) |
| **GAP-004** | OneLake File CRUD not exposed as MCP tools | Cannot work with Blueprint files | 🔴 Critical | MCP Team | M1 (Custom tools) |
| **GAP-005** | Graph API not integrated for identity resolution | Poor UX for permission operations | 🟡 High | MCP Team | M1 (Custom tool) |
| **GAP-006** | Item definitions not shared in MCP context | Agent lacks artifact context | 🟡 High | MCP Team | M1 (Protocol design) |
| **GAP-007** | `list_connections` lacks search filter | Token overflow for large tenants | 🟡 High | MCP Team | M1 (MCP-level filter) |

### C.3 Gap Resolution Tracking

```
┌─────────────────────────────────────────────────────────────────┐
│                    M1 Gap Resolution Timeline                   │
├─────────────────────────────────────────────────────────────────┤
│ Jan 15-31:  Design MCP-level filtering (GAP-001, GAP-002)      │
│ Feb 1-14:   Implement OneLake Schema tools (GAP-003)           │
│ Feb 15-28:  Implement OneLake CRUD tools (GAP-004)             │
│ Feb 15-28:  Integrate Graph API (GAP-005)                      │
│ Feb 15-28:  Define item definition protocol (GAP-006)          │
│ Mar 1-15:   Integration testing & bug fixes                    │
│ Mar 31:     M1 Public Preview Launch @ FabCon                  │
└─────────────────────────────────────────────────────────────────┘
```

### C.4 API Endpoint Reference

#### OneLake Schema APIs (Unity Catalog)

```
Base URL: https://api.fabric.microsoft.com

# List Schemas
GET /<WorkspaceName or ID>/<ItemName or ID>.Lakehouse/api/2.1/unity-catalog/schemas

# List Tables
GET /<WorkspaceName or ID>/<ItemName or ID>/api/2.1/unity-catalog/tables
    ?catalog_name=<ItemName or ID>
    &schema_name=<SchemaName>

# Get Table
GET /<WorkspaceName or ID>/<ItemName or ID>/api/2.1/unity-catalog/tables/<TableName>
```

#### OneLake File CRUD APIs (DFS)

```
Base URL: https://onelake.dfs.fabric.microsoft.com

# Create File
PUT /<workspace>/<item>/Files/<path>?resource=file
Body: <file content>

# Read File
GET /<workspace>/<item>/Files/<path>

# List Files
GET /<workspace>/<item>/Files/<path>?recursive=false&resource=filesystem

# Delete File
DELETE /<workspace>/<item>/Files/<path>
```

---

## Appendix D: Unified Copilot & AS MCP Dependencies

These requirements are needed for the full Unified Copilot experience but are **not Remote MCP platform deliverables**. They are owned by other teams and listed here for context and coordination.

### D.1 Copilot UX Requirements (Copilot Team)

| Category | Requirement | MCP Dependency |
|----------|-------------|----------------|
| Context | Copilot automatically understands current context (workspace, item). | MCP provides context parameters on tools |
| Context | User can upload files to provide context for Copilot operations. | None - Copilot UX feature |
| Controls | User confirms before high-impact actions (delete, permission changes). | MCP marks tools with `is_consequential` flag |
| Controls | User can accept Copilot's response completely with one click. | None - Copilot UX feature |
| Controls | User can undo a specific action immediately after applied. | MCP returns `undo_action` in responses |
| Change Tracking | User sees overview of item changes in conversation. | MCP returns change records |
| Change Tracking | User sees warnings about downstream impacts before changes. | MCP returns dependency info |
| Navigation | User sees live updates in side pane as Copilot creates/updates items. | MCP returns resource IDs/metadata |
| Navigation | User can click to open items referenced in Copilot responses. | MCP returns item URLs/IDs |
| Discovery | User can browse prompt gallery to see available capabilities. | MCP exposes tool catalog |

### D.2 Modeling Agent / AS MCP Requirements (AS MCP Team)

| Category | Requirement | MCP Dependency |
|----------|-------------|----------------|
| Semantic Model | CRUD operations on semantic models. | Routes through AS MCP |
| Semantic Model | Optimize semantic models for AI readiness. | AS MCP capability |
| Semantic Model | Suggest better names for tables, columns, measures. | AS MCP capability |
| Semantic Model | Suggest and implement relationships between tables. | AS MCP capability |
| Semantic Model | Suggest and implement measures. | AS MCP capability |
| Semantic Model | Configure column properties (formats, descriptions). | AS MCP capability |
| Semantic Model | Run and validate DAX queries. | AS MCP capability |
| Semantic Model | Capture version before changes. | AS MCP `capture_version` |
| Semantic Model | Undo/restore via version history. | AS MCP `restore_version` |

### D.3 Blueprint Agent Requirements (Blueprint Team)

| Category | Requirement | MCP Dependency |
|----------|-------------|----------------|
| Blueprint | Hybrid development workflow (vibe → spec → deploy). | MCP provides OneLake file APIs |
| Blueprint | Complex spec-driven development scenarios. | MCP provides item + schema APIs |

### D.4 P1/P2 Deferred UX Requirements

These are future Copilot UX enhancements with no MCP work required:

- Selective accept/reject individual changes
- Copy Copilot's response from chat
- Display selected context in chat box
- Bookmark prompts for quick access
- Agent switching mid-conversation
- Context carry-over between agents
- Visual diff viewer
- Conversation history across sessions
- Personalized assistance
- Voice dictation / image upload
- Model selection

---

*Last Updated: December 1, 2025*
