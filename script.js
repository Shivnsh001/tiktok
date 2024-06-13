const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('reset-button');
const victoryElement = document.getElementById('victory');
const victoryImage = document.getElementById('victory-image');
const victoryVideo = document.getElementById('victory-video');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function createBoard() {
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.dataset.index = index;
        cellElement.innerHTML = cell;
        cellElement.addEventListener('click', handleCellClick);
        boardElement.appendChild(cellElement);
    });
    victoryElement.style.display = 'none';
    victoryVideo.pause();
    victoryVideo.currentTime = 0;
}

function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (board[index] !== '' || !gameActive) return;

    board[index] = currentPlayer;
    event.target.classList.add(currentPlayer.toLowerCase());
    createBoard();
    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        messageElement.innerHTML = `${currentPlayer} wins! 🎉`;
        gameActive = false;
        displayVictory();
        return;
    }

    if (!board.includes('')) {
        messageElement.innerHTML = `It's a draw! 😐`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function displayVictory() {
    victoryElement.style.display = 'block';
    victoryVideo.play();
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    messageElement.innerHTML = '';
    createBoard();
}

resetButton.addEventListener('click', resetGame);

createBoard();
