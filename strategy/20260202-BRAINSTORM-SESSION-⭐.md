# DXA Strategy Brainstorm
## 30-Minute Working Session

**Date**: February 2026  
**Attendees**: PMs & Engineering Managers  
**Format**: Brainstorming — ideas are tentative, seeking input

---

## Setting the Stage

### What CAT Research Told Us

The CAT team conducted the most comprehensive professional developer research in Fabric history:
- **56 hours** of 1:1 interviews with professional developers
- **220 unique issues** mapped to Jobs-to-Be-Done
- **110 pro-devs surveyed** for opportunity analysis

### The Gap We Need to Close

| The Reality | The Opportunity |
|-------------|-----------------|
| **110K API MAU** — professional developers are Fabric's most frequent automation users | They're also **the least satisfied**: NPS 12 vs. 42 overall |
| **90%** of Fabric customers use automation tools | Top pain points: CI/CD, provisioning, monitoring, access management |
| Double-digit growth in API usage | "Highly underserved" on key jobs-to-be-done |

**The Question**: How do we enhance the lives of professional developers through intelligent automation?

---

## Five Directions for Discussion

We've identified five potential directions. Each stands alone, but they can be composed. **We want your input on prioritization, feasibility, and what we're missing.**

---

### 1️⃣ Help Developers Within the Portal
*Bringing developers INTO Fabric*

**The Idea**: Introduce scripting capabilities directly in the Fabric portal so admins and power users can automate repetitive click-ops without leaving Fabric.

**What This Could Look Like**:
- A new **Script Item** type for storing CLI scripts
- **Copilot Script Mode**: "clean up inactive workspaces" → generates a CLI script
- Scripts are shareable, schedulable, version-controlled
- Runs with proper identity (SPNs)

**Why It Matters**: 
- Unlocks the "long tail" — tasks too niche for full features, too frequent to stay manual
- Meets users where they already are (the portal)

**Discussion Questions**:
- What are the top click-ops we should target first?
- How do we balance simplicity vs. power?
- Security/governance implications?

---

### 2️⃣ Meet Developers Where They Are
*Bringing Fabric TO developers (VS Code)*

**The Idea**: Make Fabric a first-class experience in VS Code — local development, sandboxing, and seamless deployment.

**What This Could Look Like**:
- **Fabric Sandbox**: Spin up ephemeral workspaces with anonymized/dummy data for safe testing
- **Local MCP**: Validate pipelines and items locally before deploying
- **Blueprint-to-Code**: Export Fabric configurations as Terraform/CLI scripts
- One-click deployment from IDE to cloud

**Why It Matters**:
- Context switching costs ~23 minutes per interruption
- Developers expect Git workflows, local iteration, CI/CD integration
- VS Code is the #1 IDE

**Discussion Questions**:
- What's the right scope for "sandbox"? Temp workspace vs. true local emulation?
- How do we handle data seeding?
- Integration with existing Git/CI/CD workflows?

---

### 3️⃣ Help Customers Expose Their Business Logic
*Functions as MCP Tools*

**The Idea**: Let customers publish their own Fabric logic (notebooks, pipelines, stored procedures) as MCP tools that AI agents can discover and invoke.

**What This Could Look Like**:
- Wrap a notebook as an MCP tool with name, description, parameters
- New **MCP Server Item**: a container of custom tools hosted by Fabric
- Tools are discoverable by Copilot and external agents
- Governed, auditable, secure

**Why It Matters**:
- Aligns with **Fabric IQ** and the current AI/agent hype
- Customers want to create MCP tools — we can provide a safe, governed way
- Positions Fabric as an **operational platform**, not just analytics

**Example**: 
Finance team has a proprietary "ComputeFinanceMetric" calculation. They wrap it as an MCP tool → Copilot (or any agent) can now invoke it.

**Discussion Questions**:
- What's the right abstraction? Item-level? Workflow-level?
- How do we handle discoverability? Marketplace? Registry?
- Security model for custom tools?

---

### 4️⃣ Give External Agents the Power of Internal Agents
*Externalizing Agentic Capabilities*

**The Idea**: Fabric Copilot uses MCP tools internally. Let's expose those same capabilities to **external agents** — GitHub Copilot, Claude, Azure AI, custom agents.

**What This Could Look Like**:
- **Hosted MCP Server**: Unified endpoint exposing all Fabric operations as MCP tools
- **Agent Identity**: External agents get proper identity (SPNs), governance, audit trails
- Admin controls: approve/restrict access, define scopes, enforce read-only modes
- Every agent action = same permission checks as a human user

**Why It Matters**:
- 87% of developers use AI assistants
- MCP is becoming the "HTTP for AI agents"
- Fabric becomes "headless" — anything you can do in the portal, an agent can do via API

**Example**:
GitHub Copilot extension spins up Fabric resources as you write code. An Azure AI agent publishes reports to Fabric as part of a larger workflow.

**Discussion Questions**:
- How do we handle identity for external agents?
- What governance controls do admins need?
- How do we balance openness with security?

---

### 5️⃣ Expand Blueprints: Code, Policies, and Beyond
*AI-Powered Provisioning*

**The Idea**: Expand Blueprints from "item templates" to a full Infrastructure-as-Code (IaC) experience that includes policies, governance rules, and external integrations.

**What This Could Look Like**:
- **Blueprints as Code**: Express blueprints as JSON/YAML/Terraform, version-control them
- **Policy Integration**: Reference organizational policies (naming conventions, access controls, Azure policies)
- **AI-Generated Blueprints**: "Create finance workspace with our standard policies" → AI generates full config
- Connect to things **outside Fabric**: Azure policies, Entra ID, compliance rules

**Example**:
User says: "Create a workspace for the finance team with standard policies."
AI generates Blueprint that includes:
- Workspace with naming convention
- Role assignments per company policy
- Azure policy compliance
- All items pre-configured

One command → fully configured, governed workspace.

**Why It Matters**:
- Provisioning today is 20+ manual steps
- Configuration drift between environments
- Organizations need consistency + compliance

**Discussion Questions**:
- How do we integrate with Azure policies / external governance?
- What's the right level of AI assistance?
- How do we handle cross-workspace / cross-environment scenarios?

---

## Summary: The Five Directions

| # | Direction | One-Line Summary |
|---|-----------|------------------|
| 1 | **Portal Scripting** | Help developers automate click-ops without leaving Fabric |
| 2 | **VS Code Experiences** | Meet developers in their IDE with sandboxing and local dev |
| 3 | **Functions as MCP Tools** | Let customers expose business logic to AI agents |
| 4 | **Externalizing Agentic** | Give external agents the power of internal Copilot |
| 5 | **Blueprint Expansion** | IaC + policies + AI-assisted provisioning |

---

## What We Need From You

1. **Prioritization**: Which directions are most impactful? Most feasible?
2. **Gaps**: What are we missing? What doesn't resonate?
3. **Risks**: What could go wrong? What concerns should we address?
4. **Integration**: How do these fit with your team's roadmap?

---

## Open Discussion

*Notes captured here during the meeting...*

---
