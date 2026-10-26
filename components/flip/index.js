
const component = {
  id: 'flip',
  cat: 'Cards',
  title: '3D flip card',
  desc: 'Two faces and a smooth 3D rotation on hover. Pure CSS.',
  html: `<div class="flip-stage">
  <div class="flip">
    <div class="flip-inner">
      <div class="face front"><h3>Hover</h3><p>to see the other side</p></div>
      <div class="face back"><h3>Surprise!</h3><p>Pure CSS 3D flip</p></div>
    </div>
  </div>
</div>`,
  cssUrl: new URL('./styles.css', import.meta.url),
  js: null
};

export default component;
