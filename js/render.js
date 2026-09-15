// DOM
const Render = {
  init() {
    this.cells = [...document.querySelectorAll('.cell')];
    this.status = document.getElementById('status');
    this.line = document.getElementById('line');
    this.linePath = document.getElementById('line-path');
    this.score = { X: document.getElementById('score-x'), O: document.getElementById('score-o'), D: document.getElementById('score-d') };
    this.names = { X: document.getElementById('name-x'), O: document.getElementById('name-o') };
  },

  board(board, locked) {
    board.cells.forEach((m, i) => {
      const el = this.cells[i];
      const had = el.textContent;
      el.textContent = m || '';
      el.className = 'cell' + (m ? ' ' + m.toLowerCase() : '');
      if (m && !had) el.classList.add('pop');
      el.disabled = !!m || locked;
    });
  },

  highlight(line) {
    line.forEach(i => this.cells[i].classList.add('win'));
    // centros das células num viewBox 300x300 com 3 colunas
    const c = i => ({ x: (i % 3) * 100 + 50, y: Math.floor(i / 3) * 100 + 50 });
    const a = c(line[0]), b = c(line[2]);
    this.linePath.setAttribute('d', `M${a.x} ${a.y} L${b.x} ${b.y}`);
    this.linePath.style.stroke = this.cells[line[0]].classList.contains('x') ? 'var(--x)' : 'var(--o)';
    this.line.classList.remove('draw'); void this.line.offsetWidth; this.line.classList.add('draw');
  },
  clearLine() { this.line.classList.remove('draw'); this.linePath.setAttribute('d', ''); },

  setStatus(text, win = false) { this.status.textContent = text; this.status.classList.toggle('win', win); },
  scores(s) { this.score.X.textContent = s.X; this.score.O.textContent = s.O; this.score.D.textContent = s.D; },
  setNames(mode) {
    this.names.X.textContent = mode === '2p' ? 'Jogador 1 (X)' : 'Você (X)';
    this.names.O.textContent = mode === '2p' ? 'Jogador 2 (O)' : 'CPU (O)';
  },
};
