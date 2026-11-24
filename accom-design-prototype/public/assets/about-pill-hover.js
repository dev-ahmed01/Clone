/* Directional fill for About feature pills and text-only amenity cards. */
(() => {
  const pills = document.querySelectorAll('#about .about-feature-pill, #amenities .amx-item');
  if (!pills.length || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const setFillOrigin = (pill, event) => {
    const rect = pill.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const clamp = (value) => Math.min(100, Math.max(0, value));
    const x = clamp(((event.clientX - rect.left) / rect.width) * 100);
    const y = clamp(((event.clientY - rect.top) / rect.height) * 100);
    const prefix = pill.matches('.amx-item') ? 'amenity' : 'pill';
    pill.style.setProperty(`--${prefix}-fill-x`, `${x.toFixed(1)}%`);
    pill.style.setProperty(`--${prefix}-fill-y`, `${y.toFixed(1)}%`);
  };

  for (const pill of pills) {
    pill.addEventListener('pointerenter', (event) => setFillOrigin(pill, event), { passive: true });
    // Exit direction also determines where the red fill retracts.
    pill.addEventListener('pointerleave', (event) => setFillOrigin(pill, event), { passive: true });
  }
})();
