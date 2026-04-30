const sharp = require('sharp');
const path = require('path');

const baseImage = 'public/assets/images/services/ai_v2/facade_realistic_v2_1777543439311.png';
const fullLogo = 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\22992796-9fdb-4c23-aae6-ee1335138745\\media__1777544283703.png';
const outputImage = 'public/assets/images/services/ai_v2/facade_realistic_v4.png';

async function processImage() {
  try {
    const logoMeta = await sharp(fullLogo).metadata();
    
    // 1. Crop just the Q Symbol
    const symbolWidth = Math.floor(logoMeta.width * 0.35);
    const qSymbolBuffer = await sharp(fullLogo)
      .extract({ left: 0, top: 0, width: symbolWidth, height: logoMeta.height })
      .resize({ width: 70 }) // Uniform badge size
      .toBuffer();

    // 2. Full logo for equipment/watermark
    const fullLogoResized = await sharp(fullLogo)
      .resize({ width: 180 })
      .toBuffer();

    // 3. Composite!
    // Gravity center usually places it right on the worker's chest in these AI portraits
    await sharp(baseImage)
      .composite([
        { input: qSymbolBuffer, gravity: 'center', blend: 'over' },
        { input: fullLogoResized, gravity: 'southeast', blend: 'over' }
      ])
      .toFile(outputImage);
      
    console.log('Image generated successfully at', outputImage);
  } catch(e) {
    console.error(e);
  }
}

processImage();
