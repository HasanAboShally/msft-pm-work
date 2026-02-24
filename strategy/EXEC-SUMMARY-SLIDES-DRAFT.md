# Executive Summary Slides — DRAFT FOR REVIEW
## "Embedding Fabric Everywhere" Strategy

**Purpose**: A concise 6-7 slide executive summary to front-load the deck. These slides give busy executives the key messages in ~5 minutes before the detailed slides.

---

## Slide 1: MARKET SHIFTS

**Title**: Three Shifts Are Reshaping How People Work

**Content (three columns)**:

| Search → Chat | Static UIs → Agent UIs | Portals → Embedded |
|---------------|------------------------|-------------------|
| Users ask AI instead of clicking links | AI agents generate on-the-fly interfaces | Users expect platforms to come to them |
| 58.5% of Google searches end in zero clicks | 70% of API developers are MCP-aware | 82% of orgs follow API-first strategies |

**Bottom callout**:
> **What this means for Fabric**: Platforms that only live in a browser portal risk becoming invisible. Fabric must be embeddable, invocable, and composable — wherever users and agents work.

**Speaker notes**: These are macro trends, not Fabric-specific claims. The stats describe customer expectations — they already work this way in their orgs and expect Fabric to meet them where they are.

---

## Slide 2: VISION & THESIS

**Title**: Our Vision: Embedding Fabric Everywhere

**Vision statement** (large, centered):
> "Every Fabric capability should be embeddable, invocable, and composable — by humans, scripts, and AI agents."

**What this means (4 pills below)**:
- Every capability accessible via API
- Key capabilities accessible via MCP
- Every workflow scriptable via CLI
- Full operations possible outside the portal

**Quote at bottom**:
> "The best platforms don't ask users to come to them. They go to where the users are."

**Speaker notes**: Today "Fabric Embed" means embedding a report. Tomorrow it means embedding any Fabric experience — troubleshooting, deployment, monitoring, provisioning. The portal remains the primary UI, but every capability should ALSO be available outside it.

---

## Slide 3: TWO CONSUMERS + THREE LAYERS

**Title**: Who Consumes Fabric & How We Serve Them

**Left side: Two Consumers**

**👤 Human Users**
- Interact via Portal, IDEs, chat, Teams
- Build tools to extend their reach: scripts, CI/CD, Terraform
- Need: rich experiences + complete APIs

**🤖 AI Agents** *(NEW)*
- Interactive (human + copilot) or Autonomous (independent)
- Need: discoverable tools, identity (SPNs), audit trails

> AI agents are standalone consumers — not just tools.

**Right side: Three Layers**

```
┌─────────────────────────────────────┐
│  AGENTIC — AI-Powered Experiences   │
│  MCP Apps · Autonomous Agents       │
├─────────────────────────────────────┤
│      ▼ powered by — or directly ▼   │
├─────────────────────────────────────┤
│  PROGRAMMATIC — Classic Automation  │
│  Provisioning · CI/CD · Monitoring  │
├─────────────────────────────────────┤
│      ▼ powered by                   │
├─────────────────────────────────────┤
│  FOUNDATIONAL — Infrastructure      │
│  APIs · CLI · MCP · SDKs · Identity │
└─────────────────────────────────────┘
```

> Each layer delivers value on its own.

**Side note (small callout)**:
> **What are MCP Apps?** Interactive UIs served by MCP, rendered inline in VS Code, Claude, ChatGPT — e.g., troubleshooting dashboard, pipeline builder.

**Speaker notes**: Humans and AI agents are the two consumer types. Scripts/pipelines are tools humans build, not a separate persona. The three layers serve both — foundation enables programmatic enables agentic, but agentic can also access foundation directly.

---

## Slide 4: WHAT THIS LOOKS LIKE (SCENARIOS)

**Title**: What This Vision Enables

**Three scenario snapshots (compact cards)**:

**Scenario 1: Developer in VS Code**
Pipeline fails → asks Copilot "Why did this fail?" → agent pulls logs via MCP → identifies memory issue → suggests fix → applies it → re-runs pipeline → **4 min vs 20+ min in portal**

**Scenario 2: Business User in Claude Desktop**
"Create a Q4 marketing report" → agent discovers semantic models → suggests layout → user refines → agent creates report via API → schedules refresh → **never opened Fabric portal**

**Scenario 3: Autonomous CI/CD Agent**
PR merged → GitHub Actions triggers → agent deploys to staging → runs validation → tests fail → auto-rollbacks → posts summary to PR → **zero human intervention**

**Scenario 4: Visual Pipeline via MCP App** *(optional)*
Analytics engineer in Claude → asks to configure data pipeline → MCP App renders visual pipeline builder inline → user adjusts → confirms → deployed → **portal-like experience outside the portal**

**Speaker notes**: Same three layers power all scenarios. The difference is the level of human involvement — configurable, not hard-coded.

---

## Slide 5: WHY OUR TEAM

**Title**: Why Us

We own four key pillars that make this vision possible:

| Pillar | What We Own |
|--------|-------------|
| **Embed** | Embedding Fabric items in external apps → expanding to embedding full experiences |
| **APIs & Dev Tools** | Public APIs (110K MAU), CLI (168K downloads), SDKs, Terraform — the foundation layer |
| **MCPs** | Local MCP (GA FabCon Mar '26) + Remote/Hosted MCP — agent connectivity |
| **Platform** | MCP infrastructure enabling other Fabric teams to build their own MCP tools |

> No other team owns both the infrastructure AND the externalization surface.

**Speaker notes**: We're not the in-product Copilot team, not the CI/CD team (Nimrod), not developer acquisition (AppDev). We're the infrastructure team that enables all of them — and the team that externalizes Fabric beyond the portal.

---

## Slide 6: STREAMS + NEXT STEPS

**Title**: What We're Doing & Where to Start

**Top: Three Parallel Streams**

| Stream | Focus | Compounding Effect |
|--------|-------|-------------------|
| **Foundation** | APIs, CLI, SDKs, Identity | Every API completed = one more thing agents can do |
| **Programmatic** | CI/CD, Terraform, Scripting | Every workflow automated = one less portal dependency |
| **Agentic** | MCP Platform, MCP Apps | Every tool published = one more surface where Fabric lives |

> Streams run in parallel, compounding over time.

**Bottom: Proposed Starting Points (Examples)**

| Example Block | Layer | Why It Could Be First |
|---------------|-------|----------------------|
| **API Completeness Sprint** | Foundation | Closes top gaps blocking CLI, SDK, and agent scenarios |
| **CLI v2 Open Source** | Foundation | Becomes the execution layer for humans and agents |
| **MCP Platform MVP** | Agentic | Enables first workload team to publish MCP tools |
| **Troubleshooting MCP App** | Agentic | Proof-of-concept showing all three layers end-to-end |

**CAT Validation Note (small callout)**:
> ⚠️ **Grounded in research**: Troubleshooting is the #1 underserved job from CAT research (opp score 6.1). We're not guessing.

**Closing statement**:
> These are proposed examples — not a committed plan. First we align on vision and direction.

**Speaker notes**: The building blocks are illustrative starting points to show we've thought about what's actionable. We need owners, timelines, and dependencies. Purpose is to show the shape of the work so leadership can endorse direction before we commit resources.

---

# END OF DRAFT

## Notes for Hasan

1. **Slide count**: Now 6 slides total:
   - Slide 1: Market Shifts
   - Slide 2: Vision & Thesis
   - Slide 3: Two Consumers + Three Layers (merged)
   - Slide 4: Scenarios
   - Slide 5: Why Us (4 pillars)
   - Slide 6: Streams + Next Steps (merged)

2. **Scenarios slide**: Kept all 4, but scenario 4 is marked optional — can drop for tighter deck.

3. **Next steps framing**: Changed to "Proposed Starting Points (Examples)" and "proposed examples — not a committed plan" to be clear this isn't locked in.

4. **CAT note**: Kept but made smaller — still shows grounding in research.

Let me know what to tweak before I create the HTML slides!
