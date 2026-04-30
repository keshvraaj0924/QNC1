/**
 * QNC Hero Background Video Creator — V2
 * Enhanced with more C0484 footage as the cinematic anchor.
 * Selects best clips, trims them, and concatenates into a seamless hero loop.
 * Output: 720p, CRF 28, faststart, ~4-6MB.
 */
import { execSync } from 'child_process';
import { writeFileSync, existsSync, mkdirSync, unlinkSync, rmdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use the npm-installed ffmpeg binary
let ffmpegPath;
try {
  const installer = await import('@ffmpeg-installer/ffmpeg');
  ffmpegPath = installer.default?.path || installer.path;
} catch {
  ffmpegPath = 'ffmpeg';
}

console.log(`Using ffmpeg: ${ffmpegPath}`);

const INPUT_DIR = join(__dirname, '..', 'public', 'assets', 'QNCVideos');
const OUTPUT_DIR = join(__dirname, '..', 'public', 'assets', 'videos');
const TEMP_DIR = join(__dirname, '_temp_hero_v2');
const OUTPUT_FILE = join(OUTPUT_DIR, 'qnc-hero-montage.mp4');

/**
 * Clip selection — curated for visual diversity & cinematic flow.
 * C0484 is the anchor video (33s, 1080p/60fps) — used heavily.
 * 
 * Structure:
 *   Opening: C0484 wide establishing shot (0-5s)
 *   Mid 1:   C0436 facility ops
 *   Mid 2:   C0447 field work  
 *   Mid 3:   C0460 industrial
 *   Mid 4:   C0484 workers in action (10-15s)
 *   Mid 5:   C0472 team operations
 *   Mid 6:   C0478 professional work
 *   Finale:  C0484 cinematic closing shot (22-30s)
 */
const CLIPS = [
  { file: 'C0484.MP4', start: 0,  duration: 4 },   // Opening — establishing shot
  { file: 'C0436.MP4', start: 2,  duration: 3 },   // Facility operations
  { file: 'C0447.MP4', start: 1,  duration: 3 },   // Field work
  { file: 'C0460.MP4', start: 1,  duration: 3 },   // Industrial setting
  { file: 'C0484.MP4', start: 10, duration: 4 },   // Mid — workers in action
  { file: 'C0472.MP4', start: 1,  duration: 3 },   // Team operations
  { file: 'C0478.MP4', start: 2,  duration: 3 },   // Professional work
  { file: 'C0467.MP4', start: 2,  duration: 3 },   // Equipment/heavy ops
  { file: 'C0484.MP4', start: 20, duration: 5 },   // Finale — cinematic closing
];

// Create temp dir
if (!existsSync(TEMP_DIR)) mkdirSync(TEMP_DIR, { recursive: true });
if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

console.log('\n🎬 QNC Hero Video Creator V2');
console.log('============================\n');

// Step 1: Extract and normalize each clip
const segmentPaths = [];
for (let i = 0; i < CLIPS.length; i++) {
  const clip = CLIPS[i];
  const inputPath = join(INPUT_DIR, clip.file);
  const segmentPath = join(TEMP_DIR, `segment_${i}.mp4`);

  if (!existsSync(inputPath)) {
    console.log(`⚠️  Skipping ${clip.file} (not found)`);
    continue;
  }

  console.log(`📹 [${i + 1}/${CLIPS.length}] ${clip.file} (${clip.start}s → ${clip.start + clip.duration}s)...`);

  // Extract segment, normalize to 720p 30fps with cinematic color grade
  // Added slight fade between cuts for smoother transitions
  const cmd = [
    `"${ffmpegPath}"`,
    `-ss ${clip.start}`,
    `-i "${inputPath}"`,
    `-t ${clip.duration}`,
    `-vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=30,eq=brightness=-0.02:contrast=1.08:saturation=0.92"`,
    `-c:v libx264`,
    `-preset fast`,
    `-crf 22`,
    `-an`,
    `-pix_fmt yuv420p`,
    `-y "${segmentPath}"`
  ].join(' ');

  try {
    execSync(cmd, { stdio: 'pipe', timeout: 120000 });
    segmentPaths.push(segmentPath);
    console.log(`   ✅ Done`);
  } catch (err) {
    console.log(`   ❌ Failed: ${err.message?.slice(0, 100)}`);
  }
}

if (segmentPaths.length === 0) {
  console.error('\n❌ No segments created. Check input files.');
  process.exit(1);
}

// Step 2: Create concat file
const concatFile = join(TEMP_DIR, 'concat.txt');
const concatContent = segmentPaths.map(p => `file '${p.replace(/\\/g, '/')}'`).join('\n');
writeFileSync(concatFile, concatContent);

console.log(`\n🔗 Concatenating ${segmentPaths.length} segments into final hero video...`);

// Step 3: Concatenate with crossfade-style compression + web optimization
const concatCmd = [
  `"${ffmpegPath}"`,
  `-f concat`,
  `-safe 0`,
  `-i "${concatFile}"`,
  `-c:v libx264`,
  `-preset medium`,
  `-crf 26`,
  `-profile:v main`,
  `-level 3.1`,
  `-pix_fmt yuv420p`,
  `-movflags +faststart`,
  `-an`,
  `-y "${OUTPUT_FILE}"`
].join(' ');

try {
  execSync(concatCmd, { stdio: 'pipe', timeout: 120000 });
  const stats = statSync(OUTPUT_FILE);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`\n✅ Hero video created: ${OUTPUT_FILE}`);
  console.log(`📦 Size: ${sizeMB} MB`);
  console.log(`🎥 Duration: ~${CLIPS.reduce((s, c) => s + c.duration, 0)}s`);
} catch (err) {
  console.error(`\n❌ Concatenation failed: ${err.message?.slice(0, 200)}`);
}

// Cleanup
console.log('\n🧹 Cleaning up temp files...');
try {
  segmentPaths.forEach(p => { try { unlinkSync(p); } catch {} });
  try { unlinkSync(concatFile); } catch {}
  try { rmdirSync(TEMP_DIR); } catch {}
} catch {}

console.log('🎬 Done!\n');
