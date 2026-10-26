

function initGoal(root = document) {
  const ring = root.querySelector('.goal-ring');
  const value = root.querySelector('.goal-value');
  const button = root.querySelector('.goal-add');
  let progress = 65;
  button.addEventListener('click', () => {
    progress = Math.min(progress + 5, 100);
    ring.style.setProperty('--progress', progress + '%');
    ring.classList.add('goal-progress');
    value.textContent = progress + '%';
    value.classList.remove('goal-pop');
    void value.offsetWidth;
    value.classList.add('goal-pop');
    ring.setAttribute('aria-valuenow', String(progress));
    button.disabled = progress === 100;
    button.textContent = progress === 100 ? 'Goal reached ✓' : '+5% added ✓';
    if (progress < 100) {
      setTimeout(() => { button.textContent = 'Add 5%'; }, 900);
    }
  });
}

const component = {
  id: 'goal',
  cat: 'Layout',
  title: 'Goal progress ring',
  desc: 'A bold circular progress indicator with a button to move the goal forward.',
  html: `<div class="goal-stage">
<div class="goal-card">
  <span class="goal-caption">WEEKLY GOAL</span>
  <div class="goal-ring" role="progressbar" aria-label="Weekly goal" aria-valuemin="0" aria-valuemax="100" aria-valuenow="65">
    <span class="goal-value">65%</span>
  </div>
  <strong>Almost there</strong>
  <small>Keep your momentum going.</small>
  <button class="goal-add" type="button">Add 5%</button>
</div>
</div>`,
  cssUrl: new URL('./styles.css', import.meta.url),
  js: initGoal
};

export default component;
