/**
 * Cookie Consent Banner (LGPD)
 * Gerencia a exibição e o consentimento de cookies da plataforma Edev.
 */
(function() {
  function initCookieBanner() {
    var consent = localStorage.getItem('cookie_consent');
    if (consent === 'accepted' || consent === 'rejected') {
      var existingBanner = document.getElementById('cookieBanner');
      if (existingBanner) existingBanner.style.display = 'none';
      return;
    }

    var banner = document.getElementById('cookieBanner');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'cookieBanner';
      banner.className = 'cookie-banner';
      banner.setAttribute('role', 'dialog');
      banner.setAttribute('aria-live', 'polite');
      banner.setAttribute('aria-label', 'Consentimento de Cookies');
      banner.innerHTML = [
        '<div class="cookie-banner-content">',
        '  <div class="cookie-banner-icon">',
        '    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1CA8E3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
        '      <circle cx="12" cy="12" r="10"></circle>',
        '      <path d="M12 2a10 10 0 0 0-1.5 19.9"></path>',
        '      <circle cx="8.5" cy="8.5" r="1.5" fill="#1CA8E3"></circle>',
        '      <circle cx="15.5" cy="11.5" r="1" fill="#1CA8E3"></circle>',
        '      <circle cx="10" cy="15.5" r="1" fill="#1CA8E3"></circle>',
        '    </svg>',
        '  </div>',
        '  <div class="cookie-banner-text">',
        '    Usamos cookies para manter você logado e melhorar sua experiência. Ao continuar, você concorda com nossos <a href="termos.html" class="cookie-link">Termos de Uso</a> e nossa <a href="privacidade.html" class="cookie-link">Política de Privacidade</a>. <a href="privacidade.html" class="cookie-learn-more">Saiba mais</a>',
        '  </div>',
        '  <div class="cookie-banner-actions">',
        '    <button type="button" id="btnRejectCookies" class="btn-cookie-reject">Rejeitar</button>',
        '    <button type="button" id="btnAcceptCookies" class="btn-cookie-accept">Aceitar</button>',
        '  </div>',
        '</div>'
      ].join('\n');
      document.body.appendChild(banner);
    }

    // Trigger suave de entrada
    setTimeout(function() {
      banner.classList.add('show');
    }, 300);

    var btnAccept = document.getElementById('btnAcceptCookies');
    var btnReject = document.getElementById('btnRejectCookies');

    function closeBanner(value) {
      localStorage.setItem('cookie_consent', value);
      banner.classList.remove('show');
      setTimeout(function() {
        banner.style.display = 'none';
      }, 400);
    }

    if (btnAccept) {
      btnAccept.onclick = function() {
        closeBanner('accepted');
      };
    }

    if (btnReject) {
      btnReject.onclick = function() {
        closeBanner('rejected');
      };
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieBanner);
  } else {
    initCookieBanner();
  }
})();
