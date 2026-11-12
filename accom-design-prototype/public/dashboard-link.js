/* Navigate to the actual AE dashboard app's existing /login page.
   The AE app itself authenticates users and routes staff to /admin,
   students to /student; this public site must not handle credentials. */
(function () {
  'use strict';
  var value = typeof window.AE_DASHBOARD_ORIGIN === 'string'
    ? window.AE_DASHBOARD_ORIGIN.trim() : '';
  if (!value) return;
  var origin;
  try {
    var url = new URL(value);
    var local = ['localhost', '127.0.0.1'].indexOf(url.hostname) !== -1;
    if (!((url.protocol === 'https:') || (local && url.protocol === 'http:'))) return;
    if (url.username || url.password || url.search || url.hash || url.pathname !== '/') return;
    origin = url.origin;
  } catch (_) { return; }

  var loginUrl = new URL('/login', origin).href;
  document.querySelectorAll('.site-nav-login').forEach(function (anchor) {
    anchor.setAttribute('href', loginUrl);
    anchor.setAttribute('aria-label', 'Log in to Accom by Emlen dashboard');
  });
  var bridge = document.querySelector('.auth-dashboard-link');
  if (bridge) {
    bridge.setAttribute('href', loginUrl);
    bridge.removeAttribute('hidden');
    var notice = document.getElementById('login-availability');
    if (notice) notice.textContent =
      'Continue to the secure Accom by Emlen dashboard sign-in. Your password is never entered on this public listing website.';
  }
}());
