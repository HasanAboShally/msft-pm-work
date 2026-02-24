# Fabric MCP Workload Onboarding Wiki

**Welcome!** This wiki helps Fabric workload teams add agentic capabilities to their products through MCP (Model Context Protocol).

> **Philosophy:** Self-serve first. We provide the knowledge, you drive the work.  
> **Our Role:** Guidance, quality review, infrastructure—not a bottleneck.

---

## 🎯 Quick Start: Which Path is Right for You?

| I want to... | Path | Time to Ship | Your Effort |
|--------------|------|--------------|-------------|
| Add tools to **existing Remote MCP** (Fabric APIs) | [Path A](#path-a-add-tools-to-remote-mcp) | 2 weeks | Low |
| Add tools to **Local MCP** (open source) | [Path B](#path-b-contribute-to-local-mcp) | 2-3 weeks | Medium |
| Build my **own workload MCP server** | [Path C](#path-c-build-your-own-mcp-server) | 4-6 weeks | High |

---

## 📚 Wiki Contents

| Document | Description |
|----------|-------------|
| [01-Onboarding Paths](01-ONBOARDING-PATHS.md) | Detailed guide for each contribution path |
| [02-Tool Design Guidelines](02-TOOL-DESIGN-GUIDELINES.md) | Naming, descriptions, schemas, best practices |
| [03-Versioning & Breaking Changes](03-VERSIONING-BREAKING-CHANGES.md) | How to evolve tools without breaking agents |
| [04-Intake Form Template](04-INTAKE-FORM-TEMPLATE.md) | What to prepare before engaging platform team |
| [05-Quality Checklist](05-QUALITY-CHECKLIST.md) | Self-assessment before review |
| [06-FAQ & Troubleshooting](06-FAQ.md) | Common questions answered |

---

## 🛤️ Path A: Add Tools to Remote MCP

**Best for:** Exposing existing Fabric public APIs to AI agents

**Process:**
1. ✅ Review [Tool Design Guidelines](02-TOOL-DESIGN-GUIDELINES.md)
2. ✅ Complete [Intake Form](04-INTAKE-FORM-TEMPLATE.md)
3. ✅ Submit request via [Microsoft Form](#intake-form-link)
4. ⏳ Platform team reviews & schedules (5 business days SLA)
5. ⏳ Joint review meeting (30 min)
6. ✅ Platform team implements, you validate
7. 🚀 Ship in next release

**Your responsibilities:** Provide API docs, validate implementation, write user docs  
**Platform team:** Implementation, hosting, auth, audit logging

---

## 🛤️ Path B: Contribute to Local MCP

**Best for:** Developer tools, VS Code/CLI integrations, open source contribution

**Process:**
1. ✅ Review [Tool Design Guidelines](02-TOOL-DESIGN-GUIDELINES.md)
2. ✅ Create tool spec (schema + examples)
3. ✅ Submit spec for review (optional but recommended)
4. ✅ Fork [microsoft/fabric-mcp](https://github.com/microsoft/fabric-mcp)
5. ✅ Implement tools following contribution guide
6. ✅ Open Pull Request
7. 🔍 Platform team reviews PR
8. 🚀 Merge & ship

**Your responsibilities:** Full implementation, tests, documentation  
**Platform team:** Code review, merge approval, release coordination

---

## 🛤️ Path C: Build Your Own MCP Server

**Best for:** AI-specific capabilities (DAX generation, KQL optimization, etc.)

**Process:**
1. ✅ Review [Tool Design Guidelines](02-TOOL-DESIGN-GUIDELINES.md)
2. ✅ Complete [Intake Form](04-INTAKE-FORM-TEMPLATE.md) with architecture proposal
3. ✅ Submit request via [Microsoft Form](#intake-form-link)
4. ⏳ Platform team reviews (5 business days)
5. 📞 Architecture review meeting (60 min)
6. ✅ Platform provides: endpoint URL, shared auth, audit logging infra
7. ✅ You build: tool logic, documentation
8. ✅ Complete [Quality Checklist](05-QUALITY-CHECKLIST.md)
9. 🔍 Final review with platform team
10. 🚀 Ship!

**Your responsibilities:** Tool implementation, SLA ownership, ongoing maintenance  
**Platform team:** Endpoint provisioning, shared infrastructure, quality review

---

## 📞 Getting Help

| Need | Channel |
|------|---------|
| **Questions & Discussion** | Teams: `Fabric MCP Platform` channel |
| **Office Hours** | Thursdays 10-11am PST (drop-in, no booking needed) |
| **Endpoint Request** | [Submit Intake Form](#intake-form-link) |
| **Urgent Issues** | Email: fabricmcp@microsoft.com |

---

## ⚠️ Guideline Severity Levels

We use severity levels to indicate flexibility:

| Level | Meaning | Example |
|-------|---------|---------|
| 🔴 **Required** (10) | Non-negotiable, blocks shipping | Security review completed |
| 🟠 **Strong** (7-9) | Should follow unless exception approved | Tool naming conventions |
| 🟡 **Recommended** (4-6) | Best practice, document if deviating | Async operation patterns |
| 🟢 **Suggested** (1-3) | Nice to have, your discretion | Example count in docs |

---

## 🔗 Quick Links

- [MCP Specification](https://modelcontextprotocol.io)
- [Fabric Public APIs](https://learn.microsoft.com/fabric/rest/api/)
- [Fabric MCP GitHub (Local)](https://github.com/microsoft/fabric-mcp)
- [Intake Form](#intake-form-link) *(Link TBD)*

---

**Questions?** Drop by Office Hours or post in the Teams channel. We're here to help you ship!
