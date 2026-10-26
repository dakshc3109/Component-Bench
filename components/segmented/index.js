

function initSegmented(root = document) {
  const buttons = [...root.querySelectorAll('.plan-option')];
  const price = root.querySelector('.plan-price');
  const billing = root.querySelector('.plan-billing');
  const choose = root.querySelector('.billing-cta');
  buttons.forEach((button) => button.addEventListener('click', () => {
    buttons.forEach((option) => option.setAttribute('aria-pressed', String(option === button)));
    price.textContent = button.dataset.price;
    billing.textContent = button.dataset.billing;
    price.classList.remove('price-pop');
    void price.offsetWidth;
    price.classList.add('price-pop');
  }));
  choose.addEventListener('click', () => {
    const selected = choose.classList.toggle('is-selected');
    choose.textContent = selected ? 'Pro selected ✓' : 'Choose Pro';
    choose.setAttribute('aria-pressed', String(selected));
  });
}

const component = {
  id: 'segmented',
  cat: 'Inputs',
  title: 'Billing switcher',
  desc: 'Switch between monthly and yearly plans with an updating price.',
  html: `<div class="billing-stage">
<div class="billing-card">
  <span class="billing-eyebrow">PRO PLAN</span>
  <div class="plan-switch" role="group" aria-label="Billing period">
    <button class="plan-option" type="button" data-price="$12" data-billing="per month, billed monthly" aria-pressed="true">Monthly</button>
    <button class="plan-option" type="button" data-price="$9" data-billing="per month, billed yearly" aria-pressed="false">Yearly <span>−25%</span></button>
  </div>
  <p class="billing-price"><strong class="plan-price">$12</strong><span>/ month</span></p>
  <p class="plan-billing">per month, billed monthly</p>
  <button class="billing-cta" type="button">Choose Pro</button>
</div>
</div>`,
  cssUrl: new URL('./styles.css', import.meta.url),
  js: initSegmented
};

export default component;
