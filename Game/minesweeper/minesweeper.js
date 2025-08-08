function initializeMinesweeperPage() {
    console.log("Minesweeper.js: Инициализация Minesweeper-страницы...");
const game = document.getElementById('game');
const timerElement = document.getElementById('timer');
const minesLeftElement = document.getElementById('mines-left');
const difficultySelect = document.getElementById('difficulty');
const restartButton = document.getElementById('restart');

let rows, cols, mineCount;
let board = [];
let mines = new Set();
let flags = new Set();
let opened = new Set();
let timer = 0;
let timerInterval;
let firstClick = true;

const difficulties = {
	easy: { rows: 9, cols: 9, mines: 10 },
	medium: { rows: 16, cols: 16, mines: 40 },
	hard: { rows: 16, cols: 30, mines: 99 }
};

function initGame() {
	document.getElementById('message').className = '';
	document.getElementById('message').textContent = '';

	clearInterval(timerInterval);
	timer = 0;
	timerElement.textContent = '0';
	firstClick = true;

	const level = difficulties[difficultySelect.value];
	rows = level.rows;
	cols = level.cols;
	mineCount = level.mines;

	game.style.gridTemplateColumns = `repeat(${cols}, 30px)`;
	game.innerHTML = '';
	board = [];
	mines = new Set();
	flags = new Set();
	opened = new Set();
	minesLeftElement.textContent = mineCount;

	for (let i = 0; i < rows * cols; i++) {
		const cell = document.createElement('div');
		cell.classList.add('cell');
		cell.dataset.index = i;
		cell.addEventListener('click', () => handleLeftClick(i));
		cell.addEventListener('contextmenu', (e) => {
			e.preventDefault();
			handleRightClick(i);
		});
		game.appendChild(cell);
		board.push(cell);
	}
}

function startTimer() {
	timerInterval = setInterval(() => {
		timer++;
		timerElement.textContent = timer;
	}, 1000);
}

function placeMines(excludeIndex) {
	while (mines.size < mineCount) {
		let index = Math.floor(Math.random() * rows * cols);
		if (index !== excludeIndex) mines.add(index);
	}
}

function handleLeftClick(index) {
	if (firstClick) {
		placeMines(index);
		startTimer();
		firstClick = false;
	}

	const cell = board[index];
	if (cell.classList.contains('open') || cell.classList.contains('flag')) return;

	if (mines.has(index)) {
		cell.classList.add('mine');
		gameOver(false);
	} else {
		reveal(index);
		checkWin();
	}
}

function handleRightClick(index) {
	const cell = board[index];
	if (cell.classList.contains('open')) return;

	if (flags.has(index)) {
		cell.classList.remove('flag');
		flags.delete(index);
	} else {
		if (flags.size < mineCount) {
			cell.classList.add('flag');
			flags.add(index);
		}
	}
	minesLeftElement.textContent = mineCount - flags.size;
}

function reveal(index) {
	const queue = [index];

	while (queue.length > 0) {
		const i = queue.pop();
		const cell = board[i];
		if (opened.has(i)) continue;

		cell.classList.add('open');
		cell.classList.remove('flag');
		opened.add(i);

		const neighbors = getNeighbors(i);
		const count = neighbors.filter(n => mines.has(n)).length;

		if (count > 0) {
			cell.textContent = count;
		} else {
			for (const n of neighbors) {
				if (!opened.has(n)) queue.push(n);
			}
		}
	}
}

function getNeighbors(index) {
	const x = index % cols;
	const y = Math.floor(index / cols);
	const neighbors = [];

	for (let dx = -1; dx <= 1; dx++) {
		for (let dy = -1; dy <= 1; dy++) {
			if (dx === 0 && dy === 0) continue;
			const nx = x + dx;
			const ny = y + dy;
			if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
				neighbors.push(ny * cols + nx);
			}
		}
	}
	return neighbors;
}

function gameOver(won) {
	clearInterval(timerInterval);
	board.forEach((cell, i) => {
		cell.classList.add('disabled');
		if (mines.has(i)) {
			cell.classList.add('mine');
		}
	});

	const msg = document.getElementById('message');
	msg.textContent = won ? '🎉 Победа!' : '💥 Вы проиграли';
	msg.className = 'show ' + (won ? 'win' : 'lose');
	saveRecord(won);
}

function checkWin() {
	if (opened.size === rows * cols - mineCount) {
		gameOver(true);
	}
}

restartButton.addEventListener('click', initGame);
difficultySelect.addEventListener('change', initGame);

initGame();


}