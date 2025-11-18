# Microsoft Fabric MCP Strategy
## Five Specifications for Engineering Handover

**Presented by:** Hasan Abo-Shally  
**Date:** November 16, 2025  
**Purpose:** Present comprehensive MCP specifications for engineering handover and broader team alignment

---

## Slide 1: Title Slide

**Microsoft Fabric MCP Strategy**  
**Five Engineering-Ready Specifications**

Visual: Fabric logo with 5 interconnected document icons representing the specs

**Subtitle:** From Vision to Implementation—72 Pages of Product Requirements

---

## Slide 2: Meeting Objectives

**What We're Covering Today:**

1. **Strategic Overview:** Fabric's comprehensive MCP approach across 5 efforts
2. **Specification Walkthrough:** Deep dive into each of the 5 specs
3. **Engineering Handover:** Requirements, dependencies, and critical path
4. **Alignment:** Cross-team coordination and success criteria

**Meeting Outcomes:**

- ✅ Engineering teams understand requirements for each effort
- ✅ Cross-effort dependencies identified and owned
- ✅ Timeline and milestones validated
- ✅ Open questions prioritized for resolution

**Documentation Available:**

- 5 comprehensive specifications (72 pages total)
- All specs follow story-driven structure: Problem → Vision → Value → Requirements
- Evidence-backed claims with cited sources
- Engineering-ready acceptance criteria

---

## Slide 3: Our MCP Vision - The Complete Picture

**From Developers to Agents to Ecosystem**

We've created 5 comprehensive specifications across our MCP strategy:

| Spec | What It Is | Pages | Status |
|------|-----------|-------|--------|
| **1. Local MCP** | AI-assisted code generation for developers | 19 | ✅ Public Preview Live |
| **2. Remote MCP** | Cloud-hosted agent execution platform | 25 | 🟢 Jan 2026 → GA Sept 2026 |
| **3. Platform** | Workload team extensibility framework | 14 | 🟢 Active & Ongoing |
| **4. Unified Vision** | Future single endpoint for all capabilities | 7 | 🔵 Vision (H1 2027) |
| **5. MCP Server Item** | Customer-created MCPs (exploration) | 7 | ⚪ Exploration Phase |

**Total:** 72 pages of engineering-ready specifications

**Strategic Goal:** Position Fabric as the most AI-agent-friendly analytics platform through open standards

---

## Slide 4: Spec #1 - Local MCP (19 pages)

**AI-Powered Local Development for Fabric**

### Executive Summary

**Status:** ✅ **PUBLIC PREVIEW** - Live in Production  
**Repository:** microsoft/mcp/servers/Fabric.Mcp.Server  
**Technology:** .NET 9.x (production-grade)  
**GA Target:** March 2026 (FabCon Atlanta)

### What's Live Right Now

- **6 Context Tools:** API specs, schemas, examples, best practices (all operational)
- **Open Source:** MIT license, community can contribute
- **Cross-Platform:** Works with VS Code, Claude Desktop, any MCP client

### What's on Roadmap

- **4 Execution Tools:** File upload, item create/update/delete (Q2 2026)
- **VS Code Extension:** One-click setup, integrated auth (Q1 2026)
- **GA Features:** Production SLA, comprehensive docs, enterprise support

### Key User Stories (3 Scenarios)

1. **AI-Assisted Lakehouse Creation** (Data Engineer)
   - Current: 35 minutes, 3-4 failed attempts
   - With MCP: 2 minutes, 1 successful attempt (94% faster)
   - Status: Context tools live, execution tools roadmap

2. **Workspace Provisioning Automation** (DevOps Engineer)
   - Current: 150 lines of custom OAuth code
   - With MCP: 20 lines leveraging platform auth (87% code reduction)
   - Status: Context tools enable schema retrieval

3. **Schema-Validated Item Authoring** (Solution Architect)
   - Current: 3-4 deploy-fail-fix cycles, 20-30 minutes
   - With MCP: Real-time validation, 100% errors caught before deployment
   - Status: ✅ **LIVE** - Context tools provide inline validation

### Strategic Positioning

**Local MCP (This Effort):**
- Focus: Local development workflows (code generation, item authoring)
- Execution: Runs on developer's machine
- Auth: Developer credentials (OAuth2, Azure CLI)

**Complementary - Remote MCP:**
- Focus: Enterprise-scale automation, governance
- Execution: Cloud-hosted, multi-tenant
- Auth: Service principals, centralized governance

### Success Criteria (GA - March 2026)

- 5,000+ weekly active developers
- 80%+ developer satisfaction
- 75%+ first-attempt deployment success
- 500+ GitHub stars
- Zero critical security incidents

**Speaker Notes:** "Local MCP is LIVE today in public preview. Developers can use it right now to generate Fabric code with zero hallucinations. The spec details our roadmap to GA with execution tools and VS Code extension."

---

## Slide 5: Spec #2 - Remote MCP (25 pages)

**Fabric Remote MCP: Cloud-Hosted AI Agent Execution Platform**

### Executive Summary

**What It Is:** Cloud-hosted MCP server enabling any AI agent to securely execute Fabric operations via open MCP standard

**Timeline:**
- M0 Private Preview: January 2026 (design partners)
- M1 Public Preview: **March 2026 (FabCon Atlanta)**
- GA: September 2026 (FabCon Europe)

### FabCon Atlanta Demo (Opening)

**The Vision in Action:**

Imagine a developer at FabCon demo station using VS Code with Copilot:

> **User:** "Set up a workspace for our new customer Contoso, provision a lakehouse and warehouse, and assign permissions to their team."

Copilot (via Remote MCP):
- Creates workspace "Contoso-Analytics"
- Provisions lakehouse + warehouse
- Assigns RBAC permissions
- Returns: "✅ Workspace ready. [Open in Fabric →]"

**What used to take hours with manual portal clicks happens in 30 seconds—without leaving VS Code.**

### The Problem (Evidence-Backed)

**Problem #1: No Standardized AI Agent Protocol**
- 62% of organizations experimenting with AI agents but lack standardized integration (McKinsey 2025)
- Design partners report 50%+ duplicated code across agent platforms
- Average 2-4 weeks to integrate new AI platform with Fabric

**Problem #2: Complex Authentication & Authorization**
- 30%+ of integration dev time spent on auth implementation
- 51% of organizations experienced negative AI consequences (security, accuracy concerns)
- 78% of workers bring their own AI tools (BYOAI), creating ungoverned risks

**Problem #3: Limited Automation Capabilities**
- Manual provisioning: Hours/days → Automation target: Minutes
- 68% of knowledge workers struggle with pace/volume of work
- Only 39% of orgs see enterprise-level EBIT impact from AI (gap between experimentation and scaled value)

### Product Vision & Scope

**What We're Building (M1 Public Preview):**

- **23 Core Tools** covering all Fabric public APIs
  - 5 Workspace operations
  - 7 Item operations
  - 4 Role assignment operations
  - 2 Capacity operations
  - 3 Identity operations (interim solution)
  - 2 Async operation management

**Focus:** Control plane operations (workspace, item, role, capacity management)

**Explicitly Out of Scope for M1:**
- Data plane operations (query execution, data access)
- Workload-specific tools (covered by Platform spec)
- Unified endpoint (covered by Vision spec)

### Three Validated Scenarios (100% API Verified)

**Scenario 1: Automated Customer Onboarding** (PwC)
- Current: 2-3 business days, 5+ support tickets, 30% error rate
- With MCP: Minutes, zero support tickets, standardized automation
- Design Partner: "Eliminates our primary support ticket category—saves weeks per month"

**Scenario 2: Compliance Audit & Security Scanning** (KPMG)
- Current: Hours/days for manual audits, infrequent due to effort
- With MCP: Minutes for comprehensive scanning, continuous monitoring
- Design Partner: "Shift from quarterly manual audits to continuous monitoring"

**Scenario 3: Bulk Admin Handover** (Avanade)
- Current: Hours for manual workspace-by-workspace updates
- With MCP: Minutes for bulk operations with full audit trail
- Design Partner: "Transforms multi-day process into quick, verified operation"

### Security & Governance (Enterprise-Grade)

**Security Model:**
- OAuth2 Authorization Code Flow (interactive agents)
- OAuth2 Client Credentials Flow (autonomous agents)
- Double-check pattern: MCP validates token, Fabric API enforces RBAC
- Comprehensive audit logging (every tool invocation)

**Governance Controls:**
- Tenant-level access control (admin can enable/disable)
- Rate limiting (60 calls/min per user, 120 for service principals)
- Audit logs exportable to Azure Log Analytics
- Usage telemetry (opt-in)

### Success Metrics (GA Target)

- 1M+ API calls per month
- 50+ enterprise customers
- 4.2+/5.0 customer satisfaction
- 99.9% uptime
- Zero critical security incidents

**Speaker Notes:** "Remote MCP is our flagship product for enterprise AI automation. We have 5 design partners validated, 100% API compatibility verified across 3 production scenarios. March 2026 FabCon launch is critical path."

---

## Slide 6: Spec #3 - Platform (14 pages)

**Fabric MCP(s) Platform: Enabling Workload Team Extensibility**

### Executive Summary

**What It Is:** Extensibility framework enabling Fabric workload teams to build domain-specific MCP servers using shared platform infrastructure

**Status:** 🟢 **Active & Ongoing**

**Current Pilots:**
- Power BI: DAX generation, Best Practice Analyzer
- Real-Time Intelligence: KQL queries, event stream automation

### The Problem

**Why Extensibility Matters:**

**Without Platform:**
- Platform team bottleneck (can't be expert in DAX, KQL, pipelines, etc.)
- Workload teams blocked waiting months for features
- Inconsistent security if teams build separately

**With Platform:**
- Workload teams build domain-specific tools leveraging shared infrastructure
- Platform provides: Auth, audit logging, rate limiting, hosting
- Workload teams provide: Domain expertise and tool logic

### The 3-Bucket Categorization Model

**When workload teams propose tools, we categorize into 3 buckets:**

| Bucket | Description | Timeline | Example |
|--------|-------------|----------|---------|
| **A: Public API Exists** | Tool maps to existing Fabric API | 2 weeks | `create_eventstream()` |
| **B: Should Be Public API** | Add to API first, then MCP | API timeline + 2 weeks | `refresh_semantic_model()` |
| **C: AI-Only Operation** | Build separate workload MCP | 2-4 weeks | `generate_dax_query()` |

**Decision Tree:**

```
Q1: Does Fabric public API exist? 
  → YES: Bucket A (add to Remote MCP)
  → NO ↓

Q2: Would developers want SDK/CLI access?
  → YES: Bucket B (add to API first)
  → NO ↓

Q3: Is this AI-agent-specific only?
  → YES: Bucket C (build workload MCP)
```

### Current Pilots - Power BI MCP

**Proposed Tools (Bucket C - AI-Specific):**

- `generate_dax_query`: Analyzes semantic model, generates DAX from natural language
- `optimize_dax`: Suggests performance improvements for existing DAX
- `run_best_practice_analyzer`: Scans model for common issues

**What Platform Provides:**
- ✅ OAuth2 authentication (Power BI writes zero auth code)
- ✅ Audit logging (automatic for all tool calls)
- ✅ Rate limiting (consistent policies)
- ✅ Hosting infrastructure (deploy to api.fabric.microsoft.com/mcp/powerbi)

**What Power BI Owns:**
- Tool logic implementation (DAX generation algorithms)
- Documentation and examples
- Support SLA for their tools

**Timeline:** Q1 2026 (targeting FabCon demo)

### Phase 2 Vision: Unified Endpoint (H1 2027)

**Current State (Phase 1):**
- Agents connect to multiple endpoints: /mcp/core, /mcp/powerbi, /mcp/rti
- Fragmented discovery, multiple auth flows

**Future State (Phase 2):**
- **One endpoint:** `api.fabric.microsoft.com/mcp`
- Agents call `tools/list` → discover ALL tools (core + Power BI + RTI + others)
- Unified auth, governance, audit logging

**The "USB Type-C Hub" Metaphor:**
- Just like USB Type-C provides one port for all devices
- MCP provides one endpoint for all Fabric capabilities
- Universal standard, simplified configuration

### Success Criteria

- 3+ workload teams with live MCP servers by end of 2026
- < 2 weeks turnaround for Bucket A tools
- 0 security incidents from workload extensions
- 4.0+/5.0 workload team satisfaction

**Speaker Notes:** "Platform is how we scale beyond what platform team can build alone. Power BI and RTI are pilot teams proving the model. By enabling workload teams, we unlock domain-specific AI capabilities we could never build ourselves."

---

## Slide 7: Spec #4 - Unified Vision (7 pages)

**Unified Fabric MCP Server: One Endpoint for All Capabilities**

### Executive Summary

**What It Is:** Future vision where agents connect to a single MCP endpoint and discover ALL Fabric capabilities through unified tool catalog

**Timeline:** H1 2027 (post-GA of Remote MCP)

**Status:** 🔵 Vision Phase - Architecture definition needed Q1 2026

### The Problem: Multi-MCP Complexity

**Current Reality (Phase 1):**

Agent configuration today requires managing multiple MCP connections:

```json
{
  "mcpServers": {
    "Fabric-Core": { "url": "api.fabric.microsoft.com/mcp/core" },
    "Power-BI": { "url": "api.fabric.microsoft.com/mcp/powerbi" },
    "Data-Factory": { "url": "api.fabric.microsoft.com/mcp/datafactory" },
    "RTI": { "url": "api.fabric.microsoft.com/mcp/rti" }
  }
}
```

**Pain Points:**
- 4+ separate connections to manage
- 4+ authentication flows
- Fragmented tool discovery (must query each server separately)
- Inconsistent governance models
- Configuration complexity scales with number of workloads

### The Vision: "USB Type-C Hub" for AI Agents

**What Changes:**

```json
{
  "mcpServers": {
    "Fabric": { "url": "api.fabric.microsoft.com/mcp" }
  }
}
```

**One Connection, Complete Discovery:**

```
Agent calls: tools/list

Response:
- create_workspace (provider: fabric-core)
- create_item (provider: fabric-core)
- generate_dax (provider: powerbi)
- create_pipeline (provider: datafactory)
- query_kql (provider: rti)
- custom_compliance_check (provider: customer-extension)
```

**Key Benefits:**
- ✅ Single authentication flow
- ✅ Unified tool discovery
- ✅ Centralized governance and audit logging
- ✅ Simplified agent configuration
- ✅ Ecosystem extensibility without fragmentation

### Three User Stories

**Story 1: Enterprise AI Agent Developer**
- Current: Configure 5+ MCP connections, manage separate credentials
- Future: One connection, one auth, discover all tools
- Impact: 80%+ reduction in configuration complexity

**Story 2: Fabric Administrator**
- Current: Govern multiple MCP endpoints separately
- Future: Single control plane for all MCP activity
- Impact: Centralized visibility, unified policies

**Story 3: Workload Team (Power BI)**
- Current: Build separate MCP, customers add as new connection
- Future: Contribute tools via platform, automatically available through unified endpoint
- Impact: Faster customer adoption, simplified distribution

### Requirements (High-Level)

**Must-Haves:**
- Single endpoint URL for all Fabric MCP capabilities
- Unified `tools/list` aggregating core + workload + partner tools
- Consistent authentication (one OAuth2 flow)
- Transparent routing to appropriate backend MCP server
- Centralized audit logging and governance

**Open Questions:**
- Technical approach: Federation? Aggregation? Routing? Alternative?
- Performance impact of aggregation layer
- Versioning strategy for tools across providers
- Backward compatibility for agents using Phase 1 endpoints

### Dependencies

**Prerequisites:**
- Remote MCP GA (September 2026)
- Multiple workload MCPs operational (Power BI, RTI validated)
- Learnings from Phase 1: Usage patterns, pain points, technical challenges

**Next Steps:**
- Q1 2026: Architecture definition and technical approach
- Q2 2026: Engineering feasibility study
- H1 2027: Implementation (post-GA of Remote MCP)

**Speaker Notes:** "This is our north star—the complete vision of Fabric as a unified platform for AI agents. We're not building this in 2026, but it's how we're designing everything. Remote MCP, Platform, all the pieces are building blocks toward this future."

---

## Slide 8: Spec #5 - MCP Server Item (7 pages)

**MCP Server Item Exploration: Customer-Created MCPs**

### Executive Summary

**What It Is:** Exploratory effort investigating customer-extensible MCP servers as Fabric Items

**Status:** ⚪ Exploration Phase - No committed timeline

**Purpose:** Understand feasibility, customer demand, and technical requirements for enabling customers to create custom MCP tools hosted within Fabric

### The Vision

**Customer Use Case:**

A healthcare organization needs AI agents to validate patient data against proprietary compliance rules:

1. **Customer creates:** Python function encoding compliance logic
2. **Fabric auto-generates:** MCP tool definition from function
3. **Fabric hosts:** MCP server automatically (customer doesn't manage infrastructure)
4. **Agents discover:** Custom tool appears in workspace-scoped MCP endpoint
5. **Agents invoke:** Compliance validation via standard MCP protocol

**Result:** Customers extend Fabric's AI capabilities with their own domain logic

### Three Exploratory Scenarios

**Scenario 1: Finance Team - Custom Calculations**
- Problem: Proprietary revenue recognition rules not in standard BI tools
- Solution: Encode as MCP tool, agents apply consistently across reports
- Value: Organizational best practices as AI-accessible tools

**Scenario 2: Healthcare - Compliance Validation**
- Problem: HIPAA validation requires custom logic per organization
- Solution: MCP tool validates patient data before processing
- Value: Automated compliance checks in AI workflows

**Scenario 3: Retail ISV - Domain-Specific Transformations**
- Problem: ISV has unique retail analytics algorithms
- Solution: Package as MCP Item, distribute to customers
- Value: ISV builds once, customers use in AI agents

### Key Questions to Answer (Validation Needed)

**Customer Validation:**
1. Would customers actually build custom MCP tools?
2. What types of logic would they encode?
3. How technical are target users? (Python developers? Low-code?)

**Technical Feasibility:**
4. How to sandbox customer code securely?
5. Performance implications of customer-hosted logic?
6. How to handle customer code failures gracefully?

**Business Model:**
7. Pricing: Free? Metered? Part of capacity?
8. Support model: Platform owns hosting, customer owns logic?

**Ecosystem:**
9. Can ISVs distribute MCP Items on AppSource?
10. Versioning and lifecycle management?

**Security & Governance:**
11. How to prevent malicious code?
12. Compliance certifications (SOC2) with customer code?

### Next Steps (No Committed Timeline)

**Phase 1: Customer Research (Q1-Q2 2026)**
- Design partner interviews (5-10 enterprises)
- ISV partner feedback (marketplace potential)
- Validate demand and prioritize scenarios

**Phase 2: Technical Prototype (TBD)**
- Proof-of-concept: Python UDF → MCP tool
- Sandboxing and security evaluation
- Performance benchmarking

**Phase 3: Go/No-Go Decision (TBD)**
- Business case validation
- Engineering feasibility confirmed
- Roadmap prioritization vs. other efforts

**Current Status:** Exploration only—no engineering commitment yet

**Speaker Notes:** "This is our most exploratory effort. We see the potential—enabling customers to extend Fabric's AI capabilities with their own logic. But we need validation before committing resources. Unlike the other 4 specs, this is purely investigative right now."

---

## Slide 9: All Five Specs at a Glance

**The Complete Picture**

| Spec | What It Is | Pages | Status | Key Milestone |
|------|-----------|-------|--------|---------------|
| **1. Local MCP** | AI-assisted code generation for developers | 19 | ✅ Public Preview Live | GA: March 2026 |
| **2. Remote MCP** | Cloud-hosted agent execution platform | 25 | 🟢 Active Development | M1: **March 2026 (FabCon)** |
| **3. Platform** | Workload team extensibility framework | 14 | 🟢 Active & Ongoing | Power BI pilot Q1 2026 |
| **4. Unified Vision** | Single endpoint for all capabilities | 7 | 🔵 Vision Phase | Architecture: Q1 2026 |
| **5. MCP Server Item** | Customer-created MCPs (exploration) | 7 | ⚪ Exploration | Research: Q1-Q2 2026 |

**Total:** 72 pages of engineering-ready specifications

**How They Connect:**

```
┌────────────────────────────────────────┐
│  Unified MCP Server (Future H1 2027)  │
│  "One endpoint for everything"         │
└──────────────┬─────────────────────────┘
               │
    ┌──────────┴─────────┬────────────┬──────────┐
    │                    │            │          │
┌───▼────────┐  ┌───────▼──────┐  ┌──▼──────┐  ┌▼──────────┐
│ Local MCP  │  │ Remote MCP   │  │Platform │  │MCP Server │
│ (Dev Code) │  │ (Cloud Exec) │  │(Workload│  │Item       │
│            │  │              │  │Extend)  │  │(Customer) │
└────────────┘  └──────────────┘  └─────────┘  └───────────┘
```

---

## Slide 10: Strategic Alignment - Why This Matters

**Market Leadership Through Open Standards**

### Competitive Landscape

**Proprietary Approaches:**
- **Snowflake:** Cortex Agents (closed ecosystem, Snowflake-only)
- **Databricks:** Mosaic AI (platform-specific)
- **AWS:** Bedrock Agents (AWS-only)

**Fabric's Differentiation:**
- ✅ **Open MCP Standard:** Any agent platform can connect
- ✅ **Comprehensive Coverage:** 100+ public APIs, all workloads
- ✅ **Enterprise Trust:** SOC2, ISO 27001, comprehensive governance
- ✅ **Microsoft Ecosystem:** Copilot Studio, Azure AI, seamless integration

### Strategic Opportunity

**What We Achieve:**
- First major analytics platform with production-grade MCP support
- Capture AI-native customer segment before competitors
- Position Fabric as platform of choice for agentic AI era

**Risk if We Don't Execute:**
- Competitors ship agent frameworks, Fabric perceived as "legacy"
- Lose next-generation developers choosing "agent-first" platforms
- Miss wave of AI automation adoption in analytics

### Validated Customer Demand

**Design Partner Evidence:**
- **5 design partners** (PwC, Avanade, KPMG, + 2 under NDA)
- **100% expressed strong interest** in Remote MCP
- **3 production scenarios** validated end-to-end with 100% API compatibility

**Key Quotes:**
- KPMG: "Could replace ~5,000 lines of custom wrapper code"
- The Reporting Hub: "$68K annual savings, 90%+ faster customer onboarding"
- Avanade: "Transforms multi-day process into quick, verified operation"

---

## Slide 11: Timeline & Critical Path

**2026-2027 Roadmap**

| Quarter | Milestones |
|---------|-----------|
| **Q4 2025** | • Local MCP: Public Preview live ✅<br>• Remote MCP: Development sprint 🟢<br>• Platform: Power BI + RTI pilots active 🟢 |
| **Q1 2026** | • Remote MCP: **Private Preview (Jan)** 🎯<br>• Remote MCP: **Public Preview (Mar, FabCon Atlanta)** 🎯🎯🎯<br>• Local MCP: VS Code extension<br>• Unified Vision: Architecture definition<br>• Platform: Power BI MCP demo at FabCon |
| **Q2 2026** | • Local MCP: Execution tools (file upload, item ops)<br>• Remote MCP: Feature iteration<br>• Platform: RTI MCP live<br>• MCP Server Item: Customer research |
| **Q3 2026** | • Remote MCP: **GA (Sept, FabCon Europe)** 🎯<br>• Local MCP: **GA (March or Sept)** 🎯<br>• Platform: Additional workloads onboard |
| **Q4 2026** | • Platform: 3+ workload MCPs operational<br>• Unified Vision: Feasibility evaluation |
| **H1 2027** | • Unified MCP Server: Implementation begins |

**Critical Path:** Remote MCP Public Preview at FabCon Atlanta (March 2026)

---

## Slide 12: Success Metrics Across All Efforts

**Quantified Goals by GA (September 2026)**

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Developer Adoption** | 5,000+ active developers (Local + Remote MCP) | Weekly tool invocations, VS Code installs |
| **Agent Integration** | 50+ AI platforms integrated with Remote MCP | Platform telemetry |
| **API Call Volume** | 1M+ calls/month (Remote MCP) | Gateway metrics |
| **Workload MCPs** | 3+ workload teams with live MCP servers | Platform team tracking |
| **Developer Satisfaction** | 80%+ satisfaction score | NPS surveys, quarterly feedback |
| **Code Quality** | 75%+ first-attempt success (Local MCP) | Schema validation, deployment success rates |
| **Time Savings** | 60-90% reduction in manual provisioning | Customer validation studies |
| **Security** | 0 critical security incidents | Security dashboard monitoring |

**Shared Success Indicators:**
- Customer references and case studies
- Community engagement (GitHub stars, contributions)
- Competitive win rate (Fabric chosen for AI capabilities)

---

## Slide 13: Cross-Team Dependencies

**Critical Dependencies for Success**

### Remote MCP Dependencies

| Dependency | Owner | Status | Impact | Mitigation |
|------------|-------|--------|--------|------------|
| **Security Review** | Microsoft Security | In Progress | M1 Blocker | Started early, weekly syncs |
| **Fabric Public APIs** | Fabric Core | Stable (GA) | All tools | Using only GA endpoints |
| **VS Code Extension** | Integration Team | Planned Q1 2026 | Developer UX | Early partnership established |
| **Copilot Studio Connector** | Copilot Studio Team | Planned M1 | Low-code scenarios | Active collaboration |

### Local MCP Dependencies

| Dependency | Owner | Status | Impact | Mitigation |
|------------|-------|--------|--------|------------|
| **.NET 9.x Runtime** | External | Stable | Foundation | Already GA, low risk |
| **VS Code Extension Review** | VS Code Marketplace | Not Started | M1 Feature | Submit Q1 2026, 2-week buffer |
| **Execution Tool APIs** | Fabric Core | Stable | Roadmap features | Using GA APIs only |

### Platform Dependencies

| Dependency | Owner | Status | Impact | Mitigation |
|------------|-------|--------|--------|------------|
| **Workload Team Engagement** | Power BI, RTI Teams | Active Pilots | Extensibility validation | 2 committed pilots |
| **Remote MCP Infrastructure** | Platform Team | On Track | Shared infrastructure | Same team ownership |

### Unified Vision Dependencies

| Dependency | Owner | Status | Impact | Mitigation |
|------------|-------|--------|--------|------------|
| **Remote MCP GA** | Platform Team | Sept 2026 | Phase 2 prerequisite | On track |
| **Multiple Workload MCPs** | Workload Teams | Q1-Q3 2026 | Architecture learnings | Pilots active |

---

## Slide 14: Engineering Handover - Key Requirements

**What Engineering Teams Need to Know**

### Spec 1: Local MCP

**M1 Requirements (Q1 2026 - VS Code Extension):**
- One-click installation from VS Code Marketplace
- Automatic MCP server startup (no manual commands)
- Integrated OAuth2 authentication (OS keychain storage)
- Status UI (connection indicator, error notifications)

**M2 Requirements (Q2 2026 - Execution Tools):**
- 4 execution tools: upload_file, create_item, update_item, delete_item
- OAuth2 interactive flow with token refresh
- Secure token storage (macOS Keychain, Windows Credential Manager, Linux Secret Service)
- RBAC enforcement (double-check pattern)

**Acceptance Criteria:**
- Sub-100ms latency for context tools
- < 3s latency for execution tools
- 95%+ deployment success rate
- Zero token logging or leakage

### Spec 2: Remote MCP

**M0 Requirements (Jan 2026 - Private Preview):**
- Core tool catalog operational (workspace, item, role operations)
- OAuth2 authentication flows (authorization code + client credentials)
- Design partner access (3-5 partners can connect)
- Internal documentation (architecture, API specs)

**M1 Requirements (Mar 2026 - Public Preview):**
- 23 tools covering all Fabric public APIs
- VS Code extension for seamless integration
- Copilot Studio connector published
- Comprehensive audit logging (every tool invocation)
- Tenant-level access control
- Rate limiting (60 calls/min per user)
- Public documentation on Microsoft Learn

**GA Requirements (Sept 2026):**
- 99.9% uptime SLA
- Advanced governance (tool-level permissions, read-only mode, admin dashboard)
- Compliance certifications (SOC2, ISO 27001, GDPR)
- Multi-region deployment (disaster recovery)
- Production monitoring and alerting

### Spec 3: Platform

**Ongoing Requirements:**
- 3-bucket tool categorization process operational
- Shared infrastructure for workload MCPs (auth, logging, hosting)
- Quality standards enforcement (security review, documentation validation)
- Review SLA: 2 weeks for Bucket A, 2-4 weeks for Bucket C

**Q1 2026:**
- Power BI MCP demo ready for FabCon
- RTI tools added to Remote MCP (Bucket A fast-track)

**Q4 2026:**
- 3+ workload teams with live MCP servers
- Evaluation of unified endpoint feasibility

---

## Slide 15: Risks & Mitigation Strategies

**Top Risks Across All Efforts**

### High-Impact Risks

| Risk | Probability | Impact | Mitigation | Owner |
|------|-------------|--------|------------|-------|
| **Security review delays M1** | Medium | High | Early start, no custom authZ simplifies review | Platform + Security |
| **Customer adoption slower than expected** | Medium | Medium | Design partner program, comprehensive docs, FabCon demo | PM + Marketing |
| **Workload teams lack capacity for Platform** | Medium | Medium | Start with 2 pilots, expand based on success | Platform + Workload Teams |
| **FabCon March deadline at risk** | Low | High | Monthly milestone tracking, buffer time built in | Platform + Leadership |

### Medium-Impact Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Performance doesn't meet expectations** | Low | Medium | Stateless design, horizontal scaling, load testing in M0 |
| **Tool catalog completeness feedback** | Low | Low | Continuous improvement model, extensibility framework |
| **Unified endpoint technical complexity** | Medium | Low | Phase 2 only after validation, architecture review Q1 2026 |

---

## Slide 16: Open Questions Requiring Decisions

**Critical Questions for Resolution**

### Strategic & Product Questions

| # | Question | Owner | Decision Needed By | Impact |
|---|----------|-------|-------------------|--------|
| 1 | Should tenant admin APIs be in Remote MCP or separate admin-scoped server? | Hasan + Security | Jan 2026 (M0) | M1 scope |
| 2 | M1 default: MCP enabled or disabled for tenants? | Hasan + Leadership | Jan 2026 (M0) | GA strategy |
| 3 | Should Remote MCP support preview/beta APIs or GA-only? | Hasan + Engineering | Feb 2026 | Extensibility |

### Governance & Security Questions

| # | Question | Owner | Decision Needed By | Impact |
|---|----------|-------|-------------------|--------|
| 4 | Advanced governance features: M1 vs. GA scope? (tool-level permissions, read-only mode, admin dashboard) | Hasan + Platform | Jan 2026 (M0) | M1 requirements |
| 5 | Audit logging: Add "initiated by AI agent" to Fabric logs or separate MCP logs? | Hasan + Gena + Compliance | Feb 2026 | Compliance |
| 6 | Admin control enforcement: How does MCP prevent operations when API permits them? | Engineering + Security | Feb 2026 | Governance model |

### Technical & Architecture Questions

| # | Question | Owner | Decision Needed By | Impact |
|---|----------|-------|-------------------|--------|
| 7 | Unified endpoint technical approach: Federation? Aggregation? Routing? | Engineering + Architecture | Q1 2026 | Phase 2 design |
| 8 | User identity resolution: Graph integration? Fabric API enhancement? Hybrid? | Hasan + Fabric API + Graph | Feb 2026 (M1) | Core scenarios |

### Integration & Ecosystem Questions

| # | Question | Owner | Decision Needed By | Impact |
|---|----------|-------|-------------------|--------|
| 9 | Copilot Studio pre-authorized App ID for zero-admin-consent? | Copilot Studio Team | Jan 2026 | M1 integration |
| 10 | Support model for custom workload MCPs (Bucket C)? | PM + Support | Q2 2026 | Platform adoption |

---

## Slide 17: What We Need - Critical Enablers

**For Successful Execution**

### 1. Executive Alignment

**Decisions Required:**
- ✅ Approval to proceed with March 2026 FabCon demo (Remote MCP Public Preview)
- ✅ Commitment to GA timeline (September 2026)
- 🔲 Mandate for workload team participation (Platform extensibility)
- 🔲 Resource allocation through GA (Q1-Q3 2026)

### 2. Cross-Team Commitments

**From Workload Teams:**
- Power BI: MCP pilot for FabCon demo (Q1 2026)
- RTI: Tool contributions and MCP pilot (Q1-Q2 2026)
- Additional workloads: Engagement plan for H2 2026

**From Platform/Infrastructure Teams:**
- Security: Review completion by end of January 2026
- Copilot Studio: Connector ready for M1 (March 2026)
- VS Code: Marketplace approval process (Q1 2026)

### 3. Customer Engagement

**Design Partner Program:**
- Remote MCP: 5 partners validated, ready for January private preview
- Local MCP: Ongoing ISV enablement and feedback
- Platform: Power BI and RTI workload validation

**Lighthouse Customers:**
- Recruit 10-15 early adopters for public preview (March-September 2026)
- Case study development for GA launch

### 4. Go-to-Market Support

**Marketing & Communications:**
- FabCon Atlanta keynote/demo slot (March 2026)
- Blog post series (Local MCP, Remote MCP, Platform)
- Microsoft Learn documentation (comprehensive tutorials)

**Community & Developer Relations:**
- GitHub repository management (issues, PRs, discussions)
- Developer outreach (ISV partners, community events)
- Documentation and sample code maintenance

---

## Slide 18: Next Steps & Action Items

**Immediate Actions (November-December 2025)**

### Week of Nov 18:
- ✅ **This Meeting:** Engineering handover and alignment on 5 specs
- 🔲 **Architecture Review:** Finalize extensibility model, unified endpoint approach
- 🔲 **Security Review Kickoff:** Remote MCP security assessment begins

### December 2025:
- 🔲 **Remote MCP M0:** Design partner access granted (lighthouse program)
- 🔲 **Local MCP:** Public preview iteration based on community feedback
- 🔲 **Platform:** Power BI MCP development sprint begins

### January 2026:
- 🎯 **Remote MCP M0 Launch:** Private preview with design partners
- 🔲 **Open Questions Resolution:** Decisions on governance, identity resolution, admin controls
- 🔲 **Unified Vision:** Architecture definition complete

### February 2026:
- 🔲 **M1 Readiness Review:** Go/no-go decision for FabCon Public Preview
- 🔲 **Documentation Sprint:** Microsoft Learn articles, samples, tutorials
- 🔲 **VS Code Extension:** Submit to marketplace for review

### March 2026:
- 🎯🎯🎯 **FabCon Atlanta:** Remote MCP Public Preview Launch (CRITICAL MILESTONE)
- 🎯 **Power BI MCP Demo:** Showcase workload extensibility
- 🎯 **Local MCP:** VS Code extension live

---

## Slide 19: Measuring Success - What Does Good Look Like?

**Success Indicators by Milestone**

### M0 Success (January 2026)
- ✅ 3+ design partners validate Remote MCP successfully
- ✅ Security review approved with no critical blockers
- ✅ Core technical functionality proven
- ✅ Positive design partner feedback (4.0+/5.0)

### M1 Success (March 2026 - FabCon)
- ✅ Successful FabCon demo (Remote MCP + Power BI MCP)
- ✅ 20+ active users within first month
- ✅ Comprehensive documentation on Microsoft Learn
- ✅ Zero critical security incidents
- ✅ VS Code extension published
- ✅ Copilot Studio connector available

### GA Success (September 2026)
- ✅ 1M+ API calls/month (Remote MCP)
- ✅ 5,000+ active developers (Local + Remote MCP)
- ✅ 50+ enterprise customers
- ✅ 3+ workload MCPs operational (Platform)
- ✅ 4.2+/5.0 customer satisfaction
- ✅ 99.9% uptime achievement
- ✅ Customer references and case studies
- ✅ Zero critical security incidents

### Strategic Success (2027+)
- ✅ Fabric recognized as most AI-agent-friendly analytics platform
- ✅ Unified MCP endpoint architecture defined and in development
- ✅ Active ecosystem of workload and partner MCPs
- ✅ Competitive differentiation validated in market

---

## Slide 20: Questions & Discussion

**Open for Discussion:**

1. **Strategic Alignment:** Do we have agreement on the 5-effort approach and priorities?
2. **Timeline Validation:** Is March 2026 FabCon launch achievable? What risks need mitigation?
3. **Open Questions:** Which of the 10 open questions are most critical to resolve first?
4. **Resource Allocation:** Do teams have capacity to execute their commitments?
5. **Cross-Team Coordination:** What additional coordination is needed?

**Documentation Available:**

📄 **5 Comprehensive Specifications (72 pages):**
1. Local MCP (19 pages)
2. Remote MCP (25 pages)
3. Platform (14 pages)
4. Unified Vision (7 pages)
5. MCP Server Item (7 pages)

📊 **Supporting Materials:**
- Design partner validation data
- Customer feedback and quotes
- Risk analysis and mitigation plans
- Engineering architecture documents
- Competitive analysis

**Contact:** Hasan Abo-Shally (hasanabo@microsoft.com)

---

## APPENDIX: Quick Reference Tables

### Spec Summary Table

| Spec | Pages | Focus | Timeline | Key Deliverable |
|------|-------|-------|----------|----------------|
| **Local MCP** | 19 | Developer code generation | GA: March 2026 | VS Code extension, 6 context + 4 execution tools |
| **Remote MCP** | 25 | Cloud-hosted agent execution | Jan 2026 → GA Sept 2026 | 23 tools, OAuth2, enterprise governance |
| **Platform** | 14 | Workload extensibility | Ongoing | 3-bucket model, Power BI + RTI pilots |
| **Unified Vision** | 7 | Single endpoint future | Architecture: Q1 2026, Build: H1 2027 | USB Type-C hub for AI agents |
| **MCP Server Item** | 7 | Customer extensibility | Exploration (TBD) | Research findings, go/no-go decision |

### Critical Milestones Table

| Date | Milestone | Effort | Criticality |
|------|-----------|--------|-------------|
| **Jan 2026** | Remote MCP M0 (Private Preview) | Remote MCP | High |
| **Mar 2026** | **Remote MCP M1 (Public Preview at FabCon Atlanta)** | Remote MCP | **CRITICAL** |
| **Mar 2026** | Local MCP VS Code Extension | Local MCP | High |
| **Mar 2026** | Power BI MCP Demo | Platform | Medium |
| **Q2 2026** | Local MCP Execution Tools | Local MCP | Medium |
| **Sept 2026** | Remote MCP GA (FabCon Europe) | Remote MCP | High |
| **Sept 2026** | Local MCP GA | Local MCP | High |
| **Q4 2026** | 3+ Workload MCPs Operational | Platform | Medium |
| **Q1 2026** | Unified Vision Architecture Defined | Unified Vision | Medium |
| **H1 2027** | Unified MCP Implementation Begins | Unified Vision | Low |

### Design Partner Validation Status

| Partner | Effort | Scenario Validated | Status | Key Feedback |
|---------|--------|-------------------|--------|--------------|
| **PwC** | Remote MCP | Customer Onboarding | ✅ Validated | "Eliminates primary support ticket category" |
| **KPMG** | Remote MCP | Compliance Scanning | ✅ Validated | "Could replace ~5,000 lines of wrapper code" |
| **Avanade** | Remote MCP | Bulk Admin Handover | ✅ Validated | "Transforms multi-day process to minutes" |
| **The Reporting Hub** | Remote MCP | Customer Onboarding | ✅ Validated | "$68K annual savings, 90%+ faster" |
| **Enterprise (NDA)** | Remote MCP | Multi-scenario | ✅ Validated | Strong interest across multiple use cases |
| **Power BI Team** | Platform | DAX Generation MCP | 🟢 Active Pilot | On track for Q1 2026 demo |
| **RTI Team** | Platform | Event Stream + KQL MCP | 🟢 Active Pilot | Hybrid approach validated (Bucket A + C) |
| **ISV Partners** | Local MCP | Code Generation | ✅ Validated | "Reduced integration time by more than half" |

---

**END OF PRESENTATION**
