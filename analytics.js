/* river.io site analytics.
 *
 * Consent-gated, and written to match what /privacy.html actually promises:
 *
 *   EU / EEA / UK  - asked first, nothing loads until they answer (opt in)
 *   everywhere else - loads by default, decline from the same banner (opt out)
 *
 * Nothing here fires before that rule is applied, so on an EU visit no Google
 * script is fetched and no cookie is set unless the visitor says yes.
 *
 * The banner styles itself. Pages in subdirectories do not all load
 * styles.css, so the palette is repeated here rather than inherited.
 */
(function () {
  'use strict';

  var ID  = 'G-80BTWXVDG4';
  var KEY = 'riverio-analytics-consent';   /* 'granted' | 'denied' */

  /* Timezone is a rough proxy for where someone is. It is not perfect - a VPN
     or a traveller will fool it - so the unknown case is treated as EU, which
     is the stricter branch. */
  function euLike() {
    try {
      var tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || '');
      return /^Europe\//.test(tz)
          || /^Atlantic\/(Canary|Azores|Madeira|Reykjavik|Faroe)$/.test(tz)
          || tz === 'Asia/Nicosia' || tz === 'Asia/Famagusta';
    } catch (e) { return true; }
  }

  function stored()      { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function remember(v)   { try { localStorage.setItem(KEY, v); }    catch (e) {} }

  function load() {
    if (window.__riverioGA) return;
    window.__riverioGA = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', ID, { anonymize_ip: true });
  }

  /* Declining after having accepted should not leave the cookies behind. */
  function dropCookies() {
    var root = location.hostname.replace(/^www\./, '');
    document.cookie.split(';').forEach(function (c) {
      var n = c.split('=')[0].trim();
      if (!/^_ga/.test(n)) return;
      document.cookie = n + '=; Max-Age=0; path=/';
      document.cookie = n + '=; Max-Age=0; path=/; domain=.' + root;
    });
  }

  function banner() {
    var css = document.createElement('style');
    css.textContent =
      '.riverio-consent{position:fixed;left:0;right:0;bottom:0;z-index:2147483000;' +
      'background:#000;color:#fff;border-top:1px solid #1a1a1a;' +
      'font:400 13px/1.5 "Inter",-apple-system,BlinkMacSystemFont,Arial,sans-serif;' +
      'padding:16px 20px;display:flex;gap:16px;align-items:center;' +
      'flex-wrap:wrap;justify-content:center}' +
      '.riverio-consent p{margin:0;max-width:56ch;color:#c8c8c8}' +
      '.riverio-consent a{color:#7ae8ff}' +
      '.riverio-consent button{font:500 11px/1 "Space Grotesk","Inter",sans-serif;' +
      'letter-spacing:.18em;text-transform:uppercase;padding:9px 16px;border-radius:2px;' +
      'cursor:pointer;background:transparent;color:#fff;border:1px solid #3a3a3a}' +
      '.riverio-consent button.yes{background:#e51a1a;border-color:#e51a1a}' +
      '.riverio-consent button:hover{border-color:#fff}' +
      '@media(prefers-reduced-motion:no-preference){.riverio-consent{animation:riverio-up .25s ease-out}}' +
      '@keyframes riverio-up{from{transform:translateY(100%)}to{transform:none}}';
    document.head.appendChild(css);

    var el = document.createElement('div');
    el.className = 'riverio-consent';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Analytics consent');
    el.innerHTML =
      '<p>This site counts visits with Google Analytics, which sets a cookie. ' +
      'Nothing else is collected, and we never sell it. ' +
      '<a href="/privacy.html">Privacy policy</a>.</p>';

    var yes = document.createElement('button');
    yes.className = 'yes'; yes.type = 'button'; yes.textContent = 'Allow';
    yes.onclick = function () { remember('granted'); load(); el.remove(); };

    var no = document.createElement('button');
    no.type = 'button'; no.textContent = 'Decline';
    no.onclick = function () { remember('denied'); dropCookies(); el.remove(); };

    el.appendChild(yes); el.appendChild(no);
    (document.body || document.documentElement).appendChild(el);
  }

  function start() {
    var choice = stored();
    if (choice === 'granted') { load(); return; }
    if (choice === 'denied')  { return; }
    if (!euLike()) load();     /* outside the EU the policy says on by default */
    banner();                  /* but everyone is offered the choice */
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
