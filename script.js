/* ---------- Component logic (shown in the JS tab, also runs the preview) ---------- */
function initTilt(root = document) {
  const card = root.querySelector('.glass-card');
  card.addEventListener('pointermove', (e) => {
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
  padding: 32px;
  overflow: hidden;
  perspective: 900px;
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
  width: 270px;
  padding: 28px;
  border-radius: 22px;
  color: #fff;
  font-family: Inter, sans-serif;
  background: rgba(255, 255, 255, .14);
  border: 1px solid rgba(255, 255, 255, .35);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
  box-shadow: 0 24px 48px rgba(0, 0, 0, .28);
  transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  transition: transform .15s ease-out;
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
  transition: background .2s;
}
.tip:hover {
  background: #312e81;
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
      '<button class="copy" type="button"></button></div><pre><code></code></pre></div>';
  const h2 = sec.querySelector('h2'); h2.textContent = it.title;
  const bd = document.createElement('span'); bd.className = 'badge'; bd.textContent = it.cat; h2.appendChild(bd);
  sec.querySelector('.d').textContent = it.desc;
  sec.querySelector('.win-title').textContent = it.id + '.html';
  list.appendChild(sec);

  // Live preview in a shadow root so the snippet CSS is exactly what renders
  const host = sec.querySelector('.host');
  const shadow = host.attachShadow({ mode: 'open' });
  const mount = () => {
    shadow.innerHTML = '<style>:host{display:flex;flex-direction:column}*{box-sizing:border-box}style~*{flex:1}' + it.css + '</style>' + it.html;
    if (it.js) it.js(shadow);
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
