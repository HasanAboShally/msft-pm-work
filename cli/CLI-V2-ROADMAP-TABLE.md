# Fabric CLI v2 Roadmap - FabCon Atlanta 🚀

> **Last Updated:** December 22, 2025  
> **Status:** Planning  
> **Target Event:** FabCon Atlanta

---

## 📋 Executive Summary

The Fabric CLI v2 roadmap focuses on eight strategic themes to transform the CLI into a comprehensive automation platform for Microsoft Fabric. Building on the success of v1.x (currently at v1.3.1 with 168+ releases since March 2025), this roadmap addresses the evolving needs of Fabric developers, data engineers, and platform administrators.

**Key Objectives:**
- 🤖 **AI-First Experience** – Deep integration with AI agents and intelligent automation
- 📈 **Adoption Growth** – Expand CI/CD capabilities and Power BI coverage to drive usage
- 😊 **Developer Happiness** – Streamlined UX improvements to boost NPS
- 🌐 **Broader Reach** – Web-based CLI access and seamless IDE integrations

**Current State (v1.3.1):**
- File-system inspired navigation (`ls`, `cd`, `mkdir`, `cp`, `mv`, `rm`)
- 50+ item types supported
- CI/CD integration (GitHub Actions, Azure Pipelines)
- Job management, table operations, ACL management
- Python 3.10-3.12 support

---

## 🎯 Priority Legend

| Priority | Definition | Target Timeline |
|----------|------------|-----------------|
| **P0** | Critical – Must have for FabCon | FabCon Atlanta |
| **P1** | High – Strong commitment | H1 2026 |
| **P2** | Medium – Planned | H2 2026 |
| **P3** | Low – Future consideration | 2027+ |

---

## 📊 Complete Roadmap Items (Stack Rank)

| # | Category | Item | Why | Priority | Notes |
|---|----------|------|-----|----------|-------|
| 1 | CLI+AI | `agents.md` file support | Enable AI agents to understand CLI context and provide contextual automation instructions | | Standardize agent instruction format |
| 2 | CLI+AI | AI-friendly error messages | Current errors optimized for humans; AI agents need structured, parseable error output for self-correction | | JSON error format with error codes |
| 3 | CLI+AI | Command to pull AI instructions | Allow users to fetch recommended AI prompts/instructions for common Fabric automation tasks | | `fab ai instructions <scenario>` |
| 4 | CLI+AI | CLI MCP server command | Enable CLI to act as an MCP server, allowing AI tools (VS Code Copilot, Claude, etc.) to interact with Fabric | | Hackathon project candidate |
| 5 | CLI+AI | Spec-driven CLI generation | Auto-generate CLI commands from API specifications to ensure coverage and consistency | | Reduces manual CLI development |
| 6 | CI/CD | Deploy command | Unified deployment experience integrating with CI/CD libraries (similar to `az deployment`) | | Integration with GH Actions, ADO Pipelines |
| 7 | CI/CD | Git commands | Native Git integration for Fabric items – critical for source control scenarios | | Check urgency with Nimrod |
| 8 | PowerBI | Semantic model query | Enable querying semantic models directly from CLI for testing and validation | | DAX query support |
| 9 | PowerBI | Semantic model refresh | Support refresh operations for semantic models and SQL endpoint metadata | | High-frequency user request |
| 10 | PowerBI | Rebind (local scenario) | Support rebind by path for local development scenarios | | Critical for PBIP workflows |
| 11 | PowerBI | Import + Set in one command | Streamline PBI deployment by combining import and configuration in single operation | | Reduces pipeline complexity |
| 12 | PowerBI | PBI API via `api` command | Ensure all PBI APIs are accessible through `fab api` with humanized output | | Needs validation of coverage |
| 13 | PowerBI | Multiple export formats | Support PBIX, PBIP, and raw definition export formats for reports | | Currently limited formats |
| 14 | Community | CLI Scripts Library | Curated collection of useful CLI scripts for common scenarios | | Community contest opportunity |
| 15 | Community | Community Contest | Engage community with script-writing contest; surface best practices | | Marketing/awareness driver |
| 16 | Community | Open source success stories | Showcase community contributions on stage or public recognition | | FabCon session opportunity |
| 17 | Integrations | CLI in Fabric Notebook | Enable CLI usage directly within Fabric notebooks for in-platform automation | | `%fab` magic command |
| 18 | Integrations | CLI in Fabric VSCode extension | Integrate CLI into Fabric VS Code extension for seamless local development | | Extension marketplace |
| 19 | UX | Simplified mode + `fab shell start` | Single mode with explicit shell command reduces confusion between interactive/command_line modes | | Breaking change consideration |
| 20 | UX | `get` returns values + keys | Current `get` only returns keys; users need values for automation and validation | | Frequently requested |
| 21 | UX | Raw API response option | Enable power users to access unprocessed API responses for debugging and custom parsing | | `--raw` flag |
| 22 | UX | Review and realign flags | Inconsistent flags across commands; standardization improves learnability | | Audit existing commands |
| 23 | UX | Global `cp`: local↔cloud, cloud↔cloud | Unified copy semantics across all source/destination combinations | | Currently fragmented |
| 24 | UX | `set` batch operations | Allow partial apply to items; reduce multiple `set` calls | | `set -i partial.json` |
| 25 | UX | Enhanced job commands (`run --async`) | Replace separate `run`/`start` with unified command + flags | | Aligns with common CLI patterns |
| 26 | UX | Preserve folder structure on export | Export workspace maintaining original folder hierarchy | | Critical for backup/migration |
| 27 | UX | Workspace import with folders | Support importing workspace structure including folders (vs. flat deploy) | | Complements folder export |
| 28 | UX | Python 3.9 support | Extend compatibility for users on older Python versions | | Dependency constraints |
| 29 | UX | Python 3.13 support | Support latest Python version (currently blocked per v0.2.0 notes) | | Requires dependency updates |
| 30 | UX | Export/import format support | Specify output formats in export/import commands | | JSON, YAML, etc. |
| 31 | UX | CLI as Docker image | Containerized CLI for consistent CI/CD environments | | `mcr.microsoft.com/fabric-cli` |
| 32 | UX | List items by type | Filter `ls` output by item type for cleaner results | | `fab ls -t Notebook` |
| 33 | UX | More job type support | Extend job commands to MVs, graphs, etc. | | Currently limited types |
| 34 | UX | Business Tags support | CRUD operations for business tags | | Governance feature |
| 35 | UX | Cascade Delete Workspace | Delete workspace with all contents in single operation | | `fab rm -r workspace` |
| 36 | Web CLI | Web-based CLI interface | Browser-accessible CLI for users without local installation capability | | Competitive parity (AWS CloudShell, Azure Cloud Shell) |
| 37 | Other | Sandbox command | Create destructible workspace/environment for risk-free experimentation | | `fab sandbox create` |
| 38 | Other | MCP server start | Local MCP server for AI tool integration | | `fab mcp server start` |

---

## 📂 Category Descriptions

| Category | Description |
|----------|-------------|
| **CLI+AI** | Transform the CLI into an AI-native tool with agent integration, MCP server capabilities, and AI-friendly outputs |
| **CI/CD** | Strengthen DevOps positioning with deployment workflows and Git integration |
| **PowerBI** | Expand PBI capabilities to drive adoption among the largest Fabric user segment |
| **Community** | Build ecosystem through scripts library, contests, and open source recognition |
| **Integrations** | Meet developers where they work – Notebooks, VS Code, and other IDEs |
| **UX** | Streamline developer experience, improve consistency, and boost NPS |
| **Web CLI** | Browser-based access for users without local installation capability |
| **Other** | Sandbox environments and additional MCP capabilities |

---

## 📊 Process & Measurement

| Area | Item | Description |
|------|------|-------------|
| Process | API capability assessment | Regular review of new Fabric APIs for CLI integration opportunities |
| Process | NPS measurement | Establish CLI-specific NPS tracking; research patterns from other CLIs (az, aws, gh) |
| Process | Gap analysis with Yaron | Review additional capability gaps with stakeholders |

---

## 📈 Success Metrics

| Metric | Current | Target | Notes |
|--------|---------|--------|-------|
| Monthly Active Users | TBD | +50% | Track via telemetry |
| NPS Score | TBD | >40 | Establish baseline |
| CI/CD Pipeline Integrations | TBD | 2x | GitHub + ADO |
| Community Scripts | 0 | 50+ | Library launch |
| GitHub Stars | TBD | +100% | Community engagement |

---

## 🔗 Resources

- **CLI Documentation:** [https://microsoft.github.io/fabric-cli/](https://microsoft.github.io/fabric-cli/)
- **GitHub Repository:** [https://github.com/microsoft/fabric-cli](https://github.com/microsoft/fabric-cli)
- **Command Reference:** [https://microsoft.github.io/fabric-cli/commands/](https://microsoft.github.io/fabric-cli/commands/)
- **CI/CD Examples:** [https://microsoft.github.io/fabric-cli/examples/#cicd-integration](https://microsoft.github.io/fabric-cli/examples/#cicd-integration)
- **Feature Requests:** [https://ideas.fabric.microsoft.com/](https://ideas.fabric.microsoft.com/)

---

*This roadmap is a living document. Items and priorities subject to change based on customer feedback, resource availability, and strategic direction.*
