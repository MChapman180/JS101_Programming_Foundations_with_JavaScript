const MESSAGES = require('./mortgageMessages.json');
let readline = require('readline-sync');

function prompt(message) {
  console.log(`${message}`);
}

function isInvalidNumber(num) {
  return num.trimStart() === '' ||
         Number(num) < 0 ||
         Number.isNaN(Number(num));
}

function checkPeriods(num) {
  return num.split('')
    .filter(number => number.includes('.')).length > 1;
}

function checkAprMax(apr) {
  return Number(apr) > 100;
}

function checkLoanDuration(duration) {
  return Number(duration <= 0);
}

function calculatePayment(loanDuration, loanAmount, monthlyInterest) {
  return loanAmount *
         (monthlyInterest /
         (1 - Math.pow((1 + monthlyInterest), (-loanDuration))));
}

console.clear();
prompt(MESSAGES['welcome']);

while (true) {
  prompt(MESSAGES['displayLine']);

  prompt(MESSAGES['loanAmount']);
  let loanAmount = readline.question();

  while (isInvalidNumber(loanAmount) || checkPeriods(loanAmount)) {
    prompt(MESSAGES['invalidAmount']);
    loanAmount = readline.question();
  }

  prompt(MESSAGES['APR']);
  let apr = readline.question();

  while (isInvalidNumber(apr) || checkAprMax(apr)) {
    prompt(MESSAGES['invalidAPR']);
    apr = readline.question();
  }
  prompt(MESSAGES['askDuration']);
  let loanDuration = readline.question();

  while (isInvalidNumber(loanDuration) || checkLoanDuration(loanDuration)) {
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
  let answer = readline.question().toLowerCase();

  while (answer[0] !== 'n' && answer[0] !== 'y') {
    prompt(MESSAGES['invalidAgain']);
    answer = readline.question().toLowerCase();
  }

  if (answer[0] === 'n' || answer[0] === 'no') {
    prompt(MESSAGES['thanks']);
    break;
  }
  console.clear();
}