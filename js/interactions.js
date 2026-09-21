/* Shared motion preference and a single, visibility-aware animation loop. */
(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = false;
  try { paused = localStorage.getItem('motion-paused') === 'true'; } catch (_) {}
  const callbacks = new Set();
  let frame = 0;
  let previous = 0;
  const stopped = () => paused || preference.matches || document.hidden;
  function tick(time) {
    frame = 0;
    const delta = previous ? Math.min((time - previous) / 1000, 0.05) : 0;
    previous = time;
    callbacks.forEach(draw => draw(delta));
    if (!stopped()) frame = requestAnimationFrame(tick);
  }
  function redraw() {
    callbacks.forEach(draw => draw(0));
  }
  function update() {
    cancelAnimationFrame(frame);
    frame = 0;
    previous = 0;
    document.documentElement.dataset.motion = stopped() ? 'paused' : 'playing';
    document.querySelectorAll('.motion-toggle').forEach(button => {
      button.hidden = false;
      button.disabled = preference.matches;
      button.textContent = preference.matches ? 'Reduced motion is on' : paused ? 'Resume motion' : 'Pause motion';
      button.setAttribute('aria-pressed', String(paused || preference.matches));
    });
    redraw();
    if (!stopped()) frame = requestAnimationFrame(tick);
  }
  window.siteMotion = {
    add(draw) { callbacks.add(draw); redraw(); },
    redraw,
    get paused() { return stopped(); }
  };
  document.querySelectorAll('.motion-toggle').forEach(button => button.addEventListener('click', () => {
    paused = !paused;
    try { localStorage.setItem('motion-paused', String(paused)); } catch (_) {}
    update();
  }));
  preference.addEventListener('change', update);
  document.addEventListener('visibilitychange', update);
  update();

})();
