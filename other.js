

// NOTE Variables // 

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let $userScore = $('.userScore')
let $compScore = $('.compScore')
let totalPairs = 6;
const memoryGame = $('.memory-game')

const memoryCards = document.querySelectorAll('.memory-card')

// NOTE JS //


memoryCards.forEach(card => card.addEventListener('click', flipCard))

// FLIPPING CARDS AND CHECKING FOR MATCHES

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        
        return;

    }
        secondCard = this;
        checkForMatch(firstCard, secondCard, $userScore);

        compCards()
}


// CHECK FOR MATCH 

function checkForMatch(firstCard, secondCard, $player) {
   let isMatch = false;
    if(firstCard.attr('data-framework') === secondCard.attr('data-framework')) {
        isMatch = true;
        disableCards(firstCard, secondCard) 
        $player.text($player.val() + 1);
        userblink_text()
        firstCard.classList.add('match')
        secondCard.classList.add('match')
    } else {
        unflipCards(firstCard, secondCard); 

    
    }
}

// DISABLE CARDS IF IT IS A MATCH 

function disableCards(firstCard, secondCard) {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
    
    resetBoard();
}

// UNFLIP CARDS IF THEY ARE NOT A MATCH AND CLEARING PICK ONE AND TWO

function unflipCards(firstCard, secondCard) {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip')

        resetBoard();
    }, 1500);
}

// RESET BOARD 

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}

// SHUFFLE BOARD FOR ANOTHER ROUND

(function shuffle() {
    memoryCards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos
    });
})();




function compCards() {
   const cardList = memoryGame.find('.memory-card')
   
   cardOne = cardList.eq( Math.floor(Math.random() * 12)); 
   cardTwo = cardList.eq( Math.floor(Math.random() * 12));

    //If Card doesn't have a class of match 
    // If card has the class of match, then I want to run math.floor/random to generate a new number 
    // query selector all also an option, treat it as a normal array 


   setTimeout(() => {
    cardOne.addClass('flip') 
    cardTwo.addClass('flip');
    checkForMatch(cardOne, cardTwo, $compScore)
    }, 2500);
  
    
   
}

function compblink_text() {

    $('.compScore').fadeOut(500);
    $('.compScore').fadeIn(500);
    setInterval(blink_text, 1000);
}


function userblink_text() {

    $('userScore').fadeOut(500);
    $('.usercore').fadeIn(500);
    setInterval(blink_text, 1000);
}

// function game() {
//     flipCard()
//     compCards()
// }

// game()

//blink_text()

compCards()