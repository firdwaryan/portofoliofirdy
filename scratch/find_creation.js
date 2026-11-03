const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/HP/.gemini/antigravity/brain/5743dd20-8701-4929-a0a2-60243cd2fbe8/.system_generated/logs/transcript.jsonl'),
  crlfDelay: Infinity
});

let lineNo = 0;
rl.on('line', (line) => {
  lineNo++;
  try {
    const obj = JSON.parse(line);
    const s = JSON.stringify(obj);
    if (s.includes('sertifikat-coding-camp-page-1') || s.includes('pdftoppm') || s.includes('pdf-to-img') || s.includes('pdf2pic')) {
      console.log('Line ' + lineNo + ' step: ' + obj.step_index + ' type: ' + obj.type);
    }
  } catch(e) {}
});
