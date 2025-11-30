# Fabric Local MCP: AI-Powered Local Development

**Feature:** Fabric Local MCP  
**PM:** Hasan Abo-Shally  
**Engineering Lead:** Amos Hersch  
**Status:** Public Preview (v3.0)  
**Last Updated:** November 24, 2025

---

## Executive Summary

Fabric Local MCP is an open-source Model Context Protocol (MCP) server that runs locally on a developer's machine, bridging the gap between AI coding assistants (GitHub Copilot, Claude, VS Code) and Microsoft Fabric. It solves the "hallucination" and "context switching" problems by providing real-time API schemas, validation, and execution tools directly to the AI agent. This enables developers to generate accurate code, author complex item definitions with confidence, and execute seamless bidirectional workflows without leaving their IDE.

---

## 1. Problem Statement

Developers building on Fabric today face a fragmented and friction-filled experience. While Fabric offers powerful APIs, integrating them into a development workflow is manual and error-prone.

**The Core Friction:**
*   **AI Hallucination:** LLMs lack knowledge of the latest Fabric APIs. They frequently generate code with incorrect endpoints or outdated schemas, forcing developers to spend **15-20 minutes** debugging non-existent APIs. [1]
*   **Context Switching:** To find the correct schema for a `Lakehouse` or `Warehouse`, a developer must leave their IDE, search Microsoft Learn, and manually copy-paste JSON/YAML examples. Research shows this context switching costs **~23 minutes** of focus time per interruption. [2]
*   **Authentication Complexity:** Writing a simple script to upload a file requires 30-40 lines of boilerplate OAuth2 code. This high barrier prevents ad-hoc automation. [3]

**Why Existing Solutions Fail:**
*   **Manual Documentation:** Static, often outdated, and requires leaving the flow state.
*   **Portal UI:** Great for low-code, but lacks version control, bulk operations, and CI/CD integration.
*   **Custom Scripts:** Fragile, hard to maintain, and require deep auth expertise.

**The Opportunity:**
By providing a **Local MCP Server**, we give AI agents a "brain upgrade"—direct access to the latest Fabric schemas and a secure way to execute local commands. This transforms the IDE into a true Fabric control center.

---
*[1] Internal telemetry: Average time spent debugging API hallucinations in Copilot Chat sessions, Q3 2025.*  
*[2] Gloria Mark, "The Cost of Interrupted Work: More Speed and Stress," UC Irvine, 2008.*  
*[3] Stack Overflow Developer Survey, 2024: "Top Time Sinks in Cloud Development."*

---

## 2. Guiding Principles

*   **Trust the agent's reasoning, but verify destructive actions.** Assume AI can plan and decide effectively—don't prematurely lock features behind brittle UX patterns. Destructive operations (delete, overwrite) require explicit confirmation, but the default stance is enablement, not restriction.

*   **Agents inherit user permissions, never exceed them.** Every MCP tool call executes within the user's RBAC boundaries. If the user cannot delete a Lakehouse in the portal, the agent cannot delete it via MCP. This eliminates a entire class of security vulnerabilities.

*   **Offline-first for context, cloud-when-needed for execution.** Context tools (schemas, docs, examples) must work without internet to enable fast iteration. Execution tools authenticate lazily—only when cloud operations are required.

*   **Optimize for LLM context windows—pagination is not optional.** Return concise, structured responses. Large datasets must support filtering and pagination by default to prevent context overflow. Never return raw API payloads when a summary suffices.

*   **CLI over SDK for agent code generation.** Generate Fabric CLI scripts instead of Python/C# SDK code. CLI commands are human-readable, easier for agents to debug, and promote CLI adoption. This follows the Azure MCP precedent.

*   **Errors must teach, not just fail.** Error messages include: (1) what went wrong, (2) why it happened, (3) how to fix it, and (4) a link to docs. Transient failures (rate limits, timeouts) retry automatically with exponential backoff—agents should rarely see them. [4]

*   **Move fast and iterate.** Speed and adaptability are critical. We will learn from real usage, evolving tools based on telemetry and creator feedback. Features ship as "opinionated defaults" that can be refined, not as rigid contracts.

---
*[4] Nielsen Norman Group, "Error Message Guidelines," 2023: Error messages with actionable guidance reduce support tickets by 40%.*

---

## 3. Hero Scenarios

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

---

## 4. Architecture Overview & User Journey

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

---

## 5. Goals

*   **Goal 1: Eliminate Hallucinations (P0).** Ensure AI assistants have 100% accurate, real-time schema context for code generation.
    *   *Measured by: Code Gen Accuracy (User Feedback)*
*   **Goal 2: Streamline Local Workflows (P0).** Enable seamless bidirectional movement of data and configuration between local IDE and Fabric.
    *   *Measured by: Time to complete "Download-Fix-Upload" loop*
*   **Goal 3: Zero-Friction Auth (P0).** Abstract away OAuth2 complexity so developers never have to write auth code again.
    *   *Measured by: Time to first successful API call*

---

## 6. Non-Goals

*   **Not a Cloud Service:** This server runs locally. For cloud-hosted agents, see *Remote MCP*.
*   **Not a UI Replacement:** We enable code-first workflows, not visual drag-and-drop.
*   **Not for Production Pipelines:** This is a *development* tool. Production ETL should use Fabric Pipelines or Data Factory.

---

## 7. Milestones & Roadmap

*   **Public Preview (Now):** Context tools live. GitHub repo open.
*   **M1 (Q1 2026): VS Code Extension.** One-click setup, integrated auth, status UI.
*   **M2 (Q2 2026): Execution Tools.** Bidirectional data movement (`download`/`upload`), item deployment (`create`/`update`), CLI script generation, deployment planning, and **Dry Run** support.
*   **GA (March 2026): General Availability.** Launch at FabCon Atlanta. Production SLAs, full documentation.

### Post-GA Backlog

Features prioritized for post-GA based on user feedback and strategic alignment:

*   **CLI IntelliSense in VS Code:** Autocomplete and inline documentation for Fabric CLI commands within the editor.
*   **User Agent Propagation:** Track telemetry on MCP tool usage origin (VS Code, Claude, Cursor) to inform prioritization.
*   **Advanced Deployment Planning:** Multi-workspace dependency analysis and "what-if" scenario modeling.
*   **Blueprint Template Library Expansion:** Community-contributed workspace templates with versioning and governance.
*   **CLI-in-Notebooks Integration:** Python wrapper (`!fabric` magic command) to call CLI from Jupyter notebooks, enabling AI agents to automate notebook workflows.

---

## 8. User Capabilities ("I Cans")

This section defines core capabilities from the user's perspective, organized by interaction pattern: **Interactive Use** (human-in-the-loop), **Autonomous Operations** (scheduled/triggered agents), and **Setup & Configuration** (one-time tasks).

### 8.1 Interactive Use (Human-in-the-Loop)

| Pri | I can... | Additional Details / Considerations | Milestone |
| :--- | :--- | :--- | :--- |
| **P0** | I can generate accurate Fabric code without looking up docs. | Real-time OpenAPI specs provided to the agent. No hallucinations. | Live |
| **P0** | I can validate my item definitions (YAML/JSON) as I type. | JSON schemas provided for VS Code validation with red squiggles. | Live |
| **P1** | I can generate Fabric CLI scripts from natural language. | `generate_cli_script` tool produces human-readable CLI commands. Follows Azure MCP precedent. CLI scripts are easier for agents to learn/debug than Python. | M2 |
| **P1** | I can see best-practice examples for my specific task. | `publicapis examples get` returns relevant snippets. | Live |
| **P1** | I can search Fabric documentation semantically. | `search_documentation` tool for finding concepts. | Live |
| **P0** | I can upload local files to a Lakehouse without using the portal. | Supports large files (up to 500MB) via streaming. | M2 |
| **P0** | I can download data from Fabric to work on it locally. | `download_file` tool for bidirectional workflow. | M2 |
| **P0** | I can deploy a new item (Lakehouse, Warehouse) from my IDE. | `create_item` with schema validation. | M2 |
| **P1** | I can simulate a deployment to see what would happen (Dry Run). | `dry_run=true` flag on create/update operations. Shows diff before execution. | M2 |
| **P0** | I can undo a deployment if I make a mistake. | `delete_item` immediately available after creation. | M2 |

### 8.2 Autonomous Operations (Scheduled/Triggered Agents)

| Pri | I can... | Additional Details / Considerations | Milestone |
| :--- | :--- | :--- | :--- |
| **P1** | I can plan multi-item deployments with dependency analysis. | `plan_deployment` analyzes item relationships and suggests optimal deployment order. Useful for CI/CD pipelines. | M2 |
| **P1** | I can search for items by display name, not just ID. | `search_items_by_name` enables fuzzy search for user-friendly queries. Requires Catalog team API. | M2 |
| **P0** | I can trust the agent to retry transient failures without manual intervention. | Automatic exponential backoff for rate limits and timeouts. Logged but not surfaced unless max retries exceeded. | M1 |

### 8.3 Setup & Configuration (One-Time Tasks)

| Pri | I can... | Additional Details / Considerations | Milestone |
| :--- | :--- | :--- | :--- |
| **P0** | I can authenticate once and stay logged in. | Token cached securely in OS keychain. Refresh handled automatically. | M1 |
| **P0** | I can trust that my tokens are never logged. | Strict no-logging policy for secrets. Enforced in code reviews and audits. | Live |
| **P1** | I can use my Azure CLI credentials if I prefer. | Fallback to `az account get-access-token` for users already authenticated via Azure CLI. | M1 |
| **P0** | I can install and configure the MCP server in under 2 minutes. | One-command install via npm/pip. VS Code extension handles configuration automatically. | M1 |

### 8.4 MCP Resources & Knowledge Base

In addition to **Tools** (executable functions), Local MCP exposes **Resources**—static content that agents can reference for context without executing commands.

| Pri | Resource | Description | Milestone |
| :--- | :--- | :--- | :--- |
| **P0** | Fabric Glossary | Definitions of key Fabric concepts (Lakehouse, Warehouse, etc.). Currently exposed via `get_fabric_glossary` tool. | Live |
| **P1** | Blueprint Templates | Common workspace provisioning patterns (e.g., "Data Science Workspace", "BI Analytics Environment"). Supports Unified Copilot requirements. | M2 |
| **P1** | Example Scripts Library | Curated CLI and Python scripts for common tasks (e.g., "Upload CSV to Lakehouse", "Create Report from Dataset"). | M2 |

**Note:** MCP Resources differ from Tools—they provide **static knowledge** rather than dynamic execution. This enables agents to learn patterns and standards without triggering API calls.

### 8.5 Error Handling & Resilience

| Pri | Requirement | Details | Milestone |
| :--- | :--- | :--- | :--- |
| **P0** | All tools return structured error messages with actionable guidance. | Error responses include: (1) error code, (2) human-readable message, (3) suggested remediation, and (4) link to relevant documentation. | M1 |
| **P0** | Transient failures (rate limits, timeouts) are retried automatically with exponential backoff. | Agent doesn't surface retry logic to user unless max attempts (3x) exceeded. Retries logged for debugging. | M1 |
| **P0** | Permission errors clearly distinguish between "user lacks permission" vs. "agent misconfigured." | Example: "You do not have Contributor access to this workspace. Request access from the owner." vs. "MCP server authentication failed. Run `fabric mcp login` to re-authenticate." | M1 |
| **P1** | API schema validation errors include the specific field and expected format. | Example: "Field 'partitionStrategy' must be one of: ['Hash', 'Range', 'None']. You provided: 'Random'." | Live |
| **P0** | Long-running operations (>10s) provide progress updates. | Polling status returned to agent every 2 seconds to prevent timeout perception. | M2 |

---

## 9. Success Metrics

| Outcome | Metric | Target (at GA) | Source |
| :--- | :--- | :--- | :--- |
| **Adoption** | Weekly Active Users (WAU) | **5,000+** | Based on Azure MCP adoption curve (6 months) |
| **Code Quality** | First-attempt deployment success | **75%+** | Internal pilot results with 50 developers, Q4 2025 |
| **Efficiency** | Time to author complex item | **< 5 minutes** (vs 30+) | Baseline: Customer time-motion studies, Nov 2025 |
| **Satisfaction** | VS Code Marketplace Rating | **4.5/5** | Comparable to top 10% of VS Code extensions |
| **Safety** | Critical Security Incidents | **0** | Non-negotiable security requirement |

---

## 10. Open Questions & Risks

*   **Q1:** Should we support JetBrains IDEs in M1? *Decision: Defer to post-GA.*
*   **Q2:** How do we handle large file uploads (>1GB)? *Decision: Chunked upload via OneLake DFS API.*
*   **Q3:** Should we utilize **MCP Resources** (in addition to Tools) from the MCP protocol? What use cases benefit from Resources vs. Tools-only? *Status: Open. Resources added in Section 7.4 pending validation.*
*   **Q4:** What is the semantic distinction between "Blueprint" and "Template" in Fabric? Should we align terminology with Unified Copilot team? *Status: Open. Requires PM alignment.*
*   **Q5:** How do we coordinate with the **OneLake MCP** team to avoid overlapping tools (e.g., file operations)? Should Local MCP focus on item-level operations only? *Status: Open. Cross-team meeting needed.*
*   **Q6:** Should `generate_cli_script` be a **Context Tool** (local, no CLI install required) or **Execution Tool** (requires Fabric CLI)? *Status: Open. Engineering to investigate hybrid approach.*
*   **Risk:** Fabric API breaking changes. *Mitigation: Automated daily integration tests.*
*   **Risk:** CLI adoption via MCP may bypass telemetry. *Mitigation: User agent propagation (Post-GA backlog).*

---

## Appendix A: Tool Capabilities

### Context Tools (Live)
These tools run locally and provide information to the agent.

*   `publicapis list`: Discover available Fabric workloads and items.
*   `publicapis get`: Get the full OpenAPI specification for a specific workload.
*   `publicapis itemdefinition get`: Get the JSON/YAML schema for an item definition.
*   `publicapis examples get`: Retrieve code samples for common tasks.
*   `search_documentation`: Perform a semantic search over embedded Fabric docs.
*   `get_fabric_glossary`: Retrieve definitions of key Fabric concepts.

### Context Tools (Roadmap - M2)
*   `generate_cli_script`: Generate human-readable Fabric CLI commands from natural language intent. Follows Azure MCP precedent for CLI-first code generation.
*   `search_items_by_name`: Find items by display name using fuzzy search (not just exact ID match). Requires Catalog team search API.

### Execution Tools (Roadmap - M2)
These tools perform actions against the Fabric service.

*   `download_file`: Download a file from OneLake to the local filesystem.
*   `upload_file`: Upload a local file to OneLake.
*   `create_item`: Create a new Fabric item from a local definition.
*   `update_item`: Update an existing item's definition.
*   `delete_item`: Delete a Fabric item (requires confirmation).
*   `create_deployment`: Orchestrate a multi-item deployment (supports `dry_run`).
*   `plan_deployment`: Analyze item dependencies and suggest optimal deployment order. Helps agents understand relationships between Lakehouses, Warehouses, Semantic Models, etc.

---

## Appendix B: User Personas

*   **Jian (Developer) - The App Builder:**
    *   *Role:* Builds custom applications integrating with Fabric.
    *   *Pain:* "I spend half my time looking up API docs and debugging 400 Bad Request errors."
    *   *Delighter:* **Zero-Hallucination Code Gen.** Wants code that just works.

*   **Ren (Data Engineer) - The Automator:**
    *   *Role:* Builds and maintains data pipelines.
    *   *Pain:* "Moving data between my laptop and the cloud for testing is a manual nightmare."
    *   *Delighter:* **Bidirectional Workflow.** Wants to `upload` and `download` as easily as `cp`.

*   **Ari (Data Architect) - The Guardian:**
    *   *Role:* Designs schemas and ensures governance.
    *   *Pain:* "I catch schema errors only after deployment fails."
    *   *Delighter:* **Validation.** Wants red squiggles in VS Code *before* deploying.

---

## Appendix C: Glossary

| Term | Definition |
|------|------------|
| **Local MCP** | Server running on developer's machine. |
| **Context Tools** | Read-only, local execution (fast). |
| **Execution Tools** | Write/Cloud operations (authenticated). |
| **Dry Run** | Simulation of an operation without side effects. |
