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
  css: '', js: initTilt
},

{
  id: 'neo', cat: 'Buttons', title: 'Neumorphic button', desc: 'Raised at rest, pressed into the surface on click. Pure CSS.',
  html: `<div class="neo-stage">
  <button class="neo-btn" type="button">Press me</button>
</div>`,
  css: '', js: null
},

{
  id: 'shine', cat: 'Buttons', title: 'Shine gradient button', desc: 'Gradient button with a light sweep on hover and a pressed state.',
  html: `<div class="shine-stage">
  <button class="shine-btn" type="button">Get started</button>
</div>`,
  css: '', js: null
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
  css: '', js: null
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
  css: '', js: null
},

{
  id: 'float', cat: 'Inputs', title: 'Floating label input', desc: 'The label lifts out of the way when you focus or type.',
  html: `<div class="fl-stage">
  <div class="field">
    <input id="email" type="text" placeholder=" ">
    <label for="email">Email address</label>
  </div>
</div>`,
  css: '', js: null
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
  css: '', js: null
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
  css: '', js: null
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
  css: '', js: null
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
  css: '', js: null
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
  css: '', js: null
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
  css: '', js: null
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
  css: '', js: initSpotlight
},

{
  id: 'orbit', cat: 'Buttons', title: 'Orbit border button', desc: 'A light orbits the border while the face reacts to hover and press.',
  html: `<div class="orbit-stage">
  <button class="orbit" type="button"><span>Launch</span></button>
</div>`,
  css: '', js: null
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
  css: '', js: null
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
  css: '', js: initRange
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
  css: '', js: initNotice
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
  css: '', js: initPassword
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
  css: '', js: initSegmented
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
  css: '', js: initStepper
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
  css: '', js: initChecklist
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
  css: '', js: initSkeleton
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
  css: '', js: initAvatars
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
  css: '', js: initProduct
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
  css: '', js: initGoal
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
  css: '', js: initMusic
}
];

const stylesheetResponse = await fetch(new URL('styles.css', import.meta.url));
if (!stylesheetResponse.ok) {
  throw new Error('Unable to load component styles: ' + stylesheetResponse.status);
}
const stylesheetText = await stylesheetResponse.text();
ITEMS.forEach((item) => {
  const startMarker = '/* component-css:' + item.id + ':start */';
  const endMarker = '/* component-css:' + item.id + ':end */';
  const start = stylesheetText.indexOf(startMarker);
  const end = stylesheetText.indexOf(endMarker, start + startMarker.length);
  if (start === -1 || end === -1) {
    throw new Error('Missing component CSS block for "' + item.id + '" in styles.css');
  }
  item.css = stylesheetText.slice(start + startMarker.length, end).trim();
});

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
