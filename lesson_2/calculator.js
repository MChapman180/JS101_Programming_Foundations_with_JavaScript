
const messages = require('./calculator_messages.json')



const readline = require('readline-sync');

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

prompt(messages['welcome']);

prompt(messages['question1']);
let number1 = readline.question();

while (invalidNumber(number1)) {
  prompt(messages['invalidNum']);
  number1 = readline.question();
}

prompt(messages['question2']);
let number2 = readline.question();

while (invalidNumber(number2)) {
  prompt(messages['invalidNum']);
  number2 = readline.question();
}

prompt(messages['operationQ']);
let operation = readline.question();

while (!['1', '2', '3', '4'].includes(operation)) {
  prompt(messages['numbersIncluded']);
  operation = readline.question();
}

let output;
switch (operation) {
  case '1' : output = Number(number1) + Number(number2);
    break;
  case '2' : output = Number(number1) - Number(number2);
    break;
  case '3' : output = Number(number1) * Number(number2);
    break;
  case '4' : output = Number(number1) / Number(number2);
    break;
}

prompt(`The result is ${output}`);
prompt(messages['anotherCalc']);
let anotherQuestion = readline.question();

