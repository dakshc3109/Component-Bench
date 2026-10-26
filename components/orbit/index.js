
const component = {
  id: 'orbit',
  cat: 'Buttons',
  title: 'Orbit border button',
  desc: 'A light orbits the border while the face reacts to hover and press.',
  html: `<div class="orbit-stage">
  <button class="orbit" type="button"><span>Launch</span></button>
</div>`,
  cssUrl: new URL('./styles.css', import.meta.url),
  js: null
};

export default component;
