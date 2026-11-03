const fs = require('fs');
const content = fs.readFileSync('i18n.js', 'utf8');
const idMatch = content.match(/id:\s*\{([\s\S]*?)\n\s*\},?\s*en:/);
const enMatch = content.match(/en:\s*\{([\s\S]*?)\n\s*\}\s*;/);
const idDict = eval('({' + idMatch[1] + '})');
const enClean = enMatch[1].replace(/\s*\}\s*$/, '');
const enDict = eval('({' + enClean + '})');

for (const expNum of ['3', '4', '1', '2']) {
  console.log(`\n=================== EXP ${expNum} ===================`);
  const keys = Object.keys(idDict).filter(k => k.startsWith('exp.' + expNum + '.'));
  for (const k of keys) {
    console.log(`[${k}]:`);
    console.log('  ID: ' + String(idDict[k]).replace(/<[^>]+>/g, ''));
    console.log('  EN: ' + String(enDict[k]).replace(/<[^>]+>/g, ''));
  }
}
