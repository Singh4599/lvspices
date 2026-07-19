const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const framesRoot = '/Users/dhruvsingh/Desktop/lvspices/public/frames';

// Hero stays high quality, rest get compressed more + resized
const configs = {
  'hero':        { quality: 72, width: 1280 },
  'hero-mobile': { quality: 72, width: 720  },
  // All others: smaller + more compressed
  default:       { quality: 60, width: 960  },
};

async function recompressDir(dir) {
  const full = path.join(framesRoot, dir);
  const files = fs.readdirSync(full).filter(f => f.endsWith('.webp'));
  if (files.length === 0) return;

  const cfg = configs[dir] || configs.default;
  let done = 0;

  for (let i = 0; i < files.length; i += 8) {
    const batch = files.slice(i, i + 8);
    await Promise.all(batch.map(async (file) => {
      const filePath = path.join(full, file);
      const tmpPath  = filePath + '.tmp';
      await sharp(filePath)
        .resize(cfg.width, null, { withoutEnlargement: true })
        .webp({ quality: cfg.quality, effort: 5 })
        .toFile(tmpPath);
      fs.renameSync(tmpPath, filePath);
      done++;
    }));
  }
  console.log(`✅ ${dir}: ${done} recompressed (${cfg.width}px, q${cfg.quality})`);
}

async function main() {
  const dirs = fs.readdirSync(framesRoot)
    .filter(d => fs.statSync(path.join(framesRoot, d)).isDirectory());

  const before = parseInt(require('child_process').execSync(`du -sm ${framesRoot} | cut -f1`).toString().trim());
  console.log(`Starting recompression of ${dirs.length} folders... (currently ${before}MB)`);

  for (const dir of dirs) {
    await recompressDir(dir);
  }

  const after = parseInt(require('child_process').execSync(`du -sm ${framesRoot} | cut -f1`).toString().trim());
  console.log(`\n🎉 Done! ${before}MB → ${after}MB (saved ${before - after}MB)`);
}

main().catch(console.error);
