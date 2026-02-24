/**
 * Fabric Local MCP: Item Definitions Discussion
 * Internal Planning Meeting - February 5, 2026
 * 
 * Design: Professional Microsoft/Fabric aesthetic
 * - Navy (#1C2833) + Fabric Blue (#0078D4) + Coral accent (#E76F51)
 * - Clean typography with Arial
 * - Two-column layouts for comparison content
 */

const pptxgen = require('pptxgenjs');
const html2pptx = require('../../../../.agents/skills/pptx/scripts/html2pptx.js');
const fs = require('fs');
const path = require('path');

// Color palette (no # prefix for PptxGenJS)
const COLORS = {
    navy: '1C2833',
    darkNavy: '0D1117',
    fabricBlue: '0078D4',
    lightBlue: '4FC3F7',
    coral: 'E76F51',
    green: '27AE60',
    yellow: 'F39C12',
    lightGray: 'F4F6F6',
    mediumGray: 'AAB7B8',
    darkGray: '2E4053',
    white: 'FFFFFF',
    black: '000000'
};

// Slide dimensions for 16:9
const SLIDE_W = 720; // pt
const SLIDE_H = 405; // pt

async function createPresentation() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'Hasan Abo-Shally';
    pptx.title = 'Fabric Local MCP: Item Definitions Discussion';
    pptx.subject = 'Internal Planning Meeting';
    pptx.company = 'Microsoft';

    // ============================================
    // SLIDE 1: Title Slide
    // ============================================
    await createSlide1_Title(pptx);

    // ============================================
    // SLIDE 2: Agenda
    // ============================================
    await createSlide2_Agenda(pptx);

    // ============================================
    // SLIDE 3: Meeting Goals
    // ============================================
    await createSlide3_Goals(pptx);

    // ============================================
    // SLIDE 4: What Is Fabric Local MCP?
    // ============================================
    await createSlide4_WhatIsMCP(pptx);

    // ============================================
    // SLIDE 5: Why It Matters
    // ============================================
    await createSlide5_WhyItMatters(pptx);

    // ============================================
    // SLIDE 6: Current State
    // ============================================
    await createSlide6_CurrentState(pptx);

    // ============================================
    // SLIDE 7: Industry Trends
    // ============================================
    await createSlide7_IndustryTrends(pptx);

    // ============================================
    // SLIDE 8: Composable Workflows Vision
    // ============================================
    await createSlide8_ComposableVision(pptx);

    // ============================================
    // SLIDE 9: Roadmap
    // ============================================
    await createSlide9_Roadmap(pptx);

    // ============================================
    // SLIDE 10: 6 Proposed Capabilities
    // ============================================
    await createSlide10_Capabilities(pptx);

    // ============================================
    // SLIDE 11: Capabilities Summary
    // ============================================
    await createSlide11_CapabilitiesSummary(pptx);

    // ============================================
    // SLIDE 12: Today's Focus
    // ============================================
    await createSlide12_TodaysFocus(pptx);

    // ============================================
    // SLIDE 13: User Scenario
    // ============================================
    await createSlide13_UserScenario(pptx);

    // ============================================
    // SLIDE 14: CLI as Execution Engine
    // ============================================
    await createSlide14_CLIEngine(pptx);

    // ============================================
    // SLIDE 15: Why CLI as Engine?
    // ============================================
    await createSlide15_WhyCLI(pptx);

    // ============================================
    // SLIDE 16: Export Tool
    // ============================================
    await createSlide16_ExportTool(pptx);

    // ============================================
    // SLIDE 17: Import Tool
    // ============================================
    await createSlide17_ImportTool(pptx);

    // ============================================
    // SLIDE 18: Discussion - Approval Flow
    // ============================================
    await createSlide18_ApprovalFlow(pptx);

    // ============================================
    // SLIDE 19: Discussion - Dry Run
    // ============================================
    await createSlide19_DryRun(pptx);

    // ============================================
    // SLIDE 20: CLI Requirements
    // ============================================
    await createSlide20_CLIRequirements(pptx);

    // ============================================
    // SLIDE 21: Risks & Mitigations
    // ============================================
    await createSlide21_Risks(pptx);

    // ============================================
    // SLIDE 22: Open Questions
    // ============================================
    await createSlide22_OpenQuestions(pptx);

    // ============================================
    // SLIDE 23: Decisions to Make Today
    // ============================================
    await createSlide23_Decisions(pptx);

    // ============================================
    // SLIDE 24: Action Items
    // ============================================
    await createSlide24_ActionItems(pptx);

    // ============================================
    // SLIDE 25: Guiding Principles (Appendix)
    // ============================================
    await createSlide25_Principles(pptx);

    // Save the presentation
    const outputPath = path.join(__dirname, '..', 'Fabric-Local-MCP-Item-Definitions.pptx');
    await pptx.writeFile({ fileName: outputPath });
    console.log(`✅ Presentation saved to: ${outputPath}`);
}

// ============================================
// SLIDE BUILDERS
// ============================================

async function createSlide1_Title(pptx) {
    const html = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #1C2833; }
body {
    width: ${SLIDE_W}pt; height: ${SLIDE_H}pt; margin: 0; padding: 0;
    background: #1C2833;
    font-family: Arial, sans-serif;
    display: flex; flex-direction: column; justify-content: center; align-items: center;
}
.accent-bar { position: absolute; top: 0; left: 0; width: 100%; height: 8pt; background: #0078D4; }
.title { color: #FFFFFF; font-size: 42pt; font-weight: bold; text-align: center; margin-bottom: 12pt; }
.subtitle { color: #4FC3F7; font-size: 22pt; text-align: center; margin-bottom: 40pt; }
.meta { color: #AAB7B8; font-size: 14pt; text-align: center; margin-top: 20pt; }
.date { color: #F4F6F6; font-size: 16pt; text-align: center; margin-top: 8pt; }
.logo-area { position: absolute; bottom: 30pt; right: 40pt; }
.logo-text { color: #AAB7B8; font-size: 11pt; }
</style>
</head>
<body>
<div class="accent-bar"></div>
<h1 class="title">Fabric Local MCP</h1>
<p class="subtitle">Item Definitions Discussion</p>
<p class="meta">Internal Planning Meeting</p>
<p class="date">February 5, 2026</p>
<div class="logo-area">
    <p class="logo-text">Hasan Abo-Shally • Platform Team • Engineering</p>
</div>
</body>
</html>`;
    fs.writeFileSync(path.join(__dirname, 'slide01.html'), html);
    await html2pptx(path.join(__dirname, 'slide01.html'), pptx);
}

async function createSlide2_Agenda(pptx) {
    const html = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #FFFFFF; }
body {
    width: ${SLIDE_W}pt; height: ${SLIDE_H}pt; margin: 0; padding: 0;
    background: #FFFFFF;
    font-family: Arial, sans-serif;
    display: flex; flex-direction: column;
}
.header { background: #1C2833; padding: 18pt 40pt; }
.header-title { color: #FFFFFF; font-size: 26pt; font-weight: bold; margin: 0; }
.content { padding: 20pt 40pt; flex: 1; }
.row { display: flex; margin-bottom: 10pt; align-items: flex-start; }
.time { width: 85pt; color: #0078D4; font-size: 13pt; font-weight: bold; }
.section { flex: 1; }
.section-title { color: #1C2833; font-size: 14pt; font-weight: bold; margin: 0; }
.section-desc { color: #666666; font-size: 11pt; margin: 2pt 0 0 0; }
.highlight { background: #E8F4FD; padding: 8pt 12pt; border-left: 4pt solid #0078D4; margin: 10pt 0; }
.highlight-text { color: #1C2833; font-size: 13pt; font-weight: bold; margin: 0; }
</style>
</head>
<body>
<div class="header">
    <h1 class="header-title">Agenda (60 min)</h1>
</div>
<div class="content">
    <div class="row">
        <p class="time">0-10 min</p>
        <div class="section">
            <p class="section-title">Local MCP Recap</p>
            <p class="section-desc">Align on where we are today</p>
        </div>
    </div>
    <div class="row">
        <p class="time">10-20 min</p>
        <div class="section">
            <p class="section-title">Vision & Direction</p>
            <p class="section-desc">Where MCP is heading (industry + roadmap)</p>
        </div>
    </div>
    <div class="row">
        <p class="time">20-30 min</p>
        <div class="section">
            <p class="section-title">Proposed Capabilities</p>
            <p class="section-desc">6 features we want to add</p>
        </div>
    </div>
    <div class="highlight">
        <p class="highlight-text">30-55 min  •  Focus: Import/Export Tools  •  Deep dive + decisions</p>
    </div>
    <div class="row">
        <p class="time">55-60 min</p>
        <div class="section">
            <p class="section-title">Next Steps & Parking Lot</p>
            <p class="section-desc">Wrap up</p>
        </div>
    </div>
</div>
</body>
</html>`;
    fs.writeFileSync(path.join(__dirname, 'slide02.html'), html);
    await html2pptx(path.join(__dirname, 'slide02.html'), pptx);
}

async function createSlide3_Goals(pptx) {
    const html = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #FFFFFF; }
body {
    width: ${SLIDE_W}pt; height: ${SLIDE_H}pt; margin: 0; padding: 0;
    background: #FFFFFF;
    font-family: Arial, sans-serif;
    display: flex; flex-direction: column;
}
.header { background: #1C2833; padding: 20pt 40pt; }
.header-title { color: #FFFFFF; font-size: 28pt; font-weight: bold; margin: 0; }
.content { padding: 30pt 40pt; flex: 1; display: flex; flex-direction: column; gap: 18pt; }
.goal { display: flex; align-items: flex-start; gap: 15pt; }
.number { background: #0078D4; color: #FFFFFF; font-size: 18pt; font-weight: bold; width: 36pt; height: 36pt; border-radius: 18pt; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.number-text { color: #FFFFFF; font-size: 18pt; font-weight: bold; margin: 0; }
.goal-content { flex: 1; }
.goal-verb { color: #0078D4; font-size: 18pt; font-weight: bold; margin: 0; display: inline; }
.goal-text { color: #1C2833; font-size: 18pt; margin: 0; display: inline; }
</style>
</head>
<body>
<div class="header">
    <h1 class="header-title">Meeting Goals</h1>
</div>
<div class="content">
    <div class="goal">
        <div class="number"><p class="number-text">1</p></div>
        <div class="goal-content">
            <p class="goal-verb">Align </p><p class="goal-text">on the next phase of Local MCP capabilities</p>
        </div>
    </div>
    <div class="goal">
        <div class="number"><p class="number-text">2</p></div>
        <div class="goal-content">
            <p class="goal-verb">Finalize </p><p class="goal-text">design direction for Import/Export tools</p>
        </div>
    </div>
    <div class="goal">
        <div class="number"><p class="number-text">3</p></div>
        <div class="goal-content">
            <p class="goal-verb">Confirm </p><p class="goal-text">CLI integration requirements and open questions</p>
        </div>
    </div>
    <div class="goal">
        <div class="number"><p class="number-text">4</p></div>
        <div class="goal-content">
            <p class="goal-verb">Assign </p><p class="goal-text">owners and timelines for implementation</p>
        </div>
    </div>
</div>
</body>
</html>`;
    fs.writeFileSync(path.join(__dirname, 'slide03.html'), html);
    await html2pptx(path.join(__dirname, 'slide03.html'), pptx);
}

async function createSlide4_WhatIsMCP(pptx) {
    const html = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #FFFFFF; }
body {
    width: ${SLIDE_W}pt; height: ${SLIDE_H}pt; margin: 0; padding: 0;
    background: #FFFFFF;
    font-family: Arial, sans-serif;
    display: flex; flex-direction: column;
}
.header { background: #1C2833; padding: 15pt 40pt; }
.part-label { color: #4FC3F7; font-size: 12pt; margin: 0 0 4pt 0; text-transform: uppercase; letter-spacing: 1pt; }
.header-title { color: #FFFFFF; font-size: 26pt; font-weight: bold; margin: 0; }
.content { padding: 25pt 40pt; flex: 1; }
.definition { color: #1C2833; font-size: 16pt; margin: 0 0 25pt 0; line-height: 1.4; }
.bold { font-weight: bold; }
.diagram { display: flex; justify-content: center; align-items: center; gap: 20pt; margin-top: 15pt; }
.box { background: #F4F6F6; border: 2pt solid #AAB7B8; padding: 18pt 20pt; text-align: center; border-radius: 6pt; }
.box-center { background: #0078D4; border: 2pt solid #0078D4; padding: 18pt 20pt; text-align: center; border-radius: 6pt; }
.box-title { color: #1C2833; font-size: 13pt; font-weight: bold; margin: 0; }
.box-title-white { color: #FFFFFF; font-size: 13pt; font-weight: bold; margin: 0; }
.box-sub { color: #666666; font-size: 10pt; margin: 4pt 0 0 0; }
.box-sub-white { color: #E8F4FD; font-size: 10pt; margin: 4pt 0 0 0; }
.arrow { color: #0078D4; font-size: 24pt; font-weight: bold; }
</style>
</head>
<body>
<div class="header">
    <p class="part-label">Part 1: Local MCP Recap</p>
    <h1 class="header-title">What Is Fabric Local MCP?</h1>
</div>
<div class="content">
    <p class="definition">An <b>open-source MCP server</b> running on developer machines that gives AI agents (Copilot, Claude) direct access to Fabric context.</p>
    <div class="diagram">
        <div class="box">
            <p class="box-title">GitHub Copilot</p>
            <p class="box-sub">Claude / IDE</p>
        </div>
        <p class="arrow">→</p>
        <div class="box-center">
            <p class="box-title-white">Fabric Local</p>
            <p class="box-sub-white">MCP Server</p>
        </div>
        <p class="arrow">→</p>
        <div class="box">
            <p class="box-title">Fabric Cloud</p>
            <p class="box-sub">APIs / OneLake</p>
        </div>
    </div>
</div>
</body>
</html>`;
    fs.writeFileSync(path.join(__dirname, 'slide04.html'), html);
    await html2pptx(path.join(__dirname, 'slide04.html'), pptx);
}

async function createSlide5_WhyItMatters(pptx) {
    const slide = pptx.addSlide();
    
    // Header
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0, y: 0, w: 10, h: 1.0,
        fill: { color: COLORS.navy }
    });
    slide.addText('Why It Matters', {
        x: 0.5, y: 0.25, w: 9, h: 0.5,
        fontSize: 26, fontFace: 'Arial', bold: true, color: COLORS.white
    });

    // Table data
    const tableData = [
        [
            { text: 'Problem', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true, align: 'left' } },
            { text: 'How Local MCP Solves It', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true, align: 'left' } }
        ],
        [
            { text: 'AI hallucinates Fabric APIs', options: { fill: { color: COLORS.lightGray } } },
            { text: 'Real-time OpenAPI specs embedded', options: { fill: { color: COLORS.lightGray } } }
        ],
        [
            { text: 'Context switching to docs', options: { fill: { color: COLORS.white } } },
            { text: 'Semantic search from IDE', options: { fill: { color: COLORS.white } } }
        ],
        [
            { text: 'OAuth boilerplate code', options: { fill: { color: COLORS.lightGray } } },
            { text: 'CLI handles auth transparently', options: { fill: { color: COLORS.lightGray } } }
        ],
        [
            { text: 'Schema validation errors', options: { fill: { color: COLORS.white } } },
            { text: 'JSON schemas + validation as you type', options: { fill: { color: COLORS.white } } }
        ]
    ];

    slide.addTable(tableData, {
        x: 0.5, y: 1.2, w: 9, h: 2.5,
        colW: [3.5, 5.5],
        border: { pt: 1, color: COLORS.mediumGray },
        fontSize: 14,
        fontFace: 'Arial',
        valign: 'middle'
    });

    // Key term callout
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0.5, y: 4.0, w: 9, h: 0.9,
        fill: { color: 'E8F4FD' },
        line: { color: COLORS.fabricBlue, width: 0, dashType: 'solid' }
    });
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0.5, y: 4.0, w: 0.08, h: 0.9,
        fill: { color: COLORS.fabricBlue }
    });
    slide.addText([
        { text: '📝 Key Term: ', options: { bold: true, color: COLORS.navy } },
        { text: 'Item definitions = the JSON representation of Fabric items (reports, datasets, pipelines). When we say "export/import items," we mean exporting/importing their definitions, not the underlying data.', options: { color: COLORS.darkGray } }
    ], {
        x: 0.7, y: 4.1, w: 8.6, h: 0.7,
        fontSize: 12, fontFace: 'Arial', valign: 'middle'
    });
}

async function createSlide6_CurrentState(pptx) {
    const slide = pptx.addSlide();
    
    // Header
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0, y: 0, w: 10, h: 1.0,
        fill: { color: COLORS.navy }
    });
    slide.addText('Current State (Public Preview)', {
        x: 0.5, y: 0.25, w: 9, h: 0.5,
        fontSize: 26, fontFace: 'Arial', bold: true, color: COLORS.white
    });

    // Version info
    slide.addText([
        { text: 'Version: ', options: { bold: true } },
        { text: '0.0.0-beta.2', options: { color: COLORS.fabricBlue } }
    ], {
        x: 0.5, y: 1.2, w: 4, h: 0.4,
        fontSize: 16, fontFace: 'Arial', color: COLORS.navy
    });

    slide.addText([
        { text: 'Distribution: ', options: { bold: true } },
        { text: 'VS Code Extension • NuGet • NPM', options: { color: COLORS.darkGray } }
    ], {
        x: 0.5, y: 1.6, w: 6, h: 0.4,
        fontSize: 14, fontFace: 'Arial', color: COLORS.navy
    });

    // Status table
    const tableData = [
        [
            { text: 'Live Today', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true } },
            { text: 'Status', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true, align: 'center' } }
        ],
        [
            { text: 'OpenAPI specs for all workloads', options: { fill: { color: COLORS.lightGray } } },
            { text: '✅', options: { fill: { color: COLORS.lightGray }, align: 'center', fontSize: 18 } }
        ],
        [
            { text: 'JSON schemas for item definitions', options: { fill: { color: COLORS.white } } },
            { text: '✅', options: { fill: { color: COLORS.white }, align: 'center', fontSize: 18 } }
        ],
        [
            { text: 'Best practices guidance', options: { fill: { color: COLORS.lightGray } } },
            { text: '✅', options: { fill: { color: COLORS.lightGray }, align: 'center', fontSize: 18 } }
        ],
        [
            { text: 'MS Learn documentation search', options: { fill: { color: COLORS.white } } },
            { text: '✅', options: { fill: { color: COLORS.white }, align: 'center', fontSize: 18 } }
        ],
        [
            { text: 'Fabric glossary', options: { fill: { color: COLORS.lightGray } } },
            { text: '✅', options: { fill: { color: COLORS.lightGray }, align: 'center', fontSize: 18 } }
        ]
    ];

    slide.addTable(tableData, {
        x: 0.5, y: 2.1, w: 9, h: 2.8,
        colW: [7.5, 1.5],
        border: { pt: 1, color: COLORS.mediumGray },
        fontSize: 14,
        fontFace: 'Arial',
        valign: 'middle'
    });
}

async function createSlide7_IndustryTrends(pptx) {
    const slide = pptx.addSlide();
    
    // Header
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0, y: 0, w: 10, h: 1.0,
        fill: { color: COLORS.navy }
    });
    slide.addText([
        { text: 'Part 2: Vision & Direction', options: { fontSize: 12, color: COLORS.lightBlue } }
    ], {
        x: 0.5, y: 0.15, w: 9, h: 0.25, fontFace: 'Arial'
    });
    slide.addText('Where MCP Is Heading (Industry)', {
        x: 0.5, y: 0.35, w: 9, h: 0.5,
        fontSize: 24, fontFace: 'Arial', bold: true, color: COLORS.white
    });

    // Trends table with references
    const tableData = [
        [
            { text: 'Trend', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true } },
            { text: 'What It Means', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true } },
            { text: 'Ref', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true, align: 'center' } }
        ],
        [
            { text: 'MCP Apps', options: { fill: { color: COLORS.lightGray }, bold: true, color: COLORS.fabricBlue } },
            { text: 'Composable, multi-server architectures', options: { fill: { color: COLORS.lightGray } } },
            { text: '[1]', options: { fill: { color: COLORS.lightGray }, align: 'center', color: COLORS.fabricBlue } }
        ],
        [
            { text: 'Elicitation', options: { fill: { color: COLORS.white }, bold: true, color: COLORS.fabricBlue } },
            { text: 'Servers request structured user input (approval)', options: { fill: { color: COLORS.white } } },
            { text: '[2]', options: { fill: { color: COLORS.white }, align: 'center', color: COLORS.fabricBlue } }
        ],
        [
            { text: 'Sampling', options: { fill: { color: COLORS.lightGray }, bold: true, color: COLORS.fabricBlue } },
            { text: 'Servers can request LLM completions', options: { fill: { color: COLORS.lightGray } } },
            { text: '[3]', options: { fill: { color: COLORS.lightGray }, align: 'center', color: COLORS.fabricBlue } }
        ],
        [
            { text: 'Tasks', options: { fill: { color: COLORS.white }, bold: true, color: COLORS.fabricBlue } },
            { text: 'Long-running operations with progress', options: { fill: { color: COLORS.white } } },
            { text: '[4]', options: { fill: { color: COLORS.white }, align: 'center', color: COLORS.fabricBlue } }
        ],
        [
            { text: 'MCP Registry', options: { fill: { color: COLORS.lightGray }, bold: true, color: COLORS.fabricBlue } },
            { text: 'Centralized discovery of MCP servers', options: { fill: { color: COLORS.lightGray } } },
            { text: '[5]', options: { fill: { color: COLORS.lightGray }, align: 'center', color: COLORS.fabricBlue } }
        ]
    ];

    slide.addTable(tableData, {
        x: 0.5, y: 1.15, w: 9, h: 2.6,
        colW: [1.8, 6.4, 0.8],
        border: { pt: 1, color: COLORS.mediumGray },
        fontSize: 13,
        fontFace: 'Arial',
        valign: 'middle'
    });

    // References section
    slide.addText('References:', {
        x: 0.5, y: 3.9, w: 9, h: 0.25,
        fontSize: 10, fontFace: 'Arial', bold: true, color: COLORS.darkGray
    });
    slide.addText([
        { text: '[1] ', options: { bold: true, color: COLORS.fabricBlue } },
        { text: 'modelcontextprotocol.io/docs/concepts/mcp-apps\n', options: { color: COLORS.darkGray } },
        { text: '[2] ', options: { bold: true, color: COLORS.fabricBlue } },
        { text: 'modelcontextprotocol.io/docs/concepts/elicitation\n', options: { color: COLORS.darkGray } },
        { text: '[3] ', options: { bold: true, color: COLORS.fabricBlue } },
        { text: 'modelcontextprotocol.io/docs/concepts/sampling\n', options: { color: COLORS.darkGray } },
        { text: '[4] ', options: { bold: true, color: COLORS.fabricBlue } },
        { text: 'modelcontextprotocol.io/docs/concepts/tasks\n', options: { color: COLORS.darkGray } },
        { text: '[5] ', options: { bold: true, color: COLORS.fabricBlue } },
        { text: 'github.com/modelcontextprotocol/registry', options: { color: COLORS.darkGray } }
    ], {
        x: 0.5, y: 4.15, w: 9, h: 1.0,
        fontSize: 9, fontFace: 'Arial'
    });
}

async function createSlide8_ComposableVision(pptx) {
    const html = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #1C2833; }
body {
    width: ${SLIDE_W}pt; height: ${SLIDE_H}pt; margin: 0; padding: 0;
    background: #1C2833;
    font-family: Arial, sans-serif;
    display: flex; flex-direction: column;
}
.header { padding: 20pt 40pt; }
.header-title { color: #FFFFFF; font-size: 22pt; font-weight: bold; margin: 0; }
.header-sub { color: #4FC3F7; font-size: 14pt; margin: 6pt 0 0 0; }
.content { padding: 15pt 40pt; flex: 1; display: flex; flex-direction: column; justify-content: center; }
.quote { color: #4FC3F7; font-size: 14pt; font-style: italic; margin: 0 0 25pt 0; text-align: center; }
.diagram { display: flex; justify-content: center; align-items: center; gap: 12pt; }
.box { background: #2E4053; border: 2pt solid #0078D4; padding: 15pt 18pt; text-align: center; border-radius: 6pt; }
.box-title { color: #FFFFFF; font-size: 14pt; font-weight: bold; margin: 0; }
.box-sub { color: #4FC3F7; font-size: 10pt; margin: 4pt 0 0 0; }
.plus { color: #FFFFFF; font-size: 20pt; font-weight: bold; }
.footer { color: #AAB7B8; font-size: 12pt; text-align: center; margin-top: 25pt; }
</style>
</head>
<body>
<div class="header">
    <h1 class="header-title">Future: Composable AI Workflows</h1>
    <p class="header-sub">What This Could Enable for Fabric</p>
</div>
<div class="content">
    <p class="quote">"Clone my workspace to staging, commit changes to Git, create a PR, and notify the team on Slack"</p>
    <div class="diagram">
        <div class="box">
            <p class="box-title">Fabric</p>
            <p class="box-sub">MCP</p>
        </div>
        <p class="plus">+</p>
        <div class="box">
            <p class="box-title">Git</p>
            <p class="box-sub">MCP</p>
        </div>
        <p class="plus">+</p>
        <div class="box">
            <p class="box-title">GitHub</p>
            <p class="box-sub">MCP</p>
        </div>
        <p class="plus">+</p>
        <div class="box">
            <p class="box-title">Slack</p>
            <p class="box-sub">MCP</p>
        </div>
    </div>
    <p class="footer">AI orchestrates multiple MCPs as a unified workflow</p>
</div>
</body>
</html>`;
    fs.writeFileSync(path.join(__dirname, 'slide08.html'), html);
    await html2pptx(path.join(__dirname, 'slide08.html'), pptx);
}

async function createSlide9_Roadmap(pptx) {
    const slide = pptx.addSlide();
    
    // Header
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0, y: 0, w: 10, h: 1.0,
        fill: { color: COLORS.navy }
    });
    slide.addText('Our Roadmap Vision', {
        x: 0.5, y: 0.25, w: 9, h: 0.5,
        fontSize: 26, fontFace: 'Arial', bold: true, color: COLORS.white
    });

    // Roadmap table
    const tableData = [
        [
            { text: 'Phase', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true, align: 'center' } },
            { text: 'Theme', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true } },
            { text: 'Target', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true, align: 'center' } }
        ],
        [
            { text: 'Now', options: { fill: { color: 'D5F5E3' }, bold: true, color: COLORS.green, align: 'center' } },
            { text: 'Context & Schemas (passive validation)', options: { fill: { color: 'D5F5E3' } } },
            { text: '✅ Live', options: { fill: { color: 'D5F5E3' }, align: 'center', color: COLORS.green } }
        ],
        [
            { text: 'Q1 2026', options: { fill: { color: COLORS.lightGray }, bold: true, color: COLORS.fabricBlue, align: 'center' } },
            { text: 'OneLake + Auth + Item Definitions', options: { fill: { color: COLORS.lightGray } } },
            { text: '🔄 In Progress', options: { fill: { color: COLORS.lightGray }, align: 'center', color: COLORS.fabricBlue } }
        ],
        [
            { text: 'Q2 2026', options: { fill: { color: COLORS.white }, bold: true, color: COLORS.darkGray, align: 'center' } },
            { text: 'Execution Tools + Active Validation', options: { fill: { color: COLORS.white } } },
            { text: 'Planned', options: { fill: { color: COLORS.white }, align: 'center', color: COLORS.mediumGray } }
        ],
        [
            { text: 'GA (Mar 2026)', options: { fill: { color: COLORS.lightGray }, bold: true, color: COLORS.coral, align: 'center' } },
            { text: 'Production Ready', options: { fill: { color: COLORS.lightGray } } },
            { text: 'FabCon Atlanta', options: { fill: { color: COLORS.lightGray }, align: 'center', color: COLORS.coral, bold: true } }
        ]
    ];

    slide.addTable(tableData, {
        x: 0.5, y: 1.3, w: 9, h: 3.0,
        colW: [2.2, 4.5, 2.3],
        border: { pt: 1, color: COLORS.mediumGray },
        fontSize: 15,
        fontFace: 'Arial',
        valign: 'middle'
    });
}

async function createSlide10_Capabilities(pptx) {
    const slide = pptx.addSlide();
    
    // Header
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0, y: 0, w: 10, h: 1.0,
        fill: { color: COLORS.navy }
    });
    slide.addText([
        { text: 'Part 3: Proposed Capabilities', options: { fontSize: 12, color: COLORS.lightBlue } }
    ], {
        x: 0.5, y: 0.15, w: 9, h: 0.25, fontFace: 'Arial'
    });
    slide.addText('6 Capabilities We Want to Add', {
        x: 0.5, y: 0.35, w: 9, h: 0.5,
        fontSize: 24, fontFace: 'Arial', bold: true, color: COLORS.white
    });

    // Definition callout
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0.5, y: 1.1, w: 9, h: 0.6,
        fill: { color: 'E8F4FD' }
    });
    slide.addText([
        { text: 'What is an Item Definition? ', options: { bold: true, color: COLORS.navy } },
        { text: 'The JSON representation of a Fabric item (report, dataset, pipeline, notebook) that describes its structure, configuration, and metadata.', options: { color: COLORS.darkGray } }
    ], {
        x: 0.6, y: 1.15, w: 8.8, h: 0.5,
        fontSize: 11, fontFace: 'Arial', valign: 'middle'
    });

    // Two-column layout for capabilities
    const capabilitiesLeft = [
        { num: '1', title: 'Export Item Definition', desc: 'Export item JSON to local file', priority: 'P0' },
        { num: '2', title: 'Import Item Definition', desc: 'Import item JSON into Fabric', priority: 'P0' },
        { num: '3', title: 'Validate Definition', desc: 'Schema + semantic validation', priority: 'P1' }
    ];
    
    const capabilitiesRight = [
        { num: '4', title: 'Workspace Export', desc: 'Export all items as bundle', priority: 'P1' },
        { num: '5', title: 'Workspace Import', desc: 'Import bundle with dependencies', priority: 'P1' },
        { num: '6', title: 'CLI Script Generation', desc: 'Natural language to CLI commands', priority: 'P1' }
    ];

    let yPos = 1.85;
    capabilitiesLeft.forEach((cap, i) => {
        const isPriority = cap.priority === 'P0';
        slide.addShape(pptx.shapes.RECTANGLE, {
            x: 0.5, y: yPos, w: 4.3, h: 0.85,
            fill: { color: isPriority ? 'E8F4FD' : COLORS.lightGray },
            line: { color: isPriority ? COLORS.fabricBlue : COLORS.mediumGray, width: 1 }
        });
        slide.addText(cap.num, {
            x: 0.6, y: yPos + 0.15, w: 0.4, h: 0.55,
            fontSize: 20, fontFace: 'Arial', bold: true, color: isPriority ? COLORS.fabricBlue : COLORS.darkGray
        });
        slide.addText(cap.title, {
            x: 1.1, y: yPos + 0.1, w: 3.0, h: 0.35,
            fontSize: 13, fontFace: 'Arial', bold: true, color: COLORS.navy
        });
        slide.addText(cap.desc, {
            x: 1.1, y: yPos + 0.4, w: 3.0, h: 0.35,
            fontSize: 10, fontFace: 'Arial', color: COLORS.darkGray
        });
        slide.addText(cap.priority, {
            x: 4.3, y: yPos + 0.25, w: 0.4, h: 0.35,
            fontSize: 10, fontFace: 'Arial', bold: true, color: isPriority ? COLORS.coral : COLORS.mediumGray
        });
        yPos += 0.95;
    });

    yPos = 1.85;
    capabilitiesRight.forEach((cap, i) => {
        const isPriority = cap.priority === 'P0';
        slide.addShape(pptx.shapes.RECTANGLE, {
            x: 5.2, y: yPos, w: 4.3, h: 0.85,
            fill: { color: isPriority ? 'E8F4FD' : COLORS.lightGray },
            line: { color: isPriority ? COLORS.fabricBlue : COLORS.mediumGray, width: 1 }
        });
        slide.addText(cap.num, {
            x: 5.3, y: yPos + 0.15, w: 0.4, h: 0.55,
            fontSize: 20, fontFace: 'Arial', bold: true, color: isPriority ? COLORS.fabricBlue : COLORS.darkGray
        });
        slide.addText(cap.title, {
            x: 5.8, y: yPos + 0.1, w: 3.0, h: 0.35,
            fontSize: 13, fontFace: 'Arial', bold: true, color: COLORS.navy
        });
        slide.addText(cap.desc, {
            x: 5.8, y: yPos + 0.4, w: 3.0, h: 0.35,
            fontSize: 10, fontFace: 'Arial', color: COLORS.darkGray
        });
        slide.addText(cap.priority, {
            x: 9.0, y: yPos + 0.25, w: 0.4, h: 0.35,
            fontSize: 10, fontFace: 'Arial', bold: true, color: isPriority ? COLORS.coral : COLORS.mediumGray
        });
        yPos += 0.95;
    });
}

async function createSlide11_CapabilitiesSummary(pptx) {
    const slide = pptx.addSlide();
    
    // Header
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0, y: 0, w: 10, h: 1.0,
        fill: { color: COLORS.navy }
    });
    slide.addText('Capabilities Summary', {
        x: 0.5, y: 0.25, w: 9, h: 0.5,
        fontSize: 26, fontFace: 'Arial', bold: true, color: COLORS.white
    });

    // Summary table
    const tableData = [
        [
            { text: '#', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true, align: 'center' } },
            { text: 'Capability', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true } },
            { text: 'User Says...', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true } },
            { text: 'Priority', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true, align: 'center' } }
        ],
        [
            { text: '1', options: { fill: { color: 'E8F4FD' }, align: 'center', bold: true } },
            { text: 'Export Definition', options: { fill: { color: 'E8F4FD' }, bold: true } },
            { text: '"Download this report\'s definition"', options: { fill: { color: 'E8F4FD' }, italic: true } },
            { text: 'P0', options: { fill: { color: 'E8F4FD' }, align: 'center', bold: true, color: COLORS.coral } }
        ],
        [
            { text: '2', options: { fill: { color: 'E8F4FD' }, align: 'center', bold: true } },
            { text: 'Import Definition', options: { fill: { color: 'E8F4FD' }, bold: true } },
            { text: '"Push my changes back to Fabric"', options: { fill: { color: 'E8F4FD' }, italic: true } },
            { text: 'P0', options: { fill: { color: 'E8F4FD' }, align: 'center', bold: true, color: COLORS.coral } }
        ],
        [
            { text: '3', options: { fill: { color: COLORS.lightGray }, align: 'center' } },
            { text: 'Validate Definition', options: { fill: { color: COLORS.lightGray } } },
            { text: '"Is this JSON valid before I import?"', options: { fill: { color: COLORS.lightGray }, italic: true } },
            { text: 'P1', options: { fill: { color: COLORS.lightGray }, align: 'center' } }
        ],
        [
            { text: '4', options: { fill: { color: COLORS.white }, align: 'center' } },
            { text: 'Workspace Export', options: { fill: { color: COLORS.white } } },
            { text: '"Backup my entire workspace"', options: { fill: { color: COLORS.white }, italic: true } },
            { text: 'P1', options: { fill: { color: COLORS.white }, align: 'center' } }
        ],
        [
            { text: '5', options: { fill: { color: COLORS.lightGray }, align: 'center' } },
            { text: 'Workspace Import', options: { fill: { color: COLORS.lightGray } } },
            { text: '"Clone workspace to staging"', options: { fill: { color: COLORS.lightGray }, italic: true } },
            { text: 'P1', options: { fill: { color: COLORS.lightGray }, align: 'center' } }
        ],
        [
            { text: '6', options: { fill: { color: COLORS.white }, align: 'center' } },
            { text: 'CLI Script Gen', options: { fill: { color: COLORS.white } } },
            { text: '"Show me the CLI commands for this"', options: { fill: { color: COLORS.white }, italic: true } },
            { text: 'P1', options: { fill: { color: COLORS.white }, align: 'center' } }
        ]
    ];

    slide.addTable(tableData, {
        x: 0.5, y: 1.2, w: 9, h: 3.5,
        colW: [0.5, 2.2, 4.5, 0.8],
        border: { pt: 1, color: COLORS.mediumGray },
        fontSize: 13,
        fontFace: 'Arial',
        valign: 'middle'
    });
}

async function createSlide12_TodaysFocus(pptx) {
    const html = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #0078D4; }
body {
    width: ${SLIDE_W}pt; height: ${SLIDE_H}pt; margin: 0; padding: 0;
    background: #0078D4;
    font-family: Arial, sans-serif;
    display: flex; flex-direction: column; justify-content: center; align-items: center;
}
.part-label { color: #E8F4FD; font-size: 14pt; margin: 0 0 10pt 0; text-transform: uppercase; letter-spacing: 2pt; }
.title { color: #FFFFFF; font-size: 36pt; font-weight: bold; text-align: center; margin: 0 0 10pt 0; }
.subtitle { color: #FFFFFF; font-size: 20pt; text-align: center; margin: 0 0 30pt 0; }
.callout { background: rgba(255,255,255,0.15); padding: 20pt 40pt; border-radius: 8pt; max-width: 550pt; }
.callout-label { color: #F39C12; font-size: 12pt; font-weight: bold; margin: 0 0 8pt 0; }
.callout-text { color: #FFFFFF; font-size: 14pt; margin: 0; line-height: 1.5; }
</style>
</head>
<body>
<p class="part-label">Part 4: Deep Dive</p>
<h1 class="title">🎯 Today's Focus</h1>
<p class="subtitle">Export & Import of Item Definitions</p>
<div class="callout">
    <p class="callout-label">⚠️ KEY SHIFT</p>
    <p class="callout-text">These are the first "write" tools in Local MCP. Until now, MCP has been read-only. Import introduces controlled execution with human-in-the-loop approval.</p>
</div>
</body>
</html>`;
    fs.writeFileSync(path.join(__dirname, 'slide12.html'), html);
    await html2pptx(path.join(__dirname, 'slide12.html'), pptx);
}

async function createSlide13_UserScenario(pptx) {
    const html = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #FFFFFF; }
body {
    width: ${SLIDE_W}pt; height: ${SLIDE_H}pt; margin: 0; padding: 0;
    background: #FFFFFF;
    font-family: Arial, sans-serif;
    display: flex; flex-direction: column;
}
.header { background: #1C2833; padding: 15pt 40pt; }
.header-title { color: #FFFFFF; font-size: 24pt; font-weight: bold; margin: 0; }
.content { padding: 15pt 40pt; flex: 1; }
.quote { background: #F4F6F6; border-left: 4pt solid #0078D4; padding: 10pt 15pt; margin: 0 0 18pt 0; }
.quote-text { color: #1C2833; font-size: 13pt; font-style: italic; margin: 0; }
.flow { display: flex; justify-content: space-between; align-items: stretch; gap: 10pt; }
.step { flex: 1; text-align: center; }
.step-box { background: #F4F6F6; border: 2pt solid #AAB7B8; border-radius: 6pt; padding: 12pt 8pt; margin-bottom: 6pt; min-height: 55pt; }
.step-box-highlight { background: #0078D4; border: 2pt solid #0078D4; border-radius: 6pt; padding: 12pt 8pt; margin-bottom: 6pt; min-height: 55pt; }
.step-title { color: #1C2833; font-size: 10pt; font-weight: bold; margin: 0 0 4pt 0; }
.step-title-white { color: #FFFFFF; font-size: 10pt; font-weight: bold; margin: 0 0 4pt 0; }
.step-detail { color: #666666; font-size: 9pt; margin: 0; }
.step-detail-white { color: #E8F4FD; font-size: 9pt; margin: 0; }
.step-sub { color: #999999; font-size: 7pt; margin: 2pt 0 0 0; font-style: italic; }
.step-sub-white { color: #B8D4E8; font-size: 7pt; margin: 2pt 0 0 0; font-style: italic; }
.step-label { color: #0078D4; font-size: 9pt; font-weight: bold; }
.arrow-container { display: flex; align-items: center; justify-content: center; }
.arrow { color: #0078D4; font-size: 18pt; font-weight: bold; }
.footer { color: #666666; font-size: 9pt; text-align: center; margin-top: 12pt; font-style: italic; }
</style>
</head>
<body>
<div class="header">
    <h1 class="header-title">The User Scenario</h1>
</div>
<div class="content">
    <div class="quote">
        <p class="quote-text">"I want Copilot to export a report definition, let me edit it locally in VS Code, then import it back to Fabric."</p>
    </div>
    <div class="flow">
        <div class="step">
            <div class="step-box">
                <p class="step-title">FABRIC</p>
                <p class="step-detail">SalesReport</p>
            </div>
            <p class="step-label">Source</p>
        </div>
        <div class="arrow-container"><p class="arrow">→</p></div>
        <div class="step">
            <div class="step-box-highlight">
                <p class="step-title-white">MCP EXPORT</p>
                <p class="step-detail-white">report.json</p>
                <p class="step-sub-white">(item definition)</p>
            </div>
            <p class="step-label">Local File</p>
        </div>
        <div class="arrow-container"><p class="arrow">→</p></div>
        <div class="step">
            <div class="step-box">
                <p class="step-title">COPILOT EDITS</p>
                <p class="step-detail">+ new visual</p>
            </div>
            <p class="step-label">IDE</p>
        </div>
        <div class="arrow-container"><p class="arrow">→</p></div>
        <div class="step">
            <div class="step-box-highlight">
                <p class="step-title-white">MCP IMPORT</p>
                <p class="step-detail-white">with approval</p>
            </div>
            <p class="step-label">Target</p>
        </div>
    </div>
    <p class="footer">Human-in-the-loop workflow: Copilot assists, but does not act autonomously.</p>
</div>
</body>
</html>`;
    fs.writeFileSync(path.join(__dirname, 'slide13.html'), html);
    await html2pptx(path.join(__dirname, 'slide13.html'), pptx);
}

async function createSlide14_CLIEngine(pptx) {
    const html = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #FFFFFF; }
body {
    width: ${SLIDE_W}pt; height: ${SLIDE_H}pt; margin: 0; padding: 0;
    background: #FFFFFF;
    font-family: Arial, sans-serif;
    display: flex; flex-direction: column;
}
.header { background: #1C2833; padding: 15pt 40pt; }
.header-title { color: #FFFFFF; font-size: 24pt; font-weight: bold; margin: 0; }
.content { padding: 20pt 40pt; flex: 1; display: flex; gap: 30pt; }
.left { flex: 1; }
.right { flex: 1.2; display: flex; flex-direction: column; justify-content: center; }
.proposal { color: #1C2833; font-size: 14pt; margin: 0 0 20pt 0; line-height: 1.5; }
.bold { font-weight: bold; }
.diagram { display: flex; flex-direction: column; align-items: center; gap: 8pt; }
.box { width: 220pt; text-align: center; border-radius: 6pt; padding: 12pt 15pt; }
.box-mcp { background: #E8F4FD; border: 2pt solid #0078D4; }
.box-cli { background: #0078D4; }
.box-api { background: #F4F6F6; border: 2pt solid #AAB7B8; }
.box-title { font-size: 12pt; font-weight: bold; margin: 0 0 4pt 0; }
.box-title-white { font-size: 12pt; font-weight: bold; margin: 0 0 4pt 0; color: #FFFFFF; }
.box-items { font-size: 9pt; margin: 0; color: #666666; }
.box-items-white { font-size: 9pt; margin: 0; color: #E8F4FD; }
.arrow { color: #0078D4; font-size: 14pt; }
.arrow-label { color: #666666; font-size: 9pt; margin: 0; }
</style>
</head>
<body>
<div class="header">
    <h1 class="header-title">Key Design Decision: CLI as Execution Engine</h1>
</div>
<div class="content">
    <div class="left">
        <p class="proposal"><b>Proposal:</b> All MCP tools wrap the Fabric CLI underneath.</p>
        <p class="proposal">This means every action MCP performs can be reproduced as a CLI command the user can run manually.</p>
    </div>
    <div class="right">
        <div class="diagram">
            <div class="box box-mcp">
                <p class="box-title">MCP TOOLS</p>
                <p class="box-items">definition export • definition import • definition validate</p>
            </div>
            <p class="arrow">↓</p>
            <p class="arrow-label">wraps</p>
            <div class="box box-cli">
                <p class="box-title-white">FABRIC CLI</p>
                <p class="box-items-white">fab export • fab import • Auth / Retry / Error handling</p>
            </div>
            <p class="arrow">↓</p>
            <div class="box box-api">
                <p class="box-title">FABRIC REST APIs</p>
                <p class="box-items"> </p>
            </div>
        </div>
    </div>
</div>
</body>
</html>`;
    fs.writeFileSync(path.join(__dirname, 'slide14.html'), html);
    await html2pptx(path.join(__dirname, 'slide14.html'), pptx);
}

async function createSlide15_WhyCLI(pptx) {
    const slide = pptx.addSlide();
    
    // Header
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0, y: 0, w: 10, h: 1.0,
        fill: { color: COLORS.navy }
    });
    slide.addText('Why CLI as the Engine?', {
        x: 0.5, y: 0.25, w: 9, h: 0.5,
        fontSize: 26, fontFace: 'Arial', bold: true, color: COLORS.white
    });

    // Benefits table
    const tableData = [
        [
            { text: 'Benefit', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true } },
            { text: 'Why', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true } }
        ],
        [
            { text: 'Reproducible', options: { fill: { color: COLORS.lightGray }, bold: true, color: COLORS.fabricBlue } },
            { text: 'Every MCP action = CLI command user can run manually', options: { fill: { color: COLORS.lightGray } } }
        ],
        [
            { text: 'Proven', options: { fill: { color: COLORS.white }, bold: true, color: COLORS.fabricBlue } },
            { text: 'CLI already tested in production CI/CD', options: { fill: { color: COLORS.white } } }
        ],
        [
            { text: 'Auth handled', options: { fill: { color: COLORS.lightGray }, bold: true, color: COLORS.fabricBlue } },
            { text: 'No token management in MCP', options: { fill: { color: COLORS.lightGray } } }
        ],
        [
            { text: 'Maintainable', options: { fill: { color: COLORS.white }, bold: true, color: COLORS.fabricBlue } },
            { text: 'MCP delegates execution to CLI for maintainability', options: { fill: { color: COLORS.white } } }
        ],
        [
            { text: 'Aligned with fabric-cicd', options: { fill: { color: COLORS.lightGray }, bold: true, color: COLORS.fabricBlue } },
            { text: 'Future fab deploy integration (not yet GA)', options: { fill: { color: COLORS.lightGray } } }
        ]
    ];

    slide.addTable(tableData, {
        x: 0.5, y: 1.2, w: 9, h: 3.3,
        colW: [2.8, 6.2],
        border: { pt: 1, color: COLORS.mediumGray },
        fontSize: 14,
        fontFace: 'Arial',
        valign: 'middle'
    });
}

async function createSlide16_ExportTool(pptx) {
    const slide = pptx.addSlide();
    
    // Header
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0, y: 0, w: 10, h: 1.0,
        fill: { color: COLORS.navy }
    });
    slide.addText('Tool: Export Definition', {
        x: 0.5, y: 0.25, w: 9, h: 0.5,
        fontSize: 26, fontFace: 'Arial', bold: true, color: COLORS.white
    });

    // User request
    slide.addText([
        { text: 'User: ', options: { bold: true, color: COLORS.darkGray } },
        { text: '"Export the SalesReport definition"', options: { italic: true, color: COLORS.navy } }
    ], {
        x: 0.5, y: 1.15, w: 9, h: 0.4,
        fontSize: 14, fontFace: 'Arial'
    });

    // CLI command
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0.5, y: 1.6, w: 9, h: 0.6,
        fill: { color: COLORS.darkNavy }
    });
    slide.addText('fab export /workspace/SalesReport.Report -o ./report.json', {
        x: 0.7, y: 1.7, w: 8.6, h: 0.4,
        fontSize: 12, fontFace: 'Courier New', color: COLORS.lightBlue
    });

    // Parameters table
    const tableData = [
        [
            { text: 'Input', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true } },
            { text: 'Required', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true, align: 'center' } },
            { text: 'Description', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true } }
        ],
        [
            { text: 'workspace', options: { fill: { color: COLORS.lightGray }, fontFace: 'Courier New' } },
            { text: 'Yes', options: { fill: { color: COLORS.lightGray }, align: 'center', color: COLORS.green } },
            { text: 'Name or ID', options: { fill: { color: COLORS.lightGray } } }
        ],
        [
            { text: 'item', options: { fill: { color: COLORS.white }, fontFace: 'Courier New' } },
            { text: 'Yes', options: { fill: { color: COLORS.white }, align: 'center', color: COLORS.green } },
            { text: 'Item name (e.g., SalesReport.Report)', options: { fill: { color: COLORS.white } } }
        ],
        [
            { text: 'outputPath', options: { fill: { color: COLORS.lightGray }, fontFace: 'Courier New' } },
            { text: 'Yes', options: { fill: { color: COLORS.lightGray }, align: 'center', color: COLORS.green } },
            { text: 'Local file path', options: { fill: { color: COLORS.lightGray } } }
        ],
        [
            { text: 'includeFolders', options: { fill: { color: COLORS.white }, fontFace: 'Courier New' } },
            { text: 'No', options: { fill: { color: COLORS.white }, align: 'center', color: COLORS.mediumGray } },
            { text: 'Preserve folder hierarchy (if CLI supports)', options: { fill: { color: COLORS.white } } }
        ]
    ];

    slide.addTable(tableData, {
        x: 0.5, y: 2.4, w: 9, h: 2.2,
        colW: [1.8, 1.2, 6],
        border: { pt: 1, color: COLORS.mediumGray },
        fontSize: 12,
        fontFace: 'Arial',
        valign: 'middle'
    });
}

async function createSlide17_ImportTool(pptx) {
    const slide = pptx.addSlide();
    
    // Header
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0, y: 0, w: 10, h: 1.0,
        fill: { color: COLORS.navy }
    });
    slide.addText('Tool: Import Definition', {
        x: 0.5, y: 0.25, w: 9, h: 0.5,
        fontSize: 26, fontFace: 'Arial', bold: true, color: COLORS.white
    });

    // MCP Flow
    slide.addText('MCP Flow:', {
        x: 0.5, y: 1.1, w: 2, h: 0.3,
        fontSize: 12, fontFace: 'Arial', bold: true, color: COLORS.navy
    });
    slide.addText([
        { text: '1. Show diff/preview   ', options: { color: COLORS.darkGray } },
        { text: '→   2. Request approval (elicitation)   ', options: { color: COLORS.darkGray } },
        { text: '→   3. Execute: ', options: { color: COLORS.darkGray } },
        { text: 'fab import', options: { fontFace: 'Courier New', color: COLORS.fabricBlue } }
    ], {
        x: 1.8, y: 1.1, w: 7.7, h: 0.3,
        fontSize: 11, fontFace: 'Arial'
    });

    // Strategy values
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0.5, y: 1.5, w: 9, h: 0.9,
        fill: { color: 'FEF9E7' },
        line: { color: COLORS.yellow, width: 1 }
    });
    slide.addText([
        { text: 'Strategy Values:\n', options: { bold: true, color: COLORS.navy } },
        { text: 'overwrite', options: { fontFace: 'Courier New', color: COLORS.fabricBlue } },
        { text: ' — Replace existing   |   ', options: { color: COLORS.darkGray } },
        { text: 'skip', options: { fontFace: 'Courier New', color: COLORS.fabricBlue } },
        { text: ' — Ignore if exists   |   ', options: { color: COLORS.darkGray } },
        { text: 'rename', options: { fontFace: 'Courier New', color: COLORS.fabricBlue } },
        { text: ' — Create new with suffix', options: { color: COLORS.darkGray } }
    ], {
        x: 0.7, y: 1.55, w: 8.6, h: 0.8,
        fontSize: 11, fontFace: 'Arial', valign: 'middle'
    });

    // Parameters table
    const tableData = [
        [
            { text: 'Input', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true } },
            { text: 'Required', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true, align: 'center' } },
            { text: 'Description', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true } }
        ],
        [
            { text: 'workspace', options: { fill: { color: COLORS.lightGray }, fontFace: 'Courier New' } },
            { text: 'Yes', options: { fill: { color: COLORS.lightGray }, align: 'center', color: COLORS.green } },
            { text: 'Target workspace', options: { fill: { color: COLORS.lightGray } } }
        ],
        [
            { text: 'sourcePath', options: { fill: { color: COLORS.white }, fontFace: 'Courier New' } },
            { text: 'Yes', options: { fill: { color: COLORS.white }, align: 'center', color: COLORS.green } },
            { text: 'Local JSON file', options: { fill: { color: COLORS.white } } }
        ],
        [
            { text: 'strategy', options: { fill: { color: COLORS.lightGray }, fontFace: 'Courier New' } },
            { text: 'No', options: { fill: { color: COLORS.lightGray }, align: 'center', color: COLORS.mediumGray } },
            { text: 'Conflict resolution (see above)', options: { fill: { color: COLORS.lightGray } } }
        ],
        [
            { text: 'dryRun', options: { fill: { color: COLORS.white }, fontFace: 'Courier New' } },
            { text: 'No', options: { fill: { color: COLORS.white }, align: 'center', color: COLORS.mediumGray } },
            { text: 'Preview without applying', options: { fill: { color: COLORS.white } } }
        ]
    ];

    slide.addTable(tableData, {
        x: 0.5, y: 2.55, w: 9, h: 2.0,
        colW: [1.8, 1.2, 6],
        border: { pt: 1, color: COLORS.mediumGray },
        fontSize: 12,
        fontFace: 'Arial',
        valign: 'middle'
    });

    // Notes
    slide.addText([
        { text: '⚠️ Note: ', options: { bold: true, color: COLORS.coral } },
        { text: 'Partial updates not supported—imports replace full definition. For non-empty workspaces, use strategy flag.', options: { color: COLORS.darkGray } }
    ], {
        x: 0.5, y: 4.7, w: 9, h: 0.3,
        fontSize: 10, fontFace: 'Arial'
    });
}

async function createSlide18_ApprovalFlow(pptx) {
    const slide = pptx.addSlide();
    
    // Header
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0, y: 0, w: 10, h: 1.0,
        fill: { color: COLORS.navy }
    });
    slide.addText([
        { text: 'Discussion Point #1', options: { fontSize: 12, color: COLORS.lightBlue } }
    ], {
        x: 0.5, y: 0.15, w: 9, h: 0.25, fontFace: 'Arial'
    });
    slide.addText('Approval Flow', {
        x: 0.5, y: 0.35, w: 9, h: 0.5,
        fontSize: 24, fontFace: 'Arial', bold: true, color: COLORS.white
    });

    // Question
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0.5, y: 1.1, w: 9, h: 0.5,
        fill: { color: 'E8F4FD' }
    });
    slide.addText('❓ Question: Should import always require approval?', {
        x: 0.7, y: 1.15, w: 8.6, h: 0.4,
        fontSize: 14, fontFace: 'Arial', bold: true, color: COLORS.navy
    });

    // Options table
    const tableData = [
        [
            { text: 'Option', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true } },
            { text: 'Pros', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true } },
            { text: 'Cons', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true } }
        ],
        [
            { text: 'Always approve', options: { fill: { color: COLORS.lightGray }, bold: true } },
            { text: 'Safest, aligns with MCP spec', options: { fill: { color: COLORS.lightGray } } },
            { text: 'Extra click for dev environments', options: { fill: { color: COLORS.lightGray } } }
        ],
        [
            { text: 'Smart (prod only)', options: { fill: { color: COLORS.white }, bold: true } },
            { text: 'Faster for dev', options: { fill: { color: COLORS.white } } },
            { text: 'Complex to implement', options: { fill: { color: COLORS.white } } }
        ],
        [
            { text: 'User setting', options: { fill: { color: COLORS.lightGray }, bold: true } },
            { text: 'Flexible', options: { fill: { color: COLORS.lightGray } } },
            { text: 'User must configure', options: { fill: { color: COLORS.lightGray } } }
        ]
    ];

    slide.addTable(tableData, {
        x: 0.5, y: 1.75, w: 9, h: 1.8,
        colW: [2.5, 3.25, 3.25],
        border: { pt: 1, color: COLORS.mediumGray },
        fontSize: 12,
        fontFace: 'Arial',
        valign: 'middle'
    });

    // Recommendation
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0.5, y: 3.7, w: 9, h: 1.1,
        fill: { color: 'E8F8F5' },
        line: { color: COLORS.green, width: 2 }
    });
    slide.addText([
        { text: '✅ Recommendation: ', options: { bold: true, color: COLORS.green } },
        { text: 'Always require approval\n', options: { bold: true, color: COLORS.navy } },
        { text: 'Principle: "verify destructive actions" — Default should be "approve unless explicitly disabled"', options: { color: COLORS.darkGray, fontSize: 11 } }
    ], {
        x: 0.7, y: 3.8, w: 8.6, h: 0.9,
        fontSize: 13, fontFace: 'Arial', valign: 'middle'
    });
}

async function createSlide19_DryRun(pptx) {
    const slide = pptx.addSlide();
    
    // Header
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0, y: 0, w: 10, h: 1.0,
        fill: { color: COLORS.navy }
    });
    slide.addText([
        { text: 'Discussion Point #2', options: { fontSize: 12, color: COLORS.lightBlue } }
    ], {
        x: 0.5, y: 0.15, w: 9, h: 0.25, fontFace: 'Arial'
    });
    slide.addText('Dry-Run Capability', {
        x: 0.5, y: 0.35, w: 9, h: 0.5,
        fontSize: 24, fontFace: 'Arial', bold: true, color: COLORS.white
    });

    // Question
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0.5, y: 1.1, w: 9, h: 0.5,
        fill: { color: 'E8F4FD' }
    });
    slide.addText('❓ Question: Where does dry-run logic live?', {
        x: 0.7, y: 1.15, w: 8.6, h: 0.4,
        fontSize: 14, fontFace: 'Arial', bold: true, color: COLORS.navy
    });

    // Two column layout
    // Left: Options
    slide.addText('Options:', {
        x: 0.5, y: 1.75, w: 4, h: 0.3,
        fontSize: 12, fontFace: 'Arial', bold: true, color: COLORS.navy
    });

    const optionsTable = [
        [
            { text: 'MCP-side', options: { fill: { color: COLORS.lightGray }, bold: true } },
            { text: 'Validate locally only', options: { fill: { color: COLORS.lightGray } } }
        ],
        [
            { text: 'CLI --dry-run', options: { fill: { color: COLORS.white }, bold: true } },
            { text: 'CLI calls API in preview mode', options: { fill: { color: COLORS.white } } }
        ],
        [
            { text: 'Both', options: { fill: { color: 'D5F5E3' }, bold: true, color: COLORS.green } },
            { text: 'Best coverage', options: { fill: { color: 'D5F5E3' } } }
        ]
    ];

    slide.addTable(optionsTable, {
        x: 0.5, y: 2.05, w: 4.3, h: 1.3,
        colW: [1.5, 2.8],
        border: { pt: 1, color: COLORS.mediumGray },
        fontSize: 11,
        fontFace: 'Arial',
        valign: 'middle'
    });

    // Right: What to validate
    slide.addText('What should dry-run validate?', {
        x: 5.2, y: 1.75, w: 4.3, h: 0.3,
        fontSize: 12, fontFace: 'Arial', bold: true, color: COLORS.navy
    });

    slide.addText([
        { text: '✅ JSON schema correctness\n', options: { color: COLORS.green } },
        { text: '✅ API compatibility (type, version)\n', options: { color: COLORS.green } },
        { text: '✅ Workspace constraints\n', options: { color: COLORS.green } },
        { text: '    (permissions, capacity, naming)\n', options: { color: COLORS.darkGray, fontSize: 10 } },
        { text: '❓ Simulate dependency resolution?', options: { color: COLORS.yellow, fontSize: 10 } }
    ], {
        x: 5.2, y: 2.1, w: 4.3, h: 1.5,
        fontSize: 12, fontFace: 'Arial'
    });

    // Question for CLI team
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0.5, y: 3.6, w: 9, h: 0.9,
        fill: { color: 'FEF9E7' },
        line: { color: COLORS.yellow, width: 2 }
    });
    slide.addText([
        { text: '🔧 CLI Status: ', options: { bold: true, color: COLORS.yellow } },
        { text: 'fab import --dry-run', options: { fontFace: 'Courier New', color: COLORS.fabricBlue } },
        { text: ' does not exist yet.\n', options: { color: COLORS.navy } },
        { text: '     In CLI backlog but not currently prioritized. Should we elevate priority?', options: { color: COLORS.darkGray, fontSize: 11 } }
    ], {
        x: 0.7, y: 3.65, w: 8.6, h: 0.8,
        fontSize: 13, fontFace: 'Arial', valign: 'middle'
    });
}

async function createSlide20_CLIRequirements(pptx) {
    const slide = pptx.addSlide();
    
    // Header
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0, y: 0, w: 10, h: 1.0,
        fill: { color: COLORS.navy }
    });
    slide.addText('CLI Requirements', {
        x: 0.5, y: 0.25, w: 9, h: 0.5,
        fontSize: 26, fontFace: 'Arial', bold: true, color: COLORS.white
    });

    // Requirements table
    const tableData = [
        [
            { text: 'Requirement', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true } },
            { text: 'Status', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true, align: 'center' } },
            { text: 'Notes', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true } }
        ],
        [
            { text: 'fab export command', options: { fill: { color: COLORS.lightGray }, fontFace: 'Courier New' } },
            { text: '✅', options: { fill: { color: COLORS.lightGray }, align: 'center', fontSize: 16 } },
            { text: 'Already available', options: { fill: { color: COLORS.lightGray } } }
        ],
        [
            { text: 'fab import command', options: { fill: { color: COLORS.white }, fontFace: 'Courier New' } },
            { text: '✅', options: { fill: { color: COLORS.white }, align: 'center', fontSize: 16 } },
            { text: 'Already available', options: { fill: { color: COLORS.white } } }
        ],
        [
            { text: '--dry-run flag', options: { fill: { color: COLORS.lightGray }, fontFace: 'Courier New' } },
            { text: '❓', options: { fill: { color: COLORS.lightGray }, align: 'center', fontSize: 16 } },
            { text: 'Needed for preview', options: { fill: { color: COLORS.lightGray } } }
        ],
        [
            { text: 'JSON output format', options: { fill: { color: COLORS.white }, fontFace: 'Courier New' } },
            { text: '❓', options: { fill: { color: COLORS.white }, align: 'center', fontSize: 16 } },
            { text: 'For MCP parsing', options: { fill: { color: COLORS.white } } }
        ],
        [
            { text: 'Error codes', options: { fill: { color: COLORS.lightGray }, fontFace: 'Courier New' } },
            { text: '❓', options: { fill: { color: COLORS.lightGray }, align: 'center', fontSize: 16 } },
            { text: 'For error handling', options: { fill: { color: COLORS.lightGray } } }
        ],
        [
            { text: 'fab deploy', options: { fill: { color: COLORS.white }, fontFace: 'Courier New' } },
            { text: '🔄', options: { fill: { color: COLORS.white }, align: 'center', fontSize: 16 } },
            { text: 'fabric-cicd integration (future)', options: { fill: { color: COLORS.white } } }
        ],
        [
            { text: 'Folder structure', options: { fill: { color: COLORS.lightGray }, fontFace: 'Courier New' } },
            { text: '❓', options: { fill: { color: COLORS.lightGray }, align: 'center', fontSize: 16 } },
            { text: 'Preserve workspace folder layout', options: { fill: { color: COLORS.lightGray } } }
        ]
    ];

    slide.addTable(tableData, {
        x: 0.5, y: 1.1, w: 9, h: 3.1,
        colW: [2.5, 0.8, 5.7],
        border: { pt: 1, color: COLORS.mediumGray },
        fontSize: 12,
        fontFace: 'Arial',
        valign: 'middle'
    });

    // Known limitations
    slide.addText('Known Limitations to Discuss:', {
        x: 0.5, y: 4.05, w: 9, h: 0.3,
        fontSize: 12, fontFace: 'Arial', bold: true, color: COLORS.coral
    });
    slide.addText([
        { text: '⚠️ Large JSON payloads (>100KB) — use file-based flow\n', options: { color: COLORS.darkGray } },
        { text: '⚠️ Unsupported item types (e.g., paginated reports) — validate before import\n', options: { color: COLORS.darkGray } },
        { text: '⚠️ Cross-workspace dependencies — how should CLI handle?', options: { color: COLORS.darkGray } }
    ], {
        x: 0.5, y: 4.35, w: 9, h: 0.8,
        fontSize: 11, fontFace: 'Arial'
    });
}

async function createSlide21_Risks(pptx) {
    const slide = pptx.addSlide();
    
    // Header
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0, y: 0, w: 10, h: 1.0,
        fill: { color: COLORS.navy }
    });
    slide.addText('Risks & Mitigations', {
        x: 0.5, y: 0.25, w: 9, h: 0.5,
        fontSize: 26, fontFace: 'Arial', bold: true, color: COLORS.white
    });

    // Risks table
    const tableData = [
        [
            { text: 'Risk', options: { fill: { color: COLORS.coral }, color: COLORS.white, bold: true } },
            { text: 'Mitigation', options: { fill: { color: COLORS.green }, color: COLORS.white, bold: true } }
        ],
        [
            { text: 'Import fails mid-way', options: { fill: { color: COLORS.lightGray } } },
            { text: 'Use atomic API or rollback logic', options: { fill: { color: COLORS.lightGray } } }
        ],
        [
            { text: 'Unsupported item types', options: { fill: { color: COLORS.white } } },
            { text: 'Validate before import; warn user', options: { fill: { color: COLORS.white } } }
        ],
        [
            { text: 'Large JSON payloads', options: { fill: { color: COLORS.lightGray } } },
            { text: 'Use file-based flow; avoid LLM parsing', options: { fill: { color: COLORS.lightGray } } }
        ],
        [
            { text: 'Agent misfires', options: { fill: { color: COLORS.white } } },
            { text: 'Require explicit approval before execution', options: { fill: { color: COLORS.white } } }
        ],
        [
            { text: 'Permission errors', options: { fill: { color: COLORS.lightGray } } },
            { text: 'Inherit user permissions; fail fast with clear message', options: { fill: { color: COLORS.lightGray } } }
        ]
    ];

    slide.addTable(tableData, {
        x: 0.5, y: 1.2, w: 9, h: 3.3,
        colW: [3.5, 5.5],
        border: { pt: 1, color: COLORS.mediumGray },
        fontSize: 13,
        fontFace: 'Arial',
        valign: 'middle'
    });
}

async function createSlide22_OpenQuestions(pptx) {
    const slide = pptx.addSlide();
    
    // Header
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0, y: 0, w: 10, h: 1.0,
        fill: { color: COLORS.navy }
    });
    slide.addText('Open Questions', {
        x: 0.5, y: 0.25, w: 9, h: 0.5,
        fontSize: 26, fontFace: 'Arial', bold: true, color: COLORS.white
    });

    // Questions table
    const tableData = [
        [
            { text: 'Question', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true } },
            { text: 'Owner', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true, align: 'center' } }
        ],
        [
            { text: 'Should import support partial updates (e.g., patching a report)?', options: { fill: { color: COLORS.lightGray } } },
            { text: 'Platform', options: { fill: { color: COLORS.lightGray }, align: 'center', color: COLORS.fabricBlue, bold: true } }
        ],
        [
            { text: 'How do we handle cross-workspace dependencies?', options: { fill: { color: COLORS.white } } },
            { text: 'CLI / Platform', options: { fill: { color: COLORS.white }, align: 'center', color: COLORS.fabricBlue, bold: true } }
        ],
        [
            { text: 'Can we support environment-specific parameterization (e.g., variable library)?', options: { fill: { color: COLORS.lightGray } } },
            { text: 'CLI / Engineering', options: { fill: { color: COLORS.lightGray }, align: 'center', color: COLORS.fabricBlue, bold: true } }
        ],
        [
            { text: 'What item types are NOT supported by export/import API?', options: { fill: { color: COLORS.white } } },
            { text: 'Platform', options: { fill: { color: COLORS.white }, align: 'center', color: COLORS.fabricBlue, bold: true } }
        ]
    ];

    slide.addTable(tableData, {
        x: 0.5, y: 1.2, w: 9, h: 2.8,
        colW: [6.5, 2.5],
        border: { pt: 1, color: COLORS.mediumGray },
        fontSize: 13,
        fontFace: 'Arial',
        valign: 'middle'
    });
}

async function createSlide23_Decisions(pptx) {
    const html = `<!DOCTYPE html>
<html>
<head>
<style>
html { background: #0078D4; }
body {
    width: ${SLIDE_W}pt; height: ${SLIDE_H}pt; margin: 0; padding: 0;
    background: #0078D4;
    font-family: Arial, sans-serif;
    display: flex; flex-direction: column;
}
.header { padding: 20pt 40pt; }
.part-label { color: #E8F4FD; font-size: 12pt; margin: 0 0 6pt 0; text-transform: uppercase; letter-spacing: 1pt; }
.header-title { color: #FFFFFF; font-size: 26pt; font-weight: bold; margin: 0; }
.content { padding: 15pt 40pt; flex: 1; }
.decision { background: rgba(255,255,255,0.95); border-radius: 8pt; padding: 15pt 20pt; margin-bottom: 15pt; display: flex; align-items: center; gap: 15pt; }
.number { background: #1C2833; color: #FFFFFF; font-size: 18pt; font-weight: bold; width: 32pt; height: 32pt; border-radius: 16pt; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.number-text { color: #FFFFFF; font-size: 16pt; font-weight: bold; margin: 0; }
.decision-content { flex: 1; }
.decision-title { color: #1C2833; font-size: 16pt; font-weight: bold; margin: 0 0 4pt 0; }
.decision-options { color: #666666; font-size: 12pt; margin: 0; }
</style>
</head>
<body>
<div class="header">
    <p class="part-label">Part 5: Next Steps</p>
    <h1 class="header-title">Decisions to Make Today</h1>
</div>
<div class="content">
    <div class="decision">
        <div class="number"><p class="number-text">1</p></div>
        <div class="decision-content">
            <p class="decision-title">Approval Flow</p>
            <p class="decision-options">Always / Smart / User setting</p>
        </div>
    </div>
    <div class="decision">
        <div class="number"><p class="number-text">2</p></div>
        <div class="decision-content">
            <p class="decision-title">Dry-run Owner</p>
            <p class="decision-options">MCP / CLI / Both</p>
        </div>
    </div>
    <div class="decision">
        <div class="number"><p class="number-text">3</p></div>
        <div class="decision-content">
            <p class="decision-title">CLI Requirements</p>
            <p class="decision-options">Confirm what's needed from CLI team</p>
        </div>
    </div>
</div>
</body>
</html>`;
    fs.writeFileSync(path.join(__dirname, 'slide23.html'), html);
    await html2pptx(path.join(__dirname, 'slide23.html'), pptx);
}

async function createSlide24_ActionItems(pptx) {
    const slide = pptx.addSlide();
    
    // Header
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0, y: 0, w: 10, h: 1.0,
        fill: { color: COLORS.navy }
    });
    slide.addText('Action Items', {
        x: 0.5, y: 0.25, w: 9, h: 0.5,
        fontSize: 26, fontFace: 'Arial', bold: true, color: COLORS.white
    });

    // Action items table
    const tableData = [
        [
            { text: 'Action', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true } },
            { text: 'Owner', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true, align: 'center' } },
            { text: 'Due', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true, align: 'center' } }
        ],
        [
            { text: 'Finalize tool input/output schemas', options: { fill: { color: COLORS.lightGray } } },
            { text: 'Hasan', options: { fill: { color: COLORS.lightGray }, align: 'center', bold: true } },
            { text: 'Feb 7', options: { fill: { color: COLORS.lightGray }, align: 'center', color: COLORS.coral } }
        ],
        [
            { text: 'Confirm CLI dry-run / JSON output', options: { fill: { color: COLORS.white } } },
            { text: 'CLI Team', options: { fill: { color: COLORS.white }, align: 'center', bold: true } },
            { text: 'Feb 7', options: { fill: { color: COLORS.white }, align: 'center', color: COLORS.coral } }
        ],
        [
            { text: 'Create ADO work items', options: { fill: { color: COLORS.lightGray } } },
            { text: 'Hasan', options: { fill: { color: COLORS.lightGray }, align: 'center', bold: true } },
            { text: 'Feb 10', options: { fill: { color: COLORS.lightGray }, align: 'center', color: COLORS.coral } }
        ],
        [
            { text: 'Begin implementation', options: { fill: { color: COLORS.white } } },
            { text: 'Engineering', options: { fill: { color: COLORS.white }, align: 'center', bold: true } },
            { text: 'Feb 12', options: { fill: { color: COLORS.white }, align: 'center', color: COLORS.coral } }
        ]
    ];

    slide.addTable(tableData, {
        x: 0.5, y: 1.2, w: 9, h: 2.2,
        colW: [5.5, 2, 1.5],
        border: { pt: 1, color: COLORS.mediumGray },
        fontSize: 14,
        fontFace: 'Arial',
        valign: 'middle'
    });

    // Parking lot
    slide.addText('Parking Lot (Future Discussions)', {
        x: 0.5, y: 3.6, w: 9, h: 0.4,
        fontSize: 14, fontFace: 'Arial', bold: true, color: COLORS.navy
    });

    const parkingLot = [
        ['Workspace-level deployment (fab deploy)', 'After fabric-cicd lands'],
        ['Batch import/export', 'After CLI batch support'],
        ['MCP Resources (schemas, CLI help)', 'Q2 planning'],
        ['MCP Prompts (/export, /import templates)', 'Q2 planning']
    ];

    slide.addTable(parkingLot, {
        x: 0.5, y: 4.0, w: 9, h: 1.0,
        colW: [5.5, 3.5],
        border: { pt: 1, color: COLORS.mediumGray },
        fontSize: 11,
        fontFace: 'Arial',
        fill: { color: COLORS.lightGray },
        valign: 'middle'
    });
}

async function createSlide25_Principles(pptx) {
    const slide = pptx.addSlide();
    
    // Header
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0, y: 0, w: 10, h: 1.0,
        fill: { color: COLORS.darkNavy }
    });
    slide.addText([
        { text: 'Appendix', options: { fontSize: 12, color: COLORS.mediumGray } }
    ], {
        x: 0.5, y: 0.15, w: 9, h: 0.25, fontFace: 'Arial'
    });
    slide.addText('Guiding Principles', {
        x: 0.5, y: 0.35, w: 9, h: 0.5,
        fontSize: 24, fontFace: 'Arial', bold: true, color: COLORS.white
    });

    // Principles
    const principles = [
        'Trust agents, verify destructive actions',
        'Agents inherit user permissions',
        'Offline-first for context',
        'CLI over SDK for code gen',
        'Errors must teach, not just fail',
        'Optimize for LLM context windows'
    ];

    principles.forEach((principle, i) => {
        const yPos = 1.15 + (i * 0.52);
        const isEven = i % 2 === 0;
        
        slide.addShape(pptx.shapes.RECTANGLE, {
            x: 0.5, y: yPos, w: 5.8, h: 0.45,
            fill: { color: isEven ? COLORS.lightGray : COLORS.white }
        });
        slide.addText(`${i + 1}`, {
            x: 0.6, y: yPos + 0.05, w: 0.4, h: 0.35,
            fontSize: 14, fontFace: 'Arial', bold: true, color: COLORS.fabricBlue
        });
        slide.addText(principle, {
            x: 1.1, y: yPos + 0.05, w: 5, h: 0.35,
            fontSize: 13, fontFace: 'Arial', color: COLORS.navy
        });
    });

    // Success metrics
    slide.addText('Success Metrics (GA Target)', {
        x: 6.5, y: 1.15, w: 3, h: 0.35,
        fontSize: 13, fontFace: 'Arial', bold: true, color: COLORS.navy
    });

    const metricsTable = [
        [
            { text: 'Metric', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true, fontSize: 10 } },
            { text: 'Target', options: { fill: { color: COLORS.darkGray }, color: COLORS.white, bold: true, fontSize: 10, align: 'center' } }
        ],
        [
            { text: 'Weekly Active Users', options: { fill: { color: COLORS.lightGray }, fontSize: 10 } },
            { text: '5,000+', options: { fill: { color: COLORS.lightGray }, fontSize: 10, align: 'center', bold: true, color: COLORS.green } }
        ],
        [
            { text: 'First-try deployment success', options: { fill: { color: COLORS.white }, fontSize: 10 } },
            { text: '75%+', options: { fill: { color: COLORS.white }, fontSize: 10, align: 'center', bold: true, color: COLORS.green } }
        ],
        [
            { text: 'Time to author item', options: { fill: { color: COLORS.lightGray }, fontSize: 10 } },
            { text: '< 5 min', options: { fill: { color: COLORS.lightGray }, fontSize: 10, align: 'center', bold: true, color: COLORS.green } }
        ]
    ];

    slide.addTable(metricsTable, {
        x: 6.5, y: 1.55, w: 3, h: 1.4,
        colW: [2, 1],
        border: { pt: 1, color: COLORS.mediumGray },
        fontFace: 'Arial',
        valign: 'middle'
    });

    // Resources
    slide.addText('Resources', {
        x: 6.5, y: 3.15, w: 3, h: 0.35,
        fontSize: 13, fontFace: 'Arial', bold: true, color: COLORS.navy
    });
    slide.addText([
        { text: '• Meeting Summary\n', options: { color: COLORS.darkGray, fontSize: 10 } },
        { text: '• Tool Spec\n', options: { color: COLORS.darkGray, fontSize: 10 } },
        { text: '• Research Document\n', options: { color: COLORS.darkGray, fontSize: 10 } },
        { text: '• Main Spec (V5)', options: { color: COLORS.darkGray, fontSize: 10 } }
    ], {
        x: 6.5, y: 3.5, w: 3, h: 1.2,
        fontFace: 'Arial'
    });
}

// Run the presentation builder
createPresentation().catch(err => {
    console.error('Error creating presentation:', err);
    process.exit(1);
});
