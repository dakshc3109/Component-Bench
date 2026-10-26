import { IC } from './icons.js';

export function initializeTheme() {
  const root = document.documentElement;
  const themeBtn = document.getElementById('theme');
  try { const t = localStorage.getItem('bench-theme'); if (t) root.setAttribute('data-theme', t); } catch (e) {}
  function paintTheme() {
    const dark = root.getAttribute('data-theme') !== 'light';
    themeBtn.innerHTML = dark ? IC.sun : IC.moon;
    themeBtn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  }
  themeBtn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('bench-theme', next); } catch (e) {}
    paintTheme();
  });
  paintTheme();
}
