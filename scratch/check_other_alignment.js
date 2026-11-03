const fs = require('fs');
const content = fs.readFileSync('i18n.js', 'utf8');
const idMatch = content.match(/id:\s*\{([\s\S]*?)\n\s*\},?\s*en:/);
const enMatch = content.match(/en:\s*\{([\s\S]*?)\n\s*\}\s*;/);
const idDict = eval('({' + idMatch[1] + '})');
const enClean = enMatch[1].replace(/\s*\}\s*$/, '');
const enDict = eval('({' + enClean + '})');

for (const sec of ['cert.', 'proj.', 'org.', 'contact.', 'nav.']) {
  console.log(`\n=================== SECTION: ${sec} ===================`);
  const keys = Object.keys(idDict).filter(k => k.startsWith(sec));
  for (const k of keys) {
    const idVal = String(idDict[k]).replace(/<[^>]+>/g, '').trim();
    const enVal = String(enDict[k] || '').replace(/<[^>]+>/g, '').trim();
    if (idVal.length > 25 || enVal.length > 25) {
      console.log(`[${k}]:`);
      console.log('  ID: ' + idVal);
      console.log('  EN: ' + enVal);
    }
  }
}
