/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, dice0, dice1, prevDice0, prevDice1, winningScore, roundPlaying;

// 0 = firstplayer 1 = secondplayer

function init() {

    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;

    document.querySelector('.dice-0').style.display = 'none';
    document.querySelector('.dice-1').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    gamePlaying = true;
    roundPlaying = true;
};

init();

//console.log(dice);

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

/*var x = document.querySelector('#score-0').textContent;
console.log(x);*/




/*
function btn() {
    if (gamePlaying) {
        
        // 1. Random number
        var dice = Math.floor(Math.random()*6) + 1;
        
        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // 3. Update the round score IF the rolled number was NOT a 1
        if (dice !== 1) {
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer()
        };
    };


};
*/

document.querySelector('.btn-roll').addEventListener('click', btn);  //call back function by eventlistener
// document.querySelector('.btn-roll').addEventListener('click', function(){console.log('Hello world!')}); //annonymous function
//https://developer.mozilla.org/en-US/docs/Web/Events

/*
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying){
        // Add current score to global socre
        scores[activePlayer] += roundScore;
        
        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] < 100) {
            //Next player
            nextPlayer()
        } else {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gamePlaying = false
        };
    };
    

});
*/

function nextPlayer() {
    roundScore = 0;
    dice0 = 0;
    dice1 = 0;
    roundPlaying = true;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    //document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    //document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice-0').style.display = 'none';
    document.querySelector('.dice-1').style.display = 'none';
    document.querySelector('.dice-0').classList.remove('dice-fail');
    document.querySelector('.dice-1').classList.remove('dice-fail');

};

document.querySelector('.btn-new').addEventListener('click', init);

//Additional rule***************************************

//1. lose all scores when roll 6 2 times in a row and go to next player

function btn() {
    if (gamePlaying & roundPlaying) {
        
        // 0. Remember last dice
        prevDice0 = dice0
        prevDice1 = dice1

        // 1. Random number
        dice0 = Math.floor(Math.random()*6) + 1;
        dice1 = Math.floor(Math.random()*6) + 1;
        
        // 2. Display the result
        var diceDOM0 = document.querySelector('.dice-0');
        var diceDOM1 = document.querySelector('.dice-1');
        diceDOM0.style.display = 'block';
        diceDOM1.style.display = 'block';
        diceDOM0.src = 'dice-' + dice0 + '.png';
        diceDOM1.src = 'dice-' + dice1 + '.png';

        // 3. Calculation


        if ((prevDice0 == 6 || prevDice1 == 6) && (dice0 == 6 || dice1 == 6)){

            // if roll 6 in a row = score to 0 and go next
            scores[activePlayer] = 0;
            roundScore = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            if (dice0 == 6) document.querySelector('.dice-0').classList.add('dice-fail');
            if (dice1 == 6) document.querySelector('.dice-1').classList.add('dice-fail');
            roundPlaying = false


        } else if (dice0 == 1 || dice1 == 1) {
            // if roll 1 = go next
            roundPlaying = false  ;
            roundScore = 0;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            if (dice0 == 1) document.querySelector('.dice-0').classList.add('dice-fail');
            if (dice1 == 1) document.querySelector('.dice-1').classList.add('dice-fail');
            

        } else {
            // else add score and update
            roundScore += dice1;
            roundScore += dice0;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        };
    };


};

//2. let player set winning score

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying & roundPlaying) {
        // Add current score to global socre
        scores[activePlayer] += roundScore;
        roundPlaying = true
        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        winningScore = document.getElementById("winning-score").value
        if (scores[activePlayer] < winningScore) {
            //Next player
            nextPlayer()
        } else {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice-0').style.display = 'none';
            document.querySelector('.dice-1').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gamePlaying = false
        };
    } else if (gamePlaying){
        nextPlayer();
    };
    

});

//3. add second dice to the game



//extra from me 
//1. show dice when roll false ----- OK
//2. add rule to read

