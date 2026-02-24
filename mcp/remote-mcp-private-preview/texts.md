✅ Short answer (what you asked for)
“Fabric MCP (Model Context Protocol) is a remote server that exposes Microsoft Fabric’s public APIs as typed tools/resources so AI agents and copilots can discover, reason over, and safely execute Fabric operations. For the private preview, we’re inviting MVPs to connect any MCP‑compatible agent, try a few real workflows, and share feedback on tool accuracy, auth/permissions, success rate on common tasks, and overall trust & guardrails; if interested, please apply here: https://aka.ms/FabricMCP/JoinPrivatePreview.” [Microsoft...cution MCP | Word], [Fabric aut...review new | PowerPoint]

🔎 Optional: a bit more context we want to learn in a private preview
How we generally run private previews (what we’re validating):

Fit & coverage: Does the agent see the right Fabric capabilities through MCP, and are the tools complete enough for real tasks? [Fabric MCP...es for CAT | PowerPoint], [Fabric aut...review new | PowerPoint]
Safety & governance: Do scoped permissions, approval checkpoints, and auditability meet expectations? What boundaries do participants want around “read‑only vs. write” and human‑in‑the‑loop approvals? [Fabric aut...review new | PowerPoint]
UX & adoption: Is it easy to connect an agent and get value quickly, or are there friction points (auth, setup, documentation)? [Fabric Pla...- Krypton | Word]

What’s specific to Fabric MCP (remote MCP) in this preview:

Remote vs. local servers: We’re exercising the remote MCP path (agent ↔ server over network) so participants don’t need to host locally; this also lets us evaluate enterprise policies, RBAC, and auditing in realistic environments. [Microsoft...cution MCP | Word]
Trust & boundaries conversations: We want candid input on comfort levels with agents executing Fabric operations, where they want approvals, and what evidence (logs, diffs, dry‑runs) creates trust. This mirrors what we’re hearing in early customer validations. [Fabric aut...w - Nov 25 | PowerPoint], [MCP LT sync Aug 25 | PowerPoint]

Scenarios we’d like MVPs to try (using any MCP‑compatible agent):

Discover & plan (read‑only): List workspaces/items, inspect schemas, and draft changes without side effects. [Fabric MCP...es for CAT | PowerPoint]
Controlled changes (write with approvals): Create a workspace, deploy a Lakehouse or pipeline, kick off a job, and set permissions—ideally with a human approval step where it makes sense. [Fabric aut...review new | PowerPoint]
Governance & safety: Try “dry‑run” or “show plan” styles before execution; confirm the audit trail shows who/what/when. [Fabric aut...review new | PowerPoint]

What feedback/data we’re collecting (so we can close the loop quickly):

Accuracy: How often does the agent select the right tool & parameters on the first try (and after retries)? Examples of wrong/missing schemas. [Microsoft...cution MCP | Word]
Success rate by scenario: % of tasks completed end‑to‑end (discover → plan → execute → verify), and where they fail (auth, policy, schema gaps). [Fabric aut...review new | PowerPoint]
Safety signals: Where participants want approvals, limits (read‑only vs. destructive), or additional audit detail; comfort level with agents controlling systems. [Fabric aut...w - Nov 25 | PowerPoint], [MCP LT sync Aug 25 | PowerPoint]
Coverage gaps: Fabric operations you expected but couldn’t reach via MCP tools. [Fabric MCP...es for CAT | PowerPoint]
Onboarding friction: Time to first successful action; issues with permissions, setup, or documentation. [Fabric Pla...- Krypton | Word]

Logistics: Apply here → https://aka.ms/FabricMCP/JoinPrivatePreview. We’ll do a short onboarding, a week of “use in the wild,” and a quick read‑out to prioritize fixes. [Microsoft...cution MCP | Word]

(FYI) Grounding from our internal validation work

Customers emphasize scope & security boundaries, desire to encapsulate org best practices, and interest in Microsoft‑hosted MCP options—along with predictable costs and auditability. [Fabric aut...w - Nov 25 | PowerPoint], [MCP LT sync Aug 25 | PowerPoint]
Our platform MCP design explicitly includes RBAC, approvals, and audit to enable safe automation at scale. [Fabric aut...review new | PowerPoint]

If you want, I can also turn this into a tight one‑pager or a mail draft to share more broadly with the MVP community.



------


Fabric MCP Server is a remote MCP endpoint that exposes Fabric’s public APIs as typed tools so MCP‑compatible agents can safely discover and execute Fabric operations. In the private preview, we’re asking MVPs to connect an agent, try a few end‑to‑end workflows, and share feedback on tool accuracy, auth/RBAC, task success rates, and trust/guardrails. Interested? Apply here: https://aka.ms/FabricMCP/JoinPrivatePreview.


------



Fabric MCP Server is a remote server that implements the open Model Context Protocol (MCP) and gives AI agents a safe, typed way to navigate and operate Microsoft Fabric. Today it exposes Fabric’s public APIs as tools/resources so agents and copilots can discover, reason over, and execute common Fabric operations with appropriate guardrails. It’s evolving quickly, and this private preview helps us focus on what matters most for customers.
For the private preview, we’re inviting MVPs to connect any MCP‑compatible agent, run a few end‑to‑end workflows, and share structured feedback on:
• Accuracy: does the agent pick the right tool/parameters, and how many retries are needed?
• Auth & permissions: what breaks (or confuses) setup, consent, and RBAC?
• Task success rate: % of scenarios completed start‑to‑finish; where do they fail (schemas, coverage, policies)?
• Trust & guardrails: comfort with read‑only vs. write actions, where approvals are needed, and whether auditing gives enough confidence.
• Onboarding friction: time‑to‑first‑action, docs clarity, and any setup hurdles.
We’d also love to chat with a subset of participants about the broader agentic landscape—human‑in‑the‑loop expectations, boundaries for destructive operations, preferences for Microsoft‑hosted/org‑hosted MCPs, and how they see MCP fitting across their stack.
Interested in trying it out? Apply here: https://aka.ms/FabricMCP/JoinPrivatePreview



 