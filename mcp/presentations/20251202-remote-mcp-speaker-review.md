# Remote MCP Speaker Review
## December 2, 2025

---

# Slide 1: Quick Recap — 3 MCP Goals

**Why are we doing this?**

1. **Enable Unified Copilot & Specialized Agents** — A single, consistent Copilot across all Fabric workloads
2. **Empower Pro-Developers** — Reduce deployment time from days to minutes via automation
3. **Grow the Ecosystem** — Enable ISVs and enterprises to build custom agents

---

# Slide 2: 3 MCP Efforts This Semester

| Effort | What | Review Schedule |
|--------|------|-----------------|
| **Remote MCP** | Cloud-hosted execution backbone for Unified Copilot | 📍 **Today (Dec 2)** |
| **Local MCP** | Developer tools in VS Code (code gen, validation) | **Tomorrow (Dec 3)** |
| **MCP Platform** | Shared infrastructure, auth, tooling | **Next week** (materials shared before) |

---

# Slide 3: Timeline & Milestones

```
     Jan 2026          Mar 2026           May 2026
        │                  │                  │
        ▼                  ▼                  ▼
   ┌─────────┐       ┌──────────┐       ┌─────────┐
   │   M0    │──────▶│    M1    │──────▶│   GA    │
   │ Private │       │  Public  │       │ General │
   │ Preview │       │ Preview  │       │ Avail.  │
   └─────────┘       └──────────┘       └─────────┘
                      FabCon              MS Build
                      Atlanta

   ════════════════════════════════════
   │  TODAY'S FOCUS: M0 + M1 SCOPE   │
   ════════════════════════════════════
```

**Out of scope for today:** GA and beyond requirements

---

# Slide 4: Executive Summary (Part 1)

**What is Remote MCP?**

A secure, cloud-hosted execution engine that enables AI agents to interact with Microsoft Fabric.

**Key Value:**
- Standardized "socket" for agents — no custom OAuth2 stacks needed
- **Execution backbone for Unified Copilot**

---

# Slide 5: Executive Summary (Part 2)

**M1 Scope (Public Preview):**

All **P0 requirements** for Unified Copilot, including:
- **Blueprint Agent** (spec-driven development)
- **Modeling Agent** (semantic model ops via AS MCP)

**Secondary scenarios (Pro-Dev, Copilot Studio):** GA scope

---

# Slide 6: Hero Scenarios — What We're Enabling

| Scenario | Persona | Priority | Milestone |
|----------|---------|----------|-----------|
| **A. Unified Copilot in Portal** | Ash (Analyst) | 🎯 PRIMARY | M1 |
| B. Environment Replication (VS Code) | Ren (Data Engineer) | Secondary | GA |
| C. Continuous Compliance | Ari (Architect) | Secondary | GA |
| D. Rapid Onboarding | Binh (BI Engineer) | Secondary | GA |

**M1 Focus:** Scenario A — Unified Copilot in Fabric Portal

---

# Slide 7: M1 Requirements — What We Need to Deliver

→ **[Transition to spec document for detailed review]**

Key sections:
- Section 7.1: M0 (Private Preview) ✅ Done
- Section 7.2: M1 (Public Preview) — **Today's focus**

---

# M1 Requirements → Concrete Features

## Feature Analysis for ADO Planning

Based on Section 7.2 requirements, here are the **concrete features/work items** we need:

---

### Feature 1: Filtering Capability for List Operations
**Resolves:** 4 requirements

| Requirement | Status |
|-------------|--------|
| List workspaces with filtering (name, capacity, permission) | ⚠️ Gap |
| List items with filtering (name, type, exclude system objects) | ⚠️ Gap |
| List connections with filtering | ⚠️ Gap |
| Paginate large results | ✅ Ready |

**Work Item:** Implement MCP-level filtering layer for `list_workspaces`, `list_items`, `list_connections`

**Why MCP-level:** Fabric APIs don't support these filters natively. We need to implement filtering in the MCP server.

---

### Feature 2: OneLake Schema Tools (Unity Catalog)
**Resolves:** 3 requirements

| Requirement | Status |
|-------------|--------|
| List schemas in a lakehouse | ⚠️ Gap |
| List tables in a schema | ⚠️ Gap |
| Get full table details (columns, types, metadata) | ⚠️ Gap |

**Work Item:** Create custom MCP tools wrapping Unity Catalog API:
- `list_schemas`
- `list_tables`
- `get_table`

**API:** `GET /{workspace}/{item}/api/2.1/unity-catalog/schemas`

---

### Feature 3: OneLake File CRUD Tools (DFS)
**Resolves:** 4 requirements

| Requirement | Status |
|-------------|--------|
| Create/upload files to OneLake | ⚠️ Gap |
| Read file content from OneLake | ⚠️ Gap |
| List files in a directory | ⚠️ Gap |
| Delete files from OneLake | ⚠️ Gap |

**Work Item:** Create custom MCP tools wrapping OneLake DFS API:
- `create_file`
- `read_file`
- `list_files`
- `delete_file`

**API:** `https://onelake.dfs.fabric.microsoft.com/{workspace}/{item}/Files/{path}`

---

### Feature 4: Identity Resolution Tool
**Resolves:** 1 requirement

| Requirement | Status |
|-------------|--------|
| Resolve usernames/emails to Entra IDs | ⚠️ Gap |

**Work Item:** Create `resolve_user` tool wrapping Microsoft Graph API

**Why needed:** Permission operations require Entra IDs, but users say "add Sarah as Viewer"

---

### Feature 5: Blueprint CRUD
**Resolves:** 1 requirement

| Requirement | Status |
|-------------|--------|
| CRUD operations on Blueprint artifacts | 🔄 In Progress |

**Work Item:** Integrate with Blueprint team's public API (shipping)

---

### Feature 6: Item Definition Sharing
**Resolves:** 1 requirement

| Requirement | Status |
|-------------|--------|
| Get item definitions to share context with agents | ⚠️ Gap |

**Work Item:** Design protocol for sharing artifact context via MCP

**Note:** This is about how we expose definitions through MCP, not the API itself (which exists via `getDefinition`)

---

## Summary: 6 Features for M1

| # | Feature | # Requirements | Effort Est. | Owner |
|---|---------|----------------|-------------|-------|
| 1 | **Filtering Layer** | 4 | Medium | MCP Team |
| 2 | **OneLake Schema Tools** | 3 | Medium | MCP Team |
| 3 | **OneLake File CRUD** | 4 | Medium | MCP Team |
| 4 | **Identity Resolution** | 1 | Small | MCP Team |
| 5 | **Blueprint CRUD** | 1 | Small (integration) | Blueprint Team |
| 6 | **Item Definition Protocol** | 1 | Small (design) | MCP Team |

**Already Ready (✅):** Connections, Semantic Model creation, Error handling, Reliability, Security

---

## Gap Resolution Timeline (from spec)

```
Jan 15-31:  Design MCP-level filtering (Feature 1)
Feb 1-14:   Implement OneLake Schema tools (Feature 2)
Feb 15-28:  Implement OneLake CRUD tools (Feature 3)
Feb 15-28:  Integrate Graph API (Feature 4)
Feb 15-28:  Define item definition protocol (Feature 6)
Mar 1-15:   Integration testing & bug fixes
Mar 31:     M1 Public Preview Launch @ FabCon
```

---

## Questions for Review

1. **Filtering:** Should we implement filtering at MCP layer or request API changes from Fabric team?
2. **OneLake Tools:** Are we aligned with OneLake team on the scope (they're contributing to Local MCP)?
3. **Blueprint:** What's the integration timeline with Blueprint team?
4. **Item Definitions:** What's the right protocol design for sharing artifact context?

---

## What's NOT in M1 (deferred to GA+)

- Multi-workspace operations
- Copilot Studio connector / OpenAPI spec
- Tenant-wide agent controls
- Advanced undo history
- Item-level permissions (P1, M2)
- Dry run capability (P1, M2)
