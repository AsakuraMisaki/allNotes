let readline = require('readline');

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('input', (v)=>{
    console.warn(`v: ${v}`);
});