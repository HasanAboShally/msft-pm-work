# Fabric DXA Strategy Summary
## Automation for Humans and Agents

**Team**: Alon Baram, Hasan Abo Shally, Evelina Alroy-Brin | **GPM**: Aviv Ezrachi  
**Date**: February 2026

---

## The Opportunity

| Metric | Current | Challenge |
|--------|---------|-----------|
| **API MAU** | 110K (+13% MoM) | Heavy users (>8 days/month): **NPS 12** vs 42 overall |
| **CLI MAU** | 1.4K (+17% MoM) | 90% of Fabric customers use automation tools |
| **Terraform MAU** | 489 (+6% MoM) | Most dissatisfied segment = highest growth potential |

**The Gap**: Professional developers are Fabric's most frequent users — and least satisfied.

---

## Vision

> **"Automation for humans and agents — intelligent, intuitive, and everywhere in Fabric."**

Transform Fabric into an **AI-native, programmable platform** where automation is intuitive, agentic, and deeply integrated.

---

## Five Strategic Directions

### 1️⃣ Scripting within Fabric
**Automate click-ops in the portal**

- New **Script Item** type for CLI scripts
- **Copilot Script Mode**: describe task → get script
- Shareable, schedulable, auditable
- Unlocks the "long tail" of automation

**Example**: Admin creates weekly cleanup script that scans workspaces, emails owners of inactive ones — all from Fabric.

---

### 2️⃣ VS Code Experiences  
**Pro-dev sandboxing and authoring**

- **Fabric Sandbox**: ephemeral workspace with anonymized data
- **Local MCP**: validate and iterate locally
- **Blueprint-to-Code**: export specs as Terraform/CLI
- One-click deployment to cloud

**Example**: Engineer spins up sandbox, debugs pipeline locally, promotes to production when ready.

---

### 3️⃣ Functions as MCP Tools
**Customer logic as callable operations**

- Publish notebooks, pipelines, stored procedures as **MCP tools**
- New **MCP Server Item** hosts custom tools
- Discoverable by Copilot and external agents
- API exposure included

**Example**: Finance team wraps "ComputeFinanceMetric" as MCP tool — Copilot can now invoke it.

---

### 4️⃣ Externalizing Agentic Capabilities
**Open Fabric to external AI agents**

- **Hosted MCP Server** exposes all Fabric operations
- External agents (GitHub Copilot, Claude, Azure AI) can connect
- **Agent identity**: SPNs, governance, audit trails
- Admin controls for external access

**Example**: GitHub Copilot extension spins up Fabric resources as you code.

---

### 5️⃣ AI-Powered Provisioning
**Declarative, repeatable, AI-assisted setup**

- Enhanced **Blueprints**: settings, roles, policies, governance
- **Blueprints as Code**: JSON/YAML/Terraform, version-controlled
- **AI-generated Blueprints**: natural language → workspace config

**Example**: "Create finance workspace with standard policies" → AI generates full Blueprint → one-command deploy.

---

## Who Benefits

| Persona | Key Directions |
|---------|----------------|
| **Professional Developers** | VS Code, Externalizing Agentic, AI Provisioning |
| **AI Agents** | All 5 directions |
| **Citizen Developers** | Scripting in Fabric, AI Provisioning |
| **CoE Leaders** | Functions as MCP Tools, AI Provisioning |

---

## Roadmap Overview

| Year | Focus | Key Deliverables |
|------|-------|------------------|
| **2026** | Foundation | Script Item, Fabric Sandbox, Local MCP GA, Cloud Shell MVP |
| **2027** | Scale | MCP Server Item, Hosted MCP, Blueprint-to-Code, Codespace Beta |
| **2028-29** | Convergence | Codespace GA, MCP Marketplace, Autonomous Agent Workflows |

---

## Success Metrics

| Metric | 2025 | 2027 | 2029 |
|--------|------|------|------|
| **API MAU** | 110K | 200K | 300K |
| **CLI MAU** | 1.4K | 15K | 30K |
| **Developer NPS** | 12 | 40 | 50+ |
| **Agent-initiated provisioning** | 0% | 15% | 30% |
| **Time to first deployment** | Hours | 15 min | <10 min |

---

## Strategic Alignment

| Leadership Priority | How We Deliver |
|--------------------|----------------|
| **Kim's P1.6**: "Delightful developer experiences" | CLI, APIs, VS Code, Codespace, MCP |
| **Unified Copilot** needs orchestration infrastructure | We own Hosted & Local MCP |
| **CI/CD Team** needs backend automation | APIs, CLI, Terraform |
| **CoE** needs reusable templates | Blueprints, Sandbox, provisioning APIs |

---

## Key Asks

1. **Endorse** the 5 strategic directions
2. **Clarify ownership** for Blueprint-to-Code, MCP Server Item
3. **Approve roadmap** phasing (Dir 1-2 in 2026, Dir 3-5 in 2027)
4. **Align resources** for hybrid approach (in-product + out-of-product)

---

## The Future We're Building

✅ Professional developers feel at home (Codespace, VS Code, CLI)  
✅ Citizen developers automate with confidence (Script Mode, Copilot)  
✅ AI agents are first-class citizens (Hosted MCP, agent identity)  
✅ Provisioning is declarative and AI-assisted (Blueprints as Code)  
✅ Fabric is the #1 AI-native, developer-friendly data platform (NPS 50+)

---

**Let's build automation for humans and agents.**
