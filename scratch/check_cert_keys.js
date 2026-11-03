const fs = require('fs');
const content = fs.readFileSync('i18n.js', 'utf8');
const idMatch = content.match(/id:\s*\{([\s\S]*?)\n\s*\},?\s*en:/);
const enMatch = content.match(/en:\s*\{([\s\S]*?)\n\s*\}\s*;/);
const idDict = eval('({' + idMatch[1] + '})');
const enClean = enMatch[1].replace(/\s*\}\s*$/, '');
const enDict = eval('({' + enClean + '})');

Object.keys(idDict).filter(k => k.startsWith('cert.')).forEach(k => {
  console.log(`[${k}]`);
  console.log(`  ID: ${idDict[k]}`);
  console.log(`  EN: ${enDict[k]}`);
});
