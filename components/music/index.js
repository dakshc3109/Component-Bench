

function initMusic(root = document) {
  const player = root.querySelector('.music-player');
  const button = root.querySelector('.music-toggle');
  const status = root.querySelector('.music-status');
  button.addEventListener('click', () => {
    const playing = player.classList.toggle('is-playing');
    button.setAttribute('aria-label', playing ? 'Pause preview' : 'Play preview');
    button.innerHTML = playing ? '&#10074;&#10074;' : '&#9654;';
    status.textContent = playing ? 'Now playing' : 'Paused';
    button.classList.remove('music-pop');
    void button.offsetWidth;
    button.classList.add('music-pop');
  });
}

const component = {
  id: 'music',
  cat: 'Cards',
  title: 'Mini music player',
  desc: 'A compact player with a tactile play state and animated equalizer bars.',
  html: `<div class="music-stage">
<article class="music-player">
  <div class="music-art" aria-hidden="true"><span>✦</span></div>
  <div class="music-details">
    <span class="music-status" aria-live="polite">Ready to play</span>
    <strong>Midnight City</strong>
    <small>M83 · Hurry Up, We're Dreaming</small>
    <div class="music-equalizer" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
  </div>
  <button class="music-toggle" type="button" aria-label="Play preview">&#9654;</button>
</article>
</div>`,
  cssUrl: new URL('./styles.css', import.meta.url),
  js: initMusic
};

export default component;
