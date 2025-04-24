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

// ------------------------ CLIQUE DAS CÉLULAS----------------------------- 

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

// -------------------- FUNÇÃO PARA VER SE HA VENCEDOR -----------------------------

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

// --------------- CELULAS VENCEDORAS (PARA DEPOIS DESTACAR A VERDE) ------------------

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


// ------------------- RESETAR O JOGO -------------------
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

// ------------------- RESETAR AS VITORIAS  -------------------

function resetScore() {
  // Reseta as vitórias de X e O
  xWins = 0;
  oWins = 0;
  // Atualizar os Placres de X e O
  scoreX.textContent = xWins;
  scoreO.textContent = oWins;
  resetGame(); // Reseta o tabuleiro também.
}

// ---------------- FUNÇÃO PARA VERIFICAR O VENCEDOR -------------------

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

// SELECIONAR O MODO DE JOGO E ALGORITMO A UTILIZAR
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

// ------------------- FUNÇÃO PARA A JOGADA DO COMPUTADOR ------------------

function computerPlay() {
  const startTotal = performance.now(); // Marca o tempo inicial total da jogada (inclui cálculo + execução).

  let bestMove; // armazena a melhor jogada do computador.

 
  const startAlgo = performance.now(); // Marca o tempo inicial antes de começar o cálculo do algoritmo.

  // Escolhe o algoritmo conforme o selecionado.
  if (aiAlgorithm === 'minimax') {
    bestMove = getBestMove(); // Chama algoritmo Minimax.
  } else if (aiAlgorithm === 'montecarlo') {
    bestMove = monteCarloMove(); // Chama simulação Monte Carlo.
  } else if (aiAlgorithm === 'alphabeta') {
    bestMove = getBestMoveAlphaBeta(); // Chama poda Alfa-Beta.
  }

  const endAlgo = performance.now();  // Marca tempo após o cálculo do algoritmo 

  // Executa a jogada 
  board[bestMove] = "O"; // Marca a jogada internamente.
  cells[bestMove].textContent = "O"; // Atualiza visualmente 

  // Calcula o tempo gasto apenas pelo algoritmo.
  const tempoAlgoritmo = (endAlgo - startAlgo).toFixed(2);

  // Marcar o tempo total até aqui (desde início da jogada).
  const endTotal = performance.now();
  const tempoJogada = endTotal - startTotal;

  // Somar o tempo total de todas as jogadas 
  tempoTotalJogadas += tempoJogada;

  // Calcular o uso de memória com base no navegador
  let memoriaAtual = 0;
  if (performance.memory) {
    memoriaAtual = performance.memory.usedJSHeapSize / 1024 / 1024;
    memoriaTotalUsada += memoriaAtual;
  }

  // Regista na consola o Desempenho
  console.log(`⏱️ Tempo da jogada: ${tempoAlgoritmo} ms`);
  console.log(`🧠 Memória atual: ${memoriaAtual.toFixed(2)} MB`);
  console.log(`📊 Memória total acumulada: ${memoriaTotalUsada.toFixed(2)} MB`);
  console.log(`🕒 Tempo total acumulado: ${tempoTotalJogadas.toFixed(2)} ms`);

  // Mostra o Desempenho Visualmente.
  const perfDiv = document.getElementById("performance");
  if (perfDiv) {
    perfDiv.textContent = `⏱️ Tempo Jogada: ${tempoAlgoritmo} ms | ⏱️ Tempo Total: ${tempoTotalJogadas.toFixed(2)} ms | 📊 Memória jogada: ${memoriaAtual.toFixed(2)} MB | 📊 Memória Total: ${memoriaTotalUsada.toFixed(2)} MB`;
  }

  // Verifica se Existe Vitória
  if (checkWinner()) {
    statusText.textContent = `Jogador ${currentPlayer} venceu!`;
    updateScore(currentPlayer); // Atualiza o placar.
    isGameActive = false; // Termina o jogo.
  }
  //  Verifica se tabuleiro cheio o que significa um empate.
  else if (board.every(cell => cell !== "")) {
    statusText.textContent = "Empate!";
    isGameActive = false;
  }
  // Caso nenhum se verifique, muda a vez do jogador.
  else {
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




// ------------------- FUNÇÃO DO ALGORITMO MIN MAX  -----------
// Função Minimax para determinar a melhor jogada

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

  if (board.every(cell => cell !== "")) { // Verifica se o tabuleiro está cheio (empate).
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

// ------------------- FUNÇÃO MONTE CARLO -------------------
// Função para simular jogadas aleatórias e determinar a melhor jogada

function monteCarloMove(simulations = 100) {
  // Obtém os índices das casas vazias.
  const emptyIndices = board.map((val, idx) => val === "" ? idx : null).filter(idx => idx !== null);

  let bestMove = -1;      // Inicializa o melhor movimento.
  let bestWinRate = -1;   // Inicializa a melhor taxa de vitória.

  // Testa cada jogada possível.
  for (let move of emptyIndices) {
    let wins = 0; // Conta quantas vezes o computador vence nessa jogada.

    // Realiza várias simulações para cada jogada.
    for (let i = 0; i < simulations; i++) {
      let tempBoard = [...board]; // Copia o estado do tabuleiro.
      tempBoard[move] = "O"; // Simula a jogada do computador.
      let result = simulateRandomGame(tempBoard, "X"); // Simula o resto da partida aleatoriamente com jogador X.

      if (result === "O") wins++; // Conta vitórias do computador.
    }

    const winRate = wins / simulations; // Calcula a taxa de vitória dessa jogada.

    // Se a taxa de vitória for melhor que a anterior, atualiza o melhor movimento.
    if (winRate > bestWinRate) {
      bestWinRate = winRate;
      bestMove = move;
    }
  }

  return bestMove; // Retorna a jogada com maior taxa de vitória estimada.
}


// Função auxiliar para simular um jogo aleatório utilizada para o algoritmo Monte Carlo

function simulateRandomGame(tempBoard, player) {
  let currentBoard = [...tempBoard]; // Clona o tabuleiro.
  let currentPlayer = player; // Começa com o jogador indicado (X ou O).

  while (true) {
    // Verifica se o tabuleiro está cheio (fim da simulação).
    const empty = currentBoard.map((v, i) => v === "" ? i : null).filter(i => i !== null);
    if (empty.length === 0) return "tie";

    // Escolhe aleatoriamente uma célula vazia para jogar.
    const randIndex = empty[Math.floor(Math.random() * empty.length)];
    currentBoard[randIndex] = currentPlayer;

    // Verifica se há vencedor após a jogada.
    const winner = getWinner(currentBoard);
    if (winner) return winner;

    // Alterna o jogador (X ↔ O).
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}





// ------------------- FUNÇÃO ALPHA BETA -------------------
// Função para determinar a melhor jogada para o computador usando o algoritmo Alpha-Beta

function getBestMoveAlphaBeta() {
  let bestVal = -Infinity; // Inicializa o melhor valor como o menor possível.
  let bestMove = -1; // Inicializa a melhor jogada como inválida.

  // Itera por todas as posições do tabuleiro.
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") { // Se a célula está vazia
      board[i] = "O"; // Simula a jogada do computador.
      let moveVal = alphaBeta(board, 0, -Infinity, Infinity, false); // Avalia a jogada com poda alfa-beta.
      board[i] = ""; // Desfazer a jogada.

      if (moveVal > bestVal) { // Se a jogada for melhor, atualiza.
        bestMove = i;
        bestVal = moveVal;
      }
    }
  }

  return bestMove; // Retornar a jogada mais vantajosa encontrada.
}

// Função auxiliar para o algoritmo Alpha-Beta Poda

function alphaBeta(board, depth, alpha, beta, isMaximizingPlayer) {
  const scores = {
    "X": -10,   // Valor se o jogador X vencer.
    "O": 10,    // Valor se o computador vencer.
    "tie": 0    // Valor para empate.
  };

  const winner = getWinner(board); // Verificar se já há vencedor.
  if (winner) return scores[winner]; // Retornar o valor do resultado final.

  if (board.every(cell => cell !== "")) return scores["tie"]; // Retornar empate se o tabuleiro estiver cheio.

  if (isMaximizingPlayer) { // Turno do computador (O).
    let maxEval = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "O"; // Tenta jogar "O".
        let eval = alphaBeta(board, depth + 1, alpha, beta, false); // Chama recursivamente como minimizador.
        board[i] = ""; // Desfaz a jogada.
        maxEval = Math.max(maxEval, eval); // Atualiza o melhor valor.
        alpha = Math.max(alpha, eval); // Atualiza o valor de alpha.
        if (beta <= alpha) break; // Faz poda se beta já for menor que alpha.
      }
    }
    return maxEval;
  } else { // Turno do jogador Utilizador (X).
    let minEval = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "X"; // Tenta jogar "X".
        let eval = alphaBeta(board, depth + 1, alpha, beta, true); // Chama recursivamente como maximizador.
        board[i] = ""; // Desfaz a jogada.
        minEval = Math.min(minEval, eval); // Atualiza o menor valor.
        beta = Math.min(beta, eval); // Atualizar o valor de beta.
        if (beta <= alpha) break; // Faz poda se beta já for menor que alpha.
      }
    }
    return minEval;
  }
}
