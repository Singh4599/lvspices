const { execSync } = require('child_process');
const path = require('path');
const ffmpeg = require('ffmpeg-static');

const VIDEOS_DIR = path.join(__dirname, '../public/videos');

const jobs = [
  {
    input: path.join(__dirname, '..', 'heroo.mp4'),
    output: path.join(VIDEOS_DIR, 'hero-desktop.mp4'),
    // 720p, CRF 26, fast preset, no audio, H.264
    args: '-vf "scale=-2:720" -vcodec libx264 -crf 26 -preset slow -profile:v main -movflags +faststart -an',
  },
  {
    input: path.join(__dirname, '..', 'herophonetry.mp4'),
    output: path.join(VIDEOS_DIR, 'hero-mobile.mp4'),
    // 540p for mobile - even lighter
    args: '-vf "scale=-2:540" -vcodec libx264 -crf 28 -preset slow -profile:v main -movflags +faststart -an',
  },
];

for (const job of jobs) {
  console.log(`\nProcessing: ${path.basename(job.input)} -> ${path.basename(job.output)}`);
  try {
    execSync(`"${ffmpeg}" -y -i "${job.input}" ${job.args} "${job.output}"`, { stdio: 'inherit' });
    console.log(`✓ Done: ${path.basename(job.output)}`);
  } catch (err) {
    console.error(`✗ Error:`, err.message);
  }
}

// Also extract posters (first frame)
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
