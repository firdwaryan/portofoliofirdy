const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/HP/.gemini/antigravity/brain/5743dd20-8701-4929-a0a2-60243cd2fbe8/.system_generated/logs/transcript.jsonl'),
  crlfDelay: Infinity
});

let lineNo = 0;
rl.on('line', (line) => {
  lineNo++;
  if (lineNo >= 1595 && lineNo <= 1615) {
    try {
      const obj = JSON.parse(line);
      console.log('--- LINE ' + lineNo + ' [' + obj.type + '] ---');
      if (obj.content) console.log(obj.content.slice(0, 500));
      if (obj.thinking) console.log('Thinking:', obj.thinking.slice(0, 500));
    } catch(e) {}
  }
});
