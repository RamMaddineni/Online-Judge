const readline=require('readline');

//import readline from "readline"
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  const [a, b] = input.split(' ').map(Number);
  console.log(a + b);
});
