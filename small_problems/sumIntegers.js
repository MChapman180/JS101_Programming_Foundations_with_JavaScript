// Sum or Product of Consecutive Integers

// Write a program that asks the user to enter an integer greater than 
// 0, then asks whether the user wants to determine the sum 
// or the product of all numbers between 1 and the entered integer, inclusive.

// Examples:

// Please enter an integer greater than 0: 5
// Enter "s" to compute the sum, or "p" to compute the product. s

// The sum of the integers between 1 and 5 is 15.

// Please enter an integer greater than 0: 6
// Enter "s" to compute the sum, or "p" to compute the product. p

// The product of the integers between 1 and 6 is 720.

// write a retrieveInput function 
// input = string
// output = string
// convert string to numbers
// create an array starting at 1 going up to integer entered
// use reduce, starting at 1, in that function add the variable operator 
//as a parametre. have an if statement for 
const readline = require('readline-sync');

function validateInput(input) {
  let valid = ['s', 'p'];
return Number(input) > 0 ? true : valid.includes(input) ? true : false;
  }


function retrieveInput() {
  console.log(`Please enter an integer greater than 0: `);
  let integer = Number(readline.prompt());
    while(!validateInput(integer)) {
  console.log('invalid input: please enter a number bigger than 0');
  integer = Number(readline.prompt());
    }
  console.log(`Enter 's' to compute the sum, or 'p' to compute the product`);
  let operator = readline.prompt();  
    while(!validateInput(integer)) {
  console.log(`invalid input: please enter s or p`);
  operator = readline.prompt(); 
    }
  return [integer, operator];
}

function determineResult(integer, operator) {
  let arr = [];
  for(let i = 1; i <= integer; i += 1) {
    arr.push(i);
  }
  return arr.reduce((sum, current) => {
    if(operator === 's') {
      sum += current;
    } else {
  sum *= current;
      
    }
    return sum;
});
}
// could be used for array
function determineResultArray(array, operator) {
  return array.reduce((sum, current) => {
    if(operator === 's') {
      sum += current;
    } else {
  sum *= current;
      
    }
    return sum;
});
}


function displayResult(total, operator, integer) {
  if(operator === 's') {
  console.log(`The sum of the integers between 1 and ${integer} is ${total}.`)
}
else {
  console.log(`The product of the integers between 1 and ${integer} is ${total}.`)
}
}

let [integer, operator] = retrieveInput();
let sum = determineResult(integer, operator);
displayResult(sum, operator, integer);
