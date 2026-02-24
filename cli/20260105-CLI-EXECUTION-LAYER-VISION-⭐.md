# The CLI Is the New Runtime
## Why Fabric Needs an Execution Layer for the Agentic Era

**Author:** Hasan Abo-Shally, Principal PM, Fabric Platform  
**Date:** January 5, 2026  
**Audience:** Fabric Leadership  

---

## The Shift: AI Agents Need to *Do* Things — Not Just Talk

A fundamental architectural shift is happening in developer tooling: **AI agents are moving from "calling tools" to "writing and executing code."**

Anthropic and Cloudflare independently discovered the same thing: when AI agents interact with platforms through individual API/tool calls, they're slow, expensive, and fragile. When they instead **generate scripts** that compose multiple operations, they use **98.7% fewer tokens** and handle dramatically more complex tasks (Anthropic, "[Code Execution with MCP](https://www.anthropic.com/engineering/code-execution-with-mcp)," Nov 2025). Cloudflare's engineering team put it memorably:

> *"Making an LLM perform tasks with tool calling is like putting Shakespeare through a month-long class in Mandarin. But writing code? That's Shakespeare writing sonnets — it's what they were trained on."*  
> — Cloudflare, "[Code Mode](https://blog.cloudflare.com/code-mode/)," Sep 2025

The result: **every major platform is converging on the CLI as the execution layer for AI agents.** Not as a human interface — as an invisible runtime that agents generate code against.

| Platform | What They're Doing | 
|----------|-------------------|
| **GitHub Copilot CLI** | Full agentic CLI with MCP support, custom agents, memory. Default for millions of developers |
| **Claude Code** | Terminal-first AI agent — **5.17M weekly npm downloads** as of Jul 2025. Lives in the CLI |
| **Amazon Q CLI** | AI chat in terminal, autocomplete, agent mode for AWS operations |
| **Azure** | Copilot in Azure generates CLI scripts; Cloud Shell in portal |
| **Vercel** | Built `vercel mcp` directly into the CLI — MCP is a first-class command |
| **Cloudflare (Wrangler)** | Pioneered "Code Mode" — converts tool schemas into TypeScript APIs for agents |
| **All major clouds** | AWS CloudShell, Azure Cloud Shell, Google Cloud Shell — all GA, all embedded in portal |

**Fabric does not yet have this.** Our CLI (1.4K MAU, growing 17% MoM) is a solid automation tool, but it is not yet positioned as an execution layer for AI agents.

---

## The Thesis: CLI as the Execution Substrate for Fabric

The Fabric CLI should evolve from a human productivity tool into **the universal execution layer** — the runtime through which humans, copilots, and autonomous agents all operate on Fabric.

**Why the CLI — and not just APIs?**

| Capability | Raw APIs | CLI as Execution Layer |
|-----------|----------|----------------------|
| **Composability** | Stateless calls requiring the caller to manage state | Chained operations, variables, loops, conditionals — complex workflows in a script |
| **AI efficiency** | Each tool call costs inference tokens; agents must re-reason for every step | Agent generates a script *once*, executes forever — **98.7% cheaper** (Anthropic) |
| **Gap coverage** | Only what's been built as an API endpoint | CLI can compose multiple APIs, access OneLake files, manipulate definitions, bridge gaps |
| **File system access** | No | Yes — read/write files, upload/download data, manipulate item definitions locally |
| **Auditability** | Log entries scattered across API calls | Script = artifact: reviewable, diffable, version-controlled, replayed |
| **Reusability** | Agent must re-reason every time | Script saved → runs on schedule → no AI cost for repeat execution |
| **Package ecosystem** | None | CLI runtime can leverage packages, libraries, and extensions for richer capabilities |

The key insight: **a CLI runtime gives AI more power than APIs alone.** With a runtime, an agent can access the file system, install packages, chain operations, apply conditional logic, manipulate item definition files, and do things that individual API calls simply cannot express. This is why every major platform is building this layer.

---

## What This Unlocks for Fabric

### 1. Copilot Generates Scripts, Not Just Answers
When a user says *"Set up a dev workspace for my new team member,"* Copilot generates a 30-line CLI script that creates the workspace, copies templates, rebinds connections, sets permissions. The user reviews and executes. The script gets saved, shared, scheduled. *(See our [CLI Vision doc](cli/20251130-FABRIC-CLI-VISION-V6-⭐.md) for detailed scenarios.)*

### 2. External Agents Operate Fabric Headlessly
GitHub Copilot, Claude Code, or a custom autonomous agent connects to Fabric's MCP server, discovers available operations, and generates CLI scripts to execute complex workflows — provisioning, deployment, monitoring, governance — without any human in the loop.

### 3. The Long Tail of Automation Gets Unlocked
The 80% of tasks that were never worth scripting — dev environment setup, demo prep, investigations, bulk cleanup — become automatable because AI drops the cost from "hours of scripting" to "describe what you want." ([Industry evidence](https://www.anthropic.com/engineering/code-execution-with-mcp): agents writing code handle tasks that individual tool calls cannot express.)

### 4. CLI Bridges API Gaps
Fabric's API surface is incomplete. Many portal operations have no API equivalent. The CLI, as a composition layer, can bridge these gaps — combining multiple API calls, accessing OneLake directly, manipulating item definition files — giving agents capabilities that go beyond what any single API provides.

### 5. The Platform Stays Relevant in an AI-Mediated World
As users shift from portal-clicking to describing intent, platforms that only live behind a browser are at risk. The CLI ensures Fabric's capabilities are accessible from *any* surface — terminal, IDE, CI/CD, agent framework, browser shell, notebook.

---

## The Architecture: Three Modes, One Runtime

```
                    HOW FABRIC GETS OPERATED
    ─────────────────────────────────────────────────────

    Human in terminal        Copilot + Human         Autonomous Agent
    ┌──────────────┐      ┌──────────────────┐     ┌──────────────┐
    │  fab ls      │      │ "Set up dev env  │     │ Agent detects│
    │  fab cp ...  │      │  for Alex"       │     │ failed job,  │
    │  fab run ... │      │        │         │     │ investigates │
    └──────┬───────┘      │   Copilot        │     └──────┬───────┘
           │              │   generates      │            │
           │              │   CLI script     │     Agent generates
           │              │        │         │     CLI script
           │              │   User reviews   │            │
           │              │   & executes     │            │
           │              └────────┬─────────┘            │
           │                       │                      │
           ▼                       ▼                      ▼
    ┌─────────────────────────────────────────────────────────┐
    │              FABRIC CLI — EXECUTION LAYER               │
    │                                                         │
    │  Authenticated · Sandboxed · Auditable · Composable     │
    │  Covers full API surface + OneLake + definitions        │
    │  File-system metaphor: ls, cd, cp, rm, run ...          │
    └─────────────────────────┬───────────────────────────────┘
                              │
                              ▼
    ┌─────────────────────────────────────────────────────────┐
    │         FABRIC PLATFORM (APIs, OneLake, Services)       │
    └─────────────────────────────────────────────────────────┘
```

All three modes converge on the same runtime. This means:
- Every capability built once serves all three modes
- Every script written by a human is reusable by an agent (and vice versa)
- Governance, identity, and audit trails are uniform

---

## The Industry Is Moving Fast — We Need Urgency

### The Risk of Inaction

**Fabric's SaaS portal model is under pressure.** As AI agents become the primary way users interact with platforms, those platforms need to be *callable* — not just *visitable*. Competitors are already there:

- **Snowflake** has Snowflake CLI + Copilot + native MCP support
- **Databricks** has CLI + Assistant + Mosaic AI agent framework  
- **AWS/Azure/GCP** all have embedded Cloud Shell + AI-generated CLI commands
- GitHub Copilot CLI already has **full MCP integration and custom agent support**

If Fabric's capabilities are only accessible through the portal, AI agents will route users to platforms that *are* programmable.

### An Adjacent Trend: CLIs Are Going TypeScript

An interesting evolution worth noting: **the overwhelming majority of modern developer CLIs are now TypeScript/Node.js**, distributed via npm.

| CLI | Language | Distribution |
|-----|----------|-------------|
| Claude Code | Node.js | npm (5.17M/week) |
| GitHub Copilot CLI | Node.js | npm |
| Vercel CLI | Node.js | npm |
| Supabase CLI | Node.js | npm |
| Firebase CLI | Node.js | npm |
| Wrangler (Cloudflare) | Node.js | npm |
| CLI for Microsoft 365 | TypeScript | npm |
| **Fabric CLI** | **Python** | **pip** |
| Azure CLI | Python | pip/brew |

This matters because:
- **npm reaches 49.6% of developers** vs. pip's 32.4% (Stack Overflow 2024)
- TypeScript CLIs can run **in the browser** via WebContainers (StackBlitz) — enabling CLI-in-portal without a backend
- LLMs generate better TypeScript than any other language for tool integration (the training data is overwhelmingly web/TS)
- It aligns with Cloudflare's "Code Mode" architecture: agents generate TypeScript against a typed API 

This doesn't mean we must rewrite immediately — but it signals the direction the ecosystem is heading, and we should consider this for the next major version.

---

## How This Connects to Our Strategy

This vision is the **engine behind "Embedding Fabric Everywhere"** — our team's strategy for the agentic era. The strategy identifies five directions: Scripting in Fabric, VS Code Experiences, Functions as MCP Tools, Externalizing Agentic Capabilities, and AI-Powered Provisioning.

**The CLI as execution layer is the common thread that powers all five.** Scripting in Fabric runs CLI scripts. VS Code experiences use CLI in the IDE. MCP tools are exposed through CLI. External agents execute via CLI. AI-powered provisioning generates CLI scripts from natural language.

Without an execution layer, these directions are aspirations. With it, they become concrete, shippable capabilities.

---

## What We're Proposing

### Immediate (This Quarter)

| Action | Why Now |
|--------|---------|
| **Position CLI as execution layer** in strategy and roadmaps | Frame the investment correctly — not "CLI improvements" but "execution infrastructure for agents" |
| **Build MCP server into CLI** (`fab mcp server start`) | Table stakes — every competitor has this. Enables Claude Code, GitHub Copilot, VS Code to use Fabric |
| **Add AI-optimized documentation** (agents.md, structured context) | AI agents need context to generate correct scripts. Community already contributing this |

### Near-Term (H1 2026)

| Action | Why |
|--------|-----|
| **CLI-in-Portal** (browser terminal, pre-authenticated) | Competitive parity with AWS/Azure/GCP Cloud Shell. Zero-friction entry point |
| **Copilot Script Mode** | Copilot generates CLI scripts for complex tasks. The Anthropic pattern, applied to Fabric |
| **Sandboxed CLI execution environment** | Required for agents to execute safely. Leverage existing notebook/pipeline sandbox infra |

### Strategic (H2 2026+)

| Action | Why |
|--------|-----|
| **CLI Script Items** | First-class artifact type: save, schedule, version, share CLI scripts in Fabric |
| **Evaluate TypeScript/Node.js for CLI v2** | Align with industry, enable browser-native execution, better AI code generation |
| **CLI as typed API (programmatic SDK)** | Enable Cloudflare "Code Mode" pattern: agents generate code against typed Fabric API. The 98.7% efficiency gain |

---

## The Ask

1. **Acknowledge the CLI as a strategic execution layer** — not a secondary tool. This reframes our investment from "CLI maintenance" to "building Fabric's execution infrastructure for the agentic era."

2. **Prioritize MCP server integration and CLI-in-Portal** as near-term deliverables. These are table stakes that every competitor already has.

3. **Fund a cross-team exploration** with the Copilot team on "Script Mode" — the pattern where Copilot generates CLI scripts for complex workflows. Anthropic, Cloudflare, and Azure Copilot have all validated this pattern.

---

## Summary

The world is shifting from "clicking in portals" to "stating intent." AI agents need an execution layer to translate intent into action. **The CLI is that layer.**

Every major platform — GitHub, AWS, Cloudflare, Vercel, Snowflake — is converging on the same architecture: AI generates code → CLI executes it → platform operations happen. The evidence is overwhelming: **98.7% cheaper, dramatically more capable, and the pattern AI models are best trained on.**

Fabric has a solid CLI foundation (open source, MIT licensed, growing 17% MoM). The gap is positioning: **we need to evolve it from a human productivity tool into the execution substrate for the agentic era.**

The urgency is real. As AI agents become how users interact with data platforms, Fabric must be callable from everywhere — or risk being bypassed entirely.

> **The CLI is not a developer convenience. It is Fabric's execution layer for the next era of computing.**

---

*Related documents: [Embedding Fabric Everywhere — DXA Strategy v6](../strategy/v6-⭐.md) | [CLI Vision — Unlocking the Long Tail](20251130-FABRIC-CLI-VISION-V6-⭐.md) | [CLI in the AI Era — Research Report](20260105-CLI-AI-ERA-RESEARCH.md)*
