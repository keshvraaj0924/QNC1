const sharp = require('sharp');
const path = require('path');

const baseImage = 'public/assets/images/services/ai_v2/facade_realistic_v2_1777543439311.png';
// The logo the user just attached
const logoImage = 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\22992796-9fdb-4c23-aae6-ee1335138745\\media__1777544283703.png';
const outputImage = 'public/assets/images/services/ai_v2/facade_realistic_v3_with_logo.png';

async function compositeLogo() {
  try {
    // Read the base image metadata to get dimensions
    const baseMetadata = await sharp(baseImage).metadata();
    
    // Resize the logo to be 20% of the image width
    const targetWidth = Math.round(baseMetadata.width * 0.20);
    
    const logoBuffer = await sharp(logoImage)
      .resize({ width: targetWidth })
      .toBuffer();

    // Composite the logo onto the base image in the bottom right corner with some padding
    await sharp(baseImage)
      .composite([
        {
          input: logoBuffer,
          gravity: 'southeast', // Bottom right
          blend: 'over'
        }
      ])
      .toFile(outputImage);
    
    console.log('Successfully composited logo.');
  } catch (err) {
    console.error('Error compositing image:', err);
  }
}

compositeLogo();
