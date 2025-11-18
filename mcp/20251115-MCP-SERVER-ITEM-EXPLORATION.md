# MCP Server Item
## Exploration & Vision Document

---

**Document Metadata:**

| Property | Value |
|----------|-------|
| **Version** | 1.0 |
| **Last Updated** | November 15, 2025 |
| **Document Type** | Exploration & Research |
| **Target Timeline** | TBD (Post-2026) |
| **Document Owner** | Hasan Abo-Shally (Principal PM, Fabric Platform) |
| **Status** | Exploration Phase - Customer Validation Needed |
| **Reviewers** | Aviv Yahav, Teddy Belayneh, Nadav Goshen |

---

## Executive Summary

**The Opportunity:** Customers want to encode proprietary business logic, domain-specific calculations, and organizational best practices as AI-accessible tools—extending Fabric's MCP capabilities with custom functionality unique to their enterprise.

**The Vision:** Enable customers to create **Fabric Items** that automatically become **MCP servers**, exposing custom tools that AI agents can discover and invoke alongside platform-provided capabilities.

**Example Use Case:** A finance team creates a Python function that calculates "weighted cost of capital" using proprietary formulas. This function becomes an MCP tool. AI agents working in Fabric can now invoke `calculate_wacc()` just like they invoke `create_workspace()` or `generate_dax()`—no manual integration needed.

**Status:** This is an **exploration document**, not a product spec. We need customer validation, technical feasibility assessment, and security model design before committing to development.

**Timeline:** TBD (earliest: post-2026, dependent on customer demand validation and Unified MCP Server foundation).

---

## Table of Contents

1. [The Opportunity: Customer Extensibility](#1-the-opportunity-customer-extensibility)
2. [The Vision: MCP Server as a Fabric Item](#2-the-vision-mcp-server-as-a-fabric-item)
3. [Illustrative Scenarios](#3-illustrative-scenarios)
4. [Customer Value Proposition](#4-customer-value-proposition)
5. [Technical Feasibility Considerations](#5-technical-feasibility-considerations)
6. [Open Questions & Validation Needs](#6-open-questions--validation-needs)
7. [Next Steps](#7-next-steps)

---

## 1. The Opportunity: Customer Extensibility

### 1.1 The Problem: Proprietary Logic is Inaccessible to Agents

**Current State:**

Organizations have proprietary business logic embedded in:
- Custom Python functions (cost models, risk calculations, compliance rules)
- Excel macros with decades of institutional knowledge
- Domain-specific transforms (healthcare billing codes, financial instruments, regulatory mappings)
- Organizational policies encoded as code (approval workflows, data classification rules)

**Why This Matters for AI Agents:**

AI agents can automate **generic** operations (create workspace, generate DAX, query KQL) via platform-provided MCP tools. But they **cannot** automate organization-specific workflows without access to proprietary logic.

**Example:**

> **Finance Team Workflow (Today):**
> 
> Agent helps analyst by:
> 1. ✅ Creating workspace (via Remote MCP)
> 2. ✅ Loading data into Lakehouse (via Remote MCP)
> 3. ✅ Generating Power BI report (via Power BI MCP)
> 4. ❌ **BLOCKED:** Cannot calculate "weighted average cost of capital" (proprietary formula locked in Excel)
> 5. 👤 **Human Intervention Required:** Analyst manually runs Excel macro, copies result to report
>
> **Result:** Workflow breaks. Agent cannot complete end-to-end automation.

---

### 1.2 What Customers Want

Based on initial conversations with design partners and ISV feedback:

**Customer Quote (Hypothetical):**
> "Our agents can do 80% of the work—create workspaces, load data, generate reports. But the last 20% is our proprietary calculations. If agents could call our custom functions, we'd have full automation."

**Desired Capability:**

Customers want to:
1. **Author custom logic** in familiar languages (Python, SQL, DAX)
2. **Package as Fabric Item** (like Notebooks, Pipelines, or Functions)
3. **Expose to AI agents** automatically (no manual API wrapping)
4. **Discover alongside platform tools** (agents see `calculate_wacc()` in same tool catalog as `create_workspace()`)

**Analogy:**

- **Today:** Fabric Items = Data artifacts (Lakehouses, Warehouses, Reports)
- **Future:** Fabric Items = Data artifacts **+ Agent-Accessible Functions**

---

### 1.3 Strategic Importance

**Why This Matters for Fabric:**

1. **Competitive Differentiation:**
   - Snowflake, Databricks, AWS don't offer customer-extensible agent platforms
   - Fabric becomes the **only** analytics platform where customers can build custom AI agent capabilities

2. **Ecosystem Growth:**
   - ISVs build industry-specific MCP tools (healthcare, finance, retail) as Fabric Items
   - Fabric Marketplace hosts MCP Server Items (monetization opportunity)
   - Network effects: More custom tools → More valuable to AI agents → Higher Fabric adoption

3. **Customer Stickiness:**
   - Customers encode proprietary IP as Fabric Items
   - Switching cost increases (can't migrate custom MCP tools to other platforms easily)
   - Deeper platform dependency

4. **Use Case Expansion:**
   - Unlocks industry-specific automation (healthcare compliance, financial modeling, manufacturing optimization)
   - Enables citizen developer scenarios (business users create tools without IT)

---

## 2. The Vision: MCP Server as a Fabric Item

### 2.1 What is an "MCP Server Item"?

**Definition:** A Fabric Item type that packages custom Python/SQL/DAX logic and automatically exposes it as MCP tools, discoverable by AI agents.

**Developer Experience:**

```python
# File: my_finance_tools.py (in Fabric workspace)

from fabric_mcp import tool

@tool(name="calculate_wacc", description="Calculate Weighted Average Cost of Capital")
def calculate_wacc(equity_cost: float, debt_cost: float, equity_weight: float, debt_weight: float, tax_rate: float) -> float:
    """
    Proprietary WACC calculation using company-specific methodology.
    """
    after_tax_debt_cost = debt_cost * (1 - tax_rate)
    wacc = (equity_cost * equity_weight) + (after_tax_debt_cost * debt_weight)
    return wacc

@tool(name="check_compliance", description="Validate data meets SOX compliance rules")
def check_compliance(dataset_id: str) -> dict:
    """
    Custom compliance check based on organizational policies.
    """
    # ... proprietary logic ...
    return {"compliant": True, "issues": []}
```

**What Happens Next:**

1. Developer **saves file** in Fabric workspace → Fabric detects `@tool` decorators
2. Fabric **creates MCP Server Item** automatically (no manual configuration)
3. MCP Server Item **registers tools** with Unified MCP endpoint (or workspace-scoped endpoint)
4. AI agents **discover tools** via `tools/list` → See `calculate_wacc()` and `check_compliance()`
5. Agents **invoke tools** just like platform tools → Fabric routes to Python function, executes securely

**Agent's Perspective:**

```
Agent calls: tools/list

Response:
[
  // Platform tools
  { "name": "create_workspace", "category": "platform" },
  
  // Power BI tools
  { "name": "generate_dax", "category": "powerbi" },
  
  // Customer-defined tools (this workspace)
  { "name": "calculate_wacc", "category": "custom", "workspace": "Finance-Prod" },
  { "name": "check_compliance", "category": "custom", "workspace": "Finance-Prod" },
  
  // ... more tools ...
]

Agent invokes: calculate_wacc(equity_cost=0.10, debt_cost=0.05, ...)

Fabric executes: my_finance_tools.calculate_wacc() in secure sandbox
Returns: { "wacc": 0.078 }
```

---

### 2.2 Key Design Principles

**1. Zero Boilerplate**
- Developer writes function, adds `@tool` decorator → Done
- No manual MCP server setup, no API wrapping, no hosting configuration

**2. Familiar Developer Experience**
- Use existing Fabric primitives (Notebooks, Python environments, SQL queries)
- Natural extension of current workflows (author code in Fabric, run in Fabric)

**3. Secure by Default**
- Functions execute in isolated sandboxes (no access to other workspaces)
- Inherit Fabric RBAC (only authorized agents/users can invoke)
- Audit logging (all invocations traced to caller identity)

**4. Workspace-Scoped Tools**
- Tools visible only within workspace (or tenant, based on sharing settings)
- ISVs can create "public" MCP Server Items (available in Fabric Marketplace)

**5. Seamless Integration**
- Customer tools appear in same tool catalog as platform tools
- Consistent invocation pattern (agents don't distinguish platform vs. custom)

---

## 3. Illustrative Scenarios

### 3.1 Scenario 1: Finance Team - Custom Cost Calculations

**Persona:** Financial Analyst / CFO Office  
**Industry:** Enterprise Finance  
**Business Need:** Automate financial modeling workflows with proprietary formulas

**Current State:**

Finance team uses Excel macros for "Weighted Average Cost of Capital" (WACC) calculations:
- Formula tweaked over 10 years to match company methodology
- Not documented in any system (tribal knowledge)
- AI agents cannot access (locked in Excel files on analyst desktops)

**Desired State (with MCP Server Item):**

1. **Finance analyst** creates Python function in Fabric Notebook:
   ```python
   @tool(name="calculate_wacc", description="Company-specific WACC calculation")
   def calculate_wacc(equity_cost, debt_cost, equity_weight, debt_weight, tax_rate):
       # Proprietary formula here
       return wacc_value
   ```

2. **Saves Notebook** as MCP Server Item in Finance workspace

3. **AI agent** helping CFO prepare quarterly board presentation:
   - Agent: "Calculate WACC for Q4 projections"
   - Agent discovers `calculate_wacc()` tool in Finance workspace
   - Agent invokes tool with Q4 data
   - Tool returns result → Agent inserts into Power BI report
   - **End-to-end automation** (no manual Excel step)

**Value Delivered:**
- 📈 **10+ hours saved per quarter** (eliminate manual Excel calculations)
- ✅ **Accuracy improved** (proprietary formula codified, version-controlled)
- 🔒 **IP Protected** (formula stays in Fabric, not exposed via generic APIs)

---

### 3.2 Scenario 2: Healthcare - Compliance Validation

**Persona:** Healthcare Data Engineer  
**Industry:** Healthcare / Life Sciences  
**Business Need:** Automate HIPAA compliance checks on patient data pipelines

**Current State:**

Healthcare org has custom compliance rules beyond standard HIPAA:
- "Patient data must be de-identified within 24 hours of collection"
- "Treatment codes must map to approved clinical pathways"
- Rules encoded in manual runbooks (PDF documents)

**Desired State (with MCP Server Item):**

1. **Data engineer** creates compliance validation function:
   ```python
   @tool(name="validate_hipaa_compliance", description="Check dataset against org HIPAA rules")
   def validate_hipaa_compliance(dataset_id: str) -> dict:
       # Custom rules here
       return {"compliant": True, "violations": []}
   ```

2. **Saves as MCP Server Item** in Healthcare workspace

3. **AI agent** managing data pipeline:
   - Agent loads patient data into Lakehouse
   - Agent calls `validate_hipaa_compliance(dataset_id="patient_records")`
   - Tool checks: De-identification status, code mappings, retention policies
   - If compliant → Agent proceeds with analysis
   - If violations → Agent alerts data steward, blocks downstream processing
   - **Automated compliance gates** (no manual audits)

**Value Delivered:**
- 🔒 **Risk Reduction** (compliance checks run automatically on every pipeline)
- ⏱️ **Faster Audits** (compliance evidence logged automatically)
- 📋 **Consistent Enforcement** (no human error in rule application)

---

### 3.3 Scenario 3: Retail ISV - Industry-Specific Tools

**Persona:** ISV Partner (Retail Analytics Software Vendor)  
**Industry:** Retail  
**Business Need:** Offer industry-specific AI agent capabilities to retail customers

**Current State:**

Retail ISV builds analytics tools for inventory optimization:
- Proprietary algorithms for demand forecasting, markdown optimization
- Currently sold as standalone SaaS product (disconnected from customer's Fabric)

**Desired State (with MCP Server Item):**

1. **ISV creates MCP Server Item** with retail-specific tools:
   ```python
   @tool(name="forecast_demand", description="Retail demand forecasting model")
   def forecast_demand(product_id, store_id, historical_sales):
       # ISV proprietary ML model
       return forecast_data
   
   @tool(name="optimize_markdown", description="Calculate optimal markdown strategy")
   def optimize_markdown(product_id, current_inventory, target_sell_through):
       # ISV proprietary optimization algorithm
       return markdown_schedule
   ```

2. **Publishes to Fabric Marketplace** as "RetailGenius MCP Tools"

3. **Retail customers install** MCP Server Item in their workspaces

4. **Customer's AI agents** now have access to ISV tools:
   - Agent helping store manager plan promotions
   - Agent calls `forecast_demand()` for product analysis
   - Agent calls `optimize_markdown()` for pricing strategy
   - Agent generates report with recommendations
   - **ISV value delivered inside customer's Fabric workflows**

**Value Delivered (ISV):**
- 💰 **New Revenue Stream** (subscription fees for MCP Server Items)
- 🚀 **Faster Customer Adoption** (integrate with Fabric, not standalone SaaS)
- 🔗 **Sticky Integration** (customers depend on ISV tools in workflows)

**Value Delivered (Customer):**
- 🎯 **Industry Expertise** (access specialized algorithms without building in-house)
- ⚡ **Instant Integration** (install MCP Server Item, tools available immediately)
- 🤖 **Agent-Enabled** (ISV tools work seamlessly with AI agents)

---

## 4. Customer Value Proposition

### 4.1 For Enterprise Customers

**Enable Full Workflow Automation:**
- Close the "last mile" gap (agents can invoke proprietary logic)
- End-to-end automation without human intervention

**Codify Institutional Knowledge:**
- Excel macros, tribal knowledge, manual processes → Version-controlled code
- Reduce risk of knowledge loss (retirements, turnover)

**Accelerate Time-to-Value:**
- Create custom tools in hours (not months of API development)
- Iterate quickly (update functions, tools update automatically)

**Maintain IP Control:**
- Proprietary logic stays in Fabric (not exposed via generic APIs)
- Fine-grained access control (workspace-scoped tools)

---

### 4.2 For ISV Partners

**New Monetization Model:**
- Sell MCP Server Items on Fabric Marketplace
- Subscription revenue (per-workspace, per-tenant licensing)

**Lower Integration Costs:**
- Build once (MCP Server Item), deploy everywhere (Fabric customers)
- No custom APIs, no hosting infrastructure

**Competitive Differentiation:**
- First ISVs to market with agent-ready tools
- Position as "AI-native" solutions

**Ecosystem Leverage:**
- Benefit from Fabric's agent ecosystem growth
- Cross-sell opportunities (customers using multiple ISV tools)

---

### 4.3 For Microsoft Fabric

**Ecosystem Growth:**
- Marketplace opportunity (MCP Server Items as new item type)
- ISV ecosystem accelerates (lower barrier to contribute value)

**Platform Stickiness:**
- Customers encode IP as Fabric Items (switching cost increases)
- Network effects (more custom tools → more valuable platform)

**Competitive Moat:**
- Unique capability (competitors don't offer customer-extensible agent platforms)
- "Fabric = AI Agent Platform" positioning

---

## 5. Technical Feasibility Considerations

### 5.1 Precedents & Patterns

**Existing Fabric Primitives:**

| Fabric Capability | How MCP Server Item Builds On It |
|-------------------|-----------------------------------|
| **Python Notebooks** | Execute Python code in Fabric-managed environments |
| **User-Defined Functions (UDFs)** | Register custom SQL/Python functions in Spark |
| **Fabric Functions (Preview)** | Expose HTTP endpoints for custom code |
| **Git Integration** | Version control for custom code |

**External Precedents:**

| Platform | Capability | Relevance |
|----------|-----------|-----------|
| **Snowflake UDFs** | Custom SQL/Python/Java functions callable from queries | Pattern: Sandbox execution, RBAC enforcement |
| **AWS Lambda** | Serverless functions triggered by events | Pattern: Auto-scaling, pay-per-invocation |
| **Zapier Custom Actions** | User-defined workflow steps in automation platform | Pattern: Low-code function authoring |
| **OpenAI GPT Actions** | Custom API endpoints accessible to ChatGPT | Pattern: Schema-based tool discovery |

---

### 5.2 Technical Architecture (Hypothetical)

**High-Level Flow:**

```
┌────────────────────────────────────────────┐
│  Developer                                  │
│  └─ Authors Python function with @tool     │
│  └─ Saves as MCP Server Item in workspace  │
└────────────────┬───────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────┐
│  Fabric Workspace (Item Storage)           │
│  ┌──────────────────────────────────────┐ │
│  │  MCP Server Item                     │ │
│  │  - Python code (my_tools.py)         │ │
│  │  - Tool metadata (names, schemas)    │ │
│  │  - RBAC settings (who can invoke)    │ │
│  └──────────────────────────────────────┘ │
└────────────────┬───────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────┐
│  Unified MCP Endpoint                      │
│  └─ Discovers MCP Server Items             │
│  └─ Includes custom tools in tools/list    │
│  └─ Routes invocations to execution engine │
└────────────────┬───────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────┐
│  AI Agent                                   │
│  └─ Calls tools/list                       │
│  └─ Discovers calculate_wacc()             │
│  └─ Invokes tool                           │
└────────────────┬───────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────┐
│  Fabric Execution Engine                   │
│  └─ Loads MCP Server Item                  │
│  └─ Executes Python function in sandbox    │
│  └─ Returns result to agent                │
│  └─ Logs invocation to audit trail         │
└────────────────────────────────────────────┘
```

---

### 5.3 Key Technical Challenges

**Challenge 1: Secure Execution Sandboxing**

**Problem:** Customer code runs in multi-tenant environment. How do we isolate execution?

**Potential Solutions:**
- **Fabric Spark Pools:** Leverage existing Spark sandbox (customer code already runs here in Notebooks)
- **Container-Based Isolation:** Spin up ephemeral containers per tool invocation (AWS Lambda model)
- **Process Isolation:** Separate Python processes with resource limits (CPU, memory, timeout)

**Decision Needed:** Performance vs. isolation trade-offs

---

**Challenge 2: Schema Definition & Validation**

**Problem:** How does agent know what parameters a custom tool accepts?

**Potential Solutions:**
- **Automatic Schema Extraction:** Parse Python type hints → Generate JSON schema
  ```python
  @tool(name="calculate_wacc")
  def calculate_wacc(equity_cost: float, debt_cost: float) -> float:
      # Schema auto-generated from type hints
  ```
- **Manual Schema Declaration:** Developer provides schema explicitly
  ```python
  @tool(name="calculate_wacc", schema={...})
  def calculate_wacc(**kwargs):
      # Explicit schema
  ```

**Decision Needed:** Developer experience vs. control

---

**Challenge 3: Tool Discovery Scope**

**Problem:** Should custom tools be workspace-scoped, tenant-scoped, or public?

**Options:**

| Scope | Who Can Discover | Use Case |
|-------|-----------------|----------|
| **Workspace-Only** | Agents in same workspace | Team-specific tools |
| **Tenant-Wide** | Any workspace in tenant | Organization-wide tools |
| **Public (Marketplace)** | All Fabric customers | ISV-provided tools |

**Decision Needed:** Sharing model, permissions model

---

**Challenge 4: Versioning & Breaking Changes**

**Problem:** Customer updates tool logic → Breaks existing agent workflows?

**Potential Solutions:**
- **Versioned Tools:** `calculate_wacc_v1()`, `calculate_wacc_v2()` (explicit versioning)
- **Semantic Versioning:** Tool schema includes version, agents specify required version
- **Immutable Deployments:** Each update creates new version, old versions remain callable

**Decision Needed:** Versioning strategy, backward compatibility guarantees

---

**Challenge 5: Performance & Scale**

**Problem:** Custom tools may be slow (complex calculations, external API calls). How do we prevent timeout/abuse?

**Potential Solutions:**
- **Timeout Limits:** Max execution time (e.g., 30 seconds per invocation)
- **Resource Quotas:** CPU/memory limits per workspace
- **Rate Limiting:** Max invocations per hour per tool
- **Async Execution:** Long-running tools return `operationId`, agent polls for result

**Decision Needed:** Performance SLAs, quota model

---

## 6. Open Questions & Validation Needs

### 6.1 Customer Validation Questions

**Q1: Is there real demand for this capability?**
- How many customers have proprietary logic they want to expose to agents?
- Are they willing to migrate logic from Excel/Python scripts to Fabric Items?
- **Validation Approach:** Customer interviews (10-15 enterprises), design partner recruitment

**Q2: What programming languages are essential?**
- Python only? SQL? DAX? JavaScript?
- Do customers need multi-language support in one MCP Server Item?
- **Validation Approach:** Survey existing Fabric developers, analyze Notebook language usage

**Q3: What's the acceptable time-to-create for a custom tool?**
- Target: <1 hour from idea to deployed tool?
- What's the learning curve for `@tool` decorator pattern?
- **Validation Approach:** Usability testing with 5-10 developers

**Q4: What sharing/collaboration features are needed?**
- Do teams need to collaborate on MCP Server Items (like Notebooks)?
- Version control (Git integration)?
- Review/approval workflows before tools go live?
- **Validation Approach:** Design partner pilots, gather collaboration pain points

---

### 6.2 Technical Feasibility Questions

**Q5: Can we leverage Fabric Functions (preview) infrastructure?**
- Fabric Functions already executes customer Python code via HTTP
- Can we "wrap" Fabric Functions as MCP tools?
- **Validation Approach:** Prototype with Fabric Functions team

**Q6: What's the performance envelope?**
- Target latency: <5s p95 for tool invocation?
- Max concurrent invocations per workspace?
- **Validation Approach:** Load testing with Fabric Spark/Functions

**Q7: How do we handle dependencies?**
- Custom tools may require Python packages (pandas, scikit-learn, etc.)
- Do we support package installation per MCP Server Item?
- **Validation Approach:** Review Fabric Notebook package management approach

---

### 6.3 Business Model Questions

**Q8: How do we price MCP Server Items?**
- Included in Fabric capacity costs?
- Separate SKU (per-invocation pricing)?
- ISV marketplace revenue share model?
- **Validation Approach:** Pricing strategy discussion with Finance/Product Marketing

**Q9: What's the ISV onboarding process?**
- How do ISVs publish to Fabric Marketplace?
- Certification/validation requirements?
- **Validation Approach:** ISV partner interviews, marketplace team alignment

---

### 6.4 Security & Governance Questions

**Q10: What's the security review scope?**
- Customer code executes in Fabric → What are threat vectors?
- Can malicious code impact other tenants?
- **Validation Approach:** Security team threat modeling session

**Q11: How do we audit custom tool invocations?**
- Log to same Fabric audit trail as platform tools?
- Include tool code version in logs?
- **Validation Approach:** Compliance team requirements gathering

**Q12: What RBAC model applies?**
- Workspace-level permissions sufficient?
- Item-level permissions (who can invoke vs. who can edit)?
- **Validation Approach:** RBAC design session with security team

---

## 7. Next Steps

### 7.1 Validation Phase (Q1-Q2 2026)

**Step 1: Customer Research** (8 weeks)
- Recruit 10-15 enterprise customers for interviews
- Questions:
  - "Do you have proprietary business logic you'd want agents to access?"
  - "What's that logic today? (Excel, Python scripts, SQL procedures)"
  - "Would you migrate it to Fabric if it became agent-accessible?"
  - "What programming languages would you use?"
- **Deliverable:** Customer Validation Report (demand signal, language preferences)

**Step 2: Design Partner Recruitment** (4 weeks)
- Identify 3-5 customers willing to pilot
- Criteria: Have proprietary logic, willing to beta test, provide feedback
- **Deliverable:** Signed design partner agreements

**Step 3: Technical Feasibility Prototype** (12 weeks)
- Build proof-of-concept with Fabric Functions team
- Validate: Sandboxing, schema extraction, tool discovery, invocation flow
- **Deliverable:** Working prototype, technical feasibility report

**Step 4: Go/No-Go Decision** (Q2 2026)
- Review customer validation results
- Review technical feasibility
- Assess business case (pricing model, marketplace potential)
- **Deliverable:** Executive decision (build, delay, or cancel)

---

### 7.2 If Go Decision → Development Phase (Q3 2026 - Q1 2027)

**Phase 1: MVP Development** (Q3 2026)
- Build MCP Server Item type in Fabric
- Implement `@tool` decorator pattern
- Integrate with Unified MCP Endpoint (or workspace-scoped endpoint)
- **Deliverable:** Internal dogfooding version

**Phase 2: Design Partner Pilot** (Q4 2026)
- Deploy to 3-5 design partners
- Gather feedback on developer experience, performance, reliability
- Iterate on UX, fix bugs
- **Deliverable:** Pilot success metrics, refined requirements

**Phase 3: Private Preview** (Q1 2027)
- Expand to 20-30 customers
- Security review, compliance validation
- Documentation, samples, tutorials
- **Deliverable:** Private Preview release

**Phase 4: Public Preview** (Q2 2027)
- Launch at Build or FabCon
- Marketplace integration (ISV onboarding)
- Community feedback loop
- **Deliverable:** Public Preview release

**Phase 5: GA** (Q4 2027)
- Production SLAs, enterprise support
- ISV marketplace live
- **Deliverable:** GA release

---

### 7.3 Immediate Actions (November 2025)

1. **Share Exploration Document** with Aviv Yahav, Teddy Belayneh, Nadav Goshen
2. **Align on Research Timeline** (Q1-Q2 2026 feasible?)
3. **Recruit Customer Interviewees** (identify 10-15 candidates)
4. **Prototype Kickoff** with Fabric Functions team (technical feasibility assessment)

---

## Appendix: Related Initiatives

**Fabric Functions (Preview):**
- HTTP-accessible custom Python/SQL functions
- Potential infrastructure for MCP Server Item execution

**Fabric Marketplace:**
- Platform for ISV-provided Fabric Items
- Potential distribution channel for public MCP Server Items

**Unified MCP Endpoint (Vision):**
- Single discovery point for all Fabric tools
- MCP Server Items would integrate here (custom tools in unified catalog)

**Git Integration:**
- Version control for Fabric Items
- MCP Server Items could leverage for code versioning

---

**Document End** | Version: 1.0 | Last Updated: November 15, 2025
