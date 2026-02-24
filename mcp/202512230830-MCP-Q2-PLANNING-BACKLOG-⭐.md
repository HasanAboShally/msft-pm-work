# Fabric MCP Q2 Planning: Backlog & Prioritization

**Purpose:** Pre-planning document for Q2 KR semester (January - March 2026)  
**Created:** December 23, 2025  
**Owner:** Hasan Abo-Shally  
**Event Target:** FabCon Atlanta (March 16, 2026)

---

## Executive Summary

This document consolidates the backlog for both **Local MCP** (targeting GA at FabCon) and **Remote MCP** (targeting Public Preview at FabCon), with ~6-8 weeks of effective development time. The plan accounts for:

- **Local MCP** → General Availability announcement (March 2026)
- **Remote MCP** → Public Preview announcement (March 2026), Private Preview starting January 2026
- Design partner feedback cycle during January-February

---

## Timeline Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          Q2 DEVELOPMENT TIMELINE                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Dec 2025 ────┬──── Jan 2026 ────┬──── Feb 2026 ────┬──── Mar 2026          │
│               │                  │                  │                       │
│               │  REMOTE MCP      │                  │  FABCON ATLANTA       │
│               │  Private Preview │                  │  (Mar 16)             │
│               │  Launch          │                  │                       │
│               │  [1-2 weeks]     │  Design Partner  │  LOCAL MCP: GA        │
│               │                  │  Validation      │  REMOTE MCP: PuPr     │
│               │                  │  [4-6 weeks]     │                       │
│               │                  │                  │  Code Complete        │
│               │                  │                  │  (Mar 1 latest)       │
│               │                  │                  │                       │
└─────────────────────────────────────────────────────────────────────────────┘

Effective Dev Time: ~6-8 weeks (accounting for holidays, vacations)
Hard Deadline: March 1, 2026 (2 weeks before FabCon for stabilization)
```

---

## Part 1: Local MCP Backlog

### Current State (Public Preview - beta.4)

| Category | Capability | Status |
|----------|------------|--------|
| Context | OpenAPI specs for all workloads | ✅ |
| Context | JSON schemas for item definitions | ✅ |
| Context | Best practices guidance | ✅ |
| Context | Documentation search | ✅ |
| Context | Glossary | ✅ |
| Distribution | VS Code Extension | ✅ |
| Distribution | NuGet Package | ✅ |
| Distribution | NPM Package | ✅ |
| OneLake | File operations (read/write/delete/list) | ✅ (beta.4) |
| OneLake | Directory operations | ✅ (beta.4) |
| OneLake | Workspace listing | ✅ (beta.4) |
| OneLake | Item listing | ✅ (beta.4) |

### GA Backlog (Prioritized)

#### P0 - Must Ship for GA

| # | Feature | Description | Owner | Effort | Notes |
|---|---------|-------------|-------|--------|-------|
| L1 | **Integrated Auth** | Seamless token caching, Azure CLI credential support | MCP Team | M | Zero-friction auth experience |
| L2 | **Error Message Polish** | Structured errors with actionable guidance, clear distinction between user/config errors | MCP Team | S | Critical for dev experience |
| L3 | **Automatic Retry** | Transient failure handling with exponential backoff | MCP Team | S | Production readiness |
| L4 | **GA Documentation** | Complete docs, tutorials, troubleshooting guides | DevX | M | FabCon launch requirement |
| L5 | **Production SLAs** | Define and commit to support SLAs | Platform | S | GA requirement |
| L6 | **Telemetry** | Usage tracking for product improvements | Platform | S | GA requirement |


Dynamic fetching of resources


#### P1 - Should Ship for GA (If Capacity)

| # | Feature | Description | Owner | Effort | Notes |
|---|---------|-------------|-------|--------|-------|
| L7 | **Item CRUD** | Create/update/delete Fabric items from IDE | MCP Team | L | Completes bidirectional workflow |
| L8 | **Dry Run Mode** | Simulate deployments before execution | MCP Team | M | Safety feature |
| L9 | **CLI Script Generation** | Generate Fabric CLI from natural language | MCP Team | M | Promotes CLI adoption |
| L10 | **Progress Indicators** | Real-time progress for long-running operations | MCP Team | S | UX polish |

#### P2 - Post-GA Backlog

| # | Feature | Description | Priority | Notes |
|---|---------|-------------|----------|-------|
| L11 | Search items by name | Fuzzy search (requires Catalog API) | P2 | API dependency |
| L12 | Multi-workspace dependency analysis | Advanced deployment planning | P2 | Complex feature |
| L13 | Blueprint templates | Community workspace templates | P2 | Ecosystem growth |
| L14 | CLI IntelliSense | VS Code autocomplete for CLI | P2 | DX enhancement |
| L15 | User agent propagation | Track IDE source (VS Code vs Claude) | P2 | Analytics |
| L16 | Jupyter magic commands | `!fabric` in notebooks | P2 | Python workflows |
| L17 | Docker container | Run MCP in containers | P2 | User request |
| L18 | JetBrains IDE support | IntelliJ, PyCharm | P2 | Broader reach |

### Local MCP GA Feature Summary

**Minimum GA (P0):** L1-L6 (Auth, Errors, Retry, Docs, SLAs, Telemetry)  
**Ideal GA (P0+P1):** L1-L10 (adds Item CRUD, Dry Run, CLI Gen, Progress)

---

## Part 2: Remote MCP Backlog

### Current State (Ready for Private Preview - M0)

| Category | Capability | Status |
|----------|------------|--------|
| Auth | User identity (delegated OAuth2) | ✅ |
| Auth | Service Principal (app-only) | ✅ |
| Auth | RBAC enforcement | ✅ |
| Workspace | Full CRUD | ✅ |
| Capacities | List, assign, unassign | ✅ |
| Items | Full CRUD (with/without definition) | ✅ |
| Permissions | Workspace role management | ✅ |
| Permissions | Item-level permissions | ✅ |
| Connections | CRUD + gateway listing | ✅ |
| Error Handling | Actionable error messages | ✅ |
| Reliability | Async operations, pagination | ✅ |
| Filtering | By item type | ✅ |
| VS Code | Auth-free connection | ✅ |

### Private Preview Goals (January 2026)

**Primary Goal:** Validate core platform with 3-5 design partners

| Topic | Question to Validate | Method |
|-------|---------------------|--------|
| Auditing | Do customers need agent-specific audit entries? | Partner interviews |
| Identity Resolution | How should fuzzy name matching work? | Partner feedback |
| Error Messages | Are errors actionable enough for agent self-correction? | Telemetry + feedback |
| Read-Only Mode | Is there value in a read-only MCP option? | Partner interviews |
| Latency | What latency is acceptable for interactive vs autonomous? | Usage analysis |

### Public Preview Backlog (M1 - March 2026)

#### P0 - Must Ship for Public Preview

| # | Feature | Description | Requester | Effort | Gap? |
|---|---------|-------------|-----------|--------|------|
| R1 | **Workspace Filtering** | Filter list by name, capacity, permission | Unified Copilot | M | ⚠️ |
| R2 | **Item Filtering** | Filter by name, type, exclude system objects | Unified Copilot | M | ⚠️ |
| R3 | **OneLake Schema Tools** | List schemas, tables, columns (Unity Catalog API) | Blueprint Agent | L | ⚠️ |
| R4 | **OneLake File CRUD** | Create, read, list, delete files (DFS API) | Blueprint Agent | L | ⚠️ |
| R5 | **Identity Resolution** | Resolve email to Entra ID (Graph API) | Unified Copilot | M | ⚠️ |
| R6 | **Item Definitions as Resources** | Expose definitions in MCP context | Blueprint Agent | M | ⚠️ |
| R7 | **Actionable Controls** | Mark destructive tools, return undo actions | Unified Copilot | M | ⚠️ |
| R8 | **Change Tracking** | Return change records with dependency info | Unified Copilot | M | ⚠️ |
| R9 | **Connection Filtering** | Filter list_connections results | Unified Copilot | S | ⚠️ |
| R10 | **Blueprint CRUD** | Full CRUD for Blueprint artifacts | Blueprint Agent | M | 🔄 |

#### P1 - Should Ship for Public Preview (If Capacity)

| # | Feature | Description | Requester | Effort | Notes |
|---|---------|-------------|-----------|--------|-------|
| R11 | **Streaming Responses** | SSE for real-time progress updates | Platform | M | UX enhancement |
| R12 | **Identity Resolution (Name)** | Resolve by username/first+last | Unified Copilot | M | Complex Graph queries |
| R13 | **Bulk Operations** | Batch rename/update items | Unified Copilot | M | Efficiency |
| R14 | **Property Filtering** | Filter by description, modified date | Unified Copilot | S | Nice to have |

#### P2 - Post-Public Preview (GA Target: May 2026)

| # | Feature | Description | Priority | Notes |
|---|---------|-------------|----------|-------|
| R15 | Fuzzy/semantic search | Search across names/descriptions | P2 | Complex |
| R16 | Capacities management | View/manage capacity assignments | P0 (GA) | Full coverage |
| R17 | Deployment Pipelines | CI/CD pipeline management | P0 (GA) | DevOps scenarios |
| R18 | Domains | Organize workspaces by domain | P0 (GA) | Governance |
| R19 | Folders | Organize items in folders | P0 (GA) | Organization |
| R20 | Git Integration | Connect workspaces to Git | P0 (GA) | Version control |
| R21 | Job Scheduler | Schedule/manage refresh jobs | P0 (GA) | Automation |
| R22 | OneLake Shortcuts | Create/manage external shortcuts | P0 (GA) | Data access |
| R23 | Dry Run/Simulation | Preview changes before execution | P2 | Safety |
| R24 | Multi-workspace ops | Cross-workspace operations | P2 | Advanced |
| R25 | OpenAPI Export | Tools as OpenAPI for Copilot Studio | P2 | Ecosystem |
| R26 | Tenant-wide controls | Admin agent access controls | P2 | Governance |

### Remote MCP Gap Resolution Timeline

```
┌─────────────────────────────────────────────────────────────────┐
│                    M1 Gap Resolution Timeline                   │
├─────────────────────────────────────────────────────────────────┤
│ Jan 15-31:  Design MCP-level filtering (R1, R2, R9)            │
│ Feb 1-14:   Implement OneLake Schema tools (R3)                │
│ Feb 15-28:  Implement OneLake File CRUD tools (R4)             │
│ Feb 15-28:  Integrate Graph API for identity (R5)              │
│ Feb 15-28:  Define item definition protocol (R6)               │
│ Feb 15-28:  Implement actionable controls (R7, R8)             │
│ Mar 1-15:   Integration testing & bug fixes                    │
│ Mar 16:     Public Preview Launch @ FabCon                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## Part 3: Private Preview Management Plan

### Onboarding Plan

| Week | Activity | Output |
|------|----------|--------|
| W1 (Jan 6-10) | Identify design partners | 3-5 committed partners |
| W2 (Jan 13-17) | Partner onboarding sessions | Partners configured |
| W3-6 (Jan 20 - Feb 14) | Active usage & feedback collection | Feedback log |
| W7-8 (Feb 17-28) | Synthesize learnings, adjust M1 scope | Updated requirements |

### Feedback Collection Framework

| Category | Questions | Method |
|----------|-----------|--------|
| **Usability** | Are tool names intuitive? Are error messages helpful? | Survey + interviews |
| **Performance** | Is latency acceptable? Any timeouts? | Telemetry |
| **Gaps** | What operations are missing? What's blocking your scenario? | Interviews |
| **Security** | Any concerns with auth flow? Audit needs? | Interviews |

### Success Criteria for Private Preview

| Metric | Target |
|--------|--------|
| Design partners onboarded | 3-5 |
| Feedback sessions completed | 10+ |
| Critical bugs blocking M1 | 0 |
| P0 requirements validated | 100% |

---

## Part 4: Competitive Feature Analysis

Based on MCP ecosystem research, here are features from other platforms worth considering:

### Industry Standard Features (Already Planned)

| Feature | Status | Notes |
|---------|--------|-------|
| Schema discovery | ✅ Planned (R3) | Standard in all DB MCPs |
| Query execution | ✅ Remote via AS MCP | Routes to specialized MCPs |
| File CRUD | ✅ Planned (R4) | Standard in file system MCPs |
| Auth integration | ✅ Done | Enterprise auth is critical |
| Error handling | ✅ Done | Best practice across MCPs |

### Differentiating Features (Consider for Future)

| Feature | Description | Inspiration | Priority |
|---------|-------------|-------------|----------|
| **Natural Language to Query** | NL → SQL/KQL/DAX translation | Databricks Genie, Fabric RTI | P1 (Future) |
| **Cost Estimation** | Estimate compute cost before query | BigQuery | P2 (Future) |
| **Data Lineage** | Track data flow and dependencies | dbt, Atlan | P2 (Future) |
| **Smart Suggestions** | Recommend tables/columns based on context | Modern DB tools | P2 (Future) |
| **Result Sampling** | Smart sampling for large result sets | All DB MCPs | P1 (Future) |
| **Governance Tags** | Surface sensitivity labels in context | Enterprise MCPs | P2 (GA) |
| **Template Library** | Pre-built queries and patterns | dbt | P2 (Future) |
| **Protocol Bridging** | Convert REST APIs to MCP dynamically | IBM Context Forge | P3 (Future) |

### Unique Fabric Advantages

| Advantage | How We Leverage |
|-----------|-----------------|
| Unified Data Lake (OneLake) | Single interface for all data |
| Integrated Analytics | Seamless flow: Lakehouse → Warehouse → Report |
| Azure Ecosystem | Enterprise auth, governance, compliance |
| Workload MCPs | Specialized capabilities (AS MCP, Notebook MCP) |
| Blueprint Agent | Spec-driven development unique to Fabric |

---

## Part 5: Combined Prioritization Matrix

### Critical Path (Must Ship for FabCon)

| MCP | Features | Total Effort | Risk |
|-----|----------|--------------|------|
| **Local** | L1-L6 (Auth, Errors, Retry, Docs, SLAs, Telemetry) | ~3-4 weeks | Low |
| **Remote** | R1-R10 (Filtering, OneLake, Identity, Controls) | ~6-8 weeks | Medium |

### Stretch Goals (If Capacity Allows)

| MCP | Features | Effort | Impact |
|-----|----------|--------|--------|
| **Local** | L7-L10 (Item CRUD, Dry Run, CLI Gen) | ~3-4 weeks | High - completes IDE story |
| **Remote** | R11-R14 (Streaming, Bulk Ops) | ~2-3 weeks | Medium - UX polish |

### Risk Assessment

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| OneLake tools delay (R3, R4) | High | Medium | Clear interface contracts, parallel dev |
| Graph API security review (R5) | Medium | Medium | Start review early (January) |
| Holiday capacity reduction | Medium | High | Plan for 6 weeks, not 8 |
| Design partner feedback requires scope change | Medium | Medium | Build in 2-week buffer |

---

## Part 6: Capacity Planning Template

### Team Allocation (To Be Filled)

| Team | Available Engineers | Focus Area |
|------|---------------------|------------|
| Local MCP | ___ | GA readiness |
| Remote MCP | ___ | M1 features |
| OneLake | ___ | Contributing tools |
| DevX | ___ | Documentation |

### Effort Estimation Key

| Size | Effort | Description |
|------|--------|-------------|
| S | 1-3 days | Simple feature, well-understood |
| M | 1-2 weeks | Medium complexity |
| L | 2-4 weeks | Large feature, dependencies |
| XL | 4+ weeks | Major initiative |

---

## Part 7: Decision Points for Pre-Planning

### Questions to Resolve

| # | Question | Options | Recommendation |
|---|----------|---------|----------------|
| 1 | How many engineers on Local vs Remote? | 50/50, 70/30, 30/70 | Depends on team structure |
| 2 | Should we cut P1 Remote features to ensure P0? | Yes/No | Yes - focus on P0 |
| 3 | Who owns OneLake tool contribution? | OneLake vs MCP team | Clarify ownership |
| 4 | Do we need Graph API early security review? | Jan vs Feb | January (risk mitigation) |
| 5 | How do we handle partner feedback that requires scope change? | Fixed scope vs adaptive | Build 2-week buffer |

### Go/No-Go Criteria for FabCon Announcement

| Criteria | Local MCP GA | Remote MCP PuPr |
|----------|--------------|-----------------|
| All P0 features complete | ✅ Required | ✅ Required |
| Documentation ready | ✅ Required | ✅ Required |
| 0 critical bugs | ✅ Required | ✅ Required |
| Performance SLAs met | ✅ Required | 🔄 Best effort |
| Private Preview validated | N/A | ✅ Required |

---

## Part 8: Future Backlog (Beyond Q2)

### H1 2026 (Post-FabCon)

| Feature | MCP | Priority | Target |
|---------|-----|----------|--------|
| Remote MCP GA | Remote | P0 | May 2026 (MS Build) |
| Git Integration | Remote | P0 | GA |
| Deployment Pipelines | Remote | P0 | GA |
| Job Scheduler | Remote | P0 | GA |
| Multi-workspace operations | Remote | P2 | GA |
| Copilot Studio connector | Remote | P2 | GA |

### H2 2026

| Feature | MCP | Priority | Target |
|---------|-----|----------|--------|
| Unified MCP endpoint | Both | P1 | H2 2026 |
| Advanced lineage | Remote | P2 | H2 2026 |
| Natural language queries | Remote | P2 | H2 2026 |
| Custom tool definitions | Remote | P3 | 2027 |

---

## Appendix A: Feature Detail Cards

### R3: OneLake Schema Tools (Unity Catalog API)

**Description:** Enable agents to discover and understand lakehouse schema structure.

**Tools:**
- `list_schemas` - List schemas in a lakehouse
- `list_tables` - List tables in a schema
- `get_table` - Get table details (columns, types, metadata)

**API Endpoints:**
```
GET /{workspace}/{item}/api/2.1/unity-catalog/schemas
GET /{workspace}/{item}/api/2.1/unity-catalog/tables?catalog_name={item}&schema_name={schema}
GET /{workspace}/{item}/api/2.1/unity-catalog/tables/{tableName}
```

**Effort:** Large (2-4 weeks)  
**Dependencies:** Unity Catalog API access  
**Owner:** MCP Team

---

### R4: OneLake File CRUD (DFS API)

**Description:** Enable agents to create, read, list, and delete files in OneLake.

**Tools:**
- `create_file` - Upload file content
- `read_file` - Download file content
- `list_files` - List directory contents
- `delete_file` - Remove file

**API Endpoints:**
```
PUT onelake.dfs.fabric.microsoft.com/{ws}/{item}/Files/{path}?resource=file
GET onelake.dfs.fabric.microsoft.com/{ws}/{item}/Files/{path}
GET (Path List API)
DELETE onelake.dfs.fabric.microsoft.com/{ws}/{item}/Files/{path}
```

**Effort:** Large (2-4 weeks)  
**Dependencies:** OneLake DFS API access, auth integration  
**Owner:** MCP Team (OneLake contributing)

---

### R5: Identity Resolution

**Description:** Resolve human-friendly identifiers (email, name) to Entra IDs for permission operations.

**Tools:**
- `resolve_user` - Convert email/name to Entra object ID

**API:** Microsoft Graph API

**Security:** Requires Graph API permissions, security review

**Effort:** Medium (1-2 weeks)  
**Dependencies:** Graph API integration, security review  
**Owner:** MCP Team

---

## Appendix B: Reference Documents

- [FABRIC-LOCAL-MCP-SPEC-V5-⭐.md](specs/local-mcp/FABRIC-LOCAL-MCP-SPEC-V5-⭐.md)
- [FABRIC-REMOTE-MCP-SPEC-V5-⭐.md](specs/remote-mcp/FABRIC-REMOTE-MCP-SPEC-V5-⭐.md)
- [remote-mcp-capabilities🎯.md](specs/remote-mcp/remote-mcp-capabilities🎯.md)
- [remote-mcp-private-preview-goals.md](specs/remote-mcp/remote-mcp-private-preview-goals.md)
- GitHub: [microsoft/mcp/servers/Fabric.Mcp.Server](https://github.com/microsoft/mcp/tree/main/servers/Fabric.Mcp.Server)

---

*Document created for pre-planning meeting. Last updated: December 23, 2025*
