// Estado do tabuleiro e detecção de vitória
class Board {
  constructor() { this.cells = Array(9).fill(null); }

  clone() { const b = new Board(); b.cells = this.cells.slice(); return b; }
  empties() { return this.cells.map((c, i) => c ? -1 : i).filter(i => i >= 0); }
  place(i, mark) { if (this.cells[i]) return false; this.cells[i] = mark; return true; }
  full() { return this.cells.every(Boolean); }

  // Retorna { mark, line } se alguém venceu, senão null
  winner() {
    for (const line of LINES) {
      const [a, b, c] = line;
      if (this.cells[a] && this.cells[a] === this.cells[b] && this.cells[a] === this.cells[c]) {
        return { mark: this.cells[a], line };
      }
    }
    return null;
  }

  over() { return !!this.winner() || this.full(); }
}
