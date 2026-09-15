// Constantes
const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
  [0, 4, 8], [2, 4, 6],            // diagonais
];

// Probabilidade de a IA jogar a melhor jogada em cada modo
const MODES = {
  easy:       { label: 'Fácil',      smart: 0.2 },
  medium:     { label: 'Médio',      smart: 0.75 },
  impossible: { label: 'Impossível', smart: 1 },
  '2p':       { label: '2 Jogadores' },
};

const CPU_DELAY = 450; // ms para a jogada da CPU parecer "pensada"
const SCORE_KEY = 'velha-score';
