

function initSpotlight(root = document) {
  const card = root.querySelector('.spot');
  card.addEventListener('pointermove', (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--x', (e.clientX - r.left) + 'px');
    card.style.setProperty('--y', (e.clientY - r.top) + 'px');
  });
}

const component = {
  id: 'spotlight',
  cat: 'Cards',
  title: 'Spotlight card',
  desc: 'A soft light and a glowing edge follow the pointer across the surface.',
  html: `<div class="spot-stage">
  <article class="spot">
    <span class="spot-dot"></span>
    <h3>Spotlight</h3>
    <p>A soft light follows your cursor across the surface and along its border.</p>
    <span class="spot-meta">Move your pointer here</span>
  </article>
</div>`,
  cssUrl: new URL('./styles.css', import.meta.url),
  js: initSpotlight
};

export default component;
