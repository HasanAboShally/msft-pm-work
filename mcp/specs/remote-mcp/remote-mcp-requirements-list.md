# Remote MCP Requirements — Flat List

**Last Updated:** December 3, 2025  
**Status:** Post Speaker Review V1

---

## Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Ready |
| 🔄 | In Progress |
| ⚠️ | Gap (needs work) |
| ❓ | Needs clarification |

---

## Requirements

| ID | Pri | Category | I can... | Tool(s) | Status |
|----|-----|----------|----------|---------|--------|
| | | | **━━━━━ M0: PRIVATE PREVIEW (Jan 2026) ━━━━━** | | |
| M0-01 | P0 | Auth | Connect my agent to Fabric using my own user identity (delegated OAuth2). | — | ✅ |
| M0-02 | P0 | Auth | Connect a headless agent using a Service Principal (app-only flow). | — | ✅ |
| M0-03 | P0 | Auth | Trust that the agent cannot do anything I don't have permission to do (RBAC enforcement). | — | ✅ |
| M0-04 | P0 | Workspace | Create a workspace. | `create_workspace` | ✅ |
| M0-05 | P0 | Workspace | Get workspace details. | `get_workspace` | ✅ |
| M0-06 | P0 | Workspace | Update a workspace. | `update_workspace` | ✅ |
| M0-07 | P0 | Workspace | Delete a workspace. | `delete_workspace` | ✅ |
| M0-08 | P0 | Workspace | List workspaces. | `list_workspaces` | ✅ |
| M0-09 | P0 | Capacities | List, assign, and unassign capacities to workspaces. | `list_capacities`, `assign_capacity`, `unassign_capacity` | ✅ |
| M0-10 | P0 | Items | Create a Fabric item (with or without definition). | `create_item` | ✅ |
| M0-11 | P0 | Items | Get item details. | `get_item` | ✅ |
| M0-12 | P0 | Items | Update a Fabric item. | `update_item` | ✅ |
| M0-13 | P0 | Items | Delete a Fabric item. | `delete_item` | ✅ |
| M0-14 | P0 | Items | List items in a workspace. | `list_items` | ✅ |
| M0-15 | P0 | Items | Get item definition. | `get_item_definition` | ✅ |
| M0-16 | P0 | Permissions | Add workspace role assignment. | `add_workspace_role` | ✅ |
| M0-17 | P0 | Permissions | Remove workspace role assignment. | `remove_workspace_role` | ✅ |
| M0-18 | P0 | Permissions | List workspace role assignments. | `list_workspace_roles` | ✅ |
| M0-19 | P0 | Permissions | Refer to users by name or email (not just user ID). | `resolve_user` | ⚠️ |
| M0-20 | P0 | Semantic Model | Create a semantic model. | `create_semantic_model` | ✅ |
| M0-21 | P0 | Context | Validate bound context (workspace, item). | `validate_context` | ✅ |
| M0-22 | P0 | Audit | See what the agent did in Fabric Audit Logs. | — | ❓ |
| M0-23 | P0 | Governance | Schedule agents to enforce governance rules (SP auth). | — | ✅ |
| M0-24 | P0 | VS Code | Connect VS Code to Fabric without writing auth code. | — | ✅ |
| | | | **━━━━━ M1: PUBLIC PREVIEW (Mar 2026 / FabCon) ━━━━━** | | |
| M1-01 | P0 | Item Definitions | Share artifact context (definitions, resources, best practices) with agents. **#1 priority.** | TBD | ⚠️ |
| M1-02 | P0 | Identity | Resolve usernames/emails to Entra IDs. Handle fuzzy matches gracefully. **#2 priority.** | `resolve_user` | ⚠️ |
| M1-03 | P0 | OneLake Schema | List schemas in a lakehouse. | `list_schemas` | ⚠️ |
| M1-04 | P0 | OneLake Schema | List tables in a schema. | `list_tables` | ⚠️ |
| M1-05 | P0 | OneLake Schema | Get full table details (columns, types, metadata). | `get_table` | ⚠️ |
| M1-06 | P0 | OneLake Files | Create/upload files to OneLake. | `create_file` | ⚠️ |
| M1-07 | P0 | OneLake Files | Read file content from OneLake. | `read_file` | ⚠️ |
| M1-08 | P0 | OneLake Files | List files in a directory. | `list_files` | ⚠️ |
| M1-09 | P0 | OneLake Files | Delete files from OneLake. | `delete_file` | ⚠️ |
| M1-10 | P0 | Workspace | List workspaces with filtering (name, capacity, permission). | `list_workspaces` + filter | ⚠️ |
| M1-11 | P0 | Items | List items with filtering (name, type, exclude system). | `list_items` + filter | ⚠️ |
| M1-12 | P0 | Blueprint | CRUD operations on Blueprint artifacts. | TBD | 🔄 |
| M1-13 | P0 | Connections | List connections with filtering. | `list_connections` + filter | ⚠️ |
| M1-14 | P0 | Connections | Create a new connection. | `create_connection` | ✅ |
| M1-15 | P0 | Gateways | List gateways. | `list_gateways` | ✅ |
| M1-16 | P0 | Gateways | Additional gateway management tools. | TBD | ⚠️ |
| M1-17 | P0 | Connections | Bind semantic model to connection. | `bind_semantic_model_connection` | ✅ |
| M1-18 | P0 | Permissions | Add item-level role assignment. | `add_item_role` | ✅ |
| M1-19 | P0 | Permissions | Remove item-level role assignment. | `remove_item_role` | ✅ |
| M1-20 | P0 | Bulk Ops | Bulk update multiple items. | `batch_update_items` | ✅ |
| M1-21 | P0 | Bulk Ops | Bulk rename items with pattern matching. | `batch_rename` | ✅ |
| M1-22 | P0 | Versioning | Capture version before change (routes to AS MCP). | `capture_version` | ✅ |
| M1-23 | P0 | Versioning | List version history. | `list_versions` | ✅ |
| M1-24 | P0 | Versioning | Restore to previous version. | `restore_version` | ✅ |
| M1-25 | P0 | Undo | Undo a specific action immediately after applied. | `undo_action` | ✅ |
| M1-26 | P0 | Controls | Mark high-impact tools with `is_consequential` flag for confirmation. | — | ✅ |
| M1-27 | P0 | Controls | Return `undo_action` in responses for reversible operations. | — | ✅ |
| M1-28 | P0 | Change Tracking | Return change records so Copilot can show overview of changes. | — | ✅ |
| M1-29 | P0 | Change Tracking | Return dependency info for downstream impact warnings. | — | ✅ |
| M1-30 | P0 | Navigation | Return item URLs/IDs so users can click to open items. | — | ✅ |
| M1-31 | P0 | Discovery | Expose tool catalog so users can browse capabilities. | — | ✅ |
| M1-32 | P0 | Errors | Return clear error messages with actionable remediation. | — | ✅ |
| M1-33 | P0 | Errors | Retry transient failures automatically. | — | ✅ |
| M1-34 | P0 | Errors | Distinguish "user lacks permission" vs. "app not configured". | — | ✅ |
| M1-35 | P0 | Reliability | Handle long-running tasks (async polling). | — | ✅ |
| M1-36 | P0 | Reliability | Return real-time progress updates for long tasks. | — | ✅ |
| M1-37 | P0 | Reliability | Paginate large results to avoid context overflow. | — | ✅ |
| M1-38 | P0 | Reliability | Streaming for batch operations to handle large payloads. | — | ✅ |
| M1-39 | P0 | Reliability | Set clear size limits for batch operations. | — | ✅ |
| M1-40 | P0 | Concurrency | Detect and report conflicts when multiple agents/users act on same item. | — | ✅ |
| M1-41 | P0 | Concurrency | Optimistic locking with retry-after guidance. | — | ✅ |
| M1-42 | P0 | Performance | Tool execution latency < 2 seconds (p95). | — | ✅ |
| M1-43 | P0 | LLM Optimization | Concise responses optimized for LLM context windows. | — | ✅ |
| M1-44 | P0 | LLM Optimization | Filter parameters required to avoid token overflow. | — | ✅ |
| M1-45 | P0 | Security | Support secret rotation without breaking connections. | — | ✅ |
| M1-46 | P0 | Security | Enforce rate limiting to prevent tenant overload. | — | ✅ |
| | | | **━━━━━ M2: POST-M1 (Apr 2026) ━━━━━** | | |
| M2-01 | P1 | Workloads | Route to other MCPs (Notebooks, DFG2, Lakehouse). | — | 🔄 |
| M2-02 | P1 | Workloads | Orchestrate complex multi-step agentic workflows. | — | 🔄 |
| M2-03 | P1 | Errors | Return specific field/format details on validation failure. | — | 🔄 |
| M2-04 | P1 | Platform | Simulate operations before execution (dry run). | — | 🔄 |
| M2-05 | P1 | Permissions | Item-level permission management (beyond add/remove). | — | 🔄 |
| M2-06 | P1 | Controls | Selective accept/reject individual changes. | — | 🔄 |
| M2-07 | P1 | Context | Context/history carry-over between agents (modeling ↔ blueprint). | — | 🔄 |
| M2-08 | P1 | Guidance | Explain how to make changes if Copilot cannot apply them. | — | 🔄 |
| | | | **━━━━━ GA: GENERAL AVAILABILITY (May 2026 / Build) ━━━━━** | | |
| GA-01 | P2 | Multi-Workspace | Operate across multiple workspaces in single request. | — | 🔄 |
| GA-02 | P2 | Pro-Dev | Expose tool definitions as OpenAPI spec for Copilot Studio. | — | 🔄 |
| GA-03 | P2 | Admin | Support tenant-wide agent access controls. | — | 🔄 |
| GA-04 | P2 | Items | Support 3rd party items, extensibility, lightweight items. | — | 🔄 |
| GA-05 | P2 | Undo | Advanced undo history (multi-step rollback). | — | 🔄 |
| GA-06 | P2 | Admin | Cross-tenant agent delegation. | — | 🔄 |
| GA-07 | P2 | Extensibility | Custom tool definitions by end-users. | — | 🔄 |
| GA-08 | P2 | SLA | Production SLAs and full region support. | — | 🔄 |

---

## Tool Summary

### Tools Ready Today (27+)

| Category | Tools |
|----------|-------|
| Workspace | `create_workspace`, `get_workspace`, `update_workspace`, `delete_workspace`, `list_workspaces` |
| Capacities | `list_capacities`, `assign_capacity`, `unassign_capacity` |
| Items | `create_item`, `get_item`, `update_item`, `delete_item`, `list_items`, `get_item_definition` |
| Permissions | `add_workspace_role`, `remove_workspace_role`, `list_workspace_roles`, `add_item_role`, `remove_item_role` |
| Semantic Model | `create_semantic_model` |
| Connections | `create_connection`, `list_gateways`, `bind_semantic_model_connection` |
| Bulk Ops | `batch_update_items`, `batch_rename` |
| Versioning | `capture_version`, `list_versions`, `restore_version` |
| Undo | `undo_action` |
| Context | `validate_context` |

### Platform Capabilities Ready

| Category | Capability |
|----------|------------|
| Controls | `is_consequential` flag on high-impact tools |
| Controls | Return `undo_action` in responses |
| Change Tracking | Return change records |
| Change Tracking | Return dependency info for downstream warnings |
| Navigation | Return item URLs/IDs |
| Discovery | Tool catalog exposure |
| Errors | Actionable error messages |
| Errors | Auto-retry transient failures |
| Errors | Permission vs. config error distinction |
| Reliability | Async polling for long tasks |
| Reliability | Progress updates |
| Reliability | Pagination |
| Reliability | Streaming for batch operations |
| Reliability | Size limits for batch operations |
| Concurrency | Conflict detection |
| Concurrency | Optimistic locking with retry-after |
| Performance | <2s p95 latency |
| LLM Optimization | Concise responses for context windows |
| LLM Optimization | Required filter parameters |
| Security | Secret rotation support |
| Security | Rate limiting |

### Tools Needed (Gaps)

| Category | Tools | Target |
|----------|-------|--------|
| Identity | `resolve_user` | M1 |
| OneLake Schema | `list_schemas`, `list_tables`, `get_table` | M1 |
| OneLake Files | `create_file`, `read_file`, `list_files`, `delete_file` | M1 |
| Filtering | Enhance `list_workspaces`, `list_items`, `list_connections` | M1 |
| Blueprint | TBD | M1 |
| Gateway | Additional management tools | M1 |
| Item Definitions | Protocol for sharing artifact context | M1 |

---

## Gap Priority Summary (M1)

| Priority | Feature | What It Does | Status |
|----------|---------|--------------|--------|
| **1** | Item Definition Protocol | Share artifact context (definitions, resources, best practices) via MCP — agents need to understand item structure. Align with Nimrod & Teddy. | ⚠️ Gap |
| **2** | Identity Resolution | `resolve_user` via Graph API — translates names/emails to Entra ID. Could also be useful at API level. | ⚠️ Gap |
| **3** | OneLake API Tools | Schema tools + File CRUD via Unity Catalog / DFS APIs. | ⚠️ Gap |
| **4** | Filtering Layer | MCP-level filtering for `list_workspaces`, `list_items`, `list_connections`. Could be at MCP or API layer. | ⚠️ Gap |
| **5** | Gateway & Connection Tools | Additional tools for gateway management. | ⚠️ Gap |

---

## Notes

- **Item CRUD nuances:** Create with/without definition both supported. Child items, preview vs GA items — whatever the public API allows, MCP allows.
- **3rd party items:** Out of scope until GA (GA-04).
- **Permissions by name/email:** P0 requirement (M0-19). Even if not in private preview cut, keep as P0.
- **Filtering:** Can be implemented at MCP layer or request API changes — decision TBD.
- **Identity resolution:** Need concrete requirements on fuzzy matching, typo handling, disambiguation UX.
