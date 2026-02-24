# The Future of Fabric: AI-Powered Automation & the Pro-Developer Experience

**Version:** 5.0  
**Date:** November 30, 2025  
**Author:** Hasan Abo-Shally, Principal PM, Fabric Platform

---

## The One-Paragraph Vision

Microsoft Fabric is becoming a platform where **anyone can automate anything**. Pro-developers get the terminal, Git, and CI/CD workflows they expect. Business users get Copilot that actually *does things*, not just advises. And the work that experts do once—captured as CLI scripts—runs forever on autopilot. This document describes how **CLI, MCP (Model Context Protocol), and automation infrastructure** combine to create this future.

---

## What's the Big Idea?

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                     THE VISION IN ONE PICTURE                               │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                     │   │
│   │   "Move all sales reports to production and notify the team"       │   │
│   │                                                                     │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                           COPILOT                                   │   │
│   │                                                                     │   │
│   │   "Here's what I'll do:                                             │   │
│   │    1. List 47 reports in 'Sales-Dev' workspace                      │   │
│   │    2. Deploy each to 'Sales-Prod' workspace                         │   │
│   │    3. Send Teams notification to #sales-analytics                   │   │
│   │                                                                     │   │
│   │    ⏱️ Estimated: 3 minutes                                          │   │
│   │                                                                     │   │
│   │    [View Script]  [Dry-Run]  [Execute]  [Cancel]"                   │   │
│   │                                                                     │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                            CLI                                      │   │
│   │                                                                     │   │
│   │   fab item list -w "Sales-Dev" -t report -o json \                  │   │
│   │     | jq -r '.[].id' \                                              │   │
│   │     | xargs -I {} fab item deploy -i {} -w "Sales-Prod"             │   │
│   │                                                                     │   │
│   │   fab notify teams --channel "#sales-analytics" \                   │   │
│   │     --message "47 reports deployed to production"                   │   │
│   │                                                                     │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                     │   │
│   │   ✅  47/47 reports deployed                                        │   │
│   │   ✅  Team notified                                                 │   │
│   │   💾  Script saved for next time                                    │   │
│   │                                                                     │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│         Natural Language  →  AI Understanding  →  Reliable Execution        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**That's it.** Users describe what they want. Copilot figures out how. CLI executes reliably. The script is saved so next time takes 30 seconds instead of 30 minutes.

---

## Three Transformations

This vision drives three interconnected changes to Fabric:

### 1. Pro-Developer Experience
*"Fabric works the way you already work"*

| What Developers Expect | What We're Building |
|------------------------|---------------------|
| Terminal at the bottom | CLI in Fabric portal |
| AI pair programmer on the side | Copilot that generates CLI |
| Version control for everything | Git integration for scripts |
| CI/CD pipelines | Service principal auth, JSON output |

### 2. AI-Powered Platform  
*"Your AI assistant can actually do things"*

| Today's Copilot | Tomorrow's Copilot |
|-----------------|-------------------|
| Answers questions | Executes operations |
| Suggests next steps | Runs complete workflows |
| Requires user action | Acts autonomously (with permission) |

**How?** The Model Context Protocol (MCP) gives Copilot tools. The CLI is the most powerful tool we can give it—deterministic, scriptable, auditable.

### 3. Automation Democratization
*"Capture expertise once, run forever"*

```
Manual work (hours)  →  Copilot generates script (minutes)  →  Script runs on schedule (automatic)
```

Business users who never touch code can still benefit from automation—Copilot writes the script for them.

---

## Why This Matters: A Story

### Meet Maya

Maya is a Data Platform Engineer at Contoso. Every sprint, she migrates reports from Development to Production. 

**Today:** 150 reports × 4 minutes each = **10 hours** of clicking, copying, verifying, logging.

**With This Vision:** 

```
Maya: "Migrate all reports from Development to Production, 
       verify each loads correctly, and generate a compliance log"

Copilot: [Shows plan] → [Maya clicks Execute] → Done in 12 minutes
```

**Time saved:** 9.5 hours  
**Errors:** 0 (automated verification caught issues before they happened)  
**Next sprint:** 30 seconds (script was saved)

Now multiply Maya by every data team in every enterprise.

---

## The Technical Foundation

### How It All Fits Together

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                         FABRIC AUTOMATION STACK                             │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   SURFACE LAYER — How users interact                                        │
│   ─────────────────────────────────────                                     │
│                                                                             │
│      ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│      │ Portal   │  │ CLI in   │  │ Local    │  │ CI/CD    │                 │
│      │ (GUI)    │  │ Portal   │  │ Terminal │  │ Pipeline │                 │
│      └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘                 │
│           │             │             │             │                       │
│           └─────────────┴──────┬──────┴─────────────┘                       │
│                                │                                            │
│                                ▼                                            │
│   INTELLIGENCE LAYER — How AI helps                                         │
│   ──────────────────────────────────                                        │
│                                                                             │
│      ┌─────────────────────────────────────────────────────────────────┐    │
│      │                         COPILOT                                 │    │
│      │                                                                 │    │
│      │  • Understands natural language requests                        │    │
│      │  • Generates CLI scripts to accomplish tasks                    │    │
│      │  • Explains what will happen before execution                   │    │
│      │  • Learns from user feedback                                    │    │
│      │                                                                 │    │
│      └─────────────────────────────────────────────────────────────────┘    │
│                                │                                            │
│                                ▼                                            │
│   PROTOCOL LAYER — How AI gets tools                                        │
│   ──────────────────────────────────                                        │
│                                                                             │
│      ┌─────────────────────────────────────────────────────────────────┐    │
│      │                          MCP                                    │    │
│      │            (Model Context Protocol)                             │    │
│      │                                                                 │    │
│      │  • Standardized way to give AI access to tools                  │    │
│      │  • Local MCP: runs on developer's machine                       │    │
│      │  • Remote MCP: runs in Fabric's cloud                           │    │
│      │  • Enables third-party AI agents too                            │    │
│      │                                                                 │    │
│      └─────────────────────────────────────────────────────────────────┘    │
│                                │                                            │
│                                ▼                                            │
│   EXECUTION LAYER — How things actually happen                              │
│   ────────────────────────────────────────────                              │
│                                                                             │
│      ┌─────────────────────────────────────────────────────────────────┐    │
│      │                          CLI                                    │    │
│      │                                                                 │    │
│      │  • Deterministic: same command = same result                    │    │
│      │  • Scriptable: commands compose into workflows                  │    │
│      │  • Auditable: every action logged with identity                 │    │
│      │  • Universal: works in any environment                          │    │
│      │                                                                 │    │
│      └─────────────────────────────────────────────────────────────────┘    │
│                                │                                            │
│                                ▼                                            │
│   PLATFORM LAYER — Where data lives                                         │
│   ─────────────────────────────────                                         │
│                                                                             │
│      ┌─────────────────────────────────────────────────────────────────┐    │
│      │                    FABRIC PLATFORM                              │    │
│      │                                                                 │    │
│      │  Workspaces • Lakehouses • Warehouses • Reports                 │    │
│      │  Pipelines • Notebooks • Spark • Power BI                       │    │
│      │                                                                 │    │
│      └─────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Why CLI is the Execution Layer

> "Anyone who has used coding agents knows you need to give them tools, and **a CLI is the simplest, most universal tool you can hand an agent.**"  
> — [Modal](https://modal.com/blog/building-for-agent-devex)

| Characteristic | Why It Matters for AI |
|---------------|----------------------|
| **Deterministic** | Same command always produces same result |
| **Composable** | Small commands combine into complex workflows |
| **Scriptable** | Can be saved, versioned, scheduled |
| **Observable** | Every action can be logged and audited |

**The efficiency argument:**

| Approach | For 100 Operations | Tokens Used |
|----------|-------------------|-------------|
| AI makes 100 API calls | 100 round trips | ~50,000 |
| AI generates 1 CLI script | 1 execution | ~2,000 |

**~96% token reduction** for bulk operations.

---

## The Key Pieces

### 1. CLI in Portal

**What:** A terminal embedded in Fabric portal—no local installation needed.

**Why:** Every major cloud platform has this (AWS CloudShell, Google Cloud Shell, Azure Cloud Shell). It's table stakes for pro-developers.

**Special sauce:** Pre-authenticated with your Fabric identity. Copilot integration. "Explain this command" before you run it.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                         FABRIC PORTAL                                       │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌───────────────────────────────────┐   ┌─────────────────────────────┐   │
│   │                                   │   │         COPILOT             │   │
│   │         WORKSPACE VIEW            │   │                             │   │
│   │                                   │   │  "What would you like       │   │
│   │   📊 Sales Dashboard              │   │   to do?"                   │   │
│   │   📊 Inventory Report             │   │                             │   │
│   │   📊 Q4 Analysis                  │   │                             │   │
│   │                                   │   │                             │   │
│   └───────────────────────────────────┘   └─────────────────────────────┘   │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                     │   │
│   │  $ fab item list --workspace "Sales" --type report                  │   │
│   │                                                                     │   │
│   │  NAME               TYPE     LAST MODIFIED                          │   │
│   │  Sales Dashboard    Report   2025-11-29 14:32                       │   │
│   │  Inventory Report   Report   2025-11-28 09:15                       │   │
│   │  Q4 Analysis        Report   2025-11-27 16:45                       │   │
│   │                                                                     │   │
│   │  $ _                                                 CLI TERMINAL   │   │
│   │                                                                     │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

   Copilot on the right. CLI at the bottom. Work in the center.
```

### 2. MCP (Model Context Protocol)

**What:** A standardized way to give AI agents access to tools.

**Two flavors:**

| Local MCP | Remote MCP |
|-----------|------------|
| Runs on your machine | Runs in Fabric's cloud |
| Works with VS Code, IDEs | Works with any AI agent |
| Great for development | Great for production |

**Key insight from research:** Token efficiency matters. A chatty MCP server can consume 40%+ of an AI's context window. Our design is minimal: 10-15 high-value tools, not hundreds.

### 3. CLI Script Items

**What:** A new Fabric item type that stores and runs CLI scripts on schedule.

**Why not just use Notebooks?**

| Notebooks | CLI Script Items |
|-----------|------------------|
| 30-60 second startup (Spark) | 2-3 second startup |
| For data exploration | For platform automation |
| Higher compute cost | Lightweight container |

**User journey:**
1. Write a script (or have Copilot generate it)
2. Save as CLI Script Item
3. Configure schedule (daily, hourly, on-trigger)
4. Fabric runs it automatically
5. Get notified on success/failure

### 4. Blueprints

**What:** Define complete Fabric environments as code.

```yaml
# production-analytics.yaml
name: Production Analytics
parameters:
  environment: prod
  
resources:
  workspace:
    name: "Analytics-${environment}"
    capacity: F2
    
  lakehouse:
    name: "RawData"
    
  warehouse:
    name: "Curated"
    
  permissions:
    - role: Contributor
      principal: "data-team@contoso.com"
```

```bash
fab blueprint apply --file production-analytics.yaml
```

**Why:** Infrastructure as Code for Fabric. Version-controlled. Repeatable. Reviewable.

---

## Trust & Safety

### The "Explain Before Execute" Pattern

Users don't trust what they don't understand. Before any destructive operation:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   User: "Delete all reports older than 90 days"                             │
│                                                                             │
│   ─────────────────────────────────────────────────────────────────────     │
│                                                                             │
│   Copilot:                                                                  │
│                                                                             │
│   "Here's what I'll do:                                                     │
│                                                                             │
│    1. Find all reports in current workspace                                 │
│    2. Filter to those not modified in 90+ days                              │
│    3. Delete each matching report                                           │
│                                                                             │
│    ⚠️  This will permanently delete 47 reports.                             │
│                                                                             │
│    [Show CLI Script]  [Dry-Run First]  [Execute]  [Cancel]"                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Dry-Run Mode

Preview what will happen before it happens:

```bash
$ fab item delete --workspace "Archive" --older-than 90d --dry-run

DRY RUN - No changes will be made

Would delete 47 items:
  - Report: Q1 Sales (last modified: 2025-08-15)
  - Report: Q2 Inventory (last modified: 2025-07-22)
  ... (45 more)

Run without --dry-run to execute.
```

### Human-Readable Errors

Not this:
```
Error: FABRIC_ERR_4523
```

But this:
```
Error: Cannot delete workspace "Production"

Reason: Workspace contains 23 items. Delete or move items first.

Suggestion: Run `fab item list -w "Production"` to see items,
           or use `--force` to delete everything.

Docs: https://docs.fabric.microsoft.com/cli/workspace-delete
```

---

## Who Is This For?

### Primary Users

| Persona | Why CLI Matters | How They Use It |
|---------|-----------------|-----------------|
| **DevOps Engineers** | CI/CD pipelines, infrastructure automation | Direct CLI in pipelines |
| **Data Engineers** | Bulk operations, pipeline automation | CLI + scripting |
| **Platform Admins** | Tenant management, governance | CLI for bulk permissions |
| **Developers** | Build/deploy workflows | CLI in terminals |
| **AI Agents** | Automated execution | CLI via MCP |

### The Copilot Bridge for Everyone Else

Business users and citizen developers rarely use CLI directly. But they benefit from it:

```
Business User: "Export all sales reports to SharePoint"
                            │
                            ▼
                    Copilot generates CLI
                            │
                            ▼
                Business User clicks [Run]
                            │
                            ▼
                      Done. No CLI typed.
```

---

## Evidence This Will Work

### Market Signals

| Signal | What It Tells Us |
|--------|------------------|
| **35% DAU/MAU ratio** for existing CLI users | Those who try it, stick with it |
| **190,000 downloads** | Significant interest |
| **27.8% of developers** use Azure CLI | Huge addressable market familiar with pattern |
| **Every cloud platform** has CLI in portal | Industry-validated approach |

### Industry Investment in Code Execution for AI

| Company | Investment |
|---------|-----------|
| **Anthropic** | [Code execution tool](https://docs.anthropic.com/en/docs/build-with-claude/tool-use/code-execution-tool) for Claude agents |
| **Modal** | [Sub-second sandboxes](https://modal.com/blog/building-for-agent-devex) for agent code execution |
| **E2B** | [Firecracker VMs](https://e2b.dev/) powering Perplexity, Manus |
| **LangGraph** | [Code generation with validation](https://langchain-ai.github.io/langgraph/) |

> "Agents gain **'ground truth' from code execution**—not just LLM self-review."  
> — Anthropic

### The DORA Effect

From [DORA research](https://dora.dev/research/) on elite engineering teams:

| Metric | Elite | Low Performers | Factor |
|--------|-------|----------------|--------|
| Deployment frequency | Multiple/day | Monthly | 100x |
| Lead time | < 1 hour | 1-6 months | 1000x |
| Change failure rate | 0-15% | 46-60% | 3-4x |

> "Elite performers automate most of their deployment pipeline. **Manual processes are the #1 predictor of low performance.**"

---

## What Makes This Unique

### Competitor Comparison

| Capability | Databricks | Snowflake | BigQuery | Fabric (Today) | Fabric (Vision) |
|------------|------------|-----------|----------|----------------|-----------------|
| Mature CLI | ✅ | ✅ | ✅ | ⚠️ Preview | ✅ |
| CLI in portal | ⚠️ Limited | ❌ | ✅ | ❌ | ✅ |
| Strong AI Copilot | ⚠️ Basic | ❌ | ⚠️ Duet AI | ✅ | ✅ |
| Copilot generates CLI | ❌ | ❌ | ❌ | ❌ | ✅ |
| MCP for agents | ❌ | ❌ | ❌ | ❌ | ✅ |
| Native script scheduling | ❌ | ❌ | ❌ | ❌ | ✅ |

### The Unique Combination

```
         COPILOT          +          MCP          +          CLI          +     SCRIPT ITEMS
           │                          │                       │                      │
           ▼                          ▼                       ▼                      ▼
   Natural language          Tool protocol           Reliable execution        Automation
    understanding           for AI agents           for any operation          on schedule
           │                          │                       │                      │
           └──────────────────────────┴───────────────────────┴──────────────────────┘
                                              │
                                              ▼
                              ┌───────────────────────────────────┐
                              │                                   │
                              │   "Describe what you want →       │
                              │    AI generates script →          │
                              │    Runs on schedule"              │
                              │                                   │
                              │   NO COMPETITOR OFFERS THIS       │
                              │                                   │
                              └───────────────────────────────────┘
```

---

## The Roadmap

### Phase 1: Foundation (Now → H1 2026)
- CLI GA with core operations
- Dry-run mode for all commands
- Human-readable error messages
- JSON output for scripting
- Azure CLI credential integration

### Phase 2: Platform Integration (H1-H2 2026)
- CLI in Fabric portal
- Local MCP server
- Remote MCP server
- Copilot CLI generation
- "Explain this command" feature
- CLI Script Items (preview)

### Phase 3: Ecosystem (H2 2026+)
- CLI Script Items (GA)
- Blueprints as code
- Third-party agent integration
- Community script sharing
- Partner extensions

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Security breach via CLI | Sandbox isolation, RBAC enforcement, audit logging |
| Learning curve too steep | Copilot generates commands; explain-before-execute |
| Fragmented experience (GUI vs CLI) | "Copy as CLI" in GUI; consistent concepts |
| AI token consumption | Minimal tool surface; code execution pattern |
| Community script quality | Curation, security scanning, ratings |

---

## Success Metrics

| Metric | 12-Month Target | 24-Month Target |
|--------|-----------------|-----------------|
| CLI Monthly Active Users | 10,000 | 50,000 |
| CLI in Portal Users | 5,000 | 25,000 |
| CLI Script Items Created | 1,000 | 10,000 |
| Copilot CLI Generations | 50K/month | 500K/month |
| Customer Case Studies | 3 | 10 |

---

## Key Takeaways

1. **This is bigger than CLI.** It's about AI-powered automation and making Fabric feel like home for pro-developers.

2. **Three transformations.** Pro-dev experience + AI-powered platform + Automation democratization.

3. **Copilot needs CLI.** To go from "I advise" to "I do," Copilot needs a reliable execution layer. CLI is that layer.

4. **Code execution beats tool calling.** For bulk operations, generating a script is 96% more efficient than making individual API calls.

5. **CLI in portal is table stakes.** Every cloud platform has this. We need it.

6. **Trust through transparency.** Explain-before-execute, dry-run mode, human-readable errors.

7. **35% DAU/MAU proves demand.** Users who try CLI stay with it. Now we need to get more users to try it.

8. **No competitor has this stack.** Copilot + MCP + CLI + Script Items is unique to Fabric.

---

## Appendix: Research Sources

| Category | Sources |
|----------|---------|
| AI & Code Execution | [Anthropic](https://docs.anthropic.com/en/docs/build-with-claude/tool-use/code-execution-tool), [Modal](https://modal.com/blog/building-for-agent-devex), [E2B](https://e2b.dev/), [LangGraph](https://langchain-ai.github.io/langgraph/) |
| CLI in Portals | [AWS CloudShell](https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html), [Google Cloud Shell](https://cloud.google.com/shell/docs), [Azure Cloud Shell](https://learn.microsoft.com/en-us/azure/cloud-shell/overview) |
| Developer Surveys | [Stack Overflow 2024](https://survey.stackoverflow.co/2024/), [JetBrains 2023](https://www.jetbrains.com/lp/devecosystem-2023/) |
| MCP Protocol | [MCP Official](https://modelcontextprotocol.io/), [Hacker News Discussion](https://news.ycombinator.com/item?id=44026539) |
| DevOps ROI | [DORA Research](https://dora.dev/research/) |
| Internal | Telemetry (190K downloads, 1,400 MAU, 35% DAU/MAU, ~1,000 tenants) |

---

*Questions? Reach out to Hasan Abo-Shally (Principal PM, Fabric Platform)*
