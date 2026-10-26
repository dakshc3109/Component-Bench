import { HL, copyText } from './code.js';
import { IC } from './icons.js';

export function initializeGallery(ITEMS) {
  /* ---------- State and helpers ---------- */
  const list = document.getElementById('list');
  const toc = document.getElementById('toc');
  const qEl = document.getElementById('q');
  const emptyEl = document.getElementById('empty');
  const favBtn = document.getElementById('favbtn');
  const favCount = document.getElementById('favcount');
  const toastEl = document.getElementById('toast');
  const state = { cat: 'All', q: '' };
  let favs = new Set();
  try { favs = new Set(JSON.parse(localStorage.getItem('bench-fav') || '[]')); } catch (e) {}
  function saveFavs() { try { localStorage.setItem('bench-fav', JSON.stringify([...favs])); } catch (e) {} }

  let toastT;
  function toast(m) {
    toastEl.innerHTML = IC.check + '<span></span>';
    toastEl.querySelector('span').textContent = m;
    toastEl.classList.add('on');
    clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('on'), 2000);
  }
  function burst(btn) {
    for (let i = 0; i < 10; i++) {
      const p = document.createElement('i'); p.className = 'spark';
      const a = (Math.PI * 2 * i) / 10 + Math.random() * 0.5, d = 22 + Math.random() * 16;
      p.style.setProperty('--dx', Math.cos(a) * d + 'px'); p.style.setProperty('--dy', Math.sin(a) * d + 'px');
      btn.appendChild(p); setTimeout(() => p.remove(), 700);
    }
  }
  function paintStars() {
    list.querySelectorAll('.item').forEach((s) => {
      const on = favs.has(s.dataset.id), b = s.querySelector('.star');
      b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); b.dataset.tip = on ? 'Saved' : 'Save';
    });
    favCount.textContent = favs.size; favCount.classList.toggle('has', favs.size > 0);
    const st = document.getElementById('stats'); st.innerHTML = '';
    [ITEMS.length + ' components', new Set(ITEMS.map((i) => i.cat)).size + ' categories', favs.size + ' saved'].forEach((t) => {
      const e = document.createElement('span'); e.textContent = t; st.appendChild(e);
    });
  }
  function apply() {
    let n = 0;
    list.querySelectorAll('.item').forEach((s) => {
      const inCat = state.cat === 'All' || (state.cat === 'Favorites' ? favs.has(s.dataset.id) : s.dataset.cat === state.cat);
      const ok = inCat && s.dataset.q.includes(state.q);
      s.hidden = !ok; if (ok) n++;
    });
    emptyEl.hidden = n > 0;
  }
  function setCat(c) {
    state.cat = c;
    toc.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x.textContent === c)));
    favBtn.classList.toggle('on', c === 'Favorites');
    apply();
  }
  function download(it, files) {
    const js = files.JS ? '<script>\n' + files.JS + '\n<\/script>\n' : '';
    const doc = '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>' + it.title + '</title>\n<style>\nbody{margin:0}\n' + files.CSS + '\n</style>\n</head>\n<body>\n' + files.HTML + '\n' + js + '</body>\n</html>\n';
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([doc], { type: 'text/html' }));
    a.download = it.id + '.html'; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  /* ---------- Build the cards ---------- */
  const SPANS = ['w7', 'w5', 'w5', 'w7'];
  ITEMS.forEach((it, i) => {
    const files = { HTML: it.html, CSS: it.css };
    if (it.js) files.JS = it.js.toString() + '\n\n' + it.js.name + '();';
    const tabs = Object.keys(files);
    let active = 'HTML';

    const sec = document.createElement('section');
    sec.className = 'item ' + SPANS[i % 4]; sec.id = it.id;
    sec.dataset.id = it.id; sec.dataset.cat = it.cat;
    sec.dataset.q = (it.title + ' ' + it.desc + ' ' + it.cat).toLowerCase();
    sec.innerHTML =
      '<div class="meta"><h2></h2><p class="d"></p></div>' +
      '<div class="win">' +
        '<div class="win-bar"><span class="lights"><i></i><i></i><i></i></span><span class="win-title"></span>' +
          '<div class="seg" role="group" aria-label="Preview size"><span class="seg-pill"></span>' +
            '<button type="button" data-w="100%" aria-pressed="true" aria-label="Desktop">' + IC.desk + '</button>' +
            '<button type="button" data-w="420px" aria-pressed="false" aria-label="Tablet">' + IC.tab + '</button>' +
            '<button type="button" data-w="300px" aria-pressed="false" aria-label="Mobile">' + IC.mob + '</button>' +
          '</div></div>' +
        '<div class="pstage"><div class="host"></div></div>' +
        '<div class="deck">' +
          '<button class="ic star" type="button" data-tip="Save" aria-label="Save component">' + IC.save + '</button>' +
          '<button class="ic copyall" type="button" data-tip="Copy all" aria-label="Copy HTML, CSS and JS">' + IC.copy + '</button>' +
          '<button class="ic replay" type="button" data-tip="Replay" aria-label="Replay preview">' + IC.replay + '</button>' +
          '<button class="ic dl" type="button" data-tip="Download .html" aria-label="Download as HTML file">' + IC.download + '</button>' +
        '</div>' +
      '</div>' +
      '<div class="code"><div class="bar"><div class="tabs" role="tablist"><span class="glide"></span></div>' +
        '<div class="bar-r"><button class="chip edit" type="button" aria-pressed="false">Edit</button><button class="chip reset" type="button" hidden>Reset</button><button class="copy" type="button"></button></div></div>' +
        '<pre><code></code></pre><textarea class="editor" spellcheck="false" aria-label="Edit code" hidden></textarea></div>';
    const h2 = sec.querySelector('h2'); h2.textContent = it.title;
    const bd = document.createElement('span'); bd.className = 'badge'; bd.textContent = it.cat; h2.appendChild(bd);
    sec.querySelector('.d').textContent = it.desc;
    sec.querySelector('.win-title').textContent = it.id + '.html';
    list.appendChild(sec);

    // Live preview in a shadow root so the snippet CSS is exactly what renders
    const host = sec.querySelector('.host');
    const shadow = host.attachShadow({ mode: 'open' });
    const mount = () => {
      shadow.innerHTML = '<style>:host{display:flex;flex-direction:column}*{box-sizing:border-box}style~*{flex:1}' + files.CSS + '</style>' + files.HTML;
      if (it.js) { try { it.js(shadow); } catch (e) {} }
    };
    mount();

    // Viewport switch with a sliding pill
    const seg = sec.querySelector('.seg');
    seg.querySelectorAll('button').forEach((b, idx) => b.addEventListener('click', () => {
      seg.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      seg.style.setProperty('--i', idx);
      host.style.maxWidth = b.dataset.w;
    }));

    // Code tabs with a gliding underline
    const tabBox = sec.querySelector('.tabs');
    const glide = sec.querySelector('.glide');
    const codeEl = sec.querySelector('code');
    codeEl.parentNode.tabIndex = 0; codeEl.parentNode.setAttribute('aria-label', it.title + ' code');
    const copyBtn = sec.querySelector('.copy');
    copyBtn.innerHTML = IC.copy + '<span>Copy</span>';
    function moveGlide() {
      const b = tabBox.querySelector('[aria-selected="true"]'); if (!b) return;
      glide.style.setProperty('--x', b.offsetLeft + 'px'); glide.style.setProperty('--w', b.offsetWidth + 'px');
    }
    sec._glide = moveGlide;
    function show() {
      codeEl.innerHTML = HL[active](files[active]).split('\n').map((l) => '<span class="ln">' + l + '</span>').join('');
      tabBox.querySelectorAll('.tab').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.t === active)));
      if (editing && editor.value !== files[active]) editor.value = files[active];
      if (editing) editor.readOnly = active === 'JS';
      moveGlide();
    }
    tabs.forEach((t) => {
      const b = document.createElement('button');
      b.className = 'tab'; b.type = 'button'; b.dataset.t = t; b.setAttribute('role', 'tab'); b.textContent = t;
      b.addEventListener('click', () => { active = t; show(); });
      tabBox.appendChild(b);
    });
    copyBtn.addEventListener('click', async () => {
      const ok = await copyText(files[active]);
      if (!ok) { toast('Copy failed. Select the code instead.'); return; }
      copyBtn.classList.remove('ok'); void copyBtn.offsetWidth; copyBtn.classList.add('ok');
      copyBtn.innerHTML = IC.check + '<span>Copied</span>'; burst(copyBtn);
      setTimeout(() => { copyBtn.classList.remove('ok'); copyBtn.innerHTML = IC.copy + '<span>Copy</span>'; }, 1600);
    });

    // Playground: edit the code and the preview re-renders live
    const orig = { ...files };
    const editor = sec.querySelector('.editor');
    const editBtn = sec.querySelector('.edit');
    const resetBtn = sec.querySelector('.reset');
    const pre = codeEl.parentNode;
    let editing = false;
    const dirty = () => tabs.some((t) => files[t] !== orig[t]);
    function syncEdit() {
      pre.hidden = editing; editor.hidden = !editing;
      editBtn.setAttribute('aria-pressed', String(editing)); editBtn.textContent = editing ? 'Done' : 'Edit';
      resetBtn.hidden = !dirty(); sec.classList.toggle('is-edited', dirty());
      show();
    }
    editBtn.addEventListener('click', () => { editing = !editing; syncEdit(); if (editing) editor.focus(); });
    resetBtn.addEventListener('click', () => { Object.assign(files, orig); mount(); syncEdit(); toast('Reset to the original code'); });
    editor.addEventListener('input', () => {
      files[active] = editor.value;
      if (active !== 'JS') mount();
      resetBtn.hidden = !dirty(); sec.classList.toggle('is-edited', dirty());
      show();
    });
    editor.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      e.preventDefault();
      editor.setRangeText('  ', editor.selectionStart, editor.selectionEnd, 'end');
      editor.dispatchEvent(new Event('input'));
    });
    tabBox.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const bs = [...tabBox.querySelectorAll('.tab')], i = bs.findIndex((b) => b.dataset.t === active);
      const n = bs[(i + (e.key === 'ArrowRight' ? 1 : bs.length - 1)) % bs.length];
      n.click(); n.focus();
    });

    // Action deck
    sec.querySelector('.star').addEventListener('click', () => {
      if (favs.has(it.id)) favs.delete(it.id); else favs.add(it.id);
      saveFavs(); paintStars(); apply();
      toast(favs.has(it.id) ? 'Saved to your list' : 'Removed from your list');
    });
    sec.querySelector('.replay').addEventListener('click', mount);
    sec.querySelector('.dl').addEventListener('click', () => { download(it, files); toast('Downloaded ' + it.id + '.html'); });
    sec.querySelector('.copyall').addEventListener('click', async () => {
      const all = files.HTML + '\n\n<style>\n' + files.CSS + '\n</style>' + (files.JS ? '\n\n<script>\n' + files.JS + '\n<\/script>' : '');
      toast((await copyText(all)) ? 'Copied HTML, CSS and JS' : 'Copy failed. Select the code instead.');
    });

    // Cursor-tracking glow
    sec.addEventListener('pointermove', (e) => {
      const r = sec.getBoundingClientRect();
      sec.style.setProperty('--mx', (e.clientX - r.left) + 'px'); sec.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
    show();
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => list.querySelectorAll('.item').forEach((s) => s._glide && s._glide()));

  /* ---------- Search and filters ---------- */
  ['All', ...new Set(ITEMS.map((i) => i.cat)), 'Favorites'].forEach((c) => {
    const b = document.createElement('button');
    b.type = 'button'; b.textContent = c; b.setAttribute('aria-pressed', String(c === 'All'));
    b.addEventListener('click', () => setCat(c));
    toc.appendChild(b);
  });
  favBtn.addEventListener('click', () => setCat(state.cat === 'Favorites' ? 'All' : 'Favorites'));
  qEl.addEventListener('input', () => { state.q = qEl.value.trim().toLowerCase(); apply(); });
  document.addEventListener('keydown', (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test((e.composedPath()[0] || {}).tagName || '');
    if (((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') || (e.key === '/' && !typing)) { e.preventDefault(); qEl.focus(); qEl.select(); }
    if (e.key === 'Escape' && document.activeElement === qEl) { qEl.value = ''; state.q = ''; apply(); qEl.blur(); }
  });
  paintStars(); apply();
  emptyEl.innerHTML = 'No components match. <button class="chip clear" type="button">Clear filters</button>';
  emptyEl.querySelector('.clear').addEventListener('click', () => { qEl.value = ''; state.q = ''; setCat('All'); });
  if (location.hash.length > 1) { const t = document.getElementById(decodeURIComponent(location.hash.slice(1))); if (t) setTimeout(() => t.scrollIntoView({ block: 'start' }), 60); }
}
