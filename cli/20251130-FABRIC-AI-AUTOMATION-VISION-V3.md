# AI-Powered Automation & Pro-Developer Experience in Fabric
## Vision V3: CLI, MCP, and the Future of Fabric Automation

**Version:** 3.0  
**Date:** November 30, 2025  
**Author:** Hasan Abo-Shally, Principal PM, Fabric Platform  
**Status:** Strategic Vision Document (Research-Backed)

---

## Executive Summary

Microsoft Fabric is evolving to serve two interconnected needs:

1. **Meet pro-developers where they are** — Terminal at the bottom, Copilot on the side, Git in the workflow
2. **Give AI agents real power to act** — MCP + CLI = Copilot that executes, not just advises

This vision describes how **CLI, MCP, and automation infrastructure** work together to create a platform where:
- Developers feel at home
- Copilot becomes genuinely useful for complex operations
- Expertise captured once runs forever as automation

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

### Why This Matters Now

| Industry Signal | Evidence | Fabric Opportunity |
|-----------------|----------|-------------------|
| **Developers expect CLI** | AWS, GCP, Azure all have CloudShell; Databricks, Snowflake have mature CLIs | Table stakes for pro-dev adoption |
| **Agents need code execution** | Anthropic, Modal, E2B investing heavily ([source](https://www.anthropic.com/research/building-effective-agents)) | CLI as agent's "hands" |
| **Automation drives elite performance** | DORA: Elite performers deploy 100x faster ([source](https://dora.dev/research/)) | CLI enables CI/CD pipelines |
| **AI-assisted terminals emerging** | Warp (1M+ users), GitHub Copilot CLI ([source](https://www.warp.dev/)) | Copilot + CLI is differentiated |

### Current State

| Metric | Value | Interpretation |
|--------|-------|----------------|
| CLI Downloads | 190,000 | Broad trial interest |
| Monthly Active Users | ~1,400 | Core power user base |
| Active Tenants | ~1,000 | Enterprise adoption beginning |
| **DAU/MAU Ratio** | **35%** | **Exceptional stickiness**—those who adopt, stay |

*Source: Internal telemetry, November 2025*

---

## Table of Contents

1. [The Bigger Picture](#1-the-bigger-picture)
2. [Pro-Developer Experience](#2-pro-developer-experience)
3. [AI-Powered Platform (MCP + CLI)](#3-ai-powered-platform-mcp--cli)
4. [Automation Infrastructure](#4-automation-infrastructure)
5. [The Code Execution Thesis](#5-the-code-execution-thesis)
6. [Learning & Adoption](#6-learning--adoption)
7. [Target Personas](#7-target-personas)
8. [Security & Compliance](#8-security--compliance)
9. [Error Handling & Trust](#9-error-handling--trust)
10. [Business Case](#10-business-case)
11. [Risks & Mitigations](#11-risks--mitigations)
12. [Roadmap](#12-roadmap)
13. [Appendix A: Research Sources](#appendix-a-research-sources)
14. [Appendix B: Future Opportunities](#appendix-b-future-opportunities)
15. [Appendix C: Scoping Decisions](#appendix-c-scoping-decisions)

---

## 1. The Bigger Picture

### What Are We Really Building?

This vision is about more than CLI. It's about **five interconnected capabilities**:

| Capability | What It Enables | Why It Matters |
|------------|-----------------|----------------|
| **Platform Extensibility** | CLI + MCP + Blueprints = third parties build on Fabric | Ecosystem growth |
| **Closing the "Last Mile"** | Copilot understands intent; CLI executes—no gap | From "I want" to "it's done" |
| **Developer-Led Adoption** | Devs adopt tools bottom-up; CLI makes Fabric adoptable | Land & expand in enterprises |
| **Composability** | Small CLI commands compose into complex workflows | Unix philosophy in Fabric |
| **Persona Bridging** | Same infrastructure serves citizen devs (via Copilot) and pros (via CLI) | One platform, all users |

### The Complete Picture

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

## 2. Pro-Developer Experience

### The Goal: Fabric Feels Familiar

Pro-developers have expectations shaped by modern tools. Fabric must meet them:

| Developer Expectation | Current State | Target State |
|----------------------|---------------|--------------|
| **Terminal access** | Install CLI locally | CLI in portal, pre-authenticated |
| **AI assistance** | Copilot in portal | Copilot everywhere (portal, VS Code, CLI) |
| **Version control** | Manual export | Git integration, Blueprints as code |
| **Automation** | Manual or external | Native CLI Script Items |

### 2.1 CLI in Portal

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

### 2.2 The Developer Workflow

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

### 2.3 Git Integration & Blueprints

**Why This Matters:** Pro-developers expect version control for everything.

| Feature | Description | Priority |
|---------|-------------|----------|
| CLI scripts in Git | Auto-commit CLI Script Items | P1 |
| Blueprint as code | YAML/JSON definitions version-controlled | P1 |
| PR workflows | Review automation changes before deployment | P2 |
| Diff viewer | See what changed in script revisions | P2 |

---

## 3. AI-Powered Platform (MCP + CLI)

### The Core Insight

Today's Copilot can advise. Tomorrow's Copilot must **act**.

The Model Context Protocol (MCP) gives AI agents tools. The Fabric CLI provides the **universal execution interface** for those tools.

### 3.1 Two MCP Architectures

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

### 3.2 MCP Design Principles

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

### 3.3 Why CLI for Agents?

> "Anyone who has used coding agents knows you need to give them tools, and **a CLI is the simplest, most universal tool you can hand an agent.**"  
> — [Modal Blog](https://modal.com/blog/building-for-agent-devex)

| Approach | For Single Operation | For 100 Operations |
|----------|---------------------|-------------------|
| Direct tool calls | ✅ Simple | ❌ 100 API calls, token explosion |
| CLI script generation | ✅ Simple | ✅ 1 script, 1 execution |

---

## 4. Automation Infrastructure

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

### 4.1 CLI Script Item

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

### 4.2 Notebook as Step One

Before CLI Script Items exist, users can run CLI from Notebooks:

```python
# In a Fabric Notebook
!fab item list --workspace "Production" --output json > items.json

# Or with Python SDK
from fabric_cli import FabricCLI
cli = FabricCLI()
items = cli.item.list(workspace="Production")
```

**Why This Works:**
- CLI is already pre-installed in Fabric notebooks
- ~2-3 second overhead (acceptable)
- Spark context provides execution environment

### 4.3 Blueprints: Templates as Code

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

**Benefits:**
- Repeatable across dev/staging/prod
- Version controlled (Git)
- Parameterizable
- CI/CD friendly
- Audit trail of what was created

---

## 5. The Code Execution Thesis

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

### Why "Ground Truth" Matters

```
Without execution:   LLM generates → LLM reviews → Still might be wrong

With execution:      LLM generates → Actually runs → Real success/failure
```

Anthropic's phrase "ground truth from the environment" captures this—code execution provides certainty that LLM self-review cannot.

---

## 6. Learning & Adoption

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
| Poor error messages | 28% | Human-readable errors with suggestions (see Section 9) |

*Source: Developer experience surveys, Research E*

### Learning Tools

| Tool | Description | Priority |
|------|-------------|----------|
| **Explain this command** | Paste any CLI command, get natural language explanation | P0 |
| **Safe Paste** | Warning before running multi-line pasted scripts | P1 |
| **CLI Tutorial mode** | Interactive guided tutorials in portal | P2 |
| **"How would I...?"** | Natural language to CLI with explanation | P1 |

---

## 7. Target Personas

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

Citizen developers (non-professional coders) show low direct CLI adoption due to:
- Perceived complexity
- Fear of mistakes
- Preference for GUI

**The Bridge:** Copilot generates CLI for them.

```
Citizen Developer: "Export all sales reports to my OneDrive"
                           │
                           ▼
Copilot: Generates CLI script with explanation
                           │
                           ▼
Citizen Developer: Clicks [Run] — never types CLI syntax
                           │
                           ▼
Over time: Starts recognizing patterns, eventually edits scripts
```

---

## 8. Security & Compliance

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

## 9. Error Handling & Trust

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

### Recovery Patterns

| Scenario | Recovery |
|----------|----------|
| Script fails mid-execution | Show what succeeded, what failed, what remains |
| Partial success in bulk operation | List successful items, failed items with reasons |
| Permission denied | Explain which permission is needed and how to get it |
| Network timeout | Suggest retry with `--retry` flag |

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

## 10. Business Case

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

### Competitive Necessity

| Competitor | CLI Maturity | Implication for Fabric |
|------------|--------------|------------------------|
| Databricks | Mature, full-featured | Must achieve parity |
| Snowflake | Mature (SnowSQL) | Must achieve parity |
| BigQuery | Mature (bq) | Must achieve parity |
| Azure Synapse | Limited | Fabric can differentiate |

**Risk:** Without mature CLI, Fabric loses DevOps-oriented customers.

**Opportunity:** CLI + Copilot + MCP is a differentiated combination no competitor offers.

---

## 11. Risks & Mitigations

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

---

## 12. Roadmap

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

### Phase 3: Ecosystem (H2 2026+)

| Deliverable | Target | Owner |
|-------------|--------|-------|
| Blueprint execution | Q4 2026 | Platform Team |
| CLI Script Item (GA) | Q4 2026 | Platform Team |
| Third-party agent integration | Q1 2027 | Partner Team |
| Community script marketplace | 2027 | Ecosystem Team |
| CLI tutorials & challenges | 2027 | Education Team |

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

---

*Document prepared for Kim Manis 1:1 on December 11, 2025*  
*Topic: "AI-Powered Automation: MCPs and CLI in Fabric"*
