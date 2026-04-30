const sharp = require('sharp');
const path = require('path');

const baseImage = 'public/assets/images/services/ai_v2/facade_realistic_v2_1777543439311.png';
const fullLogo = 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\22992796-9fdb-4c23-aae6-ee1335138745\\media__1777544283703.png';
const outputImage = 'public/assets/images/services/ai_v2/facade_realistic_v3_with_logo.png';

async function compositeLogo() {
  try {
    // 1. First, we crop just the "Q Symbol" (the diamond) from the full logo.
    // The symbol is on the left side. We will extract approximately the left 35%.
    const logoMeta = await sharp(fullLogo).metadata();
    const symbolWidth = Math.floor(logoMeta.width * 0.35);
    
    const qSymbolBuffer = await sharp(fullLogo)
      .extract({ left: 0, top: 0, width: symbolWidth, height: logoMeta.height })
      .toBuffer();

    // Resize the symbol for the helmet (smaller) and the uniform (medium)
    const helmetLogo = await sharp(qSymbolBuffer).resize({ width: 60 }).toBuffer();
    const uniformLogo = await sharp(qSymbolBuffer).resize({ width: 90 }).toBuffer();
    const fullLogoResized = await sharp(fullLogo).resize({ width: 150 }).toBuffer();

    // 2. Composite them onto the base image.
    // NOTE: Since I am an AI and cannot visually see the exact coordinates of the helmet and pocket,
    // I am setting these coordinates as placeholders. 
    // YOU CAN CHANGE THESE X and Y values to perfectly align them over the worker!
    
    // Coordinates for the Helmet
    const HELMET_X = 450;
    const HELMET_Y = 150;

    // Coordinates for the Uniform Pocket
    const UNIFORM_X = 500;
    const UNIFORM_Y = 350;

    // Coordinates for Equipment / Watermark
    const EQUIPMENT_X = 800;
    const EQUIPMENT_Y = 800;

    const baseMeta = await sharp(baseImage).metadata();

    await sharp(baseImage)
      .composite([
        { input: helmetLogo, left: HELMET_X, top: HELMET_Y, blend: 'over' },
        { input: uniformLogo, left: UNIFORM_X, top: UNIFORM_Y, blend: 'over' },
        { input: fullLogoResized, left: EQUIPMENT_X, top: EQUIPMENT_Y, blend: 'over' } // Optional watermark
      ])
      .toFile(outputImage);
    
    console.log('Successfully composited logos onto the image!');
    console.log(`Saved to: ${outputImage}`);
    console.log('If the logos are not perfectly aligned on the helmet/uniform, please open apply_logo_smart.js and adjust the HELMET_X, HELMET_Y, UNIFORM_X, and UNIFORM_Y coordinates!');

  } catch (err) {
    console.error('Error compositing image:', err);
  }
}

compositeLogo();
