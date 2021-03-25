/*
GAME RULES:

- Jocul are 2 jucători, jucând în runde
- În fiecare rând, un jucător aruncă un zar de câte ori dorește. Fiecare rezultat se adaugă la scorul său ROUND
- DAR, dacă jucătorul aruncă un 1, tot scorul său ROUND se pierde. După aceea, este rândul următorului jucător
- Jucătorul poate alege să „Țină”, ceea ce înseamnă că scorul său ROUND se adaugă la scorul său GLOBAL. După aceea, este rândul următorului jucător
- Primul jucător care atinge 100 de puncte la scorul GLOBAL câștigă jocul

*/

var scores, roundScore, activePlayer, gamePlaying;
var diceSAME = [];

init();

// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    // 1.Random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // 2.Display the result
    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-2").style.display = "block";
    document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
    document.getElementById("dice-2").src = "dice-" + dice2 + ".png";

    // diceDOM.style.display = 'block';
    // diceDOM.src = 'dice-' + dice + '.png';

    //3.Update the round score IF the rolled number was NOT 1
    if (dice1 === 6 && dice2 === 6) {
      //Player looses score
      scores[activePlayer] = 0;
      //update the UI
      document.querySelector("#score-" + activePlayer).textContent =
        scores[activePlayer];
      nextPlayer();
    } else if (dice1 !== 1) {
      //add score
      roundScore += dice1 + dice2;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //next player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    //add current score to global score
    scores[activePlayer] += roundScore;

    //update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    var input = document.querySelector(".final-score").value;
    var winningScore;

    //verificam daca am citit sau nu un numar

    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }
    //check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Castigator!";
      document.getElementById("dice-1").style.display = "none";
      document.getElementById("dice-2").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("winner");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", init);

function nextPlayer() {
  //next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  //remove and add class
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  // document.getElementById('dice-1').style.display = 'none';
  // document.getElementById('dice-2').style.display = 'none';
}

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}



function popup(element, btn) {
  var modal = document.getElementById(element);

 document.querySelector("#" +element+" .close").onclick = () => {
	modal.style.display = "none";
  };

  document.getElementById(btn).onclick = () => {
    modal.style.display = "block";
  };

}
popup("myModal", "myBtn");
popup("playerName1", "name-0");
popup("playerName2", "name-1");


document.querySelector("#playerName2 button").onclick = (e)=>{
	e.preventDefault();

	let x = document.querySelector("#Player2").value;
	document.querySelector("#name-1").innerHTML = x;
	document.getElementById("playerName2").style.display = "none";
}

document.querySelector("#playerName1 button").onclick = (e)=>{
	e.preventDefault();
	
	let x = document.querySelector("#Player1").value;
	document.querySelector("#name-0").innerHTML = x;
	document.getElementById("playerName1").style.display = "none";
}