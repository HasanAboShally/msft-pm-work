# Fabric MCP Strategy
## Building the Backbone of Fabric's AI-Native Future

November 19, 2025

---

## Slide 1: Title

**Microsoft Fabric MCP Strategy**  
**Building the Backbone of Fabric's AI-Native Future**

---

## Slide 2: The AI Transformation

**Industry Shift: Data Platforms → Intelligence Platforms**

- **62%** of enterprises cite "integration complexity" as top AI barrier (Gartner)
- **68%** of orgs expect integrated AI agents by 2026 (Protiviti)
- **15,000+** MCP servers deployed globally

**Fabric's Response:**  
Model Context Protocol - the open standard for AI agent integration

**Just announced:** Fabric IQ (Nov 18, 2025) - "From Data Platform to Intelligence Platform"

---

## Slide 3: Three Strategic Scenarios

| # | Scenario | Users | Priority | Impact |
|---|----------|-------|----------|--------|
| 1 | **Unified Fabric Copilot** | All Fabric users (Power BI-led) | **P0** | 75K → 35M MAU potential |
| 2 | **Empower Pro Developers** | Data engineers, ISVs | **P0** | Our charter, Fabric pro-dev shift |
| 3 | **Copilot Studio Ecosystem** | Custom agent builders | **P1** | Ecosystem growth, competitive edge |

**One cohesive strategy** for AI-native Fabric

---

## Slide 4: Scenario 1 - Unified Copilot

**Power BI Initiative: ONE Copilot across all Fabric**

**What Users Get:**
- Single conversational AI for all workloads
- "Create workspace, add lakehouse, configure permissions"
- Seamless portal experience

**Current:** Separate Copilots per workload (fragmented)  
**Future:** Unified experience powered by MCP

---

## Slide 5: What Unified Copilot Needs

**To enable this vision, the platform must provide:**

✅ **Cloud-hosted execution** - Can't run on user's machine, needs enterprise infrastructure  
✅ **Control plane operations** - Create/manage workspaces, items across all workloads  
✅ **Workload extensibility** - Each team contributes domain-specific tools  
✅ **Enterprise security** - OAuth2, RBAC, audit logs, tenant policies  
✅ **Real-time capabilities** - Streaming progress updates for long operations

**The Challenge:** No single team can build this alone

---

## Slide 6: Why Unified Copilot Matters

**Impact on Fabric Users:**
- 52% faster task completion, 36% higher accuracy
- Natural language → production workflows
- Democratized data access

**Impact on Our Team:**
- Organization-wide visibility
- Foundation for all Fabric AI scenarios
- Strategic partnership with Power BI

**Impact on Fabric:**
- 75K Copilot MAU → 35M total Fabric MAU potential
- Industry leadership in AI-native analytics

**Bottom Line:** If Unified Copilot succeeds, we succeed.

---

## Slide 7: Scenario 2 - Empower Pro Developers

**Our Core Charter: Make Fabric Pro-Dev Friendly**

**Ren, Data Engineer - Deploy 50 Customer Environments:**

| Today (Manual) | Tomorrow (AI-Powered) |
|----------------|----------------|
| ⏱️ 2-3 days per customer | ⏱️ 5 minutes |
| ❌ 3-4 failed attempts | ✅ First-attempt success |
| 😞 Portal clicking, context switching | 😊 Stay in VS Code, conversational |
| 📉 5 customers/quarter | 📈 200+ customers/quarter |

**The Gap:** Fabric APIs exist, but AI integration complexity is the barrier

---

## Slide 8: What Pro Developers Need

**Developer Requirements:**

✅ **Context tools** - API docs, schemas, code examples, best practices  
✅ **Execution tools** - File upload/download, item create/update/delete  
✅ **Local-first** - No cloud calls, fast (<100ms), works offline  
✅ **VS Code integration** - Native extension, chat integration

**Key Insight:** Developers want AI assistants that understand Fabric

---

## Slide 11: Our Solution for Pro Developers

**We Provide:**

**Local MCP** - Context tools (SHIPPED ✅)
- 6 tools: API specs, schemas, code examples, best practices, docs search
- Open source: `microsoft/mcp` repository
- Sub-100ms response times

**M1 (Q1 2026):** VS Code extension  
**M2 (Q2 2026):** Execution tools (file ops, item management)

**Plus:** All Remote MCP tools work for programmatic automation

---

## Slide 12: Why Pro Developers Matter

**Impact on Developers:**
- 68% say "best tools" drive platform choice
- Conversational workflows = faster onboarding
- Automation removes deployment bottlenecks

**Impact on Our Team:**
- Direct charter alignment
- Showcase for open-source leadership
- Foundation for ISV ecosystem

**Impact on Fabric:**
- 208K active developers (272% YoY growth)
- 8.8M API calls/month → accelerated growth
- Win vs. Databricks, Snowflake on developer experience

---

## Slide 13: Scenario 3 - Copilot Studio Ecosystem

**The Opportunity: Custom AI Agents**

**What Enterprises Want:**
- Finance agent: automate monthly reporting
- Operations agent: monitor KPIs, trigger alerts
- Custom workflows without coding

**Azure Copilot Studio:** Platform for building custom agents  
**Fabric MCP:** Plug-and-play Fabric integration

---

## Slide 14: Our Solution for Copilot Studio

**We Provide:**

**Remote MCP as consumable service**
- Any Copilot Studio agent → instant Fabric access
- No custom integration code needed
- Same enterprise security as internal tools

**Example Use Cases:**
- ISV builds retail analytics agent
- Enterprise HR builds workforce insights agent
- Partner solutions with embedded Fabric

---

## Slide 15: Why Copilot Studio Matters

**Impact on Enterprises:**
- Reduced time-to-value for custom agents
- No Fabric API learning curve
- Reusable agent templates

**Impact on Fabric:**
- Ecosystem multiplier (ISVs, partners extend reach)
- Usage expansion beyond core data tasks
- Competitive differentiation vs. platforms without agent support

**Strategic Value:** Early mover advantage in AI agent ecosystem

---

## Slide 16: Timeline & Key Milestones

**Q4 2025 (Now)**
- ✅ Local MCP Public Preview LIVE
- 🟢 Remote MCP dev environment operational
- 🟢 Power BI + RTI pilots active

**Q1 2026 - Critical Path**
- ✅ Remote MCP Private Preview (Jan 2026)
- ✅ VS Code Extension M1 (Feb 2026)
- ✅ Remote MCP Public Preview @ FabCon Atlanta (March 2026)

**Q2 2026 - GA Push**
- ✅ Remote MCP GA @ MS Build (May 2026)
- ✅ Local MCP M2 Execution Tools (May 2026)
- ✅ 3+ workload MCPs contributed (Power BI, RTI, Data Factory)

**⚠️ KEY RISK: Accelerated Timeline**
- Original plan: September 2026 GA
- **New target: May 2026 (4 months earlier)**
- Driven by: Unified Copilot org priority, Build announcement opportunity

---

## Slide 17: What's Already Built

**Local MCP**
- ✅ Public Preview shipped (6 context tools live)
- ✅ Open source: microsoft/mcp repository
- **Next:** VS Code extension (Q1 2026)

**Remote MCP**
- ✅ Dev environment operational (~80% complete)
- ✅ OAuth2 flows working (user + service principal)
- ✅ Streaming capability implemented
- **Next:** Private preview with design partners (Jan 2026)

**Fabric MCPs Platform**
- ✅ Pilots active with Power BI, RTI teams
- ✅ 3-bucket contribution model defined
- **Next:** Onboard Data Factory, OneLake (Q2 2026)

---

## Slide 18: Requirements - Remote MCP

### **Authentication & Security**
- ✅ OAuth2 flows (user + service principal)
- ✅ Token validation, secure storage (OS keychain)
- ✅ RBAC enforcement (double-check pattern)
- ✅ HTTPS-only (TLS 1.2+)

### **Tool Execution Engine**
- ✅ Core control plane tools (workspace, items, permissions, capacity)
- ✅ Async LRO polling, timeout handling
- ✅ Streaming capability (real-time progress)
- ✅ Error handling (actionable messages)
- ✅ Pagination support

### **Governance & Audit**
- ✅ Centralized audit logs (queryable via KQL)
- ✅ Tenant-level rate limiting
- ✅ Compliance standards (SOC2, ISO 27001)
- ✅ Data residency support (multi-region)

**Dependencies:** Identity, Governance, Capacity teams (aligned)

📋 Complete requirements in Appendix F

---

## Slide 19: Requirements - Local MCP

**Context Tools (6 tools - SHIPPED ✅):**
- `get_api_specs` - Fabric API documentation
- `get_item_schemas` - JSON schemas for all item types
- `get_code_examples` - Sample code snippets
- `get_best_practices` - Development guidance
- `search_documentation` - Semantic search
- Sub-100ms response times

**M1: VS Code Extension (Q1 2026)**
- Native chat integration
- Inline code suggestions
- Auto-completion for Fabric APIs
- Local execution (no cloud calls)
- Cross-platform (Windows, Mac, Linux)

**M2: Execution Tools (Q2 2026)**
- File upload/download
- Item create/update/delete
- Local testing before deployment
- Works with Remote MCP for full automation

**Dependencies:** VS Code extension team (aligned)

📋 Complete requirements in Appendix F

---

## Slide 20: Requirements - Platform

### **Core Infrastructure**

**3-Bucket Contribution Model:**
- ✅ Bucket A: Existing APIs → 2 weeks to MCP
- ✅ Bucket B: New APIs → API-first, then integrate
- ✅ Bucket C: AI-specific → Workload-owned MCPs
- Clear guidelines, versioning strategy

**Shared Infrastructure:**
- ✅ Unified auth (OAuth2, shared validation)
- ✅ Centralized audit logging (consistent schema)
- ✅ Rate limiting (tenant + user quotas)
- ✅ Tool routing & discovery
- ✅ Health monitoring & alerting
- ✅ Developer portal (docs, sandbox)

### **Workload Team Commitments**

**Power BI (P0):** DAX generation, BPA - Q1 2026 - 2-4 weeks  
**RTI (P0):** Event streams, KQL - Q1 2026 - 2-4 weeks  
**Data Factory (P1):** Pipeline orchestration - Q2 2026 - 2-4 weeks

📋 Complete requirements in Appendix F

---

## Slide 21: PM Coordination & Execution

**Workstream 1: Cross-Team Alignment**
- Weekly syncs with Power BI, RTI, Data Factory
- Monthly reviews with Governance, Identity teams
- Unified Copilot integration checkpoints

**Workstream 2: Partner Engagement**
- Design partner previews (PwC, KPMG, Avanade, 2 enterprises)
- Early feedback loops (monthly)
- Co-marketing @ FabCon, Build

**Workstream 3: Documentation & Enablement**
- Developer docs (getting started, API reference)
- Sample code repo, starter templates
- Internal training for support teams

---

## Slide 22: Engineering Next Steps

**Immediate Actions Needed:**

**Priority Alignment**
- Confirm P0 scenarios (Unified Copilot, Pro Dev) drive all decisions
- Validate resource allocation across three efforts

**Feasibility Check**
- May 2026 Build GA realistic?
- Streaming requirements complete?
- Multi-region deployment timeline?

**Team Commitments**
- Power BI: Confirm Q1 2026 tool contributions
- RTI: Align on event stream schema
- Data Factory: Confirm interest, Q2 2026 timeline

**Follow-Up**
- Weekly engineering syncs start next week
- Bi-weekly PM/Eng alignment meetings

---

## Slide 23: Open Questions

**Technical Decisions:**
1. Latency tolerance for conversational UX? (Target: <2s)
2. Support interactive + autonomous agent patterns?
3. Multi-region deployment: which regions first?
4. Rate limiting: per-user vs per-tenant caps?
5. Streaming complete - what other workload capabilities needed?

**Project Risks:**
- ⚠️ Accelerated timeline (Sept → May 2026)
- ⚠️ Cross-team dependencies (Power BI, RTI, Identity, Governance)
- ⚠️ Design partner feedback integration
- ⚠️ Compliance/security reviews timeline
- ⚠️ Resource constraints (hiring, competing priorities)

---

## Slide 24: Success Criteria (6 Months)

**Metrics:**
- 50K MCP MAU at GA (vs 75K Power BI Copilot today)
- 3+ workload MCPs contributed (Power BI, RTI, Data Factory)
- 5 design partner deployments in production
- <2s p95 response time for tool execution

**Outcomes:**
- Unified Copilot powered by Remote MCP
- VS Code extension with 10K+ installs
- Fabric positioned as "most AI-agent-friendly analytics platform"

**Strategic Position:**
- First mover in MCP for enterprise analytics
- Open standard leadership (microsoft/mcp ecosystem)
- Competitive advantage vs. Databricks, Snowflake

---

## Slide 25: Bottom Line

**We're not just building features.**  
**We're building Fabric's AI-native future.**

**What We're Delivering:**
- ✅ Remote MCP - Cloud execution for unified Copilot
- ✅ Local MCP - Developer productivity tools
- ✅ Fabric MCPs Platform - Workload extensibility

**What This Enables:**
- ONE unified Copilot (35M MAU potential)
- Pro-dev automation (208K developers, growing 272% YoY)
- Custom agent ecosystem (ISVs, enterprises)

**What We Need:**
- Alignment on priorities (P0: Unified Copilot, Pro Dev)
- Commitment on timeline (May 2026 GA)
- Cross-team execution (Power BI, RTI, Governance, Identity)

**Expected Outcome:**  
Fabric becomes the platform of choice for AI-driven analytics workflows.

---

# APPENDIX

---

## Appendix A: Complete Tools Catalog

### Remote MCP Tools (23 tools)

**Workspace Operations (5 tools)**
- create_workspace, update_workspace, delete_workspace
- list_workspaces, get_workspace

**Item Operations (6 tools)**
- create_item, update_item, delete_item
- list_items, get_item, get_item_definition

**Permission Operations (4 tools)**
- add_workspace_role_assignment, remove_workspace_role_assignment
- add_item_permission, remove_item_permission

**Capacity Operations (3 tools)**
- list_capacities, get_capacity, get_capacity_workloads

**Job Operations (3 tools)**
- get_item_job_instance, cancel_item_job_instance
- run_on_demand_item_job

**Git Operations (2 tools)**
- git_connect, git_disconnect

### Local MCP Tools (6 tools - SHIPPED)

- get_api_specs, get_item_schemas, get_code_examples
- get_best_practices, search_documentation, get_fabric_glossary

---

## Appendix B: Architecture Overview

**Remote MCP Architecture**
- Cloud-hosted MCP server (Azure)
- OAuth2 authentication → Fabric APIs
- Stateless, horizontally scalable
- Multi-region deployment

**Local MCP Architecture**
- Runs on developer machine
- No cloud calls (local context only)
- VS Code extension integration
- Open source (microsoft/mcp)

**Integration Pattern**
- AI Agent → MCP Client → MCP Server → Fabric APIs
- Standard MCP protocol (JSON-RPC over stdio/SSE)
- Works with any MCP-compatible AI (Claude, ChatGPT, Copilot)

---

## Appendix C: Customer Quotes & Validation

**Design Partners (Under NDA):**

**PwC:**  
*"We're building AI agents for client audit workflows. Fabric MCP eliminates 3-4 weeks of custom API integration work per client."*

**KPMG:**  
*"Automated compliance reporting agents are our #1 request. MCP makes this feasible at scale."*

**Enterprise Partner (Fortune 500 Retail):**  
*"Store operations agents need real-time data access. Fabric MCP + RTI tools give us sub-second query responses."*

**Avanade:**  
*"Our ISV partners want pre-built agents. Fabric MCP lets us package solutions without teaching every partner the Fabric API."*

---

## Appendix D: Competitive Landscape

| Platform | MCP Support | AI Agent Strategy | Fabric Advantage |
|----------|-------------|-------------------|------------------|
| **Databricks** | ❌ No | Proprietary agent framework (limited) | ✅ Open standard (MCP) |
| **Snowflake** | ❌ No | Cortex AI (closed ecosystem) | ✅ Works with any AI (Claude, ChatGPT, Copilot) |
| **AWS Redshift** | ❌ No | Bedrock integration only | ✅ Multi-AI compatibility |
| **Google BigQuery** | ❌ No | Vertex AI agents (Google-only) | ✅ Developer choice (VS Code, CLI, any tool) |
| **Microsoft Fabric** | ✅ Yes | **Open MCP standard** | **First mover, ecosystem play** |

**Strategic Differentiation:** Only enterprise analytics platform with native MCP support.

---

## Appendix E: Sources & References

**Fabric Metrics (Internal Telemetry, Nov 2025):**
- 35.2M Fabric MAU
- 208K active developers (272% YoY growth)
- ~75K Power BI Copilot MAU
- 8.8M API calls/month (5.9M REST + 2.9M CLI)

**Industry Research:**
- Gartner 2024: AI integration complexity survey
- Protiviti 2025: AI agent adoption forecast
- Microsoft Research: Copilot productivity metrics

**Fabric Announcements:**
- Fabric IQ Launch (Nov 18, 2025)
- RTI MCP Server Preview (Sept 2025)

**External References:**
- 15,000+ MCP servers globally (MCP community metrics)
- Model Context Protocol specification (Anthropic, open standard)

---

## Appendix F: Detailed Requirements Reference

### Remote MCP - Detailed Requirements

**Authentication & Security (8 P0 requirements)**
- OAuth2 flows (user + service principal)
- Token validation, secure storage (OS keychain)
- RBAC enforcement (double-check pattern)
- HTTPS-only (TLS 1.2+)
- Certificate pinning
- Token refresh handling
- Service principal rotation

**Tool Execution Engine (12 P0 requirements)**
- Core control plane tools (workspace, items, permissions, capacity)
- Async LRO polling with timeout handling
- Streaming capability (real-time progress)
- Error handling (actionable messages)
- Pagination support
- Retry logic (exponential backoff)
- Request correlation IDs
- Multi-tenant isolation

**Governance & Audit (6 P0 requirements)**
- Centralized audit logs (all tool calls logged)
- Queryable via KQL (Kusto Query Language)
- Tenant-level rate limiting (per-user + per-tenant)
- Compliance standards (SOC2, ISO 27001)
- Data residency support (multi-region)
- PII handling policies

### Local MCP - Detailed Requirements

**Context Tools (6 tools - SHIPPED)**
- Sub-100ms response times
- Offline capable (no cloud calls)
- Comprehensive API coverage (all Fabric item types)
- Code examples in multiple languages (Python, C#, PowerShell, REST)

**M1: VS Code Extension (Q1 2026)**
- Native chat integration (Copilot Chat API)
- Inline code suggestions (IntelliSense)
- Auto-completion (Fabric API endpoints)
- Local execution (no telemetry by default)
- Cross-platform (Windows, Mac, Linux)

**M2: Execution Tools (Q2 2026)**
- File upload/download (to/from Fabric lakehouses)
- Item create/update/delete (local validation)
- Works with Remote MCP (seamless handoff)

### Platform - Detailed Requirements

**3-Bucket Contribution Model**
- Clear documentation (contribution guidelines)
- Code samples (MCP server templates)
- Approval workflow (security, compliance review)
- Versioning strategy (support multiple versions)

**Shared Infrastructure**
- Unified authentication (OAuth2, shared token validation)
- Centralized audit logging (consistent schema)
- Rate limiting (tenant + user quotas)
- Tool routing & discovery (future: unified endpoint)
- Health monitoring (uptime SLAs, alerting)
- Developer portal (docs, sandbox, testing tools)

---

## Appendix G: Cross-Team MCP Efforts & Status

| Team | Status | Key Efforts | Timeline | Dependencies |
|------|--------|-------------|----------|--------------|
| **MCP Core/Platform** | 🟢 Active | Remote MCP, Local MCP, shared infrastructure | Q4 2025 → Q2 2026 GA | Identity, Governance, Capacity |
| **Power BI** | 🟢 Pilot Active | DAX generation, BPA, unified Copilot | Q1 2026 (M1) | Remote MCP platform |
| **RTI** | 🟢 Pilot Active | Event streams, KQL queries, RTI MCP server (live) | Q1 2026 | Remote MCP platform |
| **Data Factory** | 🟡 Planning | Pipeline orchestration, dataflow automation | Q2 2026 | Platform maturity, Power BI/RTI precedents |
| **OneLake** | 🟡 Exploratory | Lakehouse provisioning, file management | Late 2026 | Data Factory integration |
| **Identity** | 🟢 Supporting | OAuth2 flows, token validation at scale | Q4 2025 → Q1 2026 | - |
| **Governance** | 🟢 Supporting | Audit log format, compliance tooling | Q4 2025 → Q1 2026 | - |
| **Capacity** | 🟢 Supporting | Tenant rate limiting, resource quotas | Q4 2025 → Q1 2026 | - |

**Key Updates:**

**Power BI:** DAX generation tool in pilot, needs platform by March 2026  
**RTI:** MCP server already in public preview (Sept 2025), aligning with unified platform  
**Data Factory:** Planning phase, Q2 2026 timeline (second wave after P0 workloads)

**Why This Matters:**
- Organization-wide momentum (multiple teams investing)
- Risk mitigation (Power BI + RTI pilots de-risk platform assumptions)
- Success signals (teams choosing MCP vs. separate AI solutions)
