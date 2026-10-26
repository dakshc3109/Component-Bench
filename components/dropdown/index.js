
const component = {
  id: 'dropdown',
  cat: 'Overlays',
  title: 'Dropdown menu',
  desc: 'Native details element with a springy panel and a destructive action.',
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
  cssUrl: new URL('./styles.css', import.meta.url),
  js: null
};

export default component;
