# The Execution Layer: How CLI Enables Pro-Developers and AI Agents in Fabric

**Author:** Hasan Abo-Shally, Principal PM, Fabric Platform  
**Date:** November 30, 2025

---

## Executive Summary

Microsoft Fabric is investing heavily in AI-powered experiences — the Unified Copilot, Creator Agent, and more. These agents need to *do things*, not just answer questions. The agentic AI space is moving fast — new patterns, new capabilities, new expectations every week. The question is: how do we adapt quickly to this fast-changing domain while delivering value to customers in a way that's cost-effective, predictable, and fully auditable?

This document proposes that **the Fabric CLI can become Fabric's universal execution layer** — the interface that humans use directly, that AI agents call through MCP, and that automation scripts run on schedule. It's an asset we already have, it covers the full API surface, and it's open source so the community keeps enriching it.

The vision is simple: **developers build automation with Copilot's help, save it as CLI scripts, and those scripts become reusable artifacts that anyone — human or AI — can execute reliably.**

This creates three compounding benefits:
1. **Pro-developers feel at home** — terminal in the portal, Git for scripts, CI/CD patterns they expect
2. **AI agents get the full surface immediately** — no waiting for tool-by-tool development
3. **Automation becomes cheap and auditable** — scripts run deterministically without burning AI tokens

---

## The Story

Maya is a platform engineer at Contoso. She lives in VS Code for her inner loop — editing notebooks, writing pipelines, committing to Git. But VS Code is file-centric. When Maya needs to understand the *environment* — what's in a workspace, what depends on what, whether refreshes are healthy — she opens the Fabric portal.

The portal is her control tower. Lineage, run history, workspace health — all visible at a glance.

Today, while checking the Development workspace, Maya notices a problem. There are 150 reports that need to migrate to Production before Friday's release. Last time she did this manually: click, download, update connection string, upload, verify, log. Four minutes per report. Ten hours of tedious, error-prone work.

She looks at the bottom of her screen. There's a CLI panel — the same Fabric CLI she uses locally, but pre-authenticated with her portal identity. On the right, there's the Copilot panel.

She types: *"Help me migrate all reports from Development to Production, update the connection strings to point to prod-server, verify each report loads correctly, and generate a compliance log."*

Copilot responds with a plan: list the reports, loop through them, export, transform, deploy, verify, log. It shows her the CLI script it generated. Maya reviews it — the commands look right. She clicks "Dry Run" to preview what would happen. Satisfied, she clicks "Execute."

Twelve minutes later, 150 reports are in Production. Zero errors. A compliance log sits in her workspace, ready for the auditors.

Maya saves the script as a CLI Script Item — a new artifact type in Fabric. Next sprint, when she needs to do the same migration, she won't rewrite anything. She'll run the saved script. Thirty seconds. Or better: she schedules it to run automatically every Friday before the release window.

---

Two weeks later, Priya — an analytics admin on a different team — is browsing the shared workspace. She sees Maya's CLI Script Item: "Report Migration - Dev to Prod."

Priya doesn't know CLI. She's never opened a terminal. But she can click "Run" and the script executes. Or she can open the Copilot panel and say: *"Adapt this script for my team's workspaces — migrate from Analytics-Dev to Analytics-Prod."*

Copilot reads the existing script, understands its structure, and generates a modified version for Priya's context. Priya reviews it, runs it, and saves her own version.

The expertise Maya built in twelve minutes now serves the entire organization. Developers become enablers for everyone else.

---

## Beyond the Human Story: Agents and Scale

The story above is human-in-the-loop: Maya uses Copilot, reviews the script, clicks Execute. But the same infrastructure enables something bigger.

Fabric is building AI agents — the Unified Copilot, the Creator Agent, and eventually third-party agents via MCP. These agents need to act on Fabric, not just advise. The question is: what do they call?

One option: we build dedicated tools for each capability. Need OneLake operations? Build OneLake tools. Need workspace management? Build workspace tools. This doesn't scale. Every capability requires PM spec → engineering → integration → testing. We're always behind.

The alternative: **agents execute CLI scripts.** The CLI already covers the full Fabric API surface. It handles authentication, retries, token refresh — hard problems already solved. It's open source, so the community adds commands we haven't thought of.

If we expose a `run_cli_script` capability through MCP, then:
- Every existing CLI command becomes an agent capability *today*
- Every new command — from us or from community contributors — becomes an agent capability *automatically*
- Teams like Unified Copilot get OneLake operations immediately, not "when someone builds a tool"

We could even introduce an **Automation Agent Item** in Fabric — an agent that runs on schedule or on trigger, executing CLI scripts to accomplish recurring tasks. Or a `fab agent` command in the CLI itself, equipping the CLI with agentic capabilities that can reason, plan, and execute multi-step workflows.

The industry is validating this pattern. Anthropic launched code execution tools for Claude. Modal built sub-second sandboxes for agent code execution. E2B's Firecracker VMs power agents for Perplexity and others. The consensus is emerging: for complex operations, agents should generate and execute code, not make endless individual tool calls.

---

## Why CLI as the Execution Layer?

Some might ask: why not just expose the REST APIs directly? Why add CLI as an intermediary?

**1. CLI is simpler for AI to use.**

A CLI has a small, well-documented surface. `fab workspace list`, `fab item deploy`, `fab lakehouse query`. Each command is self-contained with `--help` documentation. Compare this to REST APIs: dozens of endpoints, complex authentication flows, pagination handling, error parsing. Early evidence suggests AI agents work better with CLI-style interfaces than raw APIs.[^1]

**2. CLI handles the hard parts.**

Authentication, token refresh, retries on transient failures, rate limiting — these are already solved in the CLI. Every team that builds API integrations redoes this work. The CLI encapsulates it once.

**3. CLI is the full surface.**

Our current MCP exposes a curated subset of Fabric APIs — we chose what to include. The CLI exposes *everything*. If an API exists, there's a CLI command for it (or there will be). Agents get the complete platform, not our editorial selection.

**4. CLI scripts are auditable.**

When an AI agent makes a series of API calls, reconstructing what happened is hard. When it generates a CLI script, you have an artifact — a sequence of commands that can be logged, reviewed, diffed, and replayed. For enterprise governance, this matters.

**5. CLI scripts are cheap to re-run.**

AI generates the script once (costs tokens). The script runs on schedule forever (costs only compute). This is dramatically cheaper than having AI re-reason through the same task every time. It's also deterministic — same script, same inputs, same outputs.

**6. CLI is open source.**

The Fabric CLI is on GitHub. The community files issues, suggests commands, even contributes code. This means the execution layer improves faster than any internal team could manage alone. And when partners or ISVs need capabilities, they can extend the CLI rather than waiting for us.

---

## What This Enables

If we invest in CLI as platform infrastructure, several things become possible:

**CLI in Portal.** Pro-developers get a terminal in the browser, pre-authenticated, no setup required. The same pattern as AWS CloudShell, Azure Cloud Shell, Google Cloud Shell — table stakes for developer experience.

**Copilot + CLI Integration.** Copilot generates CLI scripts from natural language. Users learn CLI by seeing what Copilot produces. The "Explain Before Execute" pattern builds trust.

**CLI Script Items.** A new Fabric item type that stores and runs CLI scripts on schedule. Cheaper than notebooks for automation. Faster startup. Purpose-built for platform operations.

**MCP Code Execution.** The Remote MCP exposes a `run_cli_script` tool. Any AI agent — Microsoft's or third-party — can execute CLI scripts in a sandboxed environment. Full Fabric surface, zero tool-by-tool development.

**Blueprints.** Complete Fabric environments defined as code — YAML files that the CLI can apply. Version-controlled, reviewable, repeatable infrastructure.

---

## What We're Asking

This vision requires treating CLI as **platform infrastructure**, not just a developer convenience. Specifically:

1. **Strategic alignment** — Confirm that CLI is a platform investment, not a side project. This affects resourcing, prioritization, and how other teams (Portal, Copilot, MCP) plan their roadmaps.

2. **Cross-team coordination** — CLI-in-portal requires Portal team collaboration. Copilot CLI generation requires Copilot team collaboration. MCP code execution requires alignment on execution environments.

3. **Input on the vision** — Are we missing angles? Are there concerns about this direction? What would make this more compelling or more actionable?

We're not asking for a decision today. We're asking for engagement on whether this direction makes sense — and what it would take to pursue it.

---

## Appendix: Supporting Evidence

**CLI Adoption Metrics (November 2025)**
- 190,000 total downloads
- ~1,400 monthly active users
- ~1,000 active tenants
- 35% DAU/MAU ratio — exceptionally high stickiness

**Industry Investment in Code Execution for Agents**
- Anthropic: [Code execution tool](https://docs.anthropic.com/en/docs/build-with-claude/tool-use/code-execution-tool) for Claude agents
- Modal: [Sub-second sandboxes](https://modal.com/blog/building-for-agent-devex) for agent code execution
- E2B: [Firecracker VMs](https://e2b.dev/) powering Perplexity, Manus, and others
- LangGraph: [Code generation with self-correction](https://langchain-ai.github.io/langgraph/tutorials/code_assistant/langgraph_code_assistant/)

**Developer Tool Usage (Stack Overflow 2024)**
- 27.8% of developers use Azure CLI
- 25-34% work with Bash/Shell scripting
- 54-63% use Docker (CLI-native workflows)

**DORA Research on Automation**
> "Elite performers automate most of their deployment pipeline. Manual processes are the #1 predictor of low performance."

---

[^1]: This is an assumption based on early patterns from Anthropic's research and Modal's agent work. Formal validation would require experimentation with Fabric-specific agents.
