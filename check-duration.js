const fs = require('fs');
const { execSync } = require('child_process');
try {
  const result = execSync('afinfo /Users/dhruvsingh/Desktop/lvspices/public/videos/hero.mp4 | grep "estimated duration"', { encoding: 'utf8' });
  console.log(result);
} catch (e) { console.log("Not available"); }
