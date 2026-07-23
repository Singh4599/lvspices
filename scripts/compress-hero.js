const { execSync, execFileSync } = require('child_process');
const path = require('path');
const fs   = require('fs');
const ffmpeg = require('ffmpeg-static');

const VIDEOS_DIR = path.join(__dirname, '../public/videos');
const FRAMES_DIR = path.join(VIDEOS_DIR, 'frames');

// ── Step 1: Re-encode source videos (all-intra, lower FPS) ──────────
const jobs = [
  {
    input:  path.join(__dirname, '..', 'HERO DESKTOP 1.0.mp4'),
    output: path.join(VIDEOS_DIR, 'hero-desktop.mp4'),
    // 720p, 15fps, all-intra (-g 1) for instant seek, good quality
    args: '-vf "scale=-2:720,fps=15" -vcodec libx264 -crf 24 -preset slow -g 1 -profile:v high -movflags +faststart -an',
  },
  {
    input:  path.join(__dirname, '..', 'HERO 2.mp4'),
    output: path.join(VIDEOS_DIR, 'hero-mobile.mp4'),
    // 540p portrait, 12fps, all-intra (-g 1)
    args: '-vf "scale=-2:540,fps=12" -vcodec libx264 -crf 22 -preset slow -g 1 -profile:v high -movflags +faststart -an',
  },
];

for (const job of jobs) {
  console.log(`\n▶ Encoding: ${path.basename(job.input)} → ${path.basename(job.output)}`);
  try {
    execSync(`"${ffmpeg}" -y -i "${job.input}" ${job.args} "${job.output}"`, { stdio: 'inherit' });
    console.log(`✓ Done`);
  } catch (err) {
    console.error(`✗ Error:`, err.message);
  }
}

// ── Step 2: Extract frames as WebP for smooth image-sequence scroll ──
/**
 * WHY IMAGE SEQUENCES?
 * Canvas video scrubbing requires the browser to decode a video frame on every
 * seek, which has inherent latency (esp. on mobile). Image sequences are pre-decoded
 * JPEG/WebP images that are instantly available — zero decode lag.
 * This is the same technique Apple uses for product page scroll animations.
 */
const frameJobs = [
  {
    input:     path.join(VIDEOS_DIR, 'hero-desktop.mp4'),
    outputDir: path.join(FRAMES_DIR, 'desktop'),
    // 800px wide (covers most desktop viewports without overdraw), quality 72
    args: '-vf "scale=800:-2" -vcodec libwebp -quality 72',
  },
  {
    input:     path.join(VIDEOS_DIR, 'hero-mobile.mp4'),
    outputDir: path.join(FRAMES_DIR, 'mobile'),
    // 420px wide portrait, quality 72 — tiny files, loads fast on mobile
    args: '-vf "scale=420:-2" -vcodec libwebp -quality 72',
  },
];

for (const fj of frameJobs) {
  fs.mkdirSync(fj.outputDir, { recursive: true });
  // Clear old frames
  fs.readdirSync(fj.outputDir).forEach(f => fs.unlinkSync(path.join(fj.outputDir, f)));

  console.log(`\n▶ Extracting frames: ${path.basename(fj.input)} → ${path.relative(process.cwd(), fj.outputDir)}`);
  try {
    execSync(
      `"${ffmpeg}" -y -i "${fj.input}" ${fj.args} "${path.join(fj.outputDir, 'f%04d.webp')}"`,
      { stdio: 'inherit' }
    );
    const count = fs.readdirSync(fj.outputDir).filter(f => f.endsWith('.webp')).length;
    const size  = fs.readdirSync(fj.outputDir)
      .filter(f => f.endsWith('.webp'))
      .reduce((s, f) => s + fs.statSync(path.join(fj.outputDir, f)).size, 0);
    console.log(`✓ ${count} frames, total ${(size / 1024).toFixed(0)} KB`);
  } catch (err) {
    console.error(`✗ Error:`, err.message);
  }
}

// ── Step 3: Extract poster images (first frame) ──────────────────────
const posterJobs = [
  { input: path.join(VIDEOS_DIR, 'hero-desktop.mp4'), output: path.join(VIDEOS_DIR, 'hero-desktop-poster.webp') },
  { input: path.join(VIDEOS_DIR, 'hero-mobile.mp4'),  output: path.join(VIDEOS_DIR, 'hero-mobile-poster.webp') },
];
for (const pj of posterJobs) {
  try {
    execSync(`"${ffmpeg}" -y -i "${pj.input}" -vframes 1 -q:v 2 "${pj.output}"`, { stdio: 'inherit' });
    console.log(`✓ Poster: ${path.basename(pj.output)}`);
  } catch (err) {
    console.error(`✗ Poster error:`, err.message);
  }
}

console.log('\n✅ All done! Run `npm run dev` to see the result.');
