// Sons sintetizados com WebAudio
const Sound = (() => {
  let ctx;
  function tone(freq, dur, type = 'sine', vol = 0.06) {
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type; o.frequency.value = freq;
      g.gain.setValueAtTime(vol, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      o.connect(g).connect(ctx.destination);
      o.start(); o.stop(ctx.currentTime + dur);
    } catch (_) {}
  }
  return {
    x:    () => tone(520, 0.08, 'triangle'),
    o:    () => tone(390, 0.08, 'triangle'),
    win:  () => [523, 659, 784].forEach((f, i) => setTimeout(() => tone(f, 0.18, 'triangle', 0.08), i * 90)),
    lose: () => [330, 262, 196].forEach((f, i) => setTimeout(() => tone(f, 0.2, 'sawtooth', 0.05), i * 110)),
    draw: () => tone(300, 0.25, 'square', 0.04),
  };
})();
