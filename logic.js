const cells = document.querySelectorAll(".cell");
let text = document.querySelector("#text");
const restart = document.querySelector("#restart");

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let isGameOn = false;
const grid = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";

initializeGame();

function initializeGame() {
  cells.forEach((cell) => {
    cell.addEventListener("click", cellClicked);
  });
  restart.addEventListener("click", restartGame);
  isGameOn = true;
  text.innerText = `Player ${currentPlayer}'s turn`;
}
function cellClicked() {
  const cellNo = this.getAttribute("id");
  if (!isGameOn || grid[cellNo] != "") {
    return;
  }
  updateCell(this, cellNo);
  checkWinner();
}
function updateCell(cell, cellNo) {
  cell.innerText = currentPlayer;
  grid[cellNo] = currentPlayer;
}
function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  text.innerText = `Player ${currentPlayer}'s turn`;
}
function checkWinner() {
  let win = false;
  for (let cell of winningCombinations) {
    if (!grid[cell[0]] || !grid[cell[1]] || !grid[cell[2]]) {
      continue;
    }
    if (grid[cell[0]] === grid[cell[1]] && grid[cell[1]] === grid[cell[2]]) {
      win = true;
      break;
    }
  }

  if (win) {
    text.innerText = `Player ${currentPlayer} wins!!!`;
    isGameOn = false;
  } else if (!grid.includes("")) {
    text.innerText = "It's a draw!";
  } else {
    changePlayer();
  }
}
function restartGame() {
  isGameOn = true;
  currentPlayer = "X";
  text.innerText = `Player ${currentPlayer}'s turn`;
  for (let i = 0; i < grid.length; i++) {
    grid[i] = "";
  }
  cells.forEach((cell) => (cell.innerText = ""));
}
