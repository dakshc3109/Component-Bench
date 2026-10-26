

function initNotice(root = document) {
  const button = root.querySelector('.notice-trigger');
  const notice = root.querySelector('.notice');
  let timer;
  button.addEventListener('click', () => {
    button.classList.add('is-saved');
    button.innerHTML = '<span aria-hidden="true">✓</span> Saved!';
    notice.classList.add('is-visible');
    notice.setAttribute('aria-hidden', 'false');
    clearTimeout(timer);
    timer = setTimeout(() => {
      button.classList.remove('is-saved');
      button.textContent = 'Save changes';
      notice.classList.remove('is-visible');
      notice.setAttribute('aria-hidden', 'true');
    }, 2800);
  });
}

const component = {
  id: 'notice',
  cat: 'Overlays',
  title: 'Toast notification',
  desc: 'A compact success message that slides into view and dismisses itself.',
  html: `<div class="notice-stage">
<button class="notice-trigger" type="button">Save changes</button>
<div class="notice" role="status" aria-live="polite" aria-hidden="true">
  <span class="notice-icon" aria-hidden="true">✓</span>
  <span><strong>All set</strong><small>Your changes have been saved.</small></span>
</div>
</div>`,
  cssUrl: new URL('./styles.css', import.meta.url),
  js: initNotice
};

export default component;
