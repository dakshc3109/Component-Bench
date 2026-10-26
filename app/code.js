const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function hlHTML(s) {
  return esc(s).replace(/(&lt;\/?)([\w-]+)((?:[^&]|&(?!gt;))*?)(\/?&gt;)/g, (m, a, b, c, d) =>
    '<span class="p">' + a + '</span><span class="tg">' + b + '</span>' +
    c.replace(/([\w:-]+)(=)("[^"]*")/g, '<span class="at">$1</span>$2<span class="st">$3</span>') +
    '<span class="p">' + d + '</span>');
}
function hlCSS(s) {
  return esc(s).split('\n').map((l) => {
    if (/^\s*\/\*/.test(l)) return '<span class="c">' + l + '</span>';
    if (/\{\s*$/.test(l)) return '<span class="sel">' + l.replace(/\s*\{\s*$/, '') + '</span> {';
    const m = l.match(/^(\s*)([\w-]+)(:\s*)(.*)$/);
    if (!m) return l;
    const v = m[4].replace(/(#[0-9a-fA-F]{3,8}\b)|(-?\d*\.?\d+(?:px|%|s|ms|deg|em|rem)?)|("[^"]*")/g, (x, h, n, q) =>
      q ? '<span class="st">' + x + '</span>' : '<span class="nm">' + x + '</span>');
    return m[1] + '<span class="pr">' + m[2] + '</span>' + m[3] + v;
  }).join('\n');
}
function hlJS(s) {
  return esc(s).replace(/(\/\/.*$)|('[^']*'|"[^"]*")|\b(const|let|function|if|return|new|true|false)\b|\b(\d+\.?\d*)\b/gm,
    (x, c, st, kw, n) => c ? '<span class="c">' + x + '</span>' : st ? '<span class="st">' + x + '</span>'
      : kw ? '<span class="kw">' + x + '</span>' : '<span class="nm">' + x + '</span>');
}
export const HL = { HTML: hlHTML, CSS: hlCSS, JS: hlJS };

/* ---------- Clipboard ---------- */
export async function copyText(t) {
  try { await navigator.clipboard.writeText(t); return true; } catch (e) {}
  try {
    const ta = document.createElement('textarea');
    ta.value = t; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    const ok = document.execCommand('copy');
    ta.remove(); return ok;
  } catch (e) { return false; }
}
