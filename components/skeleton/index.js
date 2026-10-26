

function initSkeleton(root = document) {
  const card = root.querySelector('.skeleton-card');
  const button = root.querySelector('.skeleton-toggle');
  button.addEventListener('click', () => {
    const loaded = card.classList.toggle('is-loaded');
    button.textContent = loaded ? 'Show loading state' : 'Load profile';
    button.setAttribute('aria-pressed', String(loaded));
  });
}

const component = {
  id: 'skeleton',
  cat: 'Layout',
  title: 'Skeleton loading card',
  desc: 'A shimmer loading state that smoothly reveals finished profile content.',
  html: `<div class="skeleton-stage">
<article class="skeleton-card">
  <div class="skeleton-loading" aria-hidden="true">
    <span class="skeleton-avatar"></span>
    <span class="skeleton-lines"><i></i><i></i></span>
  </div>
  <div class="skeleton-content">
    <span class="profile-avatar">JD</span>
    <span><strong>Jordan Davis</strong><small>Product designer</small></span>
    <span class="profile-check" aria-label="Verified">✓</span>
  </div>
</article>
<button class="skeleton-toggle" type="button" aria-pressed="false">Load profile</button>
</div>`,
  cssUrl: new URL('./styles.css', import.meta.url),
  js: initSkeleton
};

export default component;
