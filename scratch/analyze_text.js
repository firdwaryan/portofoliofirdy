const fs = require('fs');

const idDict = JSON.parse(fs.readFileSync('scratch/id_clean.json', 'utf8'));

console.log('=== ANALISIS COPY PORTOFOLIO ===\n');

// 1. Check sections
const sections = {
  hero: ['meta.desc', 'modal.title', 'modal.sub', 'hero.bio', 'hero.roleDesc', 'hero.pitch'],
  exp: Object.keys(idDict).filter(k => k.startsWith('exp.')),
  cert: Object.keys(idDict).filter(k => k.startsWith('cert.')),
  proj: Object.keys(idDict).filter(k => k.startsWith('proj.')),
  org: Object.keys(idDict).filter(k => k.startsWith('org.')),
  contact: Object.keys(idDict).filter(k => k.startsWith('contact.') || k.startsWith('form.'))
};

for (const [secName, keys] of Object.entries(sections)) {
  console.log(`\n================= SEKSI: ${secName.toUpperCase()} =================`);
  for (const k of keys) {
    const val = (idDict[k] || '').replace(/<[^>]+>/g, '').trim();
    if (val.length > 30) {
      const words = val.split(/\s+/).length;
      console.log(`\n[${k}] (${words} kata):`);
      console.log(`"${val}"`);
    }
  }
}
