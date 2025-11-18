# Fabric Remote MCP: Cloud-Hosted Agent Execution Platform

**Document Version:** 2.0  
**Last Updated:** November 15, 2025  
**Status:** Engineering Handover - Ready for Implementation  
**Owner:** Hasan Abo-Shally, Senior PM, Microsoft Fabric  
**Engineering Lead:** Mahir Diab, Principle Engineer, Microsoft Fabric   

---

## Executive Summary

**What is Fabric Remote MCP?**

A cloud-hosted execution platform enabling AI agents (from any platform—VS Code, Copilot Studio, Claude Desktop, custom agents) to automate Fabric **control plane operations** via natural language using the open Model Context Protocol (MCP) standard.

**Focus:** Fabric Public APIs, specifically **control plane operations**—workspace lifecycle, item management, permission assignments, capacity operations.

**The Problem:**

Organizations struggle with three critical automation challenges:

1. **No standardized protocol for AI-driven automation**
   - *Evidence:* Gartner's 2024 AI Infrastructure Survey reports 62% of enterprises experimenting with agentic AI cite "integration complexity with existing systems" as their top barrier to production deployment
   - Custom, platform-specific APIs create integration overhead and vendor lock-in

2. **Authentication barriers consume development resources**  
   - *Evidence:* GitHub's 2024 State of Enterprise Development survey found teams spend average 28-32% of integration development time on authentication scaffolding and token management
   - OAuth2 flows, token refresh logic, permission mapping require specialized expertise

3. **Manual operations cannot scale with AI-era demands**
   - *Evidence:* McKinsey's 2024 Cloud Operations Report indicates 68% of organizations report they "cannot keep pace with volume and complexity of cloud infrastructure requests" using manual processes
   - Workspace provisioning, compliance scanning, bulk permission management create bottlenecks

**Our Solution:**

Fabric Remote MCP provides cloud-hosted, enterprise-grade MCP execution with:
- **OAuth2 authentication** - Seamless integration with existing Azure identity
- **Production-ready tools** covering workspace lifecycle, item operations, permission management
- **Enterprise governance** - Comprehensive audit logging, rate limiting, tenant admin controls
- **Open standard** - Works with any MCP-compatible agent platform

**Timeline:**

- **M0 - Private Preview:** January 2026 (design partners)
- **M1 - Public Preview:** March 2026 (FabCon Atlanta)
- **GA Target:** September 2026 (FabCon Europe)

**Validated Impact:**

Working with 5 design partners (PwC, Avanade, KPMG + 2 enterprise), we've validated scenarios showing:
- Customer onboarding: **Days → Minutes** (automated workspace provisioning)
- Compliance scanning: **Quarterly → Continuous** (automated audit workflows)
- Admin handover: **Hours → Seconds** (bulk permission transfers with audit trails)

---

## What We'll Demo at FabCon Atlanta (March 2026)

**The Vision in Action:**

Imagine walking up to the FabCon demo station where Binh (BI Engineer) is drowning in workspace provisioning requests from new project teams. Binh opens Microsoft Teams and types:

> *"Set up analytics environment for the new Contoso project. Create workspaces for Sales, Marketing, and Finance teams. Add sarah@contoso.com as Admin and the project team as Contributors."*

Within 30 seconds, a Copilot Studio agent (powered by Fabric Remote MCP):
- Creates 3 production-ready workspaces
- Provisions Lakehouses and Warehouses in each
- Assigns correct permissions across 15 users
- Generates a complete audit trail

**What used to take 2-3 days of manual clicking happens in natural language, in seconds.**

Then we'll show Ren (Data Engineer) in VS Code asking Copilot:

> *"@workspace Who has Admin access to the Finance workspaces? Transfer ownership from John (who's leaving) to Jane."*

The agent scans 50+ workspaces, identifies 12 that need updates, and completes the bulk ownership transfer with full compliance documentation—all through conversation.

**This is Fabric Remote MCP:** Cloud-hosted execution platform enabling any AI agent to automate Fabric operations through natural language using the open Model Context Protocol standard.

---

## 1. The Problem & Opportunity

### 1.1 Market Reality: The AI Automation Gap

Organizations are rapidly adopting AI agents to automate knowledge work, but infrastructure platforms lack standardized integration points. This creates a critical gap:

**Current State:**

**Challenge 1: No Standardized Protocol**
- **Evidence:** Gartner's 2024 AI Infrastructure Survey reports **62% of enterprises** experimenting with agentic AI cite "integration complexity with existing systems" as their top barrier to production deployment
- Each platform requires custom integration work (API endpoints, authentication flows, error handling)
- Vendor lock-in limits ability to switch or combine agent platforms

**Challenge 2: Authentication Complexity**
- **Evidence:** GitHub's 2024 State of Enterprise Development survey found teams spend average **28-32% of integration development time** on authentication scaffolding and token management
- OAuth2 flows, token refresh logic, scope management require specialized expertise
- Each integration duplicates authentication infrastructure

**Challenge 3: Manual Operations Don't Scale**
- **Evidence:** McKinsey's 2024 Cloud Operations Report indicates **68% of organizations** report they "cannot keep pace with volume and complexity of cloud infrastructure requests" using manual processes
- Workspace provisioning backlogs grow faster than IT teams can hire
- Compliance scanning frequency limited by manual effort (quarterly at best)
- Bulk permission management (onboarding/offboarding) error-prone and time-consuming

**What We Heard from Design Partners:**

> **PwC (Global Consulting):**  
> *"Our customer onboarding requires provisioning 15-20 workspaces per engagement. Manual setup takes 2-3 days. We need automation, but custom API integrations are too complex and time-consuming."*

> **Avanade (Microsoft SI Partner):**  
> *"We run quarterly compliance scans across 200+ customer tenants. Manual review takes weeks. We need continuous, automated scanning but building custom integrations for each customer is not scalable."*

> **Enterprise Partner (Healthcare, NDA):**  
> *"When data engineers leave, transferring workspace ownership requires updating 50+ workspaces manually. We need bulk automation with complete audit trails for compliance."*

### 1.2 Why Existing Solutions Fall Short

**Option 1: Direct Fabric Public API Integration**
- ❌ Complex authentication setup (OAuth2, token management, refresh logic)
- ❌ Custom code for each use case (no reusable agent patterns)
- ❌ API-specific knowledge required (endpoints, schemas, async patterns)
- ❌ Limited agent platform compatibility (each platform has different connector models)

**Option 2: Platform-Specific Connectors (Power Automate, Copilot Studio)**
- ❌ Vendor lock-in (workflows tied to specific automation platforms)
- ❌ Limited composability (cannot combine with other AI tools and agents)
- ❌ UI-driven configuration (not code-driven, version control challenges)

**Option 3: Custom Middleware Layer**
- ❌ Maintenance burden (must stay current with Fabric API changes)
- ❌ Security risks (introduces custom authentication and authorization logic)
- ❌ Duplicated effort (every organization builds similar infrastructure)

### 1.3 The MCP Opportunity: "USB Type-C for AI"

The Model Context Protocol (MCP) is an **open standard** that provides a universal interface for connecting AI agents to data sources and operational systems—similar to how USB Type-C unified device connectivity.

**What MCP Enables:**
- **Universal compatibility:** Any MCP-compliant agent can connect to any MCP server
- **Standardized authentication:** OAuth2 flows built into the protocol
- **Self-documenting tools:** Agents discover capabilities automatically via JSON schemas
- **Platform independence:** Write once, use across VS Code, Copilot Studio, Claude, custom agents

**Market Timing:**
- MCP specification released by Anthropic (Claude) in late 2024
- Growing ecosystem adoption: VS Code, Claude Desktop, custom agent frameworks
- **First-mover advantage:** Fabric can be the **first major analytics platform** to offer native MCP support

---

## 2. Product Vision & Strategy

### 2.1 Vision Statement

**Enable AI agents to automate Fabric operations as easily as humans perform them—through natural language, with enterprise-grade security, across any agent platform.**

### 2.2 Strategic Positioning

**Remote MCP (This Effort):**
- Cloud-hosted MCP execution platform
- **Focus: Fabric Public APIs, specifically control plane operations**
  - Workspace lifecycle (create, update, delete, list)
  - Item management (all Fabric item types)
  - Permission assignments (users, groups, service principals)
  - Capacity operations (list, get details)
  - Identity resolution (user/group lookups via Microsoft Graph)
- OAuth2 authentication with user/service principal flows
- Enterprise governance and audit logging
- **Target Users:**
  - **Binh (BI Engineer)** - Automating customer/project environment provisioning
  - **Ari (Data Architect)** - Compliance scanning and governance automation
  - **Ren (Data Engineer)** - Bulk administrative operations and monitoring
  - AI agent platforms (Copilot Studio, custom enterprise agents)
- **Target: M1 Public Preview (March 2026 - FabCon Atlanta)**

**Related Efforts (See Separate Specs):**

**Unified Fabric MCP Server** *(See: 20251115-UNIFIED-FABRIC-MCP-VISION.md)*
- Future vision: One MCP endpoint for all Fabric capabilities (control plane + data plane + workload-specific)
- Unified tool discovery across core Fabric, Power BI, Data Factory, OneLake, etc.
- Simplified developer experience (single connection, comprehensive catalog)
- **Timeline: H1 2027** (post-GA of Remote MCP, informed by learnings)

**Fabric MCP(s) Platform** *(See: 20251115-FABRIC-MCPS-PLATFORM-SPEC.md)*
- Extensibility framework enabling workload teams to contribute domain-specific tools
- Platform infrastructure shared across all Fabric MCPs (auth, audit, governance)
- Contribution process, quality standards, approval workflow
- **Timeline: Parallel track with Remote MCP**

---

### 2.3 How We Delight Each Persona

This section maps Fabric Remote MCP features to the specific "delighters" identified in Fabric persona research, showing how we address what each persona values most.

#### **Binh (BI Engineer)**

**Binh's Top Delighters:**
- ✅ "Great support from cloud platform provider/implementer"
- ✅ "Clear documentation from the platform, with code comments giving context from authors"
- ✅ "Automation of testing new code that saves me time"
- ✅ "Tools that make it easy to optimize performance and cost for many of my customers"

**How Remote MCP Delivers:**

| Delighter | How We Address It |
|-----------|-------------------|
| **Great support** | Microsoft-hosted service with SLA guarantees, comprehensive audit logging, and enterprise support |
| **Clear documentation** | Each of 23 tools documented with schemas, examples, and natural language descriptions accessible to AI agents |
| **Automation of testing** | Agents can validate workspace configurations before production deployment via `list_workspaces`, `list_items` |
| **Optimize for customers** | Repeatable workspace provisioning templates ensure consistency across customer environments—no manual errors |

**Key Impact:** Binh provisions 15-20 customer workspaces in 5 minutes vs. 2-3 days of manual clicking.

---

#### **Ari (Data Architect)**

**Ari's Top Delighters:**
- ✅ "Wide variety of services available on cloud platforms make it easy to set up and scale infrastructure"
- ✅ "Leveraging prebuilt tools from external sources allows quick addressing of specific requirements"
- ✅ "Freedom to use whatever tools/services needed to best address our needs"

**How Remote MCP Delivers:**

| Delighter | How We Address It |
|-----------|-------------------|
| **Wide variety** | 23 control plane tools cover workspace, item, permission, capacity operations—comprehensive API coverage |
| **Prebuilt tools** | No need to build custom compliance scanners or admin scripts—MCP provides production-ready automation |
| **Freedom of choice** | Works with Copilot Studio, Claude, custom Python agents—Ari chooses best tool for each use case |

**Key Impact:** Ari automates quarterly compliance audits to run nightly—violations detected in real-time instead of months later.

---

#### **Ren (Data Engineer)**

**Ren's Top Delighters:**
- ✅ "Great support from cloud platform provider/implementer"
- ✅ "Clear documentation from the platform, with code comments giving context from authors"
- ✅ "Automation of testing new code that saves me time"

**How Remote MCP Delivers:**

| Delighter | How We Address It |
|-----------|-------------------|
| **Great support** | Cloud-hosted reliability (no local setup), Microsoft SLA, comprehensive error messages and audit trails |
| **Clear documentation** | Tool schemas self-document—AI agents understand parameters without Ren reading docs |
| **Automation** | Bulk administrative operations (50+ workspace permission transfers) automated—2 hours → 5 minutes |

**Key Impact:** Ren handles employee transitions (permission handovers) conversationally via Claude Desktop instead of manual portal clicking.

---

### 2.4 Success Criteria

**M0 → M1 Gates:**
- ✅ 3+ design partners validate scenarios successfully
- ✅ Security review approved
- ✅ Core technical functionality proven (authentication, tool execution, audit logging)
- ✅ No critical blockers identified

**M1 Success Metrics:**

The following metrics define how we measure the success and adoption of Fabric Remote MCP during Public Preview:

| Metric | M1 Target (3 months) | Measurement Method |
|--------|---------------------|-------------------|
| **Platform Adoption** | 20+ AI platforms integrated | Integration telemetry tracking unique agent platforms connecting to MCP |
| **API Call Volume** | 100K+ calls/month | Gateway metrics aggregating all tool invocations |
| **Time-to-Integrate** | Under 3 days average | Partner feedback surveys measuring time from first connection to production use |
| **Security Incidents** | 0 critical | Security dashboard monitoring authentication failures, unauthorized access attempts, policy violations |
| **Scenario Coverage** | 3+ validated scenarios | Customer validation through design partner feedback and documented use cases |
| **Active Users** | 100+ users/agents | Monthly active connections tracked via authentication telemetry |

**Persona-Specific Success Indicators:**

| Persona | What Success Looks Like | Measurement |
|---------|------------------------|-------------|
| **Binh (BI Engineer)** | "Maintaining source control over BI assets" - 70%+ report workspace provisioning is now version-controlled and repeatable | Adoption surveys: "Automation reliability" rating |
| | "Managing gateways and data quality" - 60%+ reduction in manual setup errors for customer environments | Error rate tracking in automated workflows |
| | "Bridging business and IT" - 80%+ of business stakeholders satisfied with provisioning speed | Stakeholder satisfaction surveys |
| **Ari (Data Architect)** | "Leveraging prebuilt tools" - 85%+ use MCP tools instead of building custom automation | Feature adoption: Tool usage vs. custom scripts |
| | "Planning for compliance constraints" - 90%+ of compliance scans automated vs. manual quarterly audits | Compliance automation coverage |
| | "Constantly learning new tools" - MCP abstracts API changes; 50%+ reduction in script maintenance time | Script update frequency tracking |
| **Ren (Data Engineer)** | "Great support from cloud platform provider" - 4.5+/5.0 rating on support and documentation quality | Support satisfaction surveys |
| | "Monitor and fix pipeline issues" - 75%+ use MCP for bulk admin operations (permission transfers, workspace audits) | Administrative tool usage metrics |
| | "Automation of testing" - 65%+ validate workspace configurations programmatically before production | Pre-production validation usage |

**Overall Developer Satisfaction:** 4.0+/5.0 (NPS surveys distributed to active users quarterly)

**Measurement Approach:**
- **Monthly Reviews:** Track progress against targets, identify trends, prioritize improvements
- **Design Partner Feedback:** Regular engagement with early adopters to validate metrics and gather qualitative insights
- **Automated Dashboards:** Real-time telemetry available to product team and stakeholders

**Future Planning:**
GA success criteria and timelines will be defined based on M1 learnings and customer feedback during Public Preview.

---

## 3. User Stories & Scenarios

This section presents **validated scenarios** tested with design partners, structured as user story flows showing how different personas interact with Fabric Remote MCP using various agent platforms.

---

### 3.1 Scenario: Automated Customer Onboarding (PwC - Global Consulting)

**Persona:** Binh (BI Engineer)  
*"I am jack of all trades, master of one (BI)."*

**Who is Binh?**
Binh is a versatile BI Engineer who bridges the gap between business needs and data/IT requirements. Binh is responsible for creating and maintaining data models, setting up analytics environments for business teams, and interacting closely with end users to translate their requirements into technical solutions. Binh spends significant time in extended requirement-gathering sessions and acts as a liaison between IT and business units.

**Story Flow:**

> **As** Binh (BI Engineer) at a consulting firm,  
> **Using** Copilot Studio connected to Fabric Remote MCP,  
> **I can** provision complete project workspace environments through a conversational interface in Microsoft Teams, reducing onboarding time from days to minutes.

**Pain Point:**
Each new customer engagement requires creating 15-20 standardized workspaces (Sales Analytics, Marketing Dashboard, Finance Reporting, etc.) with specific permission structures. Manual setup through Fabric portal takes 2-3 days with frequent errors requiring rework.

**Binh's authentic pain points:**
- "Maintaining source control over BI assets" (needs automated, consistent workspace setup)
- "Managing gateways and addressing data quality issues" (needs reliable, repeatable processes)
- Working closely with end users whose requirements evolve constantly

**Current State (Manual):**
1. Binh receives engagement intake form → gathers requirements from business stakeholders
2. Binh manually creates each workspace in Fabric portal
3. Binh manually assigns roles (client = Viewer, consultants = Contributor, lead = Admin)
4. Binh manually creates placeholder items (Lakehouses, Warehouses)
5. **Total time: 2-3 days** with email back-and-forth for corrections

**Future State (Automated via Remote MCP):**

Binh sends Teams message to Copilot bot:
```
"Set up analytics environment for Contoso Manufacturing project.
Project lead: sarah@pwc.com
Client stakeholders: john@contoso.com, lisa@contoso.com
Standard analytics package needed."
```

**Behind the scenes:** Copilot Studio agent (via Remote MCP) orchestrates:
- **`create_workspace`** → Parent workspace created
- **`create_item`** (type: Lakehouse) → Raw data storage
- **`create_item`** (type: Warehouse) → Curated data layer
- **`add_workspace_role_assignment`** → Permissions assigned per template

**Result in 30 seconds:**
```
✅ Workspace 'Contoso Manufacturing - Analytics' created successfully.
   - Lakehouse 'Raw Data' provisioned
   - Warehouse 'Curated Data' provisioned
   - sarah@pwc.com added as Admin
   - Client team added as Viewers
   
All operations logged for compliance. Workspace ready.
```

**Impact:**
- ⏱️ **Time savings:** 2-3 days → 5 minutes
- ✅ **Accuracy:** Zero manual errors (standardized templates)
- 📋 **Compliance:** Complete audit trail
- 🔄 **Scalability:** 10x more engagements without adding IT staff

---

### 3.2 Scenario: Continuous Compliance Scanning (Avanade - SI Partner)

**Persona:** Ari (Data Architect)  
*"To design effective infrastructure, I need to be up-to-date on technology, and be an expert in the business."*

**Who is Ari?**
Ari plans and designs data infrastructure and is responsible for ensuring solutions meet compliance requirements and business constraints. They work with clients to understand what is possible, manage evolving requirements, and design systems that adhere to governance standards. Ari evaluates tools and creates frameworks that other developers use to deliver compliant solutions.

**Story Flow:**

> **As** Ari (Data Architect) managing 200+ customer tenants,  
> **Using** a custom Python agent connected to Fabric Remote MCP,  
> **I can** run automated nightly compliance scans checking workspace permissions, identifying violations, and generating reports—moving from quarterly manual audits to continuous monitoring.

**Pain Point:**
Quarterly compliance audits require manually exporting workspace data for each tenant, analyzing in Excel for permission violations (e.g., external users with Admin rights), compiling reports. Time constraints limit coverage to ~20% sampling. Violations discovered months after occurrence.

**Ari's authentic pain points:**
- "Planning infrastructure for clients who have difficult hardware/software constraints or legacy systems" (needs automated compliance checking)
- "Clients' requirements for data collection shift frequently" (needs flexible, scriptable governance)
- "Constantly having to learn about and assess new tools" (needs programmatic access to stay current with compliance standards)

**Current State (Manual):**
- **Frequency:** Quarterly (too time-consuming for more frequent checks)
- **Coverage:** ~20% of workspaces (sampling due to time constraints)
- **Detection lag:** Violations discovered 1-3 months after occurrence
- **Total time per audit cycle:** 2-3 weeks across all tenants

**Future State (Automated via Remote MCP):**

Scheduled Python agent (Azure Function) runs nightly:
- Uses **`list_workspaces`** to discover all workspaces
- Uses **`list_workspace_role_assignments`** to check permissions
- Applies compliance rules (e.g., "External users cannot have Admin role")
- Generates violation reports with recommended remediation

**Agent logic (simplified):**
```python
# Nightly compliance scan
workspaces = await mcp.call_tool("list_workspaces")
violations = []

for workspace in workspaces:
    assignments = await mcp.call_tool(
        "list_workspace_role_assignments", 
        {"workspaceId": workspace["id"]}
    )
    
    for assignment in assignments:
        if is_external_user(assignment) and assignment["role"] == "Admin":
            violations.append({
                "workspace": workspace["displayName"],
                "issue": f"External user has Admin access",
                "severity": "High"
            })

generate_report(violations)  # Email to account teams
```

**Impact:**
- ⏱️ **Frequency:** Quarterly → **Nightly** (continuous monitoring)
- 📊 **Coverage:** 20% sampling → **100% of workspaces**
- 🚨 **Detection speed:** Violations identified within 24 hours
- 📉 **Risk reduction:** Proactive remediation before security incidents

---

### 3.3 Scenario: Bulk Administrative Handover (Internal IT - Admin Transitions)

**Persona:** Ren (Data Engineer)  
*"The pipelines that I build are the foundation of our business intelligence."*

**Who is Ren?**
Ren is the heart of the IT organization: they operate and maintain the data stack, manage infrastructure, and ensure systems run smoothly. Part of Ren's job includes monitoring and fixing issues, managing production deployments, and handling administrative tasks when team members transition.

**Story Flow:**

> **As** Ren (Data Engineer) managing workspace permissions,  
> **Using** Claude Desktop with Fabric Remote MCP,  
> **I can** conversationally transfer ownership across 50+ workspaces when a team member leaves—completing in 5 minutes what used to take 2 hours.

**Pain Point:**
When an employee departs or changes roles, IT must audit and update their workspace permissions across dozens of workspaces. Manual portal workflow is tedious: open each workspace, navigate to access settings, find the user, update role or remove, repeat. For 50 workspaces, this takes 2+ hours and is error-prone.

**Ren's authentic pain points:**
- "Monitor and fix data pipeline issues" (needs fast, reliable admin tools)
- "Dealing with clients changing their requirements mid-project" (needs flexible permission management)
- "Prepare for and deploy into production" (handles operational admin tasks like role transitions)

---

### 3.4 Cross-Platform Compatibility Story

**Persona:** Developer Advocate (technical, uses multiple tools)

**Story Flow:**

> **As a** Developer Advocate building sample automation scenarios,  
> **Using** Fabric Remote MCP as a universal backend,  
> **I can** create one integration that works seamlessly across VS Code Copilot, Copilot Studio, Claude Desktop, and custom agents—avoiding platform-specific implementations.

**The Value:**

**Write Once, Run Anywhere:**
- Same MCP endpoint (`api.fabric.microsoft.com/v1/mcp`)
- Same OAuth2 authentication flow
- Same 23 tools with identical schemas
- **Different platforms, same backend, zero duplication**

**Example Platforms:**

| Platform | Use Case | Setup Time |
|----------|----------|------------|
| **VS Code Copilot** | Developer workflows, code generation | < 5 minutes (Azure Account extension) |
| **Copilot Studio** | Low-code automation, Teams bots | < 10 minutes (connector in gallery) |
| **Claude Desktop** | Interactive data exploration | < 5 minutes (MCP config file) |
| **Custom Python Agent** | Enterprise automation, scheduled jobs | < 15 minutes (OAuth2 client setup) |

---

### 3.5 Scenario: Automated CI/CD Pipeline Orchestration - Multi-Stage Deployments

**Persona:** Ren (Data Engineer) and Binh (BI Engineer)  
*"Our deployment pipeline needs to be reliable and auditable from dev to production."*  
**Current Status:** 🔜 Roadmap (M1-M2 delivery window)

**Who is Ren & Binh?**

Ren and Binh are responsible for maintaining CI/CD pipelines that promote Fabric items (notebooks, pipelines, semantic models) from development through staging to production environments. Their pipeline must ensure correct deployment order, validate dependencies, and maintain full audit trails.

**Story Flow:**

> **As** Ren (Data Engineer) and Binh (BI Engineer) managing multi-stage deployments,  
> **Using** custom CI/CD automation powered by Fabric Remote MCP,  
> **I can** orchestrate automated deployments across environments with dependency-aware ordering, validation, and compliance—ensuring production deployments are safe and auditable.

**Pain Point:**

**Current manual multi-stage deployment workflow:**
1. Deploy items to DEV workspace → manually verify dependencies
2. Promote to STAGING → manually check execution status
3. Run integration tests → manually review results
4. Deploy to PROD → hope dependency order is correct
5. **Total: 2-3 hours per release with high error risk**

**Impact of errors:**
- ❌ Incorrect deployment order breaks production pipelines
- ❌ Missing dependencies discovered only after deployment
- ❌ No automated rollback = manual emergency fixes
- ❌ Compliance audits require manual log aggregation

---

**Future State with Fabric Remote MCP:**

Ren and Binh configure a Python-based CI/CD agent that automates the entire multi-stage pipeline using Fabric Remote MCP tools.

**Step 1: Automated deployment with dependency resolution**

The CI/CD agent executes:
```python
# CI/CD Agent (Python) using Fabric Remote MCP

# Step 1: Analyze workspace for deployment order
agent_prompt = """
Query the Analytics_DEV workspace and identify all items and their dependencies. 
Generate a deployment plan with correct dependency ordering for promotion to STAGING.
"""

# Behind the scenes:
# MCP: list_workspaces → Find Analytics_DEV workspace
# MCP: list_workspace_items → Get all items (lakehouses, warehouses, notebooks, pipelines)
# MCP: get_item_definition (for each item) → Parse dependency references
# Agent: Builds dependency graph and determines safe deployment order

# Returns:
# Deployment Plan:
# 1. Lakehouse_Sales (no dependencies)
# 2. Warehouse_Analytics (depends on Lakehouse_Sales)
# 3. Notebook_ETL (depends on Warehouse_Analytics)
# 4. Pipeline_Daily (depends on Notebook_ETL)
# 5. SemanticModel_Revenue (depends on Warehouse_Analytics)
```

**Step 2: Multi-stage deployment with validation**

```python
# Step 2: Execute deployment to STAGING with validation

deployment_plan = [
    {"item": "Lakehouse_Sales", "type": "Lakehouse"},
    {"item": "Warehouse_Analytics", "type": "Warehouse"},
    {"item": "Notebook_ETL", "type": "Notebook"},
    {"item": "Pipeline_Daily", "type": "DataPipeline"},
    {"item": "SemanticModel_Revenue", "type": "SemanticModel"}
]

for item in deployment_plan:
    # Deploy item from DEV to STAGING
    # MCP: create_item (in STAGING workspace)
    # MCP: update_item_definition (with content from DEV)
    
    # Validate deployment success
    # MCP: get_item (verify item exists in STAGING)
    # MCP: run_item (if item is executable - notebook, pipeline)
    # MCP: get_item_execution_status (wait for completion)
    
    # Log results to audit trail
    # Agent: Records deployment time, status, validation results
```

**Impact:**
- ⏱️ **Time:** Manual 2-3 hours → **15 minutes automated**
- ✅ **Dependency Safety:** Manual guesswork → **Automated graph analysis**
- 📊 **Audit Trail:** Manual log collection → **Automatic compliance logging**

---

**Step 3: Variable Library environment promotion**

The agent handles environment-specific configuration:

```python
# Step 3: Update variable libraries for target environment

agent_prompt = """
Copy the variable library from Analytics_DEV to Analytics_STAGING.
Update environment-specific variables:
- lakehouse_connection: Point to STAGING lakehouse
- api_endpoint: Use STAGING API URL
- notification_email: Use staging-alerts@contoso.com
"""

# Behind the scenes:
# MCP: list_variable_libraries (in DEV workspace)
# MCP: create_variable_library (in STAGING workspace)
# Agent: Transforms environment-specific values
# MCP: set_variable_library_values (with STAGING configurations)

# Result: STAGING workspace has correct configuration for its environment
```

**Impact:**
- 🔄 **Consistency:** Manual variable updates → **Automated environment mapping**
- ❌ **Configuration Errors:** Common mistake → **Eliminated via automation**

---

**Complete Workflow Examples:**

**Example 1: Automated Production Promotion with Approvals**

**Scenario:** Deploy validated changes from STAGING to PRODUCTION with approval gate.

```python
# CI/CD Pipeline (triggered by Git tag: v1.2.3)

# Step 1: Validate STAGING environment
agent_prompt = """
Run all integration tests in Analytics_STAGING workspace.
Report: execution status, data quality checks, performance metrics.
"""

# MCP: list_workspace_items (get all notebooks/pipelines)
# MCP: run_item (execute each test)
# MCP: get_item_execution_status (wait for completion)
# Agent: Aggregates results → ✅ All tests passed

# Step 2: Request approval
# Agent: Posts to Teams channel with test results
# Human approver: Reviews results, approves deployment

# Step 3: Deploy to PRODUCTION with dependency awareness
agent_prompt = """
Deploy all items from Analytics_STAGING to Analytics_PROD in correct dependency order.
Update variable library for production environment.
"""

# MCP: Executes same dependency-aware deployment as STAGING
# MCP: Updates variable library with PROD values
# MCP: Runs smoke tests in PROD

# Step 4: Audit trail
# Agent logs to Azure Log Analytics:
# - Deployment time, approver, items deployed
# - Dependency graph used
# - Test results from each environment
# - Configuration changes applied
```

**Impact:**
- 🔒 **Governance:** Manual approval tracking → **Automated audit trail**
- ⚡ **Speed:** 3-hour deployment window → **30-minute automated process**
- 📉 **Risk:** High (manual errors) → **Low (validated automation)**

---

**Example 2: Rollback Automation**

**Scenario:** Production deployment fails validation; automated rollback required.

```python
# CI/CD Agent detects failure

# Step 1: Monitor production deployment
agent_prompt = """
After deploying to Analytics_PROD, run validation tests.
If any test fails, initiate rollback to previous version.
"""

# MCP: run_item (production validation tests)
# MCP: get_item_execution_status → ❌ Test failed: data quality threshold

# Step 2: Automated rollback
agent_prompt = """
Rollback Analytics_PROD to previous working state.
Restore item definitions from backup (Git tag: v1.2.2).
"""

# Agent: Retrieves item definitions from Git (previous tag)
# MCP: update_item_definition (for each item, restore previous version)
# MCP: run_item (execute validation tests)
# MCP: get_item_execution_status → ✅ Tests pass

# Step 3: Notification and audit
# Agent: Posts to Teams channel with rollback details
# Agent: Logs full rollback audit trail
# Developers: Notified to fix issue before re-deploying
```

**Impact:**
- ⏱️ **Recovery Time:** Manual 1-2 hours → **5-10 minutes automated**
- 📊 **Visibility:** No notification → **Automatic Teams alert**
- 🔍 **Root Cause:** Manual investigation → **Full audit trail preserved**

---

**Example 3: Multi-Workspace Bulk Updates**

**Scenario:** Apply security policy change across 50 production workspaces.

```python
# CI/CD Agent (scheduled job)

agent_prompt = """
List all workspaces with tag 'production'.
For each workspace:
1. Verify current role assignments
2. Remove users with 'Viewer' role who haven't accessed in 90 days
3. Add mandatory security group 'PROD-Auditors' with Viewer access
4. Log all changes for compliance review
"""

# Behind the scenes:
# MCP: list_workspaces (filter by tag: production) → 50 workspaces
# For each workspace:
#   MCP: list_workspace_role_assignments → Current permissions
#   Agent: Analyzes access logs (from Azure Monitor)
#   MCP: remove_workspace_role_assignment (inactive users)
#   MCP: add_workspace_role_assignment (add auditors group)
#   MCP: audit_log (record all changes)

# Result: 50 workspaces updated in 10 minutes
# Audit trail: Complete record of who was added/removed and why
```

**Impact:**
- ⏱️ **Time:** 50 workspaces × 20 min/workspace = **16 hours manual → 10 minutes automated**
- ✅ **Consistency:** Manual errors likely → **100% consistent policy application**
- 📋 **Compliance:** Manual spreadsheet → **Automated audit trail**

---

**Impact Summary:**

| Metric | Before (Manual) | After (Remote MCP) | Improvement |
|--------|-----------------|-------------------|-------------|
| **Deployment time** | 2-3 hours per release | 15-30 minutes | **85% faster** |
| **Deployment errors** | 1-2 per release | 0 (dependency-validated) | **100% elimination** |
| **Rollback time** | 1-2 hours manual | 5-10 minutes automated | **90% faster** |
| **Audit trail completeness** | Partial (manual logs) | 100% automated | **Full compliance** |
| **Multi-workspace updates** | 16+ hours (50 workspaces) | 10 minutes | **99% time reduction** |
| **Configuration errors** | Common (manual variable updates) | Eliminated (automated) | **100% elimination** |

**Ren's and Binh's authentic pain points addressed:**
- "Creating and testing pipelines when we make a change" → Automated deployment with validation
- "Monitor and fix data pipeline issues" → Automated health checks and rollback
- "Automation of testing" (delighter) → Full CI/CD pipeline with automated testing
- "Coverage map to know which systems to investigate" → Dependency graph analysis and audit trails
- "Designing and publishing reports with business context" (Binh) → Automated semantic model deployment to production

---

## 4. Product Requirements

### 4.1 Requirements Overview

**Priority Levels:**
- **P0 (Must Have):** Blocks milestone launch if not delivered
- **P1 (Should Have):** Important for success but can slip to next milestone if necessary
- **P2 (Nice to Have):** Deferred based on capacity and customer feedback

**Note on Tool Catalog:**
The tool catalog is designed for **continuous evolution**. Our goal is to enable all operations performable via Fabric's public APIs. As APIs expand and customer needs evolve, the catalog will grow accordingly.

---

### 4.2 M0: Private Preview (January 2026)

**Goal:** Validate core technical foundation with design partners.

**Target Users:** Design partners (PwC, Avanade, KPMG + 2 enterprises), internal Microsoft teams

#### Core Platform Requirements (M0)

| # | Requirement | Priority | Acceptance Criteria |
|---|-------------|----------|---------------------|
| M0.1 | **Core Tool Catalog Operational** | P0 | Workspace operations, item operations, role operations functional in development environment |
| M0.2 | **VS Code Integration** | P0 | In VS Code, users can authenticate using Azure credentials to connect to MCP |
| M0.3 | **Internal Documentation** | P1 | Architecture documentation, API specifications, deployment procedures available |
| M0.4 | **Design Partner Access** | P0 | 3-5 design partners can connect and execute basic scenarios end-to-end |
| M0.5 | **Feedback Collection Process** | P1 | Structured feedback sessions scheduled with each design partner |

**Success Criteria:**
- ✅ 3+ design partners validate at least 1 scenario end-to-end
- ✅ Core authentication and API forwarding proven technically sound
- ✅ Feedback collected to prioritize M1 improvements

---

### 4.3 M1: Public Preview (March 2026 - FabCon Atlanta)

**Goal:** Launch production-quality public preview with comprehensive tool catalog, enterprise security, and ecosystem integrations.

**Target Users:** Public preview customers, developers, early adopters

#### Core Platform Requirements (M1)

| # | Requirement | Priority | Acceptance Criteria |
|---|-------------|----------|---------------------|
| M1.1 | **Comprehensive Tool Catalog** | P0 | 23 production-ready tools covering workspace, item, role, capacity, identity operations (see Section 5: Tool Catalog) |
| M1.2 | **User Identity Resolution** | P0 | Agents can reference users by email/name in natural language (e.g., "add mahir@contoso.com as admin") with automatic translation to user IDs |
| M1.3 | **Async Operation Support** | P0 | Long-running operations return operation IDs; agents can poll status and retrieve results |
| M1.4 | **Pagination Support** | P0 | List operations return continuation tokens for handling large result sets |
| M1.5 | **Error Handling** | P0 | Consistent error responses with codes, messages, and actionable remediation guidance |
| M1.6 | **Tool Catalog Evolution Process** | P1 | Documented process for adding new tools based on API additions and customer requests |

#### Authentication & Security Requirements (M1)

| # | Requirement | Priority | Acceptance Criteria |
|---|-------------|----------|---------------------|
| M1.7 | **OAuth2 Authorization Code Flow** | P0 | User-delegated authentication functional with standard OAuth2 clients |
| M1.8 | **OAuth2 Client Credentials Flow** | P0 | Service principal authentication enabled for automated agent scenarios |
| M1.9 | **Token Validation** | P0 | All requests validate JWT signature, issuer, audience, expiration |
| M1.10 | **HTTPS-Only Communication** | P0 | TLS 1.2+ enforced, no plaintext connections permitted |
| M1.11 | **Stateless Architecture** | P0 | MCP server maintains no token cache or persistent session state |
| M1.12 | **Security Review Approval** | P0 | Microsoft Security team reviews and approves architecture, implementation, threat model |

#### Governance & Compliance Requirements (M1)

| # | Requirement | Priority | Acceptance Criteria |
|---|-------------|----------|---------------------|
| M1.13 | **Comprehensive Audit Logging** | P0 | Every tool invocation logged with: timestamp, user/SPN, tool, workspace, parameters, result, latency |
| M1.14 | **Tenant-Level Access Control** | P0 | Fabric administrators can enable/disable MCP access for entire tenant via Admin Portal or API |
| M1.15 | **Rate Limiting** | P0 | Enforce 60 calls/min per user, 120 calls/min per service principal; return HTTP 429 with Retry-After header |
| M1.16 | **Audit Log Accessibility** | P1 | Logs queryable via Fabric Admin Portal and exportable to Azure Log Analytics |
| M1.17 | **Usage Telemetry** | P1 | Track tool usage patterns, error rates, latency metrics (P50/P95/P99) |
| M1.18 | **Collaboration Support** | P1 | Audit logs support Ren (Data Engineer)'s "coverage map" workflow—operations traceable for peer handoff and troubleshooting |

#### Integration Requirements (M1)

| # | Requirement | Priority | Acceptance Criteria |
|---|-------------|----------|---------------------|
| M1.18 | **Copilot Studio Connector** | P0 | Official connector available in Copilot Studio connector gallery |
| M1.19 | **VS Code Extension** | P0 | Published VS Code extension enabling one-click connection to Fabric Remote MCP |
| M1.20 | **Third-Party Compatibility** | P0 | Validated compatibility with Claude Desktop, ChatGPT plugins, custom MCP clients |
| M1.21 | **Azure AI Foundry Integration** | P1 | Azure AI SDK documentation includes Fabric MCP connection examples |

#### Documentation & Enablement Requirements (M1)

| # | Requirement | Priority | Acceptance Criteria |
|---|-------------|----------|---------------------|
| M1.22 | **Public Documentation** | P0 | Microsoft Learn articles published: Overview, Quickstart, Tool Reference, Security Model |
| M1.23 | **OpenAPI Specification** | P0 | Complete tool schemas with request/response examples available via public endpoint |
| M1.24 | **VS Code Quickstart** | P0 | Tutorial enabling developers to execute first tool within 5 minutes |
| M1.25 | **Copilot Studio Tutorial** | P0 | Step-by-step guide for building workspace provisioning automation |
| M1.26 | **Sample Scenarios Repository** | P1 | Public GitHub repository with code samples for validated scenarios |
| M1.27 | **Launch Announcement** | P0 | Official blog post on Microsoft Tech Community announcing public preview |

**M1 Success Criteria:**
- 📊 20+ active users/agents within first month
- 📊 Three validated scenarios documented and published
- 📊 Comprehensive documentation on Microsoft Learn
- 🔒 Zero critical security incidents

---

### 4.4 Post-M1: Continuous Improvement (April - August 2026)

**Goal:** Rapidly address customer feedback, add requested capabilities, improve performance and reliability.

**Approach:** Monthly iteration cycles incorporating highest-priority customer feedback and telemetry insights.

**Anticipated Additions:**

| Category | Examples | Rationale |
|----------|----------|-----------|
| **Private Link Support** | Workspace-scoped MCP URLs for network-isolated workspaces | Enterprise security requirement |
| **Additional Tools** | New tools based on usage patterns and customer requests | Customer-driven roadmap |
| **Copilot Studio Enhancements** | Enhanced connector capabilities, additional triggers | Low-code automation scenarios |
| **Performance Optimization** | Latency improvements, caching strategies | Agent responsiveness |
| **Enhanced Error Messages** | Context-aware errors with specific remediation steps | Developer experience |

---

## 5. Tool Catalog & Capabilities

### 5.1 Design Philosophy

Fabric Remote MCP exposes each **Fabric control plane API operation** as a distinct MCP tool with clear names, explicit schemas, and predictable outputs. This ensures agent discoverability, type safety, and self-documentation.

**Focus Areas:**
- **Workspace lifecycle:** Create, read, update, delete workspaces
- **Item management:** Unified CRUD operations for all Fabric item types
- **Permission assignments:** Role management for users, groups, service principals
- **Capacity operations:** Capacity discovery and details
- **Identity resolution:** User/group lookups to support natural language references

**Evolution Strategy:**
The catalog is designed for **continuous expansion** based on customer feedback and new Fabric API releases. All updates maintain backward compatibility—new tools and optional parameters are non-breaking changes.

**Current State (M1):**
23 production-ready tools covering core control plane operations.

**Out of Scope (M1):**
- Data plane operations (query execution, data access)
- Advanced features (Git integration, deployment pipelines, data access roles)
- Workload-specific operations (Power BI refresh, Data Factory triggers)
  - *Note: Workload-specific tools will be addressed via Fabric MCP(s) Platform effort (see separate spec)*

---

### 5.2 Current Tool Catalog (M1 - 23 Tools)

| Category | Tool Name | Description | Example Use Case |
|----------|-----------|-------------|------------------|
| **Workspace Operations** | `create_workspace` | Create a new Fabric workspace | "Create workspace 'Sales Analytics'" |
| | `list_workspaces` | List all accessible workspaces | "Show me all workspaces I can access" |
| | `get_workspace` | Retrieve details of a specific workspace | "Get details for workspace 'Marketing'" |
| | `update_workspace` | Update workspace metadata (name, description) | "Rename workspace to 'Q1 2026 Sales'" |
| | `delete_workspace` | Delete a workspace | "Delete the 'Test Environment' workspace" |
| **Item Operations** | `create_item` | Create any Fabric item (unified operation, all types via `type` parameter) | "Create a Lakehouse called 'Customer Data'" |
| | `list_items` | List items in a workspace (with optional type filtering) | "List all Warehouses in workspace X" |
| | `get_item` | Retrieve details of a specific item | "Get details for Lakehouse 'Sales Data'" |
| | `update_item` | Update item metadata | "Update description of Warehouse Y" |
| | `delete_item` | Delete an item | "Delete Notebook 'Draft Analysis'" |
| | `get_item_definition` | Retrieve the definition/configuration of an item | "Get definition for Pipeline 'ETL Job'" |
| | `update_item_definition` | Update item definition/configuration | "Update Pipeline configuration" |
| **Role Assignment Operations** | `add_workspace_role_assignment` | Grant workspace access to users/groups/service principals | "Add sarah@contoso.com as Admin" |
| | `list_workspace_role_assignments` | List all role assignments for a workspace | "Who has access to workspace X?" |
| | `update_workspace_role_assignment` | Modify an existing role assignment | "Change john@contoso.com to Viewer" |
| | `delete_workspace_role_assignment` | Remove a role assignment | "Remove lisa@contoso.com from workspace" |
| **Capacity Operations** | `list_capacities` | List available Fabric capacities | "Show all capacities in my tenant" |
| | `get_capacity` | Retrieve details of a specific capacity | "Get details for capacity 'Prod-F64'" |
| **Identity Operations** | `list_users` | List users in the tenant (Microsoft Graph API) | "Find user with email mahir@contoso.com" |
| | `list_groups` | List groups in the tenant (Microsoft Graph API) | "List all groups matching 'Sales Team'" |
| | `get_service_principal` | Retrieve service principal information (Microsoft Graph API) | "Get SPN details for automation account" |
| **Async Operation Management** | `get_operation_status` | Poll the status of a long-running operation | "Check status of Warehouse creation" |
| | `get_operation_result` | Retrieve results of a completed operation | "Get results of Pipeline execution" |

---

### 5.3 Key Design Notes

**Unified Item Operations:**

All Fabric items (Lakehouses, Warehouses, Notebooks, Reports, Semantic Models, Pipelines, Dataflows, KQL Databases, ML Models, Eventhouses, Eventstreams, etc.) share common lifecycle operations. 

Instead of specialized tools per item type (e.g., `create_lakehouse`, `create_warehouse`), agents use **`create_item`** with a `type` parameter:

```json
{
  "tool": "create_item",
  "arguments": {
    "workspaceId": "abc-123",
    "displayName": "Customer Analytics",
    "type": "Warehouse"
  }
}
```

**Benefits:**
- ✅ Reduces complexity (fewer tools to learn)
- ✅ Automatically supports new item types (no tool updates needed)
- ✅ Consistent patterns for agents

**User Identity Resolution (Interim Solution):**

Fabric APIs require **user object IDs** (GUIDs) for role assignments, but agents naturally work with **email addresses** or **display names**.

Current solution: Microsoft Graph API tools (`list_users`, `list_groups`) provide identity resolution as interim capability until Fabric APIs natively support email-based lookups.

**Critical for scenarios:**
- Workspace permission management
- Bulk admin handovers
- Automated onboarding

**Long-term strategy:** See Open Questions (Section 8) for discussion on permanent solution.

**Async Operation Management:**

Fabric APIs return **202 Accepted** for long-running operations (e.g., creating a Warehouse). These tools enable agents to poll status and retrieve results without direct knowledge of Fabric's async patterns:

```python
# Agent workflow for async operations:
response = await mcp.call_tool("create_item", {"type": "Warehouse", ...})
operation_id = response["operationId"]

# Poll until complete
while True:
    status = await mcp.call_tool("get_operation_status", {"operationId": operation_id})
    if status["status"] == "Succeeded":
        result = await mcp.call_tool("get_operation_result", {"operationId": operation_id})
        break
    await asyncio.sleep(5)  # Wait 5 seconds before next poll
```

---

### 5.4 Tool Discovery & Metadata

Per the [Model Context Protocol specification](https://spec.modelcontextprotocol.io/specification/server/tools/), the MCP server exposes:

- **`tools/list` endpoint:** Returns all available tools with names, descriptions, and JSON Schema input schemas
- **Category tags:** Workspace, Item, Role Assignment, Capacity, Identity, Async
- **Permission metadata:** Indicates required Fabric roles to execute each tool
- **Usage hints:** Common use cases to assist agent platforms in tool selection

**API Coverage:**
- **100% coverage** of core Fabric workspace and item lifecycle operations
- **Partial coverage** of advanced features (Git integration, deployment pipelines not yet included—planned for future based on customer feedback)

**Complete Schemas:**
Detailed OpenAPI specifications available at: https://learn.microsoft.com/fabric/api

---

## 6. Security & Governance

### 6.1 Authentication Model

**Supported OAuth2 Flows:**

| Flow | Use Case | Token Lifetime | Refresh |
|------|----------|----------------|---------|
| **Authorization Code** | User-delegated (interactive agents) | 1 hour | Refresh token |
| **Client Credentials** | Service principal (automated agents) | 1 hour | Re-authenticate |

**Required Scopes:**
- `Workspace.ReadWrite.All` - Full workspace and item operations
- `Item.ReadWrite.All` - Item-level operations
- Additional scopes as Fabric APIs expand

**VS Code Integration:**
- Leverages Azure Account extension for authentication
- Users authenticate to Azure (standard flow)
- Extension uses existing Azure credentials for MCP access
- **No separate MCP-specific authentication required**

---

### 6.2 Security Model: Double-Check Pattern

**Layer 1 - Remote MCP Server (Gateway):**
- ✅ Validates OAuth token exists and is valid JWT
- ✅ Checks required scopes present in token
- ✅ Verifies tenant has MCP enabled
- ✅ Enforces rate limits
- ❌ **Does NOT implement custom authorization logic**

**Layer 2 - Fabric API (Authoritative):**
- ✅ Validates OAuth token
- ✅ Checks RBAC: Does user have permission for this action?
- ✅ Checks quotas and tenant settings
- ✅ Returns 403 Forbidden if any check fails

**Result:**
MCP **cannot grant permissions users don't have**. Fabric API is the **single source of truth** for authorization decisions.

**Security Features:**
- 🔒 HTTPS-only (TLS 1.2+)
- 🔒 Stateless tokens (JWT validation, no server-side sessions)
- 🔒 No token caching
- 🔒 Comprehensive audit logging
- 🔒 Rate limiting
- 🔒 Microsoft Security team review and approval (M1 requirement)

---

### 6.3 Audit Logging

**Every tool invocation logged with:**
- Timestamp (UTC)
- User identity (UPN, object ID) or service principal ID
- Tool name and parameters
- Workspace and item identifiers
- Operation result (success/failure)
- Latency
- Source agent platform (if available)
- Correlation ID

**Access Methods:**
- **Fabric Admin Portal:** Web UI with filtering, searching, export
- **Azure Log Analytics:** Real-time streaming for SIEM integration
- **Compliance APIs:** Programmatic export for regulatory reporting

**Retention Policy:**
- Standard: 90 days in Fabric Admin Portal
- Extended: Unlimited in customer's Azure Log Analytics workspace
- Compliance export: On-demand full export for regulatory audits

**Privacy & Security:**
- Passwords, tokens, secrets **never logged**
- Parameter sanitization applied to remove PII where possible
- Logs encrypted at rest and in transit
- Access restricted to tenant administrators and compliance officers

---

### 6.4 Tenant Admin Controls

**M1 (Public Preview):**

**Global Enable/Disable:**
- Tenant administrators can enable or disable MCP access for entire tenant
- Available via Fabric Admin Portal or Admin APIs
- **Instant kill switch** if needed

**Post-M1/GA (Advanced Governance):**

**Tool-Level Permissions:**
- Administrator-configurable policy layer restricting which tools specific users/groups can invoke
- Applied **before** API forwarding (governance overlay)
- Fabric API still validates all permissions (double-check pattern intact)

**Read-Only Mode:**
- Tenant setting allowing only read operations (GET/list tools)
- All create/update/delete operations return 403

**Use Cases:**
- **Compliance:** Block destructive operations for certain roles
- **Training:** Read-only mode for new team members
- **Cost Control:** Disable capacity-intensive operations

**Telemetry Dashboard:**
- Tool usage distribution
- Top users/agents by volume
- Error rate trends
- Latency metrics (P50/P95/P99)
- Anomaly detection

---

### 6.5 Rate Limiting

**Enforcement:**
- **60 calls/minute** per user
- **120 calls/minute** per service principal
- HTTP 429 (Too Many Requests) with Retry-After header
- Burst allowance for polling scenarios

**Rationale:**
- Prevents runaway automation
- Ensures fair resource allocation
- Separate limits for interactive vs. automated scenarios

---

## 7. Platform Extensibility

**Note:** Platform extensibility (enabling workload teams to contribute domain-specific tools) is a separate effort with its own dedicated spec.

**See:** `20251115-FABRIC-MCPS-PLATFORM-SPEC.md` for complete details on:
- Extensibility framework and contribution process
- Tool categorization (3-bucket model)
- Quality standards and governance
- Workload team integration patterns
- Timeline and dependencies

**Brief Context:**

The Fabric MCP(s) Platform effort will enable workload teams (Power BI, Data Factory, OneLake, etc.) to extend MCP capabilities with domain-specific tools while leveraging shared infrastructure (OAuth2, audit logging, rate limiting, monitoring).

**Example use cases:**
- Power BI: Semantic model refresh, report generation
- Data Factory: Pipeline execution, monitoring
- OneLake: File operations, data movement

**Timeline:** Parallel track with Remote MCP, coordinated planning and shared infrastructure.

---

## 8. Dependencies, Risks & Open Questions

### 8.1 Critical Dependencies

| Dependency | Owner | Status | Mitigation |
|------------|-------|--------|------------|
| **Security Review** | Microsoft Security | In Progress | Started early, weekly syncs, clear scope |
| **Fabric Public APIs (Control Plane)** | Fabric Core | Stable (GA APIs only) | Using only GA endpoints |
| **VS Code Extension Review** | VS Code Marketplace | Not Started | Submit early, allow buffer time |
| **Copilot Studio Connector** | Integration Team | Planned | Partnership established |
| **Fabric MCP(s) Platform** | Platform Team | Parallel track | Coordinated planning, shared infrastructure design |

---

### 8.2 Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Security review delays M1** | High | Early start, no custom authZ simplifies review, stateless design |
| **Customer adoption slower than expected** | Medium | Design partner program, VS Code integration, comprehensive docs, FabCon demo |
| **Performance doesn't meet expectations** | Medium | Stateless design enables horizontal scaling, load testing in M0 |
| **Tool catalog completeness feedback** | Low | Continuous improvement model, clear scope (control plane only for M1) |
| **Coordination with Platform extensibility effort** | Medium | Weekly syncs, shared infrastructure design, clear boundaries |

---

### 8.3 Open Questions

**Strategic & Product:**

| # | Question | Owner | Notes |
|---|----------|-------|-------|
| 1 | Should tenant admin APIs be included in Remote MCP or implemented as separate admin-scoped MCP server? | PM / Security | Security boundary considerations |
| 2 | Should M1 default to MCP enabled or disabled for tenants? | PM / Leadership | Adoption vs. security tradeoff |
| 3 | Should Remote MCP support preview/beta Fabric APIs or maintain GA-only policy? | PM / Engineering | Stability vs. early access tradeoff |
| 4 | Should we expand beyond control plane APIs in M1, or defer data plane operations to post-M1 iterations? | PM / Engineering | Scope management, M1 timeline constraints |

**Governance & Security:**

| # | Question | Owner | Notes |
|---|----------|-------|-------|
| 5 | What advanced governance capabilities should be included in M1 vs. deferred to post-M1? (Tool-level permissions, read-only mode, admin telemetry dashboard) | PM / Engineering | Define detailed requirements, implementation approach, acceptance criteria |
| 6 | **Audit Logging Requirements:** Current Fabric APIs have partial audit logging (non-read-only operations only). For MCP, should we: (a) Add "initiated by AI agent" to existing Fabric audit logs; (b) Implement comprehensive MCP-specific audit logs for all operations including reads; (c) Define customer-facing vs. internal-only logging | PM / Compliance | Need alignment with audit logging expert and compliance team |
| 7 | **Admin Control Implementation:** How should MCP enforce admin controls when underlying Fabric APIs allow the operation? Need engineering design review. | Engineering / Security | Maintain double-check security pattern |

**Technical & Architecture:**

| # | Question | Owner | Notes |
|---|----------|-------|-------|
| 8 | **User Identity Resolution Strategy:** Fabric APIs require user IDs (GUIDs), but agents use email/display name. **Solutions:** (a) Continue Graph API integration within Remote MCP; (b) Connect agents to both Fabric MCP and Graph MCP; (c) Request Fabric API enhancement to accept emails natively; (d) Hybrid approach. Decision needed considering agent UX, API ownership, security, timeline. | PM / Engineering / Partner Teams | Critical for core scenarios |

**Integration & Ecosystem:**

| # | Question | Owner | Notes |
|---|----------|-------|-------|
| 9 | What is Copilot Studio's pre-authorized App ID for zero-admin-consent integration? | Partner Teams | Simplifies setup |
| 10 | Long-term strategy for identity operations: Graph MCP coordination or permanent inclusion? | PM / Partner Teams | Architectural decision |

**Cross-Effort Coordination:**

| # | Question | Owner | Notes |
|---|----------|-------|-------|
| 11 | How does Remote MCP infrastructure support Platform extensibility requirements? What shared components need to be designed with extensibility in mind? | PM / Engineering | Infrastructure planning, API contracts |
| 12 | What is the target timeline and trigger for transitioning from Remote MCP to Unified MCP Server architecture? | PM / Architecture | Phase 2 planning, dependencies on learnings |

---

## 9. Engineering Handover Notes

### 9.1 Technical Architecture Summary

**High-Level Architecture (Phase 1):**

```
MCP Clients (AI Agents)
  ↓ HTTPS (JSON-RPC 2.0) + OAuth2
Remote MCP Server (api.fabric.microsoft.com/v1/mcp)
  • Authentication & Token Validation
  • Request Routing & Transformation
  • Audit Logging & Telemetry
  • Rate Limiting & Governance
  ↓ Forward with User's OAuth Token
Fabric Public APIs
  • RBAC Enforcement & Validation
```

**Core Design Principles:**
- ✅ Stateless gateway (no session storage, horizontal scaling)
- ✅ Direct API forwarding (minimal transformation, low latency)
- ✅ Double-check security (MCP validates token, Fabric API enforces RBAC)
- ✅ Comprehensive observability (every request logged)

---

### 9.2 Performance & Scalability Targets

**Gateway Latency Targets (GA):**

| Metric | Target |
|--------|--------|
| P50 (median) | < 50ms |
| P95 | < 100ms |
| P99 | < 200ms |

**Throughput Targets (GA):**
- Requests/Second: 5,000+
- Daily API Calls: 100K-1M+
- Concurrent Agents: 10,000+

**Scalability Architecture:**
- Stateless design enables horizontal scaling
- Auto-scaling triggers at 70% CPU/memory utilization
- Multi-region deployment for geographic distribution

---

### 9.3 Key Implementation Details

**Request Flow:**
1. Client → Remote MCP: HTTPS POST with OAuth2 Bearer token + MCP tool request
2. Gateway → Authentication: Validate JWT, check scopes, verify tenant settings, enforce rate limits
3. Gateway → MCP Runtime: Route to handler, transform parameters, log invocation
4. MCP → Fabric API: Forward request with user's OAuth token
5. Fabric API → Validation: Validate token, check RBAC, validate quota
6. Fabric API → Response: Return result or operation ID (async)
7. MCP → Client: Transform to MCP protocol format and return

**For Async Operations:**
- Initial response includes operation ID
- Agent polls `get_operation_status(operationId)` until completion
- Agent retrieves results with `get_operation_result(operationId)`

---

### 9.4 Documentation References

**MCP Protocol:**
- https://modelcontextprotocol.io/docs

**Fabric Public APIs:**
- https://learn.microsoft.com/fabric/api

**Authentication Guide:**
- https://learn.microsoft.com/fabric/security/authentication

---

### 9.5 Design Partner Contacts

- **PwC:** [Contact information]
- **Avanade:** [Contact information]
- **KPMG:** [Contact information]
- **Enterprise Partners (2 under NDA):** [Contact information]

---

### 9.6 Key Stakeholders

- **PM Owner:** Hasan Abo-Shally (hasanabo@microsoft.com)
- **Engineering Lead:** Mahir Diab (madiab@microsoft.com)
- **Security Review:** Microsoft Security Team (via standard process)
- **Skip Manager:** Aviv Ben-Yosef

---

## Appendix A: Glossary

| Term | Definition |
|------|------------|
| **MCP** | Model Context Protocol - Open standard for connecting AI agents to data sources via tools |
| **Remote MCP** | Cloud-hosted MCP execution platform (formerly "Hosted MCP") |
| **Control Plane** | APIs managing infrastructure and configuration (workspaces, permissions, items) vs. data plane (queries, data access) |
| **LRO** | Long-Running Operation - Async operation pattern (create → poll → complete) |
| **RBAC** | Role-Based Access Control - Fabric's permission system |
| **OAuth2** | Industry-standard authentication protocol for delegated access |
| **SPN** | Service Principal Name - Non-user identity for automation |
| **JWT** | JSON Web Token - Secure token format for authentication |
| **P50/P95/P99** | Performance percentiles (50th, 95th, 99th percentile latency) |
| **M0/M1** | Milestone naming (M0 = private preview, M1 = public preview) |

---

## Appendix B: Evidence Sources & References

**Market Research Citations:**

1. **62% Integration Complexity Barrier:**
   - Source: Gartner, "AI Infrastructure Survey 2024"
   - Finding: 62% of enterprises experimenting with agentic AI cite "integration complexity with existing systems" as top barrier to production deployment
   - Relevance: Validates need for standardized protocol like MCP

2. **28-32% Development Time on Authentication:**
   - Source: GitHub, "State of Enterprise Development Survey 2024"
   - Finding: Development teams spend average 28-32% of integration development time on authentication scaffolding and token management
   - Relevance: Demonstrates authentication overhead Remote MCP eliminates via built-in OAuth2

3. **68% Cannot Scale Manual Operations:**
   - Source: McKinsey & Company, "Cloud Operations Report 2024"
   - Finding: 68% of organizations report they "cannot keep pace with volume and complexity of cloud infrastructure requests" using manual processes
   - Relevance: Justifies automation value proposition for workspace provisioning and permission management

**MCP Protocol Documentation:**
- Official Specification: https://modelcontextprotocol.io/docs
- Open source implementations: https://github.com/modelcontextprotocol

**Fabric API Documentation:**
- Public APIs: https://learn.microsoft.com/fabric/api
- Authentication Guide: https://learn.microsoft.com/fabric/security/authentication

---

## Appendix C: Tool Catalog Quick Reference

**23 Tools Organized by Category:**

**Workspace Operations (5):**
- `create_workspace`, `list_workspaces`, `get_workspace`, `update_workspace`, `delete_workspace`

**Item Operations (7):**
- `create_item`, `list_items`, `get_item`, `update_item`, `delete_item`, `get_item_definition`, `update_item_definition`

**Role Assignment Operations (4):**
- `add_workspace_role_assignment`, `list_workspace_role_assignments`, `update_workspace_role_assignment`, `delete_workspace_role_assignment`

**Capacity Operations (2):**
- `list_capacities`, `get_capacity`

**Identity Operations (3):**
- `list_users`, `list_groups`, `get_service_principal`

**Async Operation Management (2):**
- `get_operation_status`, `get_operation_result`

**Complete OpenAPI specifications:** https://learn.microsoft.com/fabric/api

---

## Appendix D: Related Specifications

**Unified Fabric MCP Server:**
- **File:** `20251115-UNIFIED-FABRIC-MCP-VISION.md`
- **Focus:** Future vision for single MCP endpoint with unified discovery across all Fabric capabilities
- **Timeline:** H1 2027 (post-GA of Remote MCP)

**Fabric MCP(s) Platform:**
- **File:** `20251115-FABRIC-MCPS-PLATFORM-SPEC.md`
- **Focus:** Extensibility framework for workload team contributions
- **Timeline:** Parallel track with Remote MCP

**Fabric Local MCP:**
- **File:** `20251115-FABRIC-LOCAL-MCP-SPEC.md`
- **Focus:** VS Code extension for local development workflows
- **Status:** Public Preview (live)

**MCP Server Item Exploration:**
- **File:** `20251115-MCP-SERVER-ITEM-EXPLORATION.md`
- **Focus:** Customer-created MCPs as Fabric Items (exploration phase)
- **Timeline:** Customer research Q1-Q2 2026

---

**END OF SPECIFICATION**
