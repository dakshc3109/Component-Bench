
const component = {
  id: 'burger',
  cat: 'Navigation',
  title: 'Mobile menu',
  desc: 'Navbar with an icon that morphs into a close button while the menu slides open. Pure CSS.',
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
  cssUrl: new URL('./styles.css', import.meta.url),
  js: null
};

export default component;
