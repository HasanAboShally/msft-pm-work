const sharp = require('sharp');
const path = require('path');

const ASSETS = path.join(__dirname, 'assets');

async function createGradient(filename, color1, color2, angle = '135') {
  const x1 = angle === '135' ? '0%' : '0%';
  const y1 = angle === '135' ? '0%' : '0%';
  const x2 = angle === '135' ? '100%' : '100%';
  const y2 = angle === '135' ? '100%' : '0%';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="810">
    <defs><linearGradient id="g" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">
      <stop offset="0%" style="stop-color:${color1}"/>
      <stop offset="100%" style="stop-color:${color2}"/>
    </linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(path.join(ASSETS, filename));
}

async function createAccentBar(filename, color, w = 1440, h = 6) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <rect width="100%" height="100%" fill="${color}"/>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(path.join(ASSETS, filename));
}

async function createCircle(filename, color, size = 200, opacity = 0.15) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="${color}" opacity="${opacity}"/>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(path.join(ASSETS, filename));
}

async function main() {
  // Dark gradient backgrounds
  await createGradient('bg-dark.png', '#0A1628', '#162544');
  await createGradient('bg-dark-alt.png', '#0D1B30', '#1A3050');
  await createGradient('bg-title.png', '#060E1A', '#0F1B2D');
  
  // Light background
  await createGradient('bg-light.png', '#F8F9FA', '#EDF2F7');
  
  // Pain/urgency background
  await createGradient('bg-warm.png', '#1A0A0A', '#2D1420');
  
  // Accent bars
  await createAccentBar('bar-cyan.png', '#00B4D8', 1440, 8);
  await createAccentBar('bar-coral.png', '#FF6B35', 1440, 8);
  await createAccentBar('bar-gradient.png', '#00B4D8', 600, 4);
  
  // Decorative circles
  await createCircle('circle-cyan.png', '#00B4D8', 300, 0.08);
  await createCircle('circle-coral.png', '#FF6B35', 250, 0.08);
  
  console.log('Assets generated!');
}

main().catch(console.error);
