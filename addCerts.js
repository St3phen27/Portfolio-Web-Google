const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(/"project": {([^}]+)},/g, '"project": {$1},\n      "certs": { opacity: 0.15, scale: 0.6, rotate: 45 },');

fs.writeFileSync('src/App.tsx', code);
console.log('done');
