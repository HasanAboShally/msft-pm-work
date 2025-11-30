# Fabric Remote MCP: Cloud-Hosted Agent Execution Platform

**Feature:** Fabric Remote MCP  
**PM:** Hasan Abo-Shally  
**Engineering Lead:** Mahir Diab  
**Status:** Draft (v4.1)  
**Last Updated:** November 24, 2025

---

## Executive Summary

Fabric Remote MCP is a secure, cloud-hosted execution engine that enables AI agents to interact with Microsoft Fabric. It solves the "integration complexity" barrier by providing a standardized, pre-authenticated "socket" for agents, eliminating the need for developers to build custom OAuth2 stacks or API wrappers. This platform powers the Unified Copilot experience, enables pro-code automation in VS Code, and allows enterprises to build autonomous governance agents with zero infrastructure overhead.

---

## 1. Problem Statement

Organizations are racing to adopt AI agents, but integrating them with Fabric's infrastructure is blocked by technical complexity. **62% of enterprises** cite "integration complexity" as their top barrier to AI adoption. [1]

Currently, building an agent that can simply "create a workspace" requires a developer to build a full OAuth2 stack, handle token rotation, implement rate-limiting logic, and maintain API clients. This friction forces teams into two bad choices: wasting **~30% of development time** on plumbing [2] or falling back to unscalable manual operations. [3]

**Why Existing Solutions Fail:**

*   **Direct Public APIs:** High friction. Developers must implement complex OAuth2 flows (Delegated & App-only), handle token refresh, and manage API versioning. *Result: High barrier to entry.*
*   **Platform-Specific Connectors (e.g., Power Automate):** Low-code solutions are great for simple tasks but lack the version control, testing, and logic capabilities required for pro-code agents. They also create vendor lock-in. *Result: Limited scalability for complex scenarios.*
*   **Custom Middleware:** Large enterprises build their own "Fabric wrappers," creating security risks, maintenance burdens, and duplicated effort across the industry. *Result: Wasted engineering resources.*

**The Opportunity:** Fabric Remote MCP provides a standardized, secure, cloud-hosted "socket" that allows *any* AI agent (VS Code, Copilot, Custom) to execute Fabric operations via the open Model Context Protocol.

---
*[1] Gartner, "Top Barriers to Enterprise AI Adoption", October 2024.*  
*[2] GitHub, "State of the Octoverse: Enterprise Edition", 2023.*  
*[3] Internal customer interviews with Fortune 500 design partners (PwC, KPMG), Q4 2025.*

## 2. Guiding Principles

*   **Trust the agent's reasoning, but verify destructive actions.** Assume AI can plan and orchestrate effectively—don't prematurely lock features behind brittle UX patterns. Destructive operations (delete, role removal) require explicit confirmation, but the default stance is enablement, not restriction.

*   **Agents inherit user permissions, never exceed them.** Every MCP tool call executes within the caller's RBAC boundaries. If the user cannot delete a workspace in the portal, the agent cannot delete it via MCP. Service Principal agents inherit the app's permissions, not elevated privileges.

*   **Production-ready by default—agents shouldn't implement retry logic.** Tools handle transient failures (rate limits, timeouts, 503s) with exponential backoff automatically. Long-running operations (>10s) are polled asynchronously. Agents receive only actionable errors, not infrastructure noise.

*   **Optimize for LLM context windows—pagination is not optional.** Return concise, structured responses. List operations default to the first 50 items with clear pagination tokens. Never return raw API payloads when a summary suffices. Filter parameters are required, not optional.

*   **Identity resolution is a feature, not a bug.** Users say "Add Sarah as Viewer"—they don't know Sarah's User ID. Tools resolve natural language identifiers (names, emails) to Entra IDs automatically. Disambiguation prompts when multiple matches exist.

*   **Errors must teach, not just fail.** Error messages include: (1) what went wrong, (2) why it happened, (3) how to fix it, and (4) a link to docs. Permission errors distinguish between "user lacks permission" vs. "service principal not configured."

*   **Open standards over vendor lock-in.** Built on the Model Context Protocol (MCP) to work with any agent platform (VS Code, Claude, Copilot Studio, custom LLMs). No proprietary APIs or authentication schemes.

*   **Move fast and iterate.** Speed and adaptability are critical. We will learn from telemetry and user feedback, evolving tools based on real usage patterns. Features ship as "opinionated defaults" that can be refined, not as rigid contracts.

---

## 3. Hero Scenarios

### Scenario A: Automate Environment Replication in VS Code (Ren)
*Goal: Automate environment replication without leaving the IDE.*

Ren, a **Data Engineer**, is working locally in VS Code and needs to replicate a production workspace structure for a new dev environment. Instead of writing a script or clicking through the portal:
1.  Ren types in VS Code Chat: *"@fabric Clone the 'Finance_Prod' workspace structure to a new 'Finance_Dev' workspace. Copy all item definitions but do not copy data."*
2.  The local agent connects to **Remote MCP**, authenticates as Ren, and pulls the definition of the source workspace.
3.  It executes `create_workspace` and a series of `create_item` calls with the retrieved definitions.
4.  **Result:** In minutes, Ren has a perfect replica environment. The agent reports: *"Workspace created. 15 items replicated."*

### Scenario B: Seamless Interactive Assistance in Fabric Portal (Ash)
*Goal: Seamless interactive assistance with Context Binding.*

Ash, an **Analyst**, is working in the Fabric Portal and opens the **Persistent Copilot Pane**.
1.  **Context Binding:** Ash selects "Marketing Workspace" in the Copilot Context Selector.
2.  Ash types: *"Add Sarah as a Viewer to this workspace and create a backup of the 'Q3 Sales' report."*
3.  The Unified Copilot uses **Remote MCP** to:
    *   Resolve "Sarah" to her User ID (`resolve_user`).
    *   Call `add_workspace_role_assignment` (using the bound workspace ID).
    *   Call `get_item_definition` for the report and `create_item` to save the backup.
4.  **Undo:** Ash realizes Sarah should be a Contributor. He clicks "Undo" in the chat.
5.  The agent calls `remove_workspace_role_assignment` to revert the change immediately.

### Scenario C: Continuous Compliance Monitoring (Ari)
*Goal: Continuous, set-and-forget governance.*

Ari, a **Data Architect**, needs to ensure no external users have Admin access to financial workspaces. Ari builds a scheduled agent in Copilot Studio.
1.  Every night, the agent wakes up and calls **Remote MCP** `list_workspaces` (filtered by tag "Finance").
2.  It iterates through them using `list_workspace_role_assignments`.
3.  If it finds an external email with "Admin" role, it calls `remove_workspace_role_assignment` and logs a ticket.
4.  **Result:** Continuous compliance monitoring with zero manual effort. Ari receives a weekly summary report.

### Scenario D: The Rapid Onboarding (Binh)
*Goal: Provision standard customer environment from a template.*

Binh, a **BI Engineer**, receives a request to onboard a new client, "Contoso", which requires a standard set of Lakehouses and Reports.
1.  Binh messages the Fabric Agent: *"Onboard new client 'Contoso' using the 'Standard Retail Template'."*
2.  The agent connects to **Remote MCP** and retrieves the template definition from the repo.
3.  It calls `create_workspace` for "Contoso_Retail" and loops through the template to `create_item` for each artifact.
4.  **Result:** The entire environment is provisioned in under 2 minutes, ensuring consistency with Binh's standards.

## 4. Architecture Overview & User Journey

```mermaid
graph LR
    User[User / Agent] -- "Natural Language" --> Host[Client Host\n(VS Code / Copilot)]
    Host -- "MCP Protocol" --> RemoteMCP[Fabric Remote MCP]
    
    subgraph "Fabric Boundary"
        RemoteMCP -- "Identity Translation" --> Auth[Entra ID]
        RemoteMCP -- "REST API" --> ControlPlane[Fabric Control Plane]
        ControlPlane --> Workspace[Workspaces & Items]
    end
    
    style RemoteMCP fill:#f9f,stroke:#333,stroke-width:2px
```

1.  **User Prompt:** User asks an agent (in Teams, Copilot Studio, or VS Code) to perform a task.
2.  **Auth & Routing:** The agent connects to the Fabric Remote MCP endpoint. The MCP server handles OAuth2 authentication (User or Service Principal) seamlessly.
3.  **Tool Execution:** The agent selects the appropriate tool (e.g., `create_workspace`) from the exposed MCP catalog.
4.  **Fabric Operation:** Remote MCP executes the operation against Fabric Public APIs, handling polling for long-running operations.
5.  **Governance:** The operation is logged in the centralized Fabric Audit Logs.
6.  **Completion:** The agent returns the success result to the user.

## 5. Goals

*   **Goal 1: Enable Unified Copilot (P0).** Provide the execution backbone for a single, consistent Copilot across all Fabric workloads.
    *   *Measured by: Adoption (MAU)*
*   **Goal 2: Empower Pro-Developers (P0).** Reduce deployment and management time from days to minutes via conversational automation.
    *   *Measured by: Efficiency (Time to provision)*
*   **Goal 3: Grow the Ecosystem (P1).** Enable ISVs and enterprises to build custom agents (via Copilot Studio) that work with Fabric out-of-the-box.
    *   *Measured by: Ecosystem (Integrated Platforms)*

## 6. Non-Goals

*   **Not Local Execution:** This spec covers cloud-hosted execution. Local developer workflows (like reading local files) are handled by *Local MCP*.
*   **Not a UI Replacement:** We are enabling automation, not replacing the Fabric Portal for visual tasks.
*   **Not Building Models:** We provide the *tools* and *context* for agents, not the LLMs themselves.

---

## 7. Milestones & Roadmap

*   **M0 (Jan 2026): Private Preview.** Design partners (PwC, KPMG) validating core auth and workspace tools.
*   **M1 (Mar 2026): Public Preview.** Launch at FabCon Atlanta. Full control plane toolset available.
*   **GA (May 2026): General Availability.** Launch at MS Build. Production SLAs, full region support.

**Deferred Features (Post-GA):**
*   Advanced "Undo" history (multi-step rollback).
*   Cross-tenant agent delegation.
*   Custom tool definitions by end-users.

---

## 8. User Capabilities ("I Cans")

This section defines core capabilities from the user's perspective, organized by interaction pattern: **Interactive Use** (human-in-the-loop), **Autonomous Operations** (scheduled/triggered agents), and **Setup & Configuration** (one-time tasks).

### 8.1 Interactive Use (Human-in-the-Loop)

| Pri | I can... | Additional Details / Considerations | Milestone |
| :--- | :--- | :--- | :--- |
| **P0** | I can ask my agent to perform any standard Workspace or Item operation. | Full coverage of 23+ control plane tools (Create, Update, List, etc.). | M1 |
| **P0** | I can undo a specific action immediately after it is applied. | Tools return resource IDs to enable immediate rollback/deletion by the agent. | M1 |
| **P0** | I can confirm before the agent performs a high-impact action (e.g., Delete). | Destructive tools are flagged as `is_consequential` to trigger UI confirmation. | M1 |
| **P1** | I can simulate complex operations before execution (Dry Run). | Tools support `dry_run` flag to validate logic/permissions without side effects. | M1 |
| **P0** | I can see real-time progress updates for long tasks. | Streaming support to keep chat UI responsive. Long operations (>10s) polled automatically. | GA |
| **P0** | I can refer to my colleagues by name or email in my prompts. | Identity resolution translates "Sarah" to her User ID automatically. Disambiguates when multiple matches exist. | GA |
| **P0** | I can trust the agent not to crash my context window with too much data. | **Smart Pagination & Filtering** enabled by default on all list operations. Returns first 50 items with clear pagination tokens. | M1 |

### 8.2 Autonomous Operations (Scheduled/Triggered Agents)

| Pri | I can... | Additional Details / Considerations | Milestone |
| :--- | :--- | :--- | :--- |
| **P0** | I can ask for long-running tasks without the agent timing out. | **Async operations** (tasks taking >10s) handled automatically via polling. Agent doesn't need retry logic. | M1 |
| **P0** | I can trust the agent to retry transient failures without manual intervention. | Automatic exponential backoff for rate limits, timeouts, 503s. Max 3 retries. Agent receives only actionable errors. | M1 |
| **P0** | I can schedule agents to enforce governance rules continuously. | Service Principal authentication for headless agents. Runs 24/7 without user intervention. | M0 |
| **P0** | I can see exactly what the agent did in the Fabric Audit Logs. | All tool invocations are logged to the central audit stream with agent identity and timestamp. | M0 |
| **P0** | I can prevent agents from overwhelming my tenant. | Rate limiting enforced per user/tenant (e.g., 60 calls/min). Throttled requests receive 429 with retry-after header. | M1 |

### 8.3 Setup & Configuration (One-Time Tasks)

| Pri | I can... | Additional Details / Considerations | Milestone |
| :--- | :--- | :--- | :--- |
| **P0** | I can connect my agent to Fabric using my own user identity. | Supports **Delegated OAuth2 flow** (The agent acts on behalf of the logged-in user). | M0 |
| **P0** | I can connect a headless agent using a Service Principal. | Supports **App-only flow** (Uses a registered app identity) for autonomous/scheduled agents. | M0 |
| **P0** | I can trust that the agent cannot do anything I don't have permission to do. | Strict **RBAC** (Role-Based Access Control) enforcement; the agent inherits user limits. Service Principals inherit app permissions. | M0 |
| **P0** | I can rotate my agent's secrets without breaking the connection. | Automated handling of secret rotation. Graceful failover during rotation window. | M1 |
| **P0** | I can add Fabric capabilities to my custom Copilot in one click. | Official connector in Copilot Studio gallery. Pre-configured auth and tool catalog. | M1 |
| **P0** | I can connect VS Code to Fabric without writing any auth code. | Official VS Code extension handles MCP connection and authentication automatically. | M0 |
| **P1** | I can inspect the exact API definition of the tools. | OpenAPI spec available publicly for integration with custom platforms. | GA |
| **P0** | I can disable agent access for my entire organization. | Tenant-level admin switch in Fabric Admin Portal. Takes effect immediately. | GA |

### 8.4 Error Handling & Resilience

| Pri | Requirement | Details | Milestone |
| :--- | :--- | :--- | :--- |
| **P0** | All tools return structured error messages with actionable guidance. | Error responses include: (1) error code, (2) human-readable message, (3) suggested remediation, and (4) link to relevant documentation. | M1 |
| **P0** | Transient failures (rate limits, timeouts, 503s) are retried automatically with exponential backoff. | Agent doesn't surface retry logic to user unless max attempts (3x) exceeded. Retries logged for debugging. | M1 |
| **P0** | Permission errors clearly distinguish between "user lacks permission" vs. "service principal not configured." | Example: "You do not have Contributor access to this workspace. Request access from the owner." vs. "Service Principal lacks Fabric Admin role. Update app registration in Entra ID." | M1 |
| **P1** | API schema validation errors include the specific field and expected format. | Example: "Field 'capacity' must be one of: ['F2', 'F4', 'F8']. You provided: 'Small'." | M1 |
| **P0** | Long-running operations (>10s) provide progress updates via polling. | Polling status returned to agent every 2 seconds. Includes estimated completion time when available. | M1 |
| **P0** | Concurrent operation conflicts are detected and reported clearly. | Example: "This workspace is currently being deleted by another operation. Retry in 30 seconds or check Fabric Audit Logs for details." | M1 |

---

## 9. Success Metrics

| Outcome | Metric | Target (at GA) | Source |
| :--- | :--- | :--- | :--- |
| **Adoption** | Monthly Active Users (MAU) | **50,000+** | Projected from Unified Copilot user base (500K MAU × 10% agent adoption) |
| **Efficiency** | Time to provision customer environment | **< 5 minutes** (vs 2-3 days) | Baseline: BI Engineer customer interviews, Q4 2025 |
| **Ecosystem** | Integrated Agent Platforms | **20+** (VS Code, Copilot Studio, etc.) | MCP protocol compatibility ensures broad support |
| **Performance** | Tool Execution Latency (p95) | **< 2 seconds** | Fabric API SLA (p95 < 1s) + 1s overhead budget |
| **Satisfaction** | User Satisfaction (CSAT) | **4.5/5** | Measured via in-product feedback and NPS surveys |

---

## 10. Open Questions & Risks

*   **Q1:** How do we balance priority between Unified Copilot (internal) and Pro-Dev (external) scenarios if resources are tight?
*   **Q2:** What is the acceptable latency for "human-in-the-loop" scenarios vs. autonomous agents?
*   **Risk:** Accelerated timeline (GA pulled forward 4 months) requires tight coordination with Identity and Governance teams.

## 11. Resources & References

*   **Presentation:** `20251118-slides-content-minimal.md` (Strategy Deck)
*   **Related Spec:** `FABRIC-LOCAL-MCP-SPEC.md` (Local developer tools)
*   **Standard:** [Model Context Protocol](https://modelcontextprotocol.io)

## Appendix A: Tool Capabilities

**Control Plane Tools (23 Total):**
*   **Workspace:** `create`, `update`, `delete`, `list`, `get`
*   **Items:** `create`, `update`, `delete`, `list`, `get`, `get_definition`
*   **Permissions:** `add_role`, `remove_role` (Workspace & Item level)
*   **Capacity:** `list`, `get`, `get_workloads`
*   **Jobs:** `run`, `cancel`, `get_status`

## Appendix B: User Personas

*   **Ren (Data Engineer) - The Automator:**
    *   *Quote:* "The pipelines that I build are the foundation of our business intelligence."
    *   *Role:* Designs and maintains data pipelines and infrastructure.
    *   *Pain:* "Creating and testing pipelines when we make a change to our architecture is slow and error-prone."
    *   *Delighter:* **Automation of testing.** Wants to validate configs programmatically before production to save time.
*   **Binh (BI Engineer) - The Builder:**
    *   *Quote:* "I am jack of all trades, master of one (BI)."
    *   *Role:* Bridges business needs with technical setup; manages data models and reports.
    *   *Pain:* "Maintaining source control and managing environments is difficult. I'm the bottleneck for new project setups."
    *   *Delighter:* **Speed & Consistency.** Wants repeatable templates to onboard customers in minutes.
*   **Ari (Data Architect) - The Guardian:**
    *   *Quote:* "To design effective infrastructure, I need to be up-to-date on technology."
    *   *Role:* Plans and designs secure, scalable data infrastructure.
    *   *Pain:* "Managing security concerns and ensuring compliance across disparate data sources is overwhelming."
    *   *Delighter:* **Governance.** Wants comprehensive audit trails and rate limiting to ensure security.
*   **Ash (Analyst) - The Insight Creator:**
    *   *Quote:* "I spend way too much time formatting reports for my end users."
    *   *Role:* Produces accurate insights and manages workspace access for stakeholders.
    *   *Pain:* "Managing workspaces and access to reports is time-consuming and tedious."
    *   *Delighter:* **Seamless Management.** Wants to ensure the right people have the right access without navigating complex settings.