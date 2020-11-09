// ask user to enter a noun, verb and adverb, adjective
let readline = require('readline-sync');

console.log(`Enter an adverb`);
let adverb = readline.prompt();
console.log(`Enter a noun`);
let noun = readline.prompt();
console.log(`Enter an adjective`);
let adjective = readline.prompt();
console.log(`Enter a verb`);
let verb = readline.prompt();

console.log(`Do you ${verb} ${adverb} in a ${adjective} ${noun}`)

