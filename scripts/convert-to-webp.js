const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const framesRoot = '/Users/dhruvsingh/Desktop/lvspices/public/frames';

async function convertDir(dir) {
  const full = path.join(framesRoot, dir);
  const files = fs.readdirSync(full).filter(f => f.endsWith('.jpg'));
  let converted = 0;
  
  // Process in batches of 10 to avoid memory overload
  for (let i = 0; i < files.length; i += 10) {
    const batch = files.slice(i, i + 10);
    await Promise.all(batch.map(async (file) => {
      const inPath  = path.join(full, file);
      const outPath = path.join(full, file.replace('.jpg', '.webp'));
      if (fs.existsSync(outPath)) return; // skip if already done
      await sharp(inPath)
        .webp({ quality: 75, effort: 4 })
        .toFile(outPath);
      fs.unlinkSync(inPath); // delete original jpg
      converted++;
    }));
  }
  
  const remaining = fs.readdirSync(full).filter(f => f.endsWith('.webp')).length;
  console.log(`✅ ${dir}: ${converted} converted, ${remaining} webp files`);
}

async function main() {
  const dirs = fs.readdirSync(framesRoot)
    .filter(d => fs.statSync(path.join(framesRoot, d)).isDirectory());
  
  console.log(`Converting ${dirs.length} folders to WebP...`);
  const startSize = parseInt(require('child_process').execSync(`du -sm ${framesRoot} | cut -f1`).toString().trim());
  console.log(`Start size: ~${startSize}MB`);
  
  for (const dir of dirs) {
    await convertDir(dir);
  }
  
  const endSize = parseInt(require('child_process').execSync(`du -sm ${framesRoot} | cut -f1`).toString().trim());
  console.log(`\n🎉 Done! Size: ${startSize}MB → ${endSize}MB (saved ${startSize - endSize}MB)`);
}

main().catch(console.error);
