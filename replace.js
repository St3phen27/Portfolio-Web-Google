import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

const regex1 = /<motion\.div\s+([\s\S]*?)animate=\{isMobile \? undefined : \((.*? \? (.*?) : .*?)\)\}\s+whileInView=\{isMobile \? (.*?) : undefined\}\s+viewport=\{\{\s*once: false,\s*margin: "10000px 0px 0px 0px"(?:,\s*amount:\s*([0-9.]+))?\s*\}\}/g;

content = content.replace(regex1, (match, p1, p2, p3, p4, p5) => {
  const amountStr = p5 ? `\n            amount={${p5}}` : '';
  const condition = p2.split('?')[0].trim();
  const stateStr = p3;
  return `<RevealMotionDiv\n            ${p1.trim()}\n            isMobile={isMobile}\n            activeCondition={${condition}}\n            mobileAnimateState={${stateStr}}${amountStr}`;
});

// For line 1109, which is slightly different
const regex2 = /<motion\.div\s+([\s\S]*?)whileInView="visible"\s+viewport=\{\{\s*once: false,\s*margin: "10000px 0px 0px 0px"(?:,\s*amount:\s*([0-9.]+))?\s*\}\}/g;

content = content.replace(regex2, (match, p1, p2) => {
  const amountStr = p2 ? `\n            amount={${p2}}` : '';
  return `<RevealMotionDiv\n            ${p1.trim()}\n            isMobile={isMobile}\n            activeCondition={true}\n            mobileAnimateState="visible"${amountStr}`;
});

fs.writeFileSync('src/App.tsx', content);

console.log("Done");
