
//Intialise a board as an object, with 1 to 9

let readline = require('readline-sync');
const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const WINNING_SCORE = 5;
const COMPUTER_FIRST = {
  firstPlayer: 'computer',
 }

const WINNING_LINES = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
    [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
    [1, 5, 9], [3, 5, 7]             // diagonals
  ]; 
let scores = {
    Player: 0,
    Computer: 0,
  }

function prompt(message) {
  console.log(`=> ${message}`);
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

function initializeBoard() {
  let board = {};
  for(let square = 1; square <= 9; square++) {
    board[String(square)] = INITIAL_MARKER;
  }
  return board;
}

function emptySquares(board) {
  return Object.keys(board).filter(key => board[key] === INITIAL_MARKER);
}  

    function boardFull(board) {
  return emptySquares(board).length === 0;
      }
  function someoneWon(board) {
    return !!detectWinner(board);
  }
  
function computerChoosesSquare(board) {
  let square;
  for(let index = 0; index < WINNING_LINES.length; index++) {p
    let line = WINNING_LINES[index];
    square = findAtRiskSquare(line, board, COMPUTER_MARKER);
    if(square) break;
  else if (!square) {
       square = findAtRiskSquare(line, board, HUMAN_MARKER);
       if(square) break;
     }
  else if(!square) {
    if(emptySquares(board)[5] !== HUMAN_MARKER ||
     emptySquares(board)[5] !== COMPUTER_MARKER) {
       square = emptySquares(board)[5];
     }
  }
     else if(!square) {
     let randomIndex = Math.floor(Math.random() * emptySquares(board).length);
     square = emptySquares(board)[randomIndex];
   }
   }
    board[square] = COMPUTER_MARKER;
  }
  
  function findAtRiskSquare(line, board, marker)  {
   let markersInLine = line.map(square => board[square]);
   
   if (markersInLine.filter(val => val === marker).length === 2) {
     let unusedSquare = line.find(square => board[square] === INITIAL_MARKER);
   if(unusedSquare !== undefined) {
     return unusedSquare;
   }
   
   }
   return null;
}

function detectWinner(board) {
   for(let line = 0; line < WINNING_LINES.length; line ++) {
   let [sq1, sq2, sq3] = WINNING_LINES[line];
 if(
    board[sq1] === HUMAN_MARKER &&
    board[sq2] === HUMAN_MARKER &&
    board[sq3] === HUMAN_MARKER 
  ) {
    return 'Player';
  }
  else if (
    board[sq1] === COMPUTER_MARKER &&
    board[sq2] === COMPUTER_MARKER &&
    board[sq3] === COMPUTER_MARKER
    ) {
      return 'Computer';
    }
}
return null;
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

function playerChoosesSquare(board) {
  let square;

  while(true) {
    prompt(`Choose a square: ${joinOr(emptySquares(board))}`);
  square = readline.question().trim(); 
  if(emptySquares(board).includes(square)) break;
  
  prompt("Sorry that's not a valid choice");
  }
board[square] = HUMAN_MARKER;
}

function displayRoundScore(roundWinner) {
  if(roundWinner) {
  prompt(`${roundWinner} won the round!`);
  return prompt(`You have ${scores.Player} points and the computer has ${scores.Computer} points`);
   }
   else {
  return prompt("It's a tie!");
   }
}

 function computeRoundScore(winner) {
  if(winner === 'Player') {
   scores[winner] += 1;
    }
 else if(winner === 'Computer') {
   scores[winner] += 1;
   }
 }
    function retrieveMatchWinner() {
  if(scores.Player === WINNING_SCORE) {
    return 'Player';
  }
else if(scores.Computer === WINNING_SCORE) {
    return 'Computer';
}
 }

 function displayMatchWinner(matchWinner) {
if(matchWinner === 'Player') {
  prompt(`You have won the match by ${scores.Player - scores.Computer} points.`);
  prompt(`The final scores were: Player: ${scores.Player} -- computer: ${scores.Computer}`);
}
else if(matchWinner === 'Computer') {
  prompt(`You have won the match by ${scores.Computer - scores.Player} points.`)
  prompt(`the final scores were: Player: ${scores.Player} -- computer: ${scores.Computer}`)
}
}


function invalidInput(answer) {
let choices = ['y', 'yes', 'n', 'no'];
return !choices.includes(answer);
}

  function retrieveAnotherGame() {
    prompt(`Would you like to play another game? ('y' or 'n')`);
    let answer = readline.question().toLowerCase();
      if(invalidInput(answer)) {
        prompt("Invalid choice, please enter 'y' or 'n'");  
        answer = readline.question().toLowerCase();
   }
   return answer;
  }

  function retrieveExitAnswer() {
  prompt("press 'e' to exit or enter to continue");
  return 'e' === readline.question().toLowerCase();
    }

function chooseFirstPlayer() {
   prompt(`Who goes first - Choose 'c' for computer or 'p' for player`);
   let firstPlayer = readline.question().toLowerCase();
   if(firstPlayer === 'c' || firstPlayer === 'p') {
      prompt(`Thanks for choosing, get ready to begin`);
   }
   else {
      prompt(`incorrect response, please choose 'c' or 'p'`);
      firstPlayer = readline.question().toLowerCase();
   }
if(firstPlayer === 'p') {
  COMPUTER_FIRST.firstPlayer = 'player';
  }
  else {
    COMPUTER_FIRST.firstPlayer = 'computer';
    }
}
// -----------------------------------


while (true) {
  let board = initializeBoard();

while (true) {
  displayBoard(board);
  chooseSquare(board, currentPlayer);
  currentPlayer = alternatePlayer(currentPlayer);
  if (someoneWon(board) || boardFull(board)) break;
}


while (true) {
 displayBoard(board);
 if(emptySquares(board).length === 9) {
chooseFirstPlayer();
 }
    if(COMPUTER_FIRST.firstPlayer === 'computer') {
   computerChoosesSquare(board);
    displayBoard(board);
   if(someoneWon(board) || boardFull(board)) break;
    
    playerChoosesSquare(board);
    if(someoneWon(board) || boardFull(board)) break;
    
      
    } else if(COMPUTER_FIRST.firstPlayer === 'player') {
  playerChoosesSquare(board);
if(someoneWon(board) || boardFull(board)) break;

computerChoosesSquare(board);
   if(someoneWon(board) || boardFull(board)) break;
 }
   displayBoard(board);  
}
  

displayBoard(board);  
let roundWinner = detectWinner(board);  

if(someoneWon(board)) {
  computeRoundScore(roundWinner);
}
displayRoundScore(roundWinner);
  
let matchWinner = retrieveMatchWinner();
if(matchWinner) {
displayMatchWinner(matchWinner);
let answer = retrieveAnotherGame();
if(answer === 'n' || answer === 'no') {
  break;
}
  }

  else if(!matchWinner) {
 if(retrieveExitAnswer()) {
  break;
}
}
}
  

prompt('Thanks for playing Tic Tac Toe!');
