// Kata sambutan
  function startGame() {
    const welcome = document.getElementById("welcome-screen");
    welcome.style.display = "none"; // Hilangkan layar sambutan
    showPage('game'); // Pindah ke form permainan
  }

// Fungsi pindah halaman (toggle konten)
function showPage(page) {
    // Sembunyikan semua section
    document.querySelectorAll('main section').forEach(sec => {
      sec.classList.remove('active');
    });

    // Hapus aktif dari semua tombol navbar
    document.querySelectorAll('nav ul li button').forEach(btn => {
      btn.classList.remove('active');
    });

    // Tampilkan section yang dipilih
    document.getElementById(page).classList.add('active');

    // Tandai navbar yang aktif
    document.getElementById('nav-' + page).classList.add('active');
  }

  // Kode game Tic Tac Toe
  const board = document.getElementById("board");
  const status = document.getElementById("status");
  let currentPlayer = "X";
  let cells = Array(9).fill(null);
  let gameOver = false;

  function createBoard() {
    board.innerHTML = "";
    for (let i = 0; i < 9; i++) {
      const button = document.createElement("button");
      button.classList.add("cell");
      button.onclick = () => handleClick(i);
      board.appendChild(button);
    }
  }

  function handleClick(index) {
    if (gameOver || cells[index]) return;

    cells[index] = currentPlayer;
    const cellBtn = board.children[index];
    cellBtn.textContent = currentPlayer;
    cellBtn.disabled = true;

    if (checkWinner()) {
      status.textContent = `Pemain ${currentPlayer} MENANG! 🎉`;
      gameOver = true;
      highlightWinningCells();
    } else if (cells.every(cell => cell)) {
      status.textContent = "Seri! 🤝";
      gameOver = true;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      status.textContent = `Giliran Pemain: ${currentPlayer}`;
    }
  }

  let winningCombo = [];

  function checkWinner() {
    const winCombos = [
      [0,1,2], [3,4,5], [6,7,8], // baris
      [0,3,6], [1,4,7], [2,5,8], // kolom
      [0,4,8], [2,4,6]           // diagonal
    ];

    for (const combo of winCombos) {
      const [a, b, c] = combo;
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        winningCombo = combo;
        return true;
      }
    }
    return false;
  }

  function highlightWinningCells() {
    for (const i of winningCombo) {
      board.children[i].style.backgroundColor = "#27ae60";
      board.children[i].style.color = "#fff";
      board.children[i].style.boxShadow = "0 0 15px 5px #27ae60";
    }
  }

  function resetGame() {
    cells = Array(9).fill(null);
    currentPlayer = "X";
    gameOver = false;
    winningCombo = [];
    status.textContent = "Giliran Pemain: X";
    createBoard();
  }

  // Inisialisasi halaman
  resetGame();
