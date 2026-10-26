
const component = {
  id: 'modal',
  cat: 'Overlays',
  title: 'Modal dialog',
  desc: 'Confirmation dialog with a fading backdrop and a springy pop-in. Pure CSS.',
  html: `<div class="modal-stage">
  <input type="checkbox" id="m1" class="modal-toggle">
  <label for="m1" class="open-btn">Open modal</label>
  <div class="overlay">
    <div class="dialog" role="dialog" aria-label="Confirm">
      <h3>Delete project?</h3>
      <p>This action cannot be undone.</p>
      <label for="m1" class="cancel">Cancel</label>
      <label for="m1" class="confirm">Delete</label>
    </div>
  </div>
</div>`,
  cssUrl: new URL('./styles.css', import.meta.url),
  js: null
};

export default component;
