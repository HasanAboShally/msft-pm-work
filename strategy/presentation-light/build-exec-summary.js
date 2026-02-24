const pptxgen = require('pptxgenjs');
const path = require('path');

const html2pptx = require(path.resolve(__dirname, '../../.copilot/skills/pptx/scripts/html2pptx.js'));

const SLIDES_DIR = path.join(__dirname, 'slides');
const OUTPUT_FILE = '/Users/hasan-msft/Desktop/Exec-Summary-Embedding-Fabric.pptx';

const slides = [
  // ═══════════════════════════════════════════════════════════════
  // EXECUTIVE SUMMARY (8 slides - clean, minimal design)
  // ═══════════════════════════════════════════════════════════════
  {
    file: 'exec01-intro.html',
    notes: `EXECUTIVE SUMMARY — SLIDE 1: Introduction

This slide provides a one-paragraph executive summary of what we're proposing.

KEY MESSAGE: We're proposing to expand our charter from "Fabric Embed" (reports only) to "Embedding Fabric Everywhere" — making every capability accessible via APIs, CLI, and MCP.

ASK: Endorse the vision, commit to foundational investment, and greenlight a proof-of-concept (Troubleshooting MCP App).`
  },
  {
    file: 'exec02-shifts.html',
    notes: `EXECUTIVE SUMMARY — SLIDE 2: Market Shifts

Three macro trends reshaping how people work:
1. Search → Chat: 58.5% of Google searches end in zero clicks (SparkToro 2024)
2. Static UIs → Agent UIs: 70% of API developers are MCP-aware (Postman 2025)
3. Portals → Embedded: 82% of orgs follow API-first strategies (Postman 2025)

BOTTOM LINE: Platforms that only live in a browser portal risk becoming invisible.

NOTE: These stats describe customer expectations — they already work this way in their orgs.`
  },
  {
    file: 'exec03-vision.html',
    notes: `EXECUTIVE SUMMARY — SLIDE 3: Vision & Thesis

VISION: "Every Fabric capability should be embeddable, invocable, and composable — by humans, scripts, and AI agents."

What this means:
- Every capability accessible via API
- Key capabilities accessible via MCP (for AI agents)
- Every workflow scriptable via CLI
- Full operations possible outside the portal

BOTTOM LINE: The portal is one surface, not the only surface. It remains the primary UI, but every capability should ALSO be available outside it.`
  },
  {
    file: 'exec04-consumers.html',
    notes: `EXECUTIVE SUMMARY — SLIDE 4: Two Consumer Types

TWO CONSUMERS:
1. Human Users — interact via Portal, IDEs, chat, Teams. Build tools to extend their reach (scripts, CI/CD, Terraform).
2. AI Agents (NEW) — Interactive (human + copilot) or Autonomous (independent). Need discoverable tools, proper identity (SPNs), audit trails.

BOTTOM LINE: AI agents are standalone consumers — not just tools. They deserve first-class treatment with their own identity, permissions, and audit trails.

NOTE: Scripts/pipelines are tools humans build, not a separate persona.`
  },
  {
    file: 'exec05-layers.html',
    notes: `EXECUTIVE SUMMARY — SLIDE 5: Three Layers

THREE LAYERS:
- Agentic: MCP Apps, Autonomous Agents — AI-powered experiences
- Programmatic: CI/CD, Scripts, Terraform — classic automation (delivers value TODAY, no AI required)
- Foundational: APIs, CLI, MCP Server, SDKs, Identity — the infrastructure

BOTTOM LINE: Each layer delivers value on its own. You don't need to wait for agents to benefit from this investment.

FOOTER NOTE: MCP Apps are interactive UI components served by MCP servers, rendered inline in VS Code, Claude, ChatGPT.`
  },
  {
    file: 'exec06-scenarios.html',
    notes: `EXECUTIVE SUMMARY — SLIDE 6: Scenarios

THREE SCENARIOS:
1. Developer Troubleshooting from VS Code — 4 min vs 20+ min in portal
2. Business User Creating Report from Claude — never opened the Fabric portal
3. Autonomous CI/CD Agent in GitHub Actions — zero human intervention

BOTTOM LINE: Same infrastructure, different automation levels — configurable by the user.`
  },
  {
    file: 'exec07-why-us.html',
    notes: `EXECUTIVE SUMMARY — SLIDE 7: Why Our Team

WHAT WE OWN:
- Embed: Embedding Fabric items → expanding to full experiences
- APIs & Dev Tools: Public APIs (110K MAU), CLI (168K downloads), SDKs, Terraform
- MCPs: Local MCP (GA FabCon Mar '26) + Remote/Hosted MCP
- Platform DNA: As part of Fabric Platform team, we know how to work with and enable other Fabric teams

THREE PARALLEL STREAMS:
- Foundation: APIs, CLI, SDKs, Identity
- Programmatic: CI/CD, Terraform, Scripting
- Agentic: MCP Platform, MCP Apps

BOTTOM LINE: We're the infrastructure team that enables everyone else — and externalizes Fabric beyond the portal.`
  },
  {
    file: 'exec08-next-steps.html',
    notes: `EXECUTIVE SUMMARY — SLIDE 8: Proposed Starting Points

PROPOSED EFFORTS:
1. API Completeness Sprint — close top 20 gaps (Foundation)
2. CLI v2 Open Source — extensible execution layer (Foundation)
3. Troubleshooting MCP App — proof-of-concept showing all three layers (Agentic)

WHY TROUBLESHOOTING FIRST:
- CAT research: 56-hour study with professional developers
- Troubleshooting is the #1 underserved job (opportunity score: 6.1)
- After troubleshooting, we can tackle other validated needs: CI/CD, monitoring, optimization
- This is an EXAMPLE — we're solving validated problems, not guessing

BOTTOM LINE: First we align on vision. Then we commit resources and timelines.`
  }
];

async function buildPresentation() {
  const pptx = new pptxgen();
  
  pptx.layout = 'LAYOUT_16x9';
  pptx.title = 'Embedding Fabric Everywhere - Executive Summary';
  pptx.author = 'Fabric Embed and Automation Team';
  pptx.company = 'Microsoft';
  pptx.subject = 'Executive Summary - Strategy for the Agentic Era';

  console.log('Building Executive Summary presentation...');
  console.log(`Output: ${OUTPUT_FILE}`);
  console.log('---');

  for (let i = 0; i < slides.length; i++) {
    const slideConfig = slides[i];
    const htmlPath = path.join(SLIDES_DIR, slideConfig.file);
    
    console.log(`[${i + 1}/${slides.length}] Processing: ${slideConfig.file}`);
    
    try {
      const { slide } = await html2pptx(htmlPath, pptx);
      
      if (slideConfig.notes) {
        slide.addNotes(slideConfig.notes);
      }
      
      console.log(`    ✓ Added successfully`);
    } catch (error) {
      console.error(`    ✗ Error: ${error.message}`);
    }
  }

  console.log('---');
  console.log('Writing PPTX file...');
  
  await pptx.writeFile({ fileName: OUTPUT_FILE });
  
  console.log(`✓ Presentation saved to: ${OUTPUT_FILE}`);
  console.log(`  Total slides: ${slides.length}`);
}

buildPresentation().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});
