

const cards = document.querySelectorAll('.memory-card');



let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let userScore = 0
let compScore = 0
let $userScore = $('.userScore').text(userScore)
let $compScore = $('.compScore').text(compScore)


let player1 = false
let player2 = false




function compflipCard() {
    if (lockBoard) return;
    player2 = true
    player1 = false
    firstCard = cards[Math.floor(Math.random() * $('.memory-card').length)]
    secondCard = cards[Math.floor(Math.random() * $('.memory-card').length)]

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



function flipCard() {
    player1 = true
    player2 = false
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');
 

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch(firstCard, secondCard);
  
  setTimeout(() => {
  compflipCard()
  }, 3000);

  
 
}




function checkForMatch(firstCard, secondCard) {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards(firstCard, secondCard) : unflipCards(firstCard, secondCard);



  if(isMatch === true && player1 === true) {
    userScore++
    $userScore = $('.userScore').text(userScore)
    

  }

  if(isMatch === true && player2 === true) {
    compScore++
    $compScore = $('.compScore').text(compScore)

  }
 


}






function disableCards(firstCard, secondCard) {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}





function unflipCards(firstCard, secondCard) {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}





function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

cards.forEach(card => card.addEventListener('click', flipCard));



(function shuffle() {
  cards.forEach(card => {
  let randomPos = Math.floor(Math.random() * 12);
  card.style.order = randomPos
  });
})();

