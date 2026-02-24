# Fabric Local MCP: Item Definition Workflows
## Requirements Summary & Roadmap Discussion

**Date:** February 3, 2026  
**Owner:** Hasan Abo-Shally  
**Purpose:** Internal planning discussion for import/export of item definitions  
**Format:** Slide-ready summary with actionable proposals

---

## Executive Summary

The Fabric Local MCP is evolving from a **read-only context provider** to an **action-enabled development platform**. This summary outlines our requirements for managing item definitions (reports, datasets, pipelines, etc.) through the Local MCP, with emphasis on supporting **human-operated, AI-assisted workflows**.

**Key Themes:**
- 📦 **Import/Export of Item Definitions** — Unified approach for all item types
- 🤝 **Human-in-the-Loop Execution** — AI proposes, humans approve
- 🛠️ **CLI Integration** — Generate and execute CLI scripts transparently
- 🔄 **Bidirectional Workflows** — Seamless cloud ↔ local ↔ cloud operations

---

## Part 1: Current State

### What We Have Today (Public Preview)

| Capability | Status | Notes |
|------------|--------|-------|
| OpenAPI specs for all workloads | ✅ Live | Enables accurate code generation |
| JSON schemas for item definitions | ✅ Live | Validation as you type |
| Best practices guidance | ✅ Live | Pagination, error handling, LRO patterns |
| Documentation search | ✅ Live | Semantic search across MS Learn |
| OneLake file operations | ✅ Live (beta.4) | Read/write/list/delete files |
| Item listing | ✅ Live (beta.4) | View items in workspaces |

### What's Missing for Item Definition Workflows

| Gap | Impact | Priority |
|-----|--------|----------|
| **No Item CRUD** | Can't create/update items from IDE | P1 for GA |
| **No batch import/export** | Multi-item workflows require manual scripting | P0 for Q2 |
| **No CLI script generation** | Agents produce SDK code instead of reusable CLI | P1 for GA |
| **No dry-run mode** | No way to preview changes before execution | P1 for GA |
| **Limited partial updates** | Must replace entire definition, not just parts | P2 |

---

## Part 2: Upcoming API Changes (Action Items)

### New Bulk Import/Export APIs (Landed Today)

> **ADO Notification:** "Add Bulk Export Import Items Definitions APIs – ArtifactRegistry 891058"

**What's New:**
- **Batch Export:** Export all items from a workspace in one structured JSON payload
- **Batch Import:** Import items while automatically preserving relationships
- **`beta` query param:** Safe rollout flag for new endpoints

**Questions to Resolve (Tomorrow's Meeting):**
1. **Compatibility:** Can "single-exported" items be imported via batch API?
2. **`beta` flag policy:** When do we flip `beta=false` for callers?
3. **Dependency handling:** How does batch API handle item ordering (Lakehouse before Pipeline)?

### CLI Alignment Plan

| Phase | Approach | Status |
|-------|----------|--------|
| **Near-term** | Folder export/import via **single** item-definition APIs | In progress |
| **Longer-term** | Migration to **batch** APIs once stable | Pending API stabilization |

**Key Insight (from Ohad Edry):** Implement single-item path now for speed, plan migration to batch APIs with defined criteria/date.

---

## Part 3: Human-in-the-Loop AI Model

### Philosophy: AI Proposes, Human Disposes

The Local MCP keeps the user in control by **generating code rather than executing it directly**. This model is critical for:
- **Trust:** Users see exactly what will happen before it happens
- **Safety:** Destructive operations require explicit confirmation
- **Transparency:** Actions can be reproduced manually using CLI

### Workflow Pattern

```
┌───────────────┐    ┌────────────────┐    ┌────────────────┐    ┌───────────────┐
│ User Request  │───▶│ AI Generates   │───▶│ User Reviews   │───▶│ User Approves │
│ (Natural Lang)│    │ CLI Script     │    │ & Edits        │    │ Execution     │
└───────────────┘    └────────────────┘    └────────────────┘    └───────────────┘
```

### Tools That Support This Model

| Tool | Purpose | Human Checkpoint |
|------|---------|------------------|
| `GenerateCLIScript` | Produce CLI commands for a task | User reviews script before running |
| `DryRun` | Simulate changes without applying | User sees diff before committing |
| `ValidateDefinition` | Check JSON against schema | User sees errors before import |
| `RunCLICommand` | Execute approved CLI commands | Explicit user invocation required |

### Azure MCP Precedent

Azure MCP introduced **elicitation support**: agents prompt users for confirmation before executing tools that might return sensitive data or make significant changes. We should adopt this pattern for:
- Item creation/deletion
- Workspace-level imports
- Permission changes

---

## Part 4: Proposed New Features

### Feature 1: CLI Script Generator

**What:** MCP tool that produces Fabric CLI scripts from natural language requests

**Example Interaction:**
```
User: "Help me export this workspace and import it into Prod"

Agent → calls GenerateCLIScript tool

Output:
  # Export current workspace
  fab export /ws1.Workspace --recursive -o ./export-bundle
  
  # Import to production workspace
  fab import /Marketing-Prod.Workspace -i ./export-bundle
```

**Benefits:**
- Scripts are human-readable and reusable
- Users can modify before execution
- Promotes CLI adoption
- Creates tangible artifacts for version control

**Effort:** M (Medium)  
**Priority:** P1 for GA

---

### Feature 2: CLI Execution Tool

**What:** MCP tool that runs CLI commands after user approval

**Workflow:**
1. Agent generates CLI script (Feature 1)
2. User reviews and optionally edits
3. User confirms execution
4. `RunCLICommand` executes with progress feedback

**Safety Features:**
- Confirmation prompt before execution
- Output streaming for visibility
- Error handling with actionable messages
- Rollback suggestions on failure

**Effort:** M (Medium)  
**Priority:** P1 for GA

---

### Feature 3: Item Definition Import/Export Tools

**What:** High-level tools for workspace-level definition management

| Tool | Description |
|------|-------------|
| `ExportWorkspace` | Export all item definitions from a workspace as JSON bundle |
| `ImportWorkspace` | Import items from bundle, auto-preserve relationships |
| `ExportItem` | Export single item definition |
| `UpdateItemDefinition` | Update item with new definition JSON |

**Leverages:** New Batch Import/Export APIs  
**Effort:** L (Large)  
**Priority:** P0 for Q2 (post-GA)

---

### Feature 4: Definition Validation & Diff Utilities

**What:** Tools to catch errors before they reach the service

| Tool | Use Case |
|------|----------|
| `ValidateDefinition` | Check JSON against item schema before import |
| `CompareDefinitions` | Diff two versions of an item definition |
| `PreviewChanges` | Show what would change before update |

**Benefits:**
- Early error detection
- Supports human review of AI-generated changes
- Reduces deploy-fail-fix cycles

**Effort:** S-M  
**Priority:** P1 for GA (ValidateDefinition), P2 for others

---

### Feature 5: Dry Run Mode

**What:** Simulation mode that shows changes without applying them

**Example:**
```
User: "Deploy this config, but show me what would happen first"

Agent → calls CreateDeployment with dry_run=true

Output:
  ✅ Would CREATE: Lakehouse 'SalesData'
  ✅ Would CREATE: Dataset 'SalesMetrics'  
  ⚠️ Would UPDATE: Report 'Dashboard' (3 measures changed)
  ❌ Would DELETE: Lakehouse 'Old_Backup' 
  
  [Confirm] [Cancel] [View Details]
```

**Effort:** M  
**Priority:** P1 for GA

---

## Part 5: External Research Insights

### What Others Are Doing

| Source | Insight | Implication |
|--------|---------|-------------|
| **Community MCP Server** (strainprint/GitHub) | Built unofficial Fabric MCP with direct execution (create notebooks, upload data, run queries) | Demand exists for action-capable MCP; we should provide official, governed version |
| **fabric-cicd library** | Open-source Python tool for CI/CD deployment of Fabric items | Validate our approach against community patterns |
| **Power BI PBIP format** | Packaged project files for report/dataset definitions | Consider supporting PBIP as an import/export format |
| **Azure Data Factory ARM templates** | Export entire data factory as deployable template | Reinforces batch export approach |

### Best Practices from Internal Teams

| Practice | Source | Application |
|----------|--------|-------------|
| **Work in bulk** | Ted Pattison (CAT) | Export/import entire workspaces, not item-by-item |
| **Let platform handle IDs** | Platform team | New batch API auto-resolves relationships |
| **Use CLI as foundation** | Internal discussion | CLI provides auth, navigation, error handling "for free" |
| **Generate tangible artifacts** | Customer feedback | Scripts users can save, version, and modify |

### Key Quote

> "Lots of things came for free with CLI: authentication, workspace navigation, item creation… Having the agent produce CLI scripts gives users a tangible asset that's easier to debug and reuse."

---

## Part 6: Prioritized Roadmap

### GA Timeline (March 2026 - FabCon Atlanta)

| Priority | Feature | Effort | Status |
|----------|---------|--------|--------|
| P0 | Integrated Auth (token caching) | M | 🔄 In progress |
| P0 | Error Message Polish | S | 🔄 In progress |
| P0 | Automatic Retry | S | 🔄 In progress |
| P0 | GA Documentation | M | 🔄 In progress |
| P1 | **Item CRUD** (create/update/delete) | L | ⏳ If capacity |
| P1 | **Dry Run Mode** | M | ⏳ If capacity |
| P1 | **CLI Script Generation** | M | ⏳ If capacity |

### Post-GA (Q2 2026)

| Priority | Feature | Notes |
|----------|---------|-------|
| P0 | Batch Import/Export integration | Depends on new API stabilization |
| P1 | Definition validation utilities | Early error detection |
| P1 | CLI execution tool | Complete the generate→execute loop |
| P2 | Multi-workspace dependency analysis | Advanced deployment planning |
| P2 | Blueprint templates | Community workspace templates |

---

## Part 7: Decision Points for Tomorrow

### Decisions Needed

1. **Primary path confirmation:**
   - ✅ Ship Local MCP + CLI folder flows using **single get/update item definition** APIs now
   - Mark batch as *future switch-over* with defined criteria/date

2. **Batch adoption gates:**
   - What must be true to flip to batch APIs?
   - Dependency resolution, parity across item types, perf benchmarks?

3. **Compatibility validation:**
   - Can single-exported artifacts be imported via batch?
   - If not, what's the migration guidance?

4. **Selective updates scope:**
   - Keep **out of scope** unless concrete high-value use case emerges
   - Per Tal/Ofri analysis: file-level selective updates don't materially improve outcomes

5. **`beta` flag policy:**
   - Agree on usage timing for `beta=false` once contracts stabilize

---

## Part 8: Slide-Ready Bullets

### Slide 1: The Vision
- **Fabric Local MCP evolves** from context provider → action enabler
- **Item definitions** become first-class citizens in developer workflow
- **Human-in-the-loop** ensures trust: AI proposes, humans approve

### Slide 2: Current Gaps
- ❌ No Item CRUD from IDE
- ❌ No batch import/export
- ❌ No CLI script generation
- ❌ No dry-run preview mode

### Slide 3: New Batch APIs
- Landed today: Bulk Export/Import Items Definitions
- Single export → one JSON bundle with all items
- Auto-preserves relationships (no manual ID patching)

### Slide 4: Proposed Tools
- `GenerateCLIScript` — AI produces CLI scripts for review
- `RunCLICommand` — Execute approved scripts with progress
- `ExportWorkspace` / `ImportWorkspace` — Batch operations
- `DryRun` — Preview changes before applying

### Slide 5: Human-in-the-Loop Pattern
```
Request → Generate Script → Review → Approve → Execute
```
- Confirmation prompts for destructive actions
- All actions reproducible via CLI
- Transparent logging and progress

### Slide 6: Timeline
- **GA (March 2026):** Item CRUD, Dry Run, CLI Gen (if capacity)
- **Post-GA (Q2 2026):** Batch Import/Export, Validation utilities
- **FabCon Atlanta:** Launch announcement target

### Slide 7: Decisions for Today
1. Confirm single-API path now, batch later
2. Define batch adoption criteria
3. Validate single→batch compatibility
4. Scope out selective updates for now

---

## Appendix: Reference Links

### Internal Documents
- [Support Import and Export with folders on Fabric CLI v2.docx](https://microsofteur-my.sharepoint.com/...)
- [Fabric-MCP-Getting-Started.pptx](https://microsofteur-my.sharepoint.com/...)
- [Unified creator agent sync 2026-01-21.loop](https://loop.cloud.microsoft.com/...)

### ADO Work Items
- [Ability to import/export complete workspaces from CLI (Epic)](https://dev.azure.com/powerbi/...)
- [Support multiple formats for import and export (Feature)](https://dev.azure.com/powerbi/...)
- [Support folder import/export (Features)](https://dev.azure.com/powerbi/...)

### Public Documentation
- [Items – REST API (Core)](https://learn.microsoft.com/en-us/rest/api/fabric/core/items)
- [Item definition overview](https://learn.microsoft.com/en-us/rest/api/fabric/articles/item-management/definitions/item-definition-overview)
- [VS Code MCP servers guide](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)

---

*Document prepared for internal planning discussion. Contains forward-looking features subject to change.*
