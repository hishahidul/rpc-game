let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

// Initial score of all
/*let score = {
  wins: 0,
  losses: 0,
  ties: 0
}*/

// Computer and player move ICON
const emojis = {
  rock: "✊",
  paper: "🤚",
  scissors: "✌",
};

// Create computer move
function computerMovePick() {
  const randomNum = Math.random();
  let computerMove = "";
  if (randomNum < 1 / 3) {
    computerMove = "rock";
  } else if (randomNum < 2 / 3) {
    computerMove = "paper";
  } else {
    computerMove = "scissors";
  }
  return computerMove;
}

updateScoreOnly();

// Get player move and compare player move with computer move
function playGame(playerMove) {
  document.querySelector(".game-result").style.display = "block";
  const computerMove = computerMovePick();
  let result = "";
  if (playerMove === computerMove) {
    result = "Tie";
    score.ties++;
  } else if (
    (playerMove === "rock" && computerMove === "scissors") ||
    (playerMove === "paper" && computerMove === "rock") ||
    (playerMove === "scissors" && computerMove === "paper")
  ) {
    result = "You win";
    score.wins++;
  } else {
    result = "You loss";
    score.losses++;
  }

  // Save score in local storage
  localStorage.setItem("score", JSON.stringify(score));

  // Pass data from this function to another
  renderGame(playerMove, computerMove, result);
}

// Update result and color
function renderGame(playerMove, computerMove, result) {
  const gameResult = document.querySelector(".game-result");
  gameResult.innerHTML = result;

  if (result === "You win") {
    gameResult.style.color = "#0dff00";
  } else if (result === "You loss") {
    gameResult.style.color = "#ff5757";
  } else {
    gameResult.style.color = "#6200ff";
  }

  // Update player and computer move icon
  document.querySelector(".player-move").innerHTML = emojis[playerMove];
  document.querySelector(".computer-move").innerHTML = emojis[computerMove];

  updateScoreOnly();
}
// Update the score numbers
function updateScoreOnly() {
  document.querySelector(".player-score b").innerHTML = score.wins
    .toString()
    .padStart(2, "0");
  // toString()-->It converts number to strings. padStart()-->If score 5, it makes score 05.
  document.querySelector(".tie-score b").innerHTML = score.ties
    .toString()
    .padStart(2, "0");
  document.querySelector(".computer-score b").innerHTML = score.losses
    .toString()
    .padStart(2, "0");
}

// Reset Score Function
document.querySelector(".reset-button").onclick = () => {
  score = { wins: 0, losses: 0, ties: 0 };
  renderGame("", "", ""); // Clear icons
  updateScoreOnly();
  document.querySelector(".game-result").innerHTML = "";
  document.querySelector(".player-move").innerHTML = "";
  document.querySelector(".computer-move").innerHTML = "";
  document.querySelector(".game-result").style.display = "none";
};
