/* ---------- Component logic (shown in the JS tab, also runs the preview) ---------- */
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

function initSpotlight(root = document) {
  const card = root.querySelector('.spot');
  card.addEventListener('pointermove', (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--x', (e.clientX - r.left) + 'px');
    card.style.setProperty('--y', (e.clientY - r.top) + 'px');
  });
}

function initRange(root = document) {
  const input = root.querySelector('.rg input');
  const out = root.querySelector('.rg output');
  const paint = () => {
    const p = ((input.value - input.min) / (input.max - input.min)) * 100;
    input.style.setProperty('--p', p + '%');
    out.textContent = input.value;
  };
  input.addEventListener('input', paint);
  paint();
}

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

function initSegmented(root = document) {
  const buttons = [...root.querySelectorAll('.plan-option')];
  const price = root.querySelector('.plan-price');
  const billing = root.querySelector('.plan-billing');
  const choose = root.querySelector('.billing-cta');
  buttons.forEach((button) => button.addEventListener('click', () => {
    buttons.forEach((option) => option.setAttribute('aria-pressed', String(option === button)));
    price.textContent = button.dataset.price;
    billing.textContent = button.dataset.billing;
    price.classList.remove('price-pop');
    void price.offsetWidth;
    price.classList.add('price-pop');
  }));
  choose.addEventListener('click', () => {
    const selected = choose.classList.toggle('is-selected');
    choose.textContent = selected ? 'Pro selected ✓' : 'Choose Pro';
    choose.setAttribute('aria-pressed', String(selected));
  });
}

function initStepper(root = document) {
  const steps = [...root.querySelectorAll('.step-point')];
  const label = root.querySelector('.step-label');
  const back = root.querySelector('.step-back');
  const next = root.querySelector('.step-next');
  let current = 0;
  const update = () => {
    steps.forEach((step, index) => {
      step.classList.toggle('is-current', index === current);
      step.classList.toggle('is-complete', index < current);
      step.textContent = index < current ? '✓' : String(index + 1);
      if (index === current) step.setAttribute('aria-current', 'step');
      else step.removeAttribute('aria-current');
    });
    label.textContent = 'Step ' + (current + 1) + ' of ' + steps.length + ': ' + steps[current].dataset.label;
    back.disabled = current === 0;
    next.disabled = current === steps.length - 1;
  };
  back.addEventListener('click', () => {
    if (current > 0) current--;
    update();
  });
  next.addEventListener('click', () => {
    if (current < steps.length - 1) current++;
    update();
  });
  update();
}

function initChecklist(root = document) {
  const checks = [...root.querySelectorAll('.task-check')];
  const progress = root.querySelector('.task-progress');
  const summary = root.querySelector('.task-summary');
  const update = () => {
    const completed = checks.filter((check) => check.checked).length;
    progress.value = completed;
    summary.textContent = completed + ' of ' + checks.length + ' tasks complete';
  };
  checks.forEach((check) => check.addEventListener('change', update));
  update();
}

function initSkeleton(root = document) {
  const card = root.querySelector('.skeleton-card');
  const button = root.querySelector('.skeleton-toggle');
  button.addEventListener('click', () => {
    const loaded = card.classList.toggle('is-loaded');
    button.textContent = loaded ? 'Show loading state' : 'Load profile';
    button.setAttribute('aria-pressed', String(loaded));
  });
}

function initProduct(root = document) {
  const quantity = root.querySelector('.product-quantity');
  const price = root.querySelector('.product-price');
  const decrease = root.querySelector('.quantity-decrease');
  const increase = root.querySelector('.quantity-increase');
  const add = root.querySelector('.product-add');
  const unitPrice = Number(price.dataset.unitPrice);
  const minQuantity = Number(quantity.dataset.min);
  const maxQuantity = Number(quantity.dataset.max);
  let addTimer;
  const update = () => {
    const value = Number(quantity.textContent);
    decrease.disabled = value <= minQuantity;
    increase.disabled = value >= maxQuantity;
    price.textContent = '$' + (unitPrice * value).toFixed(2);
    if (!add.classList.contains('is-added')) add.textContent = 'Add ' + value + ' to bag';
  };
  const animateQuantity = () => {
    quantity.classList.remove('quantity-pop');
    price.classList.remove('price-pop');
    void quantity.offsetWidth;
    quantity.classList.add('quantity-pop');
    price.classList.add('price-pop');
  };
  decrease.addEventListener('click', () => {
    quantity.textContent = String(Math.max(Number(quantity.textContent) - 1, minQuantity));
    update();
    animateQuantity();
  });
  increase.addEventListener('click', () => {
    quantity.textContent = String(Math.min(Number(quantity.textContent) + 1, maxQuantity));
    update();
    animateQuantity();
  });
  add.addEventListener('click', () => {
    add.textContent = 'Added to bag ✓';
    add.classList.add('is-added');
    clearTimeout(addTimer);
    addTimer = setTimeout(() => {
      add.classList.remove('is-added');
      update();
    }, 1400);
  });
  update();
}

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

function initMusic(root = document) {
  const player = root.querySelector('.music-player');
  const button = root.querySelector('.music-toggle');
  const status = root.querySelector('.music-status');
  button.addEventListener('click', () => {
    const playing = player.classList.toggle('is-playing');
    button.setAttribute('aria-label', playing ? 'Pause preview' : 'Play preview');
    button.innerHTML = playing ? '&#10074;&#10074;' : '&#9654;';
    status.textContent = playing ? 'Now playing' : 'Paused';
    button.classList.remove('music-pop');
    void button.offsetWidth;
    button.classList.add('music-pop');
  });
}

/* ---------- Component snippets ---------- */
const ITEMS = [
{
  id: 'glass', cat: 'Cards', title: 'Glassmorphism card', desc: 'Frosted blur, soft border and a 3D tilt that follows the pointer.',
  html: `<div class="glass-stage">
  <article class="glass-card">
    <span class="glass-chip">New</span>
    <h3>Aurora Glass</h3>
    <p>Frosted blur, a soft border and a gentle tilt that follows your cursor.</p>
    <button class="glass-link" type="button">Explore</button>
  </article>
</div>`,
  css: `.glass-stage {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 356px;
  padding: 24px 16px;
  overflow: hidden;
  isolation: isolate;
  background: linear-gradient(135deg, #4338ca, #db2777 60%, #f59e0b);
}
.glass-stage::before {
  content: "";
  position: absolute;
  width: 220px;
  height: 220px;
  top: -50px;
  left: -40px;
  border-radius: 50%;
  background: rgba(56, 189, 248, .55);
  filter: blur(40px);
}
.glass-card {
  position: relative;
  width: min(100%, 270px);
  box-sizing: border-box;
  padding: 28px;
  border-radius: 22px;
  color: #fff;
  font-family: Inter, sans-serif;
  background: rgba(255, 255, 255, .14);
  border: 1px solid rgba(255, 255, 255, .35);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
  box-shadow: 0 24px 48px rgba(0, 0, 0, .28);
  transform: perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  transition: transform .15s ease-out;
  will-change: transform;
  backface-visibility: hidden;
}
.glass-card h3 {
  margin: 14px 0 6px;
  font-size: 1.4rem;
}
.glass-card p {
  margin: 0 0 20px;
  font-size: .9rem;
  line-height: 1.5;
  opacity: .9;
}
.glass-chip {
  padding: 3px 10px;
  border-radius: 999px;
  font-size: .75rem;
  font-weight: 600;
  background: rgba(255, 255, 255, .25);
}
.glass-link {
  padding: 9px 18px;
  border: 1px solid rgba(255, 255, 255, .5);
  border-radius: 10px;
  color: #fff;
  font-weight: 600;
  background: rgba(255, 255, 255, .12);
  cursor: pointer;
  transition: background .2s;
}
.glass-link:hover {
  background: rgba(255, 255, 255, .28);
}`,
  js: initTilt
},
{
  id: 'neo', cat: 'Buttons', title: 'Neumorphic button', desc: 'Raised at rest, pressed into the surface on click. Pure CSS.',
  html: `<div class="neo-stage">
  <button class="neo-btn" type="button">Press me</button>
</div>`,
  css: `.neo-stage {
  display: grid;
  place-items: center;
  min-height: 356px;
  background: #e0e5ec;
}
.neo-btn {
  padding: 18px 44px;
  border: 0;
  border-radius: 18px;
  color: #4a5568;
  font: 600 1rem Inter, sans-serif;
  letter-spacing: .06em;
  background: #e0e5ec;
  cursor: pointer;
  box-shadow: 9px 9px 18px #a3b1c6, -9px -9px 18px #ffffff;
  transition: box-shadow .2s ease, color .2s ease, transform .2s ease;
}
.neo-btn:hover {
  color: #4f46e5;
}
.neo-btn:active {
  transform: scale(.98);
  box-shadow: inset 6px 6px 12px #a3b1c6, inset -6px -6px 12px #ffffff;
}
.neo-btn:focus-visible {
  outline: 2px solid #4f46e5;
  outline-offset: 4px;
}`,
  js: null
},
{
  id: 'shine', cat: 'Buttons', title: 'Shine gradient button', desc: 'Gradient button with a light sweep on hover and a pressed state.',
  html: `<div class="shine-stage">
  <button class="shine-btn" type="button">Get started</button>
</div>`,
  css: `.shine-stage {
  display: grid;
  place-items: center;
  min-height: 356px;
  background: #0b1020;
}
.shine-btn {
  position: relative;
  overflow: hidden;
  padding: 16px 40px;
  border: 0;
  border-radius: 14px;
  color: #fff;
  font: 600 1rem Inter, sans-serif;
  background: linear-gradient(120deg, #6366f1, #ec4899);
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(99, 102, 241, .45);
  transition: transform .2s, box-shadow .2s;
}
.shine-btn::after {
  content: "";
  position: absolute;
  top: 0;
  left: -80%;
  width: 50%;
  height: 100%;
  background: linear-gradient(100deg, transparent, rgba(255, 255, 255, .55), transparent);
  transform: skewX(-20deg);
}
.shine-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 36px rgba(236, 72, 153, .45);
}
.shine-btn:hover::after {
  left: 130%;
  transition: left .7s ease;
}
.shine-btn:active {
  transform: scale(.97);
}`,
  js: null
},
{
  id: 'switch', cat: 'Inputs', title: 'Toggle switch', desc: 'Accessible checkbox switch with a springy thumb. Pure CSS.',
  html: `<div class="sw-stage">
  <label class="switch">
    <input type="checkbox" checked>
    <span class="track"><span class="thumb"></span></span>
    <span>Notifications</span>
  </label>
</div>`,
  css: `.sw-stage {
  display: grid;
  place-items: center;
  min-height: 356px;
  background: #f1f5f9;
}
.switch {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  color: #0f172a;
  font: 500 1rem Inter, sans-serif;
  cursor: pointer;
}
.switch input {
  position: absolute;
  opacity: 0;
}
.track {
  position: relative;
  width: 56px;
  height: 32px;
  border-radius: 999px;
  background: #cbd5e1;
  transition: background .3s;
}
.thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, .25);
  transition: transform .35s cubic-bezier(.34, 1.56, .64, 1);
}
.switch input:checked + .track {
  background: #4f46e5;
}
.switch input:checked + .track .thumb {
  transform: translateX(24px);
}
.switch input:focus-visible + .track {
  outline: 2px solid #4f46e5;
  outline-offset: 3px;
}`,
  js: null
},
{
  id: 'nav', cat: 'Navigation', title: 'Sliding pill navbar', desc: 'Tab bar whose highlight glides to the active item. Pure CSS.',
  html: `<div class="nav-stage">
  <nav class="nav">
    <input type="radio" name="tab" id="n1" checked><label for="n1">Home</label>
    <input type="radio" name="tab" id="n2"><label for="n2">Work</label>
    <input type="radio" name="tab" id="n3"><label for="n3">Blog</label>
    <input type="radio" name="tab" id="n4"><label for="n4">Contact</label>
    <span class="pill"></span>
  </nav>
</div>`,
  css: `.nav-stage {
  display: grid;
  place-items: center;
  min-height: 356px;
  padding: 20px;
  background: #0f172a;
}
.nav {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 70px);
  padding: 6px;
  border-radius: 999px;
  background: #1e293b;
  box-shadow: inset 0 0 0 1px #334155;
}
.nav input {
  position: absolute;
  opacity: 0;
}
.nav label {
  position: relative;
  z-index: 1;
  padding: 10px 0;
  text-align: center;
  color: #94a3b8;
  font: 500 .85rem Inter, sans-serif;
  cursor: pointer;
  transition: color .3s;
}
.nav input:checked + label {
  color: #fff;
}
.pill {
  position: absolute;
  top: 6px;
  left: 6px;
  width: 70px;
  height: calc(100% - 12px);
  border-radius: 999px;
  background: linear-gradient(120deg, #6366f1, #8b5cf6);
  transition: transform .4s cubic-bezier(.65, 0, .25, 1);
}
#n2:checked ~ .pill {
  transform: translateX(70px);
}
#n3:checked ~ .pill {
  transform: translateX(140px);
}
#n4:checked ~ .pill {
  transform: translateX(210px);
}`,
  js: null
},
{
  id: 'float', cat: 'Inputs', title: 'Floating label input', desc: 'The label lifts out of the way when you focus or type.',
  html: `<div class="fl-stage">
  <div class="field">
    <input id="email" type="text" placeholder=" ">
    <label for="email">Email address</label>
  </div>
</div>`,
  css: `.fl-stage {
  display: grid;
  place-items: center;
  min-height: 356px;
  background: #f1f5f9;
}
.field {
  position: relative;
  width: 260px;
}
.field input {
  width: 100%;
  padding: 22px 14px 8px;
  border: 1.5px solid #cbd5e1;
  border-radius: 12px;
  background: #fff;
  color: #0f172a;
  font: 500 1rem Inter,sans-serif;
  outline: 0;
  transition: border-color .2s,box-shadow .2s;
}
.field label {
  position: absolute;
  left: 15px;
  top: 16px;
  color: #64748b;
  font: 400 1rem Inter,sans-serif;
  pointer-events: none;
  transform-origin: left top;
  transition: transform .2s,color .2s;
}
.field input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 4px rgba(79,70,229,.15);
}
.field input:is(:focus, :not(:placeholder-shown)) + label {
  transform: translateY(-10px) scale(.78);
  color: #4f46e5;
}`,
  js: null
},
{
  id: 'tooltip', cat: 'Overlays', title: 'Tooltips', desc: 'Top and bottom placements from one data attribute. Hover or tab to each button.',
  html: `<div class="tip-stage">
  <div class="tip-grid">
    <button class="tip" type="button" data-tip="Save your work">Save</button>
    <button class="tip" type="button" data-tip="Share a link">Share</button>
    <button class="tip bottom" type="button" data-tip="Undo last step">Undo</button>
    <button class="tip bottom" type="button" data-tip="Redo last step">Redo</button>
  </div>
</div>`,
  css: `.tip-stage {
  display: grid;
  place-items: center;
  min-height: 356px;
  padding: 24px;
  background: #f1f5f9;
}
.tip-grid {
  display: grid;
  grid-template-columns: repeat(2,auto);
  gap: 76px 36px;
}
.tip {
  position: relative;
  padding: 14px 26px;
  border: 0;
  border-radius: 12px;
  color: #fff;
  font: 600 1rem Inter,sans-serif;
  background: #111827;
  cursor: pointer;
  box-shadow: 0 5px 0 #080d18,0 9px 18px rgba(15,23,42,.16);
  transition: transform .15s cubic-bezier(.16,1,.3,1),background .2s,box-shadow .15s;
}
.tip:hover {
  background: #312e81;
  box-shadow: 0 5px 0 #211e5c,0 12px 22px rgba(49,46,129,.22);
}
.tip:active {
  transform: translateY(4px) scale(.98);
  box-shadow: 0 1px 0 #080d18,0 3px 8px rgba(15,23,42,.16);
}
.tip::after {
  content: attr(data-tip);
  position: absolute;
  bottom: calc(100% + 12px);
  left: 50%;
  padding: 7px 12px;
  border-radius: 8px;
  white-space: nowrap;
  color: #fff;
  font: 500 .8rem Inter,sans-serif;
  background: #4f46e5;
  opacity: 0;
  transform: translate(-50%,6px);
  transition: opacity .2s,transform .2s;
  pointer-events: none;
}
.tip::before {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -6px;
  border: 6px solid transparent;
  border-top-color: #4f46e5;
  opacity: 0;
  transition: opacity .2s;
}
.tip.bottom::after {
  top: calc(100% + 12px);
  bottom: auto;
  transform: translate(-50%,-6px);
}
.tip.bottom::before {
  top: 100%;
  bottom: auto;
  border-top-color: transparent;
  border-bottom-color: #4f46e5;
}
.tip:is(:hover, :focus-visible)::after {
  opacity: 1;
  transform: translate(-50%,0);
}
.tip:is(:hover, :focus-visible)::before {
  opacity: 1;
}`,
  js: null
},
{
  id: 'pricing', cat: 'Cards', title: 'Pricing cards', desc: 'Two plans that sit side by side and stack on narrow screens, with equal heights and buttons pinned to the bottom.',
  html: `<div class="price-stage">
  <article class="plan">
    <h3>Starter</h3>
    <p class="amount">$0<small>/mo</small></p>
    <ul>
      <li>3 projects</li>
      <li>Community support</li>
      <li>Basic analytics</li>
    </ul>
    <button type="button">Get started</button>
  </article>
  <article class="plan featured">
    <span class="plan-tag">Popular</span>
    <h3>Pro</h3>
    <p class="amount">$19<small>/mo</small></p>
    <ul>
      <li>Unlimited projects</li>
      <li>Priority support</li>
      <li>Custom domains</li>
    </ul>
    <button type="button">Choose Pro</button>
  </article>
</div>`,
  css: `.price-stage {
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
  gap: 16px;
  align-content: center;
  min-height: 356px;
  padding: 24px;
  background: #0f172a;
}
.plan {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 26px;
  border: 2px solid #334155;
  border-radius: 20px;
  color: #e2e8f0;
  font-family: Inter,sans-serif;
  background: #1e293b;
  transition: transform .3s,box-shadow .3s;
}
.plan:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(0,0,0,.35);
}
.plan.featured {
  border-color: transparent;
  background: linear-gradient(#1e293b,#1e293b) padding-box,linear-gradient(135deg,#6366f1,#ec4899) border-box;
}
.plan.featured:hover {
  box-shadow: 0 20px 44px rgba(99,102,241,.4);
}
.plan h3 {
  margin: 0;
  font-size: 1.2rem;
}
.amount {
  margin: 8px 0 16px;
  font-size: 2.4rem;
  font-weight: 700;
}
.amount small {
  color: #94a3b8;
  font-size: .9rem;
  font-weight: 500;
}
.plan ul {
  flex: 1;
  margin: 0 0 22px;
  padding: 0;
  list-style: none;
}
.plan li {
  padding: 6px 0;
  color: #cbd5e1;
  font-size: .9rem;
}
.plan li::before {
  content: "✓ ";
  color: #4ade80;
  font-weight: 700;
}
.plan-tag {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 3px 10px;
  border-radius: 999px;
  color: #fff;
  font-size: .72rem;
  font-weight: 600;
  background: linear-gradient(120deg,#6366f1,#ec4899);
}
.plan button {
  width: 100%;
  padding: 12px;
  border: 1.5px solid #475569;
  border-radius: 12px;
  color: #e2e8f0;
  font: 600 .95rem Inter,sans-serif;
  background: none;
  cursor: pointer;
  transition: transform .2s,background .2s;
}
.plan button:hover {
  background: #334155;
}
.plan.featured button {
  border-color: #fff;
  color: #0f172a;
  background: #fff;
}
.plan.featured button:hover {
  transform: scale(1.03);
  background: #fff;
}`,
  js: null
},
{
  id: 'flip', cat: 'Cards', title: '3D flip card', desc: 'Two faces and a smooth 3D rotation on hover. Pure CSS.',
  html: `<div class="flip-stage">
  <div class="flip">
    <div class="flip-inner">
      <div class="face front"><h3>Hover</h3><p>to see the other side</p></div>
      <div class="face back"><h3>Surprise!</h3><p>Pure CSS 3D flip</p></div>
    </div>
  </div>
</div>`,
  css: `.flip-stage {
  display: grid;
  place-items: center;
  min-height: 356px;
  background: #eef2ff;
}
.flip {
  width: 240px;
  height: 280px;
  perspective: 900px;
}
.flip-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform .7s cubic-bezier(.4,.2,.2,1);
}
.flip:hover .flip-inner {
  transform: rotateY(180deg);
}
.face {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  color: #fff;
  font-family: Inter,sans-serif;
  text-align: center;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  box-shadow: 0 16px 36px rgba(67,56,202,.3);
}
.face h3 {
  margin: 0;
  font-size: 1.5rem;
}
.face p {
  margin: 6px 0 0;
  opacity: .85;
}
.front {
  background: linear-gradient(135deg,#4f46e5,#7c3aed);
}
.back {
  background: linear-gradient(135deg,#ec4899,#f59e0b);
  transform: rotateY(180deg);
}`,
  js: null
},
{
  id: 'burger', cat: 'Navigation', title: 'Mobile menu', desc: 'Navbar with an icon that morphs into a close button while the menu slides open. Pure CSS.',
  html: `<div class="menu-stage">
  <nav class="menu">
    <div class="menu-bar">
      <span class="menu-logo">Acme</span>
      <label class="burger" aria-label="Toggle menu">
        <input type="checkbox">
        <span></span>
        <span></span>
        <span></span>
      </label>
    </div>
    <ul class="menu-list">
      <li><button type="button">Home</button></li>
      <li><button type="button">Products</button></li>
      <li><button type="button">Pricing</button></li>
      <li><button type="button">Contact</button></li>
    </ul>
  </nav>
</div>`,
  css: `.menu-stage {
  display: grid;
  align-items: start;
  justify-items: center;
  min-height: 356px;
  padding: 40px 20px;
  background: #0f172a;
}
.menu {
  width: min(100%,360px);
  overflow: hidden;
  border-radius: 20px;
  background: #1e293b;
  box-shadow: 0 16px 40px rgba(0,0,0,.4);
  font-family: Inter,sans-serif;
}
.menu-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px 12px 22px;
}
.menu-logo {
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
}
.burger {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  width: 46px;
  height: 46px;
  padding: 0 12px;
  border-radius: 14px;
  background: #334155;
  cursor: pointer;
  transition: background .3s;
}
.burger:hover {
  background: #475569;
}
.burger input {
  position: absolute;
  opacity: 0;
}
.burger span {
  display: block;
  height: 3px;
  border-radius: 2px;
  background: #fff;
  transition: transform .35s,opacity .25s;
}
.burger:has(input:checked) span:nth-of-type(1) {
  transform: translateY(9px) rotate(45deg);
}
.burger:has(input:checked) span:nth-of-type(2) {
  opacity: 0;
  transform: scaleX(0);
}
.burger:has(input:checked) span:nth-of-type(3) {
  transform: translateY(-9px) rotate(-45deg);
}
.menu-list {
  max-height: 0;
  margin: 0;
  padding: 0 12px;
  overflow: hidden;
  list-style: none;
  opacity: 0;
  transition: max-height .4s ease,opacity .3s,padding .3s;
}
.menu:has(input:checked) .menu-list {
  max-height: 260px;
  padding: 4px 12px 14px;
  opacity: 1;
}
.menu-list button {
  display: block;
  width: 100%;
  padding: 12px 14px;
  border: 0;
  border-radius: 10px;
  color: #cbd5e1;
  font: 500 .95rem Inter,sans-serif;
  text-align: left;
  background: none;
  cursor: pointer;
  transition: background .2s,color .2s;
}
.menu-list button:hover {
  color: #fff;
  background: #334155;
}`,
  js: null
},
{
  id: 'accordion', cat: 'Layout', title: 'Accordion', desc: 'Native details elements with a plus that turns into a cross.',
  html: `<div class="acc-stage">
  <div class="acc">
    <details open>
      <summary>What is Component Bench?</summary>
      <p>A library of UI elements you can try live and copy.</p>
    </details>
    <details>
      <summary>Do I need a framework?</summary>
      <p>No. Everything is plain HTML and CSS.</p>
    </details>
    <details>
      <summary>Can I change the colors?</summary>
      <p>Yes. Edit the hex values in the CSS.</p>
    </details>
  </div>
</div>`,
  css: `.acc-stage {
  display: grid;
  place-items: center;
  min-height: 356px;
  padding: 20px;
  background: #f1f5f9;
}
.acc {
  width: min(100%,340px);
  overflow: hidden;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 8px 24px rgba(15,23,42,.1);
  font-family: Inter,sans-serif;
}
.acc details {
  border-bottom: 1px solid #e2e8f0;
}
.acc details:last-child {
  border-bottom: 0;
}
.acc summary {
  display: flex;
  justify-content: space-between;
  padding: 16px 18px;
  color: #0f172a;
  font-weight: 600;
  list-style: none;
  cursor: pointer;
}
.acc summary::-webkit-details-marker {
  display: none;
}
.acc summary::after {
  content: "+";
  color: #4f46e5;
  font-size: 1.2rem;
  line-height: 1;
  transition: transform .3s;
}
.acc details[open] summary::after {
  transform: rotate(45deg);
}
.acc p {
  margin: 0;
  padding: 0 18px 16px;
  color: #475569;
  font-size: .9rem;
  line-height: 1.5;
}`,
  js: null
},
{
  id: 'modal', cat: 'Overlays', title: 'Modal dialog', desc: 'Confirmation dialog with a fading backdrop and a springy pop-in. Pure CSS.',
  html: `<div class="modal-stage">
  <input type="checkbox" id="m1" class="modal-toggle">
  <label for="m1" class="open-btn">Open modal</label>
  <div class="overlay">
    <div class="dialog" role="dialog" aria-label="Confirm">
      <h3>Delete project?</h3>
      <p>This action cannot be undone.</p>
      <label for="m1" class="cancel">Cancel</label>
      <label for="m1" class="confirm">Delete</label>
    </div>
  </div>
</div>`,
  css: `.modal-stage {
  display: grid;
  place-items: center;
  min-height: 356px;
  position: relative;
  overflow: hidden;
  font-family: Inter, sans-serif;
  background: #f1f5f9;
}
.modal-toggle {
  position: absolute;
  opacity: 0;
}
.open-btn {
  padding: 13px 26px;
  border-radius: 12px;
  color: #fff;
  font-weight: 600;
  background: #4f46e5;
  cursor: pointer;
  transition: transform .2s;
}
.open-btn:hover {
  transform: translateY(-2px);
}
.overlay {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(15,23,42,.55);
  opacity: 0;
  pointer-events: none;
  transition: opacity .25s;
}
.dialog {
  width: min(86%,300px);
  padding: 24px;
  border-radius: 18px;
  background: #fff;
  text-align: center;
  transform: scale(.9) translateY(10px);
  transition: transform .3s cubic-bezier(.34,1.56,.64,1);
}
.dialog h3 {
  margin: 0 0 6px;
  color: #0f172a;
}
.dialog p {
  margin: 0 0 18px;
  color: #64748b;
  font-size: .9rem;
}
.cancel,.confirm {
  display: inline-block;
  padding: 9px 18px;
  border-radius: 10px;
  font-size: .9rem;
  font-weight: 600;
  cursor: pointer;
}
.cancel {
  margin-right: 8px;
  color: #475569;
  background: #e2e8f0;
}
.confirm {
  color: #fff;
  background: #dc2626;
}
.modal-toggle:checked ~ .overlay {
  opacity: 1;
  pointer-events: auto;
}
.modal-toggle:checked ~ .overlay .dialog {
  transform: none;
}`,
  js: null
},
{
  id: 'spotlight', cat: 'Cards', title: 'Spotlight card', desc: 'A soft light and a glowing edge follow the pointer across the surface.',
  html: `<div class="spot-stage">
  <article class="spot">
    <span class="spot-dot"></span>
    <h3>Spotlight</h3>
    <p>A soft light follows your cursor across the surface and along its border.</p>
    <span class="spot-meta">Move your pointer here</span>
  </article>
</div>`,
  css: `.spot-stage {
  display: grid;
  place-items: center;
  min-height: 356px;
  padding: 24px;
  background: #05070d;
}
.spot {
  position: relative;
  width: min(100%,320px);
  padding: 28px;
  overflow: hidden;
  border: 1px solid #1f2937;
  border-radius: 22px;
  background: #0b0f19;
  color: #e5e7eb;
  font-family: Inter,sans-serif;
}
.spot::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(260px circle at var(--x,50%) var(--y,0%),rgba(99,102,241,.28),transparent 65%);
  opacity: 0;
  transition: opacity .3s;
  pointer-events: none;
}
.spot::after {
  content: "";
  position: absolute;
  inset: 0;
  padding: 1px;
  border-radius: inherit;
  background: radial-gradient(160px circle at var(--x,50%) var(--y,0%),rgba(165,180,252,.9),transparent 70%);
  -webkit-mask: linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  mask-composite: exclude;
  opacity: 0;
  transition: opacity .3s;
  pointer-events: none;
}
.spot:hover::before,.spot:hover::after {
  opacity: 1;
}
.spot-dot {
  display: block;
  width: 34px;
  height: 34px;
  margin-bottom: 16px;
  border-radius: 10px;
  background: linear-gradient(135deg,#6366f1,#22d3ee);
}
.spot h3 {
  margin: 0 0 6px;
  color: #fff;
  font-size: 1.3rem;
}
.spot p {
  margin: 0 0 18px;
  color: #9ca3af;
  font-size: .92rem;
  line-height: 1.55;
}
.spot-meta {
  color: #818cf8;
  font-size: .8rem;
  font-weight: 600;
}`,
  js: initSpotlight
},
{
  id: 'orbit', cat: 'Buttons', title: 'Orbit border button', desc: 'A light orbits the border while the face reacts to hover and press.',
  html: `<div class="orbit-stage">
  <button class="orbit" type="button"><span>Launch</span></button>
</div>`,
  css: `.orbit-stage {
  display: grid;
  place-items: center;
  min-height: 356px;
  background: #05070d;
}
.orbit {
  position: relative;
  overflow: hidden;
  padding: 2px;
  border: 0;
  border-radius: 14px;
  background: none;
  cursor: pointer;
  transition: transform .35s cubic-bezier(.16,1,.3,1);
}
.orbit::before {
  content: "";
  position: absolute;
  inset: -150%;
  background: conic-gradient(from 0deg,transparent 0 70%,#22d3ee,#8b5cf6,transparent);
  animation: orbit-spin 3s linear infinite;
}
.orbit span {
  position: relative;
  display: block;
  padding: 14px 38px;
  border-radius: 12px;
  background: #0b0f19;
  color: #fff;
  font: 600 1rem Inter,sans-serif;
  transition: background .3s;
}
.orbit:hover span {
  background: #151a2b;
}
.orbit:active {
  transform: scale(.96);
}
.orbit:focus-visible {
  outline: 2px solid #a5b4fc;
  outline-offset: 4px;
}
@keyframes orbit-spin {
  to {
    transform: rotate(360deg);
  }
}`,
  js: null
},
{
  id: 'dropdown', cat: 'Overlays', title: 'Dropdown menu', desc: 'Native details element with a springy panel and a destructive action.',
  html: `<div class="dd-stage">
  <details class="dd">
    <summary>Workspace</summary>
    <ul>
      <li><button type="button">Profile</button></li>
      <li><button type="button">Billing</button></li>
      <li><button type="button">Team settings</button></li>
      <li class="danger"><button type="button">Sign out</button></li>
    </ul>
  </details>
</div>`,
  css: `.dd-stage {
  display: grid;
  justify-items: center;
  align-items: start;
  min-height: 356px;
  padding: 64px 24px;
  background: #f1f5f9;
}
.dd {
  position: relative;
  width: 220px;
  font-family: Inter,sans-serif;
}
.dd summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: #fff;
  color: #0f172a;
  font-weight: 600;
  list-style: none;
  cursor: pointer;
  transition: border-color .2s,box-shadow .2s;
}
.dd summary::-webkit-details-marker {
  display: none;
}
.dd summary::after {
  content: "";
  width: 8px;
  height: 8px;
  border: solid #64748b;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg) translate(-2px,-2px);
  transition: transform .3s;
}
.dd[open] summary {
  border-color: #4f46e5;
  box-shadow: 0 0 0 4px rgba(79,70,229,.15);
}
.dd[open] summary::after {
  transform: rotate(-135deg) translate(-2px,-2px);
}
.dd ul {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  margin: 0;
  padding: 6px;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 16px 40px rgba(15,23,42,.16);
  list-style: none;
  animation: dd-in .3s cubic-bezier(.16,1,.3,1);
}
.dd li button {
  width: 100%;
  padding: 10px 12px;
  border: 0;
  border-radius: 9px;
  background: none;
  color: #334155;
  font: 500 .9rem Inter,sans-serif;
  text-align: left;
  cursor: pointer;
  transition: background .15s,color .15s;
}
.dd li button:hover {
  background: #eef2ff;
  color: #4338ca;
}
.dd .danger button {
  color: #dc2626;
}
.dd .danger button:hover {
  background: #fef2f2;
  color: #b91c1c;
}
@keyframes dd-in {
  from {
    opacity: 0;
    transform: translateY(-6px) scale(.97);
  }
}`,
  js: null
},
{
  id: 'range', cat: 'Inputs', title: 'Range slider', desc: 'Custom track with a live fill, a springy thumb and a value readout.',
  html: `<div class="rg-stage">
  <div class="rg">
    <div class="rg-top">
      <label for="vol">Volume</label>
      <output>40</output>
    </div>
    <input id="vol" type="range" min="0" max="100" value="40">
  </div>
</div>`,
  css: `.rg-stage {
  display: grid;
  place-items: center;
  min-height: 356px;
  padding: 24px;
  background: #f1f5f9;
}
.rg {
  width: min(100%,300px);
  font-family: Inter,sans-serif;
}
.rg-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;
  color: #0f172a;
  font-weight: 600;
}
.rg output {
  color: #4f46e5;
  font-variant-numeric: tabular-nums;
}
.rg input {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 999px;
  outline: 0;
  background: linear-gradient(90deg,#6366f1 var(--p,40%),#cbd5e1 var(--p,40%));
  cursor: pointer;
}
.rg input::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 24px;
  height: 24px;
  border: 3px solid #6366f1;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 4px 12px rgba(99,102,241,.45);
  transition: transform .25s cubic-bezier(.34,1.56,.64,1);
}
.rg input::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border: 3px solid #6366f1;
  border-radius: 50%;
  background: #fff;
}
.rg input:active::-webkit-slider-thumb {
  transform: scale(1.2);
}
.rg input:focus-visible {
  outline: 2px solid #4f46e5;
  outline-offset: 6px;
}`,
  js: initRange
},
{
id: 'notice', cat: 'Overlays', title: 'Toast notification', desc: 'A compact success message that slides into view and dismisses itself.',
html: `<div class="notice-stage">
<button class="notice-trigger" type="button">Save changes</button>
<div class="notice" role="status" aria-live="polite" aria-hidden="true">
  <span class="notice-icon" aria-hidden="true">✓</span>
  <span><strong>All set</strong><small>Your changes have been saved.</small></span>
</div>
</div>`,
css: `.notice-stage {
position: relative;
display: grid;
place-items: center;
min-height: 356px;
overflow: hidden;
background: #f1f5f9;
font-family: Inter,sans-serif;
}
.notice-trigger {
padding: 12px 20px;
border: 0;
border-radius: 11px;
background: #4f46e5;
color: #fff;
font: 600 .9rem Inter,sans-serif;
cursor: pointer;
box-shadow: 0 8px 20px rgba(79,70,229,.22);
transition: transform .2s,background .2s,box-shadow .2s;
}
.notice-trigger:hover {
transform: translateY(-2px);
background: #4338ca;
box-shadow: 0 12px 25px rgba(79,70,229,.3);
}
.notice-trigger:active {
transform: scale(.96);
}
.notice-trigger.is-saved {
background: #059669;
box-shadow: 0 0 0 4px rgba(16,185,129,.15);
animation: notice-pop .35s cubic-bezier(.16,1,.3,1);
}
.notice-trigger.is-saved span {
display: inline-block;
animation: notice-check .35s cubic-bezier(.16,1,.3,1);
}
@keyframes notice-pop {
50% { transform: scale(1.06); }
}
@keyframes notice-check {
from { transform: scale(0) rotate(-45deg); }
to { transform: scale(1) rotate(0); }
}
.notice {
position: absolute;
right: 14px;
bottom: 14px;
left: 14px;
display: flex;
align-items: center;
gap: 12px;
padding: 13px 15px;
border: 1px solid #dbe4ee;
border-radius: 14px;
background: #fff;
color: #0f172a;
box-shadow: 0 16px 40px rgba(15,23,42,.14);
opacity: 0;
transform: translateY(12px);
pointer-events: none;
transition: opacity .3s,transform .45s cubic-bezier(.16,1,.3,1);
}
.notice.is-visible {
opacity: 1;
transform: translateY(0);
}
.notice-icon {
display: grid;
width: 30px;
height: 30px;
flex: none;
place-items: center;
border-radius: 50%;
background: #dcfce7;
color: #16a34a;
font-weight: 700;
}
.notice strong,.notice small {
display: block;
}
.notice strong {
font-size: .86rem;
}
.notice small {
margin-top: 2px;
color: #64748b;
font-size: .76rem;
}`,
js: initNotice
},
{
id: 'password', cat: 'Inputs', title: 'Password field', desc: 'A clean password input with an accessible show and hide control.',
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
css: `.password-stage {
display: grid;
place-items: center;
min-height: 356px;
padding: 24px;
background: #f8fafc;
font-family: Inter,sans-serif;
}
.password-field {
display: grid;
width: min(100%,320px);
gap: 9px;
color: #1e293b;
font-size: .85rem;
font-weight: 600;
}
.password-wrap {
display: flex;
align-items: center;
height: 48px;
padding: 0 5px 0 13px;
border: 1px solid #cbd5e1;
border-radius: 12px;
background: #fff;
transition: border-color .2s,box-shadow .2s;
}
.password-wrap:focus-within {
border-color: #6366f1;
box-shadow: 0 0 0 4px rgba(99,102,241,.14);
}
.password-input {
width: 100%;
min-width: 0;
border: 0;
outline: 0;
background: transparent;
color: #0f172a;
font: 500 .95rem Inter,sans-serif;
}
.password-toggle {
padding: 7px 9px;
border: 0;
border-radius: 8px;
background: #eef2ff;
color: #4f46e5;
font: 600 .75rem Inter,sans-serif;
cursor: pointer;
transition: transform .2s,background .2s;
}
.password-toggle:hover {
background: #e0e7ff;
}
.password-toggle:active {
transform: scale(.92);
}
.password-toggle[aria-pressed="true"] {
background: #4f46e5;
color: #fff;
}
.password-field small {
color: #64748b;
font-size: .76rem;
font-weight: 400;
}`,
js: initPassword
},
{
id: 'segmented', cat: 'Inputs', title: 'Billing switcher', desc: 'Switch between monthly and yearly plans with an updating price.',
html: `<div class="billing-stage">
<div class="billing-card">
  <span class="billing-eyebrow">PRO PLAN</span>
  <div class="plan-switch" role="group" aria-label="Billing period">
    <button class="plan-option" type="button" data-price="$12" data-billing="per month, billed monthly" aria-pressed="true">Monthly</button>
    <button class="plan-option" type="button" data-price="$9" data-billing="per month, billed yearly" aria-pressed="false">Yearly <span>−25%</span></button>
  </div>
  <p class="billing-price"><strong class="plan-price">$12</strong><span>/ month</span></p>
  <p class="plan-billing">per month, billed monthly</p>
  <button class="billing-cta" type="button">Choose Pro</button>
</div>
</div>`,
css: `.billing-stage {
display: grid;
place-items: center;
min-height: 356px;
padding: 20px;
background: linear-gradient(145deg,#eef2ff,#f8fafc 55%,#ecfeff);
font-family: Inter,sans-serif;
}
.billing-card {
width: min(100%,320px);
padding: 22px;
border: 1px solid #e2e8f0;
border-radius: 20px;
background: #fff;
box-shadow: 0 18px 45px rgba(30,41,59,.1);
}
.billing-eyebrow {
color: #6366f1;
font-size: .7rem;
font-weight: 800;
letter-spacing: .12em;
}
.plan-switch {
display: flex;
gap: 4px;
margin-top: 16px;
padding: 4px;
border-radius: 11px;
background: #f1f5f9;
}
.plan-option {
flex: 1;
padding: 9px 7px;
border: 0;
border-radius: 8px;
background: transparent;
color: #64748b;
font: 600 .76rem Inter,sans-serif;
cursor: pointer;
transition: transform .2s,background .2s,box-shadow .2s;
}
.skeleton-toggle:hover {
transform: translateY(-2px);
box-shadow: 0 7px 16px rgba(99,102,241,.15);
}
.skeleton-toggle:active {
transform: scale(.96);
}
.skeleton-toggle[aria-pressed="true"] {
background: #dcfce7;
border-color: #a7f3d0;
color: #047857;
}
.plan-option[aria-pressed="true"] {
background: #fff;
color: #312e81;
box-shadow: 0 1px 4px rgba(15,23,42,.12);
}
.plan-option:active {
transform: scale(.96);
}
.plan-price.price-pop {
animation: price-pop .35s cubic-bezier(.16,1,.3,1);
}
@keyframes price-pop {
50% { transform: translateY(-3px) scale(1.06); }
}
.plan-option span {
color: #059669;
font-size: .65rem;
}
.billing-price {
display: flex;
align-items: baseline;
gap: 6px;
margin: 20px 0 0;
color: #64748b;
font-size: .82rem;
}
.billing-price strong {
color: #0f172a;
font-size: 2.4rem;
letter-spacing: -.06em;
}
.plan-billing {
min-height: 18px;
margin: 2px 0 18px;
color: #94a3b8;
font-size: .72rem;
}
.billing-cta {
width: 100%;
padding: 11px;
border: 0;
border-radius: 10px;
background: #4f46e5;
color: #fff;
font: 600 .85rem Inter,sans-serif;
cursor: pointer;
transition: transform .2s,background .2s,box-shadow .2s;
}
.billing-cta:hover {
transform: translateY(-2px);
box-shadow: 0 8px 20px rgba(79,70,229,.22);
}
.billing-cta:active {
transform: scale(.97);
}
.billing-cta.is-selected {
background: #059669;
box-shadow: 0 0 0 4px rgba(16,185,129,.13);
}`,
js: initSegmented
},
{
id: 'stepper', cat: 'Navigation', title: 'Checkout stepper', desc: 'A clear, keyboard-friendly progress indicator for multi-step flows.',
html: `<div class="stepper-stage">
<div class="stepper">
  <div class="step-track" aria-label="Checkout progress">
    <span class="step-point" data-label="Details">1</span>
    <span class="step-point" data-label="Delivery">2</span>
    <span class="step-point" data-label="Payment">3</span>
  </div>
  <p class="step-label" aria-live="polite"></p>
  <div class="step-actions">
    <button class="step-back" type="button">Back</button>
    <button class="step-next" type="button">Continue</button>
  </div>
</div>
</div>`,
css: `.stepper-stage {
display: grid;
place-items: center;
min-height: 356px;
padding: 24px;
background: #f8fafc;
font-family: Inter,sans-serif;
}
.stepper {
width: min(100%,340px);
}
.step-track {
position: relative;
display: flex;
justify-content: space-between;
margin: 0 8px;
}
.step-track::before {
position: absolute;
top: 16px;
right: 16px;
left: 16px;
height: 2px;
background: #e2e8f0;
content: "";
}
.step-point {
z-index: 1;
display: grid;
width: 34px;
height: 34px;
place-items: center;
border: 2px solid #e2e8f0;
border-radius: 50%;
background: #fff;
color: #94a3b8;
font-size: .8rem;
font-weight: 700;
transition: background .25s,border-color .25s,color .25s,transform .25s;
}
.step-point.is-current,.step-point.is-complete {
border-color: #4f46e5;
background: #4f46e5;
color: #fff;
}
.step-point.is-current {
transform: scale(1.12);
box-shadow: 0 0 0 5px rgba(99,102,241,.12);
}
.step-point.is-complete {
animation: step-check .35s cubic-bezier(.16,1,.3,1);
}
@keyframes step-check {
50% { transform: scale(1.18); }
}
.step-label {
min-height: 24px;
margin: 24px 0;
color: #475569;
font-size: .9rem;
font-weight: 600;
text-align: center;
}
.step-actions {
display: flex;
justify-content: space-between;
}
.step-actions button {
padding: 10px 17px;
border: 1px solid #cbd5e1;
border-radius: 10px;
background: #fff;
color: #334155;
font: 600 .8rem Inter,sans-serif;
cursor: pointer;
}
.step-actions .step-next {
border-color: #4f46e5;
background: #4f46e5;
color: #fff;
}
.step-actions button:disabled {
opacity: .45;
cursor: not-allowed;
}`,
js: initStepper
},
{
id: 'checklist', cat: 'Inputs', title: 'Task checklist', desc: 'A satisfying checklist with a live completion meter and progress summary.',
html: `<div class="tasks-stage">
<div class="tasks-card">
  <div class="tasks-heading"><span>Launch checklist</span><span class="task-summary" aria-live="polite"></span></div>
  <progress class="task-progress" max="3" value="1" aria-label="Tasks completed"></progress>
  <label class="task-row"><input class="task-check" type="checkbox" checked><span>Choose a template</span></label>
  <label class="task-row"><input class="task-check" type="checkbox"><span>Customize your colors</span></label>
  <label class="task-row"><input class="task-check" type="checkbox"><span>Publish your page</span></label>
</div>
</div>`,
css: `.tasks-stage {
display: grid;
place-items: center;
min-height: 356px;
padding: 20px;
background: #eef2ff;
font-family: Inter,sans-serif;
}
.tasks-card {
width: min(100%,340px);
padding: 20px;
border: 1px solid #e0e7ff;
border-radius: 18px;
background: #fff;
box-shadow: 0 14px 36px rgba(49,46,129,.1);
}
.tasks-heading {
display: flex;
justify-content: space-between;
gap: 8px;
margin-bottom: 12px;
color: #1e293b;
font-size: .86rem;
font-weight: 700;
}
.task-summary {
color: #6366f1;
font-size: .68rem;
font-weight: 600;
}
.task-progress {
display: block;
width: 100%;
height: 7px;
margin-bottom: 13px;
overflow: hidden;
border: 0;
border-radius: 99px;
background: #e2e8f0;
accent-color: #6366f1;
}
.task-progress::-webkit-progress-bar {
border-radius: 99px;
background: #e2e8f0;
}
.task-progress::-webkit-progress-value {
border-radius: 99px;
background: linear-gradient(90deg,#6366f1,#22d3ee);
transition: width .3s;
}
.task-row {
display: flex;
align-items: center;
gap: 10px;
padding: 11px 0;
border-top: 1px solid #f1f5f9;
color: #475569;
font-size: .78rem;
cursor: pointer;
}
.task-row input {
width: 17px;
height: 17px;
margin: 0;
accent-color: #6366f1;
}
.task-row input:checked + span {
color: #94a3b8;
text-decoration: line-through;
}
.task-row input:checked {
animation: task-check .3s cubic-bezier(.16,1,.3,1);
}
@keyframes task-check {
50% { transform: scale(1.25); }
}`,
js: initChecklist
},
{
id: 'skeleton', cat: 'Layout', title: 'Skeleton loading card', desc: 'A shimmer loading state that smoothly reveals finished profile content.',
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
css: `.skeleton-stage {
display: grid;
align-content: center;
justify-items: center;
gap: 20px;
min-height: 356px;
padding: 24px;
background: #f8fafc;
font-family: Inter,sans-serif;
}
.skeleton-card {
position: relative;
width: min(100%,330px);
height: 94px;
padding: 19px;
overflow: hidden;
border: 1px solid #e2e8f0;
border-radius: 17px;
background: #fff;
box-shadow: 0 12px 30px rgba(15,23,42,.06);
}
.skeleton-loading,.skeleton-content {
position: absolute;
inset: 19px;
display: flex;
align-items: center;
gap: 13px;
transition: opacity .3s,transform .4s;
}
.skeleton-loading {
opacity: 1;
}
.skeleton-avatar,.skeleton-lines i {
display: block;
border-radius: 999px;
background: linear-gradient(100deg,#e2e8f0 25%,#f8fafc 45%,#e2e8f0 65%);
background-size: 220% 100%;
animation: skeleton-shimmer 1.5s ease-in-out infinite;
}
.skeleton-avatar {
width: 48px;
height: 48px;
flex: none;
}
.skeleton-lines {
display: grid;
width: 65%;
gap: 9px;
}
.skeleton-lines i {
height: 10px;
}
.skeleton-lines i:last-child {
width: 65%;
}
.skeleton-content {
opacity: 0;
transform: translateY(8px);
}
.skeleton-content strong,.skeleton-content small {
display: block;
}
.skeleton-content strong {
color: #0f172a;
font-size: .84rem;
}
.skeleton-content small {
margin-top: 4px;
color: #64748b;
font-size: .72rem;
}
.profile-avatar {
display: grid;
width: 48px;
height: 48px;
flex: none;
place-items: center;
border-radius: 50%;
background: linear-gradient(135deg,#c4b5fd,#67e8f9);
color: #312e81;
font-size: .8rem;
font-weight: 800;
}
.profile-check {
margin-left: auto;
color: #4f46e5;
}
.skeleton-card.is-loaded .skeleton-loading {
opacity: 0;
transform: translateY(-8px);
}
.skeleton-card.is-loaded .skeleton-content {
opacity: 1;
transform: translateY(0);
}
.skeleton-toggle {
padding: 9px 15px;
border: 1px solid #c7d2fe;
border-radius: 9px;
background: #eef2ff;
color: #4338ca;
font: 600 .76rem Inter,sans-serif;
cursor: pointer;
}
@keyframes skeleton-shimmer {
to { background-position: -220% 0; }
}`,
js: initSkeleton
},
{
id: 'avatars', cat: 'Cards', title: 'Avatar stack', desc: 'An overlapping team avatar group with a compact member count.',
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
css: `.avatars-stage {
display: grid;
place-items: center;
min-height: 356px;
padding: 20px;
background: radial-gradient(circle at 15% 15%,#e0e7ff,transparent 45%),#f8fafc;
font-family: Inter,sans-serif;
}
.team-card {
display: grid;
grid-template-columns: minmax(0,1fr) auto;
width: min(100%,360px);
gap: 14px 12px;
padding: 20px 18px;
border: 1px solid rgba(255,255,255,.9);
border-radius: 20px;
background: rgba(255,255,255,.82);
box-shadow: 0 18px 45px rgba(49,46,129,.12);
}
.team-avatars {
display: flex;
grid-column: 1/-1;
padding-left: 7px;
}
.team-avatar {
position: relative;
display: grid;
flex: 0 0 36px;
width: 36px;
height: 35px;
margin-left: -7px;
place-items: center;
padding: 0;
border: 2px solid #fff;
border-radius: 50%;
background: linear-gradient(135deg,#c4b5fd,#818cf8);
color: #312e81;
font: 800 .6rem Inter,sans-serif;
cursor: pointer;
box-shadow: 0 2px 5px rgba(15,23,42,.1);
transition: transform .25s cubic-bezier(.16,1,.3,1),box-shadow .25s,filter .25s;
}
.team-avatar:first-child {
margin-left: 0;
}
.team-avatar:nth-child(2) {
background: linear-gradient(135deg,#99f6e4,#2dd4bf);
color: #134e4a;
}
.team-avatar:nth-child(3) {
background: linear-gradient(135deg,#fed7aa,#fb923c);
color: #7c2d12;
}
.team-avatar:nth-child(4) {
background: linear-gradient(135deg,#fbcfe8,#f472b6);
color: #831843;
}
.team-avatar:hover {
z-index: 1;
transform: translateY(-5px) scale(1.08);
box-shadow: 0 7px 13px rgba(49,46,129,.2);
}
.team-avatar:active {
transform: scale(.9);
}
.team-avatar.is-selected {
z-index: 2;
transform: translateY(-4px);
box-shadow: 0 0 0 3px #fff,0 0 0 5px #6366f1;
}
.team-avatar:focus-visible {
z-index: 3;
outline: 2px solid #4f46e5;
outline-offset: 3px;
}
.team-avatar.team-more {
background: #e2e8f0;
color: #475569;
}
.team-copy {
min-width: 0;
}
.team-copy strong,.team-copy small {
display: block;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
}
.team-copy strong {
color: #0f172a;
font-size: .8rem;
}
.team-copy small {
margin-top: 4px;
color: #64748b;
font-size: .66rem;
}
.team-status {
display: flex;
align-items: center;
align-self: center;
gap: 6px;
color: #059669;
font-size: .65rem;
font-weight: 800;
}
.team-status i {
width: 7px;
height: 7px;
border-radius: 50%;
background: #10b981;
box-shadow: 0 0 0 3px #d1fae5;
}`,
js: initAvatars
},
{
id: 'product', cat: 'Cards', title: 'Product purchase card', desc: 'A polished product card with working quantity controls and a live total.',
html: `<div class="product-stage">
<article class="product-card">
  <div class="product-art"><span>STUDIO<br>HEADPHONES</span><i aria-hidden="true"></i></div>
  <div class="product-info">
    <span class="product-tag">BEST SELLER</span>
    <h3>Studio headphones</h3>
    <p>Immersive sound, made for focus.</p>
    <div class="product-buy">
      <div class="quantity-control" aria-label="Quantity">
        <button class="quantity-decrease" type="button" aria-label="Decrease quantity">−</button>
        <output class="product-quantity" data-min="1" data-max="9" aria-live="polite">1</output>
        <button class="quantity-increase" type="button" aria-label="Increase quantity">+</button>
      </div>
      <strong class="product-price" data-unit-price="89">$89.00</strong>
    </div>
    <button class="product-add" type="button">Add 1 to bag</button>
  </div>
</article>
</div>`,
css: `.product-stage {
display: grid;
place-items: center;
min-height: 356px;
padding: 16px;
background: #f1f5f9;
font-family: Inter,sans-serif;
}
.product-card {
display: grid;
grid-template-columns: .85fr 1.15fr;
width: min(100%,470px);
min-height: 250px;
overflow: hidden;
border: 1px solid #e2e8f0;
border-radius: 20px;
background: #fff;
box-shadow: 0 18px 44px rgba(15,23,42,.1);
transition: transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s;
}
.product-card:hover {
transform: translateY(-3px);
box-shadow: 0 23px 50px rgba(15,23,42,.15);
}
.product-art {
position: relative;
display: flex;
align-items: flex-start;
padding: 20px 14px;
overflow: hidden;
background: radial-gradient(circle at 50% 55%,#4f46e5,#312e81 60%,#1e1b4b);
color: rgba(255,255,255,.85);
font-size: .65rem;
font-weight: 800;
letter-spacing: .12em;
line-height: 1.5;
}
.product-art::before,.product-art::after {
position: absolute;
border: 7px solid rgba(255,255,255,.84);
border-radius: 50%;
content: "";
}
.product-art::before {
top: 34%;
left: 23%;
width: 75px;
height: 75px;
box-shadow: 0 0 0 5px rgba(255,255,255,.12),0 12px 25px rgba(0,0,0,.2);
}
.product-art::after {
top: 34%;
right: 15%;
width: 62px;
height: 62px;
border-width: 6px;
box-shadow: 0 0 0 5px rgba(255,255,255,.12),0 12px 25px rgba(0,0,0,.2);
}
.product-art i {
position: absolute;
top: 31%;
left: 40%;
width: 30%;
height: 46%;
border-top: 5px solid rgba(255,255,255,.84);
border-radius: 50% 50% 0 0;
}
.product-info {
align-self: center;
padding: 17px;
}
.product-tag {
color: #6366f1;
font-size: .58rem;
font-weight: 800;
letter-spacing: .1em;
}
.product-info h3 {
margin: 8px 0 4px;
color: #0f172a;
font-size: .95rem;
letter-spacing: -.03em;
}
.product-info p {
margin: 0;
color: #64748b;
font-size: .68rem;
}
.product-buy {
display: flex;
align-items: center;
justify-content: space-between;
gap: 6px;
margin: 14px 0 12px;
}
.quantity-control {
display: flex;
align-items: center;
gap: 9px;
padding: 3px;
border: 1px solid #e2e8f0;
border-radius: 9px;
}
.quantity-control button {
width: 23px;
height: 23px;
border: 0;
border-radius: 6px;
background: #f1f5f9;
color: #334155;
font-size: .9rem;
cursor: pointer;
transition: transform .18s,background .18s,color .18s;
}
.quantity-control button:not(:disabled):hover {
transform: scale(1.08);
background: #e0e7ff;
color: #4338ca;
}
.quantity-control button:not(:disabled):active {
transform: scale(.9);
}
.quantity-pop {
animation: quantity-pop .28s cubic-bezier(.16,1,.3,1);
}
@keyframes quantity-pop {
50% { transform: scale(1.3); }
}
.price-pop {
animation: price-pop .32s cubic-bezier(.16,1,.3,1);
}
@keyframes price-pop {
50% { transform: translateY(-2px) scale(1.08); }
}
.quantity-control button:disabled {
opacity: .4;
cursor: not-allowed;
}
.step-actions button:not(:disabled):hover {
transform: translateY(-2px);
box-shadow: 0 6px 15px rgba(15,23,42,.1);
}
.step-actions button:not(:disabled):active {
transform: scale(.96);
}
.product-quantity {
min-width: 12px;
color: #0f172a;
font-size: .75rem;
text-align: center;
}
.product-price {
color: #0f172a;
font-size: .85rem;
font-variant-numeric: tabular-nums;
}
.product-add {
width: 100%;
padding: 10px 6px;
border: 0;
border-radius: 9px;
background: #0f172a;
color: #fff;
font: 600 .7rem Inter,sans-serif;
cursor: pointer;
transition: background .2s,transform .2s;
}
.product-add:hover {
transform: translateY(-1px);
background: #4f46e5;
}
.product-add.is-added {
background: #059669;
box-shadow: 0 0 0 4px rgba(16,185,129,.13);
animation: add-pop .35s cubic-bezier(.16,1,.3,1);
}
@keyframes add-pop {
50% { transform: scale(1.04); }
}
@media (max-width:420px) {
.product-card {
  grid-template-columns: 1fr;
}
.product-art {
  min-height: 105px;
}
.product-art::before,.product-art::after {
  top: 30%;
}
.product-info {
  padding: 14px;
}
}`,
js: initProduct
},
{
id: 'goal', cat: 'Layout', title: 'Goal progress ring', desc: 'A bold circular progress indicator with a button to move the goal forward.',
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
css: `.goal-stage {
display: grid;
place-items: center;
min-height: 356px;
padding: 18px;
background: linear-gradient(145deg,#eef2ff,#f8fafc 60%,#ecfeff);
font-family: Inter,sans-serif;
}
.goal-card {
display: grid;
justify-items: center;
width: min(100%,260px);
padding: 20px;
border: 1px solid rgba(255,255,255,.9);
border-radius: 22px;
background: rgba(255,255,255,.88);
box-shadow: 0 18px 45px rgba(49,46,129,.12);
}
.goal-caption {
color: #818cf8;
font-size: .62rem;
font-weight: 800;
letter-spacing: .14em;
}
.goal-ring {
display: grid;
width: 118px;
height: 118px;
margin: 14px 0;
place-items: center;
border-radius: 50%;
background: conic-gradient(#6366f1 var(--progress,65%),#e2e8f0 0);
transition: background .55s cubic-bezier(.16,1,.3,1),filter .3s;
}
.goal-ring.goal-progress {
filter: drop-shadow(0 0 8px rgba(99,102,241,.28));
}
.goal-ring::before {
position: absolute;
width: 94px;
height: 94px;
border-radius: 50%;
background: #fff;
content: "";
}
.goal-value {
z-index: 1;
color: #312e81;
font-size: 1.55rem;
font-weight: 800;
letter-spacing: -.06em;
font-variant-numeric: tabular-nums;
}
.goal-pop {
animation: goal-pop .35s cubic-bezier(.16,1,.3,1);
}
@keyframes goal-pop {
50% { transform: scale(1.2); }
}
.goal-card strong {
color: #1e293b;
font-size: .88rem;
}
.goal-card small {
margin: 4px 0 14px;
color: #64748b;
font-size: .68rem;
}
.goal-add {
padding: 8px 14px;
border: 0;
border-radius: 9px;
background: #eef2ff;
color: #4338ca;
font: 600 .72rem Inter,sans-serif;
cursor: pointer;
transition: transform .2s,background .2s,color .2s,box-shadow .2s;
}
.goal-add:hover:not(:disabled) {
transform: translateY(-2px);
background: #4f46e5;
color: #fff;
box-shadow: 0 7px 17px rgba(79,70,229,.22);
}
.goal-add:active:not(:disabled) {
transform: scale(.95);
}
.goal-add:disabled {
opacity: .5;
cursor: not-allowed;
}`,
js: initGoal
},
{
id: 'music', cat: 'Cards', title: 'Mini music player', desc: 'A compact player with a tactile play state and animated equalizer bars.',
html: `<div class="music-stage">
<article class="music-player">
  <div class="music-art" aria-hidden="true"><span>✦</span></div>
  <div class="music-details">
    <span class="music-status" aria-live="polite">Ready to play</span>
    <strong>Midnight City</strong>
    <small>M83 · Hurry Up, We're Dreaming</small>
    <div class="music-equalizer" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
  </div>
  <button class="music-toggle" type="button" aria-label="Play preview">&#9654;</button>
</article>
</div>`,
css: `.music-stage {
display: grid;
place-items: center;
min-height: 356px;
padding: 20px;
background: radial-gradient(circle at 85% 15%,rgba(124,58,237,.35),transparent 40%),#0b1020;
font-family: Inter,sans-serif;
}
.music-player {
display: flex;
align-items: center;
width: min(100%,420px);
gap: 14px;
padding: 14px;
border: 1px solid rgba(255,255,255,.1);
border-radius: 19px;
background: rgba(255,255,255,.07);
color: #fff;
box-shadow: 0 20px 55px rgba(0,0,0,.3),inset 0 1px rgba(255,255,255,.08);
-webkit-backdrop-filter: blur(14px);
backdrop-filter: blur(14px);
}
.music-art {
display: grid;
width: 66px;
height: 66px;
flex: none;
place-items: center;
border-radius: 13px;
background: radial-gradient(circle at 30% 25%,#f0abfc,#8b5cf6 40%,#1d4ed8);
box-shadow: inset 0 0 24px rgba(255,255,255,.2);
}
.music-art span {
color: rgba(255,255,255,.9);
font-size: 1.65rem;
text-shadow: 0 3px 15px rgba(30,27,75,.5);
}
.music-details {
min-width: 0;
flex: 1;
}
.music-status,.music-details strong,.music-details small {
display: block;
}
.music-status {
margin-bottom: 4px;
color: #a5b4fc;
font-size: .6rem;
font-weight: 700;
letter-spacing: .06em;
text-transform: uppercase;
}
.music-details strong {
overflow: hidden;
font-size: .85rem;
text-overflow: ellipsis;
white-space: nowrap;
}
.music-details small {
overflow: hidden;
margin-top: 3px;
color: #94a3b8;
font-size: .66rem;
text-overflow: ellipsis;
white-space: nowrap;
}
.music-equalizer {
display: flex;
align-items: end;
height: 13px;
gap: 3px;
margin-top: 8px;
}
.music-equalizer i {
width: 3px;
height: 4px;
border-radius: 3px;
background: #818cf8;
}
.music-player.is-playing .music-equalizer i {
animation: music-bars .55s ease-in-out infinite alternate;
}
.music-player.is-playing .music-equalizer i:nth-child(2) {
animation-delay: -.35s;
}
.music-player.is-playing .music-equalizer i:nth-child(3) {
animation-delay: -.15s;
}
.music-player.is-playing .music-equalizer i:nth-child(4) {
animation-delay: -.45s;
}
.music-player.is-playing .music-equalizer i:nth-child(5) {
animation-delay: -.25s;
}
.music-toggle {
display: grid;
width: 40px;
height: 40px;
flex: none;
place-items: center;
border: 0;
border-radius: 50%;
background: #fff;
color: #312e81;
font-size: .85rem;
cursor: pointer;
transition: transform .2s,background .2s;
}
.music-toggle:hover {
transform: scale(1.08);
background: #e0e7ff;
}
.music-toggle:active {
  transform: scale(.92);
}
.music-pop {
  animation: music-pop .32s cubic-bezier(.16,1,.3,1);
}
@keyframes music-pop {
  50% { transform: scale(1.14); }
}
@keyframes music-bars {
to { height: 13px; }
}`,
js: initMusic
}
];

/* ---------- Syntax highlighting ---------- */
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function hlHTML(s) {
  return esc(s).replace(/(&lt;\/?)([\w-]+)((?:[^&]|&(?!gt;))*?)(\/?&gt;)/g, (m, a, b, c, d) =>
    '<span class="p">' + a + '</span><span class="tg">' + b + '</span>' +
    c.replace(/([\w:-]+)(=)("[^"]*")/g, '<span class="at">$1</span>$2<span class="st">$3</span>') +
    '<span class="p">' + d + '</span>');
}
function hlCSS(s) {
  return esc(s).split('\n').map((l) => {
    if (/^\s*\/\*/.test(l)) return '<span class="c">' + l + '</span>';
    if (/\{\s*$/.test(l)) return '<span class="sel">' + l.replace(/\s*\{\s*$/, '') + '</span> {';
    const m = l.match(/^(\s*)([\w-]+)(:\s*)(.*)$/);
    if (!m) return l;
    const v = m[4].replace(/(#[0-9a-fA-F]{3,8}\b)|(-?\d*\.?\d+(?:px|%|s|ms|deg|em|rem)?)|("[^"]*")/g, (x, h, n, q) =>
      q ? '<span class="st">' + x + '</span>' : '<span class="nm">' + x + '</span>');
    return m[1] + '<span class="pr">' + m[2] + '</span>' + m[3] + v;
  }).join('\n');
}
function hlJS(s) {
  return esc(s).replace(/(\/\/.*$)|('[^']*'|"[^"]*")|\b(const|let|function|if|return|new|true|false)\b|\b(\d+\.?\d*)\b/gm,
    (x, c, st, kw, n) => c ? '<span class="c">' + x + '</span>' : st ? '<span class="st">' + x + '</span>'
      : kw ? '<span class="kw">' + x + '</span>' : '<span class="nm">' + x + '</span>');
}
const HL = { HTML: hlHTML, CSS: hlCSS, JS: hlJS };

/* ---------- Clipboard ---------- */
async function copyText(t) {
  try { await navigator.clipboard.writeText(t); return true; } catch (e) {}
  try {
    const ta = document.createElement('textarea');
    ta.value = t; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    const ok = document.execCommand('copy');
    ta.remove(); return ok;
  } catch (e) { return false; }
}

/* ---------- Icons ---------- */
const svg = (d) => '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>';
const IC = {
  save: svg('<path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"/>'),
  copy: svg('<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/>'),
  replay: svg('<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/>'),
  download: svg('<path d="M12 4v11"/><path d="m7 11 5 5 5-5"/><path d="M5 20h14"/>'),
  desk: svg('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>'),
  tab: svg('<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M11 18h2"/>'),
  mob: svg('<rect x="8" y="3" width="8" height="18" rx="2"/><path d="M11 18h2"/>'),
  check: svg('<path d="m5 12 5 5 9-10"/>'),
  sun: svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
  moon: svg('<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>')
};

/* ---------- State and helpers ---------- */
const list = document.getElementById('list');
const toc = document.getElementById('toc');
const qEl = document.getElementById('q');
const emptyEl = document.getElementById('empty');
const favBtn = document.getElementById('favbtn');
const favCount = document.getElementById('favcount');
const toastEl = document.getElementById('toast');
const state = { cat: 'All', q: '' };
let favs = new Set();
try { favs = new Set(JSON.parse(localStorage.getItem('bench-fav') || '[]')); } catch (e) {}
function saveFavs() { try { localStorage.setItem('bench-fav', JSON.stringify([...favs])); } catch (e) {} }

let toastT;
function toast(m) {
  toastEl.innerHTML = IC.check + '<span></span>';
  toastEl.querySelector('span').textContent = m;
  toastEl.classList.add('on');
  clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('on'), 2000);
}
function burst(btn) {
  for (let i = 0; i < 10; i++) {
    const p = document.createElement('i'); p.className = 'spark';
    const a = (Math.PI * 2 * i) / 10 + Math.random() * 0.5, d = 22 + Math.random() * 16;
    p.style.setProperty('--dx', Math.cos(a) * d + 'px'); p.style.setProperty('--dy', Math.sin(a) * d + 'px');
    btn.appendChild(p); setTimeout(() => p.remove(), 700);
  }
}
function paintStars() {
  list.querySelectorAll('.item').forEach((s) => {
    const on = favs.has(s.dataset.id), b = s.querySelector('.star');
    b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); b.dataset.tip = on ? 'Saved' : 'Save';
  });
  favCount.textContent = favs.size; favCount.classList.toggle('has', favs.size > 0);
  const st = document.getElementById('stats'); st.innerHTML = '';
  [ITEMS.length + ' components', new Set(ITEMS.map((i) => i.cat)).size + ' categories', favs.size + ' saved'].forEach((t) => {
    const e = document.createElement('span'); e.textContent = t; st.appendChild(e);
  });
}
function apply() {
  let n = 0;
  list.querySelectorAll('.item').forEach((s) => {
    const inCat = state.cat === 'All' || (state.cat === 'Favorites' ? favs.has(s.dataset.id) : s.dataset.cat === state.cat);
    const ok = inCat && s.dataset.q.includes(state.q);
    s.hidden = !ok; if (ok) n++;
  });
  emptyEl.hidden = n > 0;
}
function setCat(c) {
  state.cat = c;
  toc.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x.textContent === c)));
  favBtn.classList.toggle('on', c === 'Favorites');
  apply();
}
function download(it, files) {
  const js = files.JS ? '<script>\n' + files.JS + '\n<\/script>\n' : '';
  const doc = '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>' + it.title + '</title>\n<style>\nbody{margin:0}\n' + files.CSS + '\n</style>\n</head>\n<body>\n' + files.HTML + '\n' + js + '</body>\n</html>\n';
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([doc], { type: 'text/html' }));
  a.download = it.id + '.html'; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

/* ---------- Build the cards ---------- */
const SPANS = ['w7', 'w5', 'w5', 'w7'];
ITEMS.forEach((it, i) => {
  const files = { HTML: it.html, CSS: it.css };
  if (it.js) files.JS = it.js.toString() + '\n\n' + it.js.name + '();';
  const tabs = Object.keys(files);
  let active = 'HTML';

  const sec = document.createElement('section');
  sec.className = 'item ' + SPANS[i % 4]; sec.id = it.id;
  sec.dataset.id = it.id; sec.dataset.cat = it.cat;
  sec.dataset.q = (it.title + ' ' + it.desc + ' ' + it.cat).toLowerCase();
  sec.innerHTML =
    '<div class="meta"><h2></h2><p class="d"></p></div>' +
    '<div class="win">' +
      '<div class="win-bar"><span class="lights"><i></i><i></i><i></i></span><span class="win-title"></span>' +
        '<div class="seg" role="group" aria-label="Preview size"><span class="seg-pill"></span>' +
          '<button type="button" data-w="100%" aria-pressed="true" aria-label="Desktop">' + IC.desk + '</button>' +
          '<button type="button" data-w="420px" aria-pressed="false" aria-label="Tablet">' + IC.tab + '</button>' +
          '<button type="button" data-w="300px" aria-pressed="false" aria-label="Mobile">' + IC.mob + '</button>' +
        '</div></div>' +
      '<div class="pstage"><div class="host"></div></div>' +
      '<div class="deck">' +
        '<button class="ic star" type="button" data-tip="Save" aria-label="Save component">' + IC.save + '</button>' +
        '<button class="ic copyall" type="button" data-tip="Copy all" aria-label="Copy HTML, CSS and JS">' + IC.copy + '</button>' +
        '<button class="ic replay" type="button" data-tip="Replay" aria-label="Replay preview">' + IC.replay + '</button>' +
        '<button class="ic dl" type="button" data-tip="Download .html" aria-label="Download as HTML file">' + IC.download + '</button>' +
      '</div>' +
    '</div>' +
    '<div class="code"><div class="bar"><div class="tabs" role="tablist"><span class="glide"></span></div>' +
      '<div class="bar-r"><button class="chip edit" type="button" aria-pressed="false">Edit</button><button class="chip reset" type="button" hidden>Reset</button><button class="copy" type="button"></button></div></div>' +
      '<pre><code></code></pre><textarea class="editor" spellcheck="false" aria-label="Edit code" hidden></textarea></div>';
  const h2 = sec.querySelector('h2'); h2.textContent = it.title;
  const bd = document.createElement('span'); bd.className = 'badge'; bd.textContent = it.cat; h2.appendChild(bd);
  sec.querySelector('.d').textContent = it.desc;
  sec.querySelector('.win-title').textContent = it.id + '.html';
  list.appendChild(sec);

  // Live preview in a shadow root so the snippet CSS is exactly what renders
  const host = sec.querySelector('.host');
  const shadow = host.attachShadow({ mode: 'open' });
  const mount = () => {
    shadow.innerHTML = '<style>:host{display:flex;flex-direction:column}*{box-sizing:border-box}style~*{flex:1}' + files.CSS + '</style>' + files.HTML;
    if (it.js) { try { it.js(shadow); } catch (e) {} }
  };
  mount();

  // Viewport switch with a sliding pill
  const seg = sec.querySelector('.seg');
  seg.querySelectorAll('button').forEach((b, idx) => b.addEventListener('click', () => {
    seg.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    seg.style.setProperty('--i', idx);
    host.style.maxWidth = b.dataset.w;
  }));

  // Code tabs with a gliding underline
  const tabBox = sec.querySelector('.tabs');
  const glide = sec.querySelector('.glide');
  const codeEl = sec.querySelector('code');
  codeEl.parentNode.tabIndex = 0; codeEl.parentNode.setAttribute('aria-label', it.title + ' code');
  const copyBtn = sec.querySelector('.copy');
  copyBtn.innerHTML = IC.copy + '<span>Copy</span>';
  function moveGlide() {
    const b = tabBox.querySelector('[aria-selected="true"]'); if (!b) return;
    glide.style.setProperty('--x', b.offsetLeft + 'px'); glide.style.setProperty('--w', b.offsetWidth + 'px');
  }
  sec._glide = moveGlide;
  function show() {
    codeEl.innerHTML = HL[active](files[active]).split('\n').map((l) => '<span class="ln">' + l + '</span>').join('');
    tabBox.querySelectorAll('.tab').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.t === active)));
    if (editing && editor.value !== files[active]) editor.value = files[active];
    if (editing) editor.readOnly = active === 'JS';
    moveGlide();
  }
  tabs.forEach((t) => {
    const b = document.createElement('button');
    b.className = 'tab'; b.type = 'button'; b.dataset.t = t; b.setAttribute('role', 'tab'); b.textContent = t;
    b.addEventListener('click', () => { active = t; show(); });
    tabBox.appendChild(b);
  });
  copyBtn.addEventListener('click', async () => {
    const ok = await copyText(files[active]);
    if (!ok) { toast('Copy failed. Select the code instead.'); return; }
    copyBtn.classList.remove('ok'); void copyBtn.offsetWidth; copyBtn.classList.add('ok');
    copyBtn.innerHTML = IC.check + '<span>Copied</span>'; burst(copyBtn);
    setTimeout(() => { copyBtn.classList.remove('ok'); copyBtn.innerHTML = IC.copy + '<span>Copy</span>'; }, 1600);
  });

  // Playground: edit the code and the preview re-renders live
  const orig = { ...files };
  const editor = sec.querySelector('.editor');
  const editBtn = sec.querySelector('.edit');
  const resetBtn = sec.querySelector('.reset');
  const pre = codeEl.parentNode;
  let editing = false;
  const dirty = () => tabs.some((t) => files[t] !== orig[t]);
  function syncEdit() {
    pre.hidden = editing; editor.hidden = !editing;
    editBtn.setAttribute('aria-pressed', String(editing)); editBtn.textContent = editing ? 'Done' : 'Edit';
    resetBtn.hidden = !dirty(); sec.classList.toggle('is-edited', dirty());
    show();
  }
  editBtn.addEventListener('click', () => { editing = !editing; syncEdit(); if (editing) editor.focus(); });
  resetBtn.addEventListener('click', () => { Object.assign(files, orig); mount(); syncEdit(); toast('Reset to the original code'); });
  editor.addEventListener('input', () => {
    files[active] = editor.value;
    if (active !== 'JS') mount();
    resetBtn.hidden = !dirty(); sec.classList.toggle('is-edited', dirty());
    show();
  });
  editor.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    e.preventDefault();
    editor.setRangeText('  ', editor.selectionStart, editor.selectionEnd, 'end');
    editor.dispatchEvent(new Event('input'));
  });
  tabBox.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const bs = [...tabBox.querySelectorAll('.tab')], i = bs.findIndex((b) => b.dataset.t === active);
    const n = bs[(i + (e.key === 'ArrowRight' ? 1 : bs.length - 1)) % bs.length];
    n.click(); n.focus();
  });

  // Action deck
  sec.querySelector('.star').addEventListener('click', () => {
    if (favs.has(it.id)) favs.delete(it.id); else favs.add(it.id);
    saveFavs(); paintStars(); apply();
    toast(favs.has(it.id) ? 'Saved to your list' : 'Removed from your list');
  });
  sec.querySelector('.replay').addEventListener('click', mount);
  sec.querySelector('.dl').addEventListener('click', () => { download(it, files); toast('Downloaded ' + it.id + '.html'); });
  sec.querySelector('.copyall').addEventListener('click', async () => {
    const all = files.HTML + '\n\n<style>\n' + files.CSS + '\n</style>' + (files.JS ? '\n\n<script>\n' + files.JS + '\n<\/script>' : '');
    toast((await copyText(all)) ? 'Copied HTML, CSS and JS' : 'Copy failed. Select the code instead.');
  });

  // Cursor-tracking glow
  sec.addEventListener('pointermove', (e) => {
    const r = sec.getBoundingClientRect();
    sec.style.setProperty('--mx', (e.clientX - r.left) + 'px'); sec.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });
  show();
});
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => list.querySelectorAll('.item').forEach((s) => s._glide && s._glide()));

/* ---------- Search and filters ---------- */
['All', ...new Set(ITEMS.map((i) => i.cat)), 'Favorites'].forEach((c) => {
  const b = document.createElement('button');
  b.type = 'button'; b.textContent = c; b.setAttribute('aria-pressed', String(c === 'All'));
  b.addEventListener('click', () => setCat(c));
  toc.appendChild(b);
});
favBtn.addEventListener('click', () => setCat(state.cat === 'Favorites' ? 'All' : 'Favorites'));
qEl.addEventListener('input', () => { state.q = qEl.value.trim().toLowerCase(); apply(); });
document.addEventListener('keydown', (e) => {
  const typing = /^(INPUT|TEXTAREA|SELECT)$/.test((e.composedPath()[0] || {}).tagName || '');
  if (((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') || (e.key === '/' && !typing)) { e.preventDefault(); qEl.focus(); qEl.select(); }
  if (e.key === 'Escape' && document.activeElement === qEl) { qEl.value = ''; state.q = ''; apply(); qEl.blur(); }
});
paintStars(); apply();
emptyEl.innerHTML = 'No components match. <button class="chip clear" type="button">Clear filters</button>';
emptyEl.querySelector('.clear').addEventListener('click', () => { qEl.value = ''; state.q = ''; setCat('All'); });
if (location.hash.length > 1) { const t = document.getElementById(decodeURIComponent(location.hash.slice(1))); if (t) setTimeout(() => t.scrollIntoView({ block: 'start' }), 60); }

/* ---------- Theme (dark by default) ---------- */
const root = document.documentElement;
const themeBtn = document.getElementById('theme');
try { const t = localStorage.getItem('bench-theme'); if (t) root.setAttribute('data-theme', t); } catch (e) {}
function paintTheme() {
  const dark = root.getAttribute('data-theme') !== 'light';
  themeBtn.innerHTML = dark ? IC.sun : IC.moon;
  themeBtn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
}
themeBtn.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  try { localStorage.setItem('bench-theme', next); } catch (e) {}
  paintTheme();
});
paintTheme();

/* ---------- Scroll motion ---------- */
const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const scrollProgress = document.querySelector('.scroll-progress');
const dock = document.querySelector('.dock');
let scrollFrame = 0;
function updateScrollMotion() {
  scrollFrame = 0;
  const range = document.documentElement.scrollHeight - window.innerHeight;
  const progress = range > 0 ? window.scrollY / range : 0;
  document.documentElement.style.setProperty('--scroll-progress', String(progress));
  document.documentElement.style.setProperty('--hero-parallax', Math.min(window.scrollY * 0.12, 90) + 'px');
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
