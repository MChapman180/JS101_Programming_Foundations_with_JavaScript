const readline = require('readline-sync');
const MESSAGES = require('./rock_paper_scissors.json');

const VALID_CHOICES = {
  rock: ['rock', 'r'],
  paper: ['paper', 'p'],
  scissors: ['scissors', 's'],
  lizard: ['lizard', 'l'],
  spock: ['spock', 'sp']
};

const VALID_ANSWERS = ['y', 'yes', 'n', 'no'];
const WINNING_SETS = {
  rock: ['scissors', 'lizard'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  lizard: ['spock', 'paper'],
  spock: ['scissors', 'rock']
};
const WINNING_SCORE = 5;

let score = {
  player: 0,
  computer: 0
};

function prompt(message) {
  console.log(`=> ${message}`);
}

function displayGameInfo() {
  prompt(MESSAGES['gameRules']);
  prompt(MESSAGES['lineBreak']);
  prompt(`Score: Player: ${score.player} : computer: ${score.computer}`);
}

function validateUserChoice(answer) {
  let validChoiceArray = [].concat(...Object.values(VALID_CHOICES));
  return !validChoiceArray.includes(answer);
}

function convertUserChoice(input) {
  for (let [key, value] of Object.entries(VALID_CHOICES)) {
    if (value.includes(input)) return key;
  }
  return null;
}

function retrievePlayerChoice() {
  prompt(MESSAGES["askForChoice"]);
  let answer = readline.question().toLowerCase();
  while (validateUserChoice(answer)) {
    prompt(MESSAGES["invalidUserChoice"]);
    answer = readline.question().toLowerCase();
  }
  return convertUserChoice(answer);
}

function retrieveRandomIndex() {
  return Math.floor(Math.random() * Object.keys(VALID_CHOICES).length);
}

function retrieveComputerChoice(index) {
  return Object.keys(VALID_CHOICES)[index];
}

function retrieveRoundWinner(playerOne, playerTwo) {
  if (WINNING_SETS[playerOne].includes(playerTwo)) {
    return playerOne;
  } else if (WINNING_SETS[playerTwo].includes(playerOne)) {
    return playerTwo;
  }
  return undefined;
}
function displayRoundWinner(winner, choice, computerChoice) {
  if (winner === choice) {
    prompt(MESSAGES['playerWonRound']);
  } else if (winner === computerChoice) {
    prompt(MESSAGES['compWonRound']);
  } else {
    prompt(MESSAGES['drawRound']);
  }
}

function updateGameScore(winner, choice, computerChoice) {
  if (winner === choice) {
    score.player += 1;
  } else if (winner === computerChoice) {
    score.computer += 1;
  }
}

function displayScoreUpdate() {
  prompt(`Score Update:
  -------------------------
  Player: ${score.player}
  Computer: ${score.computer}`);
}

function retrieveGameWinner() {
  return (score.player === WINNING_SCORE) ||
  (score.computer === WINNING_SCORE);
}

function retrieveEndAnswer() {
  let answer = readline.question().toLowerCase();
  while (isInvalidAnswer(answer)) {
    prompt(MESSAGES["invalidExitChoice"]);
    answer = readline.question().toLowerCase();
  }
  return answer;
}

function continueGame() {
  let answer = readline.question().toLowerCase();
  return answer !== 'e' && answer !== 'exit';
}

function isInvalidAnswer(answer) {
  return (!VALID_ANSWERS.includes(answer.toLowerCase()));
}

function resetScore() {
  score.player = 0;
  score.computer = 0;
}

function validateIfAnswerNo(answer) {
  return answer[0] === 'n' ||
  (answer === 'no' && answer.length === 2);
}

function playerWonGame() {
  return score.player === WINNING_SCORE;
}

function displayPlayerFinalWin() {
  prompt(MESSAGES['playerWinner']);
  prompt(MESSAGES['lineBreak']);
  prompt(`You won the game by ${Math.abs(score.player - score.computer)} point(s)`);
  prompt(`Final score: Player: ${score.player} - Computer: ${score.computer}`);
}

function displayCompFinalWin() {
  prompt(MESSAGES['computerWinner']);
  prompt(MESSAGES['lineBreak']);
  prompt(`You lost by ${Math.abs(score.computer - score.player)} point(s)`);
  prompt(`Final score: Player: ${score.player} - Computer: ${score.computer}`);
}

console.clear();
prompt(MESSAGES['welcome']);
prompt(MESSAGES['lineBreak']);

while (true) {
  while (true) {
    displayGameInfo();
    let userChoice = retrievePlayerChoice();
    console.clear();
    let randomIndex = retrieveRandomIndex();

    let computerChoice = retrieveComputerChoice(randomIndex);

    prompt(`You chose ${userChoice} and the computer chose ${computerChoice}.`);

    let winner = retrieveRoundWinner(userChoice, computerChoice);
    displayRoundWinner(winner, userChoice, computerChoice);
    updateGameScore(winner, userChoice, computerChoice);

    if (retrieveGameWinner() && (playerWonGame())) {
      displayPlayerFinalWin();
      break;
    } else if (retrieveGameWinner() && (!playerWonGame())) {
      displayCompFinalWin();
      break;
    }

    displayScoreUpdate();
    prompt(MESSAGES['anotherRound']);

    let answer = continueGame();

    if (!answer) {
      break;
    }
    console.clear();
  }

  prompt(MESSAGES['anotherFullGame']);
  let answer = retrieveEndAnswer();

  console.clear();

  if (validateIfAnswerNo(answer)) {
    break;
  }
  resetScore();
}
prompt(MESSAGES['gameOver']);

