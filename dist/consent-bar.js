/**
 * DataCrew CMP - Consent Management Platform
 * https://github.com/DataCrew-Agency/datacrew-cmp
 * 
 * Free, lightweight Consent Management Platform with Google Consent Mode v2 support.
 * 
 * MIT License - DataCrew Agency (https://datacrew.agency)
 */

(function() {
    "use strict";

    // Prevent double initialization
    if (window.__dcCmpLoaded) return;
    window.__dcCmpLoaded = true;

    // Check for config
    if (!window.__dcCmpConfig) {
        console.warn("DataCrew CMP: Config not found");
        return;
    }

    // ===========================================
    // CONFIGURATION
    // ===========================================
    
    var config = window.__dcCmpConfig;
    var cookieName = "datacrew-consent";

    // ===========================================
    // TRANSLATIONS
    // ===========================================

    var translations = {
        hu: {
            t: "Ez a weboldal sütiket használ.",
            d: 'A böngészési élmény fokozása, a személyre szabott hirdetések vagy tartalmak megjelenítése, valamint a forgalom elemzése érdekében sütiket (cookie) használunk. A "Minden elfogadása" gombra kattintva hozzájárulhat a legjobb böngészési élményt biztosító sütik használatához is. További információt az <a href="' + config.pp + '" target="_blank">adatvédelmi nyilatkozatunkban</a> és a <a href="https://business.safety.google/privacy/" target="_blank">Google adatvédelmi szabályzatában</a> talál.',
            aa: "Minden elfogadása",
            c: "Testreszabás",
            os: "Csak kiválasztottak",
            ra: "Minden elutasítása",
            n: "Kötelező",
            nd: "A kötelező sütik segítenek használhatóvá tenni a weboldalunkat azáltal, hogy engedélyeznek olyan alapvető funkciókat, mint az oldalon való navigáció és a weboldal biztonságos területeihez való hozzáférés. A weboldal ezen sütik nélkül nem tud megfelelően működni.",
            a: "Statisztikai",
            ad: "Az adatok névtelen formában való gyűjtésén és jelentésén keresztül a statisztikai sütik segítenek a weboldal tulajdonosának abban, hogy megértse, hogyan lépnek interakcióba a látogatók a weboldallal.",
            m: "Marketing",
            md: "A hirdetési sütiket arra használják, hogy a látogatókat személyre szabott hirdetésekkel juttassák el a korábban meglátogatott oldalak alapján, és elemezzék a hirdetési kampány hatékonyságát."
        },
        en: {
            t: "This website uses cookies.",
            d: 'We use cookies to enhance your browsing experience, display personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to the use of cookies that provide the best browsing experience. For more information, please see our <a href="' + config.pp + '" target="_blank">Privacy Policy</a> and <a href="https://business.safety.google/privacy/" target="_blank">Google Privacy Policy</a>.',
            aa: "Accept All",
            c: "Customize",
            os: "Save Selected",
            ra: "Reject All",
            n: "Necessary",
            nd: "Necessary cookies help make the website usable by enabling basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.",
            a: "Analytics",
            ad: "Analytics cookies help website owners understand how visitors interact with websites by collecting and reporting information anonymously.",
            m: "Marketing",
            md: "Marketing cookies are used to track visitors across websites to display relevant advertisements based on previously visited pages and analyze advertising campaign effectiveness."
        }
    };

    // ===========================================
    // STATE
    // ===========================================

    var state = {
        v: "i",              // View: "i" = initial, "c" = customize
        l: getLanguage(),    // Current language
        ac: 0,               // Analytics consent (0 = off, 1 = on)
        mc: 0,               // Marketing consent (0 = off, 1 = on)
        rv: 0,               // Revisit mode (0 = first visit, 1 = revisit)
        be: null,            // Banner element reference
        oe: null,            // Overlay element reference
        wr: null             // Wrapper element reference
    };

    // ===========================================
    // UTILITY FUNCTIONS
    // ===========================================

    function getLanguage() {
        if (config.lm !== "auto") {
            return config.lm;
        }
        var browserLang = navigator.language || "hu";
        return browserLang.indexOf("en") === 0 ? "en" : "hu";
    }

    function t(key) {
        return translations[state.l][key] || key;
    }

    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length === 2) {
            return parts.pop().split(";").shift();
        }
        return null;
    }

    function setCookie(name, value, days) {
        var expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        var domain = config.cd ? "; domain=" + config.cd : "";
        document.cookie = name + "=" + value + 
            "; expires=" + expires.toUTCString() + 
            "; path=/" + domain + 
            "; secure; samesite=lax";
    }

    function deleteCookie(name) {
        var domain = config.cd ? "; domain=" + config.cd : "";
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/" + domain;
    }

    function hasConsent() {
        return getCookie(cookieName) !== null;
    }

    function getConsentPreferences() {
        var cookie = getCookie(cookieName);
        if (!cookie) return null;
        
        try {
            var arr = JSON.parse(decodeURIComponent(cookie));
            if (Array.isArray(arr)) {
                return {
                    ad_storage: arr.indexOf("marketing") > -1 ? "granted" : "denied",
                    ad_user_data: arr.indexOf("marketing") > -1 ? "granted" : "denied",
                    ad_personalization: arr.indexOf("marketing") > -1 ? "granted" : "denied",
                    analytics_storage: arr.indexOf("statistics") > -1 ? "granted" : "denied"
                };
            }
            return arr;
        } catch (e) {
            return null;
        }
    }

    function isMobile() {
        return window.innerWidth <= 600;
    }

    // ===========================================
    // CONSENT EVENT HANDLING
    // ===========================================

    function pushConsentEvent(consentState, isFirst) {
        window.dataLayer = window.dataLayer || [];
        
        if (config.fcu && isFirst) {
            window.dataLayer.push({
                event: "first_cookie_consent_update",
                consent_analytics: consentState.analytics_storage,
                consent_marketing: consentState.ad_storage
            });
        }
        
        if (config.ccu) {
            window.dataLayer.push({
                event: "cookie_consent_update",
                consent_analytics: consentState.analytics_storage,
                consent_marketing: consentState.ad_storage
            });
        }
    }

    function saveConsent(preferences) {
        var categories = [];
        if (preferences.a) categories.push("statistics");
        if (preferences.m) categories.push("marketing");
        
        setCookie(cookieName, encodeURIComponent(JSON.stringify(categories)), config.ce);
        
        var consentState = {
            ad_storage: preferences.m ? "granted" : "denied",
            ad_user_data: preferences.m ? "granted" : "denied",
            ad_personalization: preferences.m ? "granted" : "denied",
            analytics_storage: preferences.a ? "granted" : "denied"
        };
        
        window.dataLayer = window.dataLayer || [];
        function gtag() { window.dataLayer.push(arguments); }
        
        gtag("consent", "update", consentState);
        gtag("set", "ads_data_redaction", preferences.m ? false : config.adr);
        gtag("set", "url_passthrough", false);
        
        pushConsentEvent(consentState, true);
    }

    // ===========================================
    // UI FUNCTIONS
    // ===========================================

    function injectStyles() {
        var existing = document.getElementById("dcs");
        if (existing) existing.remove();
        
        var style = document.createElement("style");
        style.id = "dcs";

        style.textContent =
            // Fixed wrapper - covers entire viewport
            ".dcw{position:fixed;top:0;left:0;width:100%;height:100%;z-index:99998;pointer-events:none}" +
            ".dcw>*{pointer-events:auto}" +

            // Overlay - positioned within wrapper
            ".dco{position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5)}" +
            ".dco.dch{display:none}" +

            // Banner - fixed position
            ".dcb{position:fixed;font-family:system-ui,sans-serif;background:#fff;box-shadow:0 4px 20px rgba(0,0,0,0.15);display:flex;flex-direction:column;box-sizing:border-box;z-index:99999}" +
            
            // Center position (desktop)
            ".dcb.dcp-center{top:50%;left:50%;transform:translate(-50%,-50%);max-width:560px;width:90%;max-height:85vh;border-radius:16px}" +
            
            // Bottom position (desktop)
            ".dcb.dcp-bottom{bottom:0;left:0;right:0;width:100%;max-height:85vh;border-radius:16px 16px 0 0}" +
            
            // Bottom left position (desktop)
            ".dcb.dcp-bottomleft{bottom:20px;left:20px;max-width:400px;width:calc(100% - 40px);max-height:85vh;border-radius:12px}" +
            
            // Customize view wider
            ".dcb.dccv{max-width:640px}" +
            
            // Title - fixed at top
            ".dct{background:" + config.cs + ";color:#fff;text-align:center;font-size:18px;padding:12px;margin:0;font-weight:700;flex-shrink:0;border-radius:16px 16px 0 0}" +
            ".dcp-bottom .dct,.dcp-bottomleft .dct{border-radius:16px 16px 0 0}" +
            
            // Scrollable content wrapper
            ".dcsc{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain}" +
            
            // Description
            ".dctx{font-size:13px;padding:16px;color:#333;margin:0;line-height:1.5}" +
            ".dctx a{color:" + config.pc + ";text-decoration:underline}" +
            
            // Buttons - fixed at bottom
            ".dcbt{display:flex;justify-content:center;gap:8px;padding:12px 16px;flex-wrap:wrap;flex-shrink:0;background:#fff}" +
            ".dcbt button{border:none;padding:10px 18px;font-size:13px;cursor:pointer;border-radius:6px;font-weight:600}" +
            ".dcpb{background:" + config.cs + ";color:#fff}" +
            ".dcsb{background:#f3f4f6;color:#374151;border:1px solid #d1d5db}" +
            
            // Categories
            ".dccts{padding:0 16px 12px}" +
            ".dcct{display:flex;justify-content:space-between;align-items:flex-start;padding:12px;margin-bottom:8px;border-radius:8px;background:#f8f8f8}" +
            ".dcci{flex:1;padding-right:12px}" +
            ".dcctt{font-size:14px;font-weight:600;color:#333;margin:0 0 4px}" +
            ".dccd{font-size:12px;color:#666;margin:0;line-height:1.4}" +
            
            // Toggle switch
            ".dci{width:44px;height:24px;min-width:44px;appearance:none;background:#ccc;border-radius:24px;position:relative;cursor:pointer;transition:.2s;margin-top:2px}" +
            ".dci:checked{background:" + config.cs + "}" +
            ".dci::after{content:'';position:absolute;width:20px;height:20px;left:2px;top:2px;background:#fff;border-radius:50%;transition:.2s}" +
            ".dci:checked::after{left:22px}" +
            ".dci:disabled{opacity:.6;cursor:not-allowed}" +
            
            // Footer
            ".dcf{text-align:right;padding:0 16px 10px;font-size:10px;color:#999;flex-shrink:0}" +
            ".dcf a{color:#999;text-decoration:none}" +
            ".dcf a:hover{text-decoration:underline}" +
            
            // Mobile styles - center position with smaller fonts
            "@media(max-width:600px){" +
            ".dcb.dcp-center{top:50%!important;left:50%!important;transform:translate(-50%,-50%)!important;width:95%!important;max-width:95%!important;max-height:85vh!important}" +
            ".dct{font-size:16px;padding:10px}" +
            ".dctx{font-size:12px;padding:12px}" +
            ".dcbt{padding:10px 12px}" +
            ".dcbt button{padding:10px 14px;font-size:12px;flex:1;min-width:0}" +
            ".dcb:not(.dccv) .dcbt{flex-direction:row-reverse}" +
            ".dccts{padding:0 12px 8px}" +
            ".dcct{padding:10px}" +
            ".dccd{font-size:11px}" +
            "}";

        document.head.appendChild(style);
    }

    function createCategoryToggle(id, title, description, checked, disabled) {
        var container = document.createElement("div");
        container.className = "dcct";
        
        var info = document.createElement("div");
        info.className = "dcci";
        
        var titleEl = document.createElement("div");
        titleEl.className = "dcctt";
        titleEl.textContent = title;
        info.appendChild(titleEl);
        
        var descEl = document.createElement("div");
        descEl.className = "dccd";
        descEl.textContent = description;
        info.appendChild(descEl);
        
        container.appendChild(info);
        
        var toggle = document.createElement("input");
        toggle.type = "checkbox";
        toggle.className = "dci";
        toggle.id = "dci-" + id;
        toggle.checked = checked;
        toggle.disabled = disabled;
        toggle.onchange = function() {
            if (id === "a") state.ac = toggle.checked ? 1 : 0;
            else if (id === "m") state.mc = toggle.checked ? 1 : 0;
        };
        
        container.appendChild(toggle);
        return container;
    }

    function createBanner() {
        // Remove existing wrapper if any
        if (state.wr) state.wr.remove();
        
        injectStyles();
        
        // Create fixed wrapper - this covers the entire viewport
        var wrapper = document.createElement("div");
        wrapper.className = "dcw";
        
        // Overlay inside wrapper
        var overlay = document.createElement("div");
        overlay.className = "dco" + (config.so ? "" : " dch");
        overlay.onclick = function() {
            if (state.rv) hideBanner();
        };
        wrapper.appendChild(overlay);
        
        // Banner - mobile always uses center position
        var mobile = isMobile();
        var posClass = mobile ? "dcp-center" : "dcp-" + config.bp;
        var banner = document.createElement("div");
        banner.className = "dcb " + posClass + (state.v === "c" ? " dccv" : "");
        
        // Title
        var title = document.createElement("div");
        title.className = "dct";
        title.textContent = t("t");
        banner.appendChild(title);
        
        // Scrollable content wrapper
        var scrollContent = document.createElement("div");
        scrollContent.className = "dcsc";
        
        // Description
        var desc = document.createElement("p");
        desc.className = "dctx";
        desc.innerHTML = t("d");
        scrollContent.appendChild(desc);
        
        var primaryClass = config.pb || "dcpb";
        var secondaryClass = config.sb || "dcsb";
        
        if (state.v === "i") {
            // Initial view
            banner.appendChild(scrollContent);
            
            var buttons = document.createElement("div");
            buttons.className = "dcbt";
            
            var acceptBtn = document.createElement("button");
            acceptBtn.className = primaryClass;
            acceptBtn.textContent = t("aa");
            acceptBtn.onclick = handleAcceptAll;
            buttons.appendChild(acceptBtn);
            
            var customizeBtn = document.createElement("button");
            customizeBtn.className = secondaryClass;
            customizeBtn.textContent = t("c");
            customizeBtn.onclick = handleCustomize;
            buttons.appendChild(customizeBtn);
            
            banner.appendChild(buttons);
        } else {
            // Customize view - categories in scrollable area
            var categories = document.createElement("div");
            categories.className = "dccts";
            
            categories.appendChild(createCategoryToggle("n", t("n"), t("nd"), 1, 1));
            categories.appendChild(createCategoryToggle("a", t("a"), t("ad"), state.ac, 0));
            categories.appendChild(createCategoryToggle("m", t("m"), t("md"), state.mc, 0));
            
            scrollContent.appendChild(categories);
            banner.appendChild(scrollContent);
            
            var buttons = document.createElement("div");
            buttons.className = "dcbt";
            
            var acceptBtn = document.createElement("button");
            acceptBtn.className = primaryClass;
            acceptBtn.textContent = t("aa");
            acceptBtn.onclick = handleAcceptAllCustomize;
            buttons.appendChild(acceptBtn);
            
            var saveBtn = document.createElement("button");
            saveBtn.className = secondaryClass;
            saveBtn.textContent = t("os");
            saveBtn.onclick = handleSaveSelected;
            buttons.appendChild(saveBtn);
            
            var rejectBtn = document.createElement("button");
            rejectBtn.className = secondaryClass;
            rejectBtn.textContent = t("ra");
            rejectBtn.onclick = handleRejectAll;
            buttons.appendChild(rejectBtn);
            
            banner.appendChild(buttons);
        }
        
        // Footer
        var footer = document.createElement("div");
        footer.className = "dcf";
        footer.innerHTML = '<a href="https://github.com/DataCrew-Agency/datacrew-cmp" target="_blank">Free CMP by DataCrew</a>';
        banner.appendChild(footer);
        
        wrapper.appendChild(banner);
        document.body.appendChild(wrapper);

        state.wr = wrapper;
        state.oe = overlay;
        state.be = banner;
    }

    // ===========================================
    // EVENT HANDLERS
    // ===========================================

    function handleAcceptAll() {
        state.ac = 1;
        state.mc = 1;
        saveConsent({ n: 1, a: 1, m: 1 });
        hideBanner();
    }

    function handleAcceptAllCustomize() {
        state.ac = 1;
        state.mc = 1;
        
        var analyticsToggle = document.getElementById("dci-a");
        var marketingToggle = document.getElementById("dci-m");
        if (analyticsToggle) analyticsToggle.checked = true;
        if (marketingToggle) marketingToggle.checked = true;
        
        setTimeout(function() {
            saveConsent({ n: 1, a: 1, m: 1 });
            hideBanner();
        }, 300);
    }

    function handleCustomize() {
        state.v = "c";
        createBanner();
    }

    function handleSaveSelected() {
        saveConsent({ n: 1, a: state.ac, m: state.mc });
        hideBanner();
    }

    function handleRejectAll() {
        state.ac = 0;
        state.mc = 0;
        saveConsent({ n: 1, a: 0, m: 0 });
        hideBanner();
    }

    function hideBanner() {
        state.v = "i";
        if (state.be) {
            state.be.remove();
        }
        if (state.wr) {
            state.wr.remove();
            state.wr = null;
            state.be = null;
            state.oe = null;
        }
    }

    // ===========================================
    // PUBLIC API
    // ===========================================

    window[config.go] = {
        show: function(forceCustomize) {
            state.rv = 1;
            state.v = forceCustomize ? "c" : "i";
            
            var existing = getConsentPreferences();
            if (existing) {
                state.ac = existing.analytics_storage === "granted" ? 1 : 0;
                state.mc = existing.ad_storage === "granted" ? 1 : 0;
            } else {
                state.ac = 0;
                state.mc = 0;
            }
            
            createBanner();
        },

        hide: hideBanner,

        clearConsent: function() {
            deleteCookie(cookieName);
            state.ac = 0;
            state.mc = 0;
            state.rv = 0;
            state.v = "i";
            createBanner();
        },

        getConsent: getConsentPreferences,

        hasConsent: hasConsent,

        setLanguage: function(lang) {
            if (lang === "hu" || lang === "en") {
                state.l = lang;
                if (state.be) createBanner();
            }
        },

        getLanguage: function() {
            return state.l;
        },

        revisitConsent: function() {
            state.rv = 1;
            state.v = "c";
            
            var existing = getConsentPreferences();
            if (existing) {
                state.ac = existing.analytics_storage === "granted" ? 1 : 0;
                state.mc = existing.ad_storage === "granted" ? 1 : 0;
            } else {
                state.ac = 0;
                state.mc = 0;
            }
            
            createBanner();
        }
    };

    // ===========================================
    // INITIALIZATION
    // ===========================================

    (function init() {
        if (!hasConsent()) {
            state.rv = 0;
            createBanner();
        } else {
            var existing = getConsentPreferences();
            if (existing) {
                pushConsentEvent(existing, false);
            }
        }
    })();

})();
