# Fabric MCP(s) Platform: Enabling Workload Team Extensibility

**Document Version:** 1.0  
**Last Updated:** November 16, 2025  
**Status:** Active & Ongoing  
**Owner:** Hasan Abo-Shally, Principal PM, Microsoft Fabric  
**Technical Lead:** Mahir Turhan  

---

## Executive Summary

**What is Fabric MCP(s) Platform?**

An extensibility framework that enables Fabric workload teams (Power BI, Data Factory, Real-Time Intelligence, OneLake, etc.) to build domain-specific MCP servers leveraging shared platform infrastructure—authentication, hosting, governance, and routing.

**The Problem:**

Fabric's platform team cannot be experts in all workload domains. When workload teams want to enable AI agent capabilities for their specific products:

- **Without extensibility:** Platform team becomes bottleneck, workload-specific features delayed or never prioritized
- **Custom implementations:** Each team builds separate auth, hosting, logging—duplicated effort, inconsistent security
- **Fragmented experience:** Agents must manage multiple MCP connections with different auth flows and governance models

**Our Solution:**

A process and infrastructure enabling workload teams to contribute MCP tools while maintaining consistency:

1. **Contribution Process:** Clear workflow for proposing, reviewing, and categorizing tools (3-bucket model)
2. **Shared Infrastructure:** Platform provides authentication, audit logging, rate limiting, monitoring
3. **Quality Standards:** All extensions must meet security, performance, and documentation requirements
4. **Unified Endpoint (Future):** Phase 2 vision where agents connect once to discover all Fabric capabilities

**Current Status:**

- ✅ **Active & Ongoing:** Power BI and Real-Time Intelligence teams piloting extensibility
- ✅ **Process Defined:** 3-bucket categorization model established
- ✅ **Infrastructure:** Shared OAuth2, audit logging, governance operational
- 🔜 **Phase 2 (H1 2027):** Unified MCP endpoint with federated tool discovery

**Success Criteria:**

- 3+ workload teams with live MCP servers by end of 2026
- Contribution process < 2 weeks for Bucket A tools (existing APIs)
- Zero security incidents from workload extensions
- Consistent developer experience across all workload MCPs

---

## 1. Vision & Strategic Context

### 1.1 The Extensibility Imperative

**Why Workload Team Extensibility Matters:**

Fabric encompasses diverse capabilities across multiple workloads—each with deep domain expertise:

- **Power BI:** DAX queries, semantic models, report generation, Best Practice Analyzer
- **Data Factory:** Pipeline orchestration, dataflow authoring, transformation logic
- **Real-Time Intelligence:** KQL queries, event stream management, real-time analytics
- **OneLake:** Data lake management, file operations, access policies
- **Synapse Data Engineering:** Spark jobs, notebook execution, environment configuration

**The Platform Team Cannot:**
- Be domain experts in DAX, KQL, pipeline orchestration, and every Fabric capability
- Prioritize all workload-specific features equally (platform priorities vs. workload needs)
- Maintain deep knowledge of rapidly evolving workload APIs and best practices

**The Result Without Extensibility:**
- Workload teams blocked waiting for platform team to build their tools
- Missed opportunities to enable AI agents for workload-specific workflows
- Inconsistent quality (if workloads build separately without shared infrastructure)

---

### 1.2 Strategic Vision: From Fragmentation to Unity

**Phase 1: Multiple MCP Endpoints (Current State)**

```
Agent Configuration Today:
{
  "mcpServers": {
    "Fabric-Core": { "url": "api.fabric.microsoft.com/mcp/core" },
    "Power-BI": { "url": "api.fabric.microsoft.com/mcp/powerbi" },
    "Data-Factory": { "url": "api.fabric.microsoft.com/mcp/datafactory" },
    "RTI": { "url": "api.fabric.microsoft.com/mcp/rti" }
  }
}
```

**Challenges:**
- Agents manage 4+ separate connections
- 4+ authentication flows
- Fragmented tool discovery (must query each server separately)
- Inconsistent governance models

---

**Phase 2: Unified MCP Endpoint (H1 2027 Vision)**

```
Agent Configuration Future:
{
  "mcpServers": {
    "Fabric": { "url": "api.fabric.microsoft.com/mcp" }
  }
}
```

**What Changes:**
- **One connection:** Agents connect to single endpoint
- **Unified discovery:** `tools/list` returns ALL tools across all workloads
- **Consistent auth:** One OAuth2 flow grants access based on RBAC
- **Centralized governance:** Single control plane for rate limiting, audit logs, permissions

**What Agents See:**

```json
{
  "tools": [
    { "name": "create_workspace", "provider": "fabric-core", "category": "platform" },
    { "name": "generate_dax", "provider": "powerbi", "category": "bi-analytics" },
    { "name": "create_pipeline", "provider": "datafactory", "category": "data-integration" },
    { "name": "query_kql", "provider": "rti", "category": "real-time-analytics" }
  ]
}
```

**The "USB Type-C Hub" Metaphor:**

Just as USB Type-C provides a single port that connects to multiple devices through a hub:
- **Single Connection:** Agents connect to one MCP endpoint
- **Multiple Capabilities:** Access core platform + all workloads through unified interface
- **Universal Standard:** MCP protocol works consistently across all tools

---

### 1.3 Relationship to Other MCP Efforts

This platform effort enables and coordinates with Fabric's broader MCP strategy:

| MCP Effort | Platform Role | How Platform Enables It |
|------------|---------------|-------------------------|
| **Remote MCP** | Platform provides core infrastructure | Authentication, audit logging, rate limiting, hosting shared by workload MCPs |
| **Local MCP** | Independent (runs on developer's machine) | No platform dependency, but workload teams can also build local MCPs using same pattern |
| **Unified MCP Server** | Platform owns routing & federation | Platform team builds unified endpoint that aggregates core + workload tools |
| **MCP Server Item** | Platform provides hosting runtime | Future: Customer MCPs run on same infrastructure as workload MCPs |

**Key Principle:** Platform team builds once (auth, logging, governance), workload teams reuse for their MCP servers.

---

## 2. The Problem: Why We Need Extensibility

### 2.1 Workload Team Pain Points

#### Pain Point 1: Platform Team is Bottleneck

**Current Experience:**

Power BI team wants to enable agents to generate DAX queries via MCP.

**What Happens:**
- Power BI submits feature request to platform team
- Platform team prioritizes against platform features (workspace management, authentication, governance)
- Workload-specific feature deprioritized (platform priorities take precedence)
- Power BI team waits months or abandons AI agent plans

**Impact:**
- Workload innovation blocked by platform team capacity
- Missed opportunities to enable AI agents for domain-specific workflows
- Frustrated workload teams build workarounds (fragmented solutions)

---

#### Pain Point 2: Platform Team Lacks Domain Expertise

**Current Experience:**

Platform team attempts to build DAX generation tool for Power BI.

**What Happens:**
- Platform engineer learns DAX semantics, Power BI API contracts, best practices
- Implementation takes 3-4x longer than if Power BI team built it
- Tool quality lower (lacks domain expertise, edge case handling)
- Ongoing maintenance burden (Power BI APIs change, platform must keep up)

**Impact:**
- Inefficient use of engineering resources (wrong team solving problem)
- Lower quality tools (missing domain knowledge)
- Maintenance burden (platform owns tools outside core competency)

---

#### Pain Point 3: Inconsistent Security & Governance

**Current Experience:**

Workload teams build separate MCP servers without shared infrastructure.

**What Happens:**
- Each team implements OAuth2 differently (custom flows, token validation)
- Inconsistent audit logging (different schemas, missing fields)
- Fragmented governance (no centralized control, admin confusion)
- Security vulnerabilities (not all teams have security expertise)

**Impact:**
- Security risks (inconsistent implementations)
- Compliance challenges (audit logs fragmented)
- Admin complexity (multiple governance models to manage)

---

### 2.2 Customer Impact Without Extensibility

**For AI Agent Developers:**
- Must connect to multiple MCP servers (separate auth for each)
- Fragmented tool discovery (query each server separately)
- Inconsistent error handling and response formats

**For Fabric Administrators:**
- Cannot centrally govern AI agent access across workloads
- Fragmented audit logs make compliance audits difficult
- Multiple admin portals for rate limiting, permissions, monitoring

**For Workload Teams:**
- Cannot innovate on AI capabilities without platform team dependency
- Must build custom infrastructure (auth, logging) if going solo
- Risk of security/compliance issues with custom implementations

---

## 3. Product Vision & Value Proposition

### 3.1 Vision Statement

**Enable Fabric workload teams to extend MCP capabilities with domain-specific tools while maintaining enterprise-grade security, consistent governance, and unified developer experience.**

---

### 3.2 Core Value Proposition

| Stakeholder | Value Delivered |
|-------------|-----------------|
| **Workload Teams** | Build domain-specific MCP tools without custom auth/logging/hosting infrastructure |
| **Platform Team** | Avoid bottleneck by enabling self-service extensibility with guardrails |
| **AI Agent Developers** | Access comprehensive Fabric capabilities through consistent interface |
| **Fabric Administrators** | Centralized governance and audit logging across all MCP servers |
| **Customers** | Richer AI agent capabilities across all Fabric workloads |

---

### 3.3 Design Principles

**1. Platform Provides Infrastructure, Workloads Provide Expertise**

- Platform team owns: Authentication, audit logging, rate limiting, hosting, monitoring
- Workload teams own: Tool logic, domain expertise, API integration, documentation
- Clear ownership boundaries prevent duplication and confusion

**2. Quality Without Compromise**

- All extensions must meet platform security standards
- Consistent API contracts, error handling, async patterns
- Comprehensive documentation and examples required

**3. Incremental Adoption**

- Workload teams adopt at their own pace
- Low barrier to entry for first tool contribution
- Platform support available but not required for experienced teams

**4. Future-Ready Architecture**

- Phase 1: Separate endpoints per workload (immediate delivery)
- Phase 2: Unified endpoint with federation (long-term vision)
- Design decisions preserve path to unified endpoint

---

## 4. User Stories & Scenarios

### 4.1 Scenario: Power BI DAX Generation

**Persona:** Power BI Engineering Team  
**Goal:** Enable AI agents to generate DAX queries for semantic models

**Story Flow:**

> **As the** Power BI engineering team,  
> **Using** the Fabric MCP Platform extensibility process,  
> **I can** build a Power BI MCP server with DAX generation tools while leveraging shared authentication and governance infrastructure.

**Pain Point:**

Power BI wants AI agents to generate DAX queries based on semantic model schemas, but:
- Platform team lacks DAX expertise
- Custom implementation would require OAuth2, audit logging, hosting
- Building separately creates security risk and governance fragmentation

**Workflow with MCP Platform:**

1. **Proposal:** Power BI submits tool proposal ("generate_dax_query")
2. **Categorization:** Platform team categorizes as **Bucket C** (AI-specific, not general API)
3. **Infrastructure Provided:** Platform team gives Power BI access to:
   - Shared OAuth2 authentication (no custom auth code needed)
   - Audit logging infrastructure (automatic logging of all tool calls)
   - Rate limiting policies (consistent with platform standards)
   - Hosting runtime (deploy to `api.fabric.microsoft.com/mcp/powerbi`)
4. **Power BI Builds:** Power BI team implements tool logic (DAX generation algorithm)
5. **Review & Launch:** Platform team reviews, approves, deploys to Power BI MCP endpoint

**Result:**
- ✅ Tool live in 2-4 weeks (vs. months if platform team built it)
- ✅ Power BI expertise ensures high-quality DAX generation
- ✅ Consistent security, governance, audit logging
- ✅ Agents access via standard MCP protocol

---

### 4.2 Scenario: Real-Time Intelligence Event Stream Automation

**Persona:** Real-Time Intelligence Engineering Team  
**Goal:** Enable agents to create and manage event streams via MCP

**Story Flow:**

> **As the** RTI engineering team,  
> **Using** Fabric Public APIs integrated via MCP Platform,  
> **I can** expose event stream management operations to AI agents without custom integration code.

**Pain Point:**

RTI has public APIs for event stream creation, but:
- Not exposed via MCP (agents cannot automate event stream workflows)
- Platform team prioritizes core platform features over RTI-specific tools
- Custom MCP server would duplicate auth and governance logic

**Workflow with MCP Platform:**

1. **Proposal:** RTI submits tool proposals ("create_eventstream", "list_eventstreams")
2. **Categorization:** Platform team categorizes as **Bucket A** (public API exists)
3. **Fast Track:** Because APIs exist, tools added to Remote MCP catalog within 2 weeks
4. **RTI Validation:** RTI team validates tool behavior and documentation
5. **Launch:** Tools available to all agents via Remote MCP endpoint

**Result:**
- ✅ Tools live in 2 weeks (Bucket A fast track)
- ✅ Zero custom code from RTI (platform team handles integration)
- ✅ Consistent with all other Fabric MCP tools
- ✅ Agents can automate event stream provisioning

---

### 4.3 Scenario: Data Factory Pipeline Orchestration (Future)

**Persona:** Data Factory Engineering Team (Future Example)  
**Goal:** Enable agents to orchestrate complex data pipelines via natural language

**Story Flow:**

> **As the** Data Factory team,  
> **Using** a hybrid approach (public API + custom logic),  
> **I can** provide both standard pipeline operations (Bucket A) and AI-optimized orchestration tools (Bucket C).

**Tools Categorized:**

| Tool | Bucket | Rationale |
|------|--------|-----------|
| `create_pipeline` | **A** | Public API exists, add to Remote MCP |
| `list_pipelines` | **A** | Public API exists, add to Remote MCP |
| `optimize_pipeline` | **C** | AI-specific (analyzes pipeline, suggests improvements) |
| `generate_dataflow` | **C** | AI-specific (natural language → dataflow definition) |

**Result:**
- ✅ Basic operations available via Remote MCP (Bucket A)
- ✅ AI-specific tools via separate Data Factory MCP (Bucket C)
- ✅ Agents choose appropriate tool based on task complexity
- ✅ Future: Unified endpoint aggregates both sets of tools

---

## 5. The Extensibility Framework: 3-Bucket Model

### 5.1 Overview

When workload teams propose new MCP tools, the platform team categorizes each tool into one of three buckets based on implementation approach:

| Bucket | Description | Implementation | Example | Timeline |
|--------|-------------|----------------|---------|----------|
| **A** | Public API Exists | Add to Remote MCP via operations model | `create_item(type="EventStream")` | 2 weeks |
| **B** | Should Be Public API | Workload adds to API first, then MCP integrates | `refresh_dataset()` (add to Power BI API) | API timeline + 2 weeks |
| **C** | AI-Only Operation | Workload builds separate MCP using platform infrastructure | `generate_dax_query()` | 2-4 weeks |

---

### 5.2 Bucket A: Public API Exists

**Definition:** Tool maps directly to an existing Fabric public API operation.

**Decision Criteria:**
- ✅ API endpoint exists and is GA (not preview)
- ✅ Operation is general-purpose (not AI-specific)
- ✅ Aligns with Remote MCP scope (control plane operations)

**Implementation Approach:**

```
1. Workload team submits proposal with API contract details
2. Platform team validates API exists and is stable
3. Check if existing tools already support it:
   - Example: create_item(type="NewItemType") may already work
   - If yes: Document and publish (no code change needed)
   - If no: Add new tool to Remote MCP catalog
4. Platform team implements (workload team validates)
5. Tool added to next Remote MCP release (monthly iterations)
```

**Timeline:** 1-2 weeks (2-week sprint cycle)

**Examples:**
- `create_eventstream()` → Maps to RTI Eventstream API
- `list_kql_databases()` → Maps to RTI KQL Database API
- `get_pipeline()` → Maps to Data Factory Pipeline API

**Workload Team Responsibilities:**
- Provide API documentation and examples
- Validate tool behavior matches API contract
- Review documentation before publication

**Platform Team Responsibilities:**
- Implement tool in Remote MCP
- Add to tool catalog with documentation
- Handle error cases and async operations
- Deploy to production

---

### 5.3 Bucket B: Should Be Public API

**Definition:** Programmatic operation that should exist in Fabric's public API surface but doesn't yet.

**Decision Criteria:**
- ❌ API doesn't exist today
- ✅ Operation is general-purpose (developers would want SDK/CLI access)
- ✅ Fits Fabric's public API design principles

**Implementation Approach:**

```
1. Workload team designs public API endpoint
2. API undergoes standard Fabric API review process
3. API implemented and deployed to production (follows API timeline)
4. Once API is GA: Follow Bucket A process to add MCP tool
```

**Timeline:** API implementation timeline + 2 weeks for MCP integration

**Exception Process (Urgent Customer Need):**

If customer urgency demands faster delivery and API development timeline is prohibitive:

1. Workload team submits exception request to PM (Hasan)
2. Justification includes:
   - Customer impact (design partner validation, revenue at risk)
   - Timeline constraints (API development exceeds 2 quarters)
   - Commitment to align with public API within 2 milestones
3. PM and Engineering review (5-day SLA)
4. If approved: Temporarily add to MCP with roadmap to public API

**Examples:**
- `refresh_semantic_model()` → Should be added to Power BI API first
- `validate_pipeline()` → Should be added to Data Factory API first
- `backup_lakehouse()` → Should be added to OneLake API first

**Why This Matters:**
- Ensures consistency (same operation available via SDK, CLI, MCP)
- Prevents MCP from becoming "shadow API surface"
- Forces design thinking (is this truly general-purpose?)

---

### 5.4 Bucket C: AI-Only Operation

**Definition:** Operation that makes sense for AI agents but not for general programmatic access.

**Decision Criteria:**
- ❌ Not appropriate for general public API
- ✅ AI-specific logic (generation, analysis, optimization)
- ✅ Provides unique value to agents

**Implementation Approach:**

```
1. Workload team proposes AI-specific tool
2. Platform team confirms it's genuinely AI-only (not Bucket B)
3. Workload team implements separate MCP server
4. Platform team provides shared infrastructure:
   - OAuth2 authentication (no custom auth code)
   - Audit logging (automatic logging of all calls)
   - Rate limiting (consistent policies)
   - Hosting runtime (deploy to api.fabric.microsoft.com/mcp/{workload})
   - Monitoring and alerting (shared dashboards)
5. Workload team owns:
   - Tool logic implementation
   - Documentation and examples
   - Support and SLA
6. Published as separate MCP endpoint (Phase 1)
7. Future: Accessible via unified endpoint (Phase 2)
```

**Timeline:** 2-4 weeks (depends on tool complexity)

**Examples:**
- `generate_dax_query()` (Power BI) → Analyzes semantic model, generates optimized DAX
- `optimize_pipeline()` (Data Factory) → Analyzes pipeline, suggests performance improvements
- `recommend_kql_query()` (RTI) → Natural language → KQL query generation
- `analyze_model_performance()` (Power BI) → Scans semantic model, identifies bottlenecks

**Why Separate MCP Server?**
- Domain expertise: Workload team owns complex logic (DAX generation, pipeline optimization)
- Agility: Workload can iterate without platform team dependency
- Clear ownership: Workload owns SLA, support, feature roadmap

**Platform Infrastructure Provided:**
- **Authentication:** Shared OAuth2 (workload doesn't write custom auth code)
- **Audit Logging:** Automatic logging (same format as Remote MCP)
- **Rate Limiting:** Consistent policies (60 calls/min per user)
- **Hosting:** Deployment infrastructure (no custom hosting needed)
- **Monitoring:** Shared telemetry dashboards

**Workload Team Owns:**
- **Tool Logic:** Implementation of domain-specific algorithms
- **Documentation:** Tool schemas, examples, tutorials
- **Support:** SLA commitments, issue triage, bug fixes
- **Quality:** Testing, performance optimization, error handling

---

### 5.5 Decision Tree

**How to Categorize a Proposed Tool:**

```
START: Workload team proposes tool
   │
   ▼
Q1: Does a Fabric public API exist for this operation?
   │
   ├─ YES ────────────────────────────────────────────► BUCKET A
   │                                                    (Add to Remote MCP)
   │
   └─ NO
      │
      ▼
Q2: Would developers want to call this via SDK/CLI/API?
   │
   ├─ YES ────────────────────────────────────────────► BUCKET B
   │                                                    (Add to public API first)
   │
   └─ NO
      │
      ▼
Q3: Is this operation AI-agent-specific only?
   │
   ├─ YES ────────────────────────────────────────────► BUCKET C
   │                                                    (Build workload MCP)
   │
   └─ UNCLEAR ────────────────────────────────────────► Revisit with PM
                                                         (Clarify use case)
```

---

## 6. Extension Process & Governance

### 6.1 Proposal Submission

**Contact:** Hasan Abo-Shally (PM Owner)

**Required Information:**

| Field | Description | Example |
|-------|-------------|---------|
| **Workload** | Which Fabric workload team? | Power BI, Data Factory, RTI, OneLake |
| **Tool Name** | Proposed MCP tool name | `generate_dax_query` |
| **Description** | What does the tool do? | Analyzes semantic model schema and generates optimized DAX query based on natural language request |
| **Target Audience** | Internal teams vs. external customers? | External customers (ISVs, enterprises building AI agents) |
| **Business Scenario** | What problem does this solve? Who benefits? | Enables agents to query Power BI semantic models without DAX expertise. Benefits: Consultants building AI-powered BI assistants |
| **API Dependency** | Does a public API exist? If yes, provide link | No (AI-specific generation logic, not general API) |
| **Input Parameters** | What inputs does the tool require? | `semantic_model_id`, `natural_language_query`, `workspace_id` |
| **Output Schema** | What does the tool return? | `dax_query` (string), `estimated_rows` (integer), `warnings` (array) |

**Submission Process:**

1. Email proposal to Hasan with required information
2. Initial review within 5 business days
3. Classification discussion (3-bucket model)
4. Decision communicated with next steps

---

### 6.2 Quality Standards (All Extensions Must Meet)

**Security Requirements:**

| Requirement | Description | Validation |
|-------------|-------------|------------|
| **Authenticated Operations Only** | All tools must call authenticated Fabric/Graph APIs | Platform team reviews API calls during approval |
| **No Custom Authorization** | Double-check pattern mandatory (MCP validates token, API enforces RBAC) | Code review confirms no custom permission logic |
| **HTTPS Only** | All API calls over TLS 1.2+ | Infrastructure enforces (no HTTP allowed) |
| **No Token Logging** | Tokens never logged in plaintext | Automated scanning for token patterns in logs |

**API Contract Requirements:**

| Requirement | Description | Example |
|-------------|-------------|---------|
| **Async Pattern Compliance** | Long-running operations return `operationId`, support status polling | `create_semantic_model()` → 202 Accepted with operationId |
| **Pagination Support** | List operations use continuation tokens, max 1000 items per page | `list_reports()` → returns nextLink for pagination |
| **Error Handling Specification** | Meaningful error messages with remediation hints | `400 Bad Request: Invalid DAX syntax at line 3. Suggestion: Check column name 'SalesAmount' exists in table.` |
| **Input Validation** | JSON schema for all input parameters with clear validation rules | Schema defines required fields, types, min/max values |

**Documentation Requirements:**

| Requirement | Description | Deliverable |
|-------------|-------------|-------------|
| **Tool Schema** | Complete JSON Schema with descriptions for all parameters | `tools/{tool_name}/schema.json` |
| **Examples** | At least 3 real-world examples with expected inputs/outputs | `tools/{tool_name}/examples.md` |
| **Error Codes** | Document all possible error codes with remediation steps | `tools/{tool_name}/errors.md` |
| **Performance Characteristics** | Expected latency, rate limits, async behavior | Documented in tool description |

---

### 6.3 Review & Approval Process

**Step 1: PM Review (Hasan)**

- Validates business case and customer value
- Confirms bucket classification (A, B, or C)
- Checks for alignment with Fabric MCP strategy
- **SLA:** 5 business days for initial review

**Step 2: Engineering Review (Mahir)**

- Reviews technical approach and API contracts
- Validates error handling and async patterns
- Assesses performance and scalability
- Confirms no custom authorization logic
- **SLA:** 1 week for technical review

**Step 3: Security Review**

- Reviews authentication flow (should use shared OAuth2)
- Validates no token leakage or logging
- Confirms RBAC enforcement (double-check pattern)
- Checks for any new permission scopes
- **SLA:** 1 week for security review (parallel with engineering)

**Step 4: Documentation Review**

- Validates completeness (schema, examples, error codes)
- Confirms clarity and accuracy
- Ensures consistency with existing MCP documentation
- **SLA:** 3 business days

**Step 5: Approval & Deployment**

- PM grants approval after all reviews pass
- Platform team deploys (Bucket A) or provides infrastructure (Bucket C)
- Workload team validates in staging before production

**Total Timeline:**
- **Bucket A:** 2 weeks (fast track for existing APIs)
- **Bucket B:** API implementation timeline + 2 weeks
- **Bucket C:** 2-4 weeks (workload team implements with platform support)

---

### 6.4 Ongoing Responsibilities

**Platform Team:**
- Maintain shared infrastructure (auth, logging, rate limiting, hosting)
- Monitor health and performance across all MCP servers
- Provide technical support for infrastructure issues
- Coordinate unified endpoint (Phase 2)

**Workload Teams (Bucket C Only):**
- Implement and maintain tool logic
- Provide documentation updates
- Support SLA for their tools
- Bug fixes and feature enhancements
- Monitor tool-specific metrics

**Shared Responsibilities:**
- Compliance certifications (SOC2, ISO 27001)
- Security incident response
- Performance optimization
- Customer feedback integration

---

## 7. Current Pilots & Validation

### 7.1 Power BI MCP (Pilot #1)

**Status:** 🟢 Active Development  
**Team Lead:** Power BI Engineering Team  
**Timeline:** Q1 2026 (targeting March 2026 FabCon demo)

**Proposed Tools (Bucket C - AI-Specific):**

| Tool | Description | Status |
|------|-------------|--------|
| `generate_dax_query` | Analyzes semantic model, generates DAX from natural language | In Development |
| `optimize_dax` | Analyzes existing DAX, suggests performance improvements | Planned |
| `run_best_practice_analyzer` | Scans semantic model for common issues | Planned |

**Value Proposition:**
- Enables AI agents to query Power BI models without DAX expertise
- Consultants and ISVs can build BI assistants faster
- Positions Power BI as most AI-friendly BI platform

**Learnings So Far:**
- OAuth2 integration seamless (shared platform infrastructure)
- Audit logging "just works" (automatic for all tool calls)
- Tool quality higher when Power BI team owns implementation (domain expertise)

---

### 7.2 Real-Time Intelligence MCP (Pilot #2)

**Status:** 🟢 Active Exploration  
**Team Lead:** RTI Engineering Team  
**Timeline:** Q2 2026

**Proposed Tools (Hybrid Approach):**

| Tool | Bucket | Description |
|------|--------|-------------|
| `create_eventstream` | **A** | Public API exists, add to Remote MCP |
| `list_eventstreams` | **A** | Public API exists, add to Remote MCP |
| `generate_kql_query` | **C** | AI-specific, natural language → KQL |
| `optimize_event_processing` | **C** | AI-specific, analyzes event stream config, suggests improvements |

**Strategy:**
- Fast-track Bucket A tools (eventstream CRUD operations)
- Build RTI MCP for AI-specific tools (KQL generation, optimization)
- Agents get both operational tools and AI-powered insights

**Expected Impact:**
- Automate event stream provisioning (Bucket A)
- Enable agents to query real-time data via natural language (Bucket C)
- Position RTI as most agent-friendly real-time analytics platform

---

### 7.3 Lessons Learned from Pilots

**What's Working Well:**

✅ **Shared Infrastructure Accelerates Delivery**
- Power BI team didn't write any OAuth2 code
- Audit logging "just worked" on day one
- Rate limiting policies automatically applied

✅ **Domain Expertise Produces Better Tools**
- Power BI team's DAX generation far superior to platform team's prototype
- RTI team identified KQL edge cases platform team would have missed

✅ **3-Bucket Model Clarifies Decisions**
- Clear criteria prevent endless debates about API vs. MCP
- Workload teams understand tradeoffs (Bucket A fast, Bucket C flexible)

**Challenges Identified:**

⚠️ **Documentation Overhead**
- Workload teams underestimate effort for comprehensive docs
- Mitigation: Platform team provides documentation templates

⚠️ **Testing Across AI Platforms**
- Tools must work with VS Code, Copilot Studio, Claude Desktop, custom agents
- Mitigation: Platform team provides test harness and validation suite

⚠️ **Versioning and Breaking Changes**
- How to evolve tools without breaking existing agents?
- Mitigation: Adopt semantic versioning, deprecation timeline (6 months notice)

---

## 8. Success Criteria & Metrics

### 8.1 Adoption Metrics

| Metric | Target (End of 2026) | Measurement |
|--------|----------------------|-------------|
| **Workload MCPs Live** | 3+ workload teams with production MCP servers | Platform team tracking |
| **Tools Contributed** | 20+ tools across all workload MCPs | Tool catalog count |
| **Bucket A Turnaround** | < 2 weeks from proposal to production | Average cycle time |
| **Bucket C Turnaround** | < 4 weeks from proposal to production | Average cycle time |

### 8.2 Quality Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Security Incidents** | 0 critical incidents from workload extensions | Security dashboard |
| **Documentation Completeness** | 100% of tools have schema + examples + error codes | Automated validation |
| **API Contract Compliance** | 100% of tools follow async, pagination, error patterns | Code review tracking |
| **Developer Satisfaction** | 4.0+/5.0 from workload teams | Quarterly feedback surveys |

### 8.3 Platform Health Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Shared Infra Uptime** | 99.9%+ availability | Monitoring dashboard |
| **Auth Success Rate** | 99%+ successful OAuth flows | Telemetry |
| **Audit Log Coverage** | 100% of tool calls logged | Validation queries |

---

## 9. Timeline & Milestones

### 9.1 Ongoing Process (Active)

**Current State (Q4 2025 - Q1 2026):**
- ✅ Extensibility framework defined
- ✅ 3-bucket categorization model established
- ✅ Power BI pilot active (DAX generation tool)
- ✅ RTI pilot active (eventstream + KQL tools)
- ✅ Shared infrastructure operational

**Q1 2026:**
- Power BI MCP demo at FabCon Atlanta (March)
- RTI tools added to Remote MCP (Bucket A)
- Extensibility documentation published

**Q2-Q3 2026:**
- RTI MCP server live (Bucket C tools)
- Additional workload teams onboard (Data Factory, OneLake)
- Continuous improvement of extension process

**Q4 2026:**
- 3+ workload MCPs operational
- Evaluation of Phase 2 (unified endpoint) feasibility
- Lessons learned documentation

### 9.2 Phase 2: Unified Endpoint (H1 2027)

**Goal:** Single MCP endpoint aggregating all Fabric capabilities

**Prerequisites:**
- Phase 1 learnings from multiple workload MCPs
- Technical architecture defined (federation, routing, or alternative)
- Customer validation of unified endpoint value

**Scope:**
- Agents connect to `api.fabric.microsoft.com/mcp`
- `tools/list` returns tools from Remote MCP + all workload MCPs
- Unified authentication, governance, audit logging
- Transparent routing to appropriate backend MCP server

**Success Criteria:**
- Zero breaking changes for existing agents
- Same performance characteristics as separate endpoints
- Simplified agent configuration (one connection vs. multiple)

---

## 10. Dependencies & Risks

### 10.1 Dependencies

| Dependency | Owner | Status | Mitigation |
|------------|-------|--------|------------|
| **Remote MCP Infrastructure** | Platform Team | On Track | Shared infrastructure ready for workload MCPs |
| **Workload Team Engagement** | Workload Teams | Pilots Active | Power BI and RTI committed, additional teams recruiting |
| **Unified Endpoint Architecture** | Platform + Architecture | Not Started | Define in Q1 2026 based on Phase 1 learnings |

### 10.2 Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Workload teams lack capacity** | Medium | Start with 2 pilots, expand gradually based on success |
| **Inconsistent quality across workload MCPs** | High | Mandatory quality standards, platform team code review |
| **Security incident from workload extension** | High | Shared infrastructure enforces security, no custom auth allowed |
| **Unified endpoint technical complexity** | Medium | Phase 2 only after Phase 1 validation, architecture review with experts |

---

## 11. Open Questions

| # | Question | Owner | Status |
|---|----------|-------|--------|
| 1 | What is the technical approach for Phase 2 unified endpoint? (Federation, aggregation, routing, or alternative?) | Platform + Architecture | Open - Q1 2026 |
| 2 | Should workload MCPs have separate SLA commitments or share platform SLA? | PM + Workload Teams | Open |
| 3 | How to handle versioning and breaking changes across workload MCPs? | Platform + Workload Teams | Open - Define in Q1 2026 |
| 4 | Support model for workload MCPs (Bucket C): Who owns customer support? | Platform + Support Team | Open |
| 5 | Pricing model: Are workload MCP calls included in Fabric capacity licensing or separately metered? | Business + Finance | Open |

---

## Appendix A: Related Specifications

**Fabric Remote MCP:**
- **File:** `20251115-FABRIC-REMOTE-MCP-SPEC.md`
- **Relationship:** Platform provides infrastructure for Remote MCP; workload MCPs use same infrastructure
- **Timeline:** M1 Public Preview March 2026, GA Target September 2026

**Fabric Local MCP:**
- **File:** `20251116-FABRIC-LOCAL-MCP-SPEC.md`
- **Relationship:** Independent (runs locally), but workload teams can build local MCPs using same pattern
- **Timeline:** Public Preview Live, GA Target March 2026

**Unified Fabric MCP Server:**
- **File:** `20251115-UNIFIED-FABRIC-MCP-VISION.md`
- **Relationship:** Platform owns unified endpoint that aggregates Remote MCP + workload MCPs
- **Timeline:** H1 2027 (Phase 2)

**MCP Server Item Exploration:**
- **File:** `20251115-MCP-SERVER-ITEM-EXPLORATION.md`
- **Relationship:** Customer MCPs would use same hosting infrastructure as workload MCPs
- **Timeline:** Exploration phase, TBD

---

## Appendix B: Glossary

| Term | Definition |
|------|------------|
| **Workload Team** | Fabric product teams (Power BI, Data Factory, RTI, OneLake, etc.) responsible for specific capabilities |
| **Platform Team** | Fabric platform team (this team) responsible for core infrastructure and cross-cutting capabilities |
| **Bucket A** | Tools mapping to existing public APIs (fast-track to Remote MCP) |
| **Bucket B** | Tools that should be public APIs first (API development required) |
| **Bucket C** | AI-specific tools requiring separate workload MCP server |
| **Remote MCP** | Cloud-hosted MCP server for Fabric public APIs (platform team owns) |
| **Workload MCP** | Domain-specific MCP server built by workload team (e.g., Power BI MCP, RTI MCP) |
| **Unified Endpoint** | Phase 2 vision where agents connect to single MCP URL and discover all tools |
| **Double-Check Pattern** | Security pattern where MCP validates token AND Fabric API enforces RBAC (no custom auth) |

---

**END OF SPECIFICATION**
