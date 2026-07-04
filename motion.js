(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js-motion');

  const backdrop = document.createElement('div');
  backdrop.className = 'motion-backdrop';
  backdrop.setAttribute('aria-hidden', 'true');
  backdrop.innerHTML = `
    <span class="orb orb-one"></span>
    <span class="orb orb-two"></span>
    <span class="orb orb-three"></span>
    <span class="grid-glow"></span>
  `;
  document.body.prepend(backdrop);

  document.querySelectorAll('.hero-card, .phone-card').forEach((card) => {
    if (!card.querySelector('.scan-line')) {
      const scan = document.createElement('span');
      scan.className = 'scan-line';
      scan.setAttribute('aria-hidden', 'true');
      card.prepend(scan);
    }
  });

  document.querySelectorAll('.section, .card, .step, .flow-item, .mini, .proposal-section, .hero-copy, .hero-card, .phone-card, .cta-panel').forEach((el, index) => {
    el.classList.add('reveal');
    el.style.setProperty('--reveal-delay', `${Math.min(index * 45, 360)}ms`);
  });

  if (reduceMotion) {
    document.documentElement.classList.add('reduce-motion');
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const y = Math.min(window.scrollY, 520);
      hero.style.setProperty('--hero-drift', `${y * 0.045}px`);
      hero.style.setProperty('--hero-tilt', `${y * 0.004}deg`);
    }, { passive: true });
  }
})();
