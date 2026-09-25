/* river.io — the masthead wave, animated the digital way.
   Replaces the static SVG mask under .masthead with a canvas: the same 12px dot-matrix
   wave, but stepped at 8 frames a second, dot sizes snapped to three steps, a slow scan
   column and a little deterministic bit flicker. No randomness (a hash of x, y and the
   frame), so it looks the same to everyone. Reads the accent from CSS, so the theme toggle
   recolours it. Draws one still frame when the visitor prefers reduced motion. */
(function () {
  var heads = document.querySelectorAll('.masthead');
  if (!heads.length) return;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FPS = 8, G = 12, H = 150, TAU = Math.PI * 2;
  function hash(x, y, f) { var n = (x * 374761393 + y * 668265263 + f * 2246822519) >>> 0; n = (n ^ (n >>> 13)) * 1274126177 >>> 0; return (n ^ (n >>> 16)) / 4294967296; }
  function crest(u, t) { return 0.42 + 0.10 * Math.sin(TAU * u + t * 0.9) + 0.04 * Math.sin(TAU * 4 * u - t * 1.7) + 0.025 * Math.sin(TAU * 7 * u + 2 + t * 0.6); }

  heads.forEach(function (head) {
    var cv = document.createElement('canvas'); cv.className = 'tdr-wave'; cv.setAttribute('aria-hidden', 'true');
    head.classList.add('has-wave'); head.appendChild(cv);
    var c = cv.getContext('2d'), w = 0, dpr = 1;
    function size() { dpr = Math.min(2, window.devicePixelRatio || 1); w = head.clientWidth; cv.width = Math.round(w * dpr); cv.height = Math.round(H * dpr); cv.style.width = w + 'px'; cv.style.height = H + 'px'; }
    function draw(frame) {
      var t = frame / FPS, ac = getComputedStyle(head).getPropertyValue('--ac').trim() || '#00B4FF';
      c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, w, H); c.fillStyle = ac;
      var scan = ((t * 60) % (w + 240)) - 120;                       // a column sweeping left to right, 60 px/s
      for (var y = G / 2; y < H; y += G) {
        for (var x = G / 2; x < w; x += G) {
          var u = x / 1440, v = y / H, d = v - crest(u, t);
          if (d < 0) { if (Math.abs(x - scan) < G && hash(x, y, frame) < 0.35) { c.fillRect(x - 1, y - 1, 2, 2); } continue; }   // scan column lights stray bits above the water
          var b = d < 0.02 ? 1 : Math.min(1, 0.4 + 2.2 * d);
          if (hash(x, y, frame >> 1) < 0.03) b = b > 0.6 ? 0.3 : 1;      // bit flicker, every other frame
          var r = b > 0.85 ? 2.8 : b > 0.55 ? 2 : 1.2;                    // three sizes only: a printed screen, not a gradient
          if (Math.abs(x - scan) < G) r = 3.2;
          c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill();
        }
      }
    }
    size(); addEventListener('resize', function () { size(); draw(last); });
    var last = 0; draw(0);
    if (reduce) return;
    var start = performance.now();
    (function tick(now) {
      var frame = Math.floor((now - start) / 1000 * FPS);
      if (frame !== last) { last = frame; draw(frame); }
      requestAnimationFrame(tick);
    })(start);
  });
})();
