# AI-Powered Automation & Pro-Developer Experience in Fabric
## Vision V4: CLI, MCP, and the Future of Fabric Automation

**Version:** 4.0  
**Date:** November 30, 2025  
**Author:** Hasan Abo-Shally, Principal PM, Fabric Platform  
**Status:** Strategic Vision Document (Research-Backed)  
**Prepared For:** Kim Manis 1:1 (December 11, 2025)

---

## Executive Summary

Microsoft Fabric is evolving to serve two interconnected needs:

1. **Meet pro-developers where they are** — Terminal at the bottom, Copilot on the side, Git in the workflow
2. **Give AI agents real power to act** — MCP + CLI = Copilot that executes, not just advises

This vision describes how **CLI, MCP, and automation infrastructure** work together to create a platform where:
- Developers feel at home
- Copilot becomes genuinely useful for complex operations
- Expertise captured once runs forever as automation

### What We're Asking For

| Decision | Ask | Timeline |
|----------|-----|----------|
| **Strategic alignment** | Confirm CLI as platform infrastructure, not just tooling | This meeting |
| **Resourcing** | 2 additional engineers for CLI Script Item | Q1 2026 |
| **Cross-team coordination** | Portal, Copilot, MCP teams aligned on Phase 2 | Q1 2026 |
| **Investment approval** | Remote MCP infrastructure | Q2 2026 |

### The Three Transformations

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FABRIC FOR THE AI AGE                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  1. PRO-DEVELOPER EXPERIENCE                                        │    │
│  │     "Fabric works the way you already work"                         │    │
│  │     • CLI in portal (familiar terminal)                             │    │
│  │     • Copilot in editor (AI pair programmer)                        │    │
│  │     • Git integration (version control they expect)                 │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                              │                                              │
│                              ▼                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  2. AI-POWERED PLATFORM                                             │    │
│  │     "Your AI assistant can actually do things"                      │    │
│  │     • MCP gives Copilot tools to act                                │    │
│  │     • CLI as universal execution interface                          │    │
│  │     • Code generation > endless tool calls                          │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                              │                                              │
│                              ▼                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  3. AUTOMATION DEMOCRATIZATION                                      │    │
│  │     "Capture expertise once, run forever"                           │    │
│  │     • GUI users → learn CLI through Copilot                         │    │
│  │     • CLI scripts → save as Fabric items                            │    │
│  │     • Scripts → run on schedule without humans                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Customer Voice

> "Our engineers prefer command line tools over clicking in the UI. Lots of excitement around CLI for automation and CI/CD."  
> — Design Partner feedback (Enterprise, Financial Services)

> "Help me keep my fabric-cli updated" — Request for `fab upgrade` command  
> — GitHub Issue from active user

> "We can't adopt Fabric for our DevOps workflows until there's a proper CLI with CI/CD support."  
> — Customer feedback (Fortune 500, Technology)

### Current Metrics

| Metric | Value | Interpretation |
|--------|-------|----------------|
| CLI Downloads | 190,000 | Broad trial interest |
| Monthly Active Users | ~1,400 | Core power user base |
| Active Tenants | ~1,000 | Enterprise adoption beginning |
| **DAU/MAU Ratio** | **35%** | **Exceptional stickiness**—those who adopt, stay |

*Source: Internal telemetry, November 2025*

---

## Table of Contents

1. [A Day in the Life: Before & After](#1-a-day-in-the-life-before--after)
2. [The Bigger Picture](#2-the-bigger-picture)
3. [Pro-Developer Experience](#3-pro-developer-experience)
4. [AI-Powered Platform (MCP + CLI)](#4-ai-powered-platform-mcp--cli)
5. [Automation Infrastructure](#5-automation-infrastructure)
6. [The Code Execution Thesis](#6-the-code-execution-thesis)
7. [Learning & Adoption](#7-learning--adoption)
8. [Target Personas](#8-target-personas)
9. [Accessibility](#9-accessibility)
10. [Security & Compliance](#10-security--compliance)
11. [Error Handling & Trust](#11-error-handling--trust)
12. [Business Case](#12-business-case)
13. [Competitive Differentiation](#13-competitive-differentiation)
14. [Partner & ISV Opportunity](#14-partner--isv-opportunity)
15. [Success Metrics](#15-success-metrics)
16. [Risks & Mitigations](#16-risks--mitigations)
17. [Versioning & Compatibility](#17-versioning--compatibility)
18. [Roadmap](#18-roadmap)
19. [Appendix A: Research Sources](#appendix-a-research-sources)
20. [Appendix B: Future Opportunities](#appendix-b-future-opportunities)
21. [Appendix C: Scoping Decisions](#appendix-c-scoping-decisions)

---

## 1. A Day in the Life: Before & After

### Scenario: Maya, Data Platform Engineer at Contoso

**The Task:** Migrate 150 reports from the "Development" workspace to "Production" with updated connection strings, verify each report, and generate a compliance log.

---

### TODAY (Without This Vision)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           MAYA'S MONDAY (TODAY)                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   9:00 AM   Open Fabric portal, navigate to Development workspace          │
│   9:05 AM   Click first report → Download → Save locally                    │
│   9:08 AM   Open report in Power BI Desktop                                 │
│   9:12 AM   Update connection string manually                               │
│   9:15 AM   Save, upload to Production workspace                            │
│   9:18 AM   Verify report renders correctly                                 │
│   9:20 AM   Log in spreadsheet: "Report 1 - Migrated - 9:20 AM"            │
│                                                                             │
│   9:22 AM   Repeat for Report 2...                                          │
│   ...                                                                       │
│   6:30 PM   Finally finish Report 150                                       │
│   6:45 PM   Realize Report 47 had wrong connection string                   │
│   7:30 PM   Fix Report 47, go home exhausted                               │
│                                                                             │
│   TOTAL TIME: 10+ hours                                                     │
│   ERRORS: 3 reports with wrong connections (discovered later)               │
│   COMPLIANCE LOG: Incomplete, manual, error-prone                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### FUTURE (With This Vision)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          MAYA'S MONDAY (FUTURE)                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   9:00 AM   Open Fabric portal, open Copilot panel                          │
│                                                                             │
│   Maya: "Migrate all reports from Development to Production,                │
│          update connection strings to prod-server, verify each             │
│          report loads, and generate a compliance log"                      │
│                                                                             │
│   ─────────────────────────────────────────────────────────────────────     │
│                                                                             │
│   Copilot: "Here's what I'll do:                                            │
│                                                                             │
│   1. List 150 reports in 'Development' workspace                            │
│   2. For each report:                                                       │
│      - Export to temporary location                                        │
│      - Update connection: dev-server → prod-server                         │
│      - Deploy to 'Production' workspace                                    │
│      - Verify report renders (health check)                                │
│   3. Generate compliance log with timestamps                                │
│                                                                             │
│   ⏱️  Estimated time: 12 minutes                                            │
│   📊 Reports to migrate: 150                                                │
│                                                                             │
│   [View CLI Script]  [Run in Dry-Run]  [Execute]  [Cancel]"                │
│                                                                             │
│   ─────────────────────────────────────────────────────────────────────     │
│                                                                             │
│   9:02 AM   Maya clicks [Run in Dry-Run] to preview                         │
│   9:03 AM   Reviews preview: "Would migrate 150 reports..."                 │
│   9:04 AM   Maya clicks [Execute]                                           │
│   9:16 AM   Migration complete. 150/150 successful.                         │
│   9:17 AM   Compliance log saved to workspace: migration-log-20251130.json  │
│   9:18 AM   Maya saves script as "CLI Script Item" for next sprint          │
│                                                                             │
│   TOTAL TIME: 18 minutes                                                    │
│   ERRORS: 0 (automated verification caught 2 issues, auto-retried)          │
│   COMPLIANCE LOG: Complete, automated, auditable                            │
│                                                                             │
│   9:20 AM   Maya starts her actual work for the day ☕                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Time Saved:** 9.5 hours → reinvested in high-value work  
**Error Reduction:** 3 errors → 0 errors  
**Reusability:** Script saved for next migration (30 seconds next time)

---

## 2. The Bigger Picture

### What Are We Really Building?

This vision is about more than CLI. It's about **five interconnected capabilities**:

| Capability | What It Enables | Why It Matters |
|------------|-----------------|----------------|
| **Platform Extensibility** | CLI + MCP + Blueprints = third parties build on Fabric | Ecosystem growth |
| **Closing the "Last Mile"** | Copilot understands intent; CLI executes—no gap | From "I want" to "it's done" |
| **Developer-Led Adoption** | Devs adopt tools bottom-up; CLI makes Fabric adoptable | Land & expand in enterprises |
| **Composability** | Small CLI commands compose into complex workflows | Unix philosophy in Fabric |
| **Persona Bridging** | Same infrastructure serves citizen devs (via Copilot) and pros (via CLI) | One platform, all users |

### The Complete Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         FABRIC AUTOMATION STACK                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   USER LAYER                                                                │
│   ───────────                                                               │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│   │ Portal GUI   │  │ CLI in       │  │ Local CLI    │  │ CI/CD        │   │
│   │ (click)      │  │ Portal       │  │ (terminal)   │  │ Pipelines    │   │
│   └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘   │
│          │                 │                 │                 │            │
│          └─────────────────┴─────────────────┴─────────────────┘            │
│                                    │                                        │
│   INTELLIGENCE LAYER               ▼                                        │
│   ──────────────────   ┌─────────────────────────────────┐                  │
│                        │         COPILOT                  │                  │
│                        │  • Understands natural language  │                  │
│                        │  • Generates CLI scripts         │                  │
│                        │  • Explains before executing     │                  │
│                        └─────────────────────────────────┘                  │
│                                    │                                        │
│   PROTOCOL LAYER                   ▼                                        │
│   ──────────────────   ┌─────────────────────────────────┐                  │
│                        │           MCP                    │                  │
│                        │  • Local MCP (VS Code, IDEs)     │                  │
│                        │  • Remote MCP (cloud-hosted)     │                  │
│                        │  • Tool discovery & execution    │                  │
│                        └─────────────────────────────────┘                  │
│                                    │                                        │
│   EXECUTION LAYER                  ▼                                        │
│   ──────────────────   ┌─────────────────────────────────┐                  │
│                        │           CLI                    │                  │
│                        │  • Deterministic execution       │                  │
│                        │  • Scriptable & composable       │                  │
│                        │  • Full audit trail              │                  │
│                        └─────────────────────────────────┘                  │
│                                    │                                        │
│   PLATFORM LAYER                   ▼                                        │
│   ──────────────────   ┌─────────────────────────────────┐                  │
│                        │      FABRIC PLATFORM             │                  │
│                        │  • Workspaces, Items, Pipelines  │                  │
│                        │  • Spark, Lakehouse, Warehouse   │                  │
│                        │  • Power BI, Data Factory        │                  │
│                        └─────────────────────────────────┘                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Pro-Developer Experience

### The Goal: Fabric Feels Familiar

Pro-developers have expectations shaped by modern tools. Fabric must meet them:

| Developer Expectation | Current State | Target State |
|----------------------|---------------|--------------|
| **Terminal access** | Install CLI locally | CLI in portal, pre-authenticated |
| **AI assistance** | Copilot in portal | Copilot everywhere (portal, VS Code, CLI) |
| **Version control** | Manual export | Git integration, Blueprints as code |
| **Automation** | Manual or external | Native CLI Script Items |

### 3.1 CLI in Portal

**What:** Browser-based CLI embedded in Fabric portal—no local installation required.

**Industry Standard:** Every major cloud platform offers this:

| Platform | Feature | Innovation We Can Learn From |
|----------|---------|------------------------------|
| AWS CloudShell | Bottom panel terminal | **Safe Paste** — Warning before multi-line paste |
| Google Cloud Shell | Integrated terminal + editor | **"Open in Cloud Shell"** buttons in docs |
| Azure Cloud Shell | Bash or PowerShell choice | **AI IntelliSense** — Predictive commands |

*All three use the same UX pattern: header icon → click → bottom panel opens*

**Fabric CLI-in-Portal Features:**

| Feature | Priority | Rationale |
|---------|----------|-----------|
| Pre-authenticated | P0 | Inherit Fabric identity automatically |
| Pre-installed CLI | P0 | No setup required |
| **Explain this command** | P0 | User pastes command, sees explanation before running |
| **Safe Paste** | P1 | Warning before multi-line paste (AWS pattern) |
| Persistent home | P1 | Save scripts between sessions |
| Copilot integration | P1 | Natural language → CLI suggestions |
| "Copy as CLI" in GUI | P1 | Show CLI equivalent of UI actions |
| "Open in CLI" from docs | P2 | One-click from documentation to terminal |

### 3.2 The Developer Workflow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PRO-DEVELOPER FABRIC EXPERIENCE                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                              ┌────┐ │   │
│   │                     FABRIC PORTAL                            │ 👤 │ │   │
│   │                                                              └────┘ │   │
│   ├─────────────────────────────────────────────────────────────────────┤   │
│   │                                                                     │   │
│   │   ┌─────────────────────────────────┐  ┌────────────────────────┐   │   │
│   │   │                                 │  │      COPILOT           │   │   │
│   │   │        MAIN CANVAS              │  │                        │   │   │
│   │   │                                 │  │  "Move all reports     │   │   │
│   │   │   Workspaces, Reports,          │  │   to production        │   │   │
│   │   │   Pipelines, Lakehouses         │  │   workspace"           │   │   │
│   │   │                                 │  │                        │   │   │
│   │   │                                 │  │  ─────────────────     │   │   │
│   │   │                                 │  │                        │   │   │
│   │   │                                 │  │  Here's the CLI:       │   │   │
│   │   │                                 │  │  fab item list ...     │   │   │
│   │   │                                 │  │                        │   │   │
│   │   │                                 │  │  [Run] [Explain]       │   │   │
│   │   │                                 │  │                        │   │   │
│   │   └─────────────────────────────────┘  └────────────────────────┘   │   │
│   │                                                                     │   │
│   ├─────────────────────────────────────────────────────────────────────┤   │
│   │                                                                     │   │
│   │   ┌─────────────────────────────────────────────────────────────┐   │   │
│   │   │  $ fab item list --workspace "Production" --type report     │   │   │
│   │   │  NAME              TYPE     LAST MODIFIED                   │   │   │
│   │   │  Sales Dashboard   Report   2025-11-29 14:32                │   │   │
│   │   │  Inventory         Report   2025-11-28 09:15                │   │   │
│   │   │  $ _                                                        │   │   │
│   │   │                                              CLI TERMINAL   │   │   │
│   │   └─────────────────────────────────────────────────────────────┘   │   │
│   │                                                                     │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│   Layout: Copilot on right, CLI at bottom, Canvas in center                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.3 Git Integration & Blueprints

**Why This Matters:** Pro-developers expect version control for everything.

| Feature | Description | Priority |
|---------|-------------|----------|
| CLI scripts in Git | Auto-commit CLI Script Items | P1 |
| Blueprint as code | YAML/JSON definitions version-controlled | P1 |
| PR workflows | Review automation changes before deployment | P2 |
| Diff viewer | See what changed in script revisions | P2 |

---

## 4. AI-Powered Platform (MCP + CLI)

### The Core Insight

Today's Copilot can advise. Tomorrow's Copilot must **act**.

The Model Context Protocol (MCP) gives AI agents tools. The Fabric CLI provides the **universal execution interface** for those tools.

### 4.1 Two MCP Architectures

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MCP ARCHITECTURE OPTIONS                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   LOCAL MCP (Developer's Machine)                                           │
│   ────────────────────────────────                                          │
│   ┌─────────────┐      ┌──────────────┐      ┌───────────────────────┐      │
│   │ VS Code     │ ───► │ Local MCP    │ ───► │ CLI installed         │      │
│   │ Copilot     │      │ Server       │      │ locally               │      │
│   └─────────────┘      └──────────────┘      └───────────────────────┘      │
│                                                                             │
│   Best for: Development, testing, personal automation                       │
│                                                                             │
│   ─────────────────────────────────────────────────────────────────────     │
│                                                                             │
│   REMOTE MCP (Cloud-Hosted)                                                 │
│   ─────────────────────────                                                 │
│   ┌─────────────┐      ┌──────────────┐      ┌───────────────────────┐      │
│   │ Any AI      │ ───► │ Remote MCP   │ ───► │ Sandboxed Execution   │      │
│   │ Agent       │      │ Server       │      │ Environment           │      │
│   │ (Copilot,   │      │              │      │                       │      │
│   │  3rd party) │      │ • Auth       │      │ • Spark context OR    │      │
│   └─────────────┘      │ • Rate limit │      │ • Lightweight container│      │
│                        │ • Logging    │      │ • CLI pre-installed   │      │
│                        │ • Audit      │      │ • Network isolated    │      │
│                        └──────────────┘      └───────────────────────┘      │
│                                                                             │
│   Best for: Production automation, enterprise scenarios, mobile             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 MCP Design Principles

**Critical insight from research:** Token efficiency matters enormously.

> "A single MCP server can consume 40%+ of context window with too many tools."  
> — [Hacker News discussion](https://news.ycombinator.com/item?id=44026539)

**Design Recommendations:**

| Principle | Implementation |
|-----------|----------------|
| **Limit tool count** | 10-15 high-value tools, not every CLI command |
| **Use tool annotations** | `readOnlyHint: true` for safe operations, `destructiveHint: true` for deletions |
| **Expose code execution** | `run_cli_script` tool for complex operations |
| **Concise descriptions** | Focus on when/why, not full parameter docs |
| **Filter responses** | Return relevant fields, not raw API payloads |

**Recommended Tool Groups:**

| Tool Group | Tools | Annotation |
|------------|-------|------------|
| Workspace ops | `list_workspaces`, `create_workspace`, `delete_workspace` | delete = destructive |
| Item ops | `list_items`, `deploy_item`, `export_item` | list = readOnly |
| Execution | `run_cli_script`, `get_script_result` | — |
| Info | `get_workspace_info`, `get_item_info` | readOnly |

### 4.3 Why CLI for Agents?

> "Anyone who has used coding agents knows you need to give them tools, and **a CLI is the simplest, most universal tool you can hand an agent.**"  
> — [Modal Blog](https://modal.com/blog/building-for-agent-devex)

| Approach | For Single Operation | For 100 Operations |
|----------|---------------------|-------------------|
| Direct tool calls | ✅ Simple | ❌ 100 API calls, token explosion |
| CLI script generation | ✅ Simple | ✅ 1 script, 1 execution |

---

## 5. Automation Infrastructure

### The Journey from Manual to Automated

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    THE AUTOMATION JOURNEY                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   STAGE 1: MANUAL                                                           │
│   ──────────────────                                                        │
│   User clicks through GUI to accomplish task                                │
│   • Slow, error-prone, not repeatable                                       │
│                                                                             │
│                              │                                              │
│                              ▼                                              │
│   STAGE 2: COPILOT-ASSISTED                                                 │
│   ─────────────────────────                                                 │
│   User asks Copilot → Copilot generates CLI → User runs once               │
│   • Faster, accurate, learning opportunity                                  │
│                                                                             │
│                              │                                              │
│                              ▼                                              │
│   STAGE 3: SAVED SCRIPT                                                     │
│   ─────────────────────                                                     │
│   User saves CLI script for reuse → Runs when needed                        │
│   • Repeatable, sharable, version-controlled                                │
│                                                                             │
│                              │                                              │
│                              ▼                                              │
│   STAGE 4: SCHEDULED AUTOMATION                                             │
│   ─────────────────────────────                                             │
│   Script runs on schedule as CLI Script Item → No human needed              │
│   • Hands-free, audited, enterprise-grade                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.1 CLI Script Item

**What:** A new Fabric item type that stores and executes CLI scripts on a schedule.

**User Journey:**

```
1. User writes CLI script (locally, in portal, or Copilot generates it)
2. User saves as "CLI Script Item" in workspace
3. User configures schedule (daily, hourly, on-trigger)
4. Fabric executes script in secure sandbox
5. Results logged, notifications sent on success/failure
```

**Why Not Just Use Notebooks?**

| Dimension | Notebook | CLI Script Item |
|-----------|----------|-----------------|
| Startup time | 30-60 seconds (Spark) | ~2-3 seconds |
| Primary use | Data exploration | Platform automation |
| Complexity | Python, SQL, Spark | Simple CLI commands |
| Cost | Higher (Spark compute) | Lower (lightweight container) |
| Learning curve | Medium | Low (just CLI) |

**Target Scenarios:**
- Daily export of reports to Azure Storage
- Weekly permission audit and report
- On-demand workspace provisioning from Blueprint
- Automated cleanup of stale items
- Compliance reporting on schedule

### 5.2 Blueprints: Templates as Code

**What:** Blueprints define complete Fabric environments as code (YAML/JSON).

```yaml
# contoso-analytics-blueprint.yaml
name: Contoso Analytics
version: 1.0
parameters:
  environment: [dev, staging, prod]
  
resources:
  workspaces:
    - name: "Contoso-${environment}-Analytics"
      capacity: F2
      
  items:
    - type: lakehouse
      name: "RawData"
      workspace: "Contoso-${environment}-Analytics"
      
    - type: warehouse
      name: "CuratedData"
      workspace: "Contoso-${environment}-Analytics"
      
  permissions:
    - workspace: "Contoso-${environment}-Analytics"
      role: Contributor
      principals: ["analytics-team@contoso.com"]
```

**Execution:**
```bash
fab blueprint apply --file contoso-analytics-blueprint.yaml --params environment=prod
```

---

## 6. The Code Execution Thesis

**Central Claim:** For complex and bulk operations, AI agents should generate code (CLI scripts) rather than make repeated tool calls.

### Industry Evidence

| Company | Investment | Key Quote |
|---------|------------|-----------|
| **Anthropic** | Code execution tool ($0.05/hr containers) | "Agents gain **'ground truth' from code execution**—not just LLM self-review." ([Source](https://docs.anthropic.com/en/docs/build-with-claude/tool-use/code-execution-tool)) |
| **Modal** | Sandboxes with sub-second startup | "CLI is the simplest, most universal tool you can hand an agent." ([Source](https://modal.com/blog/building-for-agent-devex)) |
| **E2B** | Firecracker microVMs for agent execution | Powers Perplexity's math agent, Manus's 27-tool agent ([Source](https://e2b.dev/)) |
| **LangGraph** | Code generation with self-correction | Uses `exec()` for real validation, not LLM review ([Source](https://langchain-ai.github.io/langgraph/tutorials/code_assistant/langgraph_code_assistant/)) |

### The Efficiency Argument

| Approach | 100-Item Update | Tokens Used | Cost Pattern |
|----------|-----------------|-------------|--------------|
| Individual tool calls | 100 API calls | ~50,000 | Scales linearly with N |
| Generate CLI script once | 1 script execution | ~2,000 | Fixed cost |

**Result:** ~96% token reduction for bulk operations.

---

## 7. Learning & Adoption

### Key Research Finding

> "Users **can** learn from AI-generated code, but learning is not automatic—it requires **intentional design**."  
> — Research synthesis from GitHub Copilot studies

### The "Explain Before Execute" Pattern

**Critical for trust and learning:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    EXPLAIN BEFORE EXECUTE                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   User: "Delete all reports older than 90 days from the archive workspace"  │
│                                                                             │
│   ─────────────────────────────────────────────────────────────────────     │
│                                                                             │
│   Copilot: "Here's what I'll do:                                            │
│                                                                             │
│   1. List all items in 'Archive' workspace                                  │
│   2. Filter to type 'report'                                                │
│   3. Filter to lastModified > 90 days ago                                   │
│   4. Delete each matching report                                            │
│                                                                             │
│   ⚠️  This will permanently delete 47 reports.                              │
│                                                                             │
│   CLI Script:                                                               │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │ fab item list -w 'Archive' -t report --modified-before 90d -o json │   │
│   │   | jq -r '.[].id' | xargs -I {} fab item delete -i {}             │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│   [Explain Each Step]  [Run in Dry-Run Mode]  [Execute]  [Cancel]          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Progressive Disclosure

| Stage | User Need | What We Show |
|-------|-----------|--------------|
| **Novice** | Just get it done | Natural language + [Run] button |
| **Curious** | Understand what happened | Expand to see CLI command |
| **Learning** | Learn the syntax | [Explain Each Step] breakdown |
| **Expert** | Full control | Direct CLI access, edit script |

### Adoption Barriers & Mitigations

| Barrier | % Users Citing | Mitigation |
|---------|----------------|------------|
| Steep learning curve | 45% | Copilot generates commands; user learns by seeing |
| Fear of mistakes | 35% | **Dry-run mode**, confirmation for destructive ops |
| Cryptic syntax | 38% | Human-readable `--help`, **"Explain this command"** feature |
| Lack of discoverability | 32% | "Copy as CLI" in GUI, contextual suggestions |
| Poor error messages | 28% | Human-readable errors with suggestions (see Section 11) |

*Source: Developer experience surveys, Research E*

---

## 8. Target Personas

### Primary CLI Users

Based on research, CLI users extend beyond developers:

| Persona | % of Target | CLI Importance | Primary Use Cases |
|---------|-------------|----------------|-------------------|
| **DevOps/Platform Engineers** | 25% | Critical | CI/CD pipelines, infrastructure automation |
| **Data Engineers** | 30% | High | Pipeline automation, bulk data operations |
| **Power Users/Admins** | 20% | High | Tenant management, bulk permissions |
| **Developers** | 15% | Medium-High | Build/deploy workflows |
| **AI Agents (via Copilot)** | 10% | Critical | Automated execution |

*Source: Stack Overflow 2024, internal research*

### Acquisition Strategy

| User Segment | How They Find CLI | How We Help |
|--------------|-------------------|-------------|
| **Azure CLI users** (27.8% of developers) | Already use `az` commands | Similar patterns, `az` credential integration |
| **Docker/K8s users** (54-63%) | Comfortable with CLI patterns | Familiar UX, scriptable outputs |
| **Databricks/Snowflake migrants** | Expect CLI parity | Feature parity, migration guides |

### Citizen Developers: The Copilot Bridge

Citizen developers show low direct CLI adoption. **Copilot generates CLI for them.**

```
Citizen Developer: "Export all sales reports to my OneDrive"
                           │
                           ▼
Copilot: Generates CLI script with explanation
                           │
                           ▼
Citizen Developer: Clicks [Run] — never types CLI syntax
```

---

## 9. Accessibility

### Commitment

Microsoft's accessibility standards apply to all Fabric experiences, including CLI-in-portal.

### Accessibility Requirements

| Requirement | Implementation | Priority |
|-------------|----------------|----------|
| **Screen reader support** | Terminal output announced properly; ARIA labels for all controls | P0 |
| **Keyboard navigation** | Full keyboard access to terminal and all buttons | P0 |
| **High contrast mode** | Terminal colors adapt to Windows high contrast themes | P0 |
| **Motor accessibility** | Copilot natural language reduces need for precise typing | P1 |
| **Color-blind safe** | Status indicators use shapes + colors, not color alone | P1 |
| **Reduced motion** | Respect prefers-reduced-motion for terminal animations | P2 |

### Accessibility Advantage of Copilot + CLI

For users with motor impairments:
- **Before:** Type long CLI commands precisely
- **After:** Describe intent in natural language; Copilot generates command

For users with visual impairments:
- **Before:** Read dense terminal output
- **After:** Ask Copilot to summarize results in natural language

---

## 10. Security & Compliance

### Security Model

Based on AWS/Azure/GCP CloudShell patterns:

| Requirement | Implementation | Priority |
|-------------|----------------|----------|
| **Identity inheritance** | Use Fabric/Entra ID from session | P0 |
| **RBAC enforcement** | Workspace permissions apply to CLI | P0 |
| **Audit logging** | Log all commands with user identity, timestamp, result | P0 |
| **Sandbox isolation** | Container per execution, no cross-user access | P0 |
| **Service principal support** | For CI/CD (no interactive credentials) | P0 |
| **Network isolation** | Outbound only, configurable allowlist | P1 |

### Enterprise Governance

| Feature | Description | Priority |
|---------|-------------|----------|
| **Dry-run mode** | Preview changes before apply | P0 |
| **Confirmation prompts** | Require confirmation for destructive operations | P0 |
| Approval workflows | Require sign-off for production scripts | P2 |
| Command allowlist | Enterprise-configurable restrictions | P2 |
| Session recording | Full audit trail for compliance | P2 |
| **PIM integration** | Just-in-time access for sensitive operations | P2 |

### Compliance Frameworks

| Framework | Relevant Controls | CLI Alignment |
|-----------|-------------------|---------------|
| **SOC 2** | CC6.1 (access control), CC6.6 (logging) | ✅ RBAC + audit logging |
| **ISO 27001** | A.9 (access), A.12 (operations) | ✅ Identity + sandbox |
| **GDPR** | Access logging, data handling | ✅ Full audit trail |

---

## 11. Error Handling & Trust

### Why This Matters

> "Fear of mistakes" is cited by **35% of users** as a barrier to CLI adoption.  
> — Research E

### Human-Readable Errors

**Bad (current pattern):**
```
Error: FABRIC_ERR_4523
```

**Good (target pattern):**
```
Error: Cannot delete workspace "Production"

Reason: Workspace contains 23 items. Delete or move items first.

Suggestion: Run `fab item list -w "Production"` to see items,
           or use `fab workspace delete -w "Production" --force`
           to delete workspace and all contents.

Documentation: https://docs.fabric.microsoft.com/cli/workspace-delete
```

### Error Experience Principles

| Principle | Implementation |
|-----------|----------------|
| **Say what went wrong** | Human-readable explanation, not error codes |
| **Say why** | Root cause when detectable |
| **Say how to fix** | Concrete next steps |
| **Link to docs** | Deep link to relevant documentation |
| **Suggest alternatives** | "Did you mean...?" when appropriate |

### Dry-Run Mode

For destructive operations, always offer preview:

```bash
$ fab item delete --workspace "Production" --older-than 90d --dry-run

DRY RUN - No changes will be made

Would delete 47 items:
  - Report: Q1 Sales Analysis (last modified: 2025-08-15)
  - Report: Q2 Inventory Review (last modified: 2025-07-22)
  ... (45 more)

Run without --dry-run to execute.
```

---

## 12. Business Case

### ROI Evidence

**DORA Research Findings:**

| Metric | Elite Performers | Low Performers | Difference |
|--------|------------------|----------------|------------|
| Deployment frequency | Multiple/day | Monthly | 100x |
| Lead time for changes | < 1 hour | 1-6 months | 1000x |
| Change failure rate | 0-15% | 46-60% | 3-4x better |

> "Elite performers automate most of their deployment pipeline. **Manual processes are the #1 predictor of low performance.**"  
> — [DORA State of DevOps](https://dora.dev/research/)

### Time Savings

| Task | Manual (GUI) | Automated (CLI) | Savings |
|------|--------------|-----------------|---------|
| Deploy 100 items | 3+ hours | 2 minutes | 99% |
| Export workspace | 15 minutes | 30 seconds | 97% |
| Create 10 workspaces | 30 minutes | 1 minute | 97% |
| Bulk permission update | 1 hour | 2 minutes | 97% |
| Weekly audit report | 2 hours | 0 (automated) | 100% |

### ROI Calculation Example

**Scenario:** Enterprise managing 500 workspaces

| Item | Before CLI | After CLI | Annual Savings |
|------|------------|-----------|----------------|
| Routine updates | 4 hrs/week | 30 min/week | 182 hours |
| Error rework | 5% rate | <1% rate | 40 hours |
| At $100/hr loaded | $20,000 | $2,500 | **$17,500** |
| Compliance reporting | 4 hrs/week | Automated | 208 hours |

**3-year ROI:** >500%

---

## 13. Competitive Differentiation

### What Competitors Have

| Capability | Databricks | Snowflake | BigQuery | Fabric (Today) |
|------------|------------|-----------|----------|----------------|
| Mature CLI | ✅ | ✅ | ✅ | ⚠️ Preview |
| CLI in web portal | ⚠️ Limited | ❌ | ✅ | ❌ |
| AI Copilot | ⚠️ Basic | ❌ | ⚠️ Duet AI | ✅ Strong |
| Copilot generates CLI | ❌ | ❌ | ❌ | ❌ (planned) |
| MCP integration | ❌ | ❌ | ❌ | ❌ (planned) |
| CLI Script Items | ❌ | ❌ | ❌ | ❌ (planned) |
| Blueprints as code | ⚠️ Terraform | ⚠️ Terraform | ⚠️ Terraform | ❌ (planned) |

### What Makes Fabric Different (With This Vision)

| Differentiator | Description | Competitor Gap |
|----------------|-------------|----------------|
| **Copilot + CLI integration** | Natural language → CLI → Execution | No competitor offers this end-to-end |
| **MCP for agents** | Third-party AI agents can automate Fabric | No competitor has MCP servers |
| **CLI Script Items** | First-class automation artifacts | Competitors rely on external schedulers |
| **Explain-before-execute** | AI explains what CLI will do | No competitor offers this UX |
| **Single platform** | BI + Data + AI + Automation unified | Competitors are point solutions |

### The Winning Combination

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                   FABRIC'S DIFFERENTIATED STACK                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                        COPILOT                                      │   │
│   │            (Natural language understanding)                         │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                              +                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                          MCP                                        │   │
│   │              (Agent tool protocol)                                  │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                              +                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                          CLI                                        │   │
│   │           (Deterministic execution)                                 │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                              +                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                   CLI SCRIPT ITEMS                                  │   │
│   │            (Scheduled automation)                                   │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                              =                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │         END-TO-END AI-POWERED AUTOMATION                            │   │
│   │                                                                     │   │
│   │   "Describe what you want → AI generates script → Runs on schedule" │   │
│   │                                                                     │   │
│   │          NO COMPETITOR OFFERS THIS TODAY                            │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 14. Partner & ISV Opportunity

### What This Enables for Partners

| Opportunity | Description | Example |
|-------------|-------------|---------|
| **Custom CLI extensions** | Partners add commands for their solutions | `fab partner-tool sync --source ...` |
| **MCP servers** | Partners expose their tools to AI agents | Third-party data connectors as MCP tools |
| **Blueprint templates** | Partners publish pre-built environments | "Contoso Analytics Starter Kit" blueprint |
| **Managed automation services** | Partners offer CLI-based managed services | "We manage your Fabric automation" |

### ISV Integration Pattern

```yaml
# partner-extension.yaml
name: Contoso Data Connector
version: 1.0
commands:
  - name: contoso-sync
    description: Sync data from Contoso system
    parameters:
      - name: source
        type: string
        required: true
```

### Partner Program Considerations

| Question | Consideration |
|----------|---------------|
| **Certification** | How do we certify partner extensions for quality/security? |
| **Marketplace** | Do we host a marketplace for CLI extensions? |
| **Revenue share** | Is there a business model for paid extensions? |
| **Support** | Who supports partner extensions? |

*These questions need resolution by Partner Team in 2027 planning.*

---

## 15. Success Metrics

### How We Know We've Succeeded

| Metric | Current | 12-Month Target | 24-Month Target |
|--------|---------|-----------------|-----------------|
| **CLI MAU** | 1,400 | 10,000 | 50,000 |
| **DAU/MAU Ratio** | 35% | 40% | 45% |
| **CLI in Portal adoption** | N/A | 5,000 users | 25,000 users |
| **CLI Script Items created** | N/A | 1,000 | 10,000 |
| **Copilot CLI generations** | N/A | 50,000/month | 500,000/month |
| **MCP tool calls** | N/A | 100,000/month | 1M/month |

### Qualitative Success Indicators

| Indicator | How We Measure |
|-----------|----------------|
| **Pro-dev satisfaction** | NPS for CLI users >50 |
| **Reduced support tickets** | CLI-related tickets decrease YoY |
| **Community engagement** | Active contributors to CLI extensions |
| **Competitive wins** | Win rate vs. Databricks/Snowflake improves |
| **Customer stories** | 3+ public case studies using CLI automation |

### Leading Indicators (Track Weekly)

| Indicator | What It Tells Us |
|-----------|------------------|
| CLI downloads trend | Awareness and trial |
| Error rate in CLI | Quality and trust |
| Copilot→CLI conversion | AI integration working |
| Script save rate | Users finding value |

---

## 16. Risks & Mitigations

| Risk | Severity | Mitigation |
|------|----------|------------|
| **Security breach via CLI execution** | High | Sandbox isolation, RBAC, audit logging, network isolation |
| **Token consumption in Remote MCP** | Medium | Limit to 10-15 tools, use code execution pattern, tool annotations |
| **CLI becomes bottleneck** | Medium | Clear API versioning, backwards compatibility, fallback to API |
| **Community script quality** | Medium | Curation, ratings, security scanning, Microsoft-verified badge |
| **Fragmented UX** | Medium | "Copy as CLI" pattern, consistent concepts, clear guidance |
| **Alienating citizen developers** | Low | Copilot bridge—generate CLI from natural language |
| **Learning curve too steep** | Medium | Explain-before-execute, progressive disclosure, tutorials |
| **Errors erode trust** | Medium | Human-readable errors, dry-run mode, recovery guidance |
| **Accessibility gaps** | Medium | Accessibility review, screen reader testing, keyboard nav |

---

## 17. Versioning & Compatibility

### Versioning Strategy

| Aspect | Approach |
|--------|----------|
| **Semantic versioning** | `MAJOR.MINOR.PATCH` (e.g., `1.2.3`) |
| **Breaking changes** | Major version only; 6-month deprecation notice |
| **API stability** | Commands in GA are stable; preview commands may change |
| **CLI Script Items** | Pin to CLI version; warn on version mismatch |

### Compatibility Guarantees

| Guarantee | Description |
|-----------|-------------|
| **12-month support** | Each major version supported for 12 months after next major release |
| **Deprecation warnings** | 90-day warning before removing commands |
| **Migration guides** | Published for each major version upgrade |
| **Version pinning** | CLI Script Items can pin to specific CLI version |

### Breaking Change Policy

```
1. Announce in release notes
2. Add deprecation warning in CLI output
3. Maintain old behavior for 6 months
4. Remove in next major version
5. Provide migration script where possible
```

---

## 18. Roadmap

### Phase 1: Foundation (Current → H1 2026)

| Deliverable | Status | Owner | Priority |
|-------------|--------|-------|----------|
| CLI GA with core operations | In progress | CLI Team | P0 |
| Azure CLI credential integration | Planned | CLI Team | P0 |
| JSON output for all commands | Planned | CLI Team | P0 |
| **Dry-run mode** | Planned | CLI Team | P0 |
| **Human-readable errors** | Planned | CLI Team | P0 |
| Python bindings/SDK | Evaluating | CLI Team | P1 |

### Phase 2: Platform Integration (H1-H2 2026)

| Deliverable | Target | Owner | Priority |
|-------------|--------|-------|----------|
| **CLI in Portal** | Q2 2026 | Portal Team | P0 |
| **"Explain this command"** | Q2 2026 | Portal + Copilot | P0 |
| Local MCP server (preview) | Q2 2026 | MCP Team | P0 |
| Remote MCP server (preview) | Q2 2026 | MCP Team | P0 |
| Copilot CLI generation | Q2 2026 | Copilot Team | P0 |
| **CLI Script Item** (preview) | Q3 2026 | Platform Team | P1 |
| Safe Paste | Q3 2026 | Portal Team | P1 |
| Accessibility review | Q2 2026 | Accessibility Team | P0 |

### Phase 3: Ecosystem (H2 2026+)

| Deliverable | Target | Owner |
|-------------|--------|-------|
| Blueprint execution | Q4 2026 | Platform Team |
| CLI Script Item (GA) | Q4 2026 | Platform Team |
| Third-party agent integration | Q1 2027 | Partner Team |
| Community script marketplace | 2027 | Ecosystem Team |
| CLI tutorials & challenges | 2027 | Education Team |
| Partner extension certification | 2027 | Partner Team |

---

## Appendix A: Research Sources

### Primary Sources

| Category | Key Sources |
|----------|-------------|
| **AI Agents & Code Execution** | [Anthropic Building Effective Agents](https://www.anthropic.com/research/building-effective-agents), [Anthropic Code Execution Tool](https://docs.anthropic.com/en/docs/build-with-claude/tool-use/code-execution-tool), [Modal Agent DevEx](https://modal.com/blog/building-for-agent-devex), [E2B](https://e2b.dev/), [LangGraph](https://langchain-ai.github.io/langgraph/) |
| **CLI in Portals** | [AWS CloudShell](https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html), [Google Cloud Shell](https://cloud.google.com/shell/docs), [Azure Cloud Shell](https://learn.microsoft.com/en-us/azure/cloud-shell/overview) |
| **Developer Surveys** | [Stack Overflow 2024](https://survey.stackoverflow.co/2024/), [JetBrains 2023](https://www.jetbrains.com/lp/devecosystem-2023/) |
| **MCP Protocol** | [MCP Official](https://modelcontextprotocol.io/), [MCP Servers](https://github.com/modelcontextprotocol/servers), [HN Discussion](https://news.ycombinator.com/item?id=44026539) |
| **Learning & Adoption** | [GitHub Copilot Research](https://github.blog/news-insights/research/), [Warp Terminal](https://www.warp.dev/), [tldr pages](https://tldr.sh/) |
| **DevOps ROI** | [DORA Research](https://dora.dev/research/) |

### Internal Data

| Data Point | Value | Source |
|------------|-------|--------|
| CLI Downloads | 190,000 | Telemetry |
| Monthly Active Users | ~1,400 | Telemetry |
| Active Tenants | ~1,000 | Telemetry |
| DAU/MAU Ratio | 35% | Telemetry |
| CLI pre-installed in notebooks | Yes | Engineering |
| CLI execution overhead in Spark | ~2-3 seconds | Engineering |

---

## Appendix B: Future Opportunities

These opportunities were identified in research but are not in the current roadmap:

| Opportunity | Value | Consider For |
|-------------|-------|--------------|
| **Visual Script Builder** | Drag-and-drop generates CLI; bridges citizen devs to code | 2027+ |
| **Collaborative CLI Sessions** | Pair programming for CLI, expert-assisted troubleshooting | 2027+ |
| **CLI Telemetry Dashboard** | Personal usage analytics, command suggestions | 2027+ |
| **Voice-Activated CLI** | Accessibility enhancement, hands-free operation | 2027+ |
| **CLI for Data Operations** | Query execution, data preview (not just admin) | Phase 3 |
| **CLI Challenges/Gamification** | Badges, progression, skill building | 2027+ |

---

## Appendix C: Scoping Decisions

### Explicitly Out of Scope (This Phase)

| Topic | Decision | Rationale |
|-------|----------|-----------|
| **Mobile CLI** | Out of scope for Phase 1-2 | Focus on desktop first; Remote MCP enables mobile later via Copilot |
| **Offline/Air-gapped** | Limited support | Enterprise ask, but low volume; revisit based on demand |
| **Multi-language CLI** | Python SDK in Phase 1; others later | Python covers 80%+ of data engineers |

### Open Questions for Future

| Question | Owner | Timeline |
|----------|-------|----------|
| CLI pricing for Script Items | Finance | Phase 2 |
| Community marketplace business model | Ecosystem | 2027 |
| ISV extension certification | Partner | 2027 |

---

## Key Takeaways

1. **This is bigger than CLI** — It's about AI-powered automation and pro-developer experience in Fabric
2. **Three transformations** — Pro-dev experience + AI-powered platform + Automation democratization
3. **Copilot needs CLI** — MCP gives Copilot tools; CLI gives it reliable execution
4. **Code execution > tool calling** — Industry consensus for complex operations
5. **CLI-in-portal is table stakes** — All cloud platforms have it
6. **Explain before execute** — Critical for trust and learning
7. **Error handling builds trust** — Human-readable errors, dry-run mode, recovery guidance
8. **35% DAU/MAU proves product-market fit** — Users who adopt CLI, stay
9. **No competitor has this combination** — Copilot + MCP + CLI + Script Items is unique
10. **Clear asks for Kim** — Strategic alignment, resourcing, cross-team coordination

---

## What We Need From Kim

| Ask | Why | When |
|-----|-----|------|
| **Strategic alignment** | Confirm CLI as platform infrastructure priority | This meeting |
| **2 engineers** | CLI Script Item development | Q1 2026 |
| **Cross-team sync** | Portal + Copilot + MCP alignment | Q1 2026 |
| **Investment approval** | Remote MCP infrastructure budget | Q2 2026 |
| **Accessibility review slot** | Ensure we meet Microsoft standards | Q2 2026 |

---

*Document prepared for Kim Manis 1:1 on December 11, 2025*  
*Topic: "AI-Powered Automation: MCPs and CLI in Fabric"*
