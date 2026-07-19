#!/usr/bin/env node
// Parallel wrangler R2 upload — no API keys needed, uses wrangler auth
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const BUCKET = 'lvspices-frames';
const FRAMES_DIR = '/Users/dhruvsingh/Desktop/lvspices/public/frames';
const CONCURRENCY = 15; // parallel wrangler processes

function uploadFile(dir, file) {
  return new Promise((resolve, reject) => {
    const localPath = path.join(FRAMES_DIR, dir, file);
    const key = `frames/${dir}/${file}`;
    const proc = spawn('npx', [
      'wrangler', 'r2', 'object', 'put',
      `${BUCKET}/${key}`,
      '--file', localPath,
      '--content-type', 'image/webp',
      '--remote'
    ], { stdio: 'pipe' });
    proc.on('close', code => code === 0 ? resolve() : reject(new Error(`Failed: ${key}`)));
    proc.on('error', reject);
  });
}

async function runPool(tasks, concurrency) {
  const results = [];
  let i = 0;
  const workers = Array(concurrency).fill(null).map(async () => {
    while (i < tasks.length) {
      const task = tasks[i++];
      try { await task(); } catch(e) { console.error(e.message); }
    }
  });
  await Promise.all(workers);
  return results;
}

async function main() {
  const dirs = fs.readdirSync(FRAMES_DIR)
    .filter(d => fs.statSync(path.join(FRAMES_DIR, d)).isDirectory());

  // Build full task list
  const tasks = [];
  for (const dir of dirs) {
    const files = fs.readdirSync(path.join(FRAMES_DIR, dir)).filter(f => f.endsWith('.webp'));
    for (const file of files) {
      tasks.push(() => uploadFile(dir, file));
    }
  }

  const total = tasks.length;
  let done = 0;
  const start = Date.now();

  // Wrap tasks to track progress
  const trackedTasks = tasks.map(t => async () => {
    await t();
    done++;
    if (done % 50 === 0 || done === total) {
      const elapsed = ((Date.now() - start) / 1000).toFixed(0);
      const eta = done < total ? Math.round((Date.now() - start) / done * (total - done) / 1000) : 0;
      process.stdout.write(`\r📤 ${done}/${total} uploaded | ${elapsed}s elapsed | ETA: ${eta}s   `);
    }
  });

  console.log(`🚀 Uploading ${total} files to R2 (${CONCURRENCY} parallel)...`);
  await runPool(trackedTasks, CONCURRENCY);

  const secs = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`\n\n🎉 Done! ${total} files in ${secs}s`);
  console.log(`\n✅ Public URL: https://pub-d66010552b2743cbad7601130085e521.r2.dev`);
  console.log(`   Frame example: https://pub-d66010552b2743cbad7601130085e521.r2.dev/frames/hero/frame_0001.webp`);
}

main().catch(console.error);
