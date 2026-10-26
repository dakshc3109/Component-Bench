
const component = {
  id: 'tooltip',
  cat: 'Overlays',
  title: 'Tooltips',
  desc: 'Top and bottom placements from one data attribute. Hover or tab to each button.',
  html: `<div class="tip-stage">
  <div class="tip-grid">
    <button class="tip" type="button" data-tip="Save your work">Save</button>
    <button class="tip" type="button" data-tip="Share a link">Share</button>
    <button class="tip bottom" type="button" data-tip="Undo last step">Undo</button>
    <button class="tip bottom" type="button" data-tip="Redo last step">Redo</button>
  </div>
</div>`,
  cssUrl: new URL('./styles.css', import.meta.url),
  js: null
};

export default component;
