# Fabric CLI Vision V2
## CLI as Platform Infrastructure for the AI Age

**Version:** 2.0  
**Date:** November 30, 2025  
**Author:** Hasan Abo-Shally, Principal PM, Fabric Platform  
**Status:** Strategic Vision Document (Research-Backed)

---

## Executive Summary

The Fabric CLI is not just a developer tool—it is **platform infrastructure** that enables three critical capabilities:

1. **Human Automation** — Power users manage Fabric at scale
2. **AI Agent Execution** — Copilot and third-party agents operate through CLI
3. **Scheduled Workflows** — CLI scripts run as first-class Fabric items

This vision repositions CLI from a niche developer tool to the **execution layer that bridges human intent and platform action**, whether that intent comes from a user typing commands, a Copilot generating scripts, or a scheduled automation.

### Why Now?

| Industry Trend | Evidence | Fabric Opportunity |
|----------------|----------|-------------------|
| **Agents writing code** | Anthropic, Modal, E2B investing in sandboxed code execution ([source](https://www.anthropic.com/research/building-effective-agents)) | CLI as the "universal tool" for agents |
| **CLI in browser is table stakes** | AWS, GCP, Azure all have CloudShell ([source](https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html)) | CLI in Fabric portal expected |
| **DevOps automation ROI** | DORA: Elite performers 100x faster deployments ([source](https://dora.dev/research/)) | CLI enables pipeline automation |
| **AI-assisted terminals** | Warp (1M+ users), GitHub Copilot CLI gaining traction ([source](https://www.warp.dev/)) | Copilot + CLI is differentiated |

### Current Metrics

| Metric | Value | Interpretation |
|--------|-------|----------------|
| Downloads | 190,000 | Broad trial interest |
| Monthly Active Users | ~1,400 | Core power user base |
| Active Tenants | ~1,000 | Enterprise adoption beginning |
| **DAU/MAU Ratio** | **35%** | **Exceptional stickiness**—users who adopt, stay |

*Source: Internal telemetry, November 2025*

---

## Table of Contents

1. [The Three Roles of CLI](#1-the-three-roles-of-cli)
2. [CLI vs. Copilot: Complementary, Not Competing](#2-cli-vs-copilot-complementary-not-competing)
3. [Strategic Components](#3-strategic-components)
   - [3.1 CLI in Portal](#31-cli-in-portal)
   - [3.2 Remote MCP (CLI for AI)](#32-remote-mcp-cli-for-ai)
   - [3.3 CLI Script Item](#33-cli-script-item)
   - [3.4 Blueprints with CLI](#34-blueprints-with-cli)
4. [The Code Execution Thesis](#4-the-code-execution-thesis)
5. [Target Personas](#5-target-personas)
6. [Security & Compliance](#6-security--compliance)
7. [Business Case](#7-business-case)
8. [Risks & Mitigations](#8-risks--mitigations)
9. [Roadmap Priorities](#9-roadmap-priorities)
10. [Appendix: Research Sources](#appendix-research-sources)

---

## 1. The Three Roles of CLI

The CLI serves three distinct but interconnected roles:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        FABRIC CLI ROLES                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ROLE 1: DIRECT INTERFACE                                              │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │  Power User ──► CLI ──► Fabric Platform                        │   │
│   │  "I type commands to get things done fast"                     │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│   ROLE 2: AI AGENT TOOL                                                 │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │  User ──► Copilot ──► Generates CLI Script ──► Execute         │   │
│   │  "AI translates my intent into CLI commands"                   │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│   ROLE 3: PLATFORM INFRASTRUCTURE                                       │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │  Scheduled Jobs ──► CLI Script Item ──► Fabric Platform        │   │
│   │  "CLI runs automatically on a schedule"                        │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Role 1: Direct Interface
Traditional CLI usage—power users type commands. Fast, scriptable, automatable.

**Evidence of demand:**
- 35% DAU/MAU ratio shows power users use CLI daily
- 25-34% of developers use Bash/Shell regularly ([Stack Overflow 2024](https://survey.stackoverflow.co/2024/))
- DevOps engineers cite CLI as "critical" for their work

### Role 2: AI Agent Tool
Copilot generates CLI scripts from natural language. Users who never learned CLI syntax can leverage its power.

**Industry validation:**
> "Anyone who has used coding agents knows you need to give them tools, and **a CLI is the simplest, most universal tool you can hand an agent.**"
> — [Modal Blog](https://modal.com/blog/building-for-agent-devex)

### Role 3: Platform Infrastructure
CLI scripts become first-class Fabric items that execute on schedule—no human in the loop.

**Why this matters:**
- Bridges gap from manual → automated
- Enables "recipes" that users save and share
- Creates path from exploration to production

---

## 2. CLI vs. Copilot: Complementary, Not Competing

A common misconception: "If we have Copilot, why do we need CLI?"

The answer: **Copilot needs CLI as its execution layer.**

### The Copilot-to-CLI Pipeline

```
┌────────────────────────────────────────────────────────────────────────┐
│                    COPILOT → CLI EXECUTION FLOW                        │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  User: "Move all reports from workspace A to workspace B"              │
│                           │                                            │
│                           ▼                                            │
│  ┌────────────────────────────────────────────────────────────┐        │
│  │  COPILOT                                                   │        │
│  │  • Understands natural language                            │        │
│  │  • Knows Fabric concepts                                   │        │
│  │  • Generates CLI script                                    │        │
│  └────────────────────────────────────────────────────────────┘        │
│                           │                                            │
│                           ▼                                            │
│  ┌────────────────────────────────────────────────────────────┐        │
│  │  CLI SCRIPT                                                │        │
│  │  items=$(fab item list -w "Workspace A" -t report -o json) │        │
│  │  for item in $items; do                                    │        │
│  │    fab item move -i $item -w "Workspace B"                 │        │
│  │  done                                                      │        │
│  └────────────────────────────────────────────────────────────┘        │
│                           │                                            │
│                           ▼                                            │
│  ┌────────────────────────────────────────────────────────────┐        │
│  │  EXECUTION                                                 │        │
│  │  • Deterministic (runs same way every time)                │        │
│  │  • Auditable (full command log)                            │        │
│  │  • Replayable (save script for later)                      │        │
│  │  • Scalable (handles 100+ items efficiently)               │        │
│  └────────────────────────────────────────────────────────────┘        │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### Why Not Just Use Direct API Calls?

| Approach | Pros | Cons |
|----------|------|------|
| **Copilot calls API directly** | Simple for single operations | Non-deterministic at scale; consumes tokens per operation |
| **Copilot generates CLI script** | Deterministic, auditable, replayable, scales to 1000s | Requires CLI infrastructure |

**Industry evidence:** Anthropic, Modal, and E2B all invest in code execution sandboxes because agents performing complex operations need to write and run code, not make endless individual tool calls.

> "For bulk operations (e.g., 'update 500 reports'), generate a CLI script once, then execute—don't use agent for each item."
> — Research synthesis

---

## 3. Strategic Components

### 3.1 CLI in Portal

**What:** Browser-based CLI embedded in Fabric portal—no local installation required.

**Industry precedent:** Every major cloud platform offers this:

| Platform | Feature | Key Innovation |
|----------|---------|----------------|
| AWS CloudShell | Bottom panel terminal | Safe Paste (security warning before multi-line paste) |
| Google Cloud Shell | Integrated terminal + editor | "Open in Cloud Shell" buttons in docs |
| Azure Cloud Shell | Bash or PowerShell choice | Mobile app access, AI IntelliSense |

*All three use the same UX pattern: header icon → click → bottom panel opens*

**Fabric CLI-in-Portal must-haves:**

| Feature | Priority | Rationale |
|---------|----------|-----------|
| Pre-authenticated | P0 | Inherit Fabric identity automatically |
| Pre-installed CLI | P0 | No setup required |
| Persistent home | P1 | Save scripts between sessions |
| Copilot integration | P1 | Natural language → CLI suggestions |
| "Copy as CLI" in GUI | P1 | Show CLI equivalent of UI actions |

**Why this matters:**
- Lowers barrier to entry (no pip install)
- Enables quick ad-hoc operations without leaving portal
- Natural discovery path from GUI to CLI

---

### 3.2 Remote MCP (CLI for AI)

**What:** Cloud-hosted MCP server that exposes CLI as tools for AI agents.

**Architecture:**

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         REMOTE MCP ARCHITECTURE                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ┌─────────────┐      ┌──────────────┐      ┌───────────────────────┐  │
│   │ AI Agent    │ ───► │ Remote MCP   │ ───► │ Sandboxed Execution   │  │
│   │ (Copilot,   │      │ Server       │      │ Environment           │  │
│   │  3rd party) │      │              │      │                       │  │
│   └─────────────┘      │ • Auth       │      │ • Spark context OR    │  │
│                        │ • Rate limit │      │ • Lightweight container│  │
│                        │ • Logging    │      │ • CLI pre-installed   │  │
│                        └──────────────┘      └───────────────────────┘  │
│                                                                         │
│   Key Features:                                                         │
│   ─────────────                                                         │
│   • Agents call CLI via MCP protocol                                    │
│   • No local installation required                                      │
│   • Execution is sandboxed and audited                                  │
│   • Supports both tool calls AND code execution                         │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Critical insight from research:** Keep MCP tool count low.

> "A single MCP server can consume 40%+ of context window with too many tools."
> — [Hacker News discussion](https://news.ycombinator.com/item?id=44026539)

**Recommendation:** Expose 10-15 high-value tools, not every CLI command:

| Tool Group | Example Tools | Purpose |
|------------|---------------|---------|
| Workspace ops | `list_workspaces`, `create_workspace` | Environment management |
| Item ops | `list_items`, `deploy_item`, `export_item` | Content management |
| Execution | `run_cli_script` | Code execution pattern |

**The code execution pattern is key:** Instead of exposing 100 individual tools, expose a `run_cli_script` tool that accepts a script. This:
- Reduces token consumption dramatically
- Enables complex multi-step operations
- Provides full audit trail

---

### 3.3 CLI Script Item

**What:** A new Fabric item type that stores and executes CLI scripts on a schedule.

**User journey:**

```
1. User writes CLI script (locally or in portal)
2. User saves as "CLI Script Item" in workspace
3. User configures schedule (daily, hourly, on-trigger)
4. Fabric executes script in secure sandbox
5. Results logged, notifications sent
```

**Why not just use Notebooks?**
| Dimension | Notebook | CLI Script Item |
|-----------|----------|-----------------|
| Startup time | 30-60 seconds (Spark) | ~2-3 seconds |
| Primary use | Data exploration | Platform automation |
| Complexity | Supports Python, SQL, etc. | Simple CLI commands |
| Cost | Higher (Spark compute) | Lower (lightweight container) |

**Target scenarios:**
- Daily export of reports to storage
- Weekly permission audit
- On-demand workspace provisioning
- Automated cleanup of old items

---

### 3.4 Blueprints with CLI

**What:** Blueprints are templates for creating Fabric environments. CLI is the natural execution mechanism.

```
Blueprint Definition (YAML/JSON)
       │
       ▼
fab blueprint apply --name "Contoso Analytics" --params env=prod
       │
       ▼
[Creates: 5 workspaces, 20 reports, 3 pipelines, configured permissions]
```

**Why CLI for Blueprints?**
- Repeatable across environments
- Version controlled (git-friendly)
- Parameterizable (`--params`)
- CI/CD integration

---

## 4. The Code Execution Thesis

**Central claim:** For complex and bulk operations, AI agents should generate code (CLI scripts) rather than make repeated tool calls.

### Industry Evidence

| Company | Investment | Quote/Evidence |
|---------|------------|----------------|
| **Anthropic** | Code execution tool ($0.05/hr containers) | "Agents gain 'ground truth' from code execution—not just LLM self-review." ([Source](https://docs.anthropic.com/en/docs/build-with-claude/tool-use/code-execution-tool)) |
| **Modal** | Sandboxes with sub-second startup | "CLI is the simplest, most universal tool you can hand an agent." ([Source](https://modal.com/blog/building-for-agent-devex)) |
| **E2B** | Firecracker microVMs for agent execution | Powers Perplexity's math agent, Manus's 27-tool agent ([Source](https://e2b.dev/)) |
| **LangGraph** | Code generation with self-correction | Uses `exec()` for real validation, not LLM review ([Source](https://langchain-ai.github.io/langgraph/tutorials/code_assistant/langgraph_code_assistant/)) |

### The Efficiency Argument

| Approach | 100-Item Update | Tokens Used | Cost Pattern |
|----------|-----------------|-------------|--------------|
| Individual tool calls | 100 API calls | ~50,000 | Scales linearly |
| Generate CLI script once | 1 script execution | ~2,000 | Fixed cost |

**Result:** ~96% token reduction for bulk operations.

### Why "Ground Truth" Matters

```
Without execution:   LLM generates → LLM reviews → Still might be wrong

With execution:      LLM generates → Actually runs → Real success/failure
```

Anthropic's phrase "ground truth from the environment" captures this—code execution provides certainty that LLM self-review cannot.

---

## 5. Target Personas

Based on research, CLI users extend beyond developers:

| Persona | % of Target Users | CLI Importance | Primary Use Cases |
|---------|------------------|----------------|-------------------|
| **DevOps/Platform Engineers** | 25% | Critical | CI/CD pipelines, infrastructure automation |
| **Data Engineers** | 30% | High | Pipeline automation, bulk data operations |
| **Power Users/Admins** | 20% | High | Tenant management, bulk permissions |
| **Developers** | 15% | Medium-High | Build/deploy workflows |
| **AI Agents (via Copilot)** | 10% | Critical | Automated execution |

*Source: Stack Overflow 2024, internal research*

### Citizen Developers: The Copilot Bridge

Citizen developers (non-professional coders) show low direct CLI adoption due to:
- Perceived complexity
- Fear of mistakes
- Preference for GUI

**Opportunity:** Copilot generates CLI for them. They describe intent in natural language; Copilot produces executable CLI commands. They get CLI power without learning CLI syntax.

---

## 6. Security & Compliance

### Security Model

Based on AWS/Azure/GCP CloudShell patterns:

| Requirement | Implementation | Priority |
|-------------|----------------|----------|
| **Identity inheritance** | Use Fabric/Entra ID from session | P0 |
| **RBAC enforcement** | Workspace permissions apply to CLI | P0 |
| **Audit logging** | Log all commands with user identity | P0 |
| **Sandbox isolation** | Container per execution | P0 |
| **Service principal support** | For CI/CD (no user credentials) | P0 |

### Enterprise Governance

| Feature | Description | Target |
|---------|-------------|--------|
| Dry-run mode | Preview changes before apply | P1 |
| Approval workflows | Require sign-off for destructive ops | P2 |
| Command allowlist | Enterprise-configurable restrictions | P2 |
| Session recording | Full audit trail for compliance | P2 |

### Compliance Frameworks

| Framework | Relevant Controls | CLI Alignment |
|-----------|-------------------|---------------|
| **SOC 2** | CC6.1 (access control), CC6.6 (logging) | ✅ RBAC + audit |
| **ISO 27001** | A.9 (access), A.12 (operations) | ✅ Identity + sandbox |

---

## 7. Business Case

### ROI Evidence

**DORA Research Findings:**
| Metric | Elite Performers | Low Performers | Difference |
|--------|------------------|----------------|------------|
| Deployment frequency | Multiple/day | Monthly | 100x |
| Lead time for changes | < 1 hour | 1-6 months | 1000x |
| Change failure rate | 0-15% | 46-60% | 3-4x better |

> "Elite performers automate most of their deployment pipeline. Manual processes are the #1 predictor of low performance."
> — [DORA State of DevOps](https://dora.dev/research/)

### Time Savings

| Task | Manual (GUI) | Automated (CLI) | Savings |
|------|--------------|-----------------|---------|
| Deploy 100 items | 3+ hours | 2 minutes | 99% |
| Export workspace | 15 minutes | 30 seconds | 97% |
| Create 10 workspaces | 30 minutes | 1 minute | 97% |
| Bulk permission update | 1 hour | 2 minutes | 97% |

### ROI Calculation Example

**Scenario:** Enterprise managing 500 workspaces

| Item | Before CLI | After CLI | Annual Savings |
|------|------------|-----------|----------------|
| Routine updates | 4 hrs/week | 30 min/week | 182 hours |
| Error rework | 5% rate | <1% rate | 40 hours |
| At $100/hr loaded | $20,000 | $2,500 | **$17,500** |

**3-year ROI:** ~500%

### Competitive Necessity

| Competitor | CLI Maturity | Implication for Fabric |
|------------|--------------|------------------------|
| Databricks | Mature, full-featured | Must achieve parity |
| Snowflake | Mature (SnowSQL) | Must achieve parity |
| BigQuery | Mature (bq) | Must achieve parity |

**Risk:** Without mature CLI, Fabric loses DevOps-oriented customers.

---

## 8. Risks & Mitigations

| Risk | Severity | Mitigation |
|------|----------|------------|
| **Security breach via CLI execution** | High | Sandbox isolation, RBAC enforcement, audit logging |
| **Token consumption in Remote MCP** | Medium | Limit to 10-15 tools, use code execution pattern |
| **CLI becomes bottleneck for releases** | Medium | Clear API versioning, backwards compatibility |
| **Community script quality concerns** | Medium | Curation, ratings, security scanning |
| **Fragmented UX (GUI vs CLI)** | Medium | "Copy as CLI" pattern, consistent concepts |
| **Alienating citizen developers** | Low | Copilot bridge—generate CLI from natural language |

---

## 9. Roadmap Priorities

### Phase 1: Foundation (Current → H1 2026)
| Deliverable | Status | Owner |
|-------------|--------|-------|
| CLI GA with core item operations | In progress | CLI Team |
| Azure CLI credential integration | Planned | CLI Team |
| JSON output for all commands | Planned | CLI Team |
| Dry-run mode for destructive ops | Planned | CLI Team |

### Phase 2: Platform Integration (H1-H2 2026)
| Deliverable | Target | Owner |
|-------------|--------|-------|
| CLI in Portal (embedded shell) | Q2 2026 | Portal Team |
| Remote MCP server (preview) | Q2 2026 | MCP Team |
| CLI Script Item (preview) | Q3 2026 | Platform Team |
| Copilot CLI generation | Q3 2026 | Copilot Team |

### Phase 3: Ecosystem (H2 2026+)
| Deliverable | Target | Owner |
|-------------|--------|-------|
| Blueprint execution via CLI | Q4 2026 | Platform Team |
| Community script marketplace | 2027 | Ecosystem Team |
| Third-party agent integration | 2027 | Partner Team |

---

## Appendix: Research Sources

### Primary Sources

| Category | Key Sources |
|----------|-------------|
| **AI Agents & Code Execution** | [Anthropic Building Effective Agents](https://www.anthropic.com/research/building-effective-agents), [Anthropic Code Execution Tool](https://docs.anthropic.com/en/docs/build-with-claude/tool-use/code-execution-tool), [Modal Agent DevEx](https://modal.com/blog/building-for-agent-devex), [E2B](https://e2b.dev/) |
| **CLI in Portals** | [AWS CloudShell](https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html), [Google Cloud Shell](https://cloud.google.com/shell/docs), [Azure Cloud Shell](https://learn.microsoft.com/en-us/azure/cloud-shell/overview) |
| **Developer Surveys** | [Stack Overflow 2024](https://survey.stackoverflow.co/2024/), [JetBrains 2023](https://www.jetbrains.com/lp/devecosystem-2023/) |
| **MCP Protocol** | [MCP Official](https://modelcontextprotocol.io/), [MCP Servers](https://github.com/modelcontextprotocol/servers) |
| **Learning & Adoption** | [GitHub Copilot Research](https://github.blog/news-insights/research/), [Warp Terminal](https://www.warp.dev/) |
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

## Key Takeaways

1. **CLI is platform infrastructure**, not just a developer tool
2. **Copilot needs CLI** as its execution layer for complex operations
3. **Code execution > tool calling** for bulk operations (industry consensus)
4. **CLI-in-portal is table stakes** (all major clouds have it)
5. **Remote MCP enables AI agents** to use CLI without local installation
6. **CLI Script Items bridge** from ad-hoc to scheduled automation
7. **35% DAU/MAU proves** power users who adopt CLI, stay

---

*Document prepared for Kim Manis 1:1 on December 11, 2025*  
*Topic: "AI-Powered Automation: MCPs and CLI in Fabric"*
