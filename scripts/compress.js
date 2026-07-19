const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('ffmpeg-static');

const videosDir = path.join(__dirname, '../public/videos');
const files = fs.readdirSync(videosDir);

// Filter out already compressed or non-mp4
const mp4Files = files.filter(f => f.endsWith('.mp4') && !f.includes('.tmp.'));

console.log(`Found ${mp4Files.length} videos to process.`);

// Process sequentially to not overload CPU
for (const file of mp4Files) {
  const inputPath = path.join(videosDir, file);
  const tmpPath = path.join(videosDir, file.replace('.mp4', '.tmp.mp4'));
  const posterPath = path.join(videosDir, file.replace('.mp4', '.webp'));

  console.log(`Processing ${file}...`);
  try {
    // 1. Extract poster
    execSync(`"${ffmpeg}" -y -i "${inputPath}" -vframes 1 -q:v 2 "${posterPath}"`, { stdio: 'inherit' });
    
    // 2. Compress video (scale to max 720p height, crf 28)
    execSync(`"${ffmpeg}" -y -i "${inputPath}" -vf "scale=-2:720" -vcodec libx264 -crf 28 -preset fast -an "${tmpPath}"`, { stdio: 'inherit' });
    
    // 3. Replace original
    fs.renameSync(tmpPath, inputPath);
    console.log(`Done with ${file}`);
  } catch (err) {
    console.error(`Error processing ${file}:`, err.message);
  }
}
