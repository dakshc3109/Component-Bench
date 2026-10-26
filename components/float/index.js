
const component = {
  id: 'float',
  cat: 'Inputs',
  title: 'Floating label input',
  desc: 'The label lifts out of the way when you focus or type.',
  html: `<div class="fl-stage">
  <div class="field">
    <input id="email" type="text" placeholder=" ">
    <label for="email">Email address</label>
  </div>
</div>`,
  cssUrl: new URL('./styles.css', import.meta.url),
  js: null
};

export default component;
