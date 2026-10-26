
const component = {
  id: 'neo',
  cat: 'Buttons',
  title: 'Neumorphic button',
  desc: 'Raised at rest, pressed into the surface on click. Pure CSS.',
  html: `<div class="neo-stage">
  <button class="neo-btn" type="button">Press me</button>
</div>`,
  cssUrl: new URL('./styles.css', import.meta.url),
  js: null
};

export default component;
