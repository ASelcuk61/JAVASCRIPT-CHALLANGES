//Challange 1: Your Age in Days
function ageInDays(){
    var birthYear =  prompt("What Year Where you born...? ");
    var ageInDayss = (2022-birthYear) * 365;
    var h1=document.createElement('h1');
    var textAnswer = document.createTextNode('You are '+ ageInDayss+ ' days old.')
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset(){
    document.getElementById('ageInDays').remove();
}

//Challange2: Cat Generator
function generateCat(){
    var image=document.createElement('img');
    var div=document.getElementById('flex-cat-gen');
    image.src='https://cdn2.thecatapi.com/images/TuSyTkt2n.jpg';
    div.appendChild(image);
}

//Challange 3: Rock, Paper, Scissors
function rpsGame(yourChoise){
    console.log(yourChoise);
    var humanChoise, botChoise;
    humanChoise=yourChoise.id;

    botChoise = numberToChoise(randToRpsInt());
    console.log('Computer Choise: ', botChoise);

    results = decideWinner(humanChoise, botChoise); // [0,1] human lost | bot won
    console.log(results);

    message = finalMessage(results); //{'message': 'You won!', 'color': 'green'}
    console.log(message);

    rpsFrontEnd(yourChoise.id, botChoise, message);

}

function randToRpsInt(){
    return Math.floor(Math.random()*3);
}

function numberToChoise(number){
    return ['rock','paper','scissors'][number];
}

function decideWinner(yourChoise, computerChoise){
    var rpsDatabase ={
        'rock': {'scissors':1, 'rock':0.5, 'paper':0},
        'paper': {'rock':1, 'paper':0.5, 'scissors':0},
        'scissors': {'paper':1, 'scissors':0.5, 'rock':0},
    }

    var yourScore=rpsDatabase[yourChoise][computerChoise];
    var computerScore=rpsDatabase[computerChoise][yourChoise];

    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]){
    if(yourScore === 0){
        return {'message':'You lost!', 'color': 'red'}
    }

    else if(yourScore ===0.5){
        return {'message': 'You Tied!', 'color': 'yellow'};
    }

    else{
        return {'message':'You won!', 'color': 'green'}
    }
}

function rpsFrontEnd(humanImageChoise, botImageChoise, finalMessage){
    var imagesDataBase = {
        'rock':document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }

    // let's remove all the images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv =document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML ="<img src='" +imagesDataBase[humanImageChoise] + "' heigh=150 width=150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1);'>"
    messageDiv.innerHTML="<h1 style= 'color: " + finalMessage['color'] +"; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML ="<img src='" +imagesDataBase[botImageChoise] + "' heigh=150 width=150 style='box-shadow: 0px 10px 50px rgba(243,38,24,1);'>"

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
    


}

//Challange 4: Change the color of All Buttons

var all_buttons=document.getElementsByTagName('button');

var copyAllButtons=[];
for(let i=0; i<all_buttons.length;i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonThingy){
    if(buttonThingy.value === 'red'){
         buttonsRed();
    } else if(buttonThingy.value === 'green'){
        buttonsGreen();
    } else if(buttonThingy.value === 'reset'){
        buttonColorReset();
    } else if(buttonThingy.value === 'random'){
        randomColors();
    }
}

function buttonsRed() {
    for (let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen() {
    for (let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonColorReset(){
    for(let i =0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors(){
    var choises = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning']
    for(i=0;i<all_buttons.length;i++){
        var randomNumber=Math.floor(Math.random()*4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choises[randomNumber]);
    }
}

// Challange 5 : Blackjack
let blackjackGame={
    'you' : {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score':0},
    'dealer':{'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score':0},
    'cards': ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap': {'2': 2,'3': 3,'4': 4,'5': 5,'6': 6,'7': 7,'8': 8,'9': 9,'10': 10,'K': 10,'J': 10,'Q': 10,'A':[1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand': false,
    'turnsOver' : false, 
};

const YOU= blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#blacjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blacjack-stand-button').addEventListener('click',dealerLogic);
document.querySelector('#blacjack-deal-button').addEventListener('click',blackjackDeal);

function blackjackHit(){
    if(blackjackGame['isStand'] === false){
       let card= randomCard();
       console.log(card);
       showCard(card,YOU);
       updateScore(card,YOU);
       showScore(YOU);
       console.log(YOU['score'])
    }
}

function randomCard() {
    let randomIndex =Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer){
    if(activePlayer['score']<=21){
    let cardImage = document.createElement('img');
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
    }

}

function blackjackDeal(){
  if(blackjackGame['turnsOver'] === true){

    blackjackGame['isStand'] = false;
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    
    for(i=0;i<yourImages.length;i++){
        yourImages[i].remove();
    }

    for(i=0;i<dealerImages.length;i++){
        dealerImages[i].remove();
    }

    YOU['score']=0;
    DEALER['score']=0;

    document.querySelector('#your-blackjack-result').textContent=0;
    document.querySelector('#dealer-blackjack-result').textContent=0;

    document.querySelector('#your-blackjack-result').style.color='#ffffff';
    document.querySelector('#dealer-blackjack-result').style.color='#ffffff';

    document.querySelector('#blackjack-result').textContent = "Let's play";
    document.querySelector('#blackjack-result').style.color = 'black';

    blackjackGame['turnsOver'] = true;
  }
}

function updateScore(card, activePlayer) {
    if(card==='A'){
    // If adding 11 keeps me below 21, add 11. Otherwise, add 1
        if(activePlayer['score']+blackjackGame['cardsMap'][card][1]<=21){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else{
            activePlayer['score'] +=blackjackGame['cardsMap'][card][0];
        }
    } else {   
    activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer){
    if(activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent='BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color='red';
    }else{
    document.querySelector(activePlayer['scoreSpan']).textContent=activePlayer['score'];
    }
}



function dealerLogic() {
    blackjackGame['isStand'] = true;
    let card =randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);

    if(DEALER['score'] > 15) {
        blackjackGame['turnsOver'] = true;
        let winner = computeWinner();
        showResult(winner);
        console.log(blackjackGame['turnsOver']);
    }
}

// compute winner and return who just won
//update the wins, draws and losses
function computeWinner() {
    let winner;

    if(YOU['score'] <= 21){
        // condition: higher score than dealer or when dealer busts you're 21 or under
        if(YOU['score']>DEALER['score'] ||(DEALER['score'] >21)){
        blackjackGame['wins']++;
        winner=YOU;

        }else if(YOU['score'] < DEALER['score']){
        blackjackGame['losses']++;
        winner = DEALER;

        }else if(YOU['score'] === DEALER['score']){
        blackjackGame['draws']++;
        }
    }

    // condition: when user busts but dealer doesn't

    else if(YOU['score'] >21 && DEALER['score']<=21){
    blackjackGame['losses']++;
    winner = DEALER;
    }

    // condition: when you and the DEALER busts
    else if(YOU['score'] >21 && DEALER['score'] > 21){
    blackjackGame['draws']++;
    }
    console.log(blackjackGame);
    return winner;
}

function showResult(winner){
 let message, messageColor;

    if(blackjackGame['turnsOver'] === true){

        if(winner ===YOU){
            document.querySelector('#wins').textContent =blackjackGame['wins'];
            message = 'You won!';
            messageColor ='green';
            winSound.play();
        }else if(winner === DEALER){
            document.querySelector('#losses').textContent= blackjackGame['losses'];
            message = 'You lost!';
            messageColor ='red';
            lossSound.play();

        }else{
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You drew!';
            messageColor ='black';
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }

}