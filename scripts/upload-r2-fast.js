#!/usr/bin/env node
// Fast parallel R2 upload using S3-compatible API
// Usage: node scripts/upload-r2-fast.js ACCESS_KEY_ID SECRET_ACCESS_KEY ACCOUNT_ID PUBLIC_URL

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');

const [,, ACCESS_KEY_ID, SECRET_ACCESS_KEY, ACCOUNT_ID, PUBLIC_URL] = process.argv;

if (!ACCESS_KEY_ID || !SECRET_ACCESS_KEY || !ACCOUNT_ID) {
  console.log('Usage: node scripts/upload-r2-fast.js ACCESS_KEY_ID SECRET_KEY ACCOUNT_ID PUBLIC_URL');
  console.log('Example: node scripts/upload-r2-fast.js abc123 secret456 2c7a72... https://pub-xxx.r2.dev');
  process.exit(1);
}

const client = new S3Client({
  region: 'auto',
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: ACCESS_KEY_ID, secretAccessKey: SECRET_ACCESS_KEY },
});

const BUCKET = 'lvspices-frames';
const FRAMES_DIR = '/Users/dhruvsingh/Desktop/lvspices/public/frames';
const CONCURRENCY = 20; // parallel uploads

async function uploadFile(dir, file) {
  const localPath = path.join(FRAMES_DIR, dir, file);
  const key = `frames/${dir}/${file}`;
  const body = fs.readFileSync(localPath);
  await client.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: body,
    ContentType: 'image/webp',
    CacheControl: 'public, max-age=31536000, immutable',
  }));
}

async function uploadDir(dir) {
  const files = fs.readdirSync(path.join(FRAMES_DIR, dir)).filter(f => f.endsWith('.webp'));
  let done = 0;
  for (let i = 0; i < files.length; i += CONCURRENCY) {
    const batch = files.slice(i, i + CONCURRENCY);
    await Promise.all(batch.map(f => uploadFile(dir, f)));
    done += batch.length;
    process.stdout.write(`  ${dir}: ${done}/${files.length}\r`);
  }
  console.log(`✅ ${dir}: ${files.length} files uploaded`);
  return files.length;
}

async function main() {
  const dirs = fs.readdirSync(FRAMES_DIR)
    .filter(d => fs.statSync(path.join(FRAMES_DIR, d)).isDirectory());

  console.log(`🚀 Uploading ${dirs.length} folders to R2 (${CONCURRENCY} parallel)...`);
  const start = Date.now();
  let total = 0;

  for (const dir of dirs) {
    total += await uploadDir(dir);
  }

  const secs = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`\n🎉 Done! ${total} files in ${secs}s`);
  if (PUBLIC_URL) {
    console.log(`\nPublic URL base: ${PUBLIC_URL}`);
    console.log(`Frame example: ${PUBLIC_URL}/frames/hero/frame_0001.webp`);
    console.log(`\nUpdate your code: Replace '/frames/' with '${PUBLIC_URL}/frames/' in app/page.tsx`);
  }
}

main().catch(console.error);
