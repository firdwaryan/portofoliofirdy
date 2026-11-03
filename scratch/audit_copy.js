const fs = require('fs');

globalThis.window = { addEventListener: () => {} };
globalThis.CustomEvent = class CustomEvent { constructor(name, opts) { this.name = name; this.opts = opts; } };
globalThis.document = { 
  querySelectorAll: () => [], 
  querySelector: () => null, 
  addEventListener: () => {}, 
  dispatchEvent: () => true,
  documentElement: { lang: 'id' },
  getElementById: () => null
};
globalThis.localStorage = { getItem: () => 'id', setItem: () => {} };

require('../i18n.js');
const idDict = globalThis.__I18N_DICTS.id;

console.log('=== ID DICTIONARY AUDIT ===');
for (const [k, v] of Object.entries(idDict)) {
  if (typeof v === 'string' && v.length > 40) {
    console.log(`[${k}]:\n"${v}"\n`);
  }
}
