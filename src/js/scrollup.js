(() => {
  const btn = document.getElementById('scrollUp');
  if (!btn) return;

  const SHOW_AFTER = 600; // px

  const prefersReduce = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function toggle() {
    if (window.scrollY > SHOW_AFTER) {
      btn.hidden = false;
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
      setTimeout(() => {
        if (!btn.classList.contains('is-visible')) btn.hidden = true;
      }, 250);
    }
  }

  window.addEventListener('scroll', toggle, { passive: true });
  toggle();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReduce() ? 'auto' : 'smooth' });
  });
})();
