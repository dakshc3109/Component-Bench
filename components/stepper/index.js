

function initStepper(root = document) {
  const steps = [...root.querySelectorAll('.step-point')];
  const label = root.querySelector('.step-label');
  const back = root.querySelector('.step-back');
  const next = root.querySelector('.step-next');
  let current = 0;
  const update = () => {
    steps.forEach((step, index) => {
      step.classList.toggle('is-current', index === current);
      step.classList.toggle('is-complete', index < current);
      step.textContent = index < current ? '✓' : String(index + 1);
      if (index === current) step.setAttribute('aria-current', 'step');
      else step.removeAttribute('aria-current');
    });
    label.textContent = 'Step ' + (current + 1) + ' of ' + steps.length + ': ' + steps[current].dataset.label;
    back.disabled = current === 0;
    next.disabled = current === steps.length - 1;
  };
  back.addEventListener('click', () => {
    if (current > 0) current--;
    update();
  });
  next.addEventListener('click', () => {
    if (current < steps.length - 1) current++;
    update();
  });
  update();
}

const component = {
  id: 'stepper',
  cat: 'Navigation',
  title: 'Checkout stepper',
  desc: 'A clear, keyboard-friendly progress indicator for multi-step flows.',
  html: `<div class="stepper-stage">
<div class="stepper">
  <div class="step-track" aria-label="Checkout progress">
    <span class="step-point" data-label="Details">1</span>
    <span class="step-point" data-label="Delivery">2</span>
    <span class="step-point" data-label="Payment">3</span>
  </div>
  <p class="step-label" aria-live="polite"></p>
  <div class="step-actions">
    <button class="step-back" type="button">Back</button>
    <button class="step-next" type="button">Continue</button>
  </div>
</div>
</div>`,
  cssUrl: new URL('./styles.css', import.meta.url),
  js: initStepper
};

export default component;
