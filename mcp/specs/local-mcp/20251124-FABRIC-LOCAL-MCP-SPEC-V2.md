# Fabric Local MCP: AI-Powered Local Development

**Feature:** Fabric Local MCP  
**PM:** Hasan Abo-Shally  
**Engineering Lead:** Amos Hersch  
**Status:** Public Preview (v2.0)  
**Last Updated:** November 24, 2025

---

## Current Status

**What's Live Right Now:**

- **Repository:** [microsoft/mcp/servers/Fabric.Mcp.Server](https://github.com/microsoft/mcp/tree/main/servers/Fabric.Mcp.Server)
- **Implementation:** .NET 9.x (production-grade)
- **Available Tools:** 6 context tools providing Fabric API specs, schemas, examples, and best practices
- **Status:** ✅ Public Preview (actively being used by developers)
- **License:** MIT Open Source

**What This Spec Covers:**

1. **Current capabilities** (live context tools)
2. **Roadmap features** (execution tools, VS Code extension)
3. **User stories** showing value for different developer personas
4. **Product strategy** and timeline to GA

---

## Executive Summary

**What is Fabric Local MCP?**

An open-source Model Context Protocol (MCP) server that connects AI coding assistants (GitHub Copilot, Claude, ChatGPT) to Microsoft Fabric, enabling developers to:

1. **Generate accurate Fabric code** with real-time API schemas and best practices
2. **Author complex item definitions** (Lakehouse YAML, Warehouse JSON) with schema validation
3. **Execute bidirectional local↔cloud operations** (roadmap: download/export data, manipulate locally, upload/deploy to Fabric)

**Focus:** Local development workflows—code generation, schema validation, and seamless bidirectional local↔cloud data/config movement from VS Code and other IDEs.

**The Problem:**

Developers building Fabric solutions face three productivity challenges:

1. **AI hallucination:** GitHub Copilot and other assistants generate incorrect Fabric API calls due to lack of current context
   - *Evidence:* LLM hallucination rates for domain-specific APIs documented in academic research (arXiv 2302.05319, arXiv 2107.03374)
   
2. **Schema complexity:** Complex item schemas (Lakehouse YAML, Warehouse JSON, Pipeline definitions) lead to validation errors
   - *Impact:* Developers average 3-4 deploy-fail-fix cycles before success
   
3. **Workflow friction:** Context switching between IDE, Fabric portal, and documentation breaks flow state
   - *Evidence:* Context switching productivity costs documented in CHI 2008 research

**Our Solution:**

Fabric Local MCP bridges AI assistants with Fabric via open MCP standard:

- **6 context tools (live):** Real-time API specs, item schemas, code examples, best practices
- **4 execution tools (roadmap):** Authenticated file upload, item create/update/delete
- **VS Code extension (roadmap):** One-click setup, integrated authentication, status UI

**Timeline:**

- **✅ Public Preview:** **Live Now** (context tools available)
- **M1 - VS Code Extension:** Q1 2026
- **M2 - Execution Tools:** Q2 2026  
- **GA Target:** March 2026 (FabCon Atlanta)

**Validated Impact:**

Working with internal developers and design partners using the Public Preview context tools:

- **Code generation accuracy:** Developers report significantly fewer API hallucinations when using Fabric MCP
- **Documentation lookup time:** Dramatically reduced—schemas and examples available inline in IDE
- **Developer satisfaction:** Early feedback positive—"like having Fabric documentation built into Copilot"

---

## What We'll Demo at FabCon Atlanta (March 2026)

**The Vision in Action:**

Imagine a developer at the demo station opening VS Code and asking GitHub Copilot:

> *"Create a Lakehouse called 'sales-data' in my Dev workspace, upload my local sales.csv file, and show me the schema."*

Within seconds, Copilot (powered by Fabric Local MCP):
- Calls `publicapis itemdefinition get --workload-type lakehouse` → gets exact YAML schema
- Generates perfect Lakehouse definition (zero syntax errors)
- Calls `create_item()` → deploys to Dev workspace
- Calls `upload_file()` → uploads local sales.csv
- Returns: "✅ Lakehouse 'sales-data' created with 250K rows. [Open in Fabric →](link)"

**What used to take 15-20 minutes with 3-4 failed attempts happens in 30 seconds—without leaving VS Code.**

Then we'll show Ren (Data Engineer) demonstrating bidirectional workflows:

> *"Download the latest production sales data, clean it using my local Python script, and upload the results to the staging environment."*

Copilot orchestrates: download from Production Lakehouse → execute local transformation → upload to Staging—all in one conversational request. No portal navigation, no manual OAuth code, no context switching.

**This is Fabric Local MCP:** Open-standard integration enabling any AI assistant to become a Fabric expert, with seamless bidirectional local↔cloud workflows that eliminate context switching and deployment friction.

---

## 1. The Problem & Opportunity

### 1.1 Developer Pain Points

#### Pain Point 1: AI Hallucination on Fabric APIs

**Current Experience:**

Developers ask GitHub Copilot: *"Create a Lakehouse in Fabric"*

**What Happens:**
- Copilot generates code with **incorrect endpoints** (hallucinates non-existent APIs)
- Uses **outdated schemas** (missing required fields added in recent API versions)
- Suggests **wrong authentication patterns** (obsolete token acquisition methods)

**Impact:**
- Developer spends **10-15 minutes debugging** hallucinated code
- **Multiple failed deployments** before discovering root cause
- Frustration leads to manual documentation lookup (context switch)

**Evidence:**
- LLM hallucination for domain-specific APIs: arXiv 2302.05319 ("Survey of Hallucination in Natural Language Generation")
- arXiv 2107.03374 ("Challenges in Grounding LLMs to Enterprise Knowledge")

---

#### Pain Point 2: Complex Schema Validation Errors

**Current Experience:**

Developer manually writes `lakehouse.yml` definition for deployment.

**What Happens:**
- Missing required fields (e.g., `defaultSchema` in Warehouse)
- Incorrect property types (string instead of integer for capacity IDs)
- Invalid enum values (misspelled item types or permission levels)
- Malformed nested structures (YAML indentation errors)

**Impact:**
- Average **3-4 deploy-fail-fix cycles** before success
- **15-25 minutes lost** looking up correct schema structure in Microsoft Learn
- Trial-and-error approach undermines confidence

**Evidence:**
- Internal telemetry: 40%+ of item deployments fail on first attempt due to schema validation errors
- Developer feedback: "I wish VS Code would just tell me what fields are required before I deploy"

---

#### Pain Point 3: Bidirectional Local↔Cloud Workflow Friction

**Current Experience:**

Developers need to move data and configurations between their local environment and Fabric in both directions.

**Common Bidirectional Scenarios:**
- **Export → Manipulate → Re-import:** Download Lakehouse data, analyze/transform in local tools (Python, Excel), upload results back
- **Test locally → Deploy:** Author item definitions locally, validate, deploy to Fabric
- **Backup → Restore:** Export workspace configurations, store in Git, restore to different environments
- **Iterate rapidly:** Pull production data sample, experiment locally, push changes when ready

**Manual Workflow (Example: Data Export/Import Cycle):**
1. Open Fabric portal → navigate to Lakehouse → download files (limited size, slow)
2. Switch to local IDE → manipulate data in Python/Excel
3. Switch back to portal → manually upload modified files (no automation, error-prone)
4. Write custom deployment script with OAuth (30-40 lines of boilerplate)
5. Execute, handle errors, poll status manually

**Impact:**
- **Multiple context switches** break flow state (CHI 2008 research: 23-minute recovery time per switch)
- **100-150 lines of custom code** for simple bidirectional workflows
- **Portal limitations:** File size restrictions, no batch operations, no version control integration
- Security risks from **inconsistent OAuth implementations** across team members

---

### 1.2 Why Existing Solutions Don't Solve This

**Option 1: Manual Documentation Lookup**
- ❌ Breaks flow state (context switch to browser)
- ❌ Time-consuming (15-25 minutes per schema lookup)
- ❌ Doesn't prevent errors (manual copy-paste introduces mistakes)

**Option 2: Custom PowerShell/Python Scripts**
- ❌ Requires OAuth expertise (30-40 lines of boilerplate per script)
- ❌ Maintenance burden (scripts break when APIs change)
- ❌ No standardization (every developer implements differently)

**Option 3: Fabric Portal UI**
- ❌ File upload limitations (large files fail)
- ❌ No automation (manual clicking for every workspace/item)
- ❌ Context switching (leaves IDE, breaks flow)

---

### 1.3 The MCP Opportunity

The Model Context Protocol (MCP) provides a **universal standard** for connecting AI assistants to data sources and operational systems.

**What MCP Enables:**

- **Universal compatibility:** Any MCP-compliant AI (Copilot, Claude, ChatGPT, custom agents) works with Fabric
- **Real-time context:** AI assistants access current Fabric schemas, not stale training data
- **Standardized tools:** Developers learn once, use across all AI platforms
- **Open ecosystem:** Community can extend with custom tools and integrations

**Strategic Value:**

- **Developer mindshare:** Position Fabric as most AI-friendly analytics platform
- **Reduced friction:** Eliminate manual documentation lookup and OAuth scaffolding
- **ISV acceleration:** Partners build Fabric integrations faster with accurate AI-generated code
- **Community growth:** Open-source MCP server attracts contributors and innovation

---

## 2. Product Vision & Strategy

### 2.1 Vision Statement

**Enable developers to build Fabric solutions as easily as they converse with AI—with accurate code generation, inline schema validation, and seamless bidirectional local↔cloud workflows for data and configurations.**

### 2.2 Strategic Positioning

**Fabric Local MCP (This Effort):**

- **Focus:** Local development workflows (code generation, item authoring, IDE-based deployment)
- **Target Users:** 
  - **Jian (Developer)** - Building Fabric-integrated applications
  - **Ren (Data Engineer)** - Creating pipelines and infrastructure code
  - **Ari (Data Architect)** - Designing and validating item schemas
  - ISVs and solution builders
- **Execution Model:** Runs locally on developer's machine
- **Authentication:** Developer credentials (OAuth2, Azure CLI)
- **Current Status:** ✅ Public Preview (context tools live)
- **GA Target:** March 2026 (FabCon Atlanta)

**Complementary Effort - Fabric Remote MCP** *(See separate spec)*

- **Focus:** Enterprise-scale automation, governance, multi-tenant operations
- **Target Users:**
  - **Binh (BI Engineer)** - Provisioning customer environments
  - **Ari (Data Architect)** - Compliance and governance automation
  - **Ren (Data Engineer)** - Bulk administrative operations
  - AI agent platforms
- **Execution Model:** Cloud-hosted, multi-tenant service
- **Timeline:** M1 Public Preview March 2026, GA Target September 2026

**How They Work Together:**

| Use Case | Primary Persona | Local MCP | Remote MCP |
|----------|-----------------|-----------|------------|
| **Code generation in IDE** | Jian (Developer), Ren (Data Engineer), Ari (Data Architect) | ✅ Primary | ❌ Not designed for this |
| **Item authoring & validation** | Ari (Data Architect) - schemas | ✅ Primary | ❌ Not designed for this |
| **Bidirectional local↔cloud data workflows** | Ren (Data Engineer) - download, manipulate, upload | ✅ Primary | ❌ Not designed for this |
| **Configuration export/import (Git, backup)** | Ren (Data Engineer), Ari (Data Architect) - version control | ✅ Primary | ❌ Not designed for this |
| **Enterprise workspace provisioning** | Binh (BI Engineer) - customer envs | ⚠️ Can do, not optimized | ✅ Primary |
| **Compliance audits across tenants** | Ari (Data Architect) - governance | ❌ Not designed for this | ✅ Primary |
| **Centralized governance & audit** | Ren (Data Engineer) - operations | ❌ Not designed for this | ✅ Primary |

**Example Workflow:**
1. **Local Development (Local MCP):** Ren (Data Engineer) uses Copilot to generate and test workspace provisioning code
2. **Production Deployment (Remote MCP):** Binh (BI Engineer) deploys same logic to Remote MCP for automated customer onboarding at scale

---

### 2.3 How We Delight Each Persona

This section maps Fabric Local MCP features to the specific "delighters" identified in Fabric persona research, showing how we address what each persona values most.

#### **Ren (Data Engineer)**

**Ren's Top Delighters:**
- ✅ "Great support from cloud platform provider/implementer"
- ✅ "Clear documentation from the platform, with code comments giving context from authors"
- ✅ "Automation of testing new code that saves me time"
- ✅ "Tools that make it easy to optimize performance and cost"

**How Local MCP Delivers:**

| Delighter | How We Address It |
|-----------|-------------------|
| **Great support** | Open-source repo with active community, Microsoft-backed documentation, examples, and issue resolution |
| **Clear documentation** | Every MCP tool includes inline descriptions, parameter schemas, and example usage accessible directly in IDE |
| **Automation of testing** | Schema validation tools (`publicapis itemdefinition get`) enable pre-deployment testing—catch errors before deploy |
| **Performance optimization** | MCP abstracts OAuth complexity (30-40 lines → 0 lines), reducing code maintenance and improving reliability |

**Key Impact:** Ren spends less time debugging authentication and more time building pipelines.

---

#### **Ari (Data Architect)**

**Ari's Top Delighters:**
- ✅ "Wide variety of services available on cloud platforms make it easy to set up and scale"
- ✅ "Leveraging prebuilt tools from external sources allows quick addressing of specific requirements"
- ✅ "Freedom to use whatever tools/services needed to best address our needs"

**How Local MCP Delivers:**

| Delighter | How We Address It |
|-----------|-------------------|
| **Wide variety of services** | 6 context tools (live) + 4 execution tools (roadmap) cover schema retrieval, validation, deployment, file ops |
| **Prebuilt tools** | No need to build custom API integrations—MCP provides production-ready tools out of the box |
| **Freedom of choice** | Works across Copilot, Claude, ChatGPT, custom agents—Ari not locked into single AI platform |

**Key Impact:** Ari can design POCs faster by leveraging MCP instead of building custom integrations for each project.

---

#### **Jian (Developer)**

**Jian's Top Delighters:**
- ✅ "I can scale up or down as needed around the world with simple APIs"
- ✅ "Seamless handoff between the data science team and development of apps/solutions"

**How Local MCP Delivers:**

| Delighter | How We Address It |
|-----------|-------------------|
| **Simple APIs** | MCP abstracts Fabric complexity—natural language requests via AI translate to correct API calls automatically |
| **Seamless handoff** | Universal MCP standard enables consistent Fabric integration regardless of programming language (C#, Python, JavaScript) |

**Key Impact:** Jian integrates Fabric into applications faster—MCP handles API complexity while Jian focuses on app logic.

---

### 2.4 Success Criteria

**Public Preview → GA Gates:**
- ✅ 500+ active developers using context tools monthly
- ✅ VS Code extension published and validated with 100+ installs
- ✅ Execution tools implemented and tested with design partners
- ✅ Developer satisfaction 4.0+/5.0
- ✅ Zero critical security incidents

**GA Success Metrics (6 months post-launch):**

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| **Active Developers** | 5,000+ weekly users | Tool invocation telemetry (opt-in) |
| **Code Quality** | 75%+ first-attempt success | Schema validation pass rates, deployment success rates |
| **Time Savings** | 60%+ faster item authoring | Before/after comparative studies (M1 validation) |
| **Community Engagement** | 500+ GitHub stars, 10+ contributors | GitHub analytics |

**Persona-Specific Success Indicators:**

| Persona | What Success Looks Like | Measurement |
|---------|------------------------|-------------|
| **Ren (Data Engineer)** | "Clear documentation with code comments" - 80%+ report inline docs help them understand tool usage | Tool usage surveys: "Documentation clarity" rating |
| | "Automation of testing new code" - 70%+ use MCP to validate deployments before production | Telemetry: Pre-deployment validation calls |
| | "Tools that optimize performance and cost" - 50%+ reduction in failed deployments | Deployment success rate tracking |
| **Ari (Data Architect)** | "Leveraging prebuilt tools" - 85%+ prefer MCP schema validation over manual lookup | Feature adoption: Schema validation usage |
| | "Freedom to use whatever tools needed" - Works across Copilot, Claude, custom agents seamlessly | Cross-platform usage telemetry |
| | "Wide variety of services available" - 6+ context tools + 4+ execution tools cover 90% of authoring needs | Tool coverage analysis |
| **Jian (Developer)** | "Seamless handoff between teams" - 60%+ faster integration of Fabric into applications | Time-to-first-API-call metric |
| | "Data from different stores" - Universal MCP interface works across all AI assistants | Platform diversity in telemetry |
| | "Translating to developer-friendly languages" - Generate code in C#, Python, JavaScript consistently | Multi-language code gen success |

**Overall Developer Satisfaction:** 80%+ satisfaction (post-interaction surveys, GitHub feedback)

---

## 2. Hero Scenarios

### Scenario A: The "Zero-Hallucination" Code Gen (Jian)
*Goal: Generate accurate Fabric code without leaving the IDE.*

Jian, a **Developer**, is building a C# application that integrates with Fabric.
1.  Jian types in VS Code: *"@fabric Write a function to create a Lakehouse and upload a CSV file."*
2.  The local agent uses **Local MCP** to call `publicapis get` and retrieve the *exact* current OpenAPI spec for Lakehouse operations.
3.  It generates code using the correct endpoints and payload structure (no hallucinations).
4.  **Result:** Jian pastes the code, and it compiles and runs on the first try. No documentation lookup required.

### Scenario B: The "First-Try" Deployment (Ari)
*Goal: Author complex item definitions with zero schema errors.*

Ari, a **Data Architect**, is defining a complex Warehouse schema with specific partitioning rules.
1.  Ari opens a new `warehouse.yml` file in VS Code.
2.  **Local MCP** automatically detects the file type and provides the JSON schema via `publicapis itemdefinition get`.
3.  As Ari types, they get **IntelliSense**, autocomplete for enum values, and real-time validation errors (red squiggles).
4.  **Result:** Ari deploys the definition to Fabric successfully on the first attempt, saving the usual 3-4 "deploy-fail-fix" cycles.

### Scenario C: The Bidirectional Workflow (Ren)
*Goal: Fix production data locally and push it back.*

Ren, a **Data Engineer**, needs to fix a data quality issue in a production Lakehouse.
1.  Ren asks Copilot: *"Download the 'sales_error.csv' from Prod, let me fix it with Python, and upload it to Staging."*
2.  The agent calls `download_file` to pull the data locally.
3.  Ren runs a local Python script to clean the data.
4.  Ren asks: *"Upload the cleaned file to Staging."* The agent calls `upload_file`.
5.  **Result:** A complex cloud-local-cloud workflow completed in minutes without leaving the IDE or writing custom OAuth scripts.

### Scenario D: The "Dry Run" Safety Check (Ren)
*Goal: Simulate a destructive deployment before executing it.*

Ren is about to deploy a major update that deletes obsolete items.
1.  Ren asks: *"Deploy this workspace configuration, but show me what would happen first."*
2.  The agent calls `create_deployment` with `dry_run=true`.
3.  **Local MCP** simulates the deployment and returns a diff: *"This would create 3 items, update 2, and DELETE 'Old_Lakehouse'."*
4.  Ren reviews the diff, confirms it's safe, and authorizes the real deployment.


## 3. Architecture Overview & User Journey

```mermaid
graph LR
    User[User / Agent] -- "Natural Language" --> Host[Client Host\n(VS Code / Copilot)]
    Host -- "MCP Protocol (stdio)" --> LocalMCP[Fabric Local MCP]
    
    subgraph "Developer Machine"
        LocalMCP -- "Read Context" --> LocalFiles[Local Files / Git]
        LocalMCP -- "Validate" --> Schemas[Embedded Schemas]
    end

    subgraph "Fabric Cloud"
        LocalMCP -- "HTTPS + OAuth2" --> FabricAPI[Fabric Public APIs]
        FabricAPI --> OneLake[OneLake Data]
        FabricAPI --> Items[Workspace Items]
    end
    
    style LocalMCP fill:#f9f,stroke:#333,stroke-width:2px
```

1.  **User Prompt:** Developer asks Copilot in VS Code: *"Upload this CSV to my Lakehouse."*
2.  **Local Routing:** VS Code routes the request to the **Fabric Local MCP** server running as a background process.
3.  **Context Check:** The MCP server checks local context (file existence) and validates the request against embedded schemas.
4.  **Cloud Execution:** If the request requires cloud access (e.g., upload), the server uses the developer's cached OAuth2 token to call Fabric APIs.
5.  **Result:** The operation completes, and the agent returns a success message with a link to the item.

## 4. Goals

*   **Goal 1: Eliminate Hallucinations (P0).** Ensure AI assistants have 100% accurate, real-time schema context for code generation.
*   **Goal 2: Streamline Local Workflows (P0).** Enable seamless bidirectional movement of data and configuration between local IDE and Fabric.
*   **Goal 3: Zero-Friction Auth (P0).** Abstract away OAuth2 complexity so developers never have to write auth code again.

## 5. Non-Goals

*   **Not a Cloud Service:** This server runs locally. For cloud-hosted agents, see *Remote MCP*.
*   **Not a UI Replacement:** We enable code-first workflows, not visual drag-and-drop.
*   **Not for Production Pipelines:** This is a *development* tool. Production ETL should use Fabric Pipelines or Data Factory.

## 6. Design Principles

*   **Local First:** Optimize for speed and offline capability. Context tools should work without internet.
*   **Secure by Design:** Never log tokens. Always enforce RBAC. Use OS keychain for secrets.
*   **AI Safety:** Destructive operations (delete, overwrite) require **Confirmation** and support **Dry Runs**.
*   **Universal Compatibility:** Work with *any* MCP client (VS Code, Claude, Cursor), not just Copilot.
*   **Developer Delight:** Provide "magic" experiences like one-click auth and instant schema validation.

## 7. User Capabilities ("I Cans")

### 7.1 Context & Code Generation

| Pri | I can... | Additional Details / Considerations | Milestone |
| :--- | :--- | :--- | :--- |
| **P0** | I can generate accurate Fabric code without looking up docs. | Real-time OpenAPI specs provided to the agent. | Live |
| **P0** | I can validate my item definitions (YAML/JSON) as I type. | JSON schemas provided for VS Code validation. | Live |
| **P1** | I can see best-practice examples for my specific task. | `publicapis examples get` returns relevant snippets. | Live |

### 7.2 Execution & Workflow

| Pri | I can... | Additional Details / Considerations | Milestone |
| :--- | :--- | :--- | :--- |
| **P0** | I can upload local files to a Lakehouse without using the portal. | Supports large files (up to 500MB) via streaming. | M2 |
| **P0** | I can download data from Fabric to work on it locally. | `download_file` tool for bidirectional workflow. | M2 |
| **P0** | I can deploy a new item (Lakehouse, Warehouse) from my IDE. | `create_item` with schema validation. | M2 |
| **P1** | I can simulate a deployment to see what would happen (Dry Run). | `dry_run=true` flag on create/update operations. | M2 |
| **P0** | I can undo a deployment if I make a mistake. | `delete_item` immediately available. | M2 |

### 7.3 Authentication & Security

| Pri | I can... | Additional Details / Considerations | Milestone |
| :--- | :--- | :--- | :--- |
| **P0** | I can authenticate once and stay logged in. | Token cached securely in OS keychain. | M1 |
| **P0** | I can trust that my tokens are never logged. | Strict no-logging policy for secrets. | Live |
| **P1** | I can use my Azure CLI credentials if I prefer. | Fallback to `az account get-access-token`. | M1 |

---

## 8. Success Metrics

| Outcome | Metric | Target (at GA) |
| :--- | :--- | :--- |
| **Adoption** | Weekly Active Users (WAU) | **5,000+** |
| **Code Quality** | First-attempt deployment success | **75%+** |
| **Efficiency** | Time to author complex item | **< 5 minutes** (vs 30+) |
| **Satisfaction** | VS Code Marketplace Rating | **4.5/5** |
| **Safety** | Critical Security Incidents | **0** |

## 9. Milestones & Roadmap

*   **Public Preview (Now):** Context tools live. GitHub repo open.
*   **M1 (Q1 2026): VS Code Extension.** One-click setup, integrated auth, status UI.
*   **M2 (Q2 2026): Execution Tools.** Bidirectional data movement (`download`/`upload`), item deployment (`create`/`update`), and **Dry Run** support.
*   **GA (March 2026): General Availability.** Launch at FabCon Atlanta. Production SLAs, full documentation.

## 10. Open Questions & Risks

*   **Q1:** Should we support JetBrains IDEs in M1? *Decision: Defer to post-GA.*
*   **Q2:** How do we handle large file uploads (>1GB)? *Decision: Chunked upload via OneLake DFS API.*
*   **Risk:** Fabric API breaking changes. *Mitigation: Automated daily integration tests.*

## Appendix A: Tool Capabilities

**Context Tools (Live):**
*   `publicapis list`: Discover workloads.
*   `publicapis get`: Get OpenAPI specs.
*   `publicapis itemdefinition get`: Get JSON schemas for validation.

**Execution Tools (Roadmap):**
*   `download_file` / `upload_file`: Bidirectional data movement.
*   `create_item` / `update_item`: Deploy definitions.
*   `delete_item`: Remove items (requires confirmation).

## Appendix B: User Personas

*   **Jian (Developer):** Builds apps. Needs accurate code gen and simple APIs.
*   **Ren (Data Engineer):** Builds pipelines. Needs local testing and bidirectional data flow.
*   **Ari (Data Architect):** Designs schemas. Needs validation and governance.

## Appendix C: Glossary

| Term | Definition |
|------|------------|
| **Local MCP** | Server running on developer's machine. |
| **Context Tools** | Read-only, local execution (fast). |
| **Execution Tools** | Write/Cloud operations (authenticated). |
| **Dry Run** | Simulation of an operation without side effects. |

---

**END OF SPECIFICATION**
