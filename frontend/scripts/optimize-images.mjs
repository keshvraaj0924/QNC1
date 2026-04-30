/**
 * QNC Image Optimizer
 * Compresses raw DSLR JPGs (7-10MB each) to web-optimized WebP (~100-200KB each).
 * Uses sharp (already bundled with Next.js).
 */
import sharp from 'sharp';
import { readdirSync, existsSync, mkdirSync, statSync } from 'fs';
import { join, basename, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const INPUT_DIR = join(__dirname, '..', 'public', 'assets', 'images', 'services', 'ai_v2');
const OUTPUT_DIR = join(INPUT_DIR, 'optimized');

if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

console.log('\n🖼️  QNC Image Optimizer');
console.log('======================\n');

const files = readdirSync(INPUT_DIR).filter(f =>
  /\.(jpg|jpeg|png)$/i.test(f) && !f.startsWith('.')
);

console.log(`Found ${files.length} images to optimize\n`);

let totalOriginal = 0;
let totalOptimized = 0;
let processed = 0;

for (const file of files) {
  const inputPath = join(INPUT_DIR, file);
  const outputName = basename(file, extname(file)) + '.webp';
  const outputPath = join(OUTPUT_DIR, outputName);

  const originalSize = statSync(inputPath).size;
  totalOriginal += originalSize;

  try {
    await sharp(inputPath)
      .resize(1200, 800, {
        fit: 'cover',
        withoutEnlargement: true
      })
      .webp({
        quality: 75,
        effort: 4
      })
      .toFile(outputPath);

    const optimizedSize = statSync(outputPath).size;
    totalOptimized += optimizedSize;
    processed++;

    const reduction = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
    const origMB = (originalSize / (1024 * 1024)).toFixed(2);
    const optKB = (optimizedSize / 1024).toFixed(0);

    console.log(`  ✅ ${file} — ${origMB}MB → ${optKB}KB (${reduction}% reduction)`);
  } catch (err) {
    console.log(`  ❌ ${file} — ${err.message}`);
  }
}

console.log('\n📊 Summary');
console.log(`   Processed: ${processed}/${files.length} images`);
console.log(`   Original total:  ${(totalOriginal / (1024 * 1024)).toFixed(2)} MB`);
console.log(`   Optimized total: ${(totalOptimized / (1024 * 1024)).toFixed(2)} MB`);
console.log(`   Total reduction: ${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}%`);
console.log('\n🖼️  Done!\n');
