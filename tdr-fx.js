/* river.io theme motion, after 2Advanced Prophecy v4. See tdr-fx.css.
   Boot strip, cascading labels and menus, circuit traces across the masthead, typed readouts,
   counters that tick. Deterministic (no random). Still under prefers-reduced-motion. */
(function () {
  var root = document.documentElement, reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var body = document.body, path = location.pathname.replace(/index\.html$/, '');
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function q(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  // ---- cascade: number the siblings so the CSS can stagger them ----
  var groups = ['nav.top > *', 'nav.nav .links > a', '.kicker > *', '.masthead .strip > div', '.post-row', '.register .entry', '.quad > div',
    '.tags span', '.chips span', '.links a', '.specs dt', '.specs dd', 'article.post h2', 'article.post h3', 'body > main section', '.article-foot a', 'footer .in > *', '.rules h3', '.rules .sub'];
  groups.forEach(function (sel, g) { q(sel).forEach(function (n, i) { n.classList.add('fx-c'); n.style.setProperty('--i', i); n.style.setProperty('--d', (g < 4 ? 0 : 200) + 'ms'); }); });

  // ---- the readout: a rule extends from the kicker, then a status label types on ----
  var kicker = document.querySelector('.kicker, .article-head .meta, body > main .label');
  var status = (function () {
    var meta = document.querySelector('.article-head .meta b'); if (meta) return 'NODE ENGAGED // ' + meta.textContent.trim().toUpperCase();
    var n = document.querySelector('.strip .n'), l = document.querySelector('.strip .l'); if (n && l) return 'SYS ACTIVE // ' + n.textContent.trim() + ' ' + l.textContent.trim().toUpperCase();
    return 'SYS ACTIVE // RIVER.IO';
  })();
  if (kicker) {
    var ro = el('span', 'fx-readout'); ro.setAttribute('aria-hidden', 'true');
    var rule = el('i', 'fx-rule'), txt = el('span', 'fx-txt'), bar = el('i', 'fx-bar'); ro.style.setProperty('--d', '600ms');
    ro.appendChild(rule); ro.appendChild(txt); ro.appendChild(bar); kicker.appendChild(ro);
    var n = 0; function type() { if (n <= status.length) { txt.textContent = status.slice(0, n++); setTimeout(type, 22); } }
    if (reduce) txt.textContent = status; else setTimeout(type, 1100);
  }

  // ---- circuit traces over the masthead: kicker to each strip tile, 45° bends, node squares, one head ----
  var mast = document.querySelector('.masthead');
  if (mast) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.setAttribute('class', 'fx-traces'); svg.setAttribute('aria-hidden', 'true');
    mast.style.position = 'relative'; mast.appendChild(svg);
    var hair = el('i', 'fx-hair'); mast.appendChild(hair);
    function build() {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      var mr = mast.getBoundingClientRect(); svg.setAttribute('viewBox', '0 0 ' + mr.width + ' ' + mr.height);
      var k = document.querySelector('.masthead .kicker'), tiles = q('.masthead .strip > div');
      if (!k || !tiles.length) return;
      var kr = k.getBoundingClientRect(), W = mr.width, x0 = Math.min(kr.right - mr.left + 150, W - 200), y0 = kr.top - mr.top + kr.height / 2;
      tiles.forEach(function (t, i) {
        var tr = t.getBoundingClientRect(), x1 = tr.left - mr.left + 28 + i * 16, y1 = tr.top - mr.top;
        var xa = W - 40 - i * 14, ya = y1 - 28 - i * 12, bend = 14;   // out to the right margin, down the edge, across above the strip, down into the tile
        var d = 'M' + x0 + ' ' + y0 + ' L' + (xa - bend) + ' ' + y0 + ' L' + xa + ' ' + (y0 + bend) + ' L' + xa + ' ' + (ya - bend) + ' L' + (xa - bend) + ' ' + ya + ' L' + (x1 + bend) + ' ' + ya + ' L' + x1 + ' ' + (ya + bend) + ' L' + x1 + ' ' + y1;
        var p = document.createElementNS('http://www.w3.org/2000/svg', 'path'); p.setAttribute('d', d); svg.appendChild(p);
        var len = p.getTotalLength(); p.style.setProperty('--len', len); p.style.setProperty('--d', (300 + i * 140) + 'ms');
        [[xa, y0 + bend], [xa, ya - bend], [x1, ya + bend]].forEach(function (pt) { var r = document.createElementNS('http://www.w3.org/2000/svg', 'rect'); r.setAttribute('x', pt[0] - 4); r.setAttribute('y', pt[1] - 4); r.setAttribute('width', 8); r.setAttribute('height', 8); r.style.setProperty('--d', (300 + i * 140) + 'ms'); svg.appendChild(r); });
        var h = document.createElementNS('http://www.w3.org/2000/svg', 'rect'); h.setAttribute('class', 'fx-head'); h.setAttribute('x', -5); h.setAttribute('y', -5); h.setAttribute('width', 10); h.setAttribute('height', 10);
        h.style.setProperty('--p', 'path("' + d + '")'); h.style.setProperty('--d', (300 + i * 140) + 'ms'); svg.appendChild(h);
      });
    }
    build(); addEventListener('resize', build);
  }

  // ---- counters tick up in the strip ----
  q('.strip .n').forEach(function (n) {
    var raw = n.textContent.trim(), num = parseInt(raw.replace(/[^0-9]/g, ''), 10); if (isNaN(num) || reduce) return;
    n.classList.add('fx-tick'); var t0 = null, dur = 600;
    function step(now) { t0 = t0 || now; var p = Math.min(1, (now - t0) / dur), v = Math.floor(num * Math.floor(p * 10) / 10); n.textContent = raw.replace(/[0-9,]+/, v.toLocaleString('en-US')); if (p < 1) requestAnimationFrame(step); else n.textContent = raw; }
    setTimeout(function () { requestAnimationFrame(step); }, 900);
  });

  // ---- boot: hold the page, type the strip, release ----
  if (reduce) { root.classList.add('fx-on'); return; }
  root.classList.add('fx-hold');
  var strip = el('div', 'fx-boot'); strip.setAttribute('aria-hidden', 'true');
  var ring = el('i'), label = el('b'), cursor = el('i', 'fx-bar'); strip.appendChild(ring); strip.appendChild(label); strip.appendChild(cursor); body.appendChild(strip);
  var line = 'SYS ACTIVE // RIVER.IO' + (path === '/' ? '' : ' ' + path.toUpperCase()), i = 0;
  (function type() { if (i <= line.length) { label.textContent = line.slice(0, i++); setTimeout(type, 18); } else { setTimeout(release, 250); } })();
  var released = false;
  function release() { if (released) return; released = true; root.classList.remove('fx-hold'); root.classList.add('fx-on'); strip.classList.add('fx-out'); setTimeout(function () { strip.remove(); }, 400); }
  setTimeout(release, 1600);   // never hold longer than this, whatever happens
})();
