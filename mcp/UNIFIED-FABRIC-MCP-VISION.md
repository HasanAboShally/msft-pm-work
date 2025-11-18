# Unified Fabric MCP Server
## Vision Document

---

**Document Metadata:**

| Property | Value |
|----------|-------|
| **Version** | 1.0 |
| **Last Updated** | November 15, 2025 |
| **Document Type** | Vision & Strategy |
| **Target Timeline** | H1 2027 (Post-GA of Remote MCP) |
| **Document Owner** | Hasan Abo-Shally (Principal PM, Fabric Platform) |
| **Status** | Vision Phase - Architecture Definition Needed |
| **Reviewers** | Aviv Yahav, Gena Vorobyov, Platform Leadership |

---

## Executive Summary

**The Vision:** Create a unified MCP endpoint where AI agents connect once and discover ALL Fabric capabilities—core platform operations, workload-specific tools (Power BI, Data Engineering, Real-Time Intelligence), and partner/customer extensions.

**Why It Matters:** Today, agents must manage multiple MCP server connections (Remote MCP, Power BI MCP, RTI MCP, etc.), creating configuration complexity, fragmented discovery, and governance challenges. A unified endpoint simplifies the developer experience while enabling ecosystem growth.

**The "USB Type-C Hub" Metaphor:** Just as USB Type-C provides a single connection point for multiple devices, the Unified Fabric MCP Server will provide a single connection point for all Fabric AI capabilities—eliminating configuration overhead and enabling seamless discovery.

**Timeline:** Architecture definition in Q1 2026, implementation in H1 2027 (dependent on learnings from Remote MCP and workload MCP pilots).

**Status:** This is a **vision document**, not an implementation spec. Detailed technical design will occur post-GA of Remote MCP.

---

## Table of Contents

1. [The Problem: Multi-MCP Complexity](#1-the-problem-multi-mcp-complexity)
2. [The Vision: One Endpoint for All Capabilities](#2-the-vision-one-endpoint-for-all-capabilities)
3. [User Stories & Value Proposition](#3-user-stories--value-proposition)
4. [High-Level Architecture Considerations](#4-high-level-architecture-considerations)
5. [Requirements for Future Design](#5-requirements-for-future-design)
6. [Timeline & Dependencies](#6-timeline--dependencies)
7. [Success Criteria](#7-success-criteria)
8. [Open Questions](#8-open-questions)

---

## 1. The Problem: Multi-MCP Complexity

### 1.1 The Current State (Without Unified Endpoint)

**Scenario:** A developer building an AI agent that automates Fabric operations needs capabilities across multiple domains:

- **Platform operations** (workspace creation, permissions, governance) → Remote MCP
- **Power BI insights** (DAX generation, best practice analyzer) → Power BI MCP
- **Data pipelines** (pipeline orchestration, dataflow automation) → Data Engineering MCP
- **Real-time analytics** (KQL queries, event stream management) → RTI MCP

**Today's Developer Experience:**

```
Agent Configuration (Current State)
===================================

{
  "mcpServers": {
    "fabric-remote": {
      "url": "https://api.fabric.microsoft.com/mcp/remote",
      "auth": { "oauth": "..." }
    },
    "powerbi": {
      "url": "https://api.fabric.microsoft.com/mcp/powerbi",
      "auth": { "oauth": "..." }
    },
    "data-engineering": {
      "url": "https://api.fabric.microsoft.com/mcp/dataeng",
      "auth": { "oauth": "..." }
    },
    "rti": {
      "url": "https://api.fabric.microsoft.com/mcp/rti",
      "auth": { "oauth": "..." }
    }
  }
}
```

**Pain Points:**

1. **Configuration Overhead:** Manage 4+ separate MCP server connections
2. **Fragmented Discovery:** Agent must call `tools/list` on each server separately
3. **Auth Complexity:** Duplicate OAuth flows, token management per server
4. **Governance Gaps:** Different audit logging, rate limiting, governance per MCP
5. **Maintenance Burden:** Update configuration when new workload MCPs added
6. **Developer Confusion:** "Which MCP has the tool I need?"

---

### 1.2 Impact on Key Personas

**AI Agent Developers:**
- Spend time managing MCP configurations instead of building features
- Difficult to discover all available Fabric capabilities
- Configuration errors when MCPs change or new ones are added

**IT Administrators:**
- Struggle to govern agent activity across multiple MCP endpoints
- Inconsistent audit trails (different logs per MCP)
- Complex tenant policies (must configure rules per MCP)

**Workload Teams:**
- High barrier to contribute new MCPs (developers won't add "yet another server")
- Limited discoverability of workload-specific tools

**Microsoft Fabric:**
- Fragmented ecosystem inhibits growth
- Poor developer experience vs. competitors with unified agent platforms
- Increased support burden (configuration troubleshooting)

---

### 1.3 What Happens as Fabric's MCP Ecosystem Grows

**Q1 2026:** 3 MCPs (Remote, Power BI, RTI)  
**Q4 2026:** 6 MCPs (+ Data Engineering, Synapse, OneLake)  
**2027:** 10+ MCPs (+ Partner MCPs, Customer-created MCPs)

**Without a unified endpoint:**
- Developer configuration files grow to 10+ server entries
- Tool discovery requires calling `tools/list` on 10+ endpoints
- Governance becomes unmanageable (10+ different audit logs)
- Developer frustration leads to fragmented adoption ("I'll just use Power BI MCP and skip the others")

**This is unsustainable.**

---

## 2. The Vision: One Endpoint for All Capabilities

### 2.1 The "USB Type-C Hub" Experience

**The Metaphor:**

Just as **USB Type-C** unified device connectivity:
- **Before USB-C:** Different ports for monitors, keyboards, storage, power (HDMI, USB-A, USB-B, DisplayPort, proprietary chargers)
- **After USB-C:** One port, all devices (adapters/hubs handle routing)

**Unified Fabric MCP** provides the same experience for AI agents:
- **Before:** Different MCP servers for each capability domain
- **After:** One endpoint, all tools (unified server handles routing)

---

### 2.2 Developer Experience with Unified Endpoint

**Agent Configuration (Future State):**

```
Agent Configuration (Unified Endpoint)
======================================

{
  "mcpServers": {
    "fabric": {
      "url": "https://api.fabric.microsoft.com/mcp",
      "auth": { "oauth": "..." }
    }
  }
}
```

**That's it.** One line. One endpoint. All capabilities.

**Tool Discovery:**

```
Agent calls: tools/list on https://api.fabric.microsoft.com/mcp

Response:
[
  // Platform/Core tools (from Remote MCP)
  { "name": "create_workspace", "description": "...", "category": "platform" },
  { "name": "assign_role", "description": "...", "category": "platform" },
  
  // Power BI tools
  { "name": "generate_dax", "description": "...", "category": "powerbi" },
  { "name": "run_bpa", "description": "...", "category": "powerbi" },
  
  // Data Engineering tools
  { "name": "create_pipeline", "description": "...", "category": "data-eng" },
  
  // Real-Time Intelligence tools
  { "name": "query_kql", "description": "...", "category": "rti" },
  
  // ... ALL tools from ALL workloads
]
```

**Agent's perspective:**
- "I see ALL available tools in one discovery call"
- "I don't care which backend provides each tool"
- "I just invoke the tools I need"

---

### 2.3 What the Unified Endpoint Provides

**Single Connection Point:**
- One URL: `api.fabric.microsoft.com/mcp`
- One OAuth flow (unified authentication)
- One configuration entry

**Unified Discovery:**
- Single `tools/list` call returns ALL tools across all workloads
- Tools categorized by domain (platform, powerbi, data-eng, rti, etc.)
- Agents discover new capabilities automatically as workloads add tools

**Consistent Governance:**
- Unified audit logging (all operations in one log stream)
- Centralized rate limiting (tenant-level controls)
- Single tenant admin policy surface

**Seamless Extensibility:**
- Workload teams add tools without breaking existing agents
- Partner MCPs integrated via same routing mechanism
- Customer-created tools (future) discoverable alongside platform tools

---

## 3. User Stories & Value Proposition

### 3.1 User Story #1: Agent Developer Building Cross-Workload Automation

**Persona:** Pro Developer at enterprise customer  
**Tool:** VS Code + custom AI agent  
**Scenario:** Automate customer onboarding workflow across Fabric workloads

**User Story:**
> "As an agent developer, I want to connect to one Fabric MCP endpoint and discover all available capabilities, so I can build workflows that span platform operations, Power BI, and data pipelines without managing multiple configurations."

**Current Experience (Multi-MCP):**
1. Research which MCP has which tools (documentation diving)
2. Configure 3 MCP servers (Remote, Power BI, Data Engineering)
3. Handle auth tokens for each server
4. Call `tools/list` on each server separately
5. Discover tool conflicts (two servers with similar tool names)
6. Debug configuration issues when one MCP endpoint changes

**Time spent on config:** ~2 hours  
**Lines of configuration:** ~40 lines  
**Friction:** High (ongoing maintenance as MCPs evolve)

**Unified Endpoint Experience:**
1. Configure one endpoint: `api.fabric.microsoft.com/mcp`
2. Authenticate once (OAuth flow)
3. Call `tools/list` → see all tools from all workloads
4. Start building workflow immediately

**Time spent on config:** ~10 minutes  
**Lines of configuration:** ~5 lines  
**Friction:** Minimal (set once, forget)

**Value Delivered:**
- ⏱️ **Time Savings:** 90% reduction in configuration time (10 min vs. 2 hours)
- ✅ **Reduced Errors:** No multi-MCP configuration mistakes
- 🎯 **Faster Development:** Focus on logic, not infrastructure
- 📋 **Future-Proof:** New workload tools appear automatically

---

### 3.2 User Story #2: IT Admin Governing Agent Activity

**Persona:** IT Administrator / Fabric Tenant Admin  
**Tool:** Fabric Admin Portal, Audit Logs  
**Scenario:** Monitor and govern AI agent operations across all workloads

**User Story:**
> "As a Fabric tenant admin, I want a single control plane for all agent activity across all workloads, so I can enforce consistent governance policies and audit all operations in one place."

**Current Experience (Multi-MCP):**
1. Check audit logs for Remote MCP (workspace operations)
2. Check separate logs for Power BI MCP (DAX generations, BPA runs)
3. Check RTI logs (KQL queries, event streams)
4. Correlate logs manually across systems
5. Configure rate limits separately per MCP
6. Set tenant policies separately per MCP

**Governance Complexity:** High  
**Audit Trail:** Fragmented  
**Policy Management:** Per-MCP (inconsistent)

**Unified Endpoint Experience:**
1. Open Fabric Admin Portal → Agent Activity Dashboard
2. See ALL agent operations across ALL workloads in one view
3. Unified audit log (all operations attributed to agents)
4. Set tenant-level policies once (apply to all workload tools)
5. Configure rate limits centrally

**Governance Complexity:** Low  
**Audit Trail:** Unified  
**Policy Management:** Centralized (consistent)

**Value Delivered:**
- 🔒 **Better Governance:** Single policy enforcement point
- 📊 **Complete Visibility:** All agent activity in one audit trail
- ⚡ **Easier Management:** One admin surface vs. many
- ✅ **Compliance:** Simplified audit reporting for SOC 2, ISO 27001

---

### 3.3 User Story #3: Workload Team Contributing Domain Tools

**Persona:** Power BI Engineer  
**Tool:** Power BI MCP Server  
**Scenario:** Add DAX generation tool for AI agents

**User Story:**
> "As a Power BI engineer, I want to contribute domain-specific tools to the Fabric MCP ecosystem without requiring agent developers to reconfigure their setups, so my tools are discovered and used immediately."

**Current Experience (Multi-MCP):**
1. Build Power BI MCP server with DAX tool
2. Publish to separate endpoint: `api.fabric.microsoft.com/mcp/powerbi`
3. Announce to developer community: "New MCP available!"
4. Wait for developers to update configurations (slow adoption)
5. Support developers troubleshooting "How do I add this MCP?"

**Adoption:** Slow (manual opt-in by each developer)  
**Discoverability:** Poor (developers must know it exists)  
**Friction:** High (configuration updates required)

**Unified Endpoint Experience:**
1. Build Power BI MCP with DAX tool
2. Register with Platform Team (routing configuration)
3. Platform Team adds routing rule (transparent to developers)
4. **All agents immediately discover new tool** (next `tools/list` call)

**Adoption:** Automatic (all agents see it immediately)  
**Discoverability:** Built-in (appears in tool catalog)  
**Friction:** Zero (no developer reconfiguration needed)

**Value Delivered:**
- 📈 **Faster Adoption:** Tools available to all agents instantly
- 🔍 **Better Discovery:** Agents find tools without announcements
- 🚀 **Ecosystem Growth:** Lower barrier to contribute capabilities
- 🤝 **Better Collaboration:** Workload teams empowered to extend platform

---

## 4. High-Level Architecture Considerations

### 4.1 Design Principle: Transparent Routing

**Core Requirement:** Agents should not need to know which "backend" provides a tool—they simply discover and invoke it.

**Architectural Pattern Options:**

#### Option A: Federation (Gateway Pattern)

```
┌─────────────────────────────────────────┐
│  Unified MCP Server (Gateway)           │
│                                          │
│  - Receives agent requests               │
│  - Routes to appropriate backend MCP     │
│  - Aggregates tool discovery responses   │
│  - Handles auth/audit/rate limiting      │
└──────────────┬──────────────────────────┘
               │
       ┌───────┴───────┬──────────────┬────────────┐
       ▼               ▼              ▼            ▼
┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
│ Remote   │   │ Power BI │   │ Data Eng │   │   RTI    │
│   MCP    │   │   MCP    │   │   MCP    │   │   MCP    │
└──────────┘   └──────────┘   └──────────┘   └──────────┘
```

**Pros:**
- Clean separation of concerns (platform vs. workloads)
- Workload teams own their MCP implementations
- Easier to add/remove workload MCPs
- Independent scaling per workload

**Cons:**
- Additional latency (gateway hop)
- Routing logic complexity
- Tool name collision risk (requires coordination)

---

#### Option B: Aggregation (Single Server, Pluggable Modules)

```
┌─────────────────────────────────────────┐
│  Unified MCP Server                      │
│                                          │
│  ┌─────────────────────────────────┐   │
│  │  Core Platform Module           │   │
│  │  (workspace, item, role tools)  │   │
│  └─────────────────────────────────┘   │
│                                          │
│  ┌─────────────────────────────────┐   │
│  │  Power BI Module (plugin)       │   │
│  │  (DAX, BPA tools)               │   │
│  └─────────────────────────────────┘   │
│                                          │
│  ┌─────────────────────────────────┐   │
│  │  Data Eng Module (plugin)       │   │
│  │  (pipeline, dataflow tools)     │   │
│  └─────────────────────────────────┘   │
│                                          │
│  [... more modules ...]                 │
└─────────────────────────────────────────┘
```

**Pros:**
- Lower latency (no gateway hop)
- Simpler architecture (one server)
- Built-in tool naming coordination
- Unified codebase for common patterns

**Cons:**
- Tighter coupling (platform + workloads in one repo)
- Harder to scale independently
- Deployment coordination required across teams
- Module interface complexity

---

#### Option C: Hybrid (Core + Federation)

```
┌─────────────────────────────────────────┐
│  Unified MCP Server                      │
│                                          │
│  ┌──────────────────────────┐          │
│  │  Core Platform Tools     │ ◄─ Built-in
│  │  (workspace, items)      │
│  └──────────────────────────┘          │
│                                          │
│  ┌──────────────────────────┐          │
│  │  Routing Layer           │ ◄─ Federate to workload MCPs
│  └──────────┬───────────────┘          │
└─────────────┼────────────────────────────┘
              │
      ┌───────┴───────┬────────────┐
      ▼               ▼            ▼
  ┌─────────┐   ┌─────────┐   ┌─────────┐
  │Power BI │   │Data Eng │   │  RTI    │
  │  MCP    │   │  MCP    │   │  MCP    │
  └─────────┘   └─────────┘   └─────────┘
```

**Pros:**
- Core platform tools (low latency)
- Workload tools (autonomy)
- Best of both approaches

**Cons:**
- Complexity (two patterns in one)
- Decision criteria needed ("When to build-in vs. federate?")

---

### 4.2 Key Architectural Requirements

**Regardless of pattern chosen:**

1. **Unified Tool Discovery**
   - Single `tools/list` response aggregates all available tools
   - Tools categorized by domain/workload
   - Schema/documentation included per tool

2. **Transparent Routing**
   - Agents invoke tools via unified endpoint
   - Gateway/router handles backend selection
   - Errors/responses formatted consistently

3. **Centralized Authentication**
   - Single OAuth flow for agents
   - Token validated once (at gateway)
   - Backend MCPs trust gateway's auth assertion

4. **Unified Governance**
   - All operations logged to single audit stream
   - Rate limiting enforced centrally
   - Tenant policies applied consistently

5. **Extensibility Model**
   - Clear process for workload teams to add tools
   - Automated tool registration/discovery
   - Versioning support (tool updates don't break agents)

6. **Backward Compatibility**
   - Existing standalone MCPs remain accessible (deprecation path)
   - Migration tools/guidance for developers
   - No forced migration (opt-in to unified endpoint)

---

## 5. Requirements for Future Design

### 5.1 Customer-Facing Requirements

**CFR-1: Single Endpoint Configuration**
> "As an agent developer, I configure one MCP endpoint and gain access to all Fabric capabilities."

**Priority:** P0 (Must-Have)  
**Acceptance Criteria:**
- Agent configuration requires ≤5 lines (URL + auth)
- No per-workload configuration needed
- OAuth flow completed once (not per-workload)

---

**CFR-2: Complete Tool Discovery**
> "As an agent developer, I call `tools/list` once and discover all available tools across all Fabric workloads."

**Priority:** P0 (Must-Have)  
**Acceptance Criteria:**
- Single `tools/list` call returns tools from all registered workload MCPs
- Tools include category/domain metadata (e.g., "platform", "powerbi", "data-eng")
- Tool schemas/docs included in response

---

**CFR-3: Transparent Tool Invocation**
> "As an agent, I invoke tools without knowing which backend MCP provides them."

**Priority:** P0 (Must-Have)  
**Acceptance Criteria:**
- Agent calls tools via unified endpoint (e.g., `POST /mcp/tools/invoke`)
- Routing to backend MCP is automatic and transparent
- Response format consistent regardless of backend

---

**CFR-4: Unified Audit Trail**
> "As a Fabric tenant admin, I see all agent activity across all workloads in one audit log."

**Priority:** P0 (Must-Have)  
**Acceptance Criteria:**
- All tool invocations logged to Fabric audit log (single stream)
- Logs include agent identity, tool name, workload/category, timestamp, result
- Admin portal provides unified "Agent Activity" dashboard

---

**CFR-5: Consistent Governance Policies**
> "As a Fabric tenant admin, I set governance policies once and they apply to all agent activity across all workloads."

**Priority:** P0 (Must-Have)  
**Acceptance Criteria:**
- Tenant-level rate limiting (e.g., "1000 requests/hour per agent")
- Tenant-level controls (e.g., "Disable agent access" flag)
- Policies enforced consistently across all workload tools

---

### 5.2 Workload Team Requirements

**WTR-1: Easy Tool Contribution**
> "As a workload team, I can contribute domain-specific tools without requiring platform team implementation."

**Priority:** P0 (Must-Have)  
**Acceptance Criteria:**
- Clear process to register new tools with unified endpoint
- Self-service registration (submit PR or config, platform team reviews/approves)
- Tools discoverable immediately after registration

---

**WTR-2: Autonomous MCP Development**
> "As a workload team, I own my MCP implementation and can update tools independently."

**Priority:** P1 (Important)  
**Acceptance Criteria:**
- Workload teams deploy MCP updates without platform team coordination
- Versioning support (agents specify tool version if needed)
- No downtime for other workload MCPs during updates

---

**WTR-3: Tool Naming Coordination**
> "As a workload team, I get guidance on tool naming to avoid conflicts with other workloads."

**Priority:** P1 (Important)  
**Acceptance Criteria:**
- Naming conventions documented (e.g., `powerbi_generate_dax` vs. `generate_dax`)
- Platform team reviews for naming conflicts during registration
- Automated conflict detection in CI/CD

---

### 5.3 Platform Team Requirements

**PTR-1: Routing Logic Management**
> "As the platform team, I can configure routing rules to direct tool invocations to the correct backend MCP."

**Priority:** P0 (Must-Have)  
**Acceptance Criteria:**
- Routing configuration (e.g., JSON/YAML mapping tools to backend URLs)
- Dynamic routing updates (add/remove backends without downtime)
- Health checks for backend MCPs (route around failures)

---

**PTR-2: Performance SLAs**
> "As the platform team, I ensure the unified endpoint maintains low latency (<500ms p95 for tool invocations)."

**Priority:** P0 (Must-Have)  
**Acceptance Criteria:**
- Gateway routing overhead <50ms p95
- Monitoring/alerting on latency regressions
- Load testing validates throughput targets

---

**PTR-3: Backward Compatibility**
> "As the platform team, I provide migration path from standalone MCPs to unified endpoint without breaking existing agents."

**Priority:** P0 (Must-Have)  
**Acceptance Criteria:**
- Standalone MCPs remain operational (deprecation timeline announced)
- Migration documentation/tools for agent developers
- Agents can use both standalone and unified endpoints during transition period

---

## 6. Timeline & Dependencies

### 6.1 Phased Approach

**Phase 0: Prerequisites** (Now - Q1 2026)
- Remote MCP GA (March 2026 - FabCon Atlanta)
- Power BI MCP Pilot (Q1 2026)
- RTI MCP Pilot (Q1 2026)
- **Learnings Captured:** Routing patterns, auth models, governance needs

**Phase 1: Architecture Definition** (Q1 2026)
- Evaluate architecture options (Federation vs. Aggregation vs. Hybrid)
- Define routing model, tool naming conventions
- Design unified auth & governance model
- **Deliverable:** Technical Architecture Document (TAD)

**Phase 2: Prototype & Validation** (Q2 2026)
- Build prototype with 2-3 workload MCPs
- Validate routing performance, tool discovery UX
- Test with 5-10 design partners (agent developers)
- **Deliverable:** Validated prototype, go/no-go decision

**Phase 3: Implementation** (Q3-Q4 2026)
- Build production-ready unified endpoint
- Migrate core workload MCPs (Remote, Power BI, RTI)
- Developer documentation & migration guides
- **Deliverable:** Beta release

**Phase 4: Public Preview** (Q1 2027)
- Launch at Build or FabCon (target: Build 2027)
- Community feedback loop
- Onboard additional workload MCPs
- **Deliverable:** Public Preview release

**Phase 5: GA** (H2 2027)
- SLA commitments, enterprise support
- Backward compatibility guaranteed
- Standalone MCPs deprecated (transition period: 12 months)
- **Deliverable:** GA release

---

### 6.2 Critical Dependencies

| Dependency | Owner | Timing | Impact if Delayed |
|------------|-------|--------|-------------------|
| **Remote MCP GA** | Platform Team | March 2026 | Delays learnings on routing, auth, governance |
| **Workload MCP Pilots** | Power BI, RTI Teams | Q1 2026 | Insufficient validation data for architecture |
| **Architecture Decision** | Platform + Leadership | Q1 2026 | Blocks all downstream work |
| **Security Review** | Security Team | Q2 2026 | Blocks prototype validation |
| **Workload Team Commitment** | Workload Leadership | Q2 2026 | Limits unified endpoint value (fewer tools) |

---

### 6.3 Risks & Mitigation

**Risk 1: Workload Teams Don't Adopt**
- **Impact:** Unified endpoint has few tools (low value)
- **Mitigation:** Executive mandate for workload participation, demonstrate value with pilots
- **Contingency:** Prioritize high-value workloads (Power BI, Data Eng, RTI)

**Risk 2: Performance Regression (Gateway Latency)**
- **Impact:** Agents experience slower response times vs. standalone MCPs
- **Mitigation:** Early load testing, optimize routing logic, caching strategies
- **Contingency:** Hybrid model (core tools built-in, reduce gateway hops)

**Risk 3: Architecture Decision Paralysis**
- **Impact:** Delays to timeline, missed market window
- **Mitigation:** Set decision deadline (end of Q1 2026), exec escalation if needed
- **Contingency:** Default to Federation (proven pattern from API gateways)

**Risk 4: Migration Complexity**
- **Impact:** Developers resist switching from standalone MCPs
- **Mitigation:** Provide clear value (show time savings), migration tooling, gradual deprecation
- **Contingency:** Maintain standalone MCPs longer (lower unified endpoint adoption initially)

---

## 7. Success Criteria

### 7.1 Adoption Metrics (12 Months Post-GA)

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Agent Adoption Rate** | 70%+ of agents using unified endpoint (vs. standalone MCPs) | Telemetry: requests to unified endpoint vs. standalone |
| **Workload MCP Integration** | 5+ workload MCPs registered | Platform tracking of registered backends |
| **Tool Catalog Size** | 50+ tools available via unified discovery | `tools/list` response analysis |
| **Developer Satisfaction** | 4.5+/5.0 rating | NPS surveys, GitHub Discussions sentiment |
| **Configuration Simplification** | 80%+ reduction in config lines (vs. multi-MCP) | Config file analysis (before/after) |

---

### 7.2 Performance Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Tool Discovery Latency** | <200ms p95 for `tools/list` | Gateway telemetry |
| **Tool Invocation Latency** | <500ms p95 (routing overhead <50ms) | End-to-end request timing |
| **Availability** | 99.9% uptime SLA | Monitoring dashboard |
| **Throughput** | 10,000+ requests/second | Load testing validation |

---

### 7.3 Governance Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Audit Trail Completeness** | 100% of tool invocations logged | Audit log validation |
| **Policy Enforcement** | 100% of tenant policies applied consistently | Compliance testing |
| **Admin Adoption** | 50%+ of tenants using unified admin dashboard | Admin portal analytics |

---

## 8. Open Questions

### 8.1 Architecture & Design

**Q1: Which architectural pattern should we adopt?**
- Options: Federation (Gateway), Aggregation (Pluggable Modules), Hybrid
- Decision Criteria: Performance, maintainability, team autonomy, ecosystem growth
- **Decision Owner:** Platform Team + Engineering Leadership
- **Timeline:** Q1 2026

**Q2: How do we handle tool naming conflicts?**
- Should tools be namespaced (e.g., `powerbi.generate_dax` vs. `generate_dax`)?
- What's the process when two workloads want the same tool name?
- **Decision Owner:** Platform Team + API Design Guild
- **Timeline:** Q1 2026 (before prototype)

**Q3: What's the backward compatibility strategy?**
- How long do standalone MCPs remain operational?
- Do we auto-redirect standalone MCP URLs to unified endpoint?
- Migration tooling needed?
- **Decision Owner:** Platform Team
- **Timeline:** Q2 2026 (before Public Preview)

---

### 8.2 Workload Team Coordination

**Q4: What's the workload team participation model?**
- Is it mandatory for workloads to migrate to unified endpoint?
- What support does platform team provide to workload teams?
- **Decision Owner:** Fabric Leadership
- **Timeline:** Q1 2026

**Q5: How do we prioritize which workload MCPs to onboard first?**
- Criteria: Customer demand, technical readiness, strategic importance?
- **Decision Owner:** Platform Team + Product Leadership
- **Timeline:** Q2 2026

---

### 8.3 Customer Experience

**Q6: How do we communicate the migration to developers?**
- Announcement strategy (blog post, docs, webinars)?
- Incentives to migrate from standalone to unified endpoint?
- **Decision Owner:** Platform Team + Marketing
- **Timeline:** Q3 2026 (before Public Preview)

**Q7: What's the deprecation timeline for standalone MCPs?**
- 12 months? 18 months? 24 months?
- Based on adoption metrics or fixed date?
- **Decision Owner:** Platform Team + Product Leadership
- **Timeline:** Q2 2026

---

### 8.4 Technical Implementation

**Q8: What's the performance budget for gateway routing?**
- Acceptable latency overhead: <50ms? <100ms?
- Trade-offs between latency and flexibility?
- **Decision Owner:** Engineering Team
- **Timeline:** Q1 2026 (before prototype)

**Q9: How do we handle versioning of tools?**
- Can agents request specific tool versions?
- Backward compatibility guarantees per tool?
- **Decision Owner:** Platform Team + API Design Guild
- **Timeline:** Q1 2026

**Q10: What's the security model for backend MCP trust?**
- Does gateway validate agent auth and pass assertion to backends?
- Do backends re-validate tokens independently?
- **Decision Owner:** Security Team + Platform Team
- **Timeline:** Q2 2026 (before security review)

---

## Next Steps

### Immediate Actions (November 2025)

1. **Share Vision Document** with Aviv Yahav, Gena Vorobyov, Platform Leadership
2. **Gather Feedback** from workload teams (Power BI, RTI, Data Eng)
3. **Align on Timing** (confirm H1 2027 feasible post-Remote MCP GA)

### Q1 2026 (Architecture Definition Phase)

1. **Form Architecture Working Group** (Platform + Workload engineers)
2. **Evaluate Architecture Options** (Federation vs. Aggregation vs. Hybrid)
3. **Define Routing Model** and tool naming conventions
4. **Create Technical Architecture Document** (TAD)
5. **Decision Checkpoint:** Go/No-Go on unified endpoint approach

### Q2 2026 (Prototype & Validation)

1. **Build Prototype** with 2-3 workload MCPs
2. **Recruit Design Partners** (5-10 agent developers)
3. **Validate Performance** (latency, throughput, discovery UX)
4. **Iterate on Feedback**
5. **Decision Checkpoint:** Go/No-Go on full implementation

### Q3-Q4 2026 (Implementation)

1. **Build Production System**
2. **Migrate Core Workload MCPs** (Remote, Power BI, RTI)
3. **Documentation & Migration Tools**
4. **Beta Testing**

### 2027 (Launch & Adoption)

1. **Public Preview Launch** (Build or FabCon)
2. **Community Feedback Loop**
3. **GA Release** (H2 2027)
4. **Standalone MCP Deprecation** (12-month transition)

---

**Document End** | Version: 1.0 | Last Updated: November 15, 2025
