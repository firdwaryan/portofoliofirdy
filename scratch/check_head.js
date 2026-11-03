const { execSync } = require('child_process');
const content = execSync('git show HEAD:index.html', { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
const match = content.match(/<section id="slide-certifications"[\s\S]*?<\/section>/);
if (match) {
  console.log('LENGTH:', match[0].length);
  console.log(match[0].slice(0, 2500));
} else {
  console.log('Not found');
}
