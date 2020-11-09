// Greeting a user
// Write a program that will ask for user's name. The program will then greet 
//the user. If the user writes "name!" then the computer yells back to the user.

// Examples

// Copy Code
// What is your name? Bob
// Hello Bob.
// Copy Code
// What is your name? Bob!
// HELLO BOB. WHY ARE WE SCREAMING?
const readline = require('readline-sync');

function retrieveName() {
  console.log(`What is your name?`);
  let answer = readline.prompt();
  return answer;
}
function displayName(name) {
  if(name.endsWith('!')) {
    console.log(`HELLO ${name.toUpperCase()}. WHY ARE WE SCREAMING?`)
  }
  else {
    console.log(`Hello ${name}`)
  }
}
let name = retrieveName();
displayName(name);
