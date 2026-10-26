
const component = {
  id: 'switch',
  cat: 'Inputs',
  title: 'Toggle switch',
  desc: 'Accessible checkbox switch with a springy thumb. Pure CSS.',
  html: `<div class="sw-stage">
  <label class="switch">
    <input type="checkbox" checked>
    <span class="track"><span class="thumb"></span></span>
    <span>Notifications</span>
  </label>
</div>`,
  cssUrl: new URL('./styles.css', import.meta.url),
  js: null
};

export default component;
