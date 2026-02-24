const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ASSETS_DIR = path.join(__dirname, 'assets');
fs.mkdirSync(ASSETS_DIR, { recursive: true });

async function createAsset(name, svg) {
  await sharp(Buffer.from(svg)).png().toFile(path.join(ASSETS_DIR, name));
  console.log(`  ✓ ${name}`);
}

async function generate() {
  console.log('Generating light-theme assets...');

  // Clean white background with subtle warm gradient
  await createAsset('bg-white.png', `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="562">
    <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FFFFFF"/>
      <stop offset="100%" style="stop-color:#F7F8FC"/>
    </linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
  </svg>`);

  // Soft blue-tinted background for variety
  await createAsset('bg-soft.png', `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="562">
    <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#F0F4FF"/>
      <stop offset="100%" style="stop-color:#E8ECF8"/>
    </linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
  </svg>`);

  // Title slide — deeper blue gradient
  await createAsset('bg-title.png', `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="562">
    <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0F1B2D"/>
      <stop offset="50%" style="stop-color:#162544"/>
      <stop offset="100%" style="stop-color:#1C3055"/>
    </linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
  </svg>`);

  // Closing slide — rich navy
  await createAsset('bg-navy.png', `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="562">
    <defs><linearGradient id="g" x1="0%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" style="stop-color:#0A1628"/>
      <stop offset="100%" style="stop-color:#142340"/>
    </linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
  </svg>`);

  // Accent bars
  await createAsset('bar-blue.png', `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="8">
    <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#0078D4"/>
      <stop offset="50%" style="stop-color:#00B4D8"/>
      <stop offset="100%" style="stop-color:#48CAE4"/>
    </linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
  </svg>`);

  await createAsset('bar-gradient.png', `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="5">
    <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#0078D4"/>
      <stop offset="40%" style="stop-color:#00B4D8"/>
      <stop offset="100%" style="stop-color:#FF6B35"/>
    </linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
  </svg>`);

  console.log('Done!');
}

generate().catch(console.error);
