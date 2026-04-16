
const ball = document.getElementById("ball");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const finalScore = document.getElementById("finalScore");
const gameOverBox = document.getElementById("game-over");
const startBtn = document.getElementById("startBtn");
const highScoreDisplay = document.getElementById("highScore");

let score = 0;
let time = 30;
let gameInterval;
let moveInterval;

// load high score
let highScore = localStorage.getItem("highScore") || 0;
highScoreDisplay.textContent = highScore;

function moveBall(){
  const x = Math.random() * 300;
  const y = Math.random() * 300;
  ball.style.left = x + "px";
  ball.style.top = y + "px";
}

ball.addEventListener("click", () => {
  ball.style.transform = "scale(1.2)";
  setTimeout(()=> ball.style.transform = "scale(1)",100);
  score++;
  scoreDisplay.textContent = score;
  moveBall();
});

function startGame(){
  score = 0;
  time = 30;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = time;
  gameOverBox.classList.add("hidden");
  ball.style.display = "block";

  moveBall();

  moveInterval = setInterval(moveBall, 1200);

  gameInterval = setInterval(() => {
    time--;
    timeDisplay.textContent = time;

    if(time === 0){
      endGame();
    }
  }, 1000);
}

function endGame(){
  clearInterval(gameInterval);
  clearInterval(moveInterval);
  ball.style.display = "none";
  finalScore.textContent = score;
  gameOverBox.classList.remove("hidden");

  if(score > highScore){
    highScore = score;
    localStorage.setItem("highScore", highScore);
    highScoreDisplay.textContent = highScore;
  }
}

startBtn.addEventListener("click", startGame);
