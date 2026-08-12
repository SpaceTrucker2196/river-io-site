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
