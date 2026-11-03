const fs = require('fs');

const content = fs.readFileSync('i18n.js', 'utf8');
const idBlockMatch = content.match(/id:\s*\{([\s\S]*?)\n\s*\},?\s*en:/);
if (!idBlockMatch) {
  console.log('Failed to match id block');
  process.exit(1);
}

// eval in safe context
const idCode = '({' + idBlockMatch[1] + '})';
const SPAN = 'text-slate-900 dark:text-white font-semibold';
const idDict = eval(idCode);

console.log('=== ID DICTIONARY ENTRIES (Total: ' + Object.keys(idDict).length + ') ===\n');

for (const [k, v] of Object.entries(idDict)) {
  if (typeof v === 'string') {
    console.log(`--- [${k}] ---`);
    console.log(v.replace(/<[^>]+>/g, '').trim());
    console.log('');
  }
}
