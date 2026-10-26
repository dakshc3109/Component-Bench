

function initTilt(root = document) {
  const card = root.querySelector('.glass-card');
  card.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.setProperty('--ry', (x * 18) + 'deg');
    card.style.setProperty('--rx', (-y * 18) + 'deg');
  });
  card.addEventListener('pointerleave', () => {
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  });
}

const component = {
  id: 'glass',
  cat: 'Cards',
  title: 'Glassmorphism card',
  desc: 'Frosted blur, soft border and a 3D tilt that follows the pointer.',
  html: `<div class="glass-stage">
  <article class="glass-card">
    <span class="glass-chip">New</span>
    <h3>Aurora Glass</h3>
    <p>Frosted blur, a soft border and a gentle tilt that follows your cursor.</p>
    <button class="glass-link" type="button">Explore</button>
  </article>
</div>`,
  cssUrl: new URL('./styles.css', import.meta.url),
  js: initTilt
};

export default component;
