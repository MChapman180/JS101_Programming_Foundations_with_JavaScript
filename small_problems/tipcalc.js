const readline = require('readline-sync');
// Create a simple tip calculator. The program should prompt for a bill amount and a tip rate. 
// The program must compute the tip, and then log both the tip and the total amount 
// of the bill to the console. You can ignore input validation and assume
// that the user will enter numbers.

// Example:


// What is the bill? 200
// What is the tip percentage? 15

// The tip is $30.00
// The total is $230.00
// input string, output string
// ask the user for a bill amount as a number, and a tip amount
// store those two values in variables bill and tip
// calculate the tip bill times 100 - tip / 100, two decimal places using tofixed
// display the tip using a seperate function
//add the dollar sign the beginning in display



function retrieveBillAndTip() {
  console.log(`What is the bill? Please enter a number`);
  let bill = parseFloat(readline.prompt());
  console.log(`What is the tip percentage? Please enter a number`);
  let percentage = parseFloat(readline.prompt());
  return [bill, percentage];
  }

function calculateTip(bill, percentage) {
return parseFloat(bill * ((percentage) / 100).toFixed(2));
}

function displayTip(tip, bill) {
  console.log(`the tip is $${tip}`);
  console.log(`The total is $${+(tip + bill).toFixed(2)}`);
}

let [bill, percentage] = retrieveBillAndTip();
let tip = calculateTip(bill, percentage);
displayTip(tip, bill);