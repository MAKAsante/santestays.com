(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js-motion');

  const revealTargets = document.querySelectorAll('.section, .card, .step, .flow-item, .hero-copy, .phone-card, .cta-panel');
  revealTargets.forEach((el, index) => {
    el.classList.add('reveal');
    el.style.setProperty('--reveal-delay', `${Math.min(index * 40, 240)}ms`);
  });

  if (reduceMotion) {
    document.documentElement.classList.add('reduce-motion');
    revealTargets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  revealTargets.forEach((el) => observer.observe(el));
})();
