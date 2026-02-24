const pptxgen = require('pptxgenjs');
const path = require('path');

// html2pptx library path
const html2pptx = require(path.resolve(__dirname, '../../.copilot/skills/pptx/scripts/html2pptx.js'));

const SLIDES_DIR = path.join(__dirname, 'slides');
const ASSETS_DIR = path.join(__dirname, 'assets');
const OUTPUT_FILE = path.join(__dirname, 'DXA-Strategy-Embedding-Fabric-Everywhere.pptx');

const slides = [
  {
    file: 'slide01-title.html',
    notes: `TITLE SLIDE — Embedding Fabric Everywhere: A Strategy for the Agentic Era

Opening remarks:
- Thank everyone for their time at this retreat
- Frame this as a strategic conversation, not a product pitch
- "I want to share a vision for how Fabric's developer surface needs to evolve — and why our team is uniquely positioned to lead it."
- Mention this is backed by real research data (CAT interviews, market data, industry reports)
- Set expectation: ~15 min presentation, then open discussion`
  },
  {
    file: 'slide02-world-changing.html',
    notes: `THE WORLD IS CHANGING — Three Fundamental Shifts

Key talking points:
1. SEARCH → CHAT: 58.5% of Google searches end with zero clicks (SparkToro/Datos 2024). Users increasingly ask AI instead of browsing. Gartner predicts 25% drop in traditional search by 2026.
2. WEBSITES → ON-THE-FLY UI: 70% of API professionals are now MCP-aware (Postman 2025). Agents generate custom interfaces on demand rather than navigating static pages.
3. PORTALS → EMBEDDED: 82% of organizations follow API-first strategies (Postman 2025). Users expect capabilities embedded where they already work — VS Code, CI/CD, Slack — not in separate portals.

The implication: If your product is only accessible through a browser portal, you're invisible to the fastest-growing interaction patterns.`
  },
  {
    file: 'slide03-problem.html',
    notes: `WHAT THIS MEANS FOR FABRIC — The Portal-First Risk

Key talking points:
- Fabric is portal-first by design. That was fine in the browser era. But in the agentic era, this becomes a liability.
- 76% of developers are using or planning to use AI tools (Stack Overflow 2024). They expect to interact with platforms through AI, not through browser tabs.
- AI agent market projected at $52.6B by 2030 at 46.3% CAGR (MarketsandMarkets) — this isn't speculative, it's the market trajectory.
- Our MCP Server went from 10 to 200+ tool calls per day in 8 weeks — organic adoption is already happening.
- 51% of API professionals worry about AI agent security (Postman 2025) — showing this is real enough that security concerns are mainstream.

The risk: If we don't make Fabric embeddable, agents will default to platforms that are (AWS, Snowflake, Databricks all have MCP servers already).`
  },
  {
    file: 'slide04-thesis.html',
    notes: `CORE THESIS — The One Sentence That Drives Everything

"Every Fabric capability should be embeddable, invocable, and composable — by humans, by scripts, and by AI agents."

Unpack each word:
- EMBEDDABLE: Works inside tools users already use (VS Code, CI/CD, Slack, custom apps)
- INVOCABLE: Can be called programmatically — APIs, CLI, SDKs, MCP
- COMPOSABLE: Can be combined into larger workflows and pipelines

The examples show this in action:
- A GitHub Action that deploys a Fabric pipeline = embeddable + invocable
- An MCP agent that diagnoses failures in VS Code = embeddable + composable
- A CLI script that provisions an entire workspace = invocable + composable

This thesis is the strategic filter: every investment we make should move us toward this.`
  },
  {
    file: 'slide05-two-modes.html',
    notes: `TWO MODES OF AGENT INTERACTION

Interactive Agents (human-in-the-loop):
- Developer or data engineer chats with Copilot / Claude / ChatGPT
- Agent has access to Fabric via MCP tools
- Human approves actions, asks follow-ups
- Example: "Show me failed pipelines" → agent queries Fabric, shows results, suggests fixes
- Surface: VS Code, chat interfaces, Fabric MCP App

Autonomous Agents (background operations):
- No human in the loop — triggered by events, schedules, or other agents
- Runs CI/CD, cost optimization, monitoring workflows automatically
- Example: GitHub Action detects schema change → validates downstream pipelines → deploys
- Surface: GitHub Actions, Azure Pipelines, cron jobs, event triggers

Both modes require the same foundation: APIs, CLI, SDKs, MCP tools. That's why we talk about a two-layer architecture.`
  },
  {
    file: 'slide06-architecture.html',
    notes: `TWO-LAYER ARCHITECTURE — The Strategic Framework

AGENTIC LAYER (top):
- Interactive: MCP App, Copilot extensions, chat-based agent experiences
- Autonomous: CI/CD integrations, scheduled workflows, event-driven pipelines
- Customer MCP: Customers building their OWN agents on top of Fabric

FOUNDATIONAL LAYER (bottom):
- REST APIs: The atomic operations that everything else calls
- CLI: Automation backbone for scripting and DevOps
- SDKs: Python, .NET, JavaScript — ecosystem reach
- MCP Server: AI agent integration point
- Auth & Identity: Secure access for both humans and agents
- Monitoring APIs: Unified logging, metrics, health checks

CRITICAL INSIGHT: The foundational layer must be built first. You cannot have great agent experiences on top of broken or missing APIs. This is why Phase 1 of our roadmap is all about foundation.

Think of it like a building: the agentic layer is the beautiful penthouse, but it collapses without the foundation.`
  },
  {
    file: 'slide07-evidence.html',
    notes: `EVIDENCE — CAT Research Validates the Vision

This data comes from the Customer Advisory Team's research with real Fabric enterprise customers.

Key numbers:
- 220 issues tracked across all customer engagements
- 13 distinct jobs-to-be-done identified
- 6.1/10 average opportunity score (significant unmet needs)
- ~90% of identified scenarios suitable for automation

The 4 priority areas (highest opportunity scores):
1. CI/CD Integration — Customers desperately need GitHub/ADO pipeline integration
2. Monitoring & Troubleshooting — The #1 pain point. Current experience requires 8+ steps across multiple tools
3. Cost Optimization — Automated capacity and cost management
4. Access Management — Programmatic identity and permissions

NPS of only 12 for current developer experience — this tells us clearly that what we have today isn't good enough.

These aren't hypothetical needs — they're validated by enterprise customers who are actively trying to use Fabric programmatically and hitting walls.`
  },
  {
    file: 'slide08-quotes.html',
    notes: `DEVELOPER VOICES — Real Quotes from CAT Research

These are actual quotes from enterprise Fabric customers:

Quote 1 (Monitoring): "We need a way to get centralized monitoring across all Fabric components — not jump between 5 different screens."
→ This directly validates our need for unified monitoring APIs

Quote 2 (CI/CD): "We're stuck doing manual deployments because there's no good way to integrate Fabric into our existing GitHub Actions workflows."
→ This validates the autonomous agent layer — CI/CD pipelines as the first killer use case

Quote 3 (Identity): "Managing access at scale is impossible through the portal. We need programmatic control."
→ This validates the foundational API layer for identity and access management

The Gloria Mark research (UC Irvine) adds context: it takes 23 minutes and 15 seconds to refocus after a context switch. Every time a developer has to leave their IDE to go to the Fabric portal, they lose 23+ minutes of productive flow. This is the human cost of portal-only design.`
  },
  {
    file: 'slide09-troubleshooting.html',
    notes: `MAKING IT REAL — Troubleshooting Today vs Tomorrow

This slide makes the vision concrete by showing the #1 pain point (monitoring/troubleshooting) and how both layers work together.

TODAY (left side):
Walk through the 8 steps — this is the actual experience our customers described in CAT research:
1. Open portal, navigate to workspace, find pipeline, open run history
2. Find the failed run, read a vague error message
3. Switch to Azure Monitor, search scattered logs
4. Manually correlate timestamps between Spark, Pipeline, and Eventhouse
5. Google the error, find an old community post
6. Try a fix, redeploy, wait, repeat
→ Result: Hours to resolution. And remember — each context switch costs 23+ minutes of focus.

TOMORROW (right side):
- FOUNDATIONAL LAYER makes it possible: Unified logging API, CLI access to logs, error enrichment
- AGENTIC LAYER makes it accessible: The MCP App in VS Code shows failure details, root cause analysis, confidence scores, and one-click actions — all without leaving the IDE

Key message: You need BOTH layers. The foundation without the agent layer is just more APIs. The agent layer without the foundation has nothing to call.`
  },
  {
    file: 'slide10-why-our-team.html',
    notes: `WHY DXA — We Already Own the Building Blocks

This is about organizational alignment, not self-promotion:

DXA uniquely owns:
1. Fabric MCP Server — the agentic layer entry point (already shipping)
2. Fabric REST APIs — the programmatic foundation (our core charter)
3. Fabric CLI — automation backbone for DevOps (actively developing v2)
4. Fabric SDKs — Python, .NET, JS for ecosystem reach

No other team in Fabric has this combination. Other teams own individual workloads (Data Engineering, Data Science, etc.), but we own the horizontal automation and developer experience layer.

The ask: We need charter clarity to formalize MCP App ownership. Today our charter covers APIs + CLI + SDKs + MCP Server. The MCP App (the interactive agent experience) is a natural extension but needs explicit endorsement.

Bottom line: The foundational investment in APIs, CLI, and SDKs directly enables the agentic layer. We don't need to build two separate things — the foundation IS the enabling layer for agent experiences.`
  },
  {
    file: 'slide11-urgency.html',
    notes: `COMPETITIVE URGENCY — Everyone Else Is Already Moving

This is the "burning platform" slide. Be specific about competitors:

AWS: Already has MCP servers for Bedrock, Lambda, S3. Agent-first workflows in production. Deep integration with developer tools.

Snowflake: MCP server shipping GA. Cortex AI layer enables agent-driven analytics. Developer experience is a key differentiator for them.

Databricks: MCP server for Unity Catalog. Agent-native data governance. Their philosophy is developer-first by design.

Market signals:
- 82% API-first (Postman 2025) — the market has already decided that API-first wins
- 70% MCP-aware but only 10% actively using — massive early-mover advantage window
- $52.6B AI agent market by 2030 — the trajectory is clear

The window is narrow: We're in the "70% aware, 10% using" sweet spot. First platforms to deliver great MCP experiences will capture the early majority. If we wait until MCP is mainstream, it's too late — developers will have already chosen their default agent-enabled data platform.

Timeline at bottom: NOW (ship foundations) → 6 months (MCP App GA) → 12 months (market leader position). Speed matters more than perfection.`
  },
  {
    file: 'slide12-roadmap.html',
    notes: `PHASED ROADMAP — Three Phases of Execution

PHASE 1: Build the Foundation (H2 2025 - H1 2026)
- REST API gap closure: Audit every workload, identify missing APIs, prioritize by customer impact
- Unified monitoring APIs: Single API surface for logs across Spark, Pipeline, Eventhouse, Lakehouse
- CLI v2: Automation-first redesign with scriptability, JSON output, proper exit codes
- SDK improvements: Better Python experience (the #1 language for data professionals)
- MCP Server quality: Reliability, performance, broader tool coverage

PHASE 2: Light Up the Agentic Layer (H2 2026 - H1 2027)
- MCP App GA: The interactive agent experience in VS Code and beyond
- CI/CD integration: Native GitHub Actions and Azure Pipelines support
- Customer MCP Server GA: Customers can build their own agent experiences
- Smart error resolution: AI-powered root cause analysis and recommendations
- Autonomous workflow patterns: Templates for common automation scenarios

PHASE 3: Scale and Differentiate (H2 2027 - 2029)
- Full autonomous data operations
- Multi-platform embeddings (beyond VS Code)
- Third-party ecosystem enablement
- Industry-specific agent templates
- Fabric becomes the default embedded data layer

The workstreams row shows that APIs, CLI, MCP, SDKs, and DevOps run continuously across all phases — they're not one-time investments but ongoing capabilities.`
  },
  {
    file: 'slide13-asks.html',
    notes: `THE ASK — Five Decisions We Need From This Retreat

Be direct and specific:

1. ENDORSE THE THESIS: "Every Fabric capability should be embeddable, invocable, and composable." This becomes our strategic filter for prioritization. If an investment doesn't move us toward this, we question it.

2. COMMIT TO FOUNDATIONAL INVESTMENT: REST API gap closure and unified monitoring APIs are the highest-leverage investments we can make. Without these, nothing above them works. This may mean deprioritizing some portal-only features.

3. GREENLIGHT MCP APP PROOF-OF-CONCEPT: We propose a focused prototype for the troubleshooting scenario (the #1 pain point from CAT research). Small team, 2-3 month sprint, concrete deliverable to validate the vision.

4. ALIGN ON PHASING: Foundation first (now), then agentic (2026-27), then scale (2027-29). This prevents us from chasing shiny agent demos before the infrastructure is ready.

5. CLARIFY CHARTER EXPANSION: Formalize DXA's mandate to own the full embed+invoke+compose surface. Today we own APIs + CLI + SDKs + MCP Server. We're asking to also own the MCP App (interactive agent experiences).

These five decisions are the minimum viable alignment needed to turn this vision into a funded execution plan. We're not asking for unlimited resources — we're asking for direction and commitment.`
  },
  {
    file: 'slide14-closing.html',
    notes: `CLOSING VISION — The Future State

Read the vision statement with conviction:
"By 2029, Fabric is not just a portal you visit — it is the data layer embedded in every tool, workflow, and agent your customers already use."

Walk through the six outcomes (the pills/badges):
1. Every capability has an API — complete programmatic coverage
2. Every API has an MCP tool — full agent accessibility
3. Every workflow scriptable via CLI — automation backbone
4. AI agents operate Fabric natively — seamless integration
5. Customers build on our platform — ecosystem flywheel
6. Zero-portal operations possible — true embeddability

Closing quote: "The platforms that win are the ones that disappear into the workflow."
→ This is the ultimate test. When Fabric works so well that users don't even realize they're using Fabric — that's when we've won.

Final remarks:
- Thank the team for listening
- Emphasize this is a conversation starter, not a final plan
- Open the floor for discussion and questions
- "The window is open. Let's not miss it."`
  }
];

async function buildPresentation() {
  console.log('Building presentation...');
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Hasan Abo Shally';
  pptx.company = 'Microsoft — Fabric DXA Team';
  pptx.title = 'Embedding Fabric Everywhere: A Strategy for the Agentic Era';
  pptx.subject = 'DXA Team Leadership Retreat — Strategic Vision';

  for (let i = 0; i < slides.length; i++) {
    const slideInfo = slides[i];
    const htmlPath = path.join(SLIDES_DIR, slideInfo.file);
    console.log(`  Processing slide ${i + 1}: ${slideInfo.file}`);

    const { slide } = await html2pptx(htmlPath, pptx);
    slide.addNotes(slideInfo.notes);
  }

  await pptx.writeFile({ fileName: OUTPUT_FILE });
  console.log(`\nPresentation saved to: ${OUTPUT_FILE}`);
}

buildPresentation().catch(err => {
  console.error('Error building presentation:', err);
  process.exit(1);
});
