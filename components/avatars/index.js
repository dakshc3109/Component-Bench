

function initAvatars(root = document) {
  const buttons = [...root.querySelectorAll('.team-avatar')];
  const message = root.querySelector('.team-message');
  const initialMessage = message.textContent;
  buttons.forEach((button) => button.addEventListener('click', () => {
    const isMore = button.classList.contains('team-more');
    const selected = button.getAttribute('aria-pressed') !== 'true';
    buttons.forEach((avatar) => {
      const active = selected && avatar === button;
      avatar.classList.toggle('is-selected', active);
      avatar.setAttribute('aria-pressed', String(active));
    });
    if (!selected) message.textContent = initialMessage;
    else message.textContent = isMore ? '3 teammates invited' : button.dataset.name + ' is online';
  }));
}

const component = {
  id: 'avatars',
  cat: 'Cards',
  title: 'Avatar stack',
  desc: 'An overlapping team avatar group with a compact member count.',
  html: `<div class="avatars-stage">
<div class="team-card">
 <div class="team-avatars" role="group" aria-label="Team members">
   <button class="team-avatar" type="button" data-name="Alex Morgan" aria-label="Select Alex Morgan" aria-pressed="false">AM</button>
   <button class="team-avatar" type="button" data-name="Jamie Chen" aria-label="Select Jamie Chen" aria-pressed="false">JC</button>
   <button class="team-avatar" type="button" data-name="Riley Park" aria-label="Select Riley Park" aria-pressed="false">RP</button>
   <button class="team-avatar" type="button" data-name="Sam Taylor" aria-label="Select Sam Taylor" aria-pressed="false">ST</button>
   <button class="team-avatar team-more" type="button" aria-label="Select 3 more team members" aria-pressed="false">+3</button>
  </div>
 <div class="team-copy"><strong>Design team</strong><small class="team-message" aria-live="polite">8 members collaborating</small></div>
  <span class="team-status"><i></i> Active</span>
</div>
</div>`,
  cssUrl: new URL('./styles.css', import.meta.url),
  js: initAvatars
};

export default component;
