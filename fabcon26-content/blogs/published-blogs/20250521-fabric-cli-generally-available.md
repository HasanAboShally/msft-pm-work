---
title: "Fabric CLI: explore and automate Microsoft Fabric from your terminal (Generally Available)"
author: "Hasan Abo Shally"
date: "2025-05-21"
url: "https://blog.fabric.microsoft.com/en-us/blog/fabric-cli-is-now-generally-available-explore-and-automate-microsoft-fabric-from-your-terminal"
views: 49245
platform: "Microsoft Fabric Updates Blog"
categories:
  - Announcements
  - Fabric platform
  - Fabric Public APIs
  - Microsoft Fabric
  - Roadmap
  - Uncategorized
status: "Published"
milestone: "CLI GA"
---

# Fabric CLI: Explore and Automate Microsoft Fabric from Your Terminal (Generally Available)

During FabCon Las Vegas, we introduced the Fabric CLI — a developer-first command-line tool that brings a familiar, file-system-like experience to working with Microsoft Fabric.

Since then, thousands of developers have jumped in: exploring, scripting, and embedding the CLI into local workflows. But for many enterprise teams, one question kept coming up: "When will it be GA? We want to use it in production."

We're happy to say: **that moment is here!**

**The Fabric CLI is now generally available** — fully supported for production use, backed by Microsoft's SLA, and built to meet the security, compliance, and reliability standards our customers expect. From CI/CD pipelines to deployment automation and governance scenarios, the CLI is ready for real-world environments, and you can confidently adopt it in production!

## Recap — What is the Fabric CLI?

*"A game-changer for automation with Fabric"* as one MVP described it. The Fabric CLI is a command-line interface for Microsoft Fabric that gives you a fast, scriptable, and intuitive way to work with your data estate.

It's built on a simple idea: **treat Fabric like a file system.**

- Navigate workspaces and items using familiar commands like `cd`, `ls`, `cp`, and `rm`.
- Explore and edit metadata without jumping to the browser.
- Automate deployments and CI/CD workflows using your preferred scripting language.
- Choose between interactive mode for daily tasks or non-interactive mode for pipelines and automation.

Whether you're managing reports, pipelines, Lakehouses, or semantic models — the CLI makes Fabric more accessible to developers and DevOps teams.

Curious about the ideas behind the CLI and why we built it this way? Check out the blog post [Introducing the Fabric CLI (Preview)](https://blog.fabric.microsoft.com/blog/introducing-the-fabric-cli-preview).

## Growing Ecosystem, Real Adoption

Since launch, the CLI has quickly become more than just a standalone tool — it's evolving into a growing ecosystem of documentation, templates, and automation assets built by both the team and the community.

Here's where to dive in:

- **Official Docs & Cheat sheet** — Get started fast with the new documentation site: [microsoft.github.io/fabric-cli](https://microsoft.github.io/fabric-cli). Includes usage examples, command reference, exit codes, flags, and a handy CLI cheat sheet.
- **fab-demos** — This [demo repository](https://github.com/murggu/fab-demos) by Aitor Murguzur includes end-to-end examples of deploying Fabric items using the CLI in Bash and Python — great for learning and extending.
- **CI/CD Sample: Power BI Deployment** — Check out [Rui Romano's sample repo](https://github.com/RuiRomano/fabric-cli-powerbi-cicd-sample) for a full GitHub Actions pipeline that promotes Power BI assets using the Fabric CLI.

## Real-World Automation in Action

*Automating workspace lifecycles with GitHub and the Fabric CLI. Credit: Peer Grønnerrup — [original blog post](https://peerinsights.hashnode.dev/automating-feature-workspace-maintainance-in-microsoft-fabric)*

From the start, the Fabric CLI was designed to empower real DevOps workflows — not just local exploration. And in just a few weeks, the community has already started proving what's possible.

One standout example is a recent blog post by Microsoft MVP [Peer Grønnerrup](https://peerinsights.hashnode.dev/automating-feature-workspace-maintainance-in-microsoft-fabric), where he shares how the CLI can be used to dynamically manage feature workspaces using GitHub Actions.

The approach uses:

- **YAML-based 'recipes'** to declaratively define workspace setup.
- **Service principal authentication** for secure, headless automation.
- **GitHub Actions integration** to automatically create or delete workspaces in response to branch activity.

This pattern is especially valuable for teams working in layered architectures, or those implementing metadata-driven CI/CD in Fabric.

> "The Fabric CLI builds on the APIs to make automation more intuitive and accessible than ever."
>
> — Peer Grønnerrup, Microsoft MVP

More broadly, this is a great example of how the CLI can be embedded into real-world production workflows. Whether you're managing workspace lifecycles, automating metadata changes, or orchestrating environment promotion — the CLI gives you the control and flexibility to do it programmatically and securely.

Read Peer's full post → [Automating Feature Workspace Maintenance in Microsoft Fabric](https://peerinsights.hashnode.dev/automating-feature-workspace-maintainance-in-microsoft-fabric)

## What's New Since the Preview?

While our main focus over the past few weeks was hardening the CLI for production readiness, we still shipped several improvements based on early user feedback.

Here's a quick look at what's been added or refined since the preview:

- Support for new Fabric items like **Variable Library** and **CopyJob**.
- Improved authentication and reliability for edge cases (e.g. service principal login, gateway connections, file path handling).
- Enhanced usability with **clearer error messages** and better handling of logs and output.
- **Documentation updates** including version support disclaimers and expanded usage examples.

We've kept the changes focused and purposeful — ensuring stability, clarity, and smooth adoption across a wide range of environments.

Want the full changelog? Refer to the [Release Notes](https://microsoft.github.io/fabric-cli/release-notes).

## Quick Start

Getting started with the Fabric CLI takes less than a minute. If you've already been using the preview, just upgrade — no flags are needed.

```bash
# Install or upgrade the CLI
pip install --upgrade ms-fabric-cli

# Sign in interactively
fab auth login

# List your workspaces
fab ls
```

That's it — you're ready to navigate, manage, and automate your Fabric environment from the terminal.

Check out the full [documentation and examples](https://microsoft.github.io/fabric-cli) for more.

## What's Next

General availability is just the beginning.

We're already working on the next wave of improvements to make the Fabric CLI even more powerful, flexible, and developer-friendly.

Here's what's coming soon:

- **Expanding Capabilities** — New commands to support more Fabric APIs and workloads.
- **Developer Experience** — Autocomplete, better output formatting, and even AI-assisted interactions.
- **Open Source** — Plans to open-source the CLI and empower the community to shape its future.

*Python 3.13 Support is on the way — thanks for your patience!*

## Try It Today & Show Us What You Build

> The Fabric CLI is now ready for your production pipelines. Whether you're automating deployments, managing metadata, or scaling governance across your tenant — it's built to help you move faster with confidence.

But we didn't build it alone.

A huge thank you to every customer and community member who joined the private preview, tested the preview, and shared feedback, ideas, and bug reports. Your insights directly shaped this release — from auth flows to error messages to real-world edge cases.

You're still shaping it. And that makes us even more excited about what's ahead.

**Later this year, we plan to open source the Fabric CLI — and build it in the open, together.** Because the best developer tools aren't just built for developers — they're built with them.

> Let's keep building!
