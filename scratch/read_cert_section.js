const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const m = html.match(/<section id="slide-certifications"[\s\S]*?<\/section>/);
if (m) console.log(m[0]);
