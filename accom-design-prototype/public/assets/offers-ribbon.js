/* Reveal cashback rows as they enter view, then unwrap the ribbon gift
   on each Unlock offer button. All decoration is pointer-events:none.
   Hover can replay the ribbon after the initial scroll reveal. */
(() => {
  const section = document.querySelector('#offers.offers-ribbon');
  if (!section) return;
  const rows = [...section.querySelectorAll('.offer-ribbon-row')];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canAnimate = !reduced && 'IntersectionObserver' in window;
  if (canAnimate) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('offer-revealed');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
    section.classList.add('offers-motion');
    rows.forEach(row => observer.observe(row));
  } else {
    rows.forEach(row => row.classList.add('offer-revealed'));
  }
  if (reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  for (const row of rows) {
    const button = row.querySelector('.offer-unlock-button');
    if (!button) continue;
    button.addEventListener('pointerenter', () => {
      if (!row.classList.contains('offer-revealed')) return;
      button.classList.remove('unwrap-replay');
      void button.offsetWidth;
      button.classList.add('unwrap-replay');
    }, { passive: true });
    button.addEventListener('pointerleave', () => {
      button.classList.remove('unwrap-replay');
    }, { passive: true });
  }
})();
