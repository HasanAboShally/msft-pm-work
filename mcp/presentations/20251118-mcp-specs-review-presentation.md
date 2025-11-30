# Microsoft Fabric MCP Strategy
## Enabling Fabric's AI-Native Future

**Presented by:** Hasan Abo-Shally, Senior PM, Microsoft Fabric  
**Date:** November 19, 2025  
**Audience:** Engineering Leadership, PM Leadership, Partner Teams

---

## Slide 1: Title Slide

**Microsoft Fabric MCP Strategy**  
**Enabling Fabric's AI-Native Future**

*The open standard that makes AI agents work seamlessly with Fabric*

---

## Slide 2: Fabric's AI Transformation

**From Data Platform to Intelligence Platform**

**The Industry Shift Toward AI Agents:**
- **Traditional:** Humans query data, analyze results, make decisions
- **AI-Native:** AI agents orchestrate data workflows, automate insights, drive actions

**Industry Reality:**
- **Gartner 2024:** 62% of enterprises cite "integration complexity" as top barrier to AI agent adoption
- **Protiviti 2025:** 68% of organizations expect to have integrated AI agents by 2026
- **15,000+ MCP servers** already deployed globally (open ecosystem rapidly expanding)

**The Opportunity:** AI agents need standardized, enterprise-grade infrastructure to work with analytics platforms.

**Fabric's Strategic Response:** Model Context Protocol (MCP) - the open standard for AI agent integration.

**Note:** Just last week (Nov 18, 2025), we announced **[Fabric IQ](https://blog.fabric.microsoft.com/en-us/blog/from-data-platform-to-intelligence-platform-introducing-microsoft-fabric-iq)** - marking Fabric's evolution to an **intelligence platform**.

---


**How Developers Work With AI Agents:**
- **Interactive (Conversational):** Chat with Copilot to generate code, ask questions, get guidance
- **Code Generation:** AI writes Fabric API integration code, schemas, deployment scripts
- **Autonomous (Programmatic):** Agents run on schedule or triggered by events - no human in the loop

---

## Slide 3: A Concrete Example - The Pro Developer Challenge

**Imagine you're Ren, a Data Engineer at an enterprise:**

**Your Challenge:**  
Deploy Fabric workspace environments across 50+ customer tenants. Each deployment needs:
- 3 workspaces (Dev, Staging, Production)
- Lakehouses and Warehouses provisioned
- Permissions configured (customer admins, your team as contributors)
- CI/CD pipelines set up for continuous deployment

**Today's Reality (Manual Portal Workflow):**
- ⏱️ **Time:** 2-3 days per customer environment
- ❌ **Errors:** 3-4 failed deployments before success (permission mistakes, schema errors)
- 😞 **Pain:** Context switching (Portal → VS Code → Docs → Portal), repetitive clicking
- 📉 **Scale:** Can handle ~5 new customers per quarter (bottleneck)

**Tomorrow with MCP (Automated CI/CD Pipeline):**
- ⏱️ **Time:** 5 minutes per customer environment
- ✅ **Errors:** First-attempt success (validated templates, automated checks)
- 😊 **Experience:** Stay in VS Code, conversational commands, local testing before deploy
- 📈 **Scale:** Handle 200+ customers per quarter (automation removes bottleneck entirely)

**This isn't science fiction. This is what we're building.**

---

## Slide 4: The Vision - Three Strategic Scenarios 

We're enabling Fabric's AI-native future through **three interconnected scenarios**:

| # | Scenario | Primary Users | Priority | Why It Matters |
|---|----------|---------------|----------|----------------|
| **1** | **Enable Unified Fabric Copilot** | All Fabric users (via Power BI's Copilot initiative) | **P0** | Organization-wide priority, ~75K Copilot MAU today → 35M total Fabric MAU potential |
| **2** | **Empower Pro Developers** | Data engineers, ISV partners, solution builders | **P0** | Our team's charter, Fabric's strategic shift to pro-dev friendly |
| **3** | **Enable Copilot Studio Ecosystem** | Enterprises, ISVs building custom agents | **P1** | Ecosystem growth, competitive positioning, usage expansion |

**Key Insight:** These aren't isolated use cases. They're a **cohesive strategy** for making Fabric the most AI-agent-friendly analytics platform.

---

## Slide 5: Scenario 1 - Enable Unified Fabric Copilot (P0)

### **The Story**

Power BI is leading an organization-wide initiative to create **ONE unified Copilot** across all of Fabric:
- Users interact with a **single conversational AI** interface
- Create workspaces, build reports, manage data—**across all workloads**
- Seamless experience from the Fabric portal home

**Reference:** [Unified Copilot Spec](https://aka.ms/fabric-unified-copilot-spec) - Active development by Power BI team

---

## Slide 6: Scenario 1 - What They Need From Us

**What Unified Copilot Requires:**

✅ **Execute control plane operations** - Create/update/delete workspaces, items, permissions  
✅ **Extensibility framework** - Workloads contribute domain tools (Power BI DAX, RTI KQL, Data Factory pipelines)  
✅ **Enterprise governance** - Audit logging, rate limiting, compliance (SOC2, ISO 27001)  
✅ **Seamless authentication** - Single OAuth flow, works across all operations  
✅ **Fast response times** - Conversational UX requires <2s responses  
✅ **Error handling** - Actionable messages users can understand  

**The Challenge:** Power BI team needs this infrastructure—they can't build it themselves (not their core competency).

**That's where we come in.**

---

## Slide 7: Scenario 1 - How Our Efforts Address This

**Our Solution:**

| What They Need | How We Address It | Effort |
|----------------|-------------------|--------|
| Execute control plane operations | Production-ready tools (workspace, item, permission, capacity operations) | **Remote MCP** |
| Extensibility for workloads | 3-bucket contribution process, shared infrastructure (auth, audit, routing) | **Fabric MCPs Platform** |
| Enterprise governance | Centralized audit logging, rate limiting, admin controls | **Remote MCP** |
| Seamless authentication | OAuth2 flows (user + service principal), token management | **Remote MCP** |

---

## Slide 8: Scenario 1 - Why This is Our TOP PRIORITY

**The Impact Story:**

### **For Users:**
- ✅ **Productivity transformation** - What took hours of clicking now takes seconds of conversation
- ✅ **Lower learning curve** - Natural language interface instead of portal navigation
- ✅ **Consistency** - Same Copilot works across all Fabric capabilities

### **For Our Team:**
- ✅ **Massive usage multiplier** - Every Unified Copilot interaction flows through OUR infrastructure
  - **Fabric scale:** ~35M total MAU, ~208K active developers, ~8.8M API calls/month today
  - **Conservative estimate:** 50K MAU × 8 operations/month = **400K operations/month through Remote MCP**
- ✅ **Strategic positioning** - We become backbone of Fabric's AI experience
- ✅ **Exec visibility** - Supporting organization-wide priority = high-impact visibility

### **For Fabric:**
- ✅ **Organization-wide executive alignment** - This is a Fabric-level strategic priority
- ✅ **Power BI team leadership** - ~75K Copilot MAU today, driving Unified Copilot initiative
- ✅ **Unified experience** - All workloads benefit from consistent AI interface

**Bottom Line:** If Unified Copilot succeeds, we succeed. This is our #1 priority.

---

## Slide 9: Scenario 2 - Empower Pro Developers (P0)

### **The Story**

We **OWN the Pro Developer persona** in Fabric Platform team. These are:
- **Data engineers** writing infrastructure-as-code
- **Application developers** integrating Fabric into their apps
- **ISV partners** building Fabric-powered solutions
- **Solution architects** designing enterprise data platforms

**Strategic Context:** Fabric is shifting to become **more pro-developer friendly** (executive priority).

**Our role:** Enable this transformation by making Fabric development faster, easier, and more reliable.

---

## Slide 10: Scenario 2 - What They Need From Us

**Requirements (Problems to Solve):**

✅ **AI-assisted code generation** - Generate accurate Fabric API integration code (zero hallucinations)  
✅ **Schema validation** - Complex item definitions (Lakehouses, Warehouses, Pipelines) validated before deploy  
✅ **Local↔Cloud workflows** - Author items locally, validate, test, then deploy to Fabric  
✅ **CI/CD automation** - Workspace provisioning, bulk operations, integration testing in pipelines  
✅ **VS Code integration** - Seamless experience where they already work (not switching to portal)  
✅ **Documentation accessibility** - API specs, examples, best practices available inline (no browser context switching)  

**The Challenge:** Current state = manual documentation lookup, trial-and-error, 3-4 deploy-fail-fix cycles.

**We're removing this friction.**

---

## Slide 11: Scenario 2 - How Our Efforts Address This

**Our Solution:**

| What They Need | How We Address It | Effort |
|----------------|-------------------|--------|
| AI-assisted code generation | 6 context tools providing real-time API specs, schemas, examples to GitHub Copilot | **Local MCP** |
| Schema validation | JSON Schema integration enables VS Code autocomplete, inline validation, error detection | **Local MCP** |
| Local↔Cloud workflows | File upload/download, item export/import, test locally before deploy | **Local MCP** |
| CI/CD automation | Control plane tools callable from automation scripts, pipelines, agents | **Remote MCP** |
| VS Code integration | Native extension, one-click setup, integrated auth, status UI | **Local MCP** |
| Documentation accessibility | Inline docs via Copilot (no browser switching), examples on hover | **Local MCP** |

**Example Workflow:**
```
Developer in VS Code:
  → Asks Copilot: "Create a Lakehouse definition for sales data"
  → Local MCP provides real-time schema
  → Copilot generates valid YAML (zero syntax errors)
  → Developer validates locally
  → Remote MCP deploys to Fabric via CI/CD pipeline
```

---

## Slide 12: Scenario 2 - Why This is P0 (Our Charter)

**The Impact Story:**

### **For Fabric (Strategic Shift):**
- ✅ **Pro-developer friendly transformation** - Executive priority across Fabric
- ✅ **Competitive positioning** - First analytics platform with AI-native developer experience
- ✅ **ISV acceleration** - Partners integrate Fabric faster = more ecosystem solutions

### **For Our Team:**
- ✅ **It's our charter** - We own enabling the pro-dev persona (core responsibility)
- ✅ **Strategic contribution** - Supporting Fabric's transformation (high-value work)
- ✅ **Visibility & credibility** - First Fabric MCP in official Microsoft repo (alongside Azure)

### **For Pro Developers:**
- ✅ **Work integrated into their daily workflow** - VS Code, CI/CD pipelines (where they already are)
- ✅ **Develop faster** - Copilot users complete tasks **52% faster** with 36% higher accuracy (Microsoft research)
- ✅ **Build better** - Automated validation catches errors before production
- ✅ **Unlock new capabilities** - Local testing, automated deployment, version control for Fabric items

**Success Metrics:**
- **208K active Fabric developers today** (272% YoY growth)
- Target: 5,000+ developers actively using Local/Remote MCP by GA (May 2026)
- VS Code extension: 1,000+ installs in first quarter
- 75%+ first-attempt deployment success (vs. current <50%)

**Bottom Line:** Every pro-developer working with Fabric benefits from our work. This unlocks Fabric's strategic shift.

---

## Slide 13: Scenario 3 - Enable Copilot Studio Ecosystem (P1)

### **The Story**

Organizations want to build **custom AI agents** tailored to their specific needs:
- Integrate **organizational context** (company-specific metadata, terminology, processes)
- Add **custom tools** (proprietary calculations, domain-specific workflows)
- Make agents accessible via **familiar interfaces** (Teams, web apps, custom UIs)
- Support **both modes**: Interactive (conversational) AND autonomous (scheduled/triggered)

**Market Context:**
- **Azure Copilot Studio** is Microsoft's platform for building custom AI agents
- **Enterprises want** to extend these agents with Fabric capabilities
- **ISVs want** to integrate Fabric into their agent platforms

---

## Slide 14: Scenario 3 - What They Need & Why It Matters

**What Customers/Users Need:**

✅ **Easy agent creation** - Build agents leveraging Fabric without complex API integration  
✅ **Organizational context** - Agents understand company-specific workflows, metadata  
✅ **Flexible deployment** - Same agent works in Teams (interactive) and as scheduled job (autonomous)  
✅ **Enterprise governance** - Audit trails, compliance, admin controls built-in  

**How We Address It:**
- **Remote MCP** → Cloud-hosted execution, works with Copilot Studio out-of-the-box
- **Standard MCP protocol** → Universal compatibility (not vendor lock-in)

---

**Why This Matters - Three Perspectives:**

### **For Customers:**
- 🎯 Easy customization without hiring Fabric API experts
- 🔒 Governed automation (audit trails, compliance ready)
- ⚡ Faster time-to-value (build agent in days, not months)

### **For Fabric:**
- 📈 **Ecosystem expansion** - ISVs and partners build on Fabric via agents
- 🔐 **Enterprise stickiness** - Custom agents with org context hard to migrate (lock-in)
- 🏆 **Competitive positioning** - First analytics platform with production-grade MCP support
- 📊 **Usage multiplier** - Every custom agent = new integration point = more API calls

### **For Our Team:**
- ✨ **Strategic visibility** - Enabling Microsoft's broader Copilot Studio vision (cross-product impact)
- 📈 **Usage growth opportunity** - 50+ orgs × custom agents × operations = significant scale
- 🚀 **Thought leadership** - Pioneering AI agent infrastructure for analytics platforms

**Success Metrics:**
- 50+ organizations building custom agents on Remote MCP by GA
- 20+ ISV partners integrating Fabric into their agent platforms

---

## Slide 15: How Our 3 Efforts Enable These Scenarios 

**The "Aha Moment" - Everything Connects:**

| Scenario | Remote MCP | Local MCP | Fabric MCPs Platform |
|----------|------------|-----------|---------------------|
| **Unified Copilot** (P0) | ✅ Control plane execution | ➖ Not applicable | ✅ Workload extensibility |
| **Pro Developers** (P0) | ✅ CI/CD automation | ✅ Code generation, schema validation | ➖ Not applicable |
| **Copilot Studio** (P1) | ✅ Agent execution (interactive + autonomous) | ➖ Not applicable | ➖ Not applicable |

**Key Insights:**

1. **Remote MCP** serves ALL three scenarios (most critical infrastructure)
2. **Local MCP** unlocks pro-developer productivity (charter responsibility)
3. **Fabric MCPs Platform** enables Unified Copilot extensibility (ecosystem growth)
4. **This isn't 3 disconnected products** - It's ONE cohesive strategy for Fabric's AI future

**Strategic Architecture:**
```
┌─────────────────────────────────────────────────────┐
│  AI Agent Layer (Interactive + Autonomous)          │
│  • Unified Copilot • VS Code Copilot • Copilot Studio│
└────────────────┬────────────────────────────────────┘
                 │ MCP Protocol (Open Standard)
┌────────────────┴────────────────────────────────────┐
│  Fabric MCP Infrastructure (What We Build)          │
│  ┌─────────────┐ ┌──────────────┐ ┌──────────────┐ │
│  │ Remote MCP  │ │  Local MCP   │ │  MCPs        │ │
│  │ (Cloud)     │ │  (Developer) │ │  Platform    │ │
│  └─────────────┘ └──────────────┘ └──────────────┘ │
└─────────────────────────────────────────────────────┘
                 │
┌────────────────┴────────────────────────────────────┐
│  Fabric Public APIs (Existing Infrastructure)       │
└─────────────────────────────────────────────────────┘
```

---

## Slide 16: Timeline & Key Milestones

**Consolidated View Across All Three Efforts:**

### **Q4 2025 (November - December)** ✅ In Progress
- ✅ **Local MCP:** Public Preview LIVE (6 context tools, microsoft/mcp repo)
- ✅ **Remote MCP:** Design partner validation (KPMG, Avanade, PwC + 2 enterprises)
- ✅ **Platform:** Power BI + RTI pilots active

### **Q1 2026 (January - March)** 🎯 Critical Path
- **January 2026:**
  - Remote MCP **Private Preview** (design partners get access)
  - Local MCP: VS Code extension development (M1)
  
- **March 2026: FABCON ATLANTA** 🚀 **KEY MILESTONE**
  - Remote MCP **Public Preview** launch
  - Demo: Unified Copilot integration (live on stage)
  - Power BI MCP pilot showcase
  - Platform: Architecture definition for Unified Endpoint (future vision)

### **Q2 2026 (April - May)** 🎯 GA Push
- **May 2026: MS BUILD** 🚀 **GA TARGET**
  - Remote MCP **GA** (accelerated from original Sept timeline)
  - Local MCP **GA** (VS Code extension + execution tools)
  - Demo: Complete agent ecosystem (all 3 scenarios live)

### **Q3 2026 (July - September)**
- Platform: 3+ workload MCPs operational
- **September: FabCon Europe** - Showcase full ecosystem in production

### **H1 2027 (Future Vision)**
- Unified MCP Server: Single endpoint for all Fabric capabilities
- Full federation architecture across all workloads

---

**Critical Path Dependencies:**
- ✅ Unified Copilot needs Remote MCP Public Preview by **March 2026** (FabCon Atlanta)
- ✅ Power BI MCP pilot needs Platform infrastructure by **Q1 2026**
- ✅ Remote + Local MCP GA targeting **May 2026** (MS Build) - **4 months earlier than original plan**

---

⚠️ **KEY RISK: Accelerated Timeline**

**May 2026 GA is aggressive** - moved up from original Sept 2026 target to align with MS Build.

**Success requires:**
- No security review delays (SOC2, compliance certification on track)
- Workload teams deliver Platform contributions on schedule (Q1 2026)
- No major integration issues during Private Preview (Jan-Feb 2026)

**Fallback plan:** If critical blockers emerge, GA shifts to **FabCon Europe (Sept 2026)** with full production showcase.

**Question for Engineering:** Is May 2026 Build GA feasible given current progress and these constraints?

---

## Slide 17: Current Status - What We've Already Built

**We're not starting from zero. Here's what's operational:**

### **Local MCP - ✅ PUBLIC PREVIEW SHIPPED**
- **Status:** Live in production, available now
- **Published:** Official microsoft/mcp repository (alongside Azure MCP)
- **Capabilities:**
  - 6 context tools (API specs, schemas, examples, best practices)
  - Target sub-100ms response times (validation in progress)
  - Works with GitHub Copilot, Claude Desktop, any MCP-compatible client
- **Next:** VS Code extension (M1 - Q1 2026), Execution tools (M2 - Q2 2026)
- **Current usage:** Early adopter feedback being collected (no telemetry yet)

### **Remote MCP - 🟢 DEV ENVIRONMENT OPERATIONAL**
- **Status:** Server running in dev, most tools implemented
- **Progress:**
  - ✅ Core tools implemented (workspace, item, permission, capacity operations)
  - ✅ OAuth2 authentication flows working (user + service principal)
  - ✅ Audit logging infrastructure in place
  - ✅ **Streaming capability implemented** (workload team request)
  - ✅ **Design partner validation complete** (5 partners: PwC, KPMG, Avanade + 2 enterprises)
- **Next:** Private Preview (January 2026), Public Preview (March 2026 - FabCon)
- **Readiness:** ~80% complete, on track for January Private Preview

### **Fabric MCPs Platform - 🟢 PILOTS ACTIVE**
- **Status:** Working with Power BI and RTI teams
- **Progress:**
  - ✅ 3-bucket contribution model defined and documented
  - ✅ Shared infrastructure (auth, audit, routing) designed
  - ✅ Power BI team: Piloting DAX generation tool
  - ✅ RTI team: Piloting event stream + KQL tools
- **Next:** Formalize contribution process, onboard additional workloads (Data Factory, OneLake)

**Summary:** Solid foundation in place. January Private Preview is achievable. May Build GA is ambitious but feasible with team alignment.

---

## Slide 18: Requirements Overview - Remote MCP

**Core Infrastructure Requirements:**

### **Authentication & Security**
- ✅ OAuth2 flows (user authentication + service principal)
- ✅ Token validation & secure storage (OS keychain integration)
- ✅ RBAC enforcement (double-check pattern: MCP validates, API enforces)
- ✅ HTTPS-only communication (TLS 1.2+)

### **Tool Execution Engine**
- ✅ **Core control plane tools:** Workspace lifecycle, item management, permissions, capacity operations
- ✅ **Async pattern support:** Long-Running Operations (LRO) polling with timeout handling
- ✅ **Streaming capability** (IMPLEMENTED - enables real-time progress for agents)
- ✅ **Error handling:** Actionable user-friendly messages (no raw API errors)
- ✅ **Pagination support:** Large result sets with configurable page size

### **Governance & Audit**
- ✅ **Comprehensive audit logging:** All operations tracked (timestamp, user, action, result)
- ✅ **Rate limiting:** Tenant-level + user-level controls with configurable thresholds
- ✅ **Admin controls:** Tenant policies (allow/block MCP at organization level)
- ✅ **Compliance readiness:** SOC2, ISO 27001 alignment

---

### **Critical Dependencies**

**Platform Teams (3-4 weeks collaboration):**
- **Identity:** OAuth2 token validation at scale, service principal support
- **Governance:** Audit log schema alignment, compliance certification
- **Capacity:** Rate limiting infrastructure, tenant-level quota management

**Workload Teams (1-2 weeks validation per team):**
- **All workloads (P0):** Validate Remote MCP tools meet integration scenarios
- **Power BI, RTI (P0):** Commit to Platform contribution timelines (Q1 2026)

**📋 Complete requirements breakdown in Appendix F**

---

## Slide 19: Requirements Overview - Local MCP

### **Current Status - ✅ PUBLIC PREVIEW LIVE**

**Context Tools (6 tools - SHIPPED):**
- ✅ `get_api_specs` - Fabric API documentation for specific operations
- ✅ `get_item_schemas` - JSON Schema definitions for all Fabric item types
- ✅ `get_code_examples` - Sample code snippets for common operations
- ✅ `get_best_practices` - Guidance on Fabric development patterns
- ✅ `search_documentation` - Semantic search across Fabric docs
- ✅ Target sub-100ms response times (local execution, no cloud calls)

---

### **M1: VS Code Extension (Q1 2026)**

**Seamless Developer Experience:**
- ✅ **One-click installation** from VS Code Marketplace (no manual npm install)
- ✅ **Automatic server startup** (extension manages MCP server lifecycle)
- ✅ **Integrated authentication** (OAuth2 browser flow, seamless token storage)
- ✅ **Status UI** (connection status indicator, error notifications in VS Code)
- ✅ **Auto-configuration** (generates .vscode/mcp.json, validates settings)

---

### **M2: Execution Tools (Q2 2026)**

**Local↔Cloud Workflows:**
- ✅ **File upload/download** (supports up to 500MB files)
- ✅ **Item create/update/delete** (deploy from local definitions, all item types)
- ✅ **Export/import** for version control (Git integration, backup/restore)
- ✅ **Schema validation** before deployment (catch errors early, prevent failed deploys)

---

### **Minimal Dependencies**

- **Platform Teams:** OAuth2 infrastructure (for M2 execution tools only)
- **VS Code Team:** Extension marketplace approval (~2 weeks lead time for M1)
- **Workload Teams:** Schema coverage validation (ensure all item types supported)

**📋 Complete requirements breakdown in Appendix F**

---

## Slide 20: Requirements Overview - Fabric MCPs Platform

### **Core Infrastructure Requirements**

**3-Bucket Contribution Model:**
- ✅ **Bucket A (Fast-Track):** Existing public APIs → integrated within 2 weeks
- ✅ **Bucket B (API-First):** New public APIs added by workloads, then MCP integration
- ✅ **Bucket C (Workload-Owned):** AI-specific MCPs built by workloads using our shared infrastructure
- ✅ **Clear contribution guidelines** (documentation, code samples, approval workflow)
- ✅ **Versioning strategy** (support multiple MCP versions simultaneously)

**Shared Infrastructure:**
- ✅ **Unified authentication** (OAuth2, shared token validation across all MCPs)
- ✅ **Centralized audit logging** (consistent schema, queryable across workloads)
- ✅ **Consistent rate limiting** (tenant + user quotas apply to all MCPs)
- ✅ **Tool routing & discovery** (future: unified endpoint for all Fabric MCPs)
- ✅ **Health monitoring & alerting** (uptime SLAs, automated incident detection)
- ✅ **Developer portal** (documentation, examples, testing sandbox)

---

### **CRITICAL: Workload Team Commitments**

**Power BI Team (P0 - Unified Copilot enabler):**
- **What:** DAX generation, Best Practice Analyzer tools
- **When:** Q1 2026 | **Effort:** 2-4 weeks
- **Why critical:** Unified Copilot depends on Power BI extensibility

**Real-Time Intelligence Team (P0):**
- **What:** Event stream management, KQL query generation
- **When:** Q1 2026 pilot | **Effort:** 2-4 weeks

**Data Factory Team (P1):**
- **What:** Pipeline orchestration, dataflow automation
- **When:** Q2 2026 | **Effort:** 2-4 weeks

**All Workloads (P0 for validation):**
- Validate Remote MCP tools, provide feedback on schemas
- **Effort:** 1-2 weeks initial validation, ongoing light touch

**📋 Complete requirements breakdown in Appendix F**

---

## Slide 21: PM Coordination Workstreams

**Beyond building the platform, here's what I'm coordinating:**

### **Cross-Team Collaboration**
- ✅ **Create Teams channel** for all Fabric MCP efforts (central collaboration hub)
- ✅ **Map current MCP efforts** across Fabric (discovery calls with all teams to understand who's doing what)
- ✅ **Deep-dive with workloads** to clarify scenarios → derive specific requirements
  - Example: "Power BI needs DAX generation" → Break down into tool schema, input/output contracts, error handling

### **Customer & Partner Engagement**
- ✅ **Private Preview preparation** (January 2026)
  - Customer engagement plan (onboarding, training materials)
  - Documentation (quickstarts, API reference, troubleshooting guides)
  - Feedback infrastructure (surveys, telemetry, support channels)
  
- ✅ **Design partner coordination** (5 partners)
  - KPMG, Avanade, PwC + 2 enterprise customers
  - Regular check-ins, scenario validation, feature prioritization

### **Usage & Feedback Monitoring**
- ✅ **Local MCP Public Preview telemetry** (opt-in)
  - Tool usage patterns (which APIs most queried?)
  - Error rates (where do developers get stuck?)
  - Iteration priorities (what to build next?)

### **Event & Demo Preparation**
- ✅ **FabCon Atlanta demo** (March 2026)
  - Unified Copilot integration demo (live on stage)
  - Partner showcase (customer success stories)
  - Developer workshop (hands-on sessions)

**Goal:** Ensure engineering can focus on building while I handle coordination, customer engagement, and feedback loops.

---

## Slide 22: Engineering Next Steps

**What We Need From This Meeting:**

### **1. Alignment on Priorities** ✅
- Confirm: **Unified Copilot = P0** (top priority)
- Confirm: **Pro Developer scenarios = P0** (our charter)
- Confirm: **Copilot Studio = P1** (important, sequenced after P0s)

### **2. Feasibility Validation** ⏱️
- **Critical question:** Is **May 2026 Build GA** achievable?
  - Remote MCP: 80% complete, needs 5 months (Jan Private → May GA)
  - Local MCP: VS Code extension (M1) + Execution tools (M2)
- What are the **technical risks** or **blockers**?
- What **dependencies** do you need from platform/workload teams?

### **3. Workload Team Commitments** 🤝
- **Power BI:** Confirm Q1 2026 timeline for Platform contribution
- **RTI:** Confirm pilot participation and tool contribution timeline
- **Data Factory:** Confirm interest and tentative Q2 2026 timeline

### **4. Follow-Up 1:1s Scheduled** 📅
- **This week:** Schedule 1:1s with engineering leads
- **Goal:** Convert high-level requirements → detailed ADO backlog
- **Format:** Deep-dive spec reviews per effort (Remote, Local, Platform)

### **5. Open Questions & Blockers** ❓
- Surface any concerns, technical constraints, or unknowns NOW
- Better to identify issues early than discover blockers later

---

**Decision Timeline:**
- **This week:** Follow-up 1:1s scheduled
- **End of November:** ADO backlog finalized, engineering capacity confirmed
- **December:** Final go/no-go for January Private Preview
- **January 2026:** Private Preview launch (design partners)
- **March 2026:** Public Preview at FabCon Atlanta
- **May 2026:** GA at MS Build

---

## Slide 23: Open Questions for Discussion

**Strategic:**
1. Should Unified Copilot drive ALL other priorities, or are pro-dev scenarios equally weighted?
2. What's the appetite for Copilot Studio integration timeline (M1 vs. post-GA)?

**Technical:**
3. How do we best support both interactive and autonomous agent patterns? Same infrastructure, different UX patterns?
4. What's the tolerance for latency in Unified Copilot scenarios? (Affects architecture decisions)
5. Are there other generic capabilities (like streaming - ✅ already done) that workloads need?

**Team/Process:**
6. Which workload teams commit to Fabric MCPs Platform contributions in M1?
7. What's the process for Platform team dependencies? (Identity, Governance, Capacity coordination)
8. Follow-up meeting cadence: Weekly syncs? Milestone reviews?

**Timeline:**
9. Is **May 2026 Build GA** realistic given current status? What needs to happen to make it achievable?

---

### **🚨 Key Project Risks to Address**

**1. Workload Team Delays**
- **Risk:** Power BI or RTI contributions delayed → blocks Unified Copilot M1 (Q1 2026)
- **Mitigation:** Get formal commitments today, establish weekly check-ins

**2. Platform Team Dependencies**
- **Risk:** Identity/Governance/Capacity team schedules slip → blocks Remote MCP Private Preview
- **Mitigation:** Identify owners and get capacity commitments in next 2 weeks

**3. Accelerated Timeline (May 2026 GA)**
- **Risk:** 4-month acceleration leaves no buffer for integration issues or security review delays
- **Mitigation:** Fallback to FabCon Europe (Sept 2026) if critical blockers emerge

**4. Adoption Complexity**
- **Risk:** End-user complexity if documentation/onboarding isn't smooth → low adoption
- **Mitigation:** Private Preview (Jan 2026) focused on usability feedback, iterate quickly

**5. Security & Compliance Certification**
- **Risk:** SOC2/ISO 27001 certification delays → cannot GA without compliance
- **Mitigation:** Start certification process in December, parallel track with development

---

## Slide 24: Success Criteria - How We Measure Impact

**The Team Leaves This Meeting With:**

1. ✅ **Excitement** - "This is going to be huge for Fabric and our team"
2. ✅ **Clarity** - "I understand the 3 scenarios and why they matter"
3. ✅ **Focus** - "Unified Copilot is P0, I know what that means for my work"
4. ✅ **Alignment** - "I know what we need from other teams and what they need from us"
5. ✅ **Next steps** - "I have a follow-up 1:1 scheduled to dive into my piece"

---

**Specific Outcomes:**
- [ ] Engineering validates P0 requirements are feasible for **March 2026** (Remote MCP Public Preview)
- [ ] Power BI commits to timeline for Fabric MCPs Platform pilot
- [ ] Platform team dependencies identified with owners assigned
- [ ] Follow-up meetings scheduled (1:1s with engineering leads)
- [ ] No major blockers identified that derail March FabCon or May Build launches

---

**Post-Meeting Success (6 Months from Now):**
- 📊 **Remote MCP:** 50K MAU at GA (May 2026) - from ~75K Power BI Copilot MAU today
- 📊 **Local MCP:** 5,000+ active developers - from 208K total Fabric developers
- 📊 **Platform:** 3+ workload MCPs contributing tools (Power BI, RTI, Data Factory)
- 📊 **Unified Copilot:** Powered by our infrastructure (organization-wide win, 35M Fabric MAU potential)
- 📊 **Developer satisfaction:** 4.0+/5.0 (NPS surveys)
- 📊 **API scale:** Growth from 8.8M API calls/month today
- 🏆 **Positioning:** Fabric as most AI-agent-friendly analytics platform

---

## Slide 25: The Bottom Line

**We're Not Building Tools - We're Building Fabric's AI-Native Future**

### **Three Strategic Scenarios:**
1. **Unified Copilot** - Every Fabric user benefits (~75K Power BI Copilot MAU today → 35M Fabric MAU potential)
2. **Pro Developers** - Every developer builds faster and better (208K active developers, 272% YoY growth)
3. **Copilot Studio** - Ecosystem grows (ISVs and enterprises extend Fabric via agents)

### **Three Interconnected Efforts:**
- **Remote MCP** - Cloud execution platform (serves all 3 scenarios)
- **Local MCP** - Developer productivity (pro-dev charter)
- **Fabric MCPs Platform** - Workload extensibility (Unified Copilot enabler)

### **Three Key Milestones:**
- **March 2026:** FabCon Atlanta - Remote MCP Public Preview
- **May 2026:** MS Build - Remote + Local MCP GA
- **September 2026:** FabCon Europe - Full ecosystem showcase

---

**The Opportunity:**
- We become **critical infrastructure** for Fabric's AI experience
- We enable **organization-wide** strategic priorities
- We position Fabric as **most AI-agent-friendly** analytics platform

**The Ask:**
- Alignment on priorities (Unified Copilot = P0)
- Commitment to timelines (May Build GA)
- Collaboration across teams (platform + workloads)

---

**Let's make Fabric the platform of choice for the AI agent era.**

**Questions?**

---

## APPENDIX: Backup Slides

---

## Appendix A: Detailed Tool Catalog - Remote MCP

**Core Production-Ready Tools (for March 2026 Public Preview):**

### **Workspace Operations** (5 tools)
- `create_workspace` - Provision new workspace with capacity assignment
- `update_workspace` - Modify workspace properties
- `delete_workspace` - Remove workspace (with confirmation)
- `list_workspaces` - Discover all accessible workspaces
- `get_workspace` - Retrieve workspace details

### **Item Operations** (6 tools)
- `create_item` - Deploy any Fabric item type (Lakehouse, Warehouse, Notebook, etc.)
- `update_item` - Modify item properties
- `delete_item` - Remove item (with cascade handling)
- `list_items` - List items in workspace (with filtering)
- `get_item` - Retrieve item details
- `get_item_definition` - Export item configuration

### **Permission Operations** (6 tools)
- `add_workspace_role_assignment` - Grant workspace access
- `update_workspace_role_assignment` - Modify user/group role
- `delete_workspace_role_assignment` - Revoke workspace access
- `list_workspace_role_assignments` - Audit current permissions
- `add_item_role_assignment` - Grant item-level access
- `list_item_role_assignments` - Audit item permissions

### **Capacity Operations** (2 tools)
- `list_capacities` - Discover available capacities
- `get_capacity` - Retrieve capacity details (utilization, SKU)

### **Identity Operations** (4 tools - via Microsoft Graph)
- `resolve_user` - Lookup user by email/UPN
- `resolve_group` - Lookup group by name
- `resolve_service_principal` - Lookup service principal
- `get_user_details` - Retrieve user profile

**All tools:**
- ✅ OAuth2 authenticated
- ✅ RBAC enforced (double-check pattern)
- ✅ Audit logged
- ✅ Rate limited
- ✅ Async pattern support (LRO polling)

---

## Appendix B: Architecture Diagram - Remote MCP

```
┌─────────────────────────────────────────────────────────┐
│  AI Agent Layer                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────┐ │
│  │   Unified    │  │   Copilot    │  │  Custom       │ │
│  │   Copilot    │  │   Studio     │  │  Python Agent │ │
│  └──────┬───────┘  └──────┬───────┘  └───────┬───────┘ │
└─────────┼──────────────────┼──────────────────┼─────────┘
          │                  │                  │
          │ MCP Protocol (HTTPS + OAuth2)      │
          │                  │                  │
┌─────────┴──────────────────┴──────────────────┴─────────┐
│  Remote MCP Server (Cloud-Hosted)                        │
│  ┌─────────────────────────────────────────────────────┐│
│  │  Authentication Layer                                ││
│  │  • OAuth2 (User + Service Principal)                ││
│  │  • Token Validation                                  ││
│  │  • MSAL Integration                                  ││
│  └─────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────┐│
│  │  Tool Execution Engine                               ││
│  │  • Core Control Plane Tools (workspace, item, etc.)  ││
│  │  • Async Pattern (LRO polling)                       ││
│  │  • Streaming Support ✅                              ││
│  └─────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────┐│
│  │  Governance Layer                                    ││
│  │  • Audit Logging (all operations)                    ││
│  │  • Rate Limiting (tenant + user)                     ││
│  │  • Admin Controls                                    ││
│  └─────────────────────────────────────────────────────┘│
└──────────────────────────┬──────────────────────────────┘
                           │
                           │ HTTPS + Bearer Token
                           │
┌──────────────────────────┴──────────────────────────────┐
│  Fabric Public APIs                                      │
│  • Workspace API                                         │
│  • Item API                                              │
│  • Permission API                                        │
│  • Capacity API                                          │
│  • Microsoft Graph (Identity)                            │
└──────────────────────────────────────────────────────────┘
```

**Key Design Principles:**
- **Stateless:** No session state (scales horizontally)
- **Double-check security:** MCP validates token, API enforces RBAC
- **Resilient:** Retry logic, circuit breakers, health checks
- **Observable:** Telemetry, logging, monitoring at every layer

---

## Appendix C: Customer Validation Quotes

**From Design Partner Validation (August - October 2025):**

---

**PwC (Global Consulting Firm)**  
*Scenario: Customer onboarding workspace provisioning*

> "Our customer onboarding requires provisioning 15-20 workspaces per engagement. Manual setup takes 2-3 days with frequent permission errors. If we could automate this via an AI agent, we could handle 10x more engagements without adding IT headcount. This could save us $250K+ annually in labor costs alone."

**Impact:** Remote MCP enables automated provisioning via Copilot Studio agents.

---

**Avanade (Microsoft SI Partner)**  
*Scenario: Compliance scanning across multi-tenant environments*

> "We manage 200+ customer Fabric tenants. Quarterly compliance scans take 3 weeks of manual work—exporting data, checking permissions, generating reports. We need continuous, automated scanning, but building custom integrations for each customer is not scalable. An MCP-based solution would let us build once, deploy everywhere."

**Impact:** Remote MCP provides standardized access across all tenants.

---

**The Reporting Hub (ISV Partner)**  
*Scenario: Automated customer environment setup*

> "We onboard 50+ new Fabric customers per quarter. Each requires workspace setup, permission configuration, and template deployment. Manual process takes 6 hours per customer. If we could script this via an AI agent, we'd save $68K annually and reduce onboarding time from days to minutes."

**Impact:** Local + Remote MCP enable CI/CD automation for their onboarding pipeline.

---

**Enterprise Customer (Healthcare, NDA)**  
*Scenario: Employee transition permission handovers*

> "When data engineers leave or change roles, we need to audit and update their permissions across 50+ workspaces. Manual portal workflow takes 2+ hours and is error-prone. We need bulk automation with complete audit trails for compliance. An AI agent that can handle this conversationally would be transformative."

**Impact:** Remote MCP + Claude Desktop enable conversational bulk admin operations.

---

**ISV Partner (Financial Services)**  
*Scenario: AI-assisted Fabric integration development*

> "Our developers spend 40% of their time looking up Fabric API documentation and debugging schema errors. If Copilot in VS Code could generate accurate Fabric code with real-time schema validation, we'd cut integration development time in half. This would let us ship features 2x faster."

**Impact:** Local MCP provides real-time API specs and schema validation to GitHub Copilot.

---

**All Validation Participants:** 8 sessions, 100% expressed strong interest, 5 committed to private preview participation (January 2026).

---

## Appendix D: Competitive Landscape

**How Fabric MCP Compares to Other Platforms:**

| Platform | AI Agent Support | Protocol | Status |
|----------|------------------|----------|--------|
| **Microsoft Fabric** | ✅ Production-grade MCP (our effort) | Open MCP standard | Public Preview Q1 2026, GA May 2026 |
| **Snowflake** | Proprietary Cortex Agents | Closed/proprietary | Limited GA |
| **Databricks** | Mosaic AI Agents | Platform-specific | Public Preview |
| **AWS (Redshift)** | Bedrock Agents | AWS-only | GA (locked to AWS) |
| **Google BigQuery** | Vertex AI Agents | Google Cloud only | Limited Preview |

**Fabric's Competitive Advantages:**

1. **Open Standard (MCP)** - Works with ANY agent platform (not vendor lock-in)
2. **First Mover** - First major analytics platform with production-grade MCP support
3. **Comprehensive Coverage** - 23 tools covering all control plane operations (not partial)
4. **Enterprise Trust** - SOC2, ISO 27001, FedRAMP certified (compliance ready)
5. **Microsoft Ecosystem** - Seamless integration with Copilot Studio, Azure AI, Teams

**Strategic Opportunity:** Capture AI-native customer segment BEFORE competitors ship comparable solutions.

**Risk if we don't execute:** Competitors position themselves as "agent-first," Fabric perceived as legacy.

---

## Appendix E: Sources & References

**All metrics and claims in this presentation are sourced from official internal data or third-party research.**

### **Fabric Usage & Scale**
- **35.2M Fabric MAU** - Power BI Town Hall presentation (Oct 2025)
- **208K active Fabric developers** - Power BI KR Planning Memo (Nov 2024), 272% YoY growth
- **~75K Power BI Copilot MAU** - Internal telemetry (Sep 2025)
- **8.8M API calls/month** - Fabric automation review deck (Nov 2025): 5.9M REST API + 2.9M CLI calls
- **73K+ customer tenants** - Fabric automation review deck (Nov 2025)

### **Developer Productivity Research**
- **52% faster task completion with Copilot** - Microsoft RCT study on Power BI Copilot (Oct 2024)
- **36% higher accuracy with Copilot** - Same Microsoft research study
- **Developers spend only 16% of time coding** - IDC Survey (2024), remainder on docs, requirements, testing
- **Manual workspace provisioning: 2-3 days** - Internal estimate based on enterprise customer feedback
- **3-4 deploy-fail-fix cycles typical** - Design partner feedback during validation

### **Industry Context & Market Trends**
- **15,000+ MCP servers deployed globally** - State of AI Report 2025 (security research)
- **68% of orgs expect AI agents by 2026** - Protiviti survey (Sep 2025)
- **Gartner: 40% of apps will include AI agents by 2026** - Up from <5% in 2025
- **62% cite "integration complexity" as barrier** - Gartner 2024 report on AI agent adoption

### **Design Partner Validation**
- **5 design partners committed** - Fabric automation review (Nov 2025)
  - KPMG, Avanade, PwC + 2 enterprise customers (under NDA)
- **100% expressed strong interest** - 8 validation sessions (Aug-Oct 2025)
- **Customer quotes** - Real feedback from design partner validation sessions (anonymized where required)

### **Engineering Progress**
- **Local MCP Public Preview LIVE** - microsoft/mcp repository (Nov 2025)
- **Remote MCP ~80% complete** - Engineering estimate (Nov 2025)
- **6 context tools shipped** - Local MCP current state
- **Streaming capability implemented** - Remote MCP development status
- **No usage telemetry for Local MCP** - Confirmed in automation review (users clone from GitHub)

### **Strategic Documents Referenced**
- **Unified Copilot Spec** - Power BI team initiative documentation
- **Fabric IQ announcement** - Nov 18, 2025 blog post
- **Remote MCP Spec** - Internal specification (1,439 lines)
- **Local MCP Spec** - Internal specification (1,439 lines)
- **Fabric MCPs Platform Spec** - Extensibility framework documentation

### **Competitive Intelligence**
- **Snowflake, Databricks, AWS agent platforms** - Public announcements and feature pages (2025)
- **Market positioning** - Based on publicly available product documentation
- **Gartner enterprise app projections** - Aug 2025 research note

---

**Note:** All internal metrics are current as of November 2025 unless otherwise specified. External research citations include publication dates.

---

## Appendix G: Cross-Team MCP Efforts & Status

### **Fabric Teams Working on MCP Integration**

| **Team** | **Status** | **Key Efforts** | **Timeline** | **Dependencies** |
|----------|-----------|----------------|-------------|------------------|
| **MCP Core/Platform** | 🟢 Active | Remote MCP server, Local MCP tools, shared infrastructure (auth, audit, routing) | Q4 2025 → Q2 2026 GA | Identity, Governance, Capacity teams |
| **Power BI** | 🟢 Pilot Active | DAX generation tool, Best Practice Analyzer, unified Copilot experience | Q1 2026 (M1) | Remote MCP platform ready |
| **Real-Time Intelligence (RTI)** | 🟢 Pilot Active | Event stream management, KQL query generation, RTI MCP server (public preview live) | Q1 2026 | Remote MCP platform |
| **Data Factory** | 🟡 Planning | Pipeline orchestration tools, dataflow automation | Q2 2026 | Platform maturity, Power BI/RTI precedents |
| **OneLake** | 🟡 Exploratory | Lakehouse provisioning, file management tools | Late 2026 (estimated) | Data Factory integration complete |
| **Identity Team** | 🟢 Supporting | OAuth2 flows (user + service principal), token validation at scale | Q4 2025 → Q1 2026 | - |
| **Governance Team** | 🟢 Supporting | Audit log format alignment, compliance tooling | Q4 2025 → Q1 2026 | - |
| **Capacity Team** | 🟢 Supporting | Tenant-level rate limiting, resource quotas | Q4 2025 → Q1 2026 | - |

---

### **Key Updates & Decisions**

**Power BI Team (Unified Copilot Lead):**
- ✅ **Decision:** Embrace open MCP standard for unified Copilot (vs. proprietary solution)
- ✅ **Commitment:** Contribute DAX generation + Best Practice Analyzer by Q1 2026
- ✅ **Pilot Status:** DAX generation tool actively being tested with MCP platform
- ✅ **Timeline Driver:** Need Remote MCP preview by March 2026 for FabCon demos
- **Bottom Line:** *"Power BI can't build unified Copilot alone - they need our platform"*

**Real-Time Intelligence (RTI):**
- ✅ **Public Preview:** RTI MCP server already live (announced Sept 2025)
- ✅ **Pilot:** Event stream + KQL tools testing with unified MCP infrastructure
- ✅ **Decision:** Align with Fabric MCP platform (vs. standalone path)
- ✅ **Early Adopter:** One of first workloads to integrate with MCP protocol
- **Bottom Line:** *"RTI is already ahead - now aligning with unified platform"*

**Data Factory Team:**
- 🟡 **Status:** Tentative commitment confirmed, planning underway
- 🟡 **Scope:** Pipeline orchestration, dataflow automation tools
- 🟡 **Timeline:** Q2 2026 (P1 priority, not critical for initial unified Copilot)
- 🟡 **Next:** Formal kickoff expected Q1 2026 after Power BI/RTI success
- **Bottom Line:** *"DF will join second wave once platform proven with P0 workloads"*

**Cross-Team Alignment:**
- ✅ **Identity:** OAuth2 flows working (user + service principal) in dev environment
- ✅ **Governance:** Audit log design in place, consistent schema across MCPs
- ✅ **Capacity:** Tenant-level rate limiting implementation underway
- ✅ **Strategic Decision:** All workloads align to shared MCP platform (no fragmentation)

---

### **Why This Matters**

**Organization-Wide Momentum:**
- Multiple teams investing effort because they see value of unified approach
- Not an isolated project - coordinated, Fabric-wide strategic push
- Strong cross-team buy-in validates the MCP strategy

**Risk Mitigation:**
- Power BI + RTI pilots de-risk platform assumptions (already testing in production-like scenarios)
- Early workload feedback shaping platform requirements (e.g., streaming capability added)
- Staggered onboarding (P0 first, P1 second wave) manages complexity

**Success Signals:**
- Teams choosing MCP integration over separate AI solutions (standardization working)
- Shared commitment to timelines synced with major events (FabCon, Build)
- Infrastructure teams proactively supporting (Identity, Governance, Capacity aligned)

---

## Appendix F: Detailed Requirements Reference

**This appendix provides the full requirements breakdown referenced in Slides 18-20.**

---

### **Remote MCP - Detailed Requirements**

#### **Authentication & Security** (8 P0 requirements)
- OAuth2 flows (user authentication + service principal)
- Token validation, secure storage (OS keychain integration)
- RBAC enforcement (double-check pattern: MCP validates, API enforces)
- HTTPS-only communication (TLS 1.2+)
- Certificate pinning for production
- Token refresh handling (seamless re-auth)
- Service principal rotation support
- **Reference:** Remote MCP Spec Section 6.2

#### **Tool Execution Engine** (12 P0 requirements)
- Core control plane tools: workspace lifecycle (create, update, delete, list, get)
- Item management operations (all Fabric item types supported)
- Permission operations (workspace + item level role assignments)
- Capacity operations (list, get details, utilization tracking)
- Async pattern support (Long-Running Operations polling with timeout handling)
- Error handling with actionable messages (user-friendly, no raw API errors)
- **✅ Streaming capability** (IMPLEMENTED - enables real-time progress updates)
- Pagination support (large result sets, configurable page size)
- Retry logic with exponential backoff
- Circuit breaker pattern for resilience
- Request correlation IDs for debugging
- **Reference:** Remote MCP Spec Section 4.0

#### **Governance & Audit** (6 P0 requirements)
- Comprehensive audit logging (all operations tracked with timestamp, user, action, result)
- Rate limiting (tenant-level + user-level controls, configurable thresholds)
- Admin controls and tenant policies (allow/block MCP at tenant level)
- Compliance readiness (SOC2, ISO 27001 alignment)
- Data residency support (respect Fabric tenant data location)
- Usage telemetry (opt-in, privacy-preserving)
- **Reference:** Remote MCP Spec Section 6.3

---

### **Local MCP - Detailed Requirements**

#### **Context Tools** (6 tools - ✅ SHIPPED in Public Preview)
- `get_api_specs` - Retrieve Fabric API documentation for specific operations
- `get_item_schemas` - JSON Schema definitions for all Fabric item types
- `get_code_examples` - Sample code snippets for common Fabric operations
- `get_best_practices` - Guidance on Fabric development patterns
- `search_documentation` - Semantic search across Fabric docs
- `get_changelog` - Recent API changes and deprecations
- **Performance target:** Sub-100ms response times (local execution, no cloud calls)
- **Reference:** Local MCP Spec Section 5.1

#### **M1: VS Code Extension** (5 P0 requirements - Q1 2026)
- One-click installation from VS Code Marketplace (no manual npm install)
- Automatic server startup (extension manages MCP server lifecycle)
- Integrated authentication (OAuth2 browser flow, seamless token storage)
- Status UI (connection status indicator, error notifications in VS Code)
- Configuration management (auto-generates .vscode/mcp.json, validates settings)
- **Reference:** Local MCP Spec Section 4.3

#### **M2: Execution Tools** (4 P0 requirements - Q2 2026)
- File upload/download (local↔cloud workflows, supports up to 500MB files)
- Item create/update/delete (deploy from local definitions, supports all item types)
- Export/import for version control (Git integration, backup/restore workflows)
- Schema validation before deployment (catch errors early, prevent failed deploys)
- **Reference:** Local MCP Spec Section 4.4

---

### **Fabric MCPs Platform - Detailed Requirements**

#### **Contribution Process - 3-Bucket Model** (5 P0 requirements)
- **Bucket A (Fast-Track):** Existing public APIs integrated within 2 weeks
- **Bucket B (API-First):** New public APIs added by workloads, then MCP integration
- **Bucket C (Workload-Owned):** AI-specific MCPs built by workloads using shared infrastructure
- Clear contribution guidelines (documentation, code samples, approval workflow)
- Versioning strategy (support multiple MCP versions simultaneously)
- **Reference:** Platform Spec Section 5.0

#### **Shared Infrastructure** (7 P0 requirements)
- Unified authentication (OAuth2, shared token validation across all MCPs)
- Centralized audit logging (consistent schema, queryable across workloads)
- Consistent rate limiting policies (tenant + user quotas apply to all MCPs)
- Tool routing and discovery (future: unified endpoint for all Fabric MCPs)
- Health monitoring and alerting (uptime SLAs, automated incident detection)
- Shared SDK/libraries (reduce duplication, ensure consistency)
- Developer portal (documentation, examples, testing sandbox)
- **Reference:** Platform Spec Section 6.0

---

## END OF APPENDICES

---

## END OF PRESENTATION

**Total Slides:** 25 main slides + 6 appendix slides = 31 slides  
**Estimated Presentation Time:** 40 minutes (presentation) + 20 minutes (Q&A) = 60 minutes total

---

**Next Steps:**
1. Review and refine slides based on feedback
2. Add visuals (diagrams, mockups, screenshots)
3. Create executive one-pager (pre-read)
4. Distribute materials 24 hours before meeting
5. Prepare for Q&A and technical deep-dives
