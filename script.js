let gridSize = 4;
let score = 0, best = 0, moves = 0, timer = 0, gameInterval;
let board = [];
let mode = "classic";
let leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
let achievements = JSON.parse(localStorage.getItem("achievements") || "[]");

function startGame(m) {
  mode = m;
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("leaderboard").classList.add("hidden");
  document.getElementById("achievements").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  document.getElementById("modeLabel").innerText = "Mode: " + m;
  if (m === "hardcore") gridSize = 5; else gridSize = 4;
  if (m === "chrono") startTimer();
  initBoard();
}

function initBoard() {
  score = 0; moves = 0;
  board = Array(gridSize).fill(0).map(()=>Array(gridSize).fill(0));
  addTile(); addTile();
  renderBoard();
  updateStats();
}

function addTile() {
  let empty = [];
  for (let i=0;i<gridSize;i++){
    for (let j=0;j<gridSize;j++){
      if(board[i][j]===0) empty.push([i,j]);
    }
  }
  if(empty.length===0) return;
  let [x,y] = empty[Math.floor(Math.random()*empty.length)];
  board[x][y] = Math.random() < 0.9 ? 2 : 4;
}

function renderBoard() {
  let grid = document.getElementById("grid");
  grid.innerHTML = "";
  grid.style.gridTemplateColumns = `repeat(${gridSize}, 80px)`;
  board.forEach(row=>{
    row.forEach(val=>{
      let div = document.createElement("div");
      div.className="tile";
      if(val>0) div.textContent = val;
      grid.appendChild(div);
    });
  });
}

function updateStats(){
  document.getElementById("score").innerText = score;
  document.getElementById("best").innerText = best;
  document.getElementById("moves").innerText = moves;
}

function showLeaderboard(){
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("leaderboard").classList.remove("hidden");
  let list = document.getElementById("leaderboardList");
  list.innerHTML = "";
  leaderboard.forEach(l=>{
    let li = document.createElement("li");
    li.innerText = l.name + " - " + l.score;
    list.appendChild(li);
  });
}

function showAchievements(){
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("achievements").classList.remove("hidden");
  let list = document.getElementById("achievementsList");
  list.innerHTML = "";
  achievements.forEach(a=>{
    let li = document.createElement("li");
    li.innerText = a;
    list.appendChild(li);
  });
}

function backToMenu(){
  document.querySelectorAll(".game,.leaderboard,.achievements").forEach(el=>el.classList.add("hidden"));
  document.getElementById("menu").classList.remove("hidden");
}

function startTimer(){
  timer = 60;
  gameInterval = setInterval(()=>{
    timer--;
    document.getElementById("timer").innerText = "⏱️ " + timer;
    if(timer<=0){ clearInterval(gameInterval); endGame(); }
  },1000);
}

function endGame(){
  alert("Partie terminée! Score: " + score);
  leaderboard.push({name:"Player",score});
  leaderboard.sort((a,b)=>b.score-a.score);
  leaderboard = leaderboard.slice(0,5);
  localStorage.setItem("leaderboard",JSON.stringify(leaderboard));
  backToMenu();
}

function usePowerUp(type){
  alert("Power-up " + type + " utilisé (placeholder)");
}

function toggleTheme(){
  document.body.classList.toggle("altTheme");
}
