/**
 * DataCrew CMP - Consent Bar JavaScript
 * 
 * This is the source file for the consent bar logic.
 * It gets embedded into the GTM template during build.
 * 
 * API:
 * - DataCrewConsent.show()           // Show banner
 * - DataCrewConsent.show(true)       // Show with customize view
 * - DataCrewConsent.hide()           // Hide banner
 * - DataCrewConsent.clearConsent()   // Clear consent and show banner
 * - DataCrewConsent.getConsent()     // Get current consent state
 * - DataCrewConsent.hasConsent()     // Check if consent exists
 * - DataCrewConsent.setLanguage('hu'/'en') // Change language
 * - DataCrewConsent.getLanguage()    // Get current language
 */

(function() {
  'use strict';

  // Translations
  var translations = {
    hu: {
      title: 'Süti beállítások',
      description: 'A böngészési élmény fokozása, a személyre szabott hirdetések vagy tartalmak megjelenítése, valamint a forgalom elemzése érdekében sütiket (cookie) használunk. A "Minden elfogadása" gombra kattintva hozzájárulhat a legjobb böngészési élményt biztosító sütik használatához is. További információt a',
      linkText: 'süti tájékoztatóban',
      linkSuffix: 'talál.',
      acceptAll: 'Minden elfogadása',
      customize: 'Testreszabás',
      onlySelected: 'Csak kiválasztottak',
      rejectAll: 'Minden elutasítása',
      necessary: 'Kötelező',
      necessaryDesc: 'A kötelező sütik segítenek használhatóvá tenni a weboldalunkat azáltal, hogy engedélyeznek olyan alapvető funkciókat, mint az oldalon való navigáció és a weboldal biztonságos területeihez való hozzáférés. A weboldal ezen sütik nélkül nem tud megfelelően működni.',
      analytics: 'Statisztikai',
      analyticsDesc: 'Az adatok névtelen formában való gyűjtésén és jelentésén keresztül a statisztikai sütik segítenek a weboldal tulajdonosának abban, hogy megértse, hogyan lépnek interakcióba a látogatók a weboldallal.',
      marketing: 'Marketing',
      marketingDesc: 'A hirdetési sütiket arra használják, hogy a látogatókat személyre szabott hirdetésekkel juttassák el a korábban meglátogatott oldalak alapján, és elemezzék a hirdetési kampány hatékonyságát.'
    },
    en: {
      title: 'Cookie Settings',
      description: 'We use cookies to enhance your browsing experience, display personalized ads or content, and analyze traffic. By clicking "Accept All", you consent to the use of cookies that provide the best browsing experience. Learn more in our',
      linkText: 'cookie policy',
      linkSuffix: '.',
      acceptAll: 'Accept All',
      customize: 'Customize',
      onlySelected: 'Only Selected',
      rejectAll: 'Reject All',
      necessary: 'Necessary',
      necessaryDesc: 'Necessary cookies help make the website usable by enabling basic functions such as page navigation and access to secure areas of the website. The website cannot function properly without these cookies.',
      analytics: 'Statistical',
      analyticsDesc: 'Statistical cookies help website owners understand how visitors interact with the website by collecting and reporting information anonymously.',
      marketing: 'Marketing',
      marketingDesc: 'Marketing cookies are used to deliver personalized ads to visitors based on previously visited pages and to analyze the effectiveness of advertising campaigns.'
    }
  };

  // Configuration - these get replaced by template values during build
  var CONFIG = {
    cookieName: '{{COOKIE_NAME}}',
    cookieDomain: '{{COOKIE_DOMAIN}}',
    cookieExpiryDays: {{COOKIE_EXPIRY_DAYS}},
    privacyPolicyUrl: '{{PRIVACY_POLICY_URL}}',
    colorStyle: '{{COLOR_STYLE}}',
    primaryColor: '{{PRIMARY_COLOR}}',
    bannerPosition: '{{BANNER_POSITION}}',
    showOverlay: {{SHOW_OVERLAY}},
    primaryButtonClass: '{{PRIMARY_BUTTON_CLASS}}',
    secondaryButtonClass: '{{SECONDARY_BUTTON_CLASS}}',
    languageMode: '{{LANGUAGE_MODE}}',
    globalObjectName: '{{GLOBAL_OBJECT_NAME}}'
  };

  // State
  var state = {
    view: 'initial',
    language: detectLanguage(),
    analyticsConsent: false,
    marketingConsent: false,
    isRevisit: false,
    bannerElement: null,
    overlayElement: null
  };

  // Helper functions
  function detectLanguage() {
    if (CONFIG.languageMode !== 'auto') return CONFIG.languageMode;
    var browserLang = (navigator.language || navigator.userLanguage || 'hu').toLowerCase();
    return browserLang.startsWith('en') ? 'en' : 'hu';
  }

  function t(key) {
    return translations[state.language][key] || key;
  }

  function getCookie(name) {
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  function setCookie(name, value, days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    var expires = 'expires=' + date.toUTCString();
    var domain = CONFIG.cookieDomain ? '; domain=' + CONFIG.cookieDomain : '';
    document.cookie = name + '=' + value + '; ' + expires + '; path=/' + domain + '; secure; samesite=lax';
  }

  function deleteCookie(name) {
    var domain = CONFIG.cookieDomain ? '; domain=' + CONFIG.cookieDomain : '';
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/' + domain;
  }

  function hasConsent() {
    return getCookie(CONFIG.cookieName) !== null;
  }

  function getConsentPreferences() {
    var cookie = getCookie(CONFIG.cookieName);
    if (!cookie) return null;
    try {
      return JSON.parse(decodeURIComponent(cookie));
    } catch (e) {
      return null;
    }
  }

  function saveConsent(preferences) {
    var consentMode = {
      ad_storage: preferences.marketing ? 'granted' : 'denied',
      ad_user_data: preferences.marketing ? 'granted' : 'denied',
      analytics_storage: preferences.analytics ? 'granted' : 'denied',
      ad_personalization: preferences.marketing ? 'granted' : 'denied'
    };

    setCookie(CONFIG.cookieName, encodeURIComponent(JSON.stringify(consentMode)), CONFIG.cookieExpiryDays);

    if (typeof gtag === 'function') {
      gtag('consent', 'update', consentMode);
    }

    if (window.dataLayer) {
      window.dataLayer.push({ event: 'consent_updated' });
    }
  }

  // Check if CSS class exists in stylesheets
  function classExists(className) {
    if (!className) return false;
    try {
      for (var i = 0; i < document.styleSheets.length; i++) {
        var sheet = document.styleSheets[i];
        try {
          var rules = sheet.cssRules || sheet.rules;
          if (rules) {
            for (var j = 0; j < rules.length; j++) {
              if (rules[j].selectorText && rules[j].selectorText.indexOf('.' + className) !== -1) {
                return true;
              }
            }
          }
        } catch (e) {
          // Cross-origin stylesheet, skip
        }
      }
    } catch (e) {
      return false;
    }
    return false;
  }

  // Inject styles
  function injectStyles() {
    if (document.getElementById('dc-consent-styles')) return;
    
    var style = document.createElement('style');
    style.id = 'dc-consent-styles';
    
    var positionStyles = {
      center: 'position:fixed!important;top:50%!important;left:50%!important;transform:translate(-50%,-50%)!important;max-width:1024px!important;width:90%!important;border-radius:24px!important;',
      bottom: 'position:fixed!important;bottom:0!important;left:0!important;right:0!important;width:100%!important;border-radius:24px 24px 0 0!important;',
      'bottom-left': 'position:fixed!important;bottom:20px!important;left:20px!important;max-width:420px!important;width:calc(100% - 40px)!important;border-radius:16px!important;'
    };

    style.textContent = 
      '.dc-consent-overlay{position:fixed!important;inset:0!important;background-color:rgba(0,0,0,0.5)!important;z-index:99998!important;}' +
      '.dc-consent-overlay.dc-hidden{display:none!important;}' +
      '.dc-consent-banner{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif!important;' + positionStyles[CONFIG.bannerPosition] + 'background-color:#fff!important;box-shadow:0 4px 24px rgba(0,0,0,0.15)!important;z-index:99999!important;overflow:hidden!important;}' +
      '.dc-consent-banner.dc-customize-view{max-width:900px!important;max-height:90vh!important;overflow-y:auto!important;}' +
      '.dc-consent-banner.dc-hidden{display:none!important;}' +
      '.dc-consent-title{background:' + CONFIG.colorStyle + '!important;color:white!important;text-align:center!important;font-size:20px!important;padding:14px 20px!important;margin:0!important;font-weight:700!important;}' +
      '.dc-consent-text{font-size:14px!important;padding:20px!important;line-height:1.5!important;color:#333333!important;margin:0!important;}' +
      '.dc-consent-text a{color:' + CONFIG.primaryColor + '!important;text-decoration:underline!important;}' +
      '.dc-consent-text a:hover{opacity:0.8!important;}' +
      '.dc-consent-buttons{display:flex!important;flex-direction:row!important;justify-content:center!important;gap:10px!important;padding:0 20px 20px 20px!important;flex-wrap:wrap!important;}' +
      '.dc-consent-buttons button{border:none!important;padding:12px 24px!important;text-align:center!important;text-decoration:none!important;font-size:14px!important;cursor:pointer!important;border-radius:8px!important;font-weight:600!important;white-space:nowrap!important;min-width:140px!important;transition:all 0.2s ease!important;}' +
      '.dc-btn-primary-fallback{background:' + CONFIG.colorStyle + '!important;color:white!important;}' +
      '.dc-btn-primary-fallback:hover{opacity:0.9!important;}' +
      '.dc-btn-secondary-fallback{background:#f3f4f6!important;color:#374151!important;border:1px solid #d1d5db!important;}' +
      '.dc-btn-secondary-fallback:hover{background:#e5e7eb!important;}' +
      '.dc-consent-categories{display:flex!important;flex-direction:column!important;gap:12px!important;padding:0 20px!important;margin-bottom:20px!important;}' +
      '.dc-category{display:grid!important;grid-template-columns:1fr auto!important;gap:16px!important;align-items:start!important;padding:16px!important;border-radius:12px!important;background:#f8f8f8!important;}' +
      '.dc-category-info{display:flex!important;flex-direction:column!important;gap:6px!important;}' +
      '.dc-category-title{font-size:16px!important;font-weight:600!important;color:#333!important;margin:0!important;}' +
      '.dc-category-description{font-size:13px!important;line-height:1.5!important;color:#666!important;margin:0!important;}' +
      '.dc-category-toggle{display:flex!important;align-items:center!important;justify-content:center!important;padding-top:4px!important;}' +
      '.dc-toggle{display:none!important;}' +
      '.dc-toggle+.dc-toggle-btn{outline:0!important;display:block!important;width:50px!important;height:26px!important;position:relative!important;cursor:pointer!important;user-select:none!important;background:#ccc!important;border-radius:26px!important;padding:2px!important;transition:all 0.3s ease!important;}' +
      '.dc-toggle+.dc-toggle-btn:after{position:absolute!important;display:block!important;content:""!important;width:22px!important;height:22px!important;left:2px!important;top:2px!important;border-radius:50%!important;background:#fff!important;transition:all 0.2s ease!important;box-shadow:0 2px 4px rgba(0,0,0,0.2)!important;}' +
      '.dc-toggle:checked+.dc-toggle-btn{background:' + CONFIG.colorStyle + '!important;}' +
      '.dc-toggle:checked+.dc-toggle-btn:after{left:26px!important;}' +
      '.dc-toggle-btn.dc-disabled{background:#999!important;cursor:not-allowed!important;opacity:0.7!important;}' +
      '.dc-toggle-btn.dc-disabled:after{background:#e0e0e0!important;}' +
      // Mobile styles
      '@media(max-width:768px){' +
      '.dc-consent-banner{width:95%!important;max-height:85vh!important;overflow-y:auto!important;}' +
      '.dc-consent-banner.dc-customize-view{max-height:90vh!important;}' +
      '.dc-consent-title{font-size:18px!important;padding:12px 16px!important;}' +
      '.dc-consent-text{font-size:13px!important;padding:16px!important;}' +
      '.dc-consent-buttons{flex-direction:column!important;align-items:center!important;gap:8px!important;padding:0 16px 16px 16px!important;}' +
      '.dc-consent-buttons button{width:100%!important;max-width:280px!important;padding:12px 16px!important;font-size:14px!important;}' +
      '.dc-consent-categories{padding:0 16px!important;gap:10px!important;margin-bottom:16px!important;}' +
      '.dc-category{gap:12px!important;padding:12px!important;align-items:center!important;}' +
      '.dc-category-info{gap:4px!important;}' +
      '.dc-category-title{font-size:14px!important;}' +
      '.dc-category-description{font-size:12px!important;line-height:1.4!important;}' +
      '.dc-category-toggle{padding-top:0!important;}' +
      '}';
    
    document.head.appendChild(style);
  }

  // Create banner
  function createBanner() {
    if (state.bannerElement) state.bannerElement.remove();
    if (state.overlayElement) state.overlayElement.remove();
    
    injectStyles();

    // Create overlay
    var overlay = document.createElement('div');
    overlay.className = 'dc-consent-overlay' + (CONFIG.showOverlay ? '' : ' dc-hidden');
    overlay.id = 'dc-consent-overlay';
    overlay.onclick = function() {
      if (state.isRevisit) hideBanner();
    };

    // Create banner
    var banner = document.createElement('div');
    banner.className = 'dc-consent-banner' + (state.view === 'customize' ? ' dc-customize-view' : '');
    banner.id = 'dc-consent-banner';

    // Title
    var title = document.createElement('div');
    title.className = 'dc-consent-title';
    title.textContent = t('title');
    banner.appendChild(title);

    // Description
    var desc = document.createElement('p');
    desc.className = 'dc-consent-text';
    desc.innerHTML = t('description') + ' <a href="' + CONFIG.privacyPolicyUrl + '" target="_blank" rel="noopener noreferrer">' + t('linkText') + '</a> ' + t('linkSuffix');
    banner.appendChild(desc);

    // Determine button classes
    var usePrimaryClass = CONFIG.primaryButtonClass && classExists(CONFIG.primaryButtonClass);
    var useSecondaryClass = CONFIG.secondaryButtonClass && classExists(CONFIG.secondaryButtonClass);
    var primaryBtnClass = usePrimaryClass ? CONFIG.primaryButtonClass : 'dc-btn-primary-fallback';
    var secondaryBtnClass = useSecondaryClass ? CONFIG.secondaryButtonClass : 'dc-btn-secondary-fallback';

    if (state.view === 'initial') {
      // Initial view - Accept All + Customize
      var buttons = document.createElement('div');
      buttons.className = 'dc-consent-buttons';

      var acceptAllBtn = document.createElement('button');
      acceptAllBtn.className = primaryBtnClass;
      acceptAllBtn.textContent = t('acceptAll');
      acceptAllBtn.onclick = handleAcceptAll;
      buttons.appendChild(acceptAllBtn);

      var customizeBtn = document.createElement('button');
      customizeBtn.className = secondaryBtnClass;
      customizeBtn.textContent = t('customize');
      customizeBtn.onclick = handleCustomize;
      buttons.appendChild(customizeBtn);

      banner.appendChild(buttons);
    } else {
      // Customize view - Categories + buttons
      var categories = document.createElement('div');
      categories.className = 'dc-consent-categories';
      categories.appendChild(createCategory('necessary', t('necessary'), t('necessaryDesc'), true, true));
      categories.appendChild(createCategory('analytics', t('analytics'), t('analyticsDesc'), state.analyticsConsent, false));
      categories.appendChild(createCategory('marketing', t('marketing'), t('marketingDesc'), state.marketingConsent, false));
      banner.appendChild(categories);

      var buttons = document.createElement('div');
      buttons.className = 'dc-consent-buttons';

      var acceptAllBtn = document.createElement('button');
      acceptAllBtn.className = primaryBtnClass;
      acceptAllBtn.textContent = t('acceptAll');
      acceptAllBtn.onclick = handleAcceptAll;
      buttons.appendChild(acceptAllBtn);

      var selectedBtn = document.createElement('button');
      selectedBtn.className = secondaryBtnClass;
      selectedBtn.textContent = t('onlySelected');
      selectedBtn.onclick = handleAcceptSelected;
      buttons.appendChild(selectedBtn);

      var rejectBtn = document.createElement('button');
      rejectBtn.className = secondaryBtnClass;
      rejectBtn.textContent = t('rejectAll');
      rejectBtn.onclick = handleRejectAll;
      buttons.appendChild(rejectBtn);

      banner.appendChild(buttons);
    }

    document.body.appendChild(overlay);
    document.body.appendChild(banner);
    state.overlayElement = overlay;
    state.bannerElement = banner;
  }

  // Create category toggle
  function createCategory(id, title, description, checked, disabled) {
    var category = document.createElement('div');
    category.className = 'dc-category';

    var info = document.createElement('div');
    info.className = 'dc-category-info';

    var titleEl = document.createElement('h3');
    titleEl.className = 'dc-category-title';
    titleEl.textContent = title;
    info.appendChild(titleEl);

    var descEl = document.createElement('p');
    descEl.className = 'dc-category-description';
    descEl.textContent = description;
    info.appendChild(descEl);

    category.appendChild(info);

    var toggleWrap = document.createElement('div');
    toggleWrap.className = 'dc-category-toggle';

    var toggle = document.createElement('input');
    toggle.type = 'checkbox';
    toggle.className = 'dc-toggle';
    toggle.id = 'dc-toggle-' + id;
    toggle.checked = checked;
    toggle.disabled = disabled;
    toggle.onchange = function() {
      if (id === 'analytics') state.analyticsConsent = toggle.checked;
      else if (id === 'marketing') state.marketingConsent = toggle.checked;
    };
    toggleWrap.appendChild(toggle);

    var label = document.createElement('label');
    label.className = 'dc-toggle-btn' + (disabled ? ' dc-disabled' : '');
    label.htmlFor = 'dc-toggle-' + id;
    toggleWrap.appendChild(label);

    category.appendChild(toggleWrap);
    return category;
  }

  // Event handlers
  function handleAcceptAll() {
    if (state.view === 'customize') {
      state.analyticsConsent = true;
      state.marketingConsent = true;
      var analyticsToggle = document.getElementById('dc-toggle-analytics');
      var marketingToggle = document.getElementById('dc-toggle-marketing');
      if (analyticsToggle) analyticsToggle.checked = true;
      if (marketingToggle) marketingToggle.checked = true;
      setTimeout(function() {
        saveConsent({ necessary: true, analytics: true, marketing: true });
        hideBanner();
      }, 200);
    } else {
      saveConsent({ necessary: true, analytics: true, marketing: true });
      hideBanner();
    }
  }

  function handleCustomize() {
    state.view = 'customize';
    createBanner();
  }

  function handleAcceptSelected() {
    saveConsent({
      necessary: true,
      analytics: state.analyticsConsent,
      marketing: state.marketingConsent
    });
    hideBanner();
  }

  function handleRejectAll() {
    state.analyticsConsent = false;
    state.marketingConsent = false;
    var analyticsToggle = document.getElementById('dc-toggle-analytics');
    var marketingToggle = document.getElementById('dc-toggle-marketing');
    if (analyticsToggle) analyticsToggle.checked = false;
    if (marketingToggle) marketingToggle.checked = false;
    setTimeout(function() {
      saveConsent({ necessary: true, analytics: false, marketing: false });
      hideBanner();
    }, 200);
  }

  function hideBanner() {
    state.view = 'initial';
    if (state.bannerElement) {
      state.bannerElement.remove();
      state.bannerElement = null;
    }
    if (state.overlayElement) {
      state.overlayElement.remove();
      state.overlayElement = null;
    }
  }

  // Public API
  window[CONFIG.globalObjectName] = {
    show: function(forceCustomize) {
      state.isRevisit = true;
      state.view = forceCustomize ? 'customize' : 'initial';
      var existing = getConsentPreferences();
      if (existing) {
        state.analyticsConsent = existing.analytics_storage === 'granted';
        state.marketingConsent = existing.ad_storage === 'granted';
      } else {
        state.analyticsConsent = false;
        state.marketingConsent = false;
      }
      createBanner();
    },
    hide: function() {
      hideBanner();
    },
    clearConsent: function() {
      deleteCookie(CONFIG.cookieName);
      state.analyticsConsent = false;
      state.marketingConsent = false;
      state.isRevisit = false;
      state.view = 'initial';
      createBanner();
    },
    getConsent: function() {
      return getConsentPreferences();
    },
    hasConsent: function() {
      return hasConsent();
    },
    setLanguage: function(lang) {
      if (lang === 'hu' || lang === 'en') {
        state.language = lang;
        if (state.bannerElement) createBanner();
      }
    },
    getLanguage: function() {
      return state.language;
    }
  };

  // Initialize
  function init() {
    if (!hasConsent()) {
      state.isRevisit = false;
      createBanner();
    } else {
      var existing = getConsentPreferences();
      if (existing && typeof gtag === 'function') {
        gtag('consent', 'update', existing);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
