
const component = {
  id: 'nav',
  cat: 'Navigation',
  title: 'Sliding pill navbar',
  desc: 'Tab bar whose highlight glides to the active item. Pure CSS.',
  html: `<div class="nav-stage">
  <nav class="nav">
    <input type="radio" name="tab" id="n1" checked><label for="n1">Home</label>
    <input type="radio" name="tab" id="n2"><label for="n2">Work</label>
    <input type="radio" name="tab" id="n3"><label for="n3">Blog</label>
    <input type="radio" name="tab" id="n4"><label for="n4">Contact</label>
    <span class="pill"></span>
  </nav>
</div>`,
  cssUrl: new URL('./styles.css', import.meta.url),
  js: null
};

export default component;
