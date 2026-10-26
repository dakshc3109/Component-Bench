export function initializeMotion() {
  const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollProgress = document.querySelector('.scroll-progress');
  const dock = document.querySelector('.dock');
  const hero = document.querySelector('.hero');
  let ambientFrame = 0;

  if (motionOK) {
    const usesCustomCursor = window.matchMedia('(pointer: fine)').matches;
    if (usesCustomCursor) document.body.classList.add('has-custom-cursor');
    const resetAmbientGlow = () => {
      if (ambientFrame) cancelAnimationFrame(ambientFrame);
      ambientFrame = 0;
      document.body.classList.remove('cursor-visible');
      document.documentElement.style.setProperty('--pointer-x', '-1000px');
      document.documentElement.style.setProperty('--pointer-y', '-1000px');
    };
    window.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse' || ambientFrame) return;
      if (usesCustomCursor) document.body.classList.add('cursor-visible');
      ambientFrame = requestAnimationFrame(() => {
        ambientFrame = 0;
        document.documentElement.style.setProperty('--pointer-x', event.clientX + 'px');
        document.documentElement.style.setProperty('--pointer-y', event.clientY + 'px');
      });
    }, { passive: true });
    window.addEventListener('pointerleave', resetAmbientGlow);
  }

  let magneticFrame = 0;

  if (motionOK && hero) {
    const magneticElements = '.hero-word, .sub-word, .stats span';
    const resetMagnetism = () => {
      hero.querySelectorAll(magneticElements).forEach((element) => {
        element.style.setProperty('--mag-x', '0px');
        element.style.setProperty('--mag-y', '0px');
      });
    };
    hero.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse' || magneticFrame) return;
      magneticFrame = requestAnimationFrame(() => {
        magneticFrame = 0;
        hero.querySelectorAll(magneticElements).forEach((element) => {
          const bounds = element.getBoundingClientRect();
          const deltaX = event.clientX - (bounds.left + bounds.width / 2);
          const deltaY = event.clientY - (bounds.top + bounds.height / 2);
          const distance = Math.hypot(deltaX, deltaY);
          const influence = Math.max(0, 1 - distance / 190);
          const x = Math.max(-10, Math.min(10, deltaX * 0.13 * influence));
          const y = Math.max(-8, Math.min(8, deltaY * 0.13 * influence));
          element.style.setProperty('--mag-x', x + 'px');
          element.style.setProperty('--mag-y', y + 'px');
        });
      });
    });
    hero.addEventListener('pointerleave', resetMagnetism);
  }

  let scrollFrame = 0;
  function updateScrollMotion() {
    scrollFrame = 0;
    const range = document.documentElement.scrollHeight - window.innerHeight;
    const progress = range > 0 ? window.scrollY / range : 0;
    document.documentElement.style.setProperty('--scroll-progress', String(progress));
    dock.classList.toggle('is-scrolled', window.scrollY > 12);
  }
  function requestScrollMotion() {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScrollMotion);
  }
  if (scrollProgress) {
    window.addEventListener('scroll', requestScrollMotion, { passive: true });
    window.addEventListener('resize', requestScrollMotion);
    updateScrollMotion();
  }

  if (motionOK && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    const revealTargets = document.querySelectorAll('.hero h1, .hero .sub, .hero .stats, .toc, .item, .foot');
    revealTargets.forEach((element, index) => {
      element.classList.add('scroll-reveal');
      element.style.setProperty('--reveal-delay', Math.min(index % 5, 4) * 75 + 'ms');
      revealObserver.observe(element);
    });
  }

  if (motionOK) {
    requestAnimationFrame(() => {
      document.body.classList.add('intro-animate');
      setTimeout(() => document.body.classList.remove('intro-animate'), 1900);
    });
  }
}
