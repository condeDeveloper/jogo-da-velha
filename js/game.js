// Regras, turnos e placar
class Game {
  constructor() {
    Render.init();
    this.mode = 'medium';
    this.scores = this.loadScores();
    this.starter = 'X';
    this.bind();
    Render.setNames(this.mode);
    this.newRound();
  }

  loadScores() {
    try { return Object.assign({ X: 0, O: 0, D: 0 }, JSON.parse(localStorage.getItem(SCORE_KEY) || '{}')); }
    catch (_) { return { X: 0, O: 0, D: 0 }; }
  }
  saveScores() { try { localStorage.setItem(SCORE_KEY, JSON.stringify(this.scores)); } catch (_) {} }

  bind() {
    Render.cells.forEach(el => el.addEventListener('click', () => this.humanMove(Number(el.dataset.i))));
    document.querySelectorAll('#modes button').forEach(b => b.addEventListener('click', () => this.setMode(b.dataset.mode)));
    document.getElementById('new').addEventListener('click', () => this.newRound());
    document.getElementById('reset').addEventListener('click', () => { this.scores = { X: 0, O: 0, D: 0 }; this.saveScores(); Render.scores(this.scores); this.newRound(); });
    window.addEventListener('keydown', e => {
      if (e.code === 'KeyN') this.newRound();
      const n = Number(e.key);
      if (n >= 1 && n <= 9) this.humanMove(n - 1); // teclado numérico: 1 = canto superior esquerdo
    });
  }

  setMode(mode) {
    this.mode = mode;
    document.querySelectorAll('#modes button').forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
    Render.setNames(mode);
    this.newRound();
  }

  newRound() {
    clearTimeout(this.cpuTimer);
    this.board = new Board();
    this.turn = this.starter;
    this.starter = this.starter === 'X' ? 'O' : 'X'; // alterna quem começa
    this.locked = false;
    Render.clearLine();
    Render.board(this.board, false);
    Render.scores(this.scores);
    this.updateStatus();
    if (this.isCpuTurn()) this.cpuMove();
  }

  isCpuTurn() { return this.mode !== '2p' && this.turn === 'O'; }

  humanMove(i) {
    if (this.locked || this.isCpuTurn()) return;
    this.play(i);
  }

  cpuMove() {
    this.locked = true;
    Render.board(this.board, true);
    Render.setStatus('CPU pensando…');
    this.cpuTimer = setTimeout(() => {
      this.locked = false;
      this.play(AI.choose(this.board, 'O', MODES[this.mode].smart));
    }, CPU_DELAY);
  }

  play(i) {
    if (!this.board.place(i, this.turn)) return;
    this.turn === 'X' ? Sound.x() : Sound.o();
    const w = this.board.winner();
    if (w) return this.end(w);
    if (this.board.full()) return this.end(null);
    this.turn = this.turn === 'X' ? 'O' : 'X';
    Render.board(this.board, false);
    this.updateStatus();
    if (this.isCpuTurn()) this.cpuMove();
  }

  end(w) {
    this.locked = true;
    Render.board(this.board, true);
    if (w) {
      Render.highlight(w.line);
      this.scores[w.mark]++;
      const cpuWon = this.mode !== '2p' && w.mark === 'O';
      cpuWon ? Sound.lose() : Sound.win();
      const who = this.mode === '2p' ? `Jogador ${w.mark === 'X' ? 1 : 2}` : (w.mark === 'X' ? 'Você' : 'CPU');
      Render.setStatus(`${who} venceu! 🎉`, true);
    } else {
      this.scores.D++;
      Sound.draw();
      Render.setStatus('Empate. Deu velha!', true);
    }
    this.saveScores();
    Render.scores(this.scores);
  }

  updateStatus() {
    if (this.mode === '2p') Render.setStatus(`Vez do Jogador ${this.turn === 'X' ? 1 : 2} (${this.turn})`);
    else Render.setStatus(this.turn === 'X' ? 'Sua vez' : 'Vez da CPU');
  }
}

window.addEventListener('DOMContentLoaded', () => { window.game = new Game(); });
