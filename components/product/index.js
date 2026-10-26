

function initProduct(root = document) {
  const quantity = root.querySelector('.product-quantity');
  const price = root.querySelector('.product-price');
  const decrease = root.querySelector('.quantity-decrease');
  const increase = root.querySelector('.quantity-increase');
  const add = root.querySelector('.product-add');
  const unitPrice = Number(price.dataset.unitPrice);
  const minQuantity = Number(quantity.dataset.min);
  const maxQuantity = Number(quantity.dataset.max);
  let addTimer;
  const update = () => {
    const value = Number(quantity.textContent);
    decrease.disabled = value <= minQuantity;
    increase.disabled = value >= maxQuantity;
    price.textContent = '$' + (unitPrice * value).toFixed(2);
    if (!add.classList.contains('is-added')) add.textContent = 'Add ' + value + ' to bag';
  };
  const animateQuantity = () => {
    quantity.classList.remove('quantity-pop');
    price.classList.remove('price-pop');
    void quantity.offsetWidth;
    quantity.classList.add('quantity-pop');
    price.classList.add('price-pop');
  };
  decrease.addEventListener('click', () => {
    quantity.textContent = String(Math.max(Number(quantity.textContent) - 1, minQuantity));
    update();
    animateQuantity();
  });
  increase.addEventListener('click', () => {
    quantity.textContent = String(Math.min(Number(quantity.textContent) + 1, maxQuantity));
    update();
    animateQuantity();
  });
  add.addEventListener('click', () => {
    add.textContent = 'Added to bag ✓';
    add.classList.add('is-added');
    clearTimeout(addTimer);
    addTimer = setTimeout(() => {
      add.classList.remove('is-added');
      update();
    }, 1400);
  });
  update();
}

const component = {
  id: 'product',
  cat: 'Cards',
  title: 'Product purchase card',
  desc: 'A polished product card with working quantity controls and a live total.',
  html: `<div class="product-stage">
<article class="product-card">
  <div class="product-art"><span>STUDIO<br>HEADPHONES</span><i aria-hidden="true"></i></div>
  <div class="product-info">
    <span class="product-tag">BEST SELLER</span>
    <h3>Studio headphones</h3>
    <p>Immersive sound, made for focus.</p>
    <div class="product-buy">
      <div class="quantity-control" aria-label="Quantity">
        <button class="quantity-decrease" type="button" aria-label="Decrease quantity">−</button>
        <output class="product-quantity" data-min="1" data-max="9" aria-live="polite">1</output>
        <button class="quantity-increase" type="button" aria-label="Increase quantity">+</button>
      </div>
      <strong class="product-price" data-unit-price="89">$89.00</strong>
    </div>
    <button class="product-add" type="button">Add 1 to bag</button>
  </div>
</article>
</div>`,
  cssUrl: new URL('./styles.css', import.meta.url),
  js: initProduct
};

export default component;
