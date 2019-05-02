/*
  strict mode is used for detecting undeclared variables in code
  and code should be run in strict manner.
 */
'use strict';
/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
//cards open
const cards = document.querySelectorAll('.card');
for (let card of cards) {
  card.addEventListener('click', () => {});
}
const deck = document.querySelector('.deck');
deck.addEventListener('click', event => {
  const clickTarget = event.target;
  if (clickTarget.classList.contains('card') && !clickTarget.classList.contains('match') && toggledCards.length < 2 && !toggledCards.includes(clickTarget)) {
    toggleCard(clickTarget);
    addToggleCard(clickTarget);
    if (toggledCards.length === 2) {
      addMove();
      checkForMatch(clickTarget);
      checkScore();
    }
    if (clockOff) {
      startClock();
      clockOff = false;
    }
  }
});
var toggleCard = (card) => {
  card.classList.toggle('open');
  card.classList.toggle('show');
}
let toggledCards = [];
var addToggleCard = (clickTarget) => {
  toggledCards.push(clickTarget)
}
//match cards
let matched = 0;

function checkForMatch() {
  if (toggledCards[0].firstElementChild.className === toggledCards[1].firstElementChild.className) {
    toggledCards[0].classList.toggle('match');
    toggledCards[1].classList.toggle('match');
    toggledCards = [];
    matched++;
    const totalPairs = 8;
    if (matched === totalPairs) {
      gameOver();
    }
  } else {
    setTimeout(() => {
      toggleCard(toggledCards[0]);
      toggleCard(toggledCards[1]);
      toggledCards = [];
    }, 733);
  }

}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

var shuffleDeck = () => {
  const cardsShuffle = Array.from(document.querySelectorAll('.deck li'));
  const shuffledCards = shuffle(cardsShuffle);
  for (var card of shuffledCards) {
    deck.appendChild(card);
  }
}
//Moves
let moves = 0;
const movesText = document.querySelector('.moves');

var addMove = () => {
  moves += 1;
  movesText.innerHTML = moves;
}

// Stars
var checkScore = () => {
  if (moves === 9) {
    hideStar();
  } else if (moves === 18) {
    hideStar();

  } else if (moves === 27) {
    hideStar();
    window.alert("Lose The Game");
    window.location.reload();
  }

}
//  hideStar

var hideStar = () => {
  const starList = document.querySelectorAll('.stars li');
  for (var star of starList) {
    if (star.style.display !== 'none') {
      star.style.display = 'none';
      break;
    }
  }
}
// set Time
let clockOff = true;
let time = 0;
let clockId;

var startClock = () => {
  clockId = setInterval(() => {
    time++;
    displayTime();
  }, 1000);

}
// Display time
function displayTime() {
  const clock = document.querySelector('.clock');
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  if (seconds < 10) {
    clock.innerHTML = `${minutes}:0${seconds}`;
  } else {
    clock.innerHTML = `${minutes}:${seconds}`;
  }
}
//game over functionality
function gameOver() {
  clearInterval(clockId);
  writeModalStatus();
  toggleModal();
}
// Game Reply functionality
function replayGame() {
  location.reload();
  shuffleDeck();
}
//modal box functionality after completion of all matches
function toggleModal() {
  const modal = document.querySelector('.modal_background');
  modal.classList.toggle('hide');
}
//Star count
function getStars() {
  const stars = document.querySelectorAll('.stars li');
  var starCount = 0;
  for (var star of stars) {
    if (star.style.display !== 'none') {
      starCount++;
    }
  }
  return starCount;
}
// modal status (alert)
function writeModalStatus() {
  const timeStat = document.querySelector('.modal_time');
  const clockTime = document.querySelector('.clock').innerHTML;
  const movesText = document.getElementById('modal_moves');
  const starsStat = document.querySelector('.modal_stars');
  timeStat.innerHTML = `Time = ${clockTime}`;
  movesText.innerHTML = `Moves = ${moves}`;
  starsStat.innerHTML = `Stars = ${getStars()}`;
}
document.querySelector('.modal_cancel').addEventListener('click', () => {
  toggleModal();
});
document.querySelector('.restart').addEventListener('click', replayGame);
document.querySelector('.modal_replay').addEventListener('click', replayGame);
document.querySelector('.modal_close').addEventListener('click', replayGame);
//onload function for this game
window.onload = shuffleDeck;
