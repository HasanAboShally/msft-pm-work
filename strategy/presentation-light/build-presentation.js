const pptxgen = require('pptxgenjs');
const path = require('path');

const html2pptx = require(path.resolve(__dirname, '../../.copilot/skills/pptx/scripts/html2pptx.js'));

const SLIDES_DIR = path.join(__dirname, 'slides');
const OUTPUT_FILE = '/Users/hasan-msft/Library/CloudStorage/OneDrive-Microsoft/hasan-shared-work/Embedding-Fabric-Everywhere.pptx';

const slides = [
  // ═══════════════════════════════════════════════════════════════
  // SECTION A: OUR TEAM & DIRECTION (slides 1-4)
  // ═══════════════════════════════════════════════════════════════
  {
    file: 'slide01-title.html',
    notes: `TITLE SLIDE — Embedding Fabric Everywhere: A Strategy for the Agentic Era

This presentation lays out a strategic vision for how Microsoft Fabric's developer and automation surface needs to evolve.

Team: Fabric Embed and Automation Team (Alon Baram — Lead PM, Hasan Abo Shally — Senior PM, Evelina Alroy-Brin — Senior PM). GPM: Aviv Ezrachi. Organization: Kim Manis — Fabric Platform.`
  },
  {
    file: 'slide02-vision.html',
    notes: `WHERE WE'RE HEADED — The North Star

"By 2029, Fabric is not just a portal you visit — it is the data platform embedded in every tool, workflow, and agent your customers already use."

Six outcomes that define success:
1. Every capability has an API
2. Every API has an MCP tool
3. Every workflow scriptable via CLI
4. AI agents operate Fabric natively
5. Customers extend the platform
6. Zero-portal operations possible

"The best platforms don't ask users to come to them. They go to where the users are."`
  },
  {
    file: 'slide12-why-us.html',
    notes: `WHY OUR TEAM — WE ALREADY OWN THE BUILDING BLOCKS

We open with our credentials early because the audience needs to understand who we are and why this vision belongs to our team.

1. FABRIC EMBED: We embed Fabric items into external apps today. This vision extends that.
2. PUBLIC APIs: We own the foundational layer — 110K MAU, 13% MoM growth.
3. FABRIC MCP (Local + Hosted): Local MCP launching GA at FabCon March 2026. Remote MCP in development.
4. CLI: Composable execution layer. 168K downloads, 17% MoM growth.
5. SDKs + TERRAFORM: .NET SDK GA, Python SDK preview, Terraform 489 MAU.
6. MCP PLATFORM: We provide the MCP infrastructure for additional Fabric teams — so they can build their own MCP tools and apps.

KEY: We are the ONLY team that owns both the foundational infrastructure AND the embedding surface. Plus, as the platform/automation team, we also provide the tooling and infrastructure for other Fabric teams.`
  },
  {
    file: 'slide04-bridge.html',
    notes: `FROM FIVE DIRECTIONS TO ONE STORY

This slide bridges from the last strategy discussion where we presented 5 directions. We show how they're NOT abandoned — they're contextualized within a larger, unified strategy.

Dir 1: Scripting within Fabric → Programmatic Layer
Dir 2: VS Code Experiences → All Three Layers
Dir 3: Functions as MCP Tools → Agentic Layer
Dir 4: Externalizing Agentic Capabilities → Agentic Layer
Dir 5: AI-Powered Provisioning → Agentic Layer

The key message: The directions are stronger together than as separate initiatives.`
  },

  // ═══════════════════════════════════════════════════════════════
  // SECTION B: THE STRATEGIC CASE (slides 5-11)
  // ═══════════════════════════════════════════════════════════════
  {
    file: 'slide03-shifts.html',
    notes: `THREE SHIFTS RESHAPING HOW PEOPLE WORK

1. SEARCH to CHAT: 58.5% of Google searches end with zero clicks (SparkToro/Datos 2024).
2. STATIC UIs to AGENT UIs: 70% of API professionals are MCP-aware (Postman 2025).
3. PORTALS to EMBEDDED: 82% of organizations follow API-first strategies (Postman 2025).

Implication: If your product only lives in a browser portal, you're becoming invisible.`
  },
  {
    file: 'slide04-problem.html',
    notes: `WHAT THIS MEANS FOR FABRIC

Fabric is a powerful SaaS platform — and that brought real strengths in simplicity and reach. But today, not all Fabric capabilities are accessible outside the portal.

Key stats:
- 76% of developers use or plan AI assistants (Stack Overflow 2024)
- 89% of API devs use generative AI daily (Postman 2025)
- $52.6B AI agent market by 2030 (MarketsandMarkets)
- Heavy Fabric user NPS is only 12 vs 42 overall

To stay relevant, Fabric needs to become fully embeddable and automatable — meeting users wherever they work.`
  },
  {
    file: 'slide05-thesis.html',
    notes: `CORE THESIS

"Every Fabric capability should be embeddable, invocable, and composable — by humans, scripts, and AI agents."

Four people-centric examples:
1. Developer troubleshoots from VS Code
2. ChatGPT user provisions a workspace
3. Autonomous CI/CD agent deploys and monitors
4. Citizen developer builds a pipeline inside Copilot

Today "Fabric Embed" means embedding a report. Tomorrow it means embedding any Fabric experience.`
  },
  {
    file: 'slide06-personas.html',
    notes: `TWO TYPES OF CONSUMERS THAT USE FABRIC

1. HUMAN USERS — interact through portals, IDEs, chat, Teams
   - Humans also build scripts, CI/CD pipelines, Terraform, and PowerShell as TOOLS to extend their reach
   - Scripts are not a separate persona — they're tools humans use

2. AI AGENTS — a new standalone consumer with two modes:
   - Interactive: Human + AI copilot working together (e.g., Copilot in VS Code)
   - Autonomous: Operates independently — monitoring, deploying, governing (e.g., CI/CD agent)

The same foundational infrastructure (APIs, CLI, MCP) serves both, but AI agents need additional capabilities like identity, governance, and tool discovery.`
  },
  {
    file: 'slide07-architecture.html',
    notes: `THREE-LAYER ARCHITECTURE

AGENTIC (top): MCP Apps, Autonomous Agents, Customer MCP Tools
PROGRAMMATIC (middle): CI/CD, Scripts, Terraform, Scheduled Jobs — immediate value today
FOUNDATIONAL (bottom): REST APIs, CLI, MCP Server, SDKs, Identity/Governance, Monitoring APIs

The agentic layer can also access the foundational layer directly — not everything needs to go through programmatic.

Each layer delivers value on its own. You don't need to wait for agents to benefit.`
  },
  {
    file: 'slide08-mcp-apps.html',
    notes: `WHAT ARE MCP APPS?

MCP Apps are an extension to the MCP protocol that lets servers return interactive HTML UIs — dashboards, forms, data visualizations — that render directly inside the AI chat.

The user stays in their conversation. No context switching. No browser tabs.

How it works:
1. User asks a question in Claude, VS Code, or ChatGPT
2. MCP Server processes the request and builds an interactive UI
3. MCP App renders inline in the chat
4. Bidirectional: the app can call MCP tools and the host pushes updates

Fabric MCP App examples:
- Troubleshooting dashboard (root cause analysis inline in VS Code)
- Visual pipeline builder (drag-and-drop in Claude Desktop)
- Capacity monitor (real-time charts in any chat surface)

Supported hosts: Claude Desktop, VS Code, Goose, Postman
Docs: modelcontextprotocol.io/docs/extensions/apps
Examples: github.com/modelcontextprotocol/ext-apps`
  },
  {
    file: 'slide10-approach.html',
    notes: `HOW WE WORK: PARALLEL STREAMS

These aren't sequential phases — they're parallel streams. We already have agents today. As we strengthen the foundation, every layer gets more powerful.

Stream 1: Strengthen the Foundation — API gaps, throttling, monitoring, CLI v2, SPN
Stream 2: Unlock Automation — CI/CD, IaC, scripted workflows, Terraform, GitHub Actions
Stream 3: Light Up Agents — Remote MCP, MCP Apps, autonomous workflows, customer tools

The compounding effect: Better APIs → more reliable scripts → more capable agents → more people reached.`
  },

  // ═══════════════════════════════════════════════════════════════
  // SECTION C: END-TO-END SCENARIOS (slides 12-15)
  // ═══════════════════════════════════════════════════════════════
  {
    file: 'slide11-scenario-dev.html',
    notes: `SCENARIO 1: DEVELOPER TROUBLESHOOTING FROM VS CODE

Persona: Data Engineer | Where: VS Code with GitHub Copilot | Goal: Fix a failing pipeline

1. Pipeline fails — notification in VS Code
2. Check logs via CLI — fab pipeline logs --live
3. Ask Copilot for help
4. MCP App renders insights — root cause with 87% confidence
5. One-click fix — remediation options inline
6. Agent executes — applies fix via API, re-triggers pipeline (with approval)
7. Resolved — minutes, not hours. Zero portal visits.

Layers: Foundation (Logging API, CLI) → Programmatic (scriptable commands) → Agentic (MCP App, Copilot)

Grounded in #1 CAT research pain point (troubleshooting, opp score 6.1).`
  },
  {
    file: 'slide12-scenario-business.html',
    notes: `SCENARIO 2: BUSINESS USER CREATES A REPORT FROM CLAUDE DESKTOP

Persona: Business Analyst | Where: Claude Desktop (org account) | Goal: Create and share a visual report

1. Need arises — needs Q4 sales report in 2 hours
2. Opens Claude Desktop — types request in natural language
3. MCP discovers workspace — finds available datasets
4. Builds the report — Power BI report with regional breakdowns
5. Preview and refine — MCP App renders preview, asks for Q3 comparison
6. Embed and share — generates embed code for SharePoint
7. Ready to present — polished report, never opened Fabric portal

Layers: Foundation (APIs, workspace access) → Agentic (MCP tools, interactive experience)

Shows how Fabric can reach business users who would never navigate the portal.`
  },
  {
    file: 'slide13-scenario-agent.html',
    notes: `SCENARIO 3: AUTONOMOUS CI/CD AGENT MANAGES DEPLOYMENTS

Persona: Autonomous Deployment Agent | Where: GitHub Actions | Goal: Deploy, validate, monitor

1. Code merged — PR merged to main
2. Agent triggered — GitHub Actions workflow starts
3. Deploy via CLI — fab deploy --workspace staging
4. Run validation — triggers test pipelines, monitors via APIs
5. Promote to production — tests pass, promotes
6. Continuous monitoring — auto-rollback on failure within 24h
7. Full audit trail — every action under agent's SPN identity

Layers: Foundation (APIs, CLI, Identity/SPN) → Programmatic (CI/CD pipeline) → Agentic (autonomous monitoring/rollback)

Shows the fully autonomous persona — no human in the loop after PR merge.`
  },
  {
    file: 'slide14-scenario-pipeline.html',
    notes: `SCENARIO 4: VISUAL PIPELINE CONFIGURATION VIA MCP APP

Persona: Analytics Engineer | Where: Claude Desktop | Goal: Build a data pipeline without navigating the portal

1. Describe the pipeline — user tells Claude what they need in natural language
2. MCP discovers resources — lists workspaces, lakehouses, connections
3. Visual pipeline builder renders as MCP App — interactive drag-and-drop inline in Claude
4. User refines visually — adds data quality check, adjusts Spark pool, adds schedule trigger
5. Validate and preview — Claude validates config and shows sample data
6. Deploy with one click — pipeline created in target workspace via API
7. Pipeline live — production-ready, configured visually, zero portal visits

Layers: Foundation (APIs, workspace access) → Agentic (MCP App visual builder, Claude interaction)

This scenario specifically demonstrates MCP Apps — the visual, interactive experience that goes beyond text responses.`
  },

  // ═══════════════════════════════════════════════════════════════
  // SECTION D: BUILDING BLOCKS & PLAN (slides 16-20)
  // ═══════════════════════════════════════════════════════════════
  {
    file: 'slide14-building-blocks.html',
    notes: `BUILDING BLOCKS: WHAT WE NEED TO BUILD

Foundation: Internal API Tooling, CLI v2, SDK Expansion, Identity & SPN, Monitoring APIs
Programmatic: Terraform Coverage, CI/CD Toolkit, Scripting in Fabric
Agentic: MCP Platform, MCP Apps, MCP Tools Library

This is a living list. Teams can add their building blocks to this framework.`
  },
  {
    file: 'slide15-block-template.html',
    notes: `BUILDING BLOCK TEMPLATE — For individual efforts

Empty template with structured fields: Owner, Layer, Description, Key Deliverables, Dependencies, Scenarios Enabled, Status.

Teams should copy this template for each effort they want to add.`
  },
  {
    file: 'slide16-block-template2.html',
    notes: `BUILDING BLOCK TEMPLATE (continued) — Additional effort template

Another empty template for teams to fill in collaboratively.`
  },
  {
    file: 'slide17-tactical-v2.html',
    notes: `WHERE WE THINK WE SHOULD START

Four building blocks we propose to invest in first — each unlocks capabilities across the three-layer model.

1. API Gaps & Throttling (Foundation) — Prerequisite for everything else
2. Internal API Tooling (Foundation) — As platform team, we accelerate the entire Fabric ecosystem
3. Troubleshooting MCP App (Agentic) — Proof-of-concept of the full three-layer model, grounded in #1 CAT pain point
4. CLI v2 + Scripting (Programmatic) — Open-source, extensible execution backbone

IMPORTANT: This is NOT a full plan yet. We first need alignment on the vision and three-layer model. Once aligned, we scope and timeline together.

Why these four? They span all three layers, address the #1 customer pain point, and each one compounds across the strategy.`
  },

  // ═══════════════════════════════════════════════════════════════
  // SECTION E: EVIDENCE & URGENCY (slides 21-22)
  // ═══════════════════════════════════════════════════════════════
  {
    file: 'slide09-evidence.html',
    notes: `CAT RESEARCH — WHAT REAL CUSTOMERS ARE TELLING US

56 hours of 1:1 interviews, 220 unique issues, 13 underserved jobs.
Top pain: Troubleshooting (opp score 6.1). NPS 12 for heavy users.

Four priorities: CI/CD, Monitoring/Troubleshooting, Cost Optimization, Access/Identity.
All map directly to the three-layer strategy.`
  },
  {
    file: 'slide11-urgency.html',
    notes: `COMPETITIVE URGENCY

AWS, Snowflake, Databricks all shipping MCP servers.
82% API-first, 70% MCP-aware, $52.6B agent market by 2030.

The window to establish Fabric as the embedded data platform is narrow.`
  },

  // ═══════════════════════════════════════════════════════════════
  // CLOSING (slide 23)
  // ═══════════════════════════════════════════════════════════════
  {
    file: 'slide13-closing.html',
    notes: `CLOSING — THE VISION SUMMARIZED

"Fabric is not just a portal. It is the data layer embedded in every tool, workflow, and agent."

Three layers: Foundation → Programmatic → Agentic

"The platforms that win are the ones that disappear into the workflow."

This presentation is collaborative. Teams can add slides, building blocks, and scenarios.`
  }
];

async function buildPresentation() {
  console.log(`Building presentation (${slides.length} slides)...`);
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Hasan Abo Shally';
  pptx.company = 'Microsoft — Fabric Embed and Automation Team';
  pptx.title = 'Embedding Fabric Everywhere: A Strategy for the Agentic Era';
  pptx.subject = 'Strategic Vision — February 2026';

  for (let i = 0; i < slides.length; i++) {
    const s = slides[i];
    const htmlPath = path.join(SLIDES_DIR, s.file);
    console.log(`  Slide ${i + 1}: ${s.file}`);

    const { slide } = await html2pptx(htmlPath, pptx);
    slide.addNotes(s.notes);
  }

  await pptx.writeFile({ fileName: OUTPUT_FILE });
  console.log(`\nSaved to: ${OUTPUT_FILE}`);
  console.log(`Total slides: ${slides.length}`);
}

buildPresentation().catch(err => {
  console.error('Build error:', err);
  process.exit(1);
});
