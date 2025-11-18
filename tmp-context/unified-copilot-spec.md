# Unified Copilot experience (WIP)

## Resources

| Design Spec (Figma / Redlines) |   |
|-------------------------------|---|
| **VSO work item** | [Feature 1855824 [Unified Copilot] Unified Copilot integration across the Shell](https://dev.azure.com/powerbi/Trident/_workitems/edit/1855824) |
| **Dev Spec** |   |
| **Related Specs** | [Spec - Fabric Blueprint Development.docx](https://microsoft.sharepoint.com/:w:/t/PowerBI/EZSbR3XU6ZRAlQ6UT03WrGQBPWJ4hHos80H6wOX8elPWlw?e=FW0Eja&xsdata=MDV8MDJ8TGl1LkRhbkBtaWNyb3NvZnQuY29tfDMzMTI3MWIxNjc5ODRlY2QyNWY0MDhkZTEzMDhlYmVlfDcyZjk4OGJmODZmMTQxYWY5MWFiMmQ3Y2QwMTFkYjQ3fDF8MHw2Mzg5NjkxMjYyOTE1NjQ1ODR8VW5rbm93bnxUV0ZwYkdac2IzZDhleUpGYlhCMGVVMWhjR2tpT25SeWRXVXNJbFlpT2lJd0xqQXVNREF3TUNJc0lsQWlPaUpYYVc0ek1pSXNJa0ZPSWpvaVRXRnBiQ0lzSWxkVUlqb3lmUT09fDB8fHw%3d&sdata=L0g1YytjS3h1Wlk1SkJDYU45bGRBc0FWSk1PckY4clJxaFBiWU5LWkxEUT0%3d) |
| **User studies** | [Feedback Supporting a Unified, Persistent Copilot in Fabric](https://microsoft-my.sharepoint.com/:w:/p/brsandif/Eaejn2oEVFpApl-RDV2NX-wBC6nNn61eyjWu1nKpWgSlFA?e=lM9vWz) – Compilation of user feedback highlighting pain points and need for unified experience.<br>[SWIFT Cross Fabric insights AI.pptx](https://microsoft.sharepoint.com/:p:/t/ResearchinDataCloudStudio/EZf2Q1EtHrBFtVXpsYROwCcBs4yhYRPQ70FHw_iw2rREMg?e=uas3Mp&xsdata=MDV8MDJ8fGI5YjdjNDYzOTJiZTQzNGM4NGQ4MDhkZGRjNDA3OGNifDcyZjk4OGJmODZmMTQxYWY5MWFiMmQ3Y2QwMTFkYjQ3fDB8MHw2Mzg5MDg4OTE2MTkwOTk4NjR8VW5rbm93bnxWR1ZoYlhOVFpXTjFjbWwwZVZObGNuWnBZMlY4ZXlKRFFTSTZJbFJsWVcxelgwRlVVRk5sY25acFkyVmZVMUJQVEU5R0lpd2lWaUk2SWpBdU1DNHdNREF3SWl3aVVDSTZJbGRwYmpNeUlpd2lRVTRpT2lKUGRHaGxjaUlzSWxkVUlqb3hNWDA9fDF8TDJOb1lYUnpMekU1T20xbFpYUnBibWRmVFdwcmVWa3lXVE5hVkVsMFRqSlJlVTVwTURCTk1rWnNURlJuTkU0eVJYUlpiVTE0VGtkWk0xcEhSVEpaZWxwb1FIUm9jbVZoWkM1Mk1pOXRaWE56WVdkbGN5OHhOelUxTWpreU16WXdOek0xfDc1OGVmNGU1YjRlNjRjNDZlN2Y5MDhkZGRjNDA3OGNhfDM5OTY3NjhiMGI1YjRlMDU4NWZhYWU5MDk3MzRlOTRh&sdata=NjFFQll1dm8zWlVYTE5pelFkdkpmVUI3Y0tkWEYzSTYyU1VldnMrVVB1cz0%3D&ovuser=72f988bf-86f1-41af-91ab-2d7cd011db47%2cbrsandif%40microsoft.com) |

## User experience of conversational AI

In traditional systems, user experience is predictable and follows a fixed user flow with predetermined outcomes. AI is shifting user experience from static, predictable flows to dynamic, adaptive experiences that:

- **Natural language first** — Moving from button-and-form interfaces to **conversation**, where users express intent in plain language.
- **Modular flexibility** — Design and build components to adapt to varying AI outputs, not assume a single fixed result.
- **Orchestration over interaction** — Users become conductors, orchestrating background agents and workflows rather than micromanaging every step.
- **Uncertainty becomes a feature** — A user surface to manage and leverage.

### Four core principles for AI user experience in industry:

1. **Transparency & Explainability**: Make uncertainty visible and understandable. Users need to see what the system knows and doesn’t know, and why it suggested a particular result.
2. **User Control & Agency**: Let users steer through uncertainty, refine, edit, or override recommendations, and keep control with the user.
3. **Design for Graceful Failure**: Fail safely when uncertainty is high. Show clear error states, helpful retry options, and manual fallbacks. Provide guardrails (constraints, standards) that limit risky actions when confidence is low.
4. **Focus on capabilities**: The goal is useful, accurate, verifiable, and actionable outputs.

A practical workflow for AI-powered user experiences follows this pattern: **Context → Propose → Preview → Apply → Validate → Undo → Improve**.

The AI-focused user experience enhances creativity and productivity. In the study [Copilot Chat as a Productivity Anchor](https://hits.microsoft.com/Collection/7003546/Section/78570), researchers evaluated 9 competing products and interviewed 15 commercial genAI users to understand the current landscape of productivity tools anchored in AI and expectations for AI chat. Key findings:

- While participants see AI as a valuable assistant, they don’t yet perceive gen AI tools as a center of productivity due to concerns about trust, reliability, limitations, and task boundaries.
- To make Copilot an anchor for productivity, all these puzzle pieces must come together: reliable performance, agentic capabilities, seamless integration, proactive and personalized experiences, persistent memory, and strong user trust. Only then will users be able to rely on Copilot as the central hub for their daily work.

*Image description: A puzzle illustration showing pieces labeled with key attributes such as Always Available, Workflow Integration, Multi-Modal, Memory & Continuity, Performance, Contextual Awareness, Integration with Tools, Agentic Behavior with User Control, Personalized, Proactive, User Readiness, and User Trust in AI. The puzzle forms an anchor, symbolizing Copilot as the anchor for productivity.*

## Our Current Situation and Problems

At present, each workload operates with its own Copilot experience, functioning in siloed systems:

- **Power BI**: Copilot supports semantic models and reports, assisting with synonyms, measure descriptions, DAX queries, and data questions. For reports, it suggests pages, visuals, summarizes data, and is integrated with the Power BI home experience. (Copilot MAU: 349,911)
- **Data Engineering**: Copilot in Notebooks generates code/markdown, adds comments, fixes/debugs code, analyzes/visualizes data, and explains content. (Copilot MAU: 5,169; MAU: 209,006)
- **Data Factory**: Copilot supports dataflow gen2 and Pipelines, generating queries, creating/running pipelines, summarizing activity, and troubleshooting errors. (Copilot MAU: 8,928; DI MAU: 174,748)
- **Data Warehousing**: Copilot in SQL query offers SQL generation, code suggestions, fixes, and explanations. (Copilot MAU: 12,367; MAU: 314,380)
- **SQL Database**: Copilot in SQL query offers similar features. (Copilot MAU: 2,273; MAU: 10,256)
- **Real-time Intelligence**: Copilot in KQL query and dashboard enables KQL generation/modification and dashboard creation. (Copilot MAU: 1,469; MAU: 101,380)

This compartmental approach results in a lack of uniformity and connectivity between workloads.

### User Experience Challenges

- **Experience Inconsistency**: Users encounter inconsistencies across different items, causing confusion and disrupting workflow and efficiency.
- **Fragmentation and Inefficiency**: Copilot is not consistently available across all interfaces, leading to a disjointed, time-consuming, and frustrating user journey.
- **Navigational Confusion**: New users may struggle to identify which Copilot functionality is applicable, suitable, and where it can be accessed.
- **Context reset and limited continuity**: Lack of conversational history and context means users must restate context when switching items.
- **Gaps in multi-modal support & contextual awareness**: No support for multi-modal interactions or capturing contextual information.
- **Incomplete personalization**: Experiences are tailored only to specific items, not holistically across workflows.

These challenges underscore the urgent need for a unified and intelligent Copilot experience—one that delivers seamless, consistent, and comprehensive support across all workflows.

## Goals

| Goals | Priority |
|-------|----------|
| One Copilot, everywhere in Fabric—Provide single, consistent interface for Copilot experience | P0 |
| Faster workflows—Persistent context and unified chat | P0 |

> **Comment:** These feel potentially redundant. Perhaps we align that our primary goal is "One Copilot" and that the success metrics we expect to see are things like faster workflows, lower frustration scores, etc. — *Brent Sandifer*

## Non-goals

| Non-goals | Reason |
|-----------|--------|
| The capability to build data project with Copilot | This feature does not aim to provide the functionality of building data solution. |
| Unified AI stacks and orchestration | This is the backend of the unified Copilot, PBI team + ILDC team |

## Success Metrics

| No. | Outcome | Measure | Target |
|-----|---------|---------|--------|
| 1 | The unified Copilot experience empowers users to interact with a single, consistent Copilot interface throughout Fabric. | Reduction in time spent switching between items or manual context setup |   |
| 2 | Minimizes navigational confusion, eliminates context resets, and supports multi-item operation for faster workflow | Workflow Success Rate, Time from initiation to completion |   |
| 3 | User Satisfaction | Feedback on the unified Copilot experience |   |

> **Comment:** I do not believe this is a problem that all our user personas have. In particular, the business user (Nat) persona targeted by the critically important "Chat With Your Data" (CWYD) scenario is not a creator/developer... [comment continues with discussion about different user personas and their needs] — *John Vulner*

> **Reply:** Makes sense, John. I think the intended scope of this work is target at the Fabric Shell—and in turn the creator/developer audience... [discussion about separating CWYD and creator experiences] — *Brent Sandifer*

> **Reply:** Well, it seems like it is the user prompt itself that informs the orchestrator regarding which other agent to pull in whether that's CWYD or any other creator agent... — *Drew Voegele*

> **Reply:** Makes sense to me, Drew. I think at this stage it's valuable for us to explore some early mocks of how this might manifest... — *Brent Sandifer*

## User scenarios

> **Comment:** I think we should be careful in these early stages to avoid creating too many dependencies between the Blueprint concept and this unified concept... — *Brent Sandifer*

### User scenarios for M0

- **Target:** A streamlined flow using a simple document spec approach to build semantic models and create reports.
- **Supported Workloads:** OneLake source, Power BI: Semantic models and reports

#### Example: Ash's workflow

1. Ash is working on a marketing trends analysis request. With M0 unified creator experience now available in Fabric, Ash plans to use it to build a report.
2. Ash can access the unified Copilot from any location. In the immersive Copilot hub, Ash sees system prompts and the prompt for the blueprint, and decides to start from there.
3. **Context binding:** Ash sees "My workspace" is bound as context in Copilot, selects the destination workspace and related folder in the chat box to ensure the created blueprint is saved to the right location. Ash describes the need of creating blueprint based on the uploaded doc.

    *Image description: UI mockup showing a context selection box for workspace/folder and an area to add content.*

4. Ash: "Create a new draft blueprint based on the uploaded document."
5. **Create and preview item:** Copilot drafts the blueprint for the destination workspace and shows the drafted blueprint in the side pane for preview.

    *Image description: UI mockup showing a draft blueprint in a side pane, with editable content and a "Create" button.*

6. Ash reviews the draft content and clicks "Create" to apply changes. The blueprint is created.
7. **Update item content:** Ash updates the blueprint by chatting with Copilot and selects specific parts on the edit page to update them.

    *Image description: UI mockup showing blueprint content being updated, with highlighted changes and options to accept or undo.*

8. Copilot updates the blueprint content based on Ash’s needs, highlighting updated areas for review. Ash accepts the update and continues finalizing the blueprint.
9. **Create multiple items for simple data visualization:** Ash asks Copilot to build related items and reports to get data insights. Copilot outlines tasks, time required, and progress.

    | Objective | Produce a focused, decision-ready analysis that answers the primary business question with validated metrics, supporting diagnostics, and a fit-for-purpose deliverable (report/semantic model/dashboard). |
    |-----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | Status    | IN PROGRESS 0/9 tasks |
    | Progress  | 0% |
    | Time remaining | 56 min |
    | Current task | Confirming objectives and constraints |

10. Copilot creates 2 draft semantic models and 1 report.

    *Image description: UI mockup showing a list of created items (blueprint, semantic models, report) with options to accept, undo, or go to next change.*

11. Ash reviews the semantic models and report, and decides to only keep one semantic model.

### User scenarios for M1 & M2

- **Target:** An end-to-end flow using a spec approach to build complex data solutions
- **Supported Workloads:** Majority Fabric workloads

#### Example: Angela's workflow

1. Angela, a solution architect at Contoso, is tasked with designing a data solution for marketing trends analysis. Workspace A and capacity are ready.
2. Angela leverages unified Copilot to build the solution.
3. **Access Copilot via the Copilot Home Page:** Angela opens Fabric, and the Copilot home page is open for tenants with Copilot enabled. She can start with system prompts for tasks like developing a data solution, creating a blueprint, analyzing data, etc.
4. **Context binding:** Angela selects workspace A in the chat box and uploads a requirements doc. Copilot uses these selections and documents for context.
5. **Create a new item:** Copilot creates a blueprint item and generates content for it. Angela can view, accept, or undo changes.
6. **Update item content:** Angela asks Copilot to regenerate parts of the blueprint, selects sections to update, and reviews the changes.
7. Angela asks Copilot to draft a plan for the data solution and inserts results at the cursor's position.
8. **Create multiple items:** With the blueprint finalized, Copilot drafts items in the workspace, displays a status bar, and indicates progress. Angela can accept all changes at once or individually.
9. **Modify the content of several items at once:** Angela realizes she forgot to specify "Monthly Sales Revenue" in the blueprint. Copilot modifies relevant items, highlights changes, and Angela reviews and accepts/reverts updates as needed.
10. **Delete an item:** Angela decides to delete the report. Copilot asks for confirmation before deleting.
11. **Continue the conversation:** Angela can continue the conversation with Copilot the next day by selecting the chat thread, maintaining context.
12. **Update the item via the Copilot side pane:** Ash learns the data is ready for the report, accesses Copilot in the report edit page, describes the report, and Copilot creates the visuals.

## Key components of the unified experience

- **Copilot Home Page:** Makes chat a first-class interface for actions. Prompt gallery with system prompts for common tasks (e.g., “Develop a data solution,” “Create a blueprint”); bookmarking and quick access to favorite prompts. *(P0)*
- **Persistent Copilot Pane:** Provides Copilot chat access throughout Fabric. *(P1)*
    > **Comment:** Why is this a P1? — *Brent Sandifer*
    > **Reply:** My thought was that in M1, with only the PBI integrates into the unified Copilot, and other workloads would onboard later... — *Dan Liu*
- **Context Selector:** Supports implicit and explicit context selection based on user’s current position, workspace, and open items. Option to upload documents for Copilot to reference. *(P0-P1)*
    > **Comment:** There's a second pivot on this I think we should capture... implicit context selection is critical. — *Brent Sandifer*
    > **Reply:** Thanks for calling this out! Absolutely right—implicit context selection is critical. — *Dan Liu*
- **Multi-Item Navigation in Copilot homepage:** Users can review and edit item context in side-by-side view. Batch operations for creating or updating multiple items at once. *(P0)*
- **Actionable Response Controls:** Users can take actions directly from Copilot responses (e.g., open item, accept, undo, copy, retry, provide feedback). *(P0)*
- **Change Tracking and Diff Viewer:** Show changes (additions, deletions, modifications) made to items, allowing users to review, accept, or undo updates. *(P1)*

- **Chat History and Thread Management:** Continue conversations across sessions and items, with Copilot retaining the thread and context. *(P1)*

- **Robust Error Handling and Edge Case Management:** Handle unexpected situations (long run request, network errors), failures, and unusual user actions (message too large), ensuring a smooth and reliable user experience. *(P0)*

- **Tool selector or model selector:** Lets users pick the most appropriate model or agent for their current context or task. *(P1)*

- **Guided Follow-Ups:** Offer the next question or next action after a response to help users bridge the response with the next step/action.

- **The Inline Copilot Interface in item editor:** *(P2)*

- **Personalized:** AI assistance feels like it's tailored to the user's unique role, needs, and workflows. *(P2)*

## Milestones

| Mil. | Features |
|------|----------|
| **M0** | Deliver foundational unified Copilot capabilities: access from Copilot homepage, select essential context, perform basic apply/undo on Copilot actions, view simple change summaries, and handle basic errors. |
| **M1** | Introduce personalization and enhanced navigation: Persistent Copilot pane supports for other workload items authoring experience, advanced prompt management, multiple workspaces, deep navigation (multi-item, section jumps), highlights within changes, thread persistence. |
| **M2** | Provide full transparency and immersive experiences: Unified Copilot experience becomes available across all Fabric functionalities, the Copilot-centric home to make the AI experience the primary entry point for productivity, the side-by-side diff viewer, multi-item control at scale, full-context binding, complete immersive review flows. |

> **Comment:** I'm not convinced that a Homepage entry point is a requirement for this first Milestone. The primary entry point in my mind is the copilot button on the left nav... — *Brent Sandifer*

> **Reply:** Totally agree with you. For the first milestone, entering from the existing copilot button on left nav makes sense. Move the homepage entry point to M3, when full Copilot capabilities would be available and customization work complete — *Dan Liu*

> **Comment:** To me the persistent pane is an M1 requirement and P0. How else do we deliver a unified Copilot? — *Brent Sandifer*

> **Reply:** Thanks for catching that! My intention was to refer to "Copilot everywhere in Fabric", updated. — *Dan Liu*

## I cans

| Pri. | I cans | Additional details/consideration | Milestones |
|------|--------|----------------------------------|------------|
|      | **Access and Use Copilot** | | |
| P0   | **Copilot Home Page** - I can access Copilot from a single home page | Introduce persistent pane behavior to the immersive Copilot |   |
| P1   | I can browse the prompt gallery to see all available capabilities at a glance. | Workload team can configure and add their prompts into gallery |   |
| P1   | I can bookmark prompts for quick access in the future | Quick access to favorite tasks, making it easy to discover and start common workflows. |   |
| P2   | I can open and rely on unified Copilot to at any page in Fabric | Copilot remains available while editing items with “copilot by your side” experience everywhere in Fabric |   |
| P1   | I can pick the most appropriate models for the conversation | Each conversation can only configure one model |   |
| P1   | I can select the agent for the conversation | |   |
| P2   | I can use the unified Copilot directly from the home page and start a task without first launching an item. | Shift the home page from discovery‑only to Copilot‑centric, so users can start with goals |   |
|      | **Context Selector** - Provide/Bind Context to Copilot | | |
| P0   | I can rely on unified Copilot to automatically understand the context of what I’m working on—such as my current workspace, item. | Users don’t have to manually specify it when asking for help or performing actions |   |
| P1   | I can select a workspace to bind Copilot’s context to the workspace | Ensures all responses and changes (draft items, outputs) are scoped to a specific workspace like Workspace A |   |
| P2   | I can select multiple workspaces to bind Copilot’s context to the workspaces | For cross workspace project, users can provide Copilot access to more than one relevant workspace |   |
| P0   | I can select folders to bind Copilot’s context to folders | Narrow down content scope within a Folder |   |
| P0   | I can select items to bind Copilot’s context to items | Focus responses on specific items |   |
| P0   | I can upload files to provide context to Copilot | |   |
| P1   | I can select parts of an item’s content as context for Copilot | Highlight certain sections for Copilot to revise or regenerate, update. |   |
| P0   | I can see the selected context in the chat box | Visual verification helps the user confirm which context Copilot will use |   |
| P1   | I can revise the prompt that was sent in order to generate a new response. | Adjust tone, scope, or detail in follow-ups without starting over |   |
|      | **Item(s) Navigation and Navigate Between Changes** | | |
| P0   | I can open navigate to the item(s) from the Copilot interface in the side page | Click item links in chat to open them in the Fabric side pane for immediate review. |   |
| P0   | I can view the draft items created by Copilot in the side page | Copilot generates items based on my prompts, displays changes in the side page |   |
| P1   | I can navigate across multiple changed items to see what Copilot proposed. | Quickly step through different updates (e.g., 1 blueprint + 6 new items) with a built-in navigation bar. |   |
| P1   | I can jump directly to a changed section within an item | Save time by scrolling to highlighted revised sections inside items. |   |
|      | **Change Tracking and Diff Viewer** | | |
| P0   | I can view overviews of item changes | e.g. 6 items added; 1 item updated; Identify which items were added, updated, or deleted |   |
| P1   | I can see highlights of changes within each item to understand what’s new, updated, or deleted. | e.g. 2 lines deleted in itemX, Color-coded differences (added = green, removed = red) for fast scanning of edits |   |
| P2   | I can open the Diff Viewer to compare original content with Copilot’s updated version side by side. | Full traceability for sensitive edits before applying them, similar to code review workflows. |   |
|      | **Actionable Response Controls (Preview-Decide-Apply-undo-improve)** | | |
| P0   | I can accept Copilot’s response completely to apply all suggested changes. | Apply all of Copilot’s suggested changes in one click |   |
| P0   | I can accept or reject individual changes selectively, such as specific sections or selected items. | Pick specific changes like blueprint edits while ignoring report changes. |   |
| P0   | I can undo a specific Copilot action immediately after it is applied. | Quick rollback option after applying incorrect updates |   |
| P0   | I can revert changes on a particular item while keeping updates on other items. | Granular control for selective rollback in multi-item workflows |   |
| P1   | I can insert Copilot’s response into a specific position in the item when drafting or editing. | AI inserts content inline without overwriting existing text |   |
| P0   | I can copy results, or provide feedback to the response | |   |
| P0   | I can retry an action if the initial Copilot response does not align with requirements. | Trigger regeneration immediately with modified instructions. |   |
| P0   | I can confirm before performing high-impact actions, such as deleting an item, to prevent accidental loss | Ensuring critical actions require explicit approval. |   |
|      | **Chat History and Thread Management:** | | |
| P1   | I can continue conversations with Copilot across sessions | Persistent personal history allows users to resume without re-uploading context the next day |   |
| P1   | I can select conversation and delete the conversation | Control over data and privacy by removing chat logs that are no longer needed. |   |
|      | **Error Handling and Edge Case Management** | | |
| P0   | I can identify when Copilot cannot perform a requested action | |   |
| P0   | I can read and interpret Copilot’s error messages to understand what went wrong | |   |

## Appendix: Relevant Documents

*(List any referenced or supporting documents here, if needed.)*

## Open questions

*(List any open questions or unresolved issues here.)*

## References

- Medium, UX for AI Products, 2024; Moze Studio, UX design for AI guide, 2024; Raw.Studio, UX Design For Generative AI, 2024; LinkedIn, UI/UX Design for AI Products, 2024; Nielsen Norman Group, Prioritize Smarts over Sentience, 2024
- [Copilot Chat as a Productivity Anchor: Assembling the Anchored AI Puzzle: How to Make Copilot Chat in WXP a Center for Productivity 🧩](https://hits.microsoft.com/Collection/7003546/Section/78570)
- [Assembling the Anchored AI Puzzle How to Make Copilot Chat a Center for Productivity.pptx](https://microsoft.sharepoint.com/:p:/t/OfficeUserInsights/IQCr6QmIxhPVT4LQnKd9Uz8oAdaPzedMhQCdJiFSrWAgRw8?e=rDFGfc)