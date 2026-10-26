
const component = {
  id: 'pricing',
  cat: 'Cards',
  title: 'Pricing cards',
  desc: 'Two plans that sit side by side and stack on narrow screens, with equal heights and buttons pinned to the bottom.',
  html: `<div class="price-stage">
  <article class="plan">
    <h3>Starter</h3>
    <p class="amount">$0<small>/mo</small></p>
    <ul>
      <li>3 projects</li>
      <li>Community support</li>
      <li>Basic analytics</li>
    </ul>
    <button type="button">Get started</button>
  </article>
  <article class="plan featured">
    <span class="plan-tag">Popular</span>
    <h3>Pro</h3>
    <p class="amount">$19<small>/mo</small></p>
    <ul>
      <li>Unlimited projects</li>
      <li>Priority support</li>
      <li>Custom domains</li>
    </ul>
    <button type="button">Choose Pro</button>
  </article>
</div>`,
  cssUrl: new URL('./styles.css', import.meta.url),
  js: null
};

export default component;
