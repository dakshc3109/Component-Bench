
const component = {
  id: 'accordion',
  cat: 'Layout',
  title: 'Accordion',
  desc: 'Native details elements with a plus that turns into a cross.',
  html: `<div class="acc-stage">
  <div class="acc">
    <details open>
      <summary>What is Component Bench?</summary>
      <p>A library of UI elements you can try live and copy.</p>
    </details>
    <details>
      <summary>Do I need a framework?</summary>
      <p>No. Everything is plain HTML and CSS.</p>
    </details>
    <details>
      <summary>Can I change the colors?</summary>
      <p>Yes. Edit the hex values in the CSS.</p>
    </details>
  </div>
</div>`,
  cssUrl: new URL('./styles.css', import.meta.url),
  js: null
};

export default component;
