

function initRange(root = document) {
  const input = root.querySelector('.rg input');
  const out = root.querySelector('.rg output');
  const paint = () => {
    const p = ((input.value - input.min) / (input.max - input.min)) * 100;
    input.style.setProperty('--p', p + '%');
    out.textContent = input.value;
  };
  input.addEventListener('input', paint);
  paint();
}

const component = {
  id: 'range',
  cat: 'Inputs',
  title: 'Range slider',
  desc: 'Custom track with a live fill, a springy thumb and a value readout.',
  html: `<div class="rg-stage">
  <div class="rg">
    <div class="rg-top">
      <label for="vol">Volume</label>
      <output>40</output>
    </div>
    <input id="vol" type="range" min="0" max="100" value="40">
  </div>
</div>`,
  cssUrl: new URL('./styles.css', import.meta.url),
  js: initRange
};

export default component;
