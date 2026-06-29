import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(/viewport={{ once: true, amount: 0.1 }}/g, 
  'viewport={{ once: false, amount: 0.1 }}');

fs.writeFileSync('src/App.tsx', code);
console.log('done');
