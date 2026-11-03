const fs = require('fs');

// Mock window and document
global.CustomEvent = class { constructor(name, opts) {} };
global.window = {
  addEventListener: () => {},
  document: {
    addEventListener: () => {},
    documentElement: { setAttribute: () => {} },
    querySelectorAll: () => [],
    querySelector: () => null,
    getElementById: () => null,
    dispatchEvent: () => {}
  }
};
global.document = window.document;
require('../i18n.js');

const html = fs.readFileSync('index.html', 'utf8');

const keyRegex = /data-i18n(?:-html|-attr)?="([^"]+)"/g;
let match;
const keysInHtml = new Set();
while ((match = keyRegex.exec(html)) !== null) {
  let val = match[1];
  val.split(';').forEach(p => {
    if (p.includes(':')) p = p.split(':')[1];
    keysInHtml.add(p.trim());
  });
}

console.log('Total unique keys in index.html:', keysInHtml.size);

const missingId = [];
const missingEn = [];

window.I18N.setLang('id');
for (const key of keysInHtml) {
  const res = window.I18N.t(key);
  if (res === key) {
    missingId.push(key);
  }
}

window.I18N.setLang('en');
for (const key of keysInHtml) {
  const res = window.I18N.t(key);
  if (res === key) {
    missingEn.push(key);
  }
}

console.log('Missing in ID:', missingId);
console.log('Missing in EN:', missingEn);
