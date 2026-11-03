const fs = require('fs');

const content = fs.readFileSync('i18n.js', 'utf8');
const idBlockMatch = content.match(/id:\s*\{([\s\S]*?)\n\s*\},?\s*en:/);
const idCode = '({' + idBlockMatch[1] + '})';
const SPAN = 'text-slate-900 dark:text-white font-semibold';
const idDict = eval(idCode);

fs.writeFileSync('scratch/id_clean.json', JSON.stringify(idDict, null, 2), 'utf8');
console.log('Saved scratch/id_clean.json with', Object.keys(idDict).length, 'keys');
