# Fabric Remote MCP: Capabilities & Timeline

**Last Updated:** December 3, 2025  
**Owner:** Hasan Abo-Shally

---

## Timeline

| Milestone | Date | Event | Scope |
|-----------|------|-------|-------|
| **M0** | Jan 2026 | Private Preview | Core platform, design partner validation |
| **M1** | Mar 2026 | Public Preview @ FabCon Atlanta | All P0 Unified Copilot requirements |
| **GA** | May 2026 | General Availability @ MS Build | Full Fabric Core API coverage |

---

## Private Preview Learning Goals

M0 is a learning milestone. Key questions to validate with design partners:

| # | Topic | What We Want to Learn | How We'll Measure |
|---|-------|----------------------|-------------------|
| 1 | **Audit & Compliance** | Do customers need agent-specific audit entries? What audit details matter most? | Partner interviews, audit log analysis |
| 2 | **Error Messages** | Are error` messages actionable enough for agents to self-recover? | Agent success rate, retry patterns |
| 3 | **Latency Tolerance** | What latency is acceptable for interactive vs. autonomous agents? | p50/p95 latency vs. task completion |
| 4 | **Context Binding** | How do users expect workspace/item context to flow to agents? | Usability testing, support tickets |
| 5 | **Permission Patterns** | What permission operations do users attempt most? | Tool call frequency analysis |
| 6 | **Filtering Needs** | What filters do users need for list operations? | Query pattern analysis |
| 7 | **Batch Size** | What's the typical batch size for bulk operations? | Usage telemetry |

---

## Capabilities

All capabilities below are **Fabric Core/Platform APIs owned by Remote MCP**. Workload-specific capabilities (AS MCP, Notebook MCP, etc.) are out of scope for this document.

**Status:** ✅ Done | 🔄 In Progress | ⚠️ Gap | 📋 Planned | 🔬 Learning (needs Private Preview data)  
**Type:** Core = must-have functionality | Optimization = improves performance/efficiency  
**Notes:** 🔗 UC = Explicit Unified Copilot dependency

| # | Capability | What it Enables | Pri | Type | Status | Milestone | Notes |
|---|------------|-----------------|-----|------|--------|-----------|-------|
| 1 | **User Authentication** | Connect agents using your own identity (delegated OAuth2) | P0 | Core | ✅ | M0 | |
| 2 | **Service Principal Auth** | Connect headless/automated agents (app-only OAuth2) | P0 | Core | ✅ | M0 | |
| 3 | **Workspaces CRUD** | Create, view, update, and delete workspaces | P0 | Core | ✅ | M0 | |
| 4 | **Items CRUD** | Create, view, update, and delete Fabric items | P0 | Core | ✅ | M0 | |
| 5 | **Item Definitions** | Read and update the internal definition/content of items | P0 | Core | ✅ | M0 | 🔗 UC |
| 6 | **Workspace Permissions** | Add, remove, and list workspace role assignments | P0 | Core | ✅ | M0 | |
| 7 | **Connections CRUD** | Create, view, update, and delete data connections | P0 | Core | ✅ | M0 | 🔗 UC |
| 8 | **Gateways** | List and view on-premises data gateways | P0 | Core | ✅ | M0 | 🔗 UC |
| 9 | **Item Permissions** | Add, remove, and list item-level role assignments | P0 | Core | ✅ | M0 | |
| 10 | **Error Handling** | Clear error messages with actionable remediation steps | P0 | Core | ✅ | M0 | |
| 11 | **Async Operations** | Handle long-running tasks without timeout (polling) | P0 | Core | ✅ | M0 | |
| 12 | **Pagination** | Handle large result sets without context overflow | P0 | Core | ✅ | M0 | |
| 13 | **Rate Limiting (Passthrough)** | MCP adheres to underlying API throttling limits with clear error messages | P0 | Core | ✅ | M0 | |
| 14 | **Filtering (Type)** | Filter list results by item type | P0 | Optimization | ✅ | M0 | 🔗 UC |
| | **— M0 CUTLINE (Private Preview - Jan 2026) —** | | | | | | |
| 15 | **OneLake Schema** | List schemas, tables, and columns in lakehouses | P0 | Core | ⚠️ | M1 | 🔗 UC; Unity Catalog API |
| 16 | **OneLake Files** | Create, read, list, and delete files in OneLake | P0 | Core | ⚠️ | M1 | 🔗 UC; DFS API |
| 17 | **MCP Resources (Item Definitions/Docs)** | Expose item definitions as MCP resources so agents understand item structure | P0 | Core | ⚠️ | M1 | 🔗 UC |
| 18 | **Identity Resolution (Email)** | Resolve exact email addresses to Entra IDs for permission operations | P0 | Core | ⚠️ | M1 | 🔗 UC; Graph API; Needs security review |
| 19 | **Actionable Controls** | Mark destructive tools with `is_consequential`, return `undo_action` in responses | P0 | Core | ⚠️ | M1 | 🔗 UC |
| 20 | **Change Tracking** | Return change records and dependency info so users see what changed | P0 | Core | ⚠️ | M1 | 🔗 UC |
| 21 | **Filtering (Exact Name)** | Filter list results by exact name match | P0 | Optimization | ⚠️ | M1 | 🔗 UC; Can use get_item as workaround |
| 22 | **Streaming Responses** | Real-time progress updates for long operations (SSE) | P1 | Core | 🔄 | M1 | |
| 23 | **Identity Resolution (Name)** | Resolve by username or first+last name | P1 | Core | ⚠️ | M1 | Graph API; Needs security review |
| 24 | **Bulk Operations** | Rename or update multiple items in one request | P1 | Core | ⚠️ | M1 | |
| 25 | **Filtering (Properties)** | Filter by item properties (description, modified date, etc.) | P1 | Optimization | 📋 | M1 | |
| 26 | **Filtering (Fuzzy Search)** | Fuzzy/semantic search across item names and descriptions | P2 | Optimization | 📋 | M1 | |
| | **— M1 CUTLINE (Public Preview - Mar 2026 @ FabCon) —** | | | | | | |
| 27 | **Capacities** | View and manage Fabric capacity assignments | P0 | Core | 📋 | GA | |
| 28 | **Deployment Pipelines** | Manage CI/CD deployment pipelines | P0 | Core | 📋 | GA | |
| 29 | **Domains** | Organize workspaces into business domains | P0 | Core | 📋 | GA | |
| 30 | **Folders** | Organize items within workspaces into folders | P0 | Core | 📋 | GA | |
| 31 | **Git Integration** | Connect workspaces to Git for version control | P0 | Core | 📋 | GA | |
| 32 | **Job Scheduler** | Schedule and manage item refresh jobs | P0 | Core | 📋 | GA | |
| 33 | **OneLake Shortcuts** | Create and manage shortcuts to external data | P0 | Core | 📋 | GA | |
| 34 | **Tags** | Apply and manage tags on items | P1 | Core | 📋 | GA | |
| 35 | **External Data Shares (Provider)** | Share data externally as a provider | P1 | Core | 📋 | GA | |
| 36 | **External Data Shares (Recipient)** | Access externally shared data as recipient | P1 | Core | 📋 | GA | |
| 37 | **Long Running Operations** | Explicit tracking of async operation status | P1 | Core | 📋 | GA | May pull to M1 |
| 38 | **Managed Private Endpoints** | Manage private network connections | P1 | Core | 📋 | GA | |
| 39 | **OneLake Data Access Security** | Manage row/column-level security | P1 | Core | 📋 | GA | |
| 40 | **OneLake Settings** | Configure OneLake behavior | P2 | Core | 📋 | GA | |
| 41 | **Multi-Workspace Operations** | Operate across multiple workspaces in one request | P2 | Optimization | 📋 | GA | |
| 42 | **Dry Run / Simulation** | Preview changes before executing | P2 | Optimization | 📋 | GA | |
| 43 | **Conflict Detection** | Handle concurrent edits gracefully (optimistic locking, ETag) | P2 | Optimization | 📋 | GA | |
| 44 | **Rate Limiting (MCP-Level)** | Throttling on MCP tool usage itself (if needed based on learnings) | P2 | Optimization | 🔬 | GA | Depends on M0/M1 learnings |
| 45 | **OpenAPI Export** | Expose tools as OpenAPI spec for Copilot Studio | P2 | Optimization | 📋 | GA | |
| 46 | **Audit Logging Enhancements** | Agent-specific audit entries (if needed based on learnings) | P2 | Core | 🔬 | GA | Depends on M0 learnings |
| | **— GA CUTLINE (General Availability - May 2026 @ MS Build) —** | | | | | | |

---

## Summary by Milestone

| Milestone | Total | P0 | P1 | P2 | Focus |
|-----------|-------|----|----|----| ------|
| **M0 (Shipped)** | 14 | 14 | 0 | 0 | Core platform: auth, CRUD, permissions, error handling, filtering (type) |
| **M1** | 12 | 7 | 4 | 1 | Unified Copilot: OneLake, resources, controls, filtering |
| **GA** | 20 | 7 | 6 | 7 | Full API coverage: Git, pipelines, domains, security |

---

## Notes

- **Workload MCPs** (AS MCP for semantic models, Notebook MCP, etc.) are separate and not included here
- **M0 scope** includes everything already implemented—focused on learning and validation with design partners
- **M1 scope** is driven by Unified Copilot P0 requirements
- **GA scope** covers all 18 Fabric Core API categories for full platform parity
- **🔬 Learning items** will be refined based on Private Preview feedback—scope and priority may change
- **Optimizations** are not blockers (agent can work without them) but significantly improve experience/cost
- Tool names are illustrative; final names TBD during implementation

