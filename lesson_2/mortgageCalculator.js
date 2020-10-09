const MESSAGES = require('./mortgageMessages.json');
let readline = require('readline-sync');
const VALID_ANSWERS = ['y', 'yes', 'n', 'no'];

function prompt(message) {
  console.log(`${message}`);
}

function isInvalidNumber(num) {
  return num.trimStart() === '' ||
         Number(num) < 0 ||
         Number.isNaN(Number(num));
}

function includesDecimal(num) {
  return num.split('')
    .filter(number => number.includes('.')).length > 1;
}

function validAprMax(apr) {
  return Number(apr) > 100;
}

function validLoanDuration(duration) {
  return Number(duration <= 0);
}

function calculatePayment(loanDuration, loanAmount, monthlyInterest) {
  return loanAmount *
         (monthlyInterest /
         (1 - Math.pow((1 + monthlyInterest), (-loanDuration))));
}

function isValidResponse(response) {
  let count = 0;
  for (let index = 0; index < response.length; index++) {
    if (VALID_ANSWERS.indexOf(response[index]) === -1) {
      count += 1;
    }
  }
  return count === response.length || response.length > 1;
}

console.clear();
prompt(MESSAGES['welcome']);

while (true) {
  prompt(MESSAGES['displayLine']);

  prompt(MESSAGES['loanAmount']);
  let loanAmount = readline.question();

  while (isInvalidNumber(loanAmount) || includesDecimal(loanAmount)) {
    prompt(MESSAGES['invalidAmount']);
    loanAmount = readline.question();
  }

  prompt(MESSAGES['APR']);
  let apr = readline.question();

  while (isInvalidNumber(apr) || validAprMax(apr)) {
    prompt(MESSAGES['invalidAPR']);
    apr = readline.question();
  }
  prompt(MESSAGES['askDuration']);
  let loanDuration = readline.question();

  while (isInvalidNumber(loanDuration) || validLoanDuration(loanDuration)) {
    prompt(MESSAGES['invalidYear']);
    loanDuration = readline.question();
  }

  let durationInMonths = loanDuration * 12;
  let monthlyInterest = (parseInt(apr, 10) / 100) / 12;
  let monthlyPayment;
  if (monthlyInterest === 0) {
    monthlyPayment = loanAmount / durationInMonths;
  } else {
    monthlyPayment =
    calculatePayment(durationInMonths, loanAmount, monthlyInterest);
  }
  console.clear();

  console.log(`---------------------
      Amount: $${loanAmount} 
      Duration - month(s): ${durationInMonths}
      APR: ${apr}% 
      Monthly payment: $${monthlyPayment.toFixed(2)}`);
  prompt(MESSAGES['anotherCalc']);
  let answer = readline.question().toLowerCase().split(' ');

  while (isValidResponse(answer)) {
    prompt(MESSAGES['invalidAgain']);
    answer = readline.question().toLowerCase().split(' ');
  }
  if (answer.length === 1 && (answer[0] === 'n' || answer[0] === 'no')) {
    prompt(MESSAGES['thanks']);
    break;
  } else {
    console.clear();
  }
}