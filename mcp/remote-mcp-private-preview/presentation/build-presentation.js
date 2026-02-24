/**
 * Fabric MCP Server - Getting Started Presentation Builder
 * 
 * This script converts HTML slides to a PowerPoint presentation using html2pptx.
 * Run with: node build-presentation.js
 */

const path = require('path');

// Skills directory path - go up to my-pm-work, then into .copilot/skills/pptx/scripts
const skillsDir = path.resolve(__dirname, '../../../.copilot/skills/pptx/scripts');
const pptxgen = require(path.join(skillsDir, 'node_modules/pptxgenjs'));
const html2pptx = require(path.join(skillsDir, 'html2pptx'));

async function buildPresentation() {
    console.log('Building Fabric MCP Server Getting Started presentation...\n');
    
    const pptx = new pptxgen();
    
    // Set presentation metadata
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'Hasan Abo-Shally';
    pptx.title = 'Getting Started with Fabric MCP Server';
    pptx.subject = 'Private Preview Onboarding Guide';
    pptx.company = 'Microsoft';
    
    // Define slides in order
    const slides = [
        'slide01-title.html',
        'slide02-welcome.html',
        'slide03-tldr.html',
        'slide04-what-is-mcp.html',
        'slide05-local-vs-remote.html',
        'slide06-fabric-mcp.html',
        'slide07-prerequisites.html',
        'slide08-quickstart-vscode.html',
        'slide09-quickstart-claude.html',
        'slide10-graph-mcp.html',
        'slide11-tools-workspaces.html',
        'slide12-tools-items.html',
        'slide13-workflows.html',
        'slide14-troubleshooting.html',
        'slide15-feedback.html',
        'slide16-roadmap.html',
        'slide17-quickref.html',
        'slide18-thankyou.html'
    ];
    
    // Process each slide
    for (let i = 0; i < slides.length; i++) {
        const slideFile = slides[i];
        const slidePath = path.join(__dirname, slideFile);
        
        console.log(`Processing slide ${i + 1}/${slides.length}: ${slideFile}`);
        
        try {
            await html2pptx(slidePath, pptx);
        } catch (error) {
            console.error(`Error processing ${slideFile}:`, error.message);
            throw error;
        }
    }
    
    // Save the presentation
    const outputPath = path.join(__dirname, 'Fabric-MCP-Getting-Started.pptx');
    await pptx.writeFile({ fileName: outputPath });
    
    console.log(`\nPresentation created successfully!`);
    console.log(`Output: ${outputPath}`);
    console.log(`Total slides: ${slides.length}`);
}

// Run the build
buildPresentation().catch(err => {
    console.error('Build failed:', err);
    process.exit(1);
});
