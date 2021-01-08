// NOTE VARIABLES //

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let userScore = 0
let compScore = 0
let $userScore = $('.userScore').text(userScore)
let $compScore = $('.compScore').text(compScore)
let player1 = false
let player2 = false
const cards = document.querySelectorAll('.memory-card');

cards.forEach(card => card.addEventListener('click', flipCard));

// NOTE FUNCTIONS //

// NOTE COMPUTER SELECTIONS //

function compflipCard() {
  if (lockBoard) return;
  player2 = true;
  player1 = false;
  firstCard = cards[Math.floor(Math.random() * $('.memory-card').length)];
  secondCard = cards[Math.floor(Math.random() * $('.memory-card').length)];

  if (secondCard === firstCard || firstCard.classList.contains('flip') || secondCard.classList.contains('flip') ) {
    compflipCard() 
    return;
  }
  else if ((secondCard != firstCard) &&  (!firstCard.classList.contains('flip')) && (!secondCard.classList.contains('flip'))) {
    firstCard.classList.add('flip')
    secondCard.classList.add('flip')
    checkForMatch(firstCard, secondCard);
  }
}

// NOTE USER SELECTIONS //

function flipCard() {
  player1 = true;
  player2 = false;
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('flip');
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  checkForMatch(firstCard, secondCard);
  setTimeout(() => {
    compflipCard()
  }, 2000);
}

function checkForMatch(firstCard, secondCard) {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards(firstCard, secondCard) : unflipCards(firstCard, secondCard);
  if (isMatch === true && player1 === true) {
    userblink_text() 
    userScore = userScore + 1
    $userScore = $('.userScore').text(userScore)
  }

  if (isMatch === true && player2 === true) {
    blink_text()
    compScore = compScore + 1
    $compScore = $('.compScore').text(compScore)
  }

  if (compScore + userScore === 6) {
    setTimeout(() => {
      showModal()
      }, 1500);
    return;
  }
}

// NOTE DISABLE BOARD //

function disableCards(firstCard, secondCard) {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

// NOTE UNFLIP CARDS //

function unflipCards(firstCard, secondCard) {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

// NOTE RESET BOARD //

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// NOTE SHUFFLE CARDS FOR NEW GAME //

(function shuffle() {
  cards.forEach(card => {
  let randomPos = Math.floor(Math.random() * 12);
  card.style.order = randomPos
  });
})();


// NOTE SCORE BLINKING //

 function blink_text() {
  for (i=0; i < 2; i++) {
    $('.compScore').fadeOut(300);
    $('.compScore').fadeIn(400);
    setInterval(500);
  }
 }

 function userblink_text() {
  for (i=0; i < 2; i++) {
      $('.userScore').fadeOut(300);
      $('.userScore').fadeIn(400);
    setInterval(500);
  }
 }

// NOTE MODAL //

function showModal() {
  $(document).ready(function(){
    $('#myModal').modal('show')
  });

  if (userScore > compScore) {
  $('.modal-message').text("You won! That's rad")
  }
  if (userScore === compScore) {
  $('.modal-message').text("It's a tie! That's cool too")
  } if (compScore > userScore) {
  $('.modal-message').text("Better luck next time...")
  }

  $( '.btn-primary').click(function() {
  location.reload();
  userScore = 0
  compScore = 0
  $compScore = $('.compScore').text(compScore)
  $userScore = $('.userScore').text(userScore)

  $(document).ready(function(){
    $('#myModal').modal('hide')
  });
  })
}







