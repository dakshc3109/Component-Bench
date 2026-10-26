
const component = {
  id: 'shine',
  cat: 'Buttons',
  title: 'Shine gradient button',
  desc: 'Gradient button with a light sweep on hover and a pressed state.',
  html: `<div class="shine-stage">
  <button class="shine-btn" type="button">Get started</button>
</div>`,
  cssUrl: new URL('./styles.css', import.meta.url),
  js: null
};

export default component;
