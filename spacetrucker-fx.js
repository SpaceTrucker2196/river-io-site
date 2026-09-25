/* Spacetrucker motion layer, after 2Advanced Studios' Attractor (v5). See spacetrucker-fx.css.
   Reads the page for panels, labels and headings, and stages them in on scroll: the boot line types,
   the beam descends, headings resolve out of scrambled glyphs, panels open from a line. No random
   numbers: the scramble uses a hash of position and frame, so every visitor sees the same boot. */
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement; root.classList.add('fx-armed');
  var GLYPHS = '01<>[]{}/\\|=+-*#%&$@:;.·';
  function hash(a, b) { var n = (a * 374761393 + b * 668265263) >>> 0; n = (n ^ (n >>> 13)) * 1274126177 >>> 0; return ((n ^ (n >>> 16)) >>> 0) / 4294967296; }

  // ---- which page is this ----
  var who = document.querySelector('.hero .in');            // jeff/
  var mast = document.querySelector('.mast');               // spacetrucker/ (the catalogue)

  // ---- panels: the HUD dot grid and brackets, then boot in on scroll ----
  var panels = document.querySelectorAll('.app, .spec, .tenet, .note, .contents, details');
  panels.forEach(function (p, i) { p.classList.add('fx-panel', 'hud'); var s = document.createElement('i'); s.className = 'fx-scan'; p.appendChild(s); p.style.animationDelay = (i % 3) * 0.12 + 's'; });
  var labels = document.querySelectorAll('.eyebrow, .kicker, .series-num, h3.sub, .lbl, .subtitle, .plate-note');
  labels.forEach(function (l) { l.classList.add('fx-label'); });

  // ---- headings resolve out of glyphs (text nodes only, so <br> and <i> survive) ----
  function decode(el, frames) {
    if (reduce || el.dataset.fxDone) return; el.dataset.fxDone = '1';
    var nodes = [], walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) nodes.push({ n: walker.currentNode, t: walker.currentNode.textContent });
    var i = 0, total = frames || 18, off = 0;
    el.classList.add('fx-decoding');
    (function step() {
      var pos = 0;
      nodes.forEach(function (d) {
        var out = '';
        for (var k = 0; k < d.t.length; k++) {
          var ch = d.t[k], settled = (pos + k) < (i / total) * (off || 1) + 1;
          out += (ch === ' ' || ch === '\n' || settled) ? ch : GLYPHS[Math.floor(hash(pos + k, i) * GLYPHS.length)];
        }
        d.n.textContent = out; pos += d.t.length;
      });
      off = pos; i++;
      if (i <= total) setTimeout(step, 40); else { nodes.forEach(function (d) { d.n.textContent = d.t; }); el.classList.remove('fx-decoding'); }
    })();
  }

  // ---- reveal on scroll ----
  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (!e.isIntersecting) return; var t = e.target; io.unobserve(t);
      if (t.classList.contains('fx-panel') || t.classList.contains('fx-label')) t.classList.add('fx-in');
      if (t.matches('h1, h2, .app h3, .title, .lb-name')) decode(t, t.matches('h1') ? 26 : 16); });
  }, { threshold: 0.15 }) : null;
  function watch(sel) { document.querySelectorAll(sel).forEach(function (el) { if (io) io.observe(el); else el.classList.add('fx-in'); }); }
  if (reduce) { document.querySelectorAll('.fx-panel, .fx-label').forEach(function (el) { el.classList.add('fx-in'); }); }
  else { watch('.fx-panel'); watch('.fx-label'); watch('h1, h2, .app h3'); }

  // ---- the boot line: types on, then the rule draws, then the beam descends ----
  function boot(host, lines, before) {
    var el = document.createElement('div'); el.className = 'fx-boot'; el.setAttribute('aria-hidden', 'true');
    var cur = document.createElement('span'); cur.className = 'fx-cursor';
    host.insertBefore(el, before || host.firstChild); el.appendChild(cur);
    if (reduce) { el.insertBefore(document.createTextNode(lines.join('  ·  ')), cur); el.classList.add('fx-run'); return; }
    var text = lines.join('  ·  '), n = 0;
    (function type() { if (n <= text.length) { el.firstChild && el.firstChild.nodeType === 3 ? (el.firstChild.textContent = text.slice(0, n)) : el.insertBefore(document.createTextNode(text.slice(0, n)), cur); n++; setTimeout(type, text[n - 1] === ' ' ? 60 : 28); } else { el.classList.add('fx-run'); } })();
  }
  if (who) {
    var hero = who.parentElement, beam = document.createElement('i'); beam.className = 'fx-beam'; hero.appendChild(beam);
    var avatar = who.querySelector('.avatar');
    if (avatar) { var r = avatar.getBoundingClientRect(), hr = hero.getBoundingClientRect(); beam.style.left = (r.left - hr.left + r.width / 2) + 'px'; beam.style.setProperty('--fx-beam-h', (r.top - hr.top + 6) + 'px'); }
    boot(who, ['Standby: initializing', 'Jeff Kunzelman', 'River.io LLC'], who.firstElementChild);
    setTimeout(function () { beam.classList.add('fx-run'); }, reduce ? 0 : 1800);
  }
  if (mast) {
    var b = mast.querySelector('.boot');   // the catalogue already has a boot transcript: type it
    if (b && !reduce) { var full = b.innerHTML; var plain = b.textContent; b.textContent = ''; var k = 0;
      (function t() { if (k <= plain.length) { b.textContent = plain.slice(0, k); k += 3; setTimeout(t, 12); } else { b.innerHTML = full; } })(); }
  }
})();
