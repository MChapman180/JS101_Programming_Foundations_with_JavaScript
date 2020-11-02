const readline = require('readline-sync');
const MESSAGES = require('./tictactoe_messages.json');
const WINNING_COUNT = 3;
const INITIAL_MARKER = ' ';
const MIDDLE_SQUARE = 5;
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const WINNING_SETS = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9],
  [1, 4, 7], [2, 5, 8], [3, 6, 9],
  [1, 5, 9], [3, 5, 7]
];

function prompt(message) {
  console.log(`=> ${message}`);
}

function initializeBoard() {
  let board = {};

  for (let square = 1; square <= 9; square++) {
    board[String(square)] = INITIAL_MARKER;
  }

  return board;
}

function displayWelcome() {
  console.clear();
  prompt(MESSAGES["welcome"]);
}

function displayBoard(board) {
  console.clear();

  console.log(`You are ${HUMAN_MARKER}. Computer is ${COMPUTER_MARKER}`);

  console.log('');
  console.log('     |     |');
  console.log(`  ${board['1']}  |  ${board['2']}  |  ${board['3']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['4']}  |  ${board['5']}  |  ${board['6']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['7']}  |  ${board['8']}  |  ${board['9']}`);
  console.log('     |     |');
  console.log('');
}

function emptySquares(board) {
  return Object.keys(board).filter(key => board[key] === INITIAL_MARKER);
}

function playerChoosesSquare(board) {
  let square;

  while (true) {
    prompt(`Choose a square ${joinOr(emptySquares(board))}:`);
    square = readline.question().trim();

    if (emptySquares(board).includes(square)) break;

    prompt(MESSAGES["invalid_choice"]);
  }

  board[square] = HUMAN_MARKER;
}

function computerMove(board, marker) {
  let square;
  for(let index = 0; index < WINNING_SETS.length; index += 1) {
    let line = WINNING_SETS[index];
    square = findAtRiskSquare(line, board, marker);
 if(square) break;
  }
  return square;
}

function computerChoosesSquare(board) {
  let square = computerMove(board, COMPUTER_MARKER);
  if(!square) {
    square = computerMove(board, HUMAN_MARKER);
  }
if(!square) {
  if (board[MIDDLE_SQUARE] === INITIAL_MARKER) {
    square = MIDDLE_SQUARE;
}
}
  if (!square) {
     let randomIndex = Math.floor(Math.random() * emptySquares(board).length);
  square = emptySquares(board)[randomIndex];
  }

  board[square] = COMPUTER_MARKER;
}

function boardFull(board) {
  return emptySquares(board).length === 0;
}

function findAtRiskSquare(line, board, marker) {
  let markersInLine = line.map(square => board[square]);

  if (markersInLine.filter(val => val === marker).length === 2) {
    let unusedSquare = line.find(square => board[square] === INITIAL_MARKER);
    if (unusedSquare !== undefined) {
      return unusedSquare;
    }
  }

  return null;
}

function detectWinner(board) {
  for (let line = 0; line < WINNING_SETS.length; line++) {
    let [sq1, sq2, sq3] = WINNING_SETS[line];

    if (board[sq1] === HUMAN_MARKER &&
        board[sq2] === HUMAN_MARKER &&
        board[sq3] === HUMAN_MARKER) {
      return "Player";
    } else if (board[sq1] === COMPUTER_MARKER &&
               board[sq2] === COMPUTER_MARKER &&
               board[sq3] === COMPUTER_MARKER) {
      return "Computer";
    }
  }

  return null;
}

function someoneWon(board) {
  return !!detectWinner(board);
}

function updateScore(score, winner) {
  if (winner === "Player") {
    score["player"] += 1;
  } else {
    score["computer"] += 1;
  }
}

function displayScore(score) {
  let playerScore = score.player;
  let computerScore = score.computer;

  if (playerScore > computerScore) {
    prompt(`Player is winning ${playerScore}:${computerScore}.`);
  } else if (computerScore > playerScore) {
    prompt(`Computer is winning ${computerScore}:${playerScore}.`);
  } else {
    prompt(`The score is ${playerScore}:${computerScore}.`);
  }
}

function displayWinner(score) {
   if (score.player === WINNING_COUNT) {
    prompt(`Player won ${score.player}:${score.computer}. Congratulations!`);
  } else {
    prompt(`Computer won ${score.computer}:${score.player}.`);
  }
}

function displayTie() {
  prompt(MESSAGES["tie"]);
}

function askAnotherRound() {
  prompt(MESSAGES["next"]);
  let answer = readline.question();
  while(!validateAnotherRound(answer)) {
  prompt(MESSAGES["invalid_choice"]);
  prompt(MESSAGES["next"]);
  answer = readline.question();
    
  }
  return answer;
  
}

function validateAnotherRound(input) {
  return !/\w/.test(input) || input === 'n';
}

function gameOver(score) {
  return (score.player >= WINNING_COUNT || score.computer >= WINNING_COUNT);
}

function anotherGameResponse() {
  prompt(MESSAGES["play_again"]);
  let answer = readline.question().toLowerCase();

  while (!['y', 'yes', 'n', 'no'].includes(answer)) {
    prompt(MESSAGES["valid_answer"]);
    answer = readline.question().toLowerCase();
  }

  return answer;
}

function noToContinue(again) {
  return ['n','no'].includes(again);
}

function joinOr(arr, delimiter = ', ', word = 'or') {
  switch (arr.length) {
    case 0:
      return '';
    case 1:
      return `${arr[0]}`;
    case 2:
      return arr.join(` ${word} `);
    default:
      return arr.slice(0, arr.length - 1).join(delimiter) +
      `${delimiter}${word} ${arr[arr.length - 1]}`;
  }
}

function chooseSquare(board, currentPlayer) {
  if (['p', 'player'].includes(currentPlayer)) {
    playerChoosesSquare(board);
  } else {
    computerChoosesSquare(board);
  }
}

function alternatePlayer(currentPlayer) {
  return ['p', 'player'].includes(currentPlayer) ? "computer" : "player";
}

function validateFirstPlayer(answer) {
  while (!["p", "player", "c", "computer"].includes(answer)) {
    prompt(MESSAGES["valid_answer"]);
    answer = readline.question().toLowerCase();
  }
  return answer;
}

function retrieveFirstPlayer() {
  prompt(MESSAGES["first_move"]);
  let answer = readline.question().toLowerCase();
  answer = validateFirstPlayer(answer);
  return answer;
}

function playRound(board, currentPlayer) {
  while (true) {
    displayBoard(board);
    chooseSquare(board, currentPlayer);
    currentPlayer = alternatePlayer(currentPlayer);
    if (someoneWon(board) || boardFull(board)) break;
  }
  displayBoard(board);
}

function goodbye() {
  prompt(MESSAGES["goodbye"]);
}

displayWelcome();

while (true) {
  let score = {player: 0, computer: 0};
  let currentPlayer = retrieveFirstPlayer();

  while (true) {
    let board = initializeBoard();
    playRound(board, currentPlayer);

    if (someoneWon(board)) {
      let winner = detectWinner(board);
      prompt(`${winner} won!`);
      updateScore(score, winner);
    } else {
      displayTie();
    }

    if (gameOver(score)) {
      displayWinner(score);
      break;
    }

    displayScore(score);
    if(askAnotherRound() === 'n') break;
  }

  let again = anotherGameResponse();
  if (noToContinue(again)) break;
}

goodbye();