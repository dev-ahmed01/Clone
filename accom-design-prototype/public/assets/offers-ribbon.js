/* Reveals each cashback ribbon as it scrolls into view.
   One-shot, no scroll listener or scroll locking; content stays visible without JS. */
(() => {
  const section = document.querySelector('#offers.offers-ribbon');
  if (!section) return;
  const rows = [...section.querySelectorAll('.offer-ribbon-row')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('offer-revealed');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.18, rootMargin: '0px 0px -5% 0px' });
  section.classList.add('offers-motion');
  rows.forEach(row => observer.observe(row));
})();
