const pptxgen = require('pptxgenjs');
const html2pptx = require('/Users/hasan-msft/msft-dev/my-pm-work/.copilot/skills/pptx/scripts/html2pptx');
const path = require('path');

async function createPresentation() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'Hasan Abo Shally';
    pptx.title = 'DXA Strategy Brainstorm';
    pptx.subject = '30-Minute Working Session';
    
    const slidesDir = '/Users/hasan-msft/msft-dev/my-pm-work/strategy/presentation';
    
    // Slide 1: Title
    console.log('Processing slide 1: Title...');
    await html2pptx(path.join(slidesDir, 'slide01-title.html'), pptx);
    
    // Slide 2: Research
    console.log('Processing slide 2: Research...');
    await html2pptx(path.join(slidesDir, 'slide02-research.html'), pptx);
    
    // Slide 3: Question
    console.log('Processing slide 3: Question...');
    await html2pptx(path.join(slidesDir, 'slide03-question.html'), pptx);
    
    // Slide 4: Direction 1
    console.log('Processing slide 4: Direction 1...');
    await html2pptx(path.join(slidesDir, 'slide04-direction1.html'), pptx);
    
    // Slide 5: Direction 2
    console.log('Processing slide 5: Direction 2...');
    await html2pptx(path.join(slidesDir, 'slide05-direction2.html'), pptx);
    
    // Slide 6: Direction 3
    console.log('Processing slide 6: Direction 3...');
    await html2pptx(path.join(slidesDir, 'slide06-direction3.html'), pptx);
    
    // Slide 7: Direction 4
    console.log('Processing slide 7: Direction 4...');
    await html2pptx(path.join(slidesDir, 'slide07-direction4.html'), pptx);
    
    // Slide 8: Direction 5
    console.log('Processing slide 8: Direction 5...');
    await html2pptx(path.join(slidesDir, 'slide08-direction5.html'), pptx);
    
    // Slide 9: Summary
    console.log('Processing slide 9: Summary...');
    await html2pptx(path.join(slidesDir, 'slide09-summary.html'), pptx);
    
    // Slide 10: Discussion
    console.log('Processing slide 10: Discussion...');
    await html2pptx(path.join(slidesDir, 'slide10-discussion.html'), pptx);
    
    // Save
    const outputPath = path.join(slidesDir, 'DXA-Strategy-Brainstorm.pptx');
    await pptx.writeFile({ fileName: outputPath });
    console.log(`\nPresentation created successfully: ${outputPath}`);
}

createPresentation().catch(err => {
    console.error('Error creating presentation:', err);
    process.exit(1);
});
