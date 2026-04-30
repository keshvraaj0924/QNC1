const sharp = require('sharp');

const baseImage = 'public/assets/images/services/ai_v2/facade_realistic_v2_1777543439311.png';
const fullLogo = 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\22992796-9fdb-4c23-aae6-ee1335138745\\media__1777544283703.png';
const outputImage = 'public/assets/images/services/ai_v2/facade_realistic_v5.png';

async function processImage() {
  try {
    const baseMeta = await sharp(baseImage).metadata();
    const logoMeta = await sharp(fullLogo).metadata();
    
    // Extract just the Q Symbol (diamond)
    const symbolWidth = Math.floor(logoMeta.width * 0.35);
    const qSymbolBuffer = await sharp(fullLogo)
      .extract({ left: 0, top: 0, width: symbolWidth, height: logoMeta.height })
      .resize({ width: 70 })
      .toBuffer();

    // Resize for helmet (smaller)
    const qHelmetBuffer = await sharp(fullLogo)
      .extract({ left: 0, top: 0, width: symbolWidth, height: logoMeta.height })
      .resize({ width: 45 })
      .toBuffer();

    // Coordinates logic based on typical portrait framing
    // Chest is usually around 65% down the image, centered horizontally
    const chestX = Math.floor(baseMeta.width / 2) - 35; // Center X minus half width
    const chestY = Math.floor(baseMeta.height * 0.65);

    // Helmet is usually around 15% down the image, centered horizontally
    const helmetX = Math.floor(baseMeta.width / 2) - 22; // Center X minus half width
    const helmetY = Math.floor(baseMeta.height * 0.15);

    // Bottom right watermark
    const fullLogoResized = await sharp(fullLogo)
      .resize({ width: 180 })
      .toBuffer();

    await sharp(baseImage)
      .composite([
        { input: qSymbolBuffer, left: chestX, top: chestY, blend: 'over' },
        { input: qHelmetBuffer, left: helmetX, top: helmetY, blend: 'over' },
        { input: fullLogoResized, gravity: 'southeast', blend: 'over' }
      ])
      .toFile(outputImage);
      
    console.log(`Image generated successfully at ${outputImage} with Chest at (${chestX}, ${chestY}) and Helmet at (${helmetX}, ${helmetY})`);
  } catch(e) {
    console.error(e);
  }
}

processImage();
