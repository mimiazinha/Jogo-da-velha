const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const resetButton = document.querySelector('.reset');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let is = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const handleCellClick = (event) => {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !is) {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    checkResult();
};

const checkResult = () => {
    for (let condicao of winningConditions) {
        const [a, b, c] = condicao;
        if (board[a] && board[a] == board[b] && board[a] == board[c]) {
            message.textContent = `${currentPlayer} venceu a rodada`;
            is = false;
            return;
        }
    }

    if (!board.includes('')) {
        message.textContent = 'Empate!';
        is = false;
        return;
    }

    currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
};

const resetGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    is = true;
    currentPlayer = 'X';
    message.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
    });
};

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);