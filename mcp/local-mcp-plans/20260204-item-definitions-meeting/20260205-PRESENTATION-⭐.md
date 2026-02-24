# Fabric Local MCP: Item Definitions Discussion
## Internal Planning Meeting

**Date:** February 5, 2026  
**Duration:** 60 minutes  
**Presenter:** Hasan Abo-Shally  
**Attendees:** CLI Team, Platform Team, Engineering

---

# Agenda (60 min)

| Time | Section | Purpose |
|------|---------|---------|
| 0-10 min | Local MCP Recap | Align on where we are today |
| 10-20 min | Vision & Direction | Where MCP is heading (industry + our roadmap) |
| 20-30 min | Proposed Capabilities | 6 features we want to add |
| 30-55 min | **Focus: Import/Export Tools** | Deep dive + decision points |
| 55-60 min | Next Steps & Parking Lot | Wrap up |

---

# Meeting Goals

| # | Goal |
|---|------|
| 1 | **Align** on the next phase of Local MCP capabilities |
| 2 | **Finalize** design direction for Import/Export tools |
| 3 | **Confirm** CLI integration requirements and open questions |
| 4 | **Assign** owners and timelines for implementation |

---

# Part 1: Local MCP Recap (10 min)

## What Is Fabric Local MCP?

An **open-source MCP server** running on developer machines that gives AI agents (Copilot, Claude) direct access to Fabric context.

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  GitHub Copilot │     │  Fabric Local   │     │  Fabric Cloud   │
│  Claude / IDE   │────▶│  MCP Server     │────▶│  APIs / OneLake │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Why It Matters

| Problem | How Local MCP Solves It |
|---------|-------------------------|
| AI hallucinates Fabric APIs | Real-time OpenAPI specs embedded |
| Context switching to docs | Semantic search from IDE |
| OAuth boilerplate code | CLI handles auth transparently |
| Schema validation errors | JSON schemas + validation as you type |

> 📝 **Key Term:** *Item definitions* = the JSON representation of Fabric items (reports, datasets, pipelines). When we say "export/import items," we mean exporting/importing their definitions, not the underlying data.

## Current State (Public Preview)

**Version:** 0.0.0-beta.2  
**Distribution:** VS Code Extension • NuGet • NPM

| Live Today | Status |
|------------|--------|
| OpenAPI specs for all workloads | ✅ |
| JSON schemas for item definitions | ✅ |
| Best practices guidance | ✅ |
| MS Learn documentation search | ✅ |
| Fabric glossary | ✅ |

---

# Part 2: Vision & Direction (10 min)

## Where MCP Is Heading (Industry)

The Model Context Protocol ecosystem is evolving rapidly:

| Trend | What It Means |
|-------|---------------|
| **MCP Apps** | Composable, multi-server architectures (Fabric + Git + GitHub) |
| **Elicitation** | Servers can request structured user input (approval dialogs) |
| **Sampling** | Servers can request LLM completions for reasoning |
| **Tasks** | Long-running operations with progress tracking |
| **MCP Registry** | Centralized discovery of MCP servers (coming GA) |

## What This Could Enable for Fabric

```
┌─────────────────────────────────────────────────────────────────────┐
│                    FUTURE: COMPOSABLE AI WORKFLOWS                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  "Clone my workspace to staging, commit changes to Git,             │
│   create a PR, and notify the team on Slack"                        │
│                                                                     │
│       ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐        │
│       │ Fabric  │ + │   Git   │ + │ GitHub  │ + │  Slack  │        │
│       │   MCP   │   │   MCP   │   │   MCP   │   │   MCP   │        │
│       └─────────┘   └─────────┘   └─────────┘   └─────────┘        │
│                                                                     │
│  AI orchestrates multiple MCPs as a unified workflow                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Our Roadmap Vision

| Phase | Theme | Target |
|-------|-------|--------|
| **Now** | Context & Validation | ✅ Live |
| **Q1 2026** | OneLake + Auth + Item Definitions | 🔄 In Progress |
| **Q2 2026** | Execution Tools + CLI Integration | Planned |
| **GA (Mar 2026)** | Production Ready | FabCon Atlanta |

---

# Part 3: Proposed Capabilities (10 min)

## 6 Capabilities We Want to Add

> **What is an Item Definition?**  
> The JSON representation of a Fabric item (report, dataset, pipeline, notebook, etc.) that describes its structure, configuration, and metadata. This is what you'd find in Git when using Fabric's Git integration.

### 1. Export Item Definition
| Aspect | Details |
|--------|---------|
| **What** | Export a Fabric item's JSON definition to local file |
| **User Value** | "Download report to edit locally, version control, migrate" |
| **Priority** | P0 |

### 2. Import Item Definition
| Aspect | Details |
|--------|---------|
| **What** | Import local JSON definition back to Fabric |
| **User Value** | "Push local changes to Fabric without using the portal" |
| **Priority** | P0 |

### 3. Validate Definition
| Aspect | Details |
|--------|---------|
| **What** | Check JSON against item schema before import |
| **User Value** | "Catch errors before they fail in the cloud" |
| **Priority** | P1 || **Scope** | Initial: JSON schema validation. Future: semantic checks (dependencies, unsupported fields) |
### 4. Workspace Export (Batch)
| Aspect | Details |
|--------|---------|
| **What** | Export all items from a workspace as a bundle |
| **User Value** | "Backup or clone entire workspace in one command" |
| **Priority** | P1 |

### 5. Workspace Import (Batch)
| Aspect | Details |
|--------|---------|
| **What** | Import bundle of items, preserving dependencies |
| **User Value** | "Restore workspace or migrate to new environment" |
| **Priority** | P1 |

### 6. CLI Script Generation
| Aspect | Details |
|--------|---------|
| **What** | Generate Fabric CLI commands from natural language |
| **User Value** | "AI writes reusable scripts I can version control" |
| **Priority** | P1 |

## Summary View

| # | Capability | User Says... | Priority |
|---|------------|--------------|----------|
| 1 | Export Definition | "Download this report's definition" | **P0** |
| 2 | Import Definition | "Push my changes back to Fabric" | **P0** |
| 3 | Validate Definition | "Is this JSON valid before I import?" | P1 |
| 4 | Workspace Export | "Backup my entire workspace" | P1 |
| 5 | Workspace Import | "Clone workspace to staging" | P1 |
| 6 | CLI Script Gen | "Show me the CLI commands for this" | P1 |

---

# Part 4: Focus — Import/Export Tools (25 min)

## 🎯 Today's Focus: Items 1 & 2

We'll deep-dive on **Export** and **Import** of item definitions.

> ⚠️ **Key Shift:** These are the **first "write" tools** in Local MCP.  
> Until now, MCP has been read-only (context, schemas, docs). Import introduces **controlled execution** with human-in-the-loop approval.

## The User Scenario

> "I want Copilot to export a report definition, let me edit it locally in VS Code, then import it back to Fabric."

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   FABRIC     │     │   LOCAL      │     │   COPILOT    │     │   FABRIC     │
│  (Source)    │     │   FILE       │     │   EDITS      │     │  (Target)    │
├──────────────┤     ├──────────────┤     ├──────────────┤     ├──────────────┤
│ SalesReport  │────▶│ report.json  │────▶│ + new visual │────▶│ SalesReport  │
│              │ MCP │              │ IDE │              │ MCP │  (updated)   │
│              │Export│             │     │              │Import│             │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

## Key Design Decision: CLI as Execution Engine

**Proposal:** All MCP tools wrap the Fabric CLI underneath.

```
┌─────────────────────────────────────┐
│         MCP TOOLS                   │
│  • definition export                │
│  • definition import                │
│  • definition validate              │
└───────────────┬─────────────────────┘
                │ wraps
                ▼
┌─────────────────────────────────────┐
│         FABRIC CLI                  │
│  • fab export                       │
│  • fab import                       │
│  • Auth / Retry / Error handling    │
└───────────────┬─────────────────────┘
                │
                ▼
┌─────────────────────────────────────┐
│       FABRIC REST APIs              │
└─────────────────────────────────────┘
```

## Why CLI as the Engine?

| Benefit | Why |
|---------|-----|
| **Reproducible** | Every MCP action = CLI command user can run manually |
| **Proven** | CLI already tested in production CI/CD |
| **Auth handled** | No token management in MCP |
| **Maintainable** | MCP delegates execution to CLI for maintainability and alignment with existing tooling |
| **Aligned with fabric-cicd** | Future `fab deploy` integration (not yet GA) |

## Tool: Export Definition

**User:** "Export the SalesReport definition"

**MCP wraps:**
```bash
fab export /workspace/SalesReport.Report -o ./report.json
```

**Output:** JSON file saved locally (preserves folder structure if supported by CLI)

| Input | Required | Description |
|-------|----------|-------------|
| workspace | Yes | Name or ID |
| item | Yes | Item name (e.g., `SalesReport.Report`) |
| outputPath | Yes | Local file path |
| includeFolders | No | Preserve folder hierarchy (if CLI supports) |

## Tool: Import Definition

**User:** "Import my updated report"

**MCP Flow:**
1. Show diff/preview of changes
2. Request approval (via elicitation)
3. Execute: `fab import /workspace -i ./report.json`

> **Note:** The import API handles **dependency resolution** and **ID remapping** automatically (e.g., dataset IDs referenced in reports are updated to match target workspace).

| Input | Required | Description |
|-------|----------|-------------|
| workspace | Yes | Target workspace |
| sourcePath | Yes | Local JSON file |
| strategy | No | Conflict resolution (see below) |
| dryRun | No | Preview without applying |

**Strategy Values:**
- `overwrite` — Replace existing item with same name/ID
- `skip` — Ignore if item already exists
- `rename` — Create new item with suffix (e.g., `Report_1`)

> ⚠️ **Note:** Partial updates (e.g., patching a single field in a definition) are **not currently supported**. Imports replace the full definition.

## Discussion Points

### 1. Approval Flow

> **Question:** Should import always require approval?

| Option | Pros | Cons |
|--------|------|------|
| Always approve | Safest, aligns with MCP spec | Extra click for dev environments |
| Smart (prod only) | Faster for dev | Complex to implement |
| User setting | Flexible | User must configure |

**Recommendation:** Always require approval (principle: "verify destructive actions")

> 🔐 **Note:** Approval is especially critical for **production environments**. Default behavior should be "approve unless explicitly disabled" to prevent accidental overwrites.

---

### 2. Dry-Run Capability

> **Question:** Where does dry-run logic live?

| Option | Description |
|--------|-------------|
| MCP-side | Validate locally only |
| CLI `--dry-run` | CLI calls API in preview mode |
| Both | Best coverage |

**What should dry-run validate?**
- ✅ JSON schema correctness
- ✅ API compatibility (supported item type, version)
- ✅ Workspace constraints (permissions, capacity, naming conflicts)

**Question for CLI team:** Does `fab import --dry-run` exist?

---

### 3. Tool vs. Script Generation

> **Question:** Should we have dedicated tools OR generate CLI scripts?

**Answer: Both (Hybrid)**

| Scenario | Approach |
|----------|----------|
| Simple export | Direct tool (`definition export`) |
| Complex multi-step | Generate script for user to review |
| Potentially destructive action | Tool with user approval (via elicitation) |

---

### 4. CLI Requirements

> **Question:** What do we need from CLI team?

| Requirement | Status | Notes |
|-------------|--------|-------|
| `fab export` command | ✅ | Already available |
| `fab import` command | ✅ | Already available |
| `--dry-run` flag | ❓ | Needed for preview |
| JSON output format | ❓ | For MCP parsing |
| Error codes | ❓ | For error handling |
| `fab deploy` | 🔄 | fabric-cicd integration (future) |

**Known Limitations to Discuss:**
- ⚠️ Large JSON payloads (>100KB) — use file-based flow, avoid LLM parsing
- ⚠️ Unsupported item types (e.g., paginated reports) — validate before import
- ⚠️ Cross-workspace dependencies — how should CLI handle?

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Import fails mid-way | Use atomic API or rollback logic |
| Unsupported item types | Validate before import; warn user |
| Large JSON payloads | Use file-based flow; avoid LLM parsing |
| Agent misfires | Require explicit approval before execution |
| Permission errors | Inherit user permissions; fail fast with clear message |

## Open Questions

| Question | Owner |
|----------|-------|
| Should import support partial updates (e.g., patching a report)? | Platform |
| How do we handle cross-workspace dependencies? | CLI / Platform |
| Can we support environment-specific parameterization (e.g., variable library)? | CLI / Engineering |
| What item types are NOT supported by export/import API? | Platform |

---

# Part 5: Next Steps & Parking Lot (5 min)

## Decisions to Make Today

| # | Decision | Options |
|---|----------|---------|
| 1 | Approval flow | Always / Smart / User setting |
| 2 | Dry-run owner | MCP / CLI / Both |
| 3 | CLI requirements | Confirm what's needed |

## Parking Lot (Future Discussions)

| Topic | When |
|-------|------|
| Workspace-level deployment (`fab deploy`) | After fabric-cicd lands |
| Batch import/export | After CLI batch support |
| MCP Resources (schemas, CLI help) | Q2 planning |
| MCP Prompts (`/export`, `/import` templates) | Q2 planning |

## Action Items

| Action | Owner | Due |
|--------|-------|-----|
| Finalize tool input/output schemas | Hasan | Feb 7 |
| Confirm CLI dry-run / JSON output | CLI Team | Feb 7 |
| Create ADO work items | Hasan | Feb 10 |
| Begin implementation | Engineering | Feb 12 |

---

# Appendix: Quick Reference

## Guiding Principles

| # | Principle |
|---|-----------|
| 1 | Trust agents, verify destructive actions |
| 2 | Agents inherit user permissions |
| 3 | Offline-first for context |
| 4 | CLI over SDK for code gen |
| 5 | Errors must teach, not just fail |
| 6 | Optimize for LLM context windows |

## Success Metrics (GA Target)

| Metric | Target |
|--------|--------|
| Weekly Active Users | 5,000+ |
| First-try deployment success | 75%+ |
| Time to author item | < 5 min |

## Resources

- **Meeting Summary:** `20260205-LOCAL-MCP-MEETING-SUMMARY-⭐.md`
- **Tool Spec:** `20260204-IMPORT-EXPORT-TOOLS-SPEC-⭐.md`
- **Research:** `20260204-MCP-CLI-INTEGRATION-RESEARCH-⭐.md`
- **Main Spec:** `FABRIC-LOCAL-MCP-SPEC-V5.md`
