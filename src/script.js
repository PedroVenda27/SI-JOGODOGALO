const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const scoreX = document.getElementById("score-x");
const scoreO = document.getElementById("score-o");
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;
let gameMode = null; // Modo de jogo: 'single' para 1 jogador, 'multi' para 2 jogadores
let xWins = 0;
let tempoTotalJogadas = 0;
let memoriaTotalUsada = 0;let oWins = 0;

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
  [0, 4, 8], [2, 4, 6]             // diagonais
];

// Inicialização das células
cells.forEach(cell => cell.addEventListener("click", cellClick));

function selectGameMode(mode) {
  gameMode = mode; // Atribui o modo de jogo selecionado ('single' para 1 jogador, 'multi' para 2 jogadores).
  if (gameMode === 'single') {
    statusText.textContent = "Vez do jogador X (Jogar contra o computador)"; // Muda o texto de status para 1 jogador.
  } else if (gameMode === 'multi') {
    statusText.textContent = "Vez do jogador X"; // Muda o texto de status para 2 jogadores.
  }
  resetGame(); // Reiniciar o jogo após selecionar o modo
}

// Função que trata o clique nas células
function cellClick(e) {
  const index = e.target.dataset.index; // Obtém o índice da célula clicada.
  if (board[index] !== "" || !isGameActive) return; // Verifica se a célula já está ocupada ou se o jogo acabou.

  board[index] = currentPlayer; // Marca a célula com o símbolo do jogador atual (X ou O).
  e.target.textContent = currentPlayer; // Exibe o símbolo na célula clicada.

  if (checkWinner()) {// Verifica se houve um vencedor.
    statusText.textContent = `Jogador ${currentPlayer} venceu!`;// Exibe a mensagem de vitória.
    updateScore(currentPlayer);
    isGameActive = false;
  } else if (board.every(cell => cell !== "")) {
    statusText.textContent = "Empate!";// Verifica se o tabuleiro está cheio (empate).
    isGameActive = false;
  } else {
    if (gameMode === 'multi') {
      currentPlayer = currentPlayer === "X" ? "O" : "X"; // Alterna entre os jogadores no modo multi.
      statusText.textContent = `Vez do jogador ${currentPlayer}`;
    } else {
      currentPlayer = "O";  // No modo single, a vez é do computador após o jogador X.
      statusText.textContent = `Vez do jogador ${currentPlayer}`; 
      computerPlay(); // Jogada do computador no modo de 1 jogador
    }
  }
}

function checkWinner() {
  for (let combo of winningCombos) { // Para cada combinação vencedora
    const [a, b, c] = combo; // Desestrutura os índices da combinação.
    if (board[a] && board[a] === board[b] && board[a] === board[c]) { // Verifica se os valores nas posições são iguais.
      highlightWinningCells(combo);  // Destaca as células vencedoras.
      return true; // Retorna verdadeiro se houver um vencedor.
    }
  }
  return false; // Retorna falso se não houver vencedor.
}

function highlightWinningCells(combo) {
  combo.forEach(index => { // Para cada célula vencedora.
    cells[index].classList.add("winner"); // Adiciona a classe "winner" para destacar as células vencedoras.
  });
}

// Função que atualiza o placar com as vitórias dos jogadores
function updateScore(winner) {
  if (winner === "X") {
    // Incrementa a vitória de x e Atualiza o Placard
    xWins++; 
    scoreX.textContent = xWins;
  } else if (winner === "O") {
    // Incrementa a vitória de O e Atualiza o Placard
    oWins++;
    scoreO.textContent = oWins;
  }
}



function resetGame() {
  tempoTotalJogadas = 0;
  memoriaTotalUsada = 0;
  board = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  currentPlayer = "X";
  statusText.textContent = `Vez do jogador ${currentPlayer}`;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winner");
  });
}

// Reseta as vitórias de X.
function resetScore() {
  // Reseta as vitórias de X e O
  xWins = 0;
  oWins = 0;
  // Atualizar os Placres de X e O
  scoreX.textContent = xWins;
  scoreO.textContent = oWins;
  resetGame(); // Reseta o tabuleiro também.
}

// Função Minimax para avaliação da jogada
function minimax(board, depth, isMaximizingPlayer) {
  const scores = {
    "X": -10, // Valor para vitória do jogador X.
    "O": 10, // Valor para vitória do computador (O).
    "tie": 0 // Valor para empate.
  };

  const winner = getWinner(board); // Verifica o vencedor.
  if (winner) {
    return scores[winner]; // Retorna o valor baseado no vencedor.
  }

  if (board.every(cell => cell !== "")) { // Se o tabuleiro está cheio, retorna empate.
    return scores["tie"];
  }

  if (isMaximizingPlayer) {
    let best = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "O"; // Tenta colocar O.
        best = Math.max(best, minimax(board, depth + 1, false)); // Chama a função recursivamente para o próximo movimento.
        board[i] = ""; // Desfaz a jogada.
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "X"; // Tenta colocar X.
        best = Math.min(best, minimax(board, depth + 1, true)); // Chama a função recursivamente para o próximo movimento.
        board[i] = ""; // Desfaz a jogada.
      }
    }
    return best;
  }
}

// Função para determinar a melhor jogada para o computador
function getBestMove() {
  let bestVal = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = "O"; // Tentando colocar "O" (computador) em uma célula
      let moveVal = minimax(board, 0, false); // Avalia a jogada com a função Minimax.
      board[i] = ""; // Desfazendo a jogada

      if (moveVal > bestVal) {
        bestMove = i;
        bestVal = moveVal; // Atualiza a melhor jogada se for mais vantajosa.
      }
    }
  }

  return bestMove; // Retorna a melhor jogada para o computador.
}

// Função para verificar o vencedor
function getWinner(board) {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}


let aiAlgorithm = null;

function selectGameMode(mode) {
  gameMode = mode.includes("single") ? "single" : "multi";
  aiAlgorithm = mode === "single-minimax" ? "minimax" :
                mode === "single-montecarlo" ? "montecarlo" :
                mode === "single-alphabeta" ? "alphabeta" : null;

  if (gameMode === 'single') {
    statusText.textContent = `Vez do jogador X (Contra o computador - ${aiAlgorithm})`;
  } else {
    statusText.textContent = "Vez do jogador X";
  }

  resetGame();
}

function computerPlay() {
  const startTotal = performance.now();

  let bestMove;
  const startAlgo = performance.now();

  if (aiAlgorithm === 'minimax') {
    bestMove = getBestMove();
  } else if (aiAlgorithm === 'montecarlo') {
    bestMove = monteCarloMove();
  } else if (aiAlgorithm === 'alphabeta') {
    bestMove = getBestMoveAlphaBeta();
  }

  const endAlgo = performance.now();

  board[bestMove] = "O";
  cells[bestMove].textContent = "O";

  const tempoAlgoritmo = (endAlgo - startAlgo).toFixed(2);
  const endTotal = performance.now();
  const tempoJogada = endTotal - startTotal;
  tempoTotalJogadas += tempoJogada;

  let memoriaAtual = 0;
  if (performance.memory) {
    memoriaAtual = performance.memory.usedJSHeapSize / 1024 / 1024;
    memoriaTotalUsada += memoriaAtual;
  }

  console.log(`⏱️ Tempo da jogada: ${tempoAlgoritmo} ms`);
  console.log(`🧠 Memória atual: ${memoriaAtual.toFixed(2)} MB`);
  console.log(`📊 Memória total acumulada: ${memoriaTotalUsada.toFixed(2)} MB`);
  console.log(`🕒 Tempo total acumulado: ${tempoTotalJogadas.toFixed(2)} ms`);

  const perfDiv = document.getElementById("performance");
  if (perfDiv) {
    perfDiv.textContent = `⏱️ Tempo Jogada: ${tempoAlgoritmo} ms | ⏱️ Tempo Total: ${tempoTotalJogadas.toFixed(2)} ms | 📊 Memória jogada: ${memoriaAtual.toFixed(2)} MB | 📊 Memória Total: ${memoriaTotalUsada.toFixed(2)} MB`;
  }

  if (checkWinner()) {
    statusText.textContent = `Jogador ${currentPlayer} venceu!`;
    updateScore(currentPlayer);
    isGameActive = false;
  } else if (board.every(cell => cell !== "")) {
    statusText.textContent = "Empate!";
    isGameActive = false;
  } else {
    currentPlayer = "X";
    statusText.textContent = `Vez do jogador ${currentPlayer}`;
  }
}

  const endAlgo = performance.now(); // Fim do tempo do algoritmo

  board[bestMove] = "O";
  cells[bestMove].textContent = "O";

  if (checkWinner()) {
    statusText.textContent = `Jogador ${currentPlayer} venceu!`;
    updateScore(currentPlayer);
    isGameActive = false;
  } else if (board.every(cell => cell !== "")) {
    statusText.textContent = "Empate!";
    isGameActive = false;
  } else {
    currentPlayer = "X";
    statusText.textContent = `Vez do jogador ${currentPlayer}`;
  }

  const endTotal = performance.now(); // Fim do tempo total

  const tempoAlgoritmo = (endAlgo - startAlgo).toFixed(2);
  const tempoTotal = (endTotal - startTotal).toFixed(2);
  let memoria = "n/a";

  if (performance.memory) {
    memoria = (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2) + " MB";
  }

  console.log(`⏱️ Tempo do algoritmo (${aiAlgorithm}): ${tempoAlgoritmo} ms`);
  console.log(`🧠 Memória usada: ${memoria}`);
  console.log(`⏱️ Tempo TOTAL da jogada: ${tempoTotal} ms`);

  const perfDiv = document.getElementById("performance");
  if (perfDiv) {
    perfDiv.textContent = `⏱️ Algoritmo: ${tempoAlgoritmo} ms | 🕒 Total: ${tempoTotal} ms | 🧠 Memória: ${memoria}`;
  }


  board[bestMove] = "O";
  cells[bestMove].textContent = "O";

  if (checkWinner()) {
    statusText.textContent = `Jogador ${currentPlayer} venceu!`;
    updateScore(currentPlayer);
    isGameActive = false;
  } else if (board.every(cell => cell !== "")) {
    statusText.textContent = "Empate!";
    isGameActive = false;
  } else {
    currentPlayer = "X";
    statusText.textContent = `Vez do jogador ${currentPlayer}`;
  }


function monteCarloMove(simulations = 100) {
  const emptyIndices = board.map((val, idx) => val === "" ? idx : null).filter(idx => idx !== null);
  let bestMove = -1;
  let bestWinRate = -1;

  for (let move of emptyIndices) {
    let wins = 0;

    for (let i = 0; i < simulations; i++) {
      let tempBoard = [...board];
      tempBoard[move] = "O";
      let result = simulateRandomGame(tempBoard, "X");

      if (result === "O") wins++;
    }

    const winRate = wins / simulations;

    if (winRate > bestWinRate) {
      bestWinRate = winRate;
      bestMove = move;
    }
  }

  return bestMove;
}

function simulateRandomGame(tempBoard, player) {
  let currentBoard = [...tempBoard];
  let currentPlayer = player;

  while (true) {
    const empty = currentBoard.map((v, i) => v === "" ? i : null).filter(i => i !== null);
    if (empty.length === 0) return "tie";

    const randIndex = empty[Math.floor(Math.random() * empty.length)];
    currentBoard[randIndex] = currentPlayer;

    const winner = getWinner(currentBoard);
    if (winner) return winner;

    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}


function getBestMoveAlphaBeta() {
  let bestVal = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = "O";
      let moveVal = alphaBeta(board, 0, -Infinity, Infinity, false);
      board[i] = "";

      if (moveVal > bestVal) {
        bestMove = i;
        bestVal = moveVal;
      }
    }
  }

  return bestMove;
}


function alphaBeta(board, depth, alpha, beta, isMaximizingPlayer) {
  const scores = {
    "X": -10,
    "O": 10,
    "tie": 0
  };

  const winner = getWinner(board);
  if (winner) return scores[winner];

  if (board.every(cell => cell !== "")) return scores["tie"];

  if (isMaximizingPlayer) {
    let maxEval = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "O";
        let eval = alphaBeta(board, depth + 1, alpha, beta, false);
        board[i] = "";
        maxEval = Math.max(maxEval, eval);
        alpha = Math.max(alpha, eval);
        if (beta <= alpha) break;
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "X";
        let eval = alphaBeta(board, depth + 1, alpha, beta, true);
        board[i] = "";
        minEval = Math.min(minEval, eval);
        beta = Math.min(beta, eval);
        if (beta <= alpha) break;
      }
    }
    return minEval;
  }
}