const readline = require('readline-sync');
const MESSAGES = require('./twentyOne_messages.json');
const ACE = [1, 11];
const PICTURE_CARD = 10;
const DEALER_STAYS_SCORE = 17;
let BLACK_JACK = 21;
const SUITS = ['Hearts', 'Clubs', 'Spades', 'Diamonds'];
const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10',
  'Jack', 'Queen', 'King', 'Ace'];
const ROYALS = ['King', 'Jack', 'Queen', 'Ace'];

function prompt(message) {
  console.log(`=> ${message}`);
}

function shuffle(cards) {
  for (let first = cards.length - 1; first > 0; first--) {
    let second = Math.floor(Math.random() * (first + 1));
    [cards[first], cards[second]] = [cards[second], cards[first]];
  }
  return cards;
}

function initializeDeck() {
  let deck = [];
  for (let index = 0; index < SUITS.length; index++) {
    for (let inner = 0; inner < VALUES.length; inner++) {
      let card = VALUES[inner];
      deck.push([SUITS[index], card]);
    }
  }
  return shuffle(deck);
}

function displayWelcome() {
  prompt(MESSAGES['welcome']);
  prompt(MESSAGES['line']);
  prompt(MESSAGES['rules']);
  prompt(MESSAGES['cardRules']);
  prompt(MESSAGES['moreRules']);
  prompt(MESSAGES['dealerCardRules']);
  prompt(MESSAGES['line']);
  readline.question(`>> Press enter to Start the game. <<`);
  console.clear();
}

function dealTwoCards(player, deck) {
  player.push(deck.pop(), deck.pop());
}

function dealCard(player, deck) {
  player.push(deck.pop());
}

function displayPlayerCards(player) {
  prompt(MESSAGES['playerCards']);
  prompt(MESSAGES['line']);
  player.forEach(card => {
    prompt(`${card[1]} of ${card[0]}`);
  });
  prompt(MESSAGES['line']);
}

function displayDealerCards(dealerCards) {
  prompt(`The dealers has:`);
  prompt(MESSAGES['line']);
  for (let index = 1; index < dealerCards.length; index++) {
    prompt(`${dealerCards[index][1]} of ${dealerCards[index][0]}`);
  }
  prompt(MESSAGES['line']);
}

function hitOrStay() {
  prompt(MESSAGES['askHitOrStay']);
  let answer = readline.question().toLowerCase().trim();
  while (!validateHitResponse(answer)) {
    prompt(MESSAGES['invalid_response']);
    answer = readline.question().toLowerCase().trim();
  }
  return answer[0];
}

function validateHitResponse(answer) {
  let answers = ['hit', 'h', 'stay', 's'];
  return answers.includes(answer) &&
  answers[answers.indexOf(answer)].length === answer.length;
}

function validateRoyalsAces(card, total) {
  if (card === 'Ace') {
    if (total > BLACK_JACK) {
      card = ACE[0];
    } else {
      card = ACE[1];
    }
  } else {
    card = PICTURE_CARD;
  }
  return Number(card);
}

function addCardsTotal(player, royals) {
  let total = player.reduce((total, current) => {
    if (royals.includes(current[1])) {
      return total + Number(validateRoyalsAces(current[1], total));
    } else {
      return total + Number(current[1]);
    }
  }, 0);
  return total;
}

function detectResult(player, dealer, royals) {
  let playerTotal = addCardsTotal(player, royals);
  let dealerTotal = addCardsTotal(dealer, royals);

  if (verifyBusted(player, royals)) {
    return 'PLAYER_BUSTED';
  } else if (verifyBusted(dealer, royals)) {
    return 'DEALER_BUSTED';
  } else if (dealerTotal < playerTotal) {
    return 'PLAYER';
  } else if (dealerTotal > playerTotal) {
    return 'DEALER';
  } else {
    return 'TIE';
  }
}

function displayResults(player, dealer, royals) {
  let result = detectResult(player, dealer, royals);

  switch (result) {
    case 'PLAYER_BUSTED':
      prompt("You're busted! The dealer wins!");
      break;
    case 'DEALER_BUSTED':
      prompt('Dealer went bust, you win!');
      break;
    case 'PLAYER':
      prompt('You won the game!');
      break;
    case 'DEALER':
      prompt('Dealer won the game!');
      break;
    case 'TIE':
      prompt("It's a tie!");
  }
}

function verifyBusted(cards, royals) {
  return addCardsTotal(cards, royals) > BLACK_JACK;
}

function anotherGame() {
  prompt(MESSAGES['line']);
  prompt(MESSAGES['anotherGame']);
  let answer = readline.question().toLowerCase().trim();
  while (!validateGameResponse(answer)) {
    prompt(MESSAGES['invalidEndAnswer']);
    answer = readline.question().toLowerCase().trim();
  }
  return answer[0] === 'y';
}

function validateGameResponse(answer) {
  let answers = ['yes', 'y', 'no', 'n'];
  return answers.includes(answer) &&
  answers[answers.indexOf(answer)].length === answer.length;
}

function displayBothStay(player, dealer, royals) {
  prompt(MESSAGES['line']);
  displayPlayerCards(player);
  displayDealerCards(dealer);
  prompt(MESSAGES['line']);
  displayResults(player, dealer, royals);
}

function displayChoseHit(player, royals) {
  prompt(MESSAGES['choseHit']);
  displayPlayerCards(player);
  prompt(`Your total is: ${addCardsTotal(player, royals)}`);
}

function dealToPlayers(player, dealer, cards, royals) {
  dealTwoCards(player, cards);
  dealTwoCards(dealer, cards);
  displayPlayerCards(player);
  prompt(`Score: You have ${addCardsTotal(player, royals)} points`);
  prompt(MESSAGES['line']);
  displayDealerCards(dealer);
}

while (true) {
  console.clear();

  displayWelcome();

  let cardDeck = initializeDeck();
  const playerCards = [];
  const dealerCards = [];

  dealToPlayers(playerCards, dealerCards, cardDeck, ROYALS);

  while (true) {
    let turn;

    while (true) {
      turn = hitOrStay();
      console.clear();
      if (['h', 's'].includes(turn)) break;
    }
    if (turn === 'h') {
      dealCard(playerCards, cardDeck);
      displayChoseHit(playerCards, ROYALS);
    }
    if (turn === 's' || verifyBusted(playerCards, ROYALS)) break;
  }
  if (verifyBusted(playerCards, ROYALS)) {
    displayResults(playerCards, dealerCards, ROYALS);
    prompt(MESSAGES['youLost']);
    if (anotherGame()) {
      continue;
    } else {
      break;
    }
  } else {
    prompt(`You stayed at ${addCardsTotal(playerCards, ROYALS)}`);
  }

  console.clear();
  prompt(MESSAGES['dealerTurn']);

  while (addCardsTotal(dealerCards, ROYALS) < DEALER_STAYS_SCORE) {
    prompt(MESSAGES['dealerHits']);
    dealCard(dealerCards, cardDeck);
    displayDealerCards(dealerCards);
  }

  if (verifyBusted(dealerCards, ROYALS)) {
    prompt(`Dealer now has ${addCardsTotal(dealerCards, ROYALS)}`);
    displayResults(playerCards, dealerCards, ROYALS);
    if (anotherGame()) {
      continue;
    } else {
      break;
    }
  } else {
    prompt(`Dealer stays at ${addCardsTotal(dealerCards, ROYALS)}`);
  }

  displayBothStay(playerCards, dealerCards, ROYALS);

  if (!anotherGame()) break;
  console.clear();
}

