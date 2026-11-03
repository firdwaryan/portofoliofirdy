const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Strip data URIs so inline SVG in favicon doesn't confuse regex
html = html.replace(/data:image\/svg\+xml,[^"]+/g, 'data:image/svg+xml,...');

// List of self-closing void tags in HTML5
const voidTags = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 
  'link', 'meta', 'param', 'source', 'track', 'wbr'
]);

const tagRegex = /<\/?([a-zA-Z0-9\-]+)(?:\s+[^>]*?)?(\/?)>/g;
let match;
const stack = [];
let line = 1;
let lastIndex = 0;

for (let i = 0; i < html.length; i++) {
  if (html[i] === '\n') line++;
}

// Simple tag balance checker
let errors = 0;
while ((match = tagRegex.exec(html)) !== null) {
  const fullTag = match[0];
  const tagName = match[1].toLowerCase();
  const isClosing = fullTag.startsWith('</');
  const isSelfClosing = match[2] === '/' || voidTags.has(tagName);

  // calculate line number
  const upTo = html.substring(0, match.index);
  const tagLine = upTo.split('\n').length;

  if (isSelfClosing && !isClosing) {
    continue;
  }

  if (!isClosing) {
    stack.push({ tag: tagName, line: tagLine });
  } else {
    if (stack.length === 0) {
      console.error(`Unexpected closing tag </${tagName}> at line ${tagLine}`);
      errors++;
    } else {
      const top = stack.pop();
      if (top.tag !== tagName) {
        console.error(`Mismatched tag: expected </${top.tag}> (from line ${top.line}) but got </${tagName}> at line ${tagLine}`);
        errors++;
      }
    }
  }
}

if (stack.length > 0) {
  console.error(`Unclosed tags remaining:`, stack);
  errors += stack.length;
}

if (errors === 0) {
  console.log('HTML tag balancing: PERFECT! All non-void tags properly opened and closed.');
} else {
  console.log(`Found ${errors} tag balance issues.`);
}
