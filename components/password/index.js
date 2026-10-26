

function initPassword(root = document) {
  const input = root.querySelector('.password-input');
  const button = root.querySelector('.password-toggle');
  button.addEventListener('click', () => {
    const visible = input.type === 'password';
    input.type = visible ? 'text' : 'password';
    button.textContent = visible ? 'Hide' : 'Show';
    button.setAttribute('aria-label', visible ? 'Hide password' : 'Show password');
    button.setAttribute('aria-pressed', String(visible));
  });
}

const component = {
  id: 'password',
  cat: 'Inputs',
  title: 'Password field',
  desc: 'A clean password input with an accessible show and hide control.',
  html: `<div class="password-stage">
<label class="password-field">
  <span>Password</span>
  <span class="password-wrap">
    <input class="password-input" type="password" value="benchmarks" autocomplete="new-password">
    <button class="password-toggle" type="button" aria-label="Show password" aria-pressed="false">Show</button>
  </span>
  <small>Use at least 8 characters.</small>
</label>
</div>`,
  cssUrl: new URL('./styles.css', import.meta.url),
  js: initPassword
};

export default component;
