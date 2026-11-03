const fs = require('fs');
const { execSync } = require('child_process');

for (const rev of ['8e99833', '58a1c38', 'f3326f9']) {
  try {
    const content = execSync(`git show ${rev}:index.html`, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
    const match = content.match(/<section id="slide-certifications"[\s\S]*?<\/section>/);
    console.log(rev, match ? match[0].length : 'none');
    if (match) {
      fs.writeFileSync(`scratch/cert_${rev}.html`, match[0]);
    }
  } catch (e) {
    console.log(rev, 'error:', e.message);
  }
}
