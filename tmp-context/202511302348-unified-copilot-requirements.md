
# Unified Copilot in Fabric – Requirements List

## 1. Core Goals & Principles
- Provide a consistent Copilot chat and UI interaction experience across Fabric (P0)
- Enable persistent context and unified chat for faster workflows (P0)
- Minimize navigational confusion, eliminate context resets, and support multi-item operation (P0)
- User control, transparency, explainability, and graceful failure in AI UX
- Modular, orchestrated, and multi-agent support

---

## 2. Functional Requirements

### 2.1. Copilot Chat Interface
- I can browse the prompt gallery to see all available capabilities at a glance (P0)
- I can transition from full-screen to split view for reviewing items drafted by Copilot (P0)
- I can resize the chat pane, with width persisting across sessions (P0)
- I can start a new conversation (P0)
- I can provide feedback on each Copilot response (P0)
- I can bookmark prompts for quick access (P1)
- I can switch agent mid-conversation (P1)
- I can pick the most appropriate model for the conversation (P1)
- I can use Copilot directly from the home page (P2)

### 2.2. Context Selector & Binding
- I can rely on Copilot to automatically understand my current context (workspace, item, etc.) (P0)
- I can select a workspace to bind Copilot’s context (P1)
- I can select multiple workspaces (P2)
- I can select folders/items to bind context (P1)
- I can upload files for Copilot context (P0/P1)
- I can select parts of an item’s content as context (P1)
- I can see selected context in the chat box (P1)
- I can use voice dictation or image upload in chat (P2)
- I can revise the prompt to generate a new response (P2)

### 2.3. Item(s) View & Navigation
- I can view live updates in the side pane as Copilot creates/updates/deletes items (P0)
- I can open and view items referenced in Copilot responses in the side pane (P0)
- I can open multiple items/UIs in the side pane and close them easily (P0)
- I can navigate across multiple changed items (P1)
- I can jump directly to a changed section within an item (P2)

### 2.4. Change Tracking & Diff Viewer
- I can view overviews of item changes (P0)
- I can see highlights of changes within each item (P2)
- I can open the Diff Viewer to compare original and updated content (P2)

### 2.5. Actionable Response Controls
- I can confirm before performing high-impact actions (P0)
- I can accept Copilot’s response completely (P0)
- I can accept/reject individual changes selectively (P1)
- I can undo a specific Copilot action immediately after it is applied (P0)
- I can insert Copilot’s response into a specific position in the item (P2)
- I can copy Copilot’s response/results from the chat interface (P1)
- I can retry an action if the initial Copilot response does not align with requirements (P2)

### 2.6. Error Handling & Edge Case Management
- I can identify when Copilot cannot perform a requested action
- I can read and interpret Copilot’s error messages

### 2.7. Chat History & Advanced Features (Backend Dependent)
- I can continue conversations with Copilot across sessions (P2)
- I can select and delete conversations (P2)
- I can receive guided follow-up suggestions (P2)
- I can experience personalized Copilot assistance (P2)

---

## 3. Workload & Artifact-Specific Requirements

### 3.1. Semantic Modeling (via AS MCP Server) ✅
- Copilot must support CRUD operations on semantic models (P0) ✅
- Copilot can optimize semantic models for AI (P0) ✅
- Copilot can suggest and implement:
    - Better names for tables, columns, measures (P0) ✅
    - Relationships between tables (P0) ✅
    - Measures (P0) ✅
    - Column properties (display formats, descriptions, hide, folders, sort by, summarize by, data type/category) (P0) ✅
    - Additions to AI instructions/schema selection in Prep for AI (P0) ✅
    - Setting the model as ‘Prepped for AI’ (P0) ✅
- Copilot can apply batch operations (bulk renaming, refactoring, translations, security rules) (P0) ✅
- Copilot can run and validate DAX queries (P0) ✅
- Copilot can highlight ambiguity (P1) ✅
- Copilot can recommend and implement changes with explicit user consent (P0)
- Copilot must capture a version in version history before changes (P0)
- Copilot must warn about downstream impact (P0)
- Copilot must support undo/restore (P0)
- Copilot can explain how to make changes if it cannot apply them (P1)
- Copilot can nudge to use blueprint for complex modeling (P1)
- Copilot can test how Pythia would respond to questions (P1)
- Copilot can handle batch operations and advanced modeling (P1/P2) ✅

### 3.2. Blueprint Artifact (CRUD & Execute) ✅
- Copilot must support CRUD operations on Blueprint artifacts (P0) ✅
- Copilot must execute user-initiated actions on Blueprint artifacts (P0) ✅
- Copilot must support onboarding new artifacts and hero scenarios (P0)
- Copilot must support spec-driven development (P0)
- Copilot must support hybrid development (vibe → spec → deploy) (P1)
- Copilot must support context/history carry-over between modeling and blueprint (P1)

### 3.3. Fabric MCP (Generic CRUD) ✅
- Copilot must support basic CRUD operations on Fabric items via MCP (P0) ✅
- Copilot must generate new Fabric items from natural language (P0) ✅
- Copilot must explore OneLake data and schemas to feed downstream items (P0) ✅
- Copilot must support bulk renaming and governance normalization (P0) ✅
- Copilot must find all lakehouses containing a specific table (P0) ✅
- Copilot must reason with full table schema (table name, columns, types) (P0) ✅

### 3.4. Other MCPs in Fabric (e.g., Notebooks, DFG2, Lakehouse) ✅
- Copilot must support CRUD and advanced operations on other Fabric artifacts via their respective MCPs (P1/P2) ✅
- Copilot must support agentic workflows (plan, create, execute complex tasks) (P1/P2) ✅

---

## 4. Non-Goals / Out of Scope
- Entry point and rollout phase for Creator Copilot (depends on workload onboarding)
- Building data projects with Copilot (not in scope)
- Unified AI stacks and orchestration (backend, not in scope for this initiative)
- Report/Visualization creation with Copilot (covered in separate specs)
- TMDL view integration (future scope)

---

## 5. Success Metrics
- Reduction in time spent switching between items or manual context setup
- Workflow success rate and time from initiation to completion
- User satisfaction and feedback
- Number of semantic models marked as ‘Prepped for AI’
- MAU for Copilot entry points and prompt usage
- Downstream MAU for models touched by Copilot

---

## 6. Open Questions & Considerations
- How to handle performance expectations for complex tasks
- How to balance explicit vs. implicit context selection
- How to handle downstream impact warnings without over-warning
- How to support context/history carry-over between modeling and blueprint
- How to integrate with deployment pipelines and git (CICD)
- Licensing and capacity requirements for different workspace types

---

## 7. Prioritization Key
- P0: Must-have for MVP/private preview
- P1: High-priority, next milestone
- P2: Nice-to-have/post-MVP

---

## 8. Legend
- ✅ = Requirement is directly related to MCP servers (remote MCP, CRUD MCP, or other MCPs in Fabric)

---

``





## Tools required for Blueprint Agent

Tools required for M0 (shipping in March)
- List workspaces - [Workspaces - List Workspaces - REST API (Core) \ Microsoft Learn](https://learn.microsoft.com/en-us/rest/api/fabric/core/workspaces/list-workspaces?tabs=HTTP)
  - Gap: Have a search filter for based on name (e.g. exact, contains, fuzzy matching) and other properties (e.g. capacity, permission) because we could get back a lot of workspace-items, which would add to the token-limit and cause hallucination. One option is to use JMESPath query as Fabric cli.
  - Option 1: Update public API to add the filter
  - Option 2: Update mcp tool implementation can filter for the required workspaces.
- List Items/Artifacts - [Items - List Items - REST API (Core) \ Microsoft Learn](https://learn.microsoft.com/en-us/rest/api/fabric/core/items/list-items?tabs=HTTP)
  - Gap: Filter is needed here too
- Semantic Model Create - [Items - Create Semantic Model - REST API (SemanticModel) \ Microsoft Learn](https://learn.microsoft.com/en-us/rest/api/fabric/semanticmodel/items/create-semantic-model?tabs=HTTP)
- Blueprint CRUD (we are building) - once Blueprint is onboarded to public API, it should be included in MCP server automatically
- (Gap) OneLake API - can be unblocked by creating our own tools for M0
- [Schema APIs](https://learn.microsoft.com/en-us/fabric/onelake/table-apis/delta-table-apis-overview) - needed to fetch onelake artifact schema to create semantic models
  - ListSchemas GET <BaseUrl>/<Workspace>/testlh.Lakehouse/api/2.1/unity-catalog/schemas
  - **List tables** GET <BaseUrl>/<WorkspaceName or WorkspaceID>/<ItemName or ItemID>/api/2.1/unity-catalog/tables?catalog_name=<ItemName or ItemID>&schema_name=<SchemaName>
  - **Get table** GET <BaseUrl>/<WorkspaceName or WorkspaceID>/<ItemName or ItemID>/api/2.1/unity-catalog/tables/<TableName>
- [CRUD APIs](https://learn.microsoft.com/en-us/fabric/onelake/onelake-access-api) - needed to work with blueprint files
  - Create file
    PUT https://onelake.dfs.fabric.microsoft.com/<workspace>/<blueprint>/Files/inbound/sample.csv?resource=file
  - Read file
    GET https://onelake.dfs.fabric.microsoft.com/<workspace>/<blueprint>/Files/inbound/sample.csv
  - List Files - [https://learn.microsoft.com/en-us/rest/api/storageservices/datalakestoragegen2/path/list?view=rest-storageservices-2019-12-12](https://learn.microsoft.com/en-us/rest/api/storageservices/datalakestoragegen2/path/list?view=rest-storageservices-2019-12e
  - Delete file - DELETE https://onelake.dfs.fabric.microsoft.com/<workspace>/<lakehouse>/Files/inbound/sample.csv
- (Gap) Share Fabric item definitions in the remote MCP server - specify the scope of context (e.g. the agent will know it needs context for lakehouse), ideally for all artifact types
- (Gap) Graph API - refer with username/email for permission inspection
- Add a filter for non-system objects to "list items"

Tools required for M1 (targetting Build)
- (Gap) Connections/Creds related -
  - List Connections - [Connections - List Connections - REST API (Core) \ Microsoft Learn](https://learn.microsoft.com/en-us/rest/api/fabric/core/connections/list-connections?tabs=HTTP) - Again, a search filter for the CredentialType/DisplayName would be useful.
  - Create Connections - [Connections - Create Connection - REST API (Core) \ Microsoft Learn](https://learn.microsoft.com/en-us/rest/api/fabric/core/connections/create-connection?tabs=HTTP)
  - List Gateways - [Gateways - List Gateways - REST API (Core) \ Microsoft Learn](https://learn.microsoft.com/en-us/rest/api/fabric/core/gateways/list-gateways?tabs=HTTP)
  - (workload API) Bind Semantic model Connections - [Items - Bind Semantic Model Connection - REST API (SemanticModel) \ Microsoft Learn](https://learn.microsoft.com/en-us/rest/api/fabric/semanticmodel/items/bind-semantic-model-connection?tabs=HTTP)
``


---




# Additional Notes & Context for Integrating Remote MCP / CRUD MCP Requirements

### 1. Strategic Positioning: Why Remote MCP/CRUD MCP Matters

*   **Central Enabler:** Remote MCP (Model Control Protocol) and CRUD MCP (Create, Read, Update, Delete operations via MCP) are foundational for making Copilot a true orchestrator across Fabric. They enable Copilot to not just “suggest” but actually “do” — automating and standardizing actions on Fabric items (semantic models, blueprints, lakehouses, etc.).
*   **Agentic Workflows:** The ability for Copilot (and other agents) to perform CRUD operations remotely is what unlocks agentic, multi-step, and cross-artifact workflows. This is a key differentiator for Fabric’s vision of “AI-powered E2E development.”

### 2. Key Integration Principles

*   **Consistency with Unified Copilot UX:** Ensure that any remote MCP/CRUD MCP flows align with the unified chat and UI interaction principles (e.g., persistent context, actionable responses, explicit/implicit context binding).
*   **Explicit User Consent:** All CRUD actions, especially those initiated remotely or in bulk, should require clear user consent, with options for review, undo, and selective acceptance (see “Actionable Response Controls”).
*   **Change Tracking & Transparency:** Integrate robust change tracking, diff viewing, and version history for all MCP-driven changes. This supports both transparency and safe experimentation.
*   **Error Handling:** Plan for robust error and edge-case management. Users should always know what succeeded, what failed, and why.

### 3. Technical & Architectural Considerations

*   **Schema Awareness:** Remote MCPs must reason with full table schemas (table names, columns, types, etc.), not just item names. This is critical for advanced automation and for supporting complex scenarios (e.g., bulk renaming, governance normalization).
*   **Extensibility:** Design the MCP interface and protocol to be extensible—so new artifact types (e.g., Notebooks, DFG2, Lakehouse) and new operations can be onboarded with minimal friction.
*   **Security & Governance:** Address security, permissioning, and governance up front. Remote MCPs introduce new vectors for automation and change—ensure that only authorized users/agents can perform sensitive operations, and that all actions are auditable.

### 4. User Experience & Adoption

*   **Progressive Disclosure:** For complex or high-impact actions (e.g., deleting items, bulk updates), use progressive disclosure—start with a summary, allow drill-down, and require explicit confirmation.
*   **Feedback Loops:** Integrate feedback mechanisms so users can rate, comment, or flag issues with MCP-driven actions. This supports continuous improvement and trust-building.
*   **Education & Guidance:** Since remote MCPs introduce new paradigms, provide in-context help, tooltips, and “why” explanations, especially for less technical users.

### 5. Prioritization & MVP Scope

*   **P0 (MVP):** Focus on basic CRUD for core Fabric items (semantic models, blueprints, lakehouses), with explicit consent, undo, and change tracking.
*   **P1/P2:** Expand to advanced operations (batch, cross-artifact, governance), richer context binding, and deeper integration with agentic workflows.

### 6. Open Questions & Risks

*   How will you handle conflicts or race conditions when multiple agents/users act on the same item?
*   What are the fallback paths if a remote MCP operation fails (e.g., partial success, rollback)?
*   How will you ensure that remote MCP actions are discoverable and understandable in audit logs and version history?

***

## How to Use This Context in Your Spec

*   **Frame the “Why”:** Start your spec with a clear articulation of why remote MCP/CRUD MCP is critical for the Unified Copilot vision and Fabric’s agentic workflows.
*   **Map Requirements to User Journeys:** For each requirement, show how it supports a real user scenario (e.g., “Ash uses Copilot to bulk rename columns in all lakehouses matching a pattern, with a single prompt”).
*   **Highlight Integration Points:** Explicitly call out where your MCP spec will interface with the unified chat, context selector, actionable controls, and change tracking.
*   **Call Out Gaps & Risks:** Identify any areas where requirements are ambiguous, or where further design/engineering input is needed (e.g., security, extensibility, error handling).

***

### Example Outline for Your Spec (for Inspiration)

```markdown
# Remote MCP / CRUD MCP Spec

## 1. Overview & Rationale
- Why remote MCP is essential for Unified Copilot and Fabric agentic workflows

## 2. Supported Operations & Artifacts
- CRUD on semantic models, blueprints, lakehouses (P0)
- Extensibility for new artifact types (P1/P2)

## 3. User Experience
- How users initiate, review, and confirm MCP actions via Copilot
- Change tracking, undo, and feedback mechanisms

## 4. Technical Architecture
- Protocols, schema awareness, security, and governance

## 5. Error Handling & Edge Cases
- Handling failures, partial success, and rollbacks

## 6. Open Questions & Risks

## 7. Roadmap & Prioritization
- P0 (MVP), P1, P2

## 8. Appendix
- Mapping to Unified Copilot requirements (with checkmarks for MCP-related items)
```


