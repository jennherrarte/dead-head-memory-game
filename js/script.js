let memoryCards = document.querySelectorAll('.memory-card')

let firstCard, secondCard;


const memoryGame = $('.memory-game')
let compScore = 0
let userScore = 0


$('.memory-card').click(function (event) {
    let cardOne, cardTwo;
   let index = $(this).index()
    cardOne = $('.memory-card').eq(index).addClass('flip')
   cardTwo = $('.memory-card').eq(index).addClass('flip')
    console.log(cardOne)
   //checkForMatch(cardOne, cardTwo)

});




function checkForMatch(cardOne, cardTwo) {
    if((cardOne).attr('data-framework') === (cardTwo).attr('data-framework')) {
        console.log('jenn')
    } else {
        $(cardOne).removeClass('flip')
        $(cardTwo).removeClass('flip')
    }
}


// i want to add the flip class to the div i click on // 








// generating computer cards

function compCards() {
let random1, random2;

    random1 = Math.floor(Math.random() * $('.memory-card').length);
    random2 = Math.floor(Math.random() * $('.memory-card').length);
   
    if(random2 === random1) {
        compCards()
        return
    }
   else {

        $('.memory-card').eq(random1).addClass('flip')
        $('.memory-card').eq(random2).addClass('flip')
        checkCompMatch(random1, random2)
    
    
    
   }
   
}

// checking for comuputer card match // 

function checkCompMatch(random1, random2) {
    if($('.memory-card').eq(random1).attr('data-framework') === $('.memory-card').eq(random2).attr('data-framework')) {
        console.log('jenn')
      
    } else {
        $('.memory-card').eq(random1).remove('flip')
        $('.memory-card').eq(random2).remove('flip')
       
    }
}

// blink function //

function blink_text() {

    $('.compScore').fadeOut(500);
    $('.compScore').fadeIn(500);
    setInterval(blink_text, 1000);
}

   
//while combined pairs is less than 7, keep going 
// tie modal
// loss modal
// win modal
// play again
// shuffle board