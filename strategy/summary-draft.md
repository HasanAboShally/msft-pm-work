# Fabric Automation Strategy: Enabling Intelligent, Scalable, and Agentic Workflows

## Executive Summary

As Microsoft Fabric evolves into an AI-native, unified data platform, the expectations of developers, analysts, and organizations are rapidly shifting. The rise of generative AI, the emergence of agentic workflows, and the introduction of Fabric IQ and the Unified Copilot are redefining how users interact with data platforms. In this context, automation is no longer a backend concern—it is a first-class capability that must be intuitive, programmable, and accessible to both humans and AI agents.

This document outlines five strategic directions that form the foundation of Fabric’s automation vision. Each direction is designed as a focused, modular layer that can stand alone or be composed into broader solutions. Together, they represent a cohesive strategy to make Fabric the most developer-empowering and agent-friendly data platform in the industry.

## Strategic Context

### Developer Momentum and Dissatisfaction

Fabric’s automation usage is growing rapidly. As of December 2025:

- Public APIs: 110K MAU (+13% MoM), 2.9M monthly calls
- Fabric CLI: 1,412 MAU (+17% MoM)
- Terraform Provider: 489 MAU (+6% MoM)

However, satisfaction among professional developers remains low. Heavy users (>8 days/month) report an NPS of only 12, compared to 42 overall. These users—DevOps engineers, platform engineers, and data engineers—represent 90% of Fabric’s automation footprint and are critical to its long-term success.

### Strategic Personas

- **Professional Developers**: Require scalable, secure, and programmable automation interfaces (CLI, APIs, Terraform, MCP).
- **AI Agents**: Emerging as first-class personas. Require structured, discoverable tools, identity support, and governance.
- **Citizen Developers**: Benefit from low-code scripting and Copilot-assisted automation.
- **CoE Leaders**: Need reusable templates, policy enforcement, and safe onboarding environments.

## Vision

Empower every Fabric user and developer—human and AI alike—to automate with intelligence, build with confidence, and operate at scale, by transforming Microsoft Fabric into an AI-native, programmable platform where automation is intuitive, agentic, and deeply integrated across the ecosystem.

## Strategic Directions

### 1. Scripting within Fabric (Automating Click-Ops in the Portal)

Introduce a new “Script” item type in the Fabric portal to enable users—especially admins and citizen developers—to automate repetitive UI tasks. Copilot will assist in generating CLI scripts that can be reviewed, saved, and reused. This unlocks the “long tail” of automation: tasks too niche or infrequent to justify full engineering investment. Scripts are auditable, shareable, and can be executed by both humans and AI agents.

### 2. VS Code Experiences (Pro-Dev Sandboxing and Authoring)

Deliver a rich local development experience through the Fabric VS Code extension. Developers can author, test, and deploy Fabric items locally, using sandboxed environments seeded with real or AI-generated data. This direction supports safe iteration, Git-based workflows, and aligns with industry-standard DevOps practices.

### 3. Functions as MCP Tools (Customer Logic as Callable Operations)

Allow customers to define and expose their own Fabric logic (e.g., notebooks, pipelines, UDFs) as MCP tools. These tools become discoverable and invocable by AI agents, enabling organizations to codify and operationalize their unique business logic. The MCP framing provides stronger alignment with agentic orchestration than traditional API exposure.

### 4. Externalizing Fabric’s Agentic Capabilities

Expose Fabric’s internal automation capabilities to external agents via a unified MCP server. This enables developers to build agents in environments like VS Code or Azure Copilot Studio that can perform the same operations as Fabric Copilot. Agents are treated as first-class personas, with service principal support, auditability, and governance.

### 5. AI-Powered Provisioning and Blueprint Automation

Make provisioning repeatable, auditable, and AI-assisted. Convert blueprint items into code, expand blueprint capabilities to include role assignments and policy enforcement, and enable AI agents to generate and execute provisioning flows. This direction complements the others by providing the foundation for consistent, scalable environment setup.

## Strategic Integration

These directions align directly with the Developer Experience & Automation (DXA) team’s charter and the broader platform strategy led by Aviv Ezrachi. They support:

- Kim Manis’s P1.6 priority: “Provide delightful developer experiences”
- Unified Copilot’s need for orchestration infrastructure (MCP)
- CI/CD team’s backend automation requirements (APIs, CLI, Terraform)
- CoE enablement through reusable templates and sandboxing

Each direction is grounded in CAT research, addresses top Jobs-to-Be-Done (e.g., CI/CD, provisioning, access management), and supports both in-product and out-of-product automation.

## Next Steps

- Finalize narrative and visual assets for leadership review
- Align with partner teams (CI/CD, Copilot, CoE) on ownership and integration points
- Define success metrics (e.g., NPS by tool, MAU growth, agent usage)
- Prepare for internal and external validation (e.g., CAB pilots, FabCon sessions)

## Conclusion

These five directions represent a strategic, forward-looking investment in Fabric’s automation capabilities. They are designed to meet users where they are—whether in the portal, in VS Code, or through AI agents—and to scale with the platform’s growth. By executing on this strategy, we position Fabric as the most intelligent, programmable, and agent-ready data platform in the industry.