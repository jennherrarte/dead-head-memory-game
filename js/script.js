

// NOTE Variables // 

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let $userScore = $('.userScore')
let $compScore = $('.compScore')
let totalPairs = 6;

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

       console.log(this)
}


// CHECK FOR MATCH 

function checkForMatch(firstCard, secondCard, $player) {
   let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards(firstCard, secondCard) : unflipCards(firstCard, secondCard); 

    if (isMatch === true) {
        
        $player.text($player.val() + 1);
        
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



// make sure math random is inclusive 
// function compCards() {
//    console.log(firstCard)
//    console.log(secondCard)
//    firstCard = $( ".memory-card" ).get( Math.floor(Math.random() * 12) + 1); 
//    secondCard = $( ".memory-card" ).get( Math.floor(Math.random() * 12) + 1);
    
//    setTimeout(() => {
//     firstCard.classList.add('flip') 
//     secondCard.classList.add('flip');
//     checkForMatch(firstCard, secondCard, $compScore)
//     }, 2500);
   
   
// }

function blink_text() {

    $('.compScore').fadeOut(500);
    $('.compScore').fadeIn(500);
}
setInterval(blink_text, 1000);




blink_text()

var myModal = new bootstrap.Modal(document.getElementById('myModal'), options)

console.log(myModal)
