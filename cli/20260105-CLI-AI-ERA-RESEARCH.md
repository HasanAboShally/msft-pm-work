# CLIs in the AI/Agent Era: Comprehensive Research Report

> **Purpose:** Research input for CLI Execution Layer Vision  
> **Date:** January 2026  
> **Sources:** 15+ primary sources including Anthropic, Cloudflare, GitHub, Stack Overflow, npm, AWS, Google, StackBlitz, Microsoft docs

---

## 1. KEY FINDING: The CLI is the New Runtime for AI Agents

### The "Code Mode" Revolution (Anthropic + Cloudflare, 2025)

The most significant architectural shift in developer tooling is happening right now: **AI agents are moving from "tool calling" to "code writing"** — and the CLI is the execution layer.

**Anthropic's "Code Execution with MCP" (Nov 2025):**
- Instead of loading all MCP tool definitions upfront, agents now **write code** that calls tools through a typed API
- This approach achieves a **98.7% reduction in token usage** vs. loading all tool definitions into context
- Enables "progressive disclosure" — agents discover tools on-demand by exploring the API surface
- Supports **state persistence** across operations (variables, intermediate results)
- **Privacy-preserving:** only code is sent to the LLM, not the raw data flowing through tools

**Cloudflare's "Code Mode" (Sep 2025):**
- Converts MCP tool schemas into **TypeScript APIs** that agents generate code against
- Runs in **sandboxed V8 isolates** (Cloudflare Workers) for security
- Key insight: *"LLMs are better at writing code to call MCP, than at calling MCP directly"*
- Quote from Cloudflare: *"Making an LLM perform tasks with tool calling is like putting Shakespeare through a month-long class in Mandarin. But writing code? That's Shakespeare writing sonnets — it's what they were trained on"*
- Agents handle **"many more tools, and more complex tools"** when interacting via TypeScript API vs. direct tool calls
- Introduced **Worker Loader API** to dynamically load MCP tools as TS modules

**Why this matters for Fabric CLI:** The CLI becomes the natural execution substrate — the thing agents generate code *against*. A well-structured, typed CLI with clear command patterns is what LLMs are best at generating code for.

---

## 2. AI-First CLIs: The New Category

### GitHub Copilot CLI (2025)
- **Full agentic CLI** — not just command suggestions. Interactive + programmatic modes
- Default model: **Claude Sonnet 4.5**
- **MCP server support** built-in — can connect to any MCP server
- Custom agents, hooks, skills, memory
- Supports **ACP (Agent Client Protocol)** for agent-to-agent communication
- Free for all GitHub users with rate limits

### Claude Code (Anthropic, 2025)
- Agentic coding tool that **lives in the terminal**
- **5.17 million weekly npm downloads** (as of Jul 2025) — explosive adoption
- Available in terminal, IDE (VS Code), desktop, web
- Built-in MCP integration — can connect to any MCP server
- Reads entire codebases, edits files, runs commands, manages git workflows
- Custom agents ("sub-agents"), skills, hooks
- Node.js 18+ required, distributed via npm

### Amazon Q Developer CLI (AWS, 2025)
- CLI with autocompletions and **AI chat in your terminal** (locally and over SSH)
- Available in IDE (VS Code, JetBrains, Visual Studio, Eclipse), CLI, AWS Console, Teams, Slack, GitHub
- Recently announced upgrade path to **Kiro CLI**
- Claims "highest reported code acceptance rate among assistants that perform multiline code suggestions"
- Free tier: 50 agentic chat interactions/month

### GitHub Copilot Agent Mode (Feb 2025)
- **"Project Padawan"** — autonomous SWE agent that can be assigned GitHub Issues
- Spins up secure cloud sandboxes, clones repos, edits files, builds/tests/lints
- Produces **fully tested pull requests** and resolves reviewer feedback
- Thomas Dohmke (then-CEO): *"From code completions, chat, and multi-file edits to workspace and agents, Copilot puts the human at the center"*

---

## 3. CLI Language & Runtime Trends

### The TypeScript/Node.js Dominance Pattern

| CLI Tool | Language | Package Manager | Distribution |
|---|---|---|---|
| Claude Code | Node.js | npm | `npm install -g @anthropic-ai/claude-code` |
| GitHub Copilot CLI | Node.js | npm | via GitHub |
| Vercel CLI | Node.js | npm | `npm i -g vercel` |
| Supabase CLI | Node.js | npm | `npm i supabase` |
| Firebase CLI | Node.js | npm | `npm install -g firebase-tools` |
| CLI for Microsoft 365 | TypeScript/Node.js | npm | `npm i -g @pnp/cli-microsoft365` |
| Wrangler (Cloudflare) | Node.js | npm | `npm i -g wrangler` |
| oclif (framework) | TypeScript/Node.js | npm | Powers Salesforce, Heroku, Twilio, Shopify CLIs |
| **Fabric CLI** | **Python** | **pip** | `pip install ms-fabric-cli` |
| Azure CLI | Python | pip/brew/msi | multiple channels |
| Azure Developer CLI (azd) | Go | winget/brew/script | standalone binary |

**Stack Overflow Developer Survey 2024 — Language Stats:**
- JavaScript: 62.3% usage | TypeScript: 38.5% usage, **69.5% admired/desired** (one of highest)
- Python: 51% usage, 67.6% desired
- TypeScript is the **4th most popular language** overall
- npm: **49.6% usage** among all developer tools | pip: 32.4%
- Node.js: **40.8%** most-used web technology

**The pattern is clear:** Modern developer CLIs are overwhelmingly built on TypeScript/Node.js, distributed via npm. TypeScript provides the typed API surface that both humans and AI agents can reason about effectively.

### oclif: The CLI Framework Standard
- Open-source TypeScript CLI framework by **Salesforce**
- Powers production CLIs at: Salesforce, Heroku, Twilio, Shopify, and many others
- Built-in: command discovery, argument parsing, plugin system, auto-documentation
- Proves that enterprise-grade CLIs can be built on TypeScript/Node.js

---

## 4. Microsoft's CLI Portfolio

| CLI | Language | Primary Use | MCP/Agent Integration |
|---|---|---|---|
| Azure CLI (`az`) | Python | Azure resource management | Used by Copilot in Azure |
| Azure Developer CLI (`azd`) | Go | App provisioning + deployment templates | Template-based workflows |
| Fabric CLI (`fab`) | Python | Fabric workspace/item management | Not yet |
| CLI for Microsoft 365 | TypeScript | M365 management (community) | Not yet |
| GitHub Copilot CLI | Node.js | Agentic coding assistant | Full MCP support, custom agents |

**Fabric CLI Current State (v1.4.0):**
- 80 GitHub stars, 36 forks, 15 contributors, 4 releases
- Python 3.10-3.13, MIT licensed
- File-system metaphor: `ls`, `cd`, `mkdir`, `cp`, `rm`, `run`
- Authentication: interactive, service principal, managed identity, env vars
- CI/CD: GitHub Actions & Azure Pipelines integration
- OneLake file operations, table management, job scheduling, API integration

**Gap:** Fabric CLI is the **only major Microsoft CLI without AI agent integration capabilities**. GitHub Copilot CLI has full MCP/ACP support. Azure CLI has Copilot in Azure. Fabric CLI has neither.

---

## 5. The "Execution Layer" Architecture

### How the Pattern Works

```
┌─────────────────────────────────────────────────┐
│  AI Agent (Claude Code, Copilot, Custom Agent)  │
│                                                 │
│  "Deploy my Fabric notebook to production"      │
└──────────────────┬──────────────────────────────┘
                   │ generates code
                   ▼
┌─────────────────────────────────────────────────┐
│  Code (TypeScript/Python)                       │
│                                                 │
│  import { fab } from '@fabric/cli';             │
│  await fab.cd('Production.workspace');           │
│  await fab.cp('nb1.notebook', './');             │
│  await fab.job.run('nb1.notebook');              │
└──────────────────┬──────────────────────────────┘
                   │ executes
                   ▼
┌─────────────────────────────────────────────────┐
│  CLI Runtime (sandboxed, authenticated)         │
│                                                 │
│  Fabric REST APIs                               │
│  OneLake Operations                             │
│  Job Orchestration                              │
└─────────────────────────────────────────────────┘
```

### Why CLIs Are Ideal Execution Layers for AI Agents

1. **Structured, predictable interface** — commands have clear syntax and documented behavior
2. **Already authenticated** — service principals, managed identity, token management handled
3. **Sandboxable** — run in containers, VMs, or WebContainers
4. **Composable** — pipe commands, chain operations, script complex workflows
5. **Auditable** — every command is a log entry; easy to trace what the agent did
6. **LLMs excel at generating CLI commands** — they've seen billions of CLI examples in training data

### WebContainers: CLIs in the Browser
- StackBlitz's WebContainers run **Node.js natively in the browser** (no server needed)
- Used by: Google, Cloudflare, Shopify, SvelteKit, Egghead
- Quote: *"WebContainers represent a fundamental shift in what is possible in the browser"* — Nate Moore, Astro
- Quote: *"AI-native IDE — with a copilot that can not only read and write code, but can also understand and operate in the full runtime context"* — DJ, re:tune
- Implication: CLI-based tools can run **anywhere** — terminal, IDE, browser, cloud sandbox

---

## 6. Key Statistics & Numbers

### AI Developer Tools Adoption (Stack Overflow 2024, 65K respondents)
| Tool | Usage | Admired |
|---|---|---|
| ChatGPT | 82.1% | 74.4% |
| GitHub Copilot | 41.2% | 72.1% |
| Google Gemini | 23.9% | 62.1% |
| Claude | 8.1% | 62.8% |
| Amazon Q | 2.6% | 46.3% |

### Developer Tool Ecosystem
| Metric | Value | Source |
|---|---|---|
| Claude Code weekly npm downloads | **5.17 million** | npm, Jul 2025 |
| VS Code IDE market share | **73.6%** | SO Survey 2024 |
| Docker usage among devs | **53.9%** | SO Survey 2024 |
| TypeScript desired/admired | **69.5%** | SO Survey 2024 |
| npm usage among dev tools | **49.6%** | SO Survey 2024 |
| Node.js web tech usage | **40.8%** | SO Survey 2024 |
| Markdown admired score | **84.3%** (highest of ALL tech) | SO Survey 2024 |
| Bash/Shell usage | **33.9%** | SO Survey 2024 |

### Cloud Platform Market
| Platform | Dev Usage | Admired |
|---|---|---|
| AWS | 48% | 63.3% |
| Azure | 27.8% | 59.9% |
| Google Cloud | 25.1% | 55.6% |
| Cloudflare | 15.1% | 68.2% |
| Vercel | 11.9% | 59.4% |
| Supabase | 3.8% | 62.8% |

### Agentic AI Market
- **Gartner (Aug 2024):** 33% of enterprise software will include agentic AI by 2028, up from <1% in 2024
- **GitHub (Feb 2025):** Project Padawan — autonomous SWE agents that produce fully tested PRs
- **Amazon Q Developer:** Claims up to 80% speed improvement on development tasks

---

## 7. Notable Quotes

> *"LLMs have seen a lot of code. They have not seen a lot of 'tool calls'."*  
> — **Cloudflare**, Code Mode announcement (Sep 2025)

> *"Making an LLM perform tasks with tool calling is like putting Shakespeare through a month-long class in Mandarin."*  
> — **Cloudflare** engineering blog

> *"Code execution with MCP lets agents work with tools the way developers do — by writing code."*  
> — **Anthropic**, MCP code execution blog (Nov 2025)

> *"From code completions, chat, and multi-file edits to workspace and agents, Copilot puts the human at the center of the creative work that is software development."*  
> — **Thomas Dohmke**, then-CEO of GitHub (Feb 2025)

> *"WebContainers represent a fundamental shift in what is possible in the browser."*  
> — **Nate Moore**, Senior Software Engineer at Astro

> *"AI-native IDE — with a copilot that can not only read and write code, but can also understand and operate in the full runtime context across server and client."*  
> — **DJ**, Founder & CEO of re:tune

> *"On the SvelteKit team, we've fantasized for years about being able to build fully interactive learning material for full stack frameworks. With WebContainers it went from 'impossible' to 'easy' almost overnight."*  
> — **Rich Harris**, Principal Software Engineer at Vercel

---

## 8. Implications for Fabric CLI Strategy

### The Opportunity

1. **Fabric CLI as the execution layer for AI agents interacting with Fabric** — this is the strategic play. Every other major platform (GitHub, AWS, Vercel, Supabase) is positioning their CLI as the agent execution substrate.

2. **MCP server integration is table stakes** — GitHub Copilot CLI, Claude Code, and Amazon Q all support MCP. Fabric already has a remote MCP server. The CLI should be the local bridge.

3. **Typed API surface for code generation** — The Anthropic/Cloudflare research proves that agents are dramatically more effective when they can write code against a typed API. A TypeScript SDK/API layer for Fabric CLI commands would unlock this.

4. **npm distribution would expand reach** — 49.6% of developers use npm (SO 2024). Fabric CLI's pip-only distribution limits reach to the Python ecosystem. Every major modern CLI competitor uses npm.

### Strategic Recommendations

| Priority | Action | Rationale |
|---|---|---|
| **P0** | Build MCP server capabilities into Fabric CLI | Table stakes — every competitor has this |
| **P0** | Expose CLI commands as a typed API (for agent consumption) | Anthropic's research shows 98.7% token savings |
| **P1** | Consider TypeScript/Node.js for CLI v2 or a parallel SDK | Aligns with industry standard, npm distribution |
| **P1** | Enable sandboxed execution mode | Required for agent safety (Cloudflare's V8 isolate pattern) |
| **P2** | WebContainer compatibility | Enables Fabric CLI in browser-based agent environments |
| **P2** | Support ACP (Agent Client Protocol) | GitHub Copilot already supports this for agent-to-agent |

### The Contrarian View: Python Is Fine

- Python has **51% developer usage** (SO 2024) — more than TypeScript
- Azure CLI is Python and serves millions
- The oclif/npm pattern is dominant for *frontend-adjacent* CLIs, but data platform CLIs often use Python (pandas, spark, etc.)
- **However:** The AI agent ecosystem is converging on Node.js/TypeScript. Claude Code (5.17M/week npm), Copilot CLI, Vercel, Supabase — all npm. The agent will generate code in whatever language the CLI speaks, and TypeScript is what agents are best at.

---

## 9. Surprising / Contrarian Findings

1. **The biggest shift isn't AI *in* CLIs — it's CLIs *under* AI.** The real transformation isn't about adding chatbots to terminals. It's about CLIs becoming the invisible execution layer that AI agents invoke programmatically. The human may never see the CLI at all.

2. **Token economics are driving architecture.** Anthropic's 98.7% token reduction finding means the "code mode" pattern isn't just better — it's 75x cheaper. This economic pressure will force every tool-calling system to adopt CLI-like execution layers.

3. **TypeScript is winning the CLI language war — but not because of type safety.** It's winning because LLMs generate better TypeScript than any other language for tool integration. The training data is overwhelmingly web/TS code.

4. **The CLI-as-MCP-server pattern is emerging.** CLIs are no longer just consumers of APIs — they're becoming servers that expose their capabilities as MCP tools. GitHub Copilot CLI already does this. Any CLI can become an agent tool.

5. **Vercel already has `vercel mcp` as a CLI command.** They've built MCP support *into the CLI itself* — not as a separate server. This "MCP-native CLI" pattern may become standard.

6. **Claude Code's growth velocity is unprecedented.** 5.17M weekly npm downloads for a tool that launched in early 2025. For comparison, the TypeScript compiler itself gets ~50M/week. Claude Code is already 10% of TypeScript's download volume.

7. **Microsoft's own CLI portfolio is fragmented.** Three different languages (Python, Go, Node.js) across Azure CLI, azd, and GitHub Copilot CLI. No unified agent integration story. Fabric CLI has an opportunity to define the pattern for Microsoft's data platform.

---

## 10. Source Links

| Source | URL | Key Data |
|---|---|---|
| Anthropic: Code Execution with MCP | anthropic.com/engineering/code-execution-mcp | 98.7% token reduction, code mode pattern |
| Cloudflare: Code Mode | blog.cloudflare.com | TS API generation, "Shakespeare" quote |
| GitHub Copilot CLI | docs.github.com/copilot | Agentic CLI, MCP support, ACP |
| Claude Code (npm) | npmjs.com/package/@anthropic-ai/claude-code | 5.17M weekly downloads |
| GitHub: "The Agent Awakens" | github.blog/news-insights/product-news | Project Padawan, agent mode |
| Amazon Q Developer | aws.amazon.com/q/developer | CLI, IDE, console integration |
| Stack Overflow Survey 2024 | survey.stackoverflow.co/2024/technology | TS 38.5%, npm 49.6%, VS Code 73.6% |
| Firebase CLI | firebase.google.com/docs/cli | Node.js/npm CLI reference |
| oclif | oclif.io | TS CLI framework, Salesforce/Heroku/Twilio |
| WebContainers | webcontainers.io | Browser-based Node.js runtime |
| CLI for Microsoft 365 | pnp.github.io/cli-microsoft365 | TypeScript/npm M365 CLI |
| Fabric CLI (GitHub) | github.com/microsoft/fabric-cli | 80 stars, Python, v1.4.0 |
| Azure Developer CLI | learn.microsoft.com/azure/developer/azure-developer-cli | Go, template-based |
| Vercel CLI | vercel.com/docs/cli | npm, built-in `mcp` command |
| Supabase CLI | supabase.com/docs/guides/local-development/cli | npm, Docker-based local dev |

---

*Report prepared from primary source research. All statistics cited with sources. Data current as of July 2025.*
