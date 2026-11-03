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
    if (obj.step_index >= 1000 && obj.step_index <= 1117) {
      if (obj.tool_calls) {
        for (const tc of obj.tool_calls) {
          console.log(`Step ${obj.step_index}: ${tc.name} ${tc.args?.toolSummary || tc.args?.Path || ''}`);
        }
      }
    }
  } catch(e) {}
});
