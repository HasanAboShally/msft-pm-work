# Fabric CLI v1.5 Is Here

> **Status:** DRAFT — for FabCon Atlanta, March 2026  
> **Author:** Hasan Abo Shally  
> **Categories:** Announcements, Community, Fabric Platform, Fabric Public APIs, Microsoft Fabric, AI

---

Since we [open-sourced the Fabric CLI](https://blog.fabric.microsoft.com/en-us/blog/fabric-cli-open-source-ai-ready-and-more-powerful) last October and released v1.1.0, we've shipped four more releases — v1.2.0, v1.3.1, v1.4.0, and now v1.5 — each driven by real feedback from developers, data engineers, and the community. The pace has been fast: new item types, new scenarios, new contributors, and some features we've wanted since day one.

v1.5 is the release we're announcing at FabCon Atlanta, and it's the most scenario-driven update yet. Rather than walking through a feature list, we want to tell you what these features unlock — for CI/CD teams, for Power BI professionals, for developers who work with AI agents, and for anyone who just wants a faster, friendlier way to get things done in Fabric.

Let's dig in.

---

## CI/CD: From Scripts to Pipelines — in Minutes

One of the most-requested capabilities since GA has been a first-class deployment story. Many of you have been stitching together `export`, `import`, and `cp` commands into custom scripts to promote items across workspaces. It works — but it shouldn't require that much effort.

**v1.5 introduces the `deploy` command**, which wraps the [fabric-cicd](https://github.com/microsoft/fabric-cicd) Python library and exposes it as a single CLI operation. The CLI now ships with `fabric-cicd` bundled, so deploying items from a Git-connected workspace to a target workspace is as straightforward as:

```bash
fab deploy "Dev.Workspace" --target "Prod.Workspace"
```

This works in local terminals, in GitHub Actions, in Azure DevOps Pipelines — anywhere the CLI runs. Combined with Service Principal authentication (`fab auth login -u <client_id> -p <secret> --tenant <tenant_id>`) and federated credentials for GitHub OIDC, you can set up fully automated, zero-touch deployments that fit modern DevOps practices.

**What this unlocks:**
- **Git-based promotion.** Connect your development workspace to a Git repo, author items there, and use `fab deploy` to push changes to staging or production.
- **Pipeline-native deployments.** Drop `fab deploy` into your CI/CD YAML and get Fabric deployments that run alongside your application deployments — same pipeline, same triggers, same audit trail.
- **Branch-and-merge workflows.** Use selective branching in feature workspaces, test changes, merge PRs, and deploy — the same workflow your engineering teams already use.

<!-- TODO: Add image showing a GitHub Actions pipeline with fab deploy step -->

If you've been running the FabCon EU CI/CD workshop pattern — Terraform for provisioning, Git integration for source control, and custom scripts for deployment — the `deploy` command replaces that last piece with a single, supported command.

---

## Power BI: The CLI Speaks Your Language Now

The Fabric CLI was built on Fabric APIs, which means it's always been strong for notebooks, lakehouses, pipelines, and the broader data engineering surface. But Power BI has the largest user base in Fabric, and until now, using the CLI for Power BI workflows meant reaching for `fab api -A powerbi` and constructing raw REST calls.

v1.5 changes that. We're adding dedicated Power BI commands that turn multi-step API calls into single operations:

- **`fab refresh`** — trigger a semantic model refresh and optionally wait for it to complete. No more extracting workspace IDs and dataset IDs, constructing POST bodies, and polling for status.
- **`fab query`** — execute DAX queries directly against a semantic model and get results in your terminal. Test measures, validate data, spot-check calculations — without opening Power BI Desktop.
- **`fab rebind`** — rebind a report to a different semantic model by path. Critical for PBIP (Power BI Project) workflows where developers need to quickly switch between development and production models.
- **Power BI via `fab set`** — update semantic model properties, refresh schedules, and other settings using the same `set` command you already use for other item types.

**What this unlocks:**

Imagine this scenario: you're a Power BI developer. You update a measure in your semantic model, deploy via `fab deploy`, refresh the model with `fab refresh`, and validate the numbers with `fab query "EVALUATE SUMMARIZE(...)"` — all from your terminal, all in under a minute. No portal clicks, no context switching.

For teams that manage dozens of semantic models, the ability to script refresh-and-validate sequences across models — and run them from a pipeline — eliminates hours of manual work.

```bash
# Deploy updated model, refresh, and validate
fab deploy "Dev.Workspace" --target "Prod.Workspace"
fab refresh "Prod.Workspace/Sales Model.SemanticModel" --wait
fab query "Prod.Workspace/Sales Model.SemanticModel" -q "EVALUATE ROW(\"Total\", [Total Revenue])"
```

---

## AI Agents: The CLI as an Execution Layer

Here's something that's been shifting beneath the surface since we open-sourced the CLI: AI agents have become one of the fastest-growing consumer groups of the CLI. Developers are connecting Fabric CLI to GitHub Copilot, Claude, Cursor, and other AI coding assistants — and using natural language to operate Fabric.

We've been investing to make this work well. Not as an afterthought, but as a first-class design principle.

### What we've built for agents

**Agent instructions file (`agents.md`).** The CLI now ships with a structured instructions file that AI agents can consume to understand the CLI's capabilities, command syntax, and critical rules. When you point your AI assistant at this file, it can generate correct `fab` commands from natural-language requests — without hallucinating flags or inventing commands that don't exist.

**The Fabric CLI Skill.** For AI platforms that support skill files (like Claude, Copilot agents, and others), we publish a dedicated [Fabric CLI skill](https://github.com/microsoft/fabric-cli) that goes beyond a command reference. It includes execution patterns (variable extraction, chaining commands, error handling), guardrails (what not to do), and scenario templates. The skill is designed so that an AI agent can autonomously explore your Fabric environment, create items, deploy changes, and run jobs — while respecting boundaries you set.

**AI-friendly error messages.** When a command fails, the CLI now surfaces structured error information that AI agents can parse and self-correct from. Instead of a human-friendly paragraph, agents get error codes, suggested fixes, and context that helps them retry intelligently.

**Interactive REPL mode.** v1.4 introduced `fab` as a standalone command to start an interactive session (REPL mode). This is particularly useful when paired with AI agents that maintain a persistent terminal session — the agent can `cd` into a workspace, explore, and operate without re-authenticating between commands.

### What this unlocks

Think about what becomes possible when an AI agent can fluently operate Fabric:

- *"Set up a new lakehouse, upload this CSV, and create a notebook that reads from it"* — the agent scaffolds the notebook code and uses the CLI to create items, upload data, and wire everything together.
- *"Deploy the latest changes to production and refresh all downstream models"* — the agent chains `deploy`, `refresh`, and `query` into a verified workflow.
- *"Check which notebooks failed last night and re-run them"* — the agent uses `fab job run-list`, filters failures, and re-triggers with `fab job run`.

Research from Anthropic shows that well-structured CLI tools reduce agent token consumption by up to 98.7% compared to raw API calls. The CLI isn't just convenient for agents — it's the most efficient execution substrate we can offer.

<!-- TODO: Consider adding a short GIF/video showing an AI agent using the CLI -->

---

## Developer Experience: Death by a Thousand Improvements

The big features tell the headline story, but developer experience lives in the details. Here's a selection of improvements across v1.2 through v1.5 that, taken together, transform the day-to-day feel of the CLI:

| Improvement | Version | Why It Matters |
|-------------|---------|----------------|
| **Python 3.13 support** | v1.4 | Run the CLI on the latest Python — no more version pinning |
| **JMESPath filtering in `ls`** | v1.3.1 | `fab ls -q "[?type=='Notebook']"` — filter results without piping to `jq` |
| **Notebook export as `.ipynb` or `.py`** | v1.4 | `fab export --format ipynb` — pick the format that fits your workflow |
| **Version notification on login** | v1.4 | The CLI tells you when a new version is available — no more running outdated builds |
| **Enhanced `set` command** | v1.3.1+ | Set any property within an item's definition or metadata — not just a curated list |
| **API response data in output** | v1.4 | See what the API actually returned, not just a success message |
| **`job run-rm`** | v1.3.1 | Remove scheduled jobs from the CLI — one less portal visit |
| **Block-path-collision flag** | v1.2 | `fab cp -bpc` prevents accidental overwrites when copying across workspaces |
| **Command & argument autocomplete** | v1.1 | Tab-completion that actually works — commands, paths, arguments |
| **Context persistence** | v1.1 | `cd` into a workspace once; subsequent commands remember where you are |

We've also expanded item type coverage significantly. The CLI now supports **50+ item types** including CosmosDB Databases, User Data Functions, Digital Twin Builders, Graph Query Sets, Dataflows, GraphQL APIs, Variable Libraries, Copy Jobs, SQL Databases, and more — with full CRUD (`mkdir`, `get`, `set`, `rm`, `cp`, `mv`, `import`, `export`) for the majority.

---

## Built by the Community

When we open-sourced the CLI in October 2025, we hoped the community would contribute. What happened exceeded our expectations.

Since the open-source launch, **community members have authored pull requests that shipped in production releases.** Their code is part of the CLI you install today. This isn't minor — it's features, bug fixes, optimizations, and documentation improvements that make the tool better for everyone.

### Contributors whose code shipped in v1.0 – v1.5

We want to recognize every individual who contributed code that made it into a release:

| Contributor | Highlights |
|-------------|------------|
| **[@aviatco](https://github.com/aviatco)** | API response output, REPL mode, JSON output formatting, dozens of bug fixes, error improvements |
| **[@may-hartov](https://github.com/may-hartov)** | Enhanced `set` command, DigitalTwinBuilder support, `set` blocklist refactor, autocomplete, polling optimization |
| **[@ayeshurun](https://github.com/ayeshurun)** | Python 3.13 support, SQLDatabase support, GraphQLApi items, workspace private links, documentation |
| **[@Guust-Franssens](https://github.com/Guust-Franssens)** | Version notification on login, auth output format fix, connection roles fix |
| **[@jdocampo](https://github.com/jdocampo)** | Folder support in `cp`/`mv`, federated credentials auth, custom files in `api`, connection fixes |
| **[@MahirDiab](https://github.com/MahirDiab)** | Context persistence, binary file download fix, table load fix |
| **[@murggu](https://github.com/murggu)** | VariableLibrary & CopyJob items, item overwrite support, binary export fix |
| **[@jkafrouni](https://github.com/jkafrouni)** | Notebook export format selection (`.ipynb` / `.py`) |
| **[@CSharplie](https://github.com/CSharplie)** | `job run-rm` command for removing scheduled jobs |
| **[@v-alexmoraru](https://github.com/v-alexmoraru)** | CosmosDBDatabase, UserDataFunction, GraphQuerySet item support |
| **[@ohadedry](https://github.com/ohadedry)** | `cp`/`mv` spaces fix, sensitivity label confirmation prompts |
| **[@orshemesh16](https://github.com/orshemesh16)** | Fixed `ls` sorting |
| **[@aliabufoul](https://github.com/aliabufoul)** | Documentation: sensitivity label clarity for `cp`, `get`, `mv`, `export` |
| **[@jeremydhoover-blip](https://github.com/jeremydhoover-blip)** | Documentation overhaul — homepage clarity, help text consistency |

And to the community members who opened issues, reported bugs, asked questions, and proposed ideas — you shape the roadmap just as much as code contributions do. Thank you.

<!-- TODO: Consider spotlighting 1-2 specific community stories / testimonials -->

---

## What's Coming Next

We're not slowing down. Here's a preview of directions we're actively working on:

- **Web CLI.** A browser-based CLI experience so you can use `fab` without installing anything — similar to Azure Cloud Shell. No local setup, no Python dependency.
- **CLI in Fabric Notebooks.** First-class `fab` support inside Fabric notebooks so data scientists and engineers can manage resources without leaving their notebook.
- **Community Scripts Library.** A curated catalog of reusable scripts for common scenarios — backup-and-restore, cross-workspace migration, bulk permission updates, environment cloning.
- **CLI MCP Server.** The CLI as a local MCP server, allowing AI tools to interact with Fabric through the MCP protocol directly — bridging the CLI and MCP experiences.
- **Docker image.** A containerized `fab` image for consistent CI/CD environments: `docker run mcr.microsoft.com/fabric-cli fab deploy ...`.

We build the roadmap in the open. Tell us what matters most: [open an issue](https://github.com/microsoft/fabric-cli/issues), start a discussion, or submit a PR.

---

## Get Started

```bash
# Install or upgrade
pip install ms-fabric-cli --upgrade

# Authenticate
fab auth login

# Explore
fab ls
```

- **Documentation:** [microsoft.github.io/fabric-cli](https://microsoft.github.io/fabric-cli/)
- **GitHub:** [github.com/microsoft/fabric-cli](https://github.com/microsoft/fabric-cli)
- **Full release notes:** [Release Notes](https://microsoft.github.io/fabric-cli/release-notes/)
- **Fabric CLI Skill for AI agents:** [fabric-cli/skill](https://github.com/microsoft/fabric-cli)

We built this update because of what you told us matters. Keep telling us. The best tools aren't just built for developers — they're built with them.

---

<!-- 
REVIEW NOTES:
- [ ] Confirm v1.5 version number and features are final before publishing
- [ ] Confirm `deploy` command syntax and fabric-cicd integration details
- [ ] Confirm Power BI commands (refresh, query, rebind) are shipping in v1.5
- [ ] Add images/GIFs for CI/CD pipeline, AI agent demo, and Power BI workflow
- [ ] Verify all contributor GitHub handles are correct  
- [ ] Get approval from community contributors to be named in the blog
- [ ] Add links to FabCon session recordings if applicable
- [ ] Final tone/legal review before publishing to blog.fabric.microsoft.com
-->
