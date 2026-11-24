/* A one-shot entrance for ambassador pathway cards: no scroll hijacking.
   Without JS or in reduced-motion mode the content is immediately visible. */
(() => {
  const el = document.getElementById('ambassadors');
  if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('ae-ambassador-inview');
      observer.unobserve(entry.target);
    }
  }, { threshold: .14, rootMargin: '0px 0px -5% 0px' });
  el.classList.add('ae-ambassador-motion');
  observer.observe(el);
})();
