const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const BUCKET = 'lvspices-frames'; // R2 bucket name
const FRAMES_DIR = '/Users/dhruvsingh/Desktop/lvspices/public/frames';
const WRANGLER = 'npx';

const dirs = fs.readdirSync(FRAMES_DIR).filter(d =>
  fs.statSync(path.join(FRAMES_DIR, d)).isDirectory()
);

console.log(`Uploading ${dirs.length} folders to R2 bucket: ${BUCKET}`);
let totalFiles = 0;

for (const dir of dirs) {
  const fullDir = path.join(FRAMES_DIR, dir);
  const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.webp'));
  console.log(`\n📁 ${dir}: uploading ${files.length} files...`);

  for (let i = 0; i < files.length; i += 20) {
    const batch = files.slice(i, i + 20);
    for (const file of batch) {
      const localPath = path.join(fullDir, file);
      const r2Key = `frames/${dir}/${file}`;
      const res = spawnSync(WRANGLER, [
        'wrangler', 'r2', 'object', 'put',
        `${BUCKET}/${r2Key}`,
        '--file', localPath,
        '--content-type', 'image/webp',
      ], { encoding: 'utf8' });
      if (res.status !== 0) {
        console.error(`❌ Failed: ${r2Key}`, res.stderr?.slice(0, 100));
      }
    }
    process.stdout.write(`  ${Math.min(i + 20, files.length)}/${files.length}\r`);
  }
  totalFiles += files.length;
  console.log(`  ✅ ${dir} done (${files.length} files)`);
}

console.log(`\n🎉 Upload complete! ${totalFiles} files uploaded to ${BUCKET}`);
