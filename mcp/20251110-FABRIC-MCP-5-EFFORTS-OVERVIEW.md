# Microsoft Fabric MCP Strategy
## Five Strategic Efforts Overview

 
**Presented by:** Hasan Abo-Shally  
**Date:** November 10, 2025  
**Purpose:** Strategic alignment on Fabric's comprehensive MCP approach

---

## Slide 1: Title Slide

**Microsoft Fabric MCP Strategy**  
**Five Strategic Efforts to Power the AI Agent Era**

Visual: Fabric logo with 5 interconnected circles representing the efforts

---

## Slide 2: Our MCP Vision - The Complete Picture

**From Developers to Agents to Ecosystem**

We're building a comprehensive MCP strategy across 5 strategic efforts:

1. **Local MCP** - Empower developers with AI-assisted code generation
2. **Control Plane Execution MCP** - Execute Fabric operations at scale
3. **Fabric MCP Platform** - Enable workload teams to extend capabilities
4. **Unified Fabric MCP Server** - One endpoint for all Fabric capabilities (future)
5. **MCP Server Item** - Customer-created MCPs hosted in Fabric (exploration)

**Strategic Goal:** Position Fabric as the most AI-agent-friendly analytics platform through open standards

---

## Slide 3: Strategy Overview - The Five Efforts

| Effort | Primary Persona | Timeline | Status |
|--------|----------------|----------|--------|
| **Local MCP** | Developers, ISVs | GA: FabCon 2026 (Sept) | 🟡 Public Preview (Live) |
| **Control Plane Execution** | Pro Developers, Agents | Jan 2026 (Private Preview) → Mar 2026 (Public) → Sept 2026 (GA) | 🟢 Active Development |
| **Fabric MCP Platform** | Fabric Workload Teams | Ongoing | 🟢 Active (Power BI, RTI pilot) |
| **Unified MCP Server** | All Users, Agents | H1 2027 | 🔵 Vision (Define Q1 2026) |
| **MCP Server Item** | Customers (Advanced) | TBD | ⚪ Exploration Phase |

**Speaker Notes:** "Let me walk you through each effort, its purpose, and where we are today. We'll start with Local MCP—empowering developers to build with Fabric more easily."

---

## Slide 4: Effort #1 - Local MCP

**AI-Assisted Code Generation for Developers**

**What it is:**
- VS Code extension providing Fabric API knowledge to GitHub Copilot
- Developers prompt Copilot → generates accurate Fabric code instantly
- Focus: Code generation ONLY (no execution, no authentication required)

**Primary Persona:**
- Pro Developers integrating with Fabric APIs
- ISV partners building Fabric-powered solutions
- Data engineers authoring Fabric items (Lakehouses, Warehouses, etc.)

**Three Key Scenarios:**
1. **Code Generation:** Generate accurate Fabric API integration code with zero hallucinations
2. **Item Authoring:** Create complex item definitions (Lakehouses, Warehouses) with schema validation
3. **Local-to-Cloud Workflows:** Author and validate configurations locally before deployment

**Value Delivered:**
- 90%+ faster development time (validated with ISV partners)
- Zero API hallucinations (Copilot has real-time schema context)
- Reduces learning curve for new Fabric developers

**Current Status:**
- 🟡 **Public Preview** (Live in microsoft/mcp repository)
- Technology: .NET 9.x (`fabmcp` executable)
- GA Target: September 2026 (FabCon Europe)

**Speaker Notes:** "Local MCP helps developers in three critical scenarios: generating integration code, authoring complex item definitions with validation, and enabling local-to-cloud workflows. It's already live in public preview—you can try it today. This is our foundation for making Fabric developer-friendly in the AI era."

---

## Slide 5: Effort #2 - Control Plane Execution MCP

**Execute Fabric Public APIs through AI Agents**

**What it is:**
- Cloud-hosted MCP server enabling agents to execute operations against Fabric
- Covers all Fabric public APIs: workspaces, items, roles, capacities, governance
- 23 core tools in M1 (expandable as APIs grow)

**Primary Persona:**
- Pro developers building AI agents or working interactively in VS Code
- Pro developers building autonomous agents for automation platforms
- Examples: Copilot Studio users, custom agent developers

**Why it matters:**
- Enables any MCP-compliant agent to automate Fabric operations
- First major analytics platform with production-grade MCP support (open standard)
- Significantly reduces custom integration code (validated with design partners)

**Current Status:**
- Private Preview: January 2026 (design partners)
- Public Preview: March 2026 (FabCon Atlanta)
- GA: September 2026 (FabCon Europe)

**Speaker Notes:** "This is our core product for the pro developer persona—think of it as the 'Fabric API Gateway for AI Agents.' It's both a standalone product for external developers AND infrastructure that our workload teams can leverage. We have 5 design partners validated and ready to pilot in January."

---

## Slide 6: Effort #2 - How Other Teams Leverage It

**Enabling Fabric Teams to Build Stronger Agents**

**Use Case: Power BI Agent Integration**

Scenario: Power BI builds a conversational agent for data exploration ("Talk to Your Data")

**Without Control Plane Execution MCP:**
- Power BI team builds custom APIs for workspace provisioning, permissions, deployment
- Duplicate code, security risks, maintenance burden

**With Control Plane Execution MCP:**
- Power BI agent connects to Control Plane MCP for workspace/governance operations
- Power BI focuses on domain-specific tools (DAX, insights, visualizations)
- Agents get best-of-both: Power BI domain expertise + Fabric platform operations

**Value:**
- Workload teams don't rebuild platform capabilities
- Consistent security, audit logging, governance across all agents
- Faster time-to-market for workload-specific agents

**Speaker Notes:** "This is a key point: the Control Plane MCP isn't just for external customers—it's a product we own for the pro developer persona AND it's infrastructure for our workload teams. When Power BI builds an agent, they connect to our MCP for platform operations and focus on their domain expertise."

---

## Slide 7: Effort #3 - Fabric MCP Platform

**Enable Workload Teams to Extend MCP Capabilities**

**What it is:**
- Process and infrastructure for workload teams to build their own MCP servers
- Platform team provides: authentication, hosting, governance, routing
- Workload teams provide: domain-specific tools and expertise

**How it works:**
1. Workload team proposes tools (via review process)
2. Platform team evaluates: Should it be public API? Or AI-specific?
3. Workload builds MCP server (using platform infrastructure)
4. Platform hosts and routes traffic (unified endpoint in Phase 2)

**Current Examples:**
- **Power BI MCP:** DAX generation, Best Practice Analyzer, model optimization
- **Real-Time Intelligence MCP:** KQL queries, event stream automation

**Why it matters:**
- Platform team cannot be expert in all workload domains
- Enables ecosystem growth without central bottleneck
- Maintains consistency (security, audit, governance) across all MCPs

**Current Status:**
- 🟢 **Active & Ongoing** - Working with Power BI and RTI teams
- Extensibility model defined in Hosted MCP spec (Section 12)
- Continuous improvement of internal processes

**Speaker Notes:** "Think of this like our API process, but for MCPs. Just as we enable workload teams to extend Fabric's API surface, we're doing the same for MCP tools. Power BI and RTI are our pilot teams—they're building domain-specific MCPs using our platform infrastructure."

---

## Slide 8: Effort #4 - Unified Fabric MCP Server

**One Endpoint for All Fabric Capabilities (Future Vision)**

**The Challenge:**
- Agents connect to multiple MCP servers: Control Plane, Power BI, Data Eng, RTI, etc.
- Complex configuration, fragmented discovery, inconsistent governance

**The Vision:**
- **One MCP endpoint:** `api.fabric.microsoft.com/mcp`
- Agents connect once, discover ALL tools via `tools/list`
- Unified authentication, audit logging, governance

**What agents see:**
```
Agent → Unified MCP Endpoint
  ├─ Core Fabric Tools (workspace, item, role management)
  ├─ Power BI Tools (DAX, BPA, model optimization)
  ├─ Data Engineering Tools (pipelines, dataflows)
  ├─ RTI Tools (KQL, event streams)
  └─ Customer/Partner Tools (extensibility)
```

**The "USB Type-C Hub" Metaphor:**
- Just like USB Type-C unified device connectivity
- MCP unifies AI agent connectivity to Fabric
- One port, all capabilities, universal standard

**Timeline:**
- Define architecture: Q1 2026
- Implementation: H1 2027 (post-GA of Control Plane MCP)

**Current Status:**
- 🔵 **Vision Phase** - High-level strategy defined
- Detailed design needed: federation, routing, governance
- Depends on learnings from Control Plane MCP and workload MCPs

**Speaker Notes:** "This is the long-term vision—the 'USB Type-C moment' for AI agents. Instead of managing 5 different MCP connections, agents connect to one endpoint and discover everything. We're not building this today, but we're designing with this future in mind."

---

## Slide 9: Effort #5 - MCP Server Item

**Customer-Created MCPs Hosted in Fabric (Exploration)**

**The Vision:**
- Customers create custom MCP servers as Fabric Items
- Example: Finance team encodes proprietary calculation as MCP tool
- Agents can invoke customer-defined tools alongside Fabric tools

**How it might work:**
1. Customer writes function (Python UDF, notebook, etc.)
2. Function auto-generates MCP tool definition
3. Fabric hosts MCP server automatically
4. Agents discover and invoke custom tools

**Use Cases:**
- Encode organizational best practices as AI-accessible tools
- Custom business logic (compliance rules, cost calculations, approval workflows)
- Domain-specific transformations unique to customer's industry

**Why it matters:**
- Extensibility without platform team involvement
- Customers innovate on top of Fabric's MCP foundation
- Creates "MCP ecosystem" within each tenant

**Current Status:**
- ⚪ **Exploration Phase** - Early concept validation
- Timeline: TBD (post-2026)
- Needs: Customer validation, security model, hosting infrastructure

**Speaker Notes:** "This is the most exploratory of the five efforts. We're not building it now, but we see it as the natural evolution—enabling customers to extend Fabric's AI capabilities with their own custom tools. Think of it like custom functions, but for AI agents."

---

## Slide 10: Summary - All Five Efforts at a Glance

**The Complete Picture**

| Effort | What It Is | Key Persona | Key Scenario | Status | Timeline |
|--------|-----------|-------------|--------------|--------|----------|
| **Local MCP** | VS Code extension for code generation | Developers, ISVs | Generate Fabric code, author items, local-to-cloud workflows | 🟡 Public Preview | GA Sept 2026 |
| **Control Plane Execution** | Cloud-hosted agent execution platform | Pro Developers, Agents | Automate Fabric operations at scale | 🟢 Active Dev | Jan 2026 → GA Sept 2026 |
| **Fabric MCP Platform** | Extensibility for workload teams | Workload Teams | Build domain-specific MCPs (Power BI, RTI) | 🟢 Active | Ongoing |
| **Unified MCP Server** | Single endpoint for all capabilities | All Users, Agents | One connection, discover all Fabric tools | 🔵 Vision | Define Q1 2026, Build H1 2027 |
| **MCP Server Item** | Customer-created MCPs as Fabric Items | Customers | Custom business logic as agent tools | ⚪ Exploration | TBD |

**Speaker Notes:** "Here's the complete picture at a glance. These five efforts work together to make Fabric the universal platform for AI-powered analytics—from helping developers write code, to enabling agents to execute operations, to allowing our ecosystem and customers to extend with their own capabilities."

---

## Slide 11: Strategic Alignment - How the Five Efforts Connect

**Building Blocks to Complete Vision**

```
┌─────────────────────────────────────────────────────────┐
│  EFFORT #4: Unified Fabric MCP Server (Future)          │
│  "One endpoint for all Fabric capabilities"             │
│  └─ Connects all efforts into unified experience        │
└────────────┬────────────────────────────────────────────┘
             │
   ┌─────────┴─────────┬──────────────┬─────────────┐
   │                   │              │             │
┌──▼───────────┐  ┌───▼──────────┐  ┌▼──────────┐  ┌▼─────────────┐
│ EFFORT #1:   │  │ EFFORT #2:   │  │EFFORT #3: │  │ EFFORT #5:   │
│ Local MCP    │  │ Control      │  │Fabric MCP │  │ MCP Server   │
│              │  │ Plane MCP    │  │Platform   │  │ Item         │
│              │  │              │  │           │  │              │
│ Code gen     │  │ Execute ops  │  │ Workload  │  │ Customer     │
│ for devs     │  │ via agents   │  │extensions │  │ tools        │
└──────────────┘  └──────────────┘  └───────────┘  └──────────────┘
```

**How they work together:**

1. **Local MCP** helps developers write code to integrate with Fabric
2. **Control Plane MCP** enables agents to execute those integrations at scale
3. **Fabric MCP Platform** allows workload teams to add domain-specific capabilities
4. **Unified MCP Server** brings everything together in one endpoint
5. **MCP Server Item** enables customer innovation on top of the platform

**Strategic Outcome:** Fabric becomes the universal platform for AI-powered analytics automation

---

## Slide 11: Timeline - Key Milestones Across All Efforts

**2025-2027 Roadmap**

| Quarter | Milestones |
|---------|-----------|
| **Q4 2025** | • Local MCP: Public Preview live<br>• Control Plane MCP: Development sprint |
| **Q1 2026** | • Control Plane MCP: Private Preview (Jan)<br>• Control Plane MCP: Public Preview (Mar, FabCon Atlanta)<br>• Unified MCP: Architecture definition<br>• Fabric Platform: Power BI & RTI pilot |
| **Q2 2026** | • Fabric Platform: Additional workload onboarding<br>• Control Plane: Feature iteration |
| **Q3 2026** | • Control Plane MCP: GA (Sept, FabCon Europe)<br>• Local MCP: GA (Sept, FabCon Europe) |
| **Q4 2026** | • Fabric Platform: Continuous expansion |
| **H1 2027** | • Unified MCP Server: Implementation begins |
| **Future** | • MCP Server Item: Validation & development (TBD) |

**Critical Path:** Control Plane MCP Public Preview (March 2026) at FabCon Atlanta

---

## Slide 12: Success Metrics - How We Measure Impact

**Quantified Goals by GA (September 2026)**

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Adoption** | 5,000+ active developers using Local/Control Plane MCP | Weekly tool invocations, VS Code installs |
| **Agent Integration** | 50+ AI platforms integrated with Control Plane MCP | Platform telemetry |
| **Workload MCPs** | 3+ workload teams with live MCP servers | Platform team tracking |
| **Developer Satisfaction** | 80%+ satisfaction score | NPS surveys, feedback |
| **Time Savings** | 70-90% reduction in manual provisioning toil | Customer validation data |
| **Code Quality** | 75%+ first-attempt code success (Local MCP) | Schema validation pass rates |

**Leading Indicators (Q1 2026):**
- Design partner validation (5+ partners for Control Plane)
- ISV partner feedback (Local MCP usage)
- Workload team engagement (Platform extension requests)

---

## Slide 13: Customer Validation - Early Proof Points

**Design Partner Feedback (Aug-Oct 2025)**

**Control Plane Execution MCP:**
- **KPMG:** "Could replace ~5,000 lines of custom wrapper code"
- **The Reporting Hub:** "$68K annual savings, 90%+ faster customer onboarding"
- **8 validation sessions, 100% expressed strong interest**

**Local MCP:**
- **ISV Partner:** "Reduced Fabric integration time by more than half"
- **Internal Teams:** "Copilot generates correct code 90%+ of the time"

**Fabric MCP Platform:**
- **Power BI Team:** Actively building domain-specific MCP (DAX generation)
- **RTI Team:** Piloting event stream automation tools

**Key Insight:** Demand is validated across all three active efforts (Control Plane, Local, Platform)

---

## Slide 14: Why This Matters - Strategic Positioning

**Market Leadership Through Open Standards**

**Competitive Landscape:**
- Snowflake: Proprietary Cortex Agents (closed ecosystem)
- Databricks: Mosaic AI (platform-specific)
- AWS: Bedrock Agents (AWS-only)

**Fabric's Differentiation:**
- **Open MCP Standard:** Any agent platform can connect
- **Comprehensive Coverage:** 100+ public APIs, all workloads
- **Enterprise Trust:** SOC2, ISO 27001, FedRAMP certified
- **Microsoft Ecosystem:** Copilot Studio, Azure AI, seamless integration

**Strategic Opportunity:**
- First major analytics platform with production-grade MCP support
- Capture AI-native customer segment before competitors
- Position Fabric as platform of choice for agentic AI era

**Risk if we don't execute:**
- Competitors ship agent frameworks, Fabric perceived as "legacy"
- Lose next-generation developers choosing "agent-first" platforms

---

## Slide 15: What We Need - Critical Decisions & Support

**For Successful Execution**

**1. Executive Alignment:**
- Mandate for workload team participation (Fabric MCP Platform)
- Resource commitment through GA (March-September 2026)
- Strategic endorsement of open MCP standard approach

**2. Key Decisions Needed (November 2025):**
- Extensibility model finalization (Fabric MCP Platform)
- Unified endpoint architecture approach (Effort #4)
- Prioritization of workload MCPs (Power BI, RTI, others)

**3. Cross-Team Coordination:**
- Security review (Control Plane MCP) - in progress
- Copilot Studio integration (Jan 2026 timeline)
- Workload team roadmap alignment (Q1-Q2 2026)

**4. Customer Engagement:**
- Lighthouse program for Control Plane MCP (5 design partners, Jan 2026)
- ISV enablement for Local MCP (ongoing)
- Workload team support for Platform extensions (active)

**Speaker Notes:** "These are the key enablers. We have technical clarity, customer validation, and execution plans. What we need is alignment on strategic direction and commitment to cross-team collaboration."

---

## Slide 16: Next Steps - Immediate Actions

**November 2025:**
- ✅ This presentation: Strategic alignment on 5 efforts
- 🔲 Architecture forum (Nov 15): Finalize extensibility model, unified endpoint approach
- 🔲 Workload team commitments: Power BI, RTI MCP timelines confirmed

**December 2025:**
- 🔲 Control Plane MCP: Lighthouse customer access (design partners)
- 🔲 Local MCP: Continued public preview iteration

**January 2026:**
- 🔲 Control Plane MCP: Private Preview launch
- 🔲 Unified MCP: Architecture definition complete

**March 2026:**
- 🎯 **Control Plane MCP: Public Preview at FabCon Atlanta** (critical milestone)

**Go/No-Go Decision Point:** February 2026 (Public Preview readiness review)

---

## Slide 17: Questions & Discussion

**Open for Discussion:**

1. Strategic alignment on the 5-effort approach
2. Workload team participation and timelines
3. Resource allocation and prioritization
4. Risk mitigation strategies
5. Customer engagement approach

**Documentation Available:**
- Detailed specifications for Local MCP (V5), Control Plane MCP (V7)
- Extensibility model and platform guidelines
- Customer validation data and design partner feedback
- Risk analysis and mitigation plans

**Contact:** Hasan Abo-Shally (hasanabo@microsoft.com)

---

## APPENDIX: Quick Reference

### Effort Summary Table

| Effort | Status | Persona | Timeline | Key Deliverable |
|--------|--------|---------|----------|----------------|
| **Local MCP** | 🟡 Public Preview | Developers, ISVs | GA Sept 2026 | VS Code extension, code generation |
| **Control Plane Execution MCP** | 🟢 Active Dev | Pro Devs, Agents | Jan 2026 → GA Sept 2026 | 23 tools, OAuth, audit logging |
| **Fabric MCP Platform** | 🟢 Active | Workload Teams | Ongoing | Extensibility process, workload MCPs |
| **Unified MCP Server** | 🔵 Vision | All Users | Define Q1 2026, Build H1 2027 | Single endpoint for all capabilities |
| **MCP Server Item** | ⚪ Exploration | Customers | TBD | Customer-hosted MCPs in Fabric |

### Key Dates
- **March 2026:** Control Plane Public Preview (FabCon Atlanta)
- **September 2026:** Control Plane + Local GA (FabCon Europe)
- **H1 2027:** Unified MCP Server

---

**END OF PRESENTATION**
