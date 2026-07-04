const fs = require('fs');
const content = fs.readFileSync('app/globals.css', 'utf-8');
let open = 0;
for (let i = 0; i < content.length; i++) {
  if (content[i] === '{') open++;
  if (content[i] === '}') open--;
}
console.log('Unclosed braces:', open);
