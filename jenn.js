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



// OLD


// let memoryCards = document.querySelectorAll('.memory-card')
// let compScore = 0
// let userScore = 0
// let firstCard, secondCard;

// let $userScore = $('.userScore').text(userScore)

// let $compScore = $('.compScore').text(compScore)

// let compCard1, compCard2;

// const memoryGame = $('.memory-game')



// // let hasFlippedCard = false 

// // let cardOne, cardTwo


// // function jenn() {

    
// // $('.memory-card').click(function (event) {


// //    $(this).addClass('flip')

// //    if ($(this).get(0) === cardTwo) return;
  
// //    if(!hasFlippedCard) {
// //     cardOne = $(this).get(0)
// //     hasFlippedCard = true
// //     return;
     
// //    }
    
// //    cardTwo = $(this).get(0)
   
   
// //    checkForMatch(cardOne, cardTwo)
   

  

  
  


// // })


// // }




// // function checkForMatch(cardOne, cardTwo) {
// //     if($(cardOne).attr('data-framework') === $(cardTwo).attr('data-framework')) {
// //         $(cardOne).off('click')
// //         $(cardTwo).off('click')

// //         userScore++
// //         $userScore = $('.userScore').text(userScore)
// //         resetBoard()
// //         console.log('jenn')
// //     } else {

// //         //setTimeout(() => {
           
// //         $(cardOne).removeClass('flip')
// //         $(cardTwo).removeClass('flip')
      
    
     
// //        // }, 1500);
// //     }


// //     }









// // i want to add the flip class to the div i click on // 













// // function resetBoard() {
// //     hasFlippedCard = false
// //     [firstCard, secondCard] = [null, null]
// // }






// // blink function //

// // function blink_text() {

// //     $('.compScore').fadeOut(500);
// //     $('.compScore').fadeIn(500);
// //     setInterval(blink_text, 1000);
// // }

   







// // COMPUTER MATCHES // 


// // generating computer cards

// function compCards() {

//     let random1, random2;

//         random1 = Math.floor(Math.random() * $('.memory-card').length);
//         random2 = Math.floor(Math.random() * $('.memory-card').length);
    
    
//         if(random2 === random1) {
//             compCards()
//             return
//         }
//        else {
    
//            compCard1 =  $('.memory-card').eq(random1)
//            compCard2 = $('.memory-card').eq(random2)
    
//            $(compCard1).addClass('flip')
//            $(compCard2).addClass('flip')
//           checkCompMatch(compCard1, compCard2)
          
//        }
        
//     }


// function checkCompMatch(compCard1, compCard2) {
//     let isMatch = $(compCard1).attr('data-framework') === $(compCard2).attr('data-framework')
//     if(isMatch) {
//         compScore++
//         $compScore = $('.compScore').text(compScore)
//         console.log('jenn')
       
      
//     } if(!isMatch) {
//         setTimeout(() => {
           
//             $(compCard1).removeClass('flip')
//             $(compCard2).removeClass('flip')
         
//             }, 1000); 
//         }
       
//     }


