# Unlocking the Long Tail of Automation in Fabric
## How CLI Enables Pro-Developers and AI Agents

**Author:** Hasan Abo-Shally, Principal PM, Fabric Platform  
**Date:** December 5, 2025

---

## Executive Summary

Microsoft Fabric is investing heavily in AI-powered experiences — the Unified Copilot, Creator Agent, and more. These agents need to do things, not just answer questions. The coming Unified Copilot will rely on MCP tools to execute common operations: listing workspaces, triggering refreshes, getting item details. This works well for structured, frequently-used tasks.

But there's a gap. Complex workflows — scaffolding dev environments, bulk operations, multi-step investigations — don't fit neatly into individual tool calls. And the "long tail" of automation — tasks too small, too infrequent, or too far off the critical path to justify dedicated tooling — stays manual.

This document proposes **adding CLI execution as a complementary capability** for Fabric's AI experiences. The idea: Copilot can offer a "Script Mode" where it generates CLI scripts that users can review, edit, save, and reuse. This sits alongside MCP tools, not instead of them.

The vision: **for complex or reusable workflows, Copilot generates CLI scripts that become shareable artifacts — executable by anyone, human or AI.**

The key insight: **CLI + AI unlocks the long tail of automation.** The 20% of tasks on the critical path — production deployments, governed workflows — justify real engineering and already have CI/CD pipelines. The other 80% stays manual: tasks too small to script, too infrequent to remember, or simply not important enough to prioritize. AI changes the math. It generates one-off scripts for tasks that were never worth automating: scaffolding dev environments, investigating issues, seeding demos, bulk cleanup. Pro-developers stay in flow instead of context-switching to build throwaway tooling.

This creates three compounding benefits:
1. **Pro-developers feel at home** — terminal in the portal, Git for scripts, CI/CD patterns they expect
2. **The long tail gets automated** — tasks that were never worth scripting become effortless
3. **Complex workflows become shareable** — scripts can be saved, versioned, and reused across teams

---

## The Story

Maya is a platform engineer at Contoso. Today she has a new team member starting — Alex needs a dev environment with the team's standard setup: lakehouse, sample data, semantic model, template notebooks, permissions. Last time Maya did this manually: forty-five minutes of clicking through the portal, plus the inevitable "wait, I forgot the shortcut" moment.

This time, Maya opens the CLI panel in the portal and types into Copilot: *"Set up a dev workspace for Alex with our standard analytics starter kit."*

Copilot generates a CLI script. Maya scans it, clicks Execute. Eight minutes later, Alex has a working environment. Maya saves the script as "Team Dev Environment Setup" — next time someone joins, she just runs it with a different name. (See [What a Script Actually Looks Like](#what-a-script-actually-looks-like) for the actual script.)

---

Two days later, Sales pings her: *"Big customer demo tomorrow. Can you set up a sandbox?"*

Maya opens Copilot: *"Create a demo workspace with sample retail data and a basic dashboard."* Fifteen minutes later, done.

This task wasn't worth building automation for — it happens twice a quarter, it's not on the critical path, and there's always something more important to work on. But it also wasn't worth an hour of manual clicking. This is the long tail: tasks too small to justify scripting, too infrequent to remember the steps, or simply not important enough to prioritize — now handled in minutes.

---

A week later, Priya — an analytics admin who's never touched a terminal — finds Maya's saved script. She asks Copilot: *"Adapt this for my team's setup."* Copilot modifies it for Priya's context. She runs it, saves her own version.

The expertise Maya built in eight minutes now serves the entire organization.

---

## The Long Tail of Automation

Maya's story illustrates a pattern: **tasks that were never worth automating become effortless with CLI + AI.**

Enterprise teams already have CI/CD pipelines for the critical 20% — production deployments, scheduled refreshes, governance workflows. Those are on the critical path; they justify the engineering investment. But the other 80%? They stay manual. Not because they're unimportant, but because they're not important *enough*: too small to justify the overhead, too infrequent to remember the steps, or simply off the critical path where there's always something more urgent.

CLI + AI changes the math. The cost of automation drops from "hours of scripting" to "describe what you want." Suddenly, the long tail is worth automating.

**Scenarios that fit this pattern:**

| Scenario | Why it's "long tail" | What CLI + AI enables |
|----------|---------------------|----------------------|
| **Scaffold dev environments** | New team members join irregularly; setup steps are easy to forget | *"Set up a dev workspace for Alex with our standard starter kit"* |
| **Seed demos and POCs** | One-off, time-sensitive, throwaway | *"Create a demo workspace with sample retail data and a basic dashboard"* |
| **Investigate issues** | Ad-hoc, different every time | *"Show me all failed refreshes in Finance workspace this week with error messages"* |
| **Bulk cleanup and hygiene** | Infrequent, tedious, not worth productionizing | *"Find all reports not viewed in 6 months and list them for review"* |
| **Environment comparison** | Useful before deployments, but sporadic | *"Compare items in Dev vs Prod workspace — what's missing or different?"* |
| **Onboarding walkthroughs** | Teaching moments, not repeatable scripts | *"Show me how to set up a lakehouse with shortcuts to our team data"* |

These aren't edge cases — they're the daily reality of platform teams. Each one is a small friction that adds up. CLI + AI removes that friction without requiring anyone to become a scripting expert.

---

## What a Script Actually Looks Like

To make this concrete, here's what Copilot might generate when Maya asks: *"Set up a dev workspace for Alex with our standard analytics starter kit."*

```bash
#!/bin/bash
# Dev Environment Setup for Alex
# Generated by Copilot — review before running

# Create the dev workspace on dev capacity
fab mkdir "Alex-Dev.Workspace" -P capacityname=DevCapacity

# Create lakehouse for analytics work
fab mkdir "Alex-Dev.Workspace/Analytics.Lakehouse"

# Copy the team's template notebook
fab cp "Templates.Workspace/Starter-Notebook.Notebook" "Alex-Dev.Workspace"

# Copy the standard semantic model
fab cp "Templates.Workspace/Team-Model.SemanticModel" "Alex-Dev.Workspace"

# Copy the starter report
fab cp "Templates.Workspace/Starter-Report.Report" "Alex-Dev.Workspace"

# Rebind copied items to use local resources (not originals in Templates)
NEW_LAKEHOUSE_ID=$(fab get "Alex-Dev.Workspace/Analytics.Lakehouse" -q "id")
NEW_MODEL_ID=$(fab get "Alex-Dev.Workspace/Team-Model.SemanticModel" -q "id")
WORKSPACE_ID=$(fab get "Alex-Dev.Workspace" -q "id")

# Point notebook to the new lakehouse
fab set "Alex-Dev.Workspace/Starter-Notebook.Notebook" -q lakehouse -i "{
  \"default_lakehouse\": \"$NEW_LAKEHOUSE_ID\",
  \"default_lakehouse_name\": \"Analytics\",
  \"default_lakehouse_workspace_id\": \"$WORKSPACE_ID\"
}"

# Point report to the new semantic model
fab set "Alex-Dev.Workspace/Starter-Report.Report" -q semanticModelId -i "$NEW_MODEL_ID"

echo "Dev workspace ready: Alex-Dev.Workspace"
echo "Items created: Lakehouse, Notebook, Semantic Model, Report"
echo "All items rebound to local resources"
```

This is ~30 lines. It's readable. Maya can review it, tweak it, save it. Next time someone joins, she changes "Alex" to the new name and runs it again.

Note the rebinding steps — when items are copied, connections to other items (like a notebook's default lakehouse or a report's semantic model) still point to the originals. The script handles this by getting the new resource IDs and updating each item's bindings. This is exactly the kind of multi-step workflow that's tedious to do manually but trivial to script.

---

## How CLI Complements MCP

The story above is human-in-the-loop: Maya uses Copilot in "Script Mode," reviews the output, clicks Execute. But this capability has broader implications for how AI agents work with Fabric.

Today, Fabric Copilot and other agents use MCP tools to execute operations. This works well for many tasks:

| Task | Why MCP tools work great |
|------|-------------------------|
| "What workspaces do I have?" | Simple query, single tool call |
| "Refresh this semantic model" | Well-defined action, clear parameters |
| "Show me this item's details" | Structured response, tight integration |

But some tasks don't fit this pattern:

| Task | Why it's harder with individual tools |
|------|--------------------------------------|
| "Set up a dev environment with 5 items" | Multiple sequential operations, dependencies |
| "Compare two workspaces and show drift" | Complex logic, conditional branching |
| "Find failed refreshes, export logs, summarize" | Multi-step workflow, data transformation |

**CLI execution complements MCP tools** by handling these complex cases. Instead of building dedicated tools for every multi-step workflow, Copilot can generate CLI scripts that compose existing commands.

The industry is validating this pattern. Anthropic's engineering team [published findings](https://www.anthropic.com/engineering/code-execution-with-mcp) showing that agents connected to hundreds of tools become inefficient when loading all tool definitions upfront — but when agents write code instead, they use up to **98.7% fewer tokens**. Cloudflare reached the same conclusion, calling their approach ["Code Mode"](https://blog.cloudflare.com/code-mode/): *"LLMs are better at writing code to call MCP than at calling MCP directly."* Meanwhile, [Copilot in Azure](https://learn.microsoft.com/en-us/azure/copilot/generate-cli-scripts) already generates Azure CLI scripts — the same pattern we're proposing for Fabric.

The takeaway isn't "replace MCP tools with CLI." It's: **use the right approach for the task.** Simple operations → MCP tools. Complex workflows → CLI scripts. Both available, complementary.

---

## Why CLI for Complex Workflows?

Some might ask: why CLI scripts for complex tasks? Why not just build more MCP tools?

**1. CLI enables chaining operations — a key differentiator.**

MCP tools excel at discrete operations: get this, refresh that. But real workflows rarely stop at one action. They involve sequences ("create this, then add that"), conditionals ("if this exists, update it; otherwise create it"), loops ("for each workspace, do X"), and data flow ("get the list, filter it, act on the results").

The CLI's composable design makes this natural. Commands like `fab ls`, `fab cd`, `fab cp`, `fab export` are building blocks that chain together. Copilot can generate a 20-line script that orchestrates a complete workflow — something that would require coordinating dozens of individual MCP tool calls, with the AI managing state between each one.

This isn't impossible with MCP tools, but it's significantly harder. Each tool call is stateless; the AI must track context across calls. With CLI scripts, the workflow is explicit, readable, and runs as a unit.

**2. We're actively investing in AI-readiness.**

The CLI team is adding dedicated documentation for AI agents — structured context files with command references, common workflows, and examples optimized for LLM consumption. A [community contribution](https://github.com/microsoft/fabric-cli/pull/82) is adding an `agent-docs/` directory with guidance for AI assistants working with the CLI. The community is also building tooling on top: [Kurt Buhler's fabric-cli-plugin](https://github.com/data-goblin/fabric-cli-plugin) provides MCP server wrappers and Claude Code skills for the CLI. This isn't a future aspiration — it's happening now, with contributions flowing in from both Microsoft and the community.

**3. CLI handles the hard parts.**

Authentication, token refresh, retries on transient failures, rate limiting — these are already solved in the CLI. Every team that builds API integrations redoes this work. The CLI encapsulates it once.

**4. CLI covers the full surface — including the long tail.**

MCP tools are curated for common operations — and that's the right design for frequently-used tasks. But the CLI covers *everything*: the full Fabric REST APIs, plus OneLake file operations, table management, shortcut creation. For the long tail of infrequent operations, CLI scripts provide access without requiring dedicated tool development.

**5. CLI scripts are auditable.**

When an AI agent makes a series of API calls, reconstructing what happened is hard. When it generates a CLI script, you have an artifact — a sequence of commands that can be logged, reviewed, diffed, and replayed. For enterprise governance, this matters.

**6. CLI scripts are efficient to re-run.**

AI generates the script once (costs tokens). The script runs on schedule forever (costs only compute). This is dramatically more efficient than having AI re-reason through the same task every time. It's also deterministic — same script, same inputs, same outputs.

**7. CLI is open source — and Microsoft-governed.**

The Fabric CLI is open source on GitHub under the MIT license, but it remains a Microsoft product with strict quality and security standards. Community contributions go through a rigorous review process: all PRs must link to an approved issue, maintainers review every change, and security-sensitive areas (authentication, core infrastructure) are restricted to the Microsoft team. Contributors must sign a Contributor License Agreement (CLA), and the project follows Microsoft's Open Source Code of Conduct. This means we get the benefits of community innovation — faster command coverage, diverse use cases, partner extensions — without compromising security or reliability.

---

## How the Pieces Fit Together

This vision adds CLI execution as a capability alongside existing MCP tools. Here's how the components connect:

- **Fabric CLI** — The foundational tool. A Python-based, cross-platform CLI (`fab`) that covers the full Fabric API surface: workspace management, item operations, OneLake file access, job scheduling, table operations, and more. Already released as open source (MIT license) on GitHub.

- **CLI-in-Portal** — A browser-based terminal embedded in the Fabric portal, pre-authenticated with the user's identity. No local installation required. Provides the same CLI experience developers have locally, but accessible from anywhere.

- **Copilot Script Mode** — An opt-in mode where Copilot generates CLI scripts instead of (or in addition to) using MCP tools. Users switch to Script Mode when they want transparency into what's happening, or when they want to save/reuse the workflow. Default conversational mode continues to use MCP tools for quick interactions.

- **CLI Script Items** — A new Fabric item type that stores CLI scripts as first-class artifacts. Scripts can be scheduled to run on triggers or intervals, versioned in Git, and shared across teams. Lighter weight than notebooks for automation use cases.

- **MCP Tools (existing)** — Continue to handle common, well-defined operations. CLI execution complements this by handling complex multi-step workflows.

- **Sandboxed Execution Environment** — A secure, isolated environment where CLI scripts run with appropriate permissions and resource limits. Execution logs are captured for audit trails.

**The user experience:**
- Quick questions, common tasks → Copilot uses MCP tools (fast, seamless)
- Complex workflows, reusable automation → User switches to Script Mode, Copilot generates CLI
- Users can always ask to "show me the script" to see what would run

---

## What Competitors Are Doing

Major cloud platforms are converging on CLI + AI as a pattern:

| Platform | What They Offer | Status |
|----------|-----------------|--------|
| **AWS** | [CloudShell](https://aws.amazon.com/cloudshell/) embedded in console + [Amazon Q CLI](https://aws.amazon.com/q/developer/) generates AWS CLI commands | GA |
| **Azure** | [Cloud Shell](https://azure.microsoft.com/en-us/features/cloud-shell/) in portal + [Copilot in Azure](https://learn.microsoft.com/en-us/azure/copilot/overview) generates Azure CLI | GA |
| **Google Cloud** | [Cloud Shell](https://cloud.google.com/shell) in console + [Gemini Code Assist](https://cloud.google.com/gemini/docs/codeassist/overview) for gcloud commands | GA |
| **Snowflake** | [Snowflake CLI](https://docs.snowflake.com/en/developer-guide/snowflake-cli-v2/index) + [Snowflake Copilot](https://docs.snowflake.com/en/user-guide/snowflake-copilot) for SQL and operations | GA |
| **Databricks** | [Databricks CLI](https://docs.databricks.com/en/dev-tools/cli/index.html) + [Databricks Assistant](https://docs.databricks.com/en/notebooks/notebook-assistant.html) for notebook and CLI workflows | GA |

**The pattern is clear:** every major data platform offers (1) a CLI for programmatic access and (2) AI that can generate CLI commands. Fabric has the CLI. The gap is connecting it to Copilot.

---

## What This Enables

Adding CLI execution as a capability enables several experiences:

**CLI in Portal.** Pro-developers get a terminal in the browser, pre-authenticated, no setup required. The same pattern as AWS CloudShell, Azure Cloud Shell, Google Cloud Shell — table stakes for developer experience.

**Copilot Script Mode.** Users can switch to Script Mode when they want Copilot to generate CLI scripts instead of using MCP tools. Useful for complex workflows, transparency, or when they want to save/reuse the automation.

**CLI Script Items.** A new Fabric item type that stores and runs CLI scripts on schedule. Cheaper than notebooks for automation. Faster startup. Purpose-built for platform operations.

**Blueprints.** Complete Fabric environments defined as code — YAML files that the CLI can apply. Version-controlled, reviewable, repeatable infrastructure.

### Why This Matters Strategically

Beyond the experiences, CLI execution delivers compounding benefits:

- **Unlocks the long tail.** The 80% of tasks that never justified scripting become automatable. Dev environment setup, demo prep, ad-hoc investigations, bulk cleanup — all the small frictions that add up. AI drops the cost of automation from "hours" to "describe it."

- **Handles complexity.** Multi-step workflows, conditional logic, bulk operations — things that don't fit neatly into individual tool calls. CLI scripts can compose operations in ways that discrete tools can't.

- **Creates reusable artifacts.** Unlike conversational interactions, CLI scripts can be saved, versioned, shared, and scheduled. The work Copilot does once becomes automation that runs forever.

- **Provides transparency.** For users who want to understand what's happening, Script Mode shows exactly what commands will run. This builds trust and teaches CLI patterns over time.

- **Community leverage.** Open source means partners and customers extend the CLI for their scenarios. Every community contribution expands what scripts can do.

- **Lower cost at scale.** Scripts run without AI inference costs. Generate once, execute forever. For recurring workloads, this is dramatically more efficient than re-prompting.

---

## Risks and Mitigations

Any platform investment carries risks. Here are the concerns we anticipate and how we plan to address them:

**Risk: Security exposure from open source contributions.**  
Mitigation: The CLI remains a Microsoft product. All contributions require CLA signing, go through mandatory code review by Microsoft maintainers, and security-sensitive areas (authentication, core infrastructure) are restricted to the Microsoft team. We follow Microsoft's security policies and the project undergoes regular security reviews.

**Risk: AI agents executing destructive operations.**  
Mitigation: CLI script execution respects the authenticated identity's permissions — agents can only do what the user can do. For sensitive operations, we can implement additional guardrails: confirmation prompts, dry-run modes, operation allow-lists, and execution quotas. All operations are logged for audit.

**Risk: CLI coverage gaps blocking scenarios.**  
Mitigation: The CLI already covers the public Fabric REST APIs, and the open-source model accelerates coverage. Community contributions fill gaps faster than an internal team alone. The CLI team prioritizes commands based on Copilot and agent needs.

**Risk: Sandboxed execution environment complexity.**  
Mitigation: We can leverage existing infrastructure patterns — similar sandboxing exists for notebook execution and data pipeline runs. The CLI's deterministic nature (commands in, results out) makes sandboxing more tractable than general-purpose code execution.

**Risk: Maintenance burden as CLI surface grows.**  
Mitigation: The CLI is architecturally designed for extensibility — new commands follow established patterns with minimal boilerplate. Automated testing and CI/CD ensure quality doesn't degrade as coverage expands.

---

## Proposed Phased Approach

To reduce risk and build confidence, we propose a phased rollout:

| Phase | Capability | What It Proves | Investment |
|-------|------------|----------------|------------|
| **Phase 0** | **CLI in Fabric Notebooks** | Validate that Copilot can generate correct CLI scripts; users already have an execution environment | Minimal — CLI already works in notebooks |
| **Phase 1** | **CLI-in-Portal** | Pro-developers adopt CLI in Fabric; validates demand for terminal experience | Embed existing CLI in browser shell |
| **Phase 2** | **Copilot Script Mode** | Copilot can generate and users will execute CLI scripts; validates the AI+CLI pattern | Copilot team collaboration |
| **Phase 3** | **CLI Script Items** | Scripts become first-class artifacts; scheduled automation works | New item type, Git integration |

**Phase 0 is nearly zero-cost** — the CLI already runs in notebook cells today. We can start validating the Copilot-generates-CLI pattern immediately.

---

## What We're Asking

This vision proposes adding CLI execution as a **complementary capability** alongside existing MCP tools. Specifically:

1. **Alignment on the approach** — Does "Script Mode" as an opt-in capability make sense? Is positioning CLI execution as complementary to MCP tools the right framing?

2. **Cross-team coordination** — CLI-in-portal requires Shell team collaboration. Copilot Script Mode requires Copilot team collaboration. We'd like to explore how this fits with current roadmaps.

3. **Input on scenarios** — Are the "long tail" scenarios (dev setup, demos, investigations) compelling? What other scenarios would benefit from CLI execution?

We're not proposing to replace the MCP tools approach. We're proposing an additional capability that handles cases where MCP tools aren't the best fit — complex workflows, reusable automation, and the long tail of infrequent tasks.

---

## Open Questions

As we refine this proposal, we'd like input on:

1. **CLI Scripts vs. Notebooks for automation** — We believe CLI Scripts would be lighter-weight (faster startup, no Spark cluster), but we should validate this assumption. Are there scenarios where notebook execution is preferable even for pure CLI automation?

2. **Script Mode UX** — Should Script Mode be an explicit toggle, or should Copilot intelligently choose between MCP tools and CLI based on task complexity? What signals indicate a user wants a reusable script vs. a one-time action?

3. **Guardrails for destructive operations** — What level of confirmation is appropriate? Dry-run preview? Explicit "I understand this will delete X" confirmation? Should there be allow-lists for automated execution?

4. **Discoverability** — How do users learn that Script Mode exists? Should Copilot proactively suggest it when tasks are complex?

---

## Appendix: Supporting Evidence

**Industry Investment in Code Execution for Agents**
- Anthropic Engineering: [Code execution with MCP](https://www.anthropic.com/engineering/code-execution-with-mcp) — "Agents scale better by writing code to call tools instead... reduced token usage from 150,000 tokens to 2,000 tokens—a saving of 98.7%"
- Cloudflare: [Code Mode](https://blog.cloudflare.com/code-mode/) — "LLMs are better at writing code to call MCP, than at calling MCP directly... agents are able to handle many more tools, and more complex tools, when those tools are presented as a TypeScript API rather than directly"
- Modal: [Sub-second sandboxes](https://modal.com/blog/building-for-agent-devex) for agent code execution
- E2B: [Firecracker VMs](https://e2b.dev/) powering Perplexity, Manus, and others
- LangGraph: [Code generation with self-correction](https://langchain-ai.github.io/langgraph/tutorials/code_assistant/langgraph_code_assistant/)

**Developer Tool Usage (Stack Overflow 2024)**
- 27.8% of developers use Azure CLI
- 25-34% work with Bash/Shell scripting
- 54-63% use Docker (CLI-native workflows)

**DORA Research on Automation**
> "Elite performers automate most of their deployment pipeline. Manual processes are the #1 predictor of low performance."
