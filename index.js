let card = document.getElementsByClassName("card");
let cards = [...card];

const deck = document.getElementById("card-deck");

let moves = 0;
let counter = document.querySelector(".moves");

let matchedCard = document.getElementsByClassName("match");

let closeicon = document.querySelector(".close");


var openedCards = [];

window.addEventListener("click", () => {
  document.getElementById("sounds").play();
});

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

document.body.onload = startGame();

function startGame() {
  openedCards = [];

  cards = shuffle(cards);
  for (var i = 0; i < cards.length; i++) {
    deck.innerHTML = "";
    [].forEach.call(cards, function (item) {
      deck.appendChild(item);
    });
    cards[i].classList.remove("show", "open", "match", "disabled");
  }
  moves = 0;
  counter.innerHTML = moves;

  second = 0;
  minute = 0;
  hour = 0;
  var timer = document.querySelector(".timer");
  timer.innerHTML = "0 mins 0 sec";
  clearInterval(interval);
}

var displayCard = function () {
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
};

function cardOpen() {
  openedCards.push(this);
  var len = openedCards.length;
  if (len === 2) {
    moveCounter();
    if (openedCards[0].type === openedCards[1].type) {
      matched();
    } else {
      unmatched();
    }
  }
}

function matched() {
  openedCards[0].classList.add("match", "disabled");
  openedCards[1].classList.add("match", "disabled");
  openedCards[0].classList.remove("show", "open", "no-event");
  openedCards[1].classList.remove("show", "open", "no-event");
  openedCards = [];
}

function unmatched() {
  openedCards[0].classList.add("unmatched");
  openedCards[1].classList.add("unmatched");
  disable();
  setTimeout(function () {
    openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
    openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
    enable();
    openedCards = [];
  }, 1100);
}

function disable() {
  Array.prototype.filter.call(cards, function (card) {
    card.classList.add("disabled");
  });
}

function enable() {
  Array.prototype.filter.call(cards, function (card) {
    card.classList.remove("disabled");
    for (var i = 0; i < matchedCard.length; i++) {
      matchedCard[i].classList.add("disabled");
    }
  });
}

function moveCounter() {
  moves++;
  counter.innerHTML = moves;
  if (moves == 1) {
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  }
}

var second = 0,
  minute = 0;
hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer() {
  interval = setInterval(function () {
    timer.innerHTML = minute + " min " + second + " sec";
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
}

function congratulations() {
  if (matchedCard.length == 16) {
    clearInterval(interval);
    finalTime = timer.innerHTML;

    alert("Game Over ! You WON !");

    startGame();
  }
}

for (var i = 0; i < cards.length; i++) {
  card = cards[i];
  card.addEventListener("click", displayCard);
  card.addEventListener("click", cardOpen);
  card.addEventListener("click", congratulations);
}
