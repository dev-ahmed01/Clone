/* Entry/exit-point red fill for the six About iQ Kingston feature pills. */
(() => {
  const pills = document.querySelectorAll('#about .about-feature-pill');
  if (!pills.length || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const setFillOrigin = (pill, event) => {
    const rect = pill.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const clamp = (value) => Math.min(100, Math.max(0, value));
    const x = clamp(((event.clientX - rect.left) / rect.width) * 100);
    const y = clamp(((event.clientY - rect.top) / rect.height) * 100);
    pill.style.setProperty('--pill-fill-x', `${x.toFixed(1)}%`);
    pill.style.setProperty('--pill-fill-y', `${y.toFixed(1)}%`);
  };

  for (const pill of pills) {
    pill.addEventListener('pointerenter', (event) => setFillOrigin(pill, event), { passive: true });
    // Exit direction also determines where the red fill retracts.
    pill.addEventListener('pointerleave', (event) => setFillOrigin(pill, event), { passive: true });
  }
})();
