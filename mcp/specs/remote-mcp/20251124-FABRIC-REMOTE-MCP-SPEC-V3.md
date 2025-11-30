# Fabric Remote MCP: Cloud-Hosted Agent Execution Platform

**Feature:** Fabric Remote MCP  
**PM:** Hasan Abo-Shally  
**Engineering Lead:** Mahir Diab  
**Status:** Draft (v3.1)  
**Last Updated:** November 24, 2025

---

## 1. Problem Statement

Organizations are racing to adopt AI agents, but integrating them with Fabric's infrastructure is blocked by technical complexity. **62% of enterprises** cite "integration complexity" as their top barrier to AI adoption (Gartner).

Currently, building an agent that can simply "create a workspace" requires a developer to build a full OAuth2 stack, handle token rotation, implement rate-limiting logic, and maintain API clients. This friction forces teams into two bad choices: wasting **~30% of development time** on plumbing (GitHub Enterprise Survey) or falling back to unscalable manual operations.

**Why Existing Solutions Fail:**

*   **Direct Public APIs:** High friction. Developers must implement complex OAuth2 flows (Delegated & App-only), handle token refresh, and manage API versioning. *Result: High barrier to entry.*
*   **Platform-Specific Connectors (e.g., Power Automate):** Low-code solutions are great for simple tasks but lack the version control, testing, and logic capabilities required for pro-code agents. They also create vendor lock-in. *Result: Limited scalability for complex scenarios.*
*   **Custom Middleware:** Large enterprises build their own "Fabric wrappers," creating security risks, maintenance burdens, and duplicated effort across the industry. *Result: Wasted engineering resources.*

**The Opportunity:** Fabric Remote MCP provides a standardized, secure, cloud-hosted "socket" that allows *any* AI agent (VS Code, Copilot, Custom) to execute Fabric operations via the open Model Context Protocol.

## 2. User Personas

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

## 3. Hero Scenarios

### Scenario A: The Pro-Developer in VS Code (Ren)
*Goal: Automate environment replication without leaving the IDE.*

Ren is working locally in VS Code and needs to replicate a production workspace structure for a new dev environment. Instead of writing a script or clicking through the portal:
1.  Ren types in VS Code Chat: *"@fabric Clone the 'Finance_Prod' workspace structure to a new 'Finance_Dev' workspace. Copy all item definitions but do not copy data."*
2.  The local agent connects to **Remote MCP**, authenticates as Ren, and pulls the definition of the source workspace.
3.  It executes `create_workspace` and a series of `create_item` calls with the retrieved definitions.
4.  **Result:** In minutes, Ren has a perfect replica environment. The agent reports: *"Workspace created. 15 items replicated."*

### Scenario B: The Unified Copilot Experience (Ash)
*Goal: Seamless interactive assistance with Context Binding.*

Ash is working in the Fabric Portal and opens the **Persistent Copilot Pane**.
1.  **Context Binding:** Ash selects "Marketing Workspace" in the Copilot Context Selector.
2.  Ash types: *"Add Sarah as a Viewer to this workspace and create a backup of the 'Q3 Sales' report."*
3.  The Unified Copilot uses **Remote MCP** to:
    *   Resolve "Sarah" to her User ID (`resolve_user`).
    *   Call `add_workspace_role_assignment` (using the bound workspace ID).
    *   Call `get_item_definition` for the report and `create_item` to save the backup.
4.  **Undo:** Ash realizes Sarah should be a Contributor. He clicks "Undo" in the chat.
5.  The agent calls `remove_workspace_role_assignment` to revert the change immediately.

### Scenario C: The Autonomous Compliance Agent (Ari)
*Goal: Continuous, set-and-forget governance.*

Ari needs to ensure no external users have Admin access to financial workspaces. Ari builds a scheduled agent in Copilot Studio.
1.  Every night, the agent wakes up and calls **Remote MCP** `list_workspaces` (filtered by tag "Finance").
2.  It iterates through them using `list_workspace_role_assignments`.
3.  If it finds an external email with "Admin" role, it calls `remove_workspace_role_assignment` and logs a ticket.
4.  **Result:** Continuous compliance monitoring with zero manual effort. Ari receives a weekly summary report.

## 4. User Journey (General Flow)

1.  **User Prompt:** User asks an agent (in Teams, Copilot Studio, or VS Code) to perform a task.
2.  **Auth & Routing:** The agent connects to the Fabric Remote MCP endpoint. The MCP server handles OAuth2 authentication (User or Service Principal) seamlessly.
3.  **Tool Execution:** The agent selects the appropriate tool (e.g., `create_workspace`) from the exposed MCP catalog.
4.  **Fabric Operation:** Remote MCP executes the operation against Fabric Public APIs, handling polling for long-running operations.
5.  **Governance:** The operation is logged in the centralized Fabric Audit Logs.
6.  **Completion:** The agent returns the success result to the user.

## 5. Goals

*   **Goal 1: Enable Unified Copilot (P0).** Provide the execution backbone for a single, consistent Copilot across all Fabric workloads.
*   **Goal 2: Empower Pro-Developers (P0).** Reduce deployment and management time from days to minutes via conversational automation.
*   **Goal 3: Grow the Ecosystem (P1).** Enable ISVs and enterprises to build custom agents (via Copilot Studio) that work with Fabric out-of-the-box.

## 6. Non-Goals

*   **Not Local Execution:** This spec covers cloud-hosted execution. Local developer workflows (like reading local files) are handled by *Local MCP*.
*   **Not a UI Replacement:** We are enabling automation, not replacing the Fabric Portal for visual tasks.
*   **Not Building Models:** We provide the *tools* and *context* for agents, not the LLMs themselves.

## 7. Design Principles

*   **Security First:** All operations must pass through standard Fabric RBAC and be fully auditable.
*   **Open Standard:** Built on the open Model Context Protocol (MCP) to ensure compatibility with any agent platform (Claude, OpenAI, etc.), avoiding vendor lock-in.
*   **Production Ready:** Tools must handle real-world complexity (retries, pagination, async operations) so agents don't have to.

## 8. User Capabilities ("I Cans")

This section defines the core capabilities from the user's perspective, prioritizing outcomes over technical implementation.

### 8.1 Authentication & Security

| Pri | I can... | Additional Details / Considerations | Milestone |
| :--- | :--- | :--- | :--- |
| **P0** | I can connect my agent to Fabric using my own user identity. | Supports Delegated OAuth2 flow. The agent acts on my behalf. | M0 |
| **P0** | I can connect a headless agent using a Service Principal. | Supports App-only flow for autonomous/scheduled agents. | M0 |
| **P0** | I can trust that the agent cannot do anything I don't have permission to do. | Strict RBAC enforcement (double-check pattern). | M0 |
| **P0** | I can rotate my agent's secrets without breaking the connection. | Automated handling of secret rotation. | M1 |

### 8.2 Execution & Reliability

| Pri | I can... | Additional Details / Considerations | Milestone |
| :--- | :--- | :--- | :--- |
| **P0** | I can ask my agent to perform any standard Workspace or Item operation. | Full coverage of 23+ control plane tools (Create, Update, List, etc.). | M1 |
| **P0** | I can ask for long-running tasks without the agent timing out. | Async operations handled automatically via polling. | M1 |
| **P0** | I can undo a specific action immediately after it is applied. | Tools return resource IDs to enable immediate rollback/deletion by the agent. | M1 |
| **P0** | I can confirm before the agent performs a high-impact action (e.g., Delete). | Destructive tools are flagged as `is_consequential` to trigger UI confirmation. | M1 |
| **P0** | I can see real-time progress updates for long tasks. | Streaming support to keep chat UI responsive. | GA |
| **P0** | I can refer to my colleagues by name or email in my prompts. | Identity resolution translates "Sarah" to her User ID automatically. | GA |

### 8.3 Governance & Control

| Pri | I can... | Additional Details / Considerations | Milestone |
| :--- | :--- | :--- | :--- |
| **P0** | I can see exactly what the agent did in the Fabric Audit Logs. | All tool invocations are logged to the central audit stream. | M0 |
| **P0** | I can prevent agents from overwhelming my tenant. | Rate limiting enforced per user/tenant (e.g., 60 calls/min). | M1 |
| **P0** | I can disable agent access for my entire organization. | Tenant-level admin switch. | GA |

### 8.4 Integration

| Pri | I can... | Additional Details / Considerations | Milestone |
| :--- | :--- | :--- | :--- |
| **P0** | I can add Fabric capabilities to my custom Copilot in one click. | Official connector in Copilot Studio gallery. | M1 |
| **P0** | I can connect VS Code to Fabric without writing any auth code. | Official VS Code extension. | M0 |
| **P1** | I can inspect the exact API definition of the tools. | OpenAPI spec available publicly. | GA |

## 9. Success Metrics

| Outcome | Metric | Target (at GA) |
| :--- | :--- | :--- |
| **Adoption** | Monthly Active Users (MAU) | **50,000+** |
| **Efficiency** | Time to provision customer environment | **< 5 minutes** (vs 2-3 days) |
| **Ecosystem** | Integrated Agent Platforms | **20+** (VS Code, Copilot Studio, etc.) |
| **Performance** | Tool Execution Latency (p95) | **< 2 seconds** |

## 10. Milestones & Roadmap

*   **M0 (Jan 2026): Private Preview.** Design partners (PwC, KPMG) validating core auth and workspace tools.
*   **M1 (Mar 2026): Public Preview.** Launch at FabCon Atlanta. Full control plane toolset available.
*   **GA (May 2026): General Availability.** Launch at MS Build. Production SLAs, full region support.

## 11. Open Questions & Risks

*   **Q1:** How do we balance priority between Unified Copilot (internal) and Pro-Dev (external) scenarios if resources are tight?
*   **Q2:** What is the acceptable latency for "human-in-the-loop" scenarios vs. autonomous agents?
*   **Risk:** Accelerated timeline (GA pulled forward 4 months) requires tight coordination with Identity and Governance teams.

## 12. Resources & References

*   **Presentation:** `20251118-slides-content-minimal.md` (Strategy Deck)
*   **Related Spec:** `FABRIC-LOCAL-MCP-SPEC.md` (Local developer tools)
*   **Standard:** [Model Context Protocol](https://modelcontextprotocol.io)

## Appendix: Tool Capabilities

**Control Plane Tools (23 Total):**
*   **Workspace:** `create`, `update`, `delete`, `list`, `get`
*   **Items:** `create`, `update`, `delete`, `list`, `get`, `get_definition`
*   **Permissions:** `add_role`, `remove_role` (Workspace & Item level)
*   **Capacity:** `list`, `get`, `get_workloads`
*   **Jobs:** `run`, `cancel`, `get_status`
