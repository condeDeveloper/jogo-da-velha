// IA com minimax (imbatível) e uma dose de aleatoriedade por dificuldade
const AI = {
  // Avalia o tabuleiro do ponto de vista de `me`. Profundidade favorece vitórias rápidas.
  minimax(board, me, turn, depth = 0) {
    const w = board.winner();
    if (w) return w.mark === me ? 10 - depth : depth - 10;
    if (board.full()) return 0;
    const other = turn === 'X' ? 'O' : 'X';
    let best = turn === me ? -Infinity : Infinity;
    for (const i of board.empties()) {
      const b = board.clone(); b.place(i, turn);
      const score = this.minimax(b, me, other, depth + 1);
      best = turn === me ? Math.max(best, score) : Math.min(best, score);
    }
    return best;
  },

  bestMove(board, me) {
    const other = me === 'X' ? 'O' : 'X';
    let best = -Infinity, moves = [];
    for (const i of board.empties()) {
      const b = board.clone(); b.place(i, me);
      const score = this.minimax(b, me, other, 1);
      if (score > best) { best = score; moves = [i]; }
      else if (score === best) moves.push(i);
    }
    // entre jogadas igualmente boas, escolhe ao acaso para variar as partidas
    return moves[Math.floor(Math.random() * moves.length)];
  },

  randomMove(board) {
    const e = board.empties();
    return e[Math.floor(Math.random() * e.length)];
  },

  // Joga a melhor jogada com probabilidade `smart`, senão uma aleatória
  choose(board, me, smart) {
    if (Math.random() < smart) return this.bestMove(board, me);
    return this.randomMove(board);
  },
};
