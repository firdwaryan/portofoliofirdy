const fs = require('fs');
const { execSync } = require('child_process');
const content = execSync('git show HEAD:index.html', { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
const match = content.match(/<section id="slide-certifications"[\s\S]*?<\/section>/);
fs.writeFileSync('scratch/head_cert_section.html', match[0]);
console.log('Saved scratch/head_cert_section.html, size:', match[0].length);
