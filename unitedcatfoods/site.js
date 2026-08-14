// U.C.F. corporate site: Tuna Prime exchange rail and scroll reveals.
(function () {
  var header = document.querySelector('.site-header');
  if (header) {
    var ticker = document.querySelector('.ticker');
    if (!ticker) {
      ticker = document.createElement('aside');
      ticker.className = 'ticker';
      header.insertAdjacentElement('afterend', ticker);
    }
    ticker.setAttribute('aria-label', 'Tuna Prime Trading Exchange market ticker');
    ticker.setAttribute('role', 'region');
    ticker.removeAttribute('aria-hidden');

    var quotes = [
      ['TPX', 'Tuna Prime Exchange', 'OPEN', 'steady'],
      ['BLFN', 'Bluefin Grade A', '25,680', 'up'],
      ['SKJP', 'Skipjack Lots', '8,420', 'up'],
      ['SLMN', 'Salmon Futures', '11,090', 'down'],
      ['CMET', 'Comet Ice', '4,775', 'up'],
      ['GRVY', 'Gravy Reserve', '104.2', 'steady'],
      ['KBL-7', 'Kibble Index', '6,318', 'up'],
      ['FPLT', 'Fusion Pellets', '9,604', 'down'],
      ['LUNA', 'Aquafarm Yield', '12,440', 'up'],
      ['UCFH', 'Freight Capacity', '98.7%', 'steady']
    ];
    var quoteMarkup = quotes.map(function (quote) {
      return '<span class="market-quote ' + quote[3] + '"><b>' + quote[0] + '</b> ' + quote[1] + ' <strong>' + quote[2] + '</strong></span>';
    }).join('');
    ticker.innerHTML = '<span class="ticker-label">Tuna Prime Trading // TPX</span><div class="ticker-window" aria-hidden="true"><div class="ticker-track">' + quoteMarkup + quoteMarkup + '</div></div>';
  }

  // UCF Engineering image inspection plate.
  var imageTargets = document.querySelectorAll('main img:not(.brand-mark), main .card-image, main .page-hero figure.art:not(.station-map-header)');
  if (imageTargets.length) {
    var viewer = document.createElement('div');
    viewer.className = 'ucf-image-viewer';
    viewer.setAttribute('role', 'dialog');
    viewer.setAttribute('aria-modal', 'true');
    viewer.setAttribute('aria-hidden', 'true');
    viewer.setAttribute('aria-labelledby', 'ucf-viewer-title');
    viewer.innerHTML =
      '<div class="ucf-blueprint-frame">' +
        '<header class="ucf-viewer-rail"><span>UCF ENGINEERING // VISUAL ARCHIVE</span><strong id="ucf-viewer-title">REFERENCE PLATE</strong><button type="button" class="ucf-viewer-close" aria-label="Close image detail">CLOSE ×</button></header>' +
        '<div class="ucf-viewer-stage"><img alt="" /></div>' +
        '<footer class="ucf-viewer-data"><span>DOC · UCF-ENG-VIS</span><span id="ucf-viewer-size">SOURCE PLATE</span><span>STATUS · RELEASED</span></footer>' +
      '</div>';
    document.body.appendChild(viewer);

    var viewerImage = viewer.querySelector('.ucf-viewer-stage img');
    var viewerTitle = viewer.querySelector('#ucf-viewer-title');
    var viewerSize = viewer.querySelector('#ucf-viewer-size');
    var closeButton = viewer.querySelector('.ucf-viewer-close');
    var previousFocus = null;

    function backgroundSource(el) {
      var match = window.getComputedStyle(el).backgroundImage.match(/url\(["']?(.*?)["']?\)/);
      return match ? match[1] : '';
    }
    function labelFor(el) {
      var figure = el.closest('figure');
      var caption = figure && figure.querySelector('figcaption');
      return (caption && caption.textContent.trim()) || el.getAttribute('alt') || 'UCF reference plate';
    }
    function openViewer(el) {
      var source = el.tagName === 'IMG' ? (el.currentSrc || el.src) : backgroundSource(el);
      if (!source) return;
      previousFocus = document.activeElement;
      viewerImage.src = source;
      viewerImage.alt = labelFor(el);
      viewerTitle.textContent = labelFor(el).toUpperCase();
      viewerSize.textContent = 'SOURCE · LOADING';
      viewerImage.onload = function () {
        viewerSize.textContent = 'SOURCE · ' + viewerImage.naturalWidth + ' × ' + viewerImage.naturalHeight;
      };
      viewer.classList.add('is-open');
      viewer.setAttribute('aria-hidden', 'false');
      document.body.classList.add('ucf-viewer-open');
      closeButton.focus();
    }
    function closeViewer() {
      viewer.classList.remove('is-open');
      viewer.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('ucf-viewer-open');
      viewerImage.removeAttribute('src');
      if (previousFocus && previousFocus.focus) previousFocus.focus();
    }

    imageTargets.forEach(function (el) {
      if (el.closest('a')) return;
      var source = el.tagName === 'IMG' ? (el.currentSrc || el.src) : backgroundSource(el);
      if (!source) return;
      el.classList.add('ucf-detail-target');
      el.setAttribute('tabindex', '0');
      el.setAttribute('role', 'button');
      el.setAttribute('aria-label', 'Open image detail: ' + labelFor(el));
      el.addEventListener('click', function () { openViewer(el); });
      el.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openViewer(el);
        }
      });
    });
    closeButton.addEventListener('click', closeViewer);
    viewer.addEventListener('click', function (event) {
      if (event.target === viewer) closeViewer();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && viewer.classList.contains('is-open')) closeViewer();
    });
  }

  var els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  els.forEach(function (el) { io.observe(el); });
})();
