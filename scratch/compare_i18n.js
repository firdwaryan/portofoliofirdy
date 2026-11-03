const fs = require('fs');

const content = fs.readFileSync('i18n.js', 'utf8');

const idMatch = content.match(/id:\s*\{([\s\S]*?)\n\s*\},?\s*en:/);
const enMatch = content.match(/en:\s*\{([\s\S]*?)\n\s*\}\s*;/);

const SPAN = 'text-slate-900 dark:text-white font-semibold';
const idDict = eval('({' + idMatch[1] + '})');
const enClean = enMatch[1].replace(/\s*\}\s*$/, '');
const enDict = eval('({' + enClean + '})');

const idKeys = Object.keys(idDict);
const enKeys = Object.keys(enDict);

console.log('Total ID keys:', idKeys.length);
console.log('Total EN keys:', enKeys.length);

const missingInEn = idKeys.filter(k => !(k in enDict));
const missingInId = enKeys.filter(k => !(k in idDict));

console.log('\n--- KEY PRESENCE CHECK ---');
console.log('Keys in ID but missing in EN:', missingInEn);
console.log('Keys in EN but missing in ID:', missingInId);

// Check paired content
console.log('\n--- CONTENT ALIGNMENT CHECK ---');
let divergences = [];

for (const k of idKeys) {
  if (k in enDict) {
    const idVal = String(idDict[k]).replace(/<[^>]+>/g, '').trim();
    const enVal = String(enDict[k]).replace(/<[^>]+>/g, '').trim();

    // Check numbers in text (metrics, dates)
    const idNums = (idVal.match(/\d+([.,]\d+)?/g) || []).map(n => n.replace(',', '.'));
    const enNums = (enVal.match(/\d+([.,]\d+)?/g) || []).map(n => n.replace(',', '.'));

    // Check if numbers differ
    const numDiff = idNums.filter(n => !enNums.includes(n));
    if (numDiff.length > 0 && !['modal.', 'aria.', 'tip.', 'meta.', 'href.'].some(p => k.startsWith(p))) {
      divergences.push({
        key: k,
        type: 'NUMBER_MISMATCH',
        idVal,
        enVal,
        idNums,
        enNums,
        diff: numDiff
      });
    }
  }
}

console.log('Total number/metric discrepancies:', divergences.length);
for (const d of divergences) {
  console.log(`\n[${d.key}]:`);
  console.log('  ID: ' + d.idVal);
  console.log('  EN: ' + d.enVal);
  console.log('  Numbers in ID missing in EN:', d.diff);
}
