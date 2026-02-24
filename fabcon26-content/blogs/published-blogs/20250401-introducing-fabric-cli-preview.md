---
title: "Introducing the Fabric CLI (Preview)"
author: "Hasan Abo Shally"
date: "2025-04-01"
url: "https://blog.fabric.microsoft.com/en-us/blog/introducing-the-fabric-cli-preview"
views: 89067
platform: "Microsoft Fabric Updates Blog"
categories:
  - Community
  - Fabric platform
  - Fabric Public APIs
  - Microsoft Fabric
  - Roadmap
status: "Published"
event: "FabCon Las Vegas 2025"
---

# Introducing the Fabric CLI (Preview)

## TL;DR

- The Fabric CLI is now in Preview.
- It offers a developer-first, file-system-inspired way to explore and manage Microsoft Fabric.
- Use it interactively or script it into your workflows — from your terminal, in seconds.
- Built on Fabric APIs, designed for automation, and constantly evolving.
- Open source is on the horizon — with plans to empower the community to extend and shape the CLI.

Give it a try. Break things. Tell us what you want next.

[Install the CLI and get started](https://aka.ms/fabric-cli)

We're excited to announce that the Fabric Command Line Interface (CLI) is now available in public preview — bringing a fast, flexible, and scriptable way to work with Microsoft Fabric from your terminal.

## What is Fabric CLI?

The Fabric CLI is a command-line interface for Microsoft Fabric that brings a file-system-inspired, terminal-based way to interact with your Fabric environment.

It enables you to explore, manage, and automate workspaces, items, pipelines, and more — using familiar commands like `ls`, `cd`, and `run`.

Use it interactively or script it into your workflows. It's designed to be fast, intuitive, and developer-friendly — but also approachable for analysts, admins, and anyone working with Fabric every day.

## Why We Built the Fabric CLI

At Microsoft, we've long envisioned Fabric as the operating system for data — a unified, end-to-end platform where developers and data professionals can work seamlessly across the entire data stack. The Fabric CLI is a step in that direction.

We asked ourselves: *What if working with Microsoft Fabric felt as natural as navigating your local file system?* That question shaped everything.

The CLI introduces a developer-first experience, inspired by the file systems we all know and love — where workspaces behave like directories, pipelines and notebooks act like files, and terminal commands become your interface for productivity.

Sure, it reduces clicks and speeds things up — but more importantly, it brings us closer to a world where interacting with Fabric feels more intuitive, scriptable, and familiar.

CLI is part of a broader effort to empower developers with the tools they expect, and help make Fabric feel like home for anyone building on it.

## Who is Fabric CLI for?

While the CLI is built with developers in mind, it's not just for developers.

Its simplicity and file-system-inspired structure make it approachable for:

- **Data analysts** who want to explore and run items more efficiently
- **System administrators** who manage Fabric environments at scale
- **Power users** who want to automate routine tasks or build repeatable workflows

Whether you're exploring, scripting, or scaling operations — the CLI is here to help you move faster, stay focused, and do more with Fabric.

## What You Can Do Today with the Fabric CLI

The Fabric CLI is built on top of public Microsoft Fabric REST APIs, but wraps them in a simpler, more intuitive command layer — designed for developers who want to work faster, automate more, and stay in flow.

It supports two primary ways of working:

### Interactive mode

Run `fab auth login`, and you'll enter an interactive shell where you can navigate and operate on Fabric just like a file system:

```bash
fab auth login
fab:/$ ls
fab:/$ cd ws1.workspace
fab:/ws1.workspace$ job start dp1.datapipeline
```

### Command-Line mode (Scripting)

Run commands in the same way you're used to. Use commands directly by prefixing them with `fab` — ideal for scripting and CI/CD:

```bash
fab job start ws1.workspace/dp1.datapipeline
```

## The Fabric CLI in Action

*Watch: a quick CLI demo showing navigating and creating workspaces and running a simple data pipeline.*

## What Developers Are Exploring with the Fabric CLI

One early user put it best:

> "It's like Fabric just got a terminal. This is exciting."

Here are a few use cases our early users have been exploring with the Fabric CLI:

- **Building and testing Fabric projects locally** — with the same fluency they expect from working with code and developer tools.
- **Scripting dev or demo environments** — spinning up workspaces and deploying items in seconds.
- **Integrating with GitHub Actions or Azure DevOps** — automating pipelines, lakehouses, and report deployments.
- **Chaining commands with Bash / PowerShell** — to streamline multi-step data workflows.

## What's Next

The Fabric CLI is just getting started — and we're building it to grow with you.

We'll continue to evolve it, focusing on three key pillars:

- **Expanding capabilities** — As new Fabric APIs and item types are released, we'll bring them into the CLI so you can script, automate, and explore even more of the platform with simple commands.
- **Investing in developer experience** — From smarter help, autocomplete and better output formatting and querying to integrating within other tools — we're making the CLI faster, clearer, and more intuitive for day-to-day use.
- **Opening it up to the community** — We're working toward open-sourcing the Fabric CLI, so developers can extend it with new commands, build their own tooling on top of it, and benefit from what others in the community create.

We believe the best CLI is one that's built with developers, not just for them — and we're looking forward to taking that next step with you.

## Next Steps: Ready to Try It?

The Fabric CLI is live in preview and it's ready when you are.

Getting started takes less than a minute:

```bash
pip install ms-fabric-cli
```

Then just run:

```bash
fab auth login
fab ls
```

Whether you want to explore Fabric like a file system, automate deployments, or integrate with your CI/CD pipelines — the CLI is here to make it faster, simpler, and more fun.

We can't wait to see what you build.

Find out more information in our [documentation](http://aka.ms/Fabric-CLI).
