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

    // ===========================================
    // CONFIGURATION
    // ===========================================
    
    /**
     * Configuration object - populated by GTM template
     */
    var config = window.__dcCmpConfig || {
        cd: "",                  // Cookie domain (e.g., ".example.com")
        ce: 365,                 // Cookie expiry in days
        pp: "/privacy-policy/",  // Privacy policy URL
        cs: "#FA4716",           // Color style (solid color or gradient)
        pc: "#FA4716",           // Primary color (for links)
        bp: "center",            // Banner position: "center", "bottom", "bottomleft"
        so: 1,                   // Show overlay (1 = yes, 0 = no)
        pb: "",                  // Primary button CSS class
        sb: "",                  // Secondary button CSS class
        lm: "auto",              // Language mode: "auto", "hu", "en"
        go: "DataCrewConsent",   // Global object name for API
        adr: true,               // ads_data_redaction default
        up: false,               // url_passthrough default
        fcu: false,              // Fire first_cookie_consent_update event
        ccu: true                // Fire cookie_consent_update event
    };

    /**
     * Cookie name for storing consent
     */
    var cookieName = "datacrew-consent";

    // ===========================================
    // TRANSLATIONS
    // ===========================================

    /**
     * Translation strings for supported languages
     */
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

    /**
     * Current state of the consent banner
     */
    var state = {
        v: "i",              // View: "i" = initial, "c" = customize
        l: getLanguage(),    // Current language
        ac: 0,               // Analytics consent (0 = off, 1 = on)
        mc: 0,               // Marketing consent (0 = off, 1 = on)
        rv: 0,               // Revisit mode (0 = first visit, 1 = revisit)
        be: null,            // Banner element reference
        oe: null             // Overlay element reference
    };

    // ===========================================
    // UTILITY FUNCTIONS
    // ===========================================

    /**
     * Detect user's preferred language
     * @returns {string} Language code ("hu" or "en")
     */
    function getLanguage() {
        if (config.lm !== "auto") {
            return config.lm;
        }
        var browserLang = navigator.language || "hu";
        return browserLang.indexOf("en") === 0 ? "en" : "hu";
    }

    /**
     * Get translation string by key
     * @param {string} key - Translation key
     * @returns {string} Translated string
     */
    function t(key) {
        return translations[state.l][key] || key;
    }

    /**
     * Get cookie value by name
     * @param {string} name - Cookie name
     * @returns {string|null} Cookie value or null
     */
    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length === 2) {
            return parts.pop().split(";").shift();
        }
        return null;
    }

    /**
     * Set cookie with value and expiry
     * @param {string} name - Cookie name
     * @param {string} value - Cookie value
     * @param {number} days - Expiry in days
     */
    function setCookie(name, value, days) {
        var expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        var domain = config.cd ? "; domain=" + config.cd : "";
        document.cookie = name + "=" + value + 
            "; expires=" + expires.toUTCString() + 
            "; path=/" + domain + 
            "; secure; samesite=lax";
    }

    /**
     * Delete cookie by name
     * @param {string} name - Cookie name
     */
    function deleteCookie(name) {
        var domain = config.cd ? "; domain=" + config.cd : "";
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/" + domain;
    }

    /**
     * Check if consent cookie exists
     * @returns {boolean}
     */
    function hasConsent() {
        return getCookie(cookieName) !== null;
    }

    /**
     * Get parsed consent preferences from cookie
     * @returns {Object|null} Consent object or null
     */
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

    // ===========================================
    // CONSENT EVENT HANDLING
    // ===========================================

    /**
     * Push consent events to dataLayer
     * @param {Object} consentState - Current consent state
     * @param {boolean} isFirst - Whether this is the first consent
     */
    function pushConsentEvent(consentState, isFirst) {
        window.dataLayer = window.dataLayer || [];
        
        // Fire first consent event if enabled and this is first consent
        if (config.fcu && isFirst) {
            window.dataLayer.push({
                event: "first_cookie_consent_update",
                consent_analytics: consentState.analytics_storage,
                consent_marketing: consentState.ad_storage
            });
        }
        
        // Fire regular consent update event if enabled
        if (config.ccu) {
            window.dataLayer.push({
                event: "cookie_consent_update",
                consent_analytics: consentState.analytics_storage,
                consent_marketing: consentState.ad_storage
            });
        }
    }

    /**
     * Save consent preferences and update Google Consent Mode
     * @param {Object} preferences - User preferences {n, a, m}
     */
    function saveConsent(preferences) {
        // Build categories array (only granted categories)
        var categories = [];
        if (preferences.a) categories.push("statistics");
        if (preferences.m) categories.push("marketing");
        
        // Save to cookie
        setCookie(cookieName, encodeURIComponent(JSON.stringify(categories)), config.ce);
        
        // Build consent state object
        var consentState = {
            ad_storage: preferences.m ? "granted" : "denied",
            ad_user_data: preferences.m ? "granted" : "denied",
            ad_personalization: preferences.m ? "granted" : "denied",
            analytics_storage: preferences.a ? "granted" : "denied"
        };
        
        // Update Google Consent Mode
        window.dataLayer = window.dataLayer || [];
        function gtag() { window.dataLayer.push(arguments); }
        
        gtag("consent", "update", consentState);
        
        // Update ads_data_redaction and url_passthrough
        gtag("set", "ads_data_redaction", preferences.m ? false : config.adr);
        gtag("set", "url_passthrough", false);
        
        // Push consent events
        pushConsentEvent(consentState, true);
    }

    // ===========================================
    // UI FUNCTIONS
    // ===========================================

    /**
     * Inject CSS styles into the page
     */
    function injectStyles() {
        if (document.getElementById("dcs")) return;
        
        var style = document.createElement("style");
        style.id = "dcs";
        
        // Position-specific styles
        var positionStyles = {
            center: "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);max-width:560px;width:90%;border-radius:16px",
            bottom: "position:fixed;bottom:0;left:0;right:0;width:100%;border-radius:16px 16px 0 0",
            bottomleft: "position:fixed;bottom:20px;left:20px;max-width:400px;width:calc(100% - 40px);border-radius:12px"
        };
        var pos = positionStyles[config.bp] || positionStyles.center;
        
        style.textContent = 
            // Overlay
            ".dco{position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:99998}" +
            ".dco.dch{display:none}" +
            
            // Banner container
            ".dcb{font-family:system-ui,sans-serif;" + pos + ";background:#fff;box-shadow:0 4px 20px rgba(0,0,0,0.15);z-index:99999;overflow:hidden;max-height:90vh;overflow-y:auto}" +
            ".dcb.dccv{max-width:640px}" +
            
            // Title
            ".dct{background:" + config.cs + ";color:#fff;text-align:center;font-size:18px;padding:12px;margin:0;font-weight:700}" +
            
            // Description text
            ".dctx{font-size:13px;padding:16px;color:#333;margin:0;line-height:1.5}" +
            ".dctx a{color:" + config.pc + ";text-decoration:underline}" +
            
            // Buttons container
            ".dcbt{display:flex;justify-content:center;gap:8px;padding:0 16px 12px;flex-wrap:wrap}" +
            ".dcbt button{border:none;padding:10px 18px;font-size:13px;cursor:pointer;border-radius:6px;font-weight:600}" +
            
            // Default button styles
            ".dcpb{background:" + config.cs + ";color:#fff}" +
            ".dcsb{background:#f3f4f6;color:#374151;border:1px solid #d1d5db}" +
            
            // Category toggles section
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
            ".dcf{text-align:right;padding:0 16px 10px;font-size:10px;color:#999}" +
            ".dcf a{color:#999;text-decoration:none}" +
            ".dcf a:hover{text-decoration:underline}" +

            // Mobile responsive styles
            "@media(max-width:768px){" +
            ".dcb:not(.dccv) .dcbt{flex-direction:row-reverse}" +
            ".dccts{max-height:50vh;overflow-y:auto;-webkit-overflow-scrolling:touch}" +
            "}";
        
        document.head.appendChild(style);
    }

    /**
     * Create a category toggle row
     * @param {string} id - Category ID
     * @param {string} title - Category title
     * @param {string} description - Category description
     * @param {boolean} checked - Initial checked state
     * @param {boolean} disabled - Whether toggle is disabled
     * @returns {HTMLElement} Category row element
     */
    function createCategoryToggle(id, title, description, checked, disabled) {
        var container = document.createElement("div");
        container.className = "dcct";
        
        // Info section
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
        
        // Toggle switch
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

    /**
     * Build and display the consent banner
     */
    function createBanner() {
        // Remove existing banner if any
        if (state.be) state.be.remove();
        if (state.oe) state.oe.remove();
        
        // Inject styles
        injectStyles();
        
        // Create overlay
        var overlay = document.createElement("div");
        overlay.className = "dco" + (config.so ? "" : " dch");
        overlay.onclick = function() {
            if (state.rv) hideBanner();
        };
        
        // Create banner container
        var banner = document.createElement("div");
        banner.className = "dcb" + (state.v === "c" ? " dccv" : "");
        
        // Title
        var title = document.createElement("div");
        title.className = "dct";
        title.textContent = t("t");
        banner.appendChild(title);
        
        // Description
        var desc = document.createElement("p");
        desc.className = "dctx";
        desc.innerHTML = t("d");
        banner.appendChild(desc);
        
        // Button classes
        var primaryClass = config.pb || "dcpb";
        var secondaryClass = config.sb || "dcsb";
        
        if (state.v === "i") {
            // Initial view - just Accept All and Customize buttons
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
            // Customize view - show category toggles
            var categories = document.createElement("div");
            categories.className = "dccts";
            
            categories.appendChild(createCategoryToggle("n", t("n"), t("nd"), 1, 1));
            categories.appendChild(createCategoryToggle("a", t("a"), t("ad"), state.ac, 0));
            categories.appendChild(createCategoryToggle("m", t("m"), t("md"), state.mc, 0));
            
            banner.appendChild(categories);
            
            // Buttons for customize view
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
        
        // Footer with branding
        var footer = document.createElement("div");
        footer.className = "dcf";
        footer.innerHTML = '<a href="https://github.com/DataCrew-Agency/datacrew-cmp" target="_blank">Free CMP by DataCrew</a>';
        banner.appendChild(footer);
        
        // Add to DOM
        document.body.appendChild(overlay);
        document.body.appendChild(banner);
        
        // Store references
        state.oe = overlay;
        state.be = banner;
    }

    // ===========================================
    // EVENT HANDLERS
    // ===========================================

    /**
     * Handle "Accept All" button click (initial view)
     */
    function handleAcceptAll() {
        state.ac = 1;
        state.mc = 1;
        saveConsent({ n: 1, a: 1, m: 1 });
        hideBanner();
    }

    /**
     * Handle "Accept All" button click (customize view)
     * Animates toggles before saving
     */
    function handleAcceptAllCustomize() {
        state.ac = 1;
        state.mc = 1;
        
        // Animate toggles
        var analyticsToggle = document.getElementById("dci-a");
        var marketingToggle = document.getElementById("dci-m");
        if (analyticsToggle) analyticsToggle.checked = true;
        if (marketingToggle) marketingToggle.checked = true;
        
        // Delay save for visual feedback
        setTimeout(function() {
            saveConsent({ n: 1, a: 1, m: 1 });
            hideBanner();
        }, 300);
    }

    /**
     * Handle "Customize" button click
     */
    function handleCustomize() {
        state.v = "c";
        createBanner();
    }

    /**
     * Handle "Save Selected" button click
     */
    function handleSaveSelected() {
        saveConsent({ n: 1, a: state.ac, m: state.mc });
        hideBanner();
    }

    /**
     * Handle "Reject All" button click
     */
    function handleRejectAll() {
        state.ac = 0;
        state.mc = 0;
        saveConsent({ n: 1, a: 0, m: 0 });
        hideBanner();
    }

    /**
     * Hide the consent banner
     */
    function hideBanner() {
        state.v = "i";
        if (state.be) {
            state.be.remove();
            state.be = null;
        }
        if (state.oe) {
            state.oe.remove();
            state.oe = null;
        }
    }

    // ===========================================
    // PUBLIC API
    // ===========================================

    /**
     * Expose public API on global object
     */
    window[config.go] = {
        /**
         * Show the consent banner
         * @param {boolean} [forceCustomize] - Show customize view directly
         */
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

        /**
         * Hide the consent banner
         */
        hide: hideBanner,

        /**
         * Clear consent and show banner again
         */
        clearConsent: function() {
            deleteCookie(cookieName);
            state.ac = 0;
            state.mc = 0;
            state.rv = 0;
            state.v = "i";
            createBanner();
        },

        /**
         * Get current consent state
         * @returns {Object|null} Consent preferences object
         */
        getConsent: getConsentPreferences,

        /**
         * Check if consent has been given
         * @returns {boolean}
         */
        hasConsent: hasConsent,

        /**
         * Change the banner language
         * @param {string} lang - Language code ("hu" or "en")
         */
        setLanguage: function(lang) {
            if (lang === "hu" || lang === "en") {
                state.l = lang;
                if (state.be) createBanner();
            }
        },

        /**
         * Get current language
         * @returns {string} Language code
         */
        getLanguage: function() {
            return state.l;
        },

        /**
         * Reopen consent settings (for "manage cookies" links)
         */
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

    /**
     * Initialize the CMP
     */
    (function init() {
        if (!hasConsent()) {
            // No consent yet - show banner
            state.rv = 0;
            createBanner();
        } else {
            // Consent exists - push consent event
            var existing = getConsentPreferences();
            if (existing) {
                pushConsentEvent(existing, false);
            }
        }
    })();

})();
