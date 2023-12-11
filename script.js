// Get all cells, status element, player score displays, and create a span for status messages
const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const player1ScoreDisplay = document.getElementById('player1');
const player2ScoreDisplay = document.getElementById('player2');
const statusMessage = document.createElement('span'); 
status.appendChild(statusMessage);

// Initialize game variables
let currentPlayer = 'X';
let gameActive = true;
let moves = 0;
let player1Score = 0;
let player2Score = 0;

// Winning combinations in the Tic Tac Toe game
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Function to check for a winner or draw
function checkWinner() {
  // Check all winning combinations
  for (let combo of winCombos) {
    const [a, b, c] = combo;
    if (
      cells[a].innerText &&
      cells[a].innerText === cells[b].innerText &&
      cells[a].innerText === cells[c].innerText
    ) {
      // If there's a winner, update status and scores
      gameActive = false;
      cells[a].classList.add('win');
      cells[b].classList.add('win');
      cells[c].classList.add('win');
      statusMessage.innerText = `Player ${currentPlayer === 'X' ? '1' : '2'} wins!`;
      statusMessage.style.fontSize = '36px'; // Make the text bigger for winner
      updateScore();
      return;
    }
  }
  // If all cells are filled and there's no winner, it's a draw
  if (moves === 9) {
    gameActive = false;
    statusMessage.innerText = "It's a draw!";
    statusMessage.style.fontSize = '36px'; // Make the text bigger for draw
    return;
  }
  // Otherwise, update status indicating the current player's turn
  statusMessage.innerText = `Player ${currentPlayer === 'X' ? '1' : '2'}'s turn`;
  statusMessage.style.fontSize = '24px'; // Normal font size for turn indication
}

// Function to handle cell clicks
function handleCellClick(cell) {
  const index = Array.from(cells).indexOf(cell);

  if (!gameActive || cell.innerText !== '') return;

  // Set current player's symbol in the clicked cell
  cell.innerText = currentPlayer;
  moves++;
  checkWinner();
  // Switch to the next player for the next turn
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Function to reset the game
function resetGame() {
   // Clear cells, remove 'win' class, reset status, scores, and game variables
  cells.forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('win');
  });
  statusMessage.innerText = `Player ${currentPlayer}'s turn`;
  statusMessage.style.fontSize = '24px'; // Reset font size
  gameActive = true;
  moves = 0;
  currentPlayer = 'X';
}

// Function to update scores based on the winner
function updateScore() {
  if (currentPlayer === 'X') {
    player1Score++;
    player1ScoreDisplay.innerText = `Player 1: ${player1Score}`;
  } else {
    player2Score++;
    player2ScoreDisplay.innerText = `Player 2: ${player2Score}`;
  }
}

// Event listeners for cell clicks
cells.forEach(cell => {
  cell.addEventListener('click', () => handleCellClick(cell));
});