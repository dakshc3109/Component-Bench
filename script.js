const loader = document.getElementById('app-loader');
const loadingStartedAt = performance.now();
const MINIMUM_LOADING_TIME = 450;

async function startApp() {
  try {
    const { initializeApp } = await import('./app/main.js');
    await initializeApp();

    const elapsed = performance.now() - loadingStartedAt;
    const remaining = Math.max(0, MINIMUM_LOADING_TIME - elapsed);
    await new Promise((resolve) => window.setTimeout(resolve, remaining));

    loader.inert = true;
    loader.classList.add('is-loaded');
    window.setTimeout(() => loader.remove(), 500);
  } catch (error) {
    console.error('Unable to start Component Bench:', error);
    loader.classList.add('has-error');
    loader.querySelector('.app-loader-status').textContent = 'The playground could not be loaded';
    loader.querySelector('.app-loader-error').hidden = false;
    loader.querySelector('.app-loader-retry').addEventListener('click', () => window.location.reload());
  }
}

startApp();
