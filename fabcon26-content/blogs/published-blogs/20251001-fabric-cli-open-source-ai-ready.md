---
title: "Fabric CLI: open source, AI-ready, and more powerful"
author: "Hasan Abo Shally"
date: "2025-10-01"
url: "https://blog.fabric.microsoft.com/en-us/blog/fabric-cli-open-source-ai-ready-and-more-powerful"
views: 56952
platform: "Microsoft Fabric Updates Blog"
categories:
  - AI
  - Announcements
  - Community
  - Fabric platform
  - Fabric Public APIs
  - Microsoft Fabric
  - Roadmap
  - Uncategorized
status: "Published"
milestone: "CLI Open Source + v1.1.0"
repo: "https://aka.ms/FabricCLI/repo"
---

# Fabric CLI: Open Source, AI-Ready, and More Powerful

The Fabric CLI is now open source — marking a major milestone in its evolution from a fast, intuitive, and scriptable interface for Microsoft Fabric into a community-driven platform for automation and exploration. Whether used interactively for ad-hoc operations or non-interactively in CI/CD pipelines, the CLI empowers developers to work efficiently and flexibly. With version 1.1.0, it delivers your top-requested features and key improvements, while opening the door to AI-assisted contributions that accelerate development without compromising quality. We're inviting the community to help shape what comes next — because the best tools aren't just built for developers, they're built with them.

## Introducing the Open-Source Fabric CLI

Earlier this year, we released the Fabric CLI as a fast, intuitive, and scriptable way to navigate and operate Microsoft Fabric from the terminal. In just a few months, we've watched the community embrace it in ways that surprised even us: automating complex deployment pipelines, pushing CI/CD scenarios, running it directly from Fabric notebooks, pinning it within VSCode, and even integrating it with AI agents. Teams lean on it in two core ways — interactively for exploration and ad-hoc operations, and non-interactively in CI/CD pipelines and other automation.

We're excited to open-source the CLI. This isn't just about transparency; it's about inviting you to help build the tool you use — because the best developer tools aren't just built for developers; they're built with them.

## Why Open Source — and Why Now

We're open sourcing the Fabric CLI because the best developer tools are built with their users: putting the code in public lets developers extend it, vet it, and co-own its direction so it delivers real customer value. We're doing it now because the CLI has matured and is broadly adopted in production; AI-assisted development makes it easier than ever to scaffold commands, tests, and docs; open ecosystems out-innovate closed ones when extension points are clear; and transparency builds trust — anyone can inspect how the CLI works, harden it, and help us move faster on the scenarios that matter across both interactive and automation workflows.

## What Open Sourcing Unlocks

- **Deeper customization** – Add new commands, enhance existing ones, and tailor flows to your organization.
- **AI-assisted development** – Use AI to scaffold changes, then refine with maintainers; quality rises while cycle time drops.
- **Better UX, together** – Improve output formatting, error messages, and discoverability so everyday tasks feel effortless.
- **Shared patterns** – Publish reusable scripts and extensions so common scenarios don't get reinvented.
- **New personas and scenarios** – Enable focused commands and extensions for admins, analysts, platform teams, and SREs — while keeping the core lean.

## What Open Sourcing the CLI Improves How You Use It

Currently, teams use the CLI in two main ways:

- **Interactively** for exploration and ad-hoc ops (browsing workspaces, inspecting items, experimenting during development).
- **Non-interactively** for automation — from CI/CD to scheduled jobs, notebook-triggered runs, and other automated workflows.

Open sourcing strengthens both paths: for interactive work it sharpens ergonomics (clearer errors, smarter help/autocomplete, tunable output), and for automation it hardens reliability (idempotent commands, consistent exit codes, better logging, dry-run support). It also helps co-develop new capabilities with peer developers and AI agents, quickly turning personal pains or solutions into solid features for the entire community.

## Open Source and AI — Amplifying Innovation

Making the CLI open source in the era of AI-assisted development isn't just symbolic; it changes how we evolve the tool. Value starts with you — developers and customers — surfacing real problems and imagining solutions. AI accelerates that journey by helping you experiment, prototype, and iterate. With the internals exposed, the loop gets tight: the community identifies a need, AI tools help scaffold a solution, and we refine it together.

This partnership between humans and AI unlocks scenarios we haven't yet imagined, amplifying the speed and impact of contributions. We'll work hand-in-hand with a thriving community to prioritize features; review pull requests and evolve the CLI in ways that bring value to everyone.

## Fabric CLI v1.1.0 is Here

Alongside open sourcing the CLI, we've been listening and shipping your top asks. v1.1.0 focuses on usability, reliability, connectivity, and laying groundwork for AI-assisted contributions.

- **Output formatting: JSON** — machine-readable output that's easy to parse in automation and pipelines.
- **Command & argument autocomplete** — faster interactive work with discoverable commands and fewer typos.
- **Folder support** — organize items in folders/subfolders and use predictable, path-like operations across large workspaces.
- **Context persistence (command-line mode)** — `cd` into a workspace/folder once; subsequent commands run relative to that context.
- **Workspace private links** — tighter network boundaries with private connectivity to secure environments.
- **AI-assisted contributions** — foundations that make it easier for AI agents (and humans!) to add new commands and capabilities.

Plus, a round of quality fixes and safety improvements based on your feedback. View the [Full changelog](http://github.com/microsoft/fabric-cli/releases).

## What's Next?

We're building the roadmap out in the open — and we want your voice in it. Here are a few directions we're actively exploring, and we'd love to hear your perspective as we shape what's next together:

- **Extensions, together.** We're investigating an extensions framework so teams can ship focused add-ons without touching core. We want your input on the right model (packaging, versioning, permissions, review) before we commit to a design.
- **Run the CLI where you work.** Early thinking on embedded/hosted experiences (e.g., inside the Fabric web experience or popular editors) so you can explore and act without context-switching.
- **Notebook & UDF execution.** Safer, auditable ways to run CLI scripts from notebooks or UDFs — with guardrails for idempotency, logging, and approvals.
- **Deployment ergonomics.** Stronger automation commands: workspace-as-code flows, richer promotion/deploy patterns, and git-friendly operations that fit modern pipelines.
- **Community solutions library.** A curated catalog of sample scripts/recipes for common tasks — easy to discover, easy to adapt.

Tell us what matters most: Which scenarios should an extension unlock? Where would an embedded CLI save the most time? What deployment commands or flows still feel clunky? Share ideas and proposals in the repo and we'll iterate together.

## How to Get Involved

- **Star & fork the repo** to follow progress and experiment locally.
- **Open issues or PRs** for features you'd like to see — small contributions (tests, docs, examples) are welcome and appreciated.
- **Promote your scripts.** If a script/notebook cell helped your team, propose it as a command or extension; use AI to scaffold, then iterate with maintainers.
- **Join discussions & reviews** to help shape design, UX, and priorities.

Open sourcing the Fabric CLI is just the start. With community insight and AI-assisted contribution, this tool will keep evolving from a fast, intuitive way of working into a platform for custom automation — built together.

Check out the [repo](https://aka.ms/FabricCLI/repo).
