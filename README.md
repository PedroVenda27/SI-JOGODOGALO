'''

# 1. INTRODUÇÃO

Nos últimos anos, a Inteligência Artificial (IA) tem se tornado cada vez mais presente em diversas áreas, desde assistentes virtuais até sistemas complexos de automação e otimização. Os Sistemas Inteligentes são projetados para tomar decisões e resolver problemas de forma autônoma, muitas vezes simulando o pensamento humano.

Neste relatório, vamos explorar os conceitos fundamentais de IA e Sistemas Inteligentes, utilizando como exemplo o Jogo do Galo/Tic Tac Toe este é tido com um problema clássico da área de pesquisa em IA, onde um agente deve encontrar a melhor jogada possivel de modo a vencer o jogo.

Ao longo do relatório, discutiremos temas como Conceitos Base da Area Algoritmos de Busca e estratégias de solução podem ser aplicados ao Jogo do Galo, ilustrando o funcionamento de técnicas fundamentais da IA. Além disso, analisaremos os desafios e a eficiência de diferentes abordagens para encontrar a solução ideal.


## 1.1 Conceitos Base

### 1.1.1 O que é um Agente e como Funciona?

Chamamos como agente uma entidade capaz de perceber o ambiente em que se encontra dentro de um determinado problema informático e agir com base nas informações recebidas.

O seu funcionamento é orientado por uma Agent Function, uma função responsável por mapear as percepções do agente em ações específicas, definindo como ele deve reagir a diferentes situações do ambiente.

Essa função pode ser implementada como um programa de computador, permitindo que o agente processe dados automaticamente e tome decisões de forma autônoma para alcançar um determinado objetivo.


### 1.1.2 Processo de Resolução de um Problema por um Agente

Para resolver um problema, um agente inteligente segue um processo estruturado em quatro fases principais:

•	Objetivo: O primeiro passo é definir claramente o objetivo que se pretende alcançar. Para isso, é necessário estabelecer quais regras e açoes podem ser tomadas para atingir esse objetivo.

•	Formulação do Problema:  De seguida o agente cria uma descrição do problema, identificando os estados do Problema e defenindo as ações que podem ser realizadas de modo a definir os caminhos viáveis para atingir a solução.

•	Pesquisa: Após isso o agente simula difrentes sequência de ações utlizando metodos de pesquiza em um modelo interno até encontrar um caminho que leve ao objetivo (Solução)
 Se o agente não encontrar nenhuma solução possível, ele conclui que o problema não tem resposta viável.
 
•	Execução: Por fim ao encontrar uma solução, o agente executa as ações planejadas, aplicando-as ao problema para atingir o objetivo.


### 1.1.3 Estrutura de um Problema de Pesquisa

Os problemas de pesquisa podem ser estruturados com base nos seguintes elementos fundamentais:

•	Espaço de estados: Conjunto de todos os estados possíveis do problema

•	Estado inicial: O Ponto de partida do Problema.

•	Estado final: O Estado representante da Solução do problema. (Neste caso Jogo do Galo) existem varios estados Possiveis.

•	Função de ação: Defenição das ações disponíveis para cada estado. 

•	Modelo de transição: Define o efeito de cada ação, ou seja, como a aplicação de uma ação em um estado altera a situação atual. 

•	Função de custo: Custo de realizar uma transição de um estado para outro. Exemplo Tempo Gasto ou Memoria Utilizada

Estes Elementos e Conceitos formam a base para a implementação de Algoritmos de Pesquisa, utilizados por um agente para  encontrar a melhor solução para um problema.

NOTA: Esta Parte do Relatório é Bastante Semelhante a do Relatorio Anterior uma vez que se tratam de Conceitos Basicos e Introdutórios da Disciplina



# 2 PROJETO DE ESTUDO / PROBLEMA

## 2.1 Jogo do Galo Tic-Tac-Toe

### 2.1.1 O que é e em Consiste

O Jogo do Galo, também conhecido como Tic Tac Toe, é um jogo clássico que consiste num tabuleiro 3x3, onde dois jogadores alternam jogadas para preencher as casas com os símbolos "X" e "O". O objetivo é formar uma linha com três símbolos iguais na horizontal, vertical ou diagonal antes do adversário.

Este jogo é amplamente reconhecido como um problema introdutório na área de Sistemas Inteligentes e Inteligência Artificial (IA), sendo frequentemente utilizado para demonstrar o funcionamento de agentes capazes de tomar decisões estratégicas. Para isso, são exploradas técnicas de pesquisa e algoritmos de decisão, permitindo que o agente escolha a melhor jogada possível em cada turno. Neste contexto, serão implementados e comparados os Algoritmos Minimax, Alfa-Beta e Monte Carlo, avaliando o seu desempenho e capacidade de tomada de decisão em diferentes cenários do jogo.




## 2.2 Jogos Deterministicos

### 2.2.1 O que é um Jogo Deterministico

É chamado um jogo determinístico um jogo em que não existe qualquer elemento de sorte ou aleatoriedade assim o resultado de cada jogada depende exclusivamente da ações tomadas pelos jogadores e do estado atual do jogo. 

Geralmente neste tipo de Jogos as regras são fixas e completamente conhecidas por ambos os participantes, e não há qualquer fator externo que possa alterar o curso da partida. Assim, se o jogo for repetido nas mesmas condições e com as mesmas decisões, o desfecho será sempre o mesmo.

Estes jogos são, geralmente, de informação perfeita, o que significa que todos os jogadores têm total conhecimento do estado atual do jogo em todos os momentos. Isso permite uma análise lógica e estratégica rigorosa, uma vez que é possível prever todas as jogadas possíveis e as suas consequências futuras. 

Por esta razão, os jogos determinísticos são um bom exemplo de Estudo para Areas como Inteligência Artificial, pois permitem testar algoritmose metodos de pesquisa.






## 2.3 Algoritmo MinMax

O Algoritmo Minimax é uma técnica de pesquisa amplamente utilizada em jogos de soma zero, como o Tic Tac Toe (Jogo do Galo). Este é particularmente relevante na área da Inteligência Artificial mais Especificamente na Area dos Jogos onde dois jogadores com objetivos opostos tomam decisões alternadas ao longo da partida.

O algoritmo tem como objetivo encontrar a melhor jogada possível para um dos jogadores (designado por MAX), assumindo que o adversário (designado por MIN) também jogará de forma ótima. Dessa forma, o agente analisa todas as possíveis sequências de jogadas, simulando as decisões de ambos os jogadores, e escolhe o movimento que maximiza as suas hipóteses de vitória, mesmo perante o pior cenário.



### 2.3.1 Funcionamento do Algoritmo


O Algoritmo Minimax tem por base do seu funcionamento a construção de uma árvore de decisão, onde cada nó representa um possível estado do jogo e cada ramo corresponde a uma jogada válida. A árvore é explorada até aos estados terminais (vitória, derrota ou empate), sendo esses estados avaliados por uma função de utilidade que atribui um valor numérico a cada resultado.

A alternância entre os jogadores é representada nos níveis da árvore onde:

•	Os nós MAX representam os turnos do agente no caso a maquina, que procura maximizar o valor da jogada.

•	Os nós MIN representam os turnos do adversário no caso o utilizador, que tenta minimizar esse mesmo valor.

O algoritmo percorre a árvore de forma recursiva, atribuindo valores aos nós com base nos resultados dos seus filhos:

•	O jogador MAX escolhe o maior valor entre os nós seguintes.

•	O jogador MIN escolhe o menor valor entre os nós.

No final, a jogada selecionada será aquela que conduz ao melhor resultado possível, assumindo que o adversário também realiza a melhor jogada para o seu jogo


### 2.3.2 Propriedades - Complexidade e Otimidade

O algoritmo Minimax é considerado um algoritmo completo, relativamente a Sua complexidade pois é garantido que encontrará uma sempre uma solução se esta existir, caso a árvore de jogo seja finita e também ótimo, desde que todas as jogadas possíveis sejam exploradas. Isso refelete-se de modo que o algoritmo fará sempre a melhor jogada possivel/ mais proxima a vitória.

Abordando Mais a fundo a complexidade do Algoritmo percebemos que esta se baseia em dois fatores:

•	X: o fator de ramificação, ou seja, o número médio de jogadas possíveis em cada estado do jogo.

•	Y: a profundidade da árvore, ou seja, o número máximo de jogadas até ao fim da partida.

Com base Nestes dois a complexidade temporal e espacial do algoritmo é dada por:

•	Complexidade Temporal: O(X^Y), pois o algoritmo precisa de explorar todos os nós até à profundidade máxima.

•	Complexidade Espacial: O(X*Y), no caso de uma implementação recursiva em profundidade.

Apesar de ser eficiente em jogos simples como o Tic Tac Toe, o algoritmo Minimax torna-se rapidamente computacionalmente inviável em jogos com árvores de decisão muito grandes devido ao facto de necessitar de explorar a Arvore de Decisão na sua Totalidade. Por isso, nesses Casos é comum utilizar outros Algorimos como os que iremos Ver a Seguir ( Alfa-Beta ), que permitem eliminar ramos da árvore que não influenciam a decisão final, reduzindo o tempo de execução sem comprometer a exatidão do resultado.

## 2.3.3 Codigo

```javascript
function minimax(board, depth, isMaximizingPlayer) {
  const scores = {
    "X": -10, // Pontuação para vitória do jogador X.
    "O": 10,  // Pontuação para vitória do computador (O).
    "tie": 0  // Pontuação para empate.
  };

  const winner = getWinner(board); // Verifica se há um vencedor na configuração atual.
  if (winner) {
    return scores[winner]; // Retorna a pontuação com base no vencedor.
  }

  if (board.every(cell => cell !== "")) { // Se o tabuleiro está cheio (empate).
    return scores["tie"];
  }

  if (isMaximizingPlayer) {
    let best = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "O"; // Tenta a jogada do computador.
        best = Math.max(best, minimax(board, depth + 1, false)); // Avalia a jogada recursivamente.
        board[i] = ""; // Desfaz a jogada para restaurar o estado.
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "X"; // Tenta a jogada do jogador.
        best = Math.min(best, minimax(board, depth + 1, true)); // Avalia recursivamente.
        board[i] = ""; // Desfaz a jogada.
      }
    }
    return best;
  }
}
```

## 2.3.3 Exemplo Prático

De forma A entender tudo isto de uma Maneira mais vizual deixo aqui um video de toda a explicação do Funcionamento do Algoritmo MinMax bem como o Funcionamento da Árvore de Decisão do mesmo
https://www.youtube.com/watch?v=KU9Ch59-4vw&t=9s



## 2.4 Alfa-Beta

Outro Algoritmo de Pesquisa bastante utilizado é o Alfa-Beta este pode ser entendido como um algoritmo melhorado do Minimax com o objetivo de reduzir significativamente o número de nós necessario de análise na árvore de jogo, sem afetar o resultado final. 

Este Algoritmo é especialmente útil em jogos com um fator de ramificação maior, onde consequentemente a análise de todas as possibilidades se torna computacionalmente dispendiosa para a utilização de um método como o MinMax


### 2.4.1 Funcionamento do Algoritmo

Relativamente ao Seu Funcionamentu o Algoritmo Alfa-Beta percorre a árvore de decisão de forma muito semelhante ao funcionamento de Min Max Utlizando na mesma uma árvore de decisão, onde cada nó representa um possível estado do jogo e cada ramo corresponde a uma jogada válida, diferenciando-se apenas pela introdução de dois parâmetros fundamentais durante a análise:

•	Alfa (α): representa o valor máximo garantido para o jogador MAX até ao momento.
•	Beta (β): representa o valor mínimo garantido para o jogador MIN até ao momento.

Porem à medida que os nós são avaliados, se o algoritmo detetar que uma determinada jogada não pode produzir um resultado melhor do que uma já conhecida — ou seja, se β ≤ α —, esse ramo é imediatamente descartado aumentando a velocidade de uma Jogada e reduzindo o custo computacional do metodo . Este processo é conhecido como poda, pois evita a exploração de ramos irrelevantes, reduzindo drasticamente o número de estados analisados.

### 2.4.2 Propriedades - Complexidade e Otimidade

O algoritmo Alfa-Beta é considerado completo e ótimo, uma vez que se baseia diretamente no algoritmo Minimax, que já apresenta estas propriedades. Assim, tal como no Minimax, desde que a árvore de jogo seja finita, o algoritmo Alfa-Beta garantirá a melhor jogada possível.

Relativamente à complexidade, o algoritmo mantém os mesmos fatores que influenciam o alforitmo MinMax:

•	X: o fator de ramificação, ou seja, o número médio de jogadas possíveis em cada estado do jogo.

•	Y: a profundidade da árvore, ou seja, o número máximo de jogadas até ao fim da partida.

No entanto, ao nível da complexidade temporal, o Alfa-Beta apresenta melhorias significativas, ao evitar a exploração de ramos irrelevantes. Isto permite otimizar o consumo de memória, uma vez que apenas é necessário armazenar os nós da fronteira de busca (os caminhos que se encontram em avaliação).

Com base nestes dois fatores, a complexidade do algoritmo é dada por:

•	Complexidade Temporal: O(X^Y) no pior caso (quando não ocorre poda eficaz).Ou com ordenação ideal dos nós e poda máxima, a complexidade pode ser reduzida para O(X^(Y/2)), representando um ganho significativo de desempenho face ao Minimax puro.

•	Complexidade Espacial: O(X·Y), uma vez que o algoritmo explora a árvore em profundidade e armazena apenas os nós do caminho atual, tornando o uso de memória mais eficiente em comparação com abordagens que requerem o armazenamento de todos os nós gerados.


### 2.4.3 Codigo

```javascript
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
        let evaluation = alphaBeta(board, depth + 1, alpha, beta, false);
        board[i] = "";
        maxEval = Math.max(maxEval, evaluation);
        alpha = Math.max(alpha, evaluation);
        if (beta <= alpha) break; // Poda do ramo se beta for menor ou igual a alpha.
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "X";
        let evaluation = alphaBeta(board, depth + 1, alpha, beta, true);
        board[i] = "";
        minEval = Math.min(minEval, evaluation);
        beta = Math.min(beta, evaluation);
        if (beta <= alpha) break; // Poda do ramo.
      }
    }
    return minEval;
  }
}
```

```javascript
function getBestMoveAlphaBeta() {
  let bestVal = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = "O";
      let moveVal = alphaBeta(board, 0, -Infinity, Infinity, false);
      board[i] = "";
      if (moveVal > bestVal) {
        bestVal = moveVal;
        bestMove = i;
      }
    }
  }
  return bestMove;
}
```




### 2.4.2 Propriedades - Complexidade e Otimidade





## Exemplo Prático

Novamente de forma a entender tudo isto de uma Maneira mais vizual deixo aqui uma video do funcionamento do método Alfa-Beta

























## Monte Carlo (EXTRA)





## Funcionamento do Algoritmo

Já no seu Funcionamento o algoritmo Monte Carlo constrói a árvore de decisão de forma, explorando apenas as partes mais promissoras com base em simulações aleatórias. Cada iteração do algoritmo é composta por quatro fases principais:

- : a partir da raiz, o algoritmo seleciona sucessivamente os ramos mais promissores com base num critério (ex., uma fórmula que baseia exploração de novas jogadas com a exploração das jogadas que já deram bons resultados).

- : quando atinge um nó ainda não completamente explorado, expande a árvore adicionando um novo nó filho.

- : a partir do novo nó, o algoritmo simula uma partida completa de forma aleatória até ao fim do jogo.

- : os resultados da simulação são propagados de volta até à raiz, atualizando as estatísticas de cada nó (número de visitas e pontuação).

Com várias iterações, a árvore vai-se concentrando nas jogadas com maior probabilidade de sucesso, melhorando a qualidade das decisões.



## Propriedades - Complexidade e Otimidade

Devido ao facto de ser um algoritmo baseado em, o MCTSno sentido clássico, pois. No entanto,, o algoritmo tende a, tornando-se cada vez mais eficaz e confiável na escolha das jogadas.

Abordando Mais a fundo a complexidade do Algoritmo percebemos que esta se baseia em dois fatores:

- : o número de simulações realizadas por jogada.

- : o tempo disponível para calcular a jogada.

Com base nisso, temos:

- : O(N·T), pois o desempenho depende diretamente do número de simulações feitas dentro do tempo permitido.

- : depende da profundidade e do número de nós expandidos, sendo geralmente inferior ao Minimax, já que apenas partes da árvore são realmente exploradas.

A grande vantagem do MCTS está na sua, funcionando bem em jogos com grandes espaços de estados e sem exigir uma função de avaliação específica — apenas um modelo de simulação.



## Exemplo Prático

Novamente de forma a entender tudo isto de uma Maneira mais vizual deixo aqui uma video do funcionamento do método Monte Carlo









## TESTES ESTUDO DE TEMPOS E MEMORIA

## 







## Jogo-Teste (ALFA BETA)











## 



## NotasEstudo daMemória

Nestaavaliação, o estudo da memória foi realizado de forma geral, considerando o tempo de processamento total da jogada do computador, e não especificamente associado a cada método de pesquisa utilizado. No entanto, é fácil perceber que há diferenças relevantes entre os algoritmos. O Minimax tende a utilizar mais memória, pois constrói e percorre toda a árvore de possibilidades até ao final do jogo, mantendo em memória múltiplos estados. Já o Alpha-Beta, embora baseado na mesma estrutura, reduz o uso de memóriaao eliminar ramos desnecessários, guardando apenas os caminhos relevantes.

No caso do Monte Carlo, o consumo de memória depende diretamente do número de simulações realizadas, uma vez que cada simulação requer uma cópia do estado atual do tabuleiro e gera novos estados aleatórios até ao fim do jogo. Assim, embora a medição de memória aplicada seja útil para uma comparação geral, ela não reflete isoladamente o impacto de cada algoritmo, mas sim o total de recursos utilizados durante a execução da jogada.



## CONCLUSÃO













## FONTES

Slides Teoricos da Cadeira de Sistemas Inteligentes









Videos:





















