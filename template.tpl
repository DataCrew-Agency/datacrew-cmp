___INFO___

{
  "type": "TAG",
  "id": "cvt_temp_public_id",
  "version": 1,
  "securityGroups": [],
  "displayName": "DataCrew CMP - Consent Management",
  "brand": {
    "id": "datacrew",
    "displayName": "DataCrew"
  },
  "description": "Free, lightweight Consent Management Platform with Google Consent Mode v2 support. Fully customizable colors, texts, and positioning.",
  "containerContexts": [
    "WEB"
  ],
  "categories": [
    "TAG_MANAGEMENT",
    "UTILITY"
  ]
}


___TEMPLATE_PARAMETERS___

[
  {
    "type": "GROUP",
    "name": "appearanceGroup",
    "displayName": "Appearance",
    "groupStyle": "ZIPPY_OPEN",
    "subParams": [
      {
        "type": "SELECT",
        "name": "colorMode",
        "displayName": "Color Mode",
        "macrosInSelect": false,
        "selectItems": [
          {
            "value": "solid",
            "displayValue": "Solid Color"
          },
          {
            "value": "gradient",
            "displayValue": "Gradient"
          }
        ],
        "simpleValueType": true,
        "defaultValue": "gradient"
      },
      {
        "type": "TEXT",
        "name": "primaryColor",
        "displayName": "Primary Color (HEX)",
        "simpleValueType": true,
        "defaultValue": "#FA4716",
        "valueHint": "#FA4716",
        "help": "Used for solid color mode and gradient start color",
        "valueValidators": [
          {
            "type": "REGEX",
            "args": ["^#[0-9A-Fa-f]{6}$"]
          }
        ]
      },
      {
        "type": "TEXT",
        "name": "secondaryColor",
        "displayName": "Secondary Color (HEX) - Gradient End",
        "simpleValueType": true,
        "defaultValue": "#FA6212",
        "valueHint": "#FA6212",
        "help": "Used only for gradient mode",
        "enablingConditions": [
          {
            "paramName": "colorMode",
            "paramValue": "gradient",
            "type": "EQUALS"
          }
        ],
        "valueValidators": [
          {
            "type": "REGEX",
            "args": ["^#[0-9A-Fa-f]{6}$"]
          }
        ]
      },
      {
        "type": "SELECT",
        "name": "bannerPosition",
        "displayName": "Banner Position",
        "macrosInSelect": false,
        "selectItems": [
          {
            "value": "center",
            "displayValue": "Center (Modal)"
          },
          {
            "value": "bottom",
            "displayValue": "Bottom Bar"
          },
          {
            "value": "bottom-left",
            "displayValue": "Bottom Left Corner"
          }
        ],
        "simpleValueType": true,
        "defaultValue": "center"
      },
      {
        "type": "CHECKBOX",
        "name": "showOverlay",
        "checkboxText": "Show background overlay",
        "simpleValueType": true,
        "defaultValue": true,
        "help": "When enabled, a dark overlay appears behind the consent banner"
      }
    ]
  },
  {
    "type": "GROUP",
    "name": "buttonsGroup",
    "displayName": "Button Styling",
    "groupStyle": "ZIPPY_CLOSED",
    "subParams": [
      {
        "type": "TEXT",
        "name": "primaryButtonClass",
        "displayName": "Primary Button CSS Class",
        "simpleValueType": true,
        "defaultValue": "",
        "valueHint": "btn-primary",
        "help": "CSS class from your site for primary buttons. Leave empty to use built-in styles."
      },
      {
        "type": "TEXT",
        "name": "secondaryButtonClass",
        "displayName": "Secondary Button CSS Class",
        "simpleValueType": true,
        "defaultValue": "",
        "valueHint": "btn-light",
        "help": "CSS class from your site for secondary buttons. Leave empty to use built-in styles."
      }
    ]
  },
  {
    "type": "GROUP",
    "name": "cookieGroup",
    "displayName": "Cookie Settings",
    "groupStyle": "ZIPPY_CLOSED",
    "subParams": [
      {
        "type": "TEXT",
        "name": "cookieName",
        "displayName": "Cookie Name",
        "simpleValueType": true,
        "defaultValue": "consentMode",
        "valueValidators": [
          {
            "type": "NON_EMPTY"
          }
        ]
      },
      {
        "type": "TEXT",
        "name": "cookieDomain",
        "displayName": "Cookie Domain",
        "simpleValueType": true,
        "defaultValue": "",
        "valueHint": ".example.com",
        "help": "Include leading dot for subdomains. Leave empty for current domain only."
      },
      {
        "type": "TEXT",
        "name": "cookieExpiryDays",
        "displayName": "Cookie Expiry (days)",
        "simpleValueType": true,
        "defaultValue": "365",
        "valueValidators": [
          {
            "type": "POSITIVE_NUMBER"
          }
        ]
      }
    ]
  },
  {
    "type": "GROUP",
    "name": "linksGroup",
    "displayName": "Links",
    "groupStyle": "ZIPPY_CLOSED",
    "subParams": [
      {
        "type": "TEXT",
        "name": "privacyPolicyUrl",
        "displayName": "Privacy/Cookie Policy URL",
        "simpleValueType": true,
        "defaultValue": "/privacy-policy/",
        "valueHint": "https://example.com/privacy-policy/",
        "valueValidators": [
          {
            "type": "NON_EMPTY"
          }
        ]
      }
    ]
  },
  {
    "type": "GROUP",
    "name": "languageGroup",
    "displayName": "Language",
    "groupStyle": "ZIPPY_CLOSED",
    "subParams": [
      {
        "type": "SELECT",
        "name": "languageMode",
        "displayName": "Language Selection",
        "macrosInSelect": false,
        "selectItems": [
          {
            "value": "auto",
            "displayValue": "Auto-detect (browser language)"
          },
          {
            "value": "hu",
            "displayValue": "Hungarian (Magyar)"
          },
          {
            "value": "en",
            "displayValue": "English"
          }
        ],
        "simpleValueType": true,
        "defaultValue": "auto"
      }
    ]
  },
  {
    "type": "GROUP",
    "name": "consentDefaultsGroup",
    "displayName": "Default Consent State",
    "groupStyle": "ZIPPY_CLOSED",
    "subParams": [
      {
        "type": "CHECKBOX",
        "name": "waitForUpdate",
        "checkboxText": "Wait for consent update before firing tags",
        "simpleValueType": true,
        "defaultValue": true
      },
      {
        "type": "TEXT",
        "name": "waitForUpdateMs",
        "displayName": "Wait timeout (milliseconds)",
        "simpleValueType": true,
        "defaultValue": "500",
        "enablingConditions": [
          {
            "paramName": "waitForUpdate",
            "paramValue": true,
            "type": "EQUALS"
          }
        ],
        "valueValidators": [
          {
            "type": "POSITIVE_NUMBER"
          }
        ]
      },
      {
        "type": "TEXT",
        "name": "defaultRegion",
        "displayName": "Region(s) for defaults (optional)",
        "simpleValueType": true,
        "defaultValue": "",
        "valueHint": "HU, AT, DE",
        "help": "Comma-separated ISO country codes. Leave empty to apply to all regions."
      }
    ]
  },
  {
    "type": "GROUP",
    "name": "advancedGroup",
    "displayName": "Advanced",
    "groupStyle": "ZIPPY_CLOSED",
    "subParams": [
      {
        "type": "TEXT",
        "name": "globalObjectName",
        "displayName": "Global API Object Name",
        "simpleValueType": true,
        "defaultValue": "DataCrewConsent",
        "help": "Name of the global JavaScript object for API access (e.g., DataCrewConsent.show())"
      }
    ]
  }
]


___SANDBOXED_JS_FOR_WEB_TEMPLATE___

const log = require('logToConsole');
const setInWindow = require('setInWindow');
const copyFromWindow = require('copyFromWindow');
const injectScript = require('injectScript');
const encodeUri = require('encodeUri');
const encodeUriComponent = require('encodeUriComponent');
const setDefaultConsentState = require('setDefaultConsentState');
const updateConsentState = require('updateConsentState');
const getCookieValues = require('getCookieValues');
const setCookie = require('setCookie');
const JSON = require('JSON');
const getUrl = require('getUrl');
const makeNumber = require('makeNumber');
const queryPermission = require('queryPermission');
const gtagSet = require('gtagSet');

// Get template parameters
const colorMode = data.colorMode || 'gradient';
const primaryColor = data.primaryColor || '#FA4716';
const secondaryColor = data.secondaryColor || '#FA6212';
const bannerPosition = data.bannerPosition || 'center';
const showOverlay = data.showOverlay !== false;
const primaryButtonClass = data.primaryButtonClass || '';
const secondaryButtonClass = data.secondaryButtonClass || '';
const cookieName = data.cookieName || 'consentMode';
const cookieDomain = data.cookieDomain || '';
const cookieExpiryDays = makeNumber(data.cookieExpiryDays) || 365;
const privacyPolicyUrl = data.privacyPolicyUrl || '/privacy-policy/';
const languageMode = data.languageMode || 'auto';
const waitForUpdate = data.waitForUpdate !== false;
const waitForUpdateMs = makeNumber(data.waitForUpdateMs) || 500;
const defaultRegion = data.defaultRegion || '';
const globalObjectName = data.globalObjectName || 'DataCrewConsent';

// Build color style string
const colorStyle = colorMode === 'gradient' 
  ? 'linear-gradient(135deg, ' + primaryColor + ' 0%, ' + secondaryColor + ' 100%)'
  : primaryColor;

// Parse region list
const regionList = defaultRegion ? defaultRegion.split(',').map(function(r) { return r.trim(); }) : [];

// Set default consent state
const defaultConsent = {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied',
  'functionality_storage': 'denied',
  'personalization_storage': 'denied',
  'security_storage': 'granted'
};

if (waitForUpdate) {
  defaultConsent.wait_for_update = waitForUpdateMs;
}

if (regionList.length > 0) {
  defaultConsent.region = regionList;
}

setDefaultConsentState(defaultConsent);

gtagSet('ads_data_redaction', true);
gtagSet('url_passthrough', true);

// Check for existing consent cookie
const existingConsent = getCookieValues(cookieName);
if (existingConsent && existingConsent.length > 0) {
  try {
    const parsed = JSON.parse(decodeUriComponent(existingConsent[0]));
    if (parsed) {
      updateConsentState({
        'ad_storage': parsed.ad_storage || 'denied',
        'ad_user_data': parsed.ad_user_data || 'denied',
        'ad_personalization': parsed.ad_personalization || 'denied',
        'analytics_storage': parsed.analytics_storage || 'denied',
        'functionality_storage': 'granted',
        'personalization_storage': 'granted',
        'security_storage': 'granted'
      });
    }
  } catch (e) {
    log('DataCrew CMP: Error parsing consent cookie');
  }
}

// Build the consent bar script
const consentBarScript = '(function(){' +
'"use strict";' +

// Translations
'var translations={' +
'hu:{' +
'title:"Süti beállítások",' +
'description:"A böngészési élmény fokozása, a személyre szabott hirdetések vagy tartalmak megjelenítése, valamint a forgalom elemzése érdekében sütiket (cookie) használunk. A \\"Minden elfogadása\\" gombra kattintva hozzájárulhat a legjobb böngészési élményt biztosító sütik használatához is. További információt a",' +
'linkText:"süti tájékoztatóban",' +
'linkSuffix:"talál.",' +
'acceptAll:"Minden elfogadása",' +
'customize:"Testreszabás",' +
'onlySelected:"Csak kiválasztottak",' +
'rejectAll:"Minden elutasítása",' +
'necessary:"Kötelező",' +
'necessaryDesc:"A kötelező sütik segítenek használhatóvá tenni a weboldalunkat azáltal, hogy engedélyeznek olyan alapvető funkciókat, mint az oldalon való navigáció és a weboldal biztonságos területeihez való hozzáférés. A weboldal ezen sütik nélkül nem tud megfelelően működni.",' +
'analytics:"Statisztikai",' +
'analyticsDesc:"Az adatok névtelen formában való gyűjtésén és jelentésén keresztül a statisztikai sütik segítenek a weboldal tulajdonosának abban, hogy megértse, hogyan lépnek interakcióba a látogatók a weboldallal.",' +
'marketing:"Marketing",' +
'marketingDesc:"A hirdetési sütiket arra használják, hogy a látogatókat személyre szabott hirdetésekkel juttassák el a korábban meglátogatott oldalak alapján, és elemezzék a hirdetési kampány hatékonyságát."' +
'},' +
'en:{' +
'title:"Cookie Settings",' +
'description:"We use cookies to enhance your browsing experience, display personalized ads or content, and analyze traffic. By clicking \\"Accept All\\", you consent to the use of cookies that provide the best browsing experience. Learn more in our",' +
'linkText:"cookie policy",' +
'linkSuffix:".",' +
'acceptAll:"Accept All",' +
'customize:"Customize",' +
'onlySelected:"Only Selected",' +
'rejectAll:"Reject All",' +
'necessary:"Necessary",' +
'necessaryDesc:"Necessary cookies help make the website usable by enabling basic functions such as page navigation and access to secure areas of the website. The website cannot function properly without these cookies.",' +
'analytics:"Statistical",' +
'analyticsDesc:"Statistical cookies help website owners understand how visitors interact with the website by collecting and reporting information anonymously.",' +
'marketing:"Marketing",' +
'marketingDesc:"Marketing cookies are used to deliver personalized ads to visitors based on previously visited pages and to analyze the effectiveness of advertising campaigns."' +
'}' +
'};' +

// Configuration from template
'var CONFIG={' +
'cookieName:"' + cookieName + '",' +
'cookieDomain:"' + cookieDomain + '",' +
'cookieExpiryDays:' + cookieExpiryDays + ',' +
'privacyPolicyUrl:"' + privacyPolicyUrl + '",' +
'colorStyle:"' + colorStyle + '",' +
'primaryColor:"' + primaryColor + '",' +
'bannerPosition:"' + bannerPosition + '",' +
'showOverlay:' + (showOverlay ? 'true' : 'false') + ',' +
'primaryButtonClass:"' + primaryButtonClass + '",' +
'secondaryButtonClass:"' + secondaryButtonClass + '",' +
'languageMode:"' + languageMode + '",' +
'globalObjectName:"' + globalObjectName + '"' +
'};' +

// State
'var state={' +
'view:"initial",' +
'language:detectLanguage(),' +
'analyticsConsent:false,' +
'marketingConsent:false,' +
'isRevisit:false,' +
'bannerElement:null,' +
'overlayElement:null' +
'};' +

// Helper functions
'function detectLanguage(){' +
'if(CONFIG.languageMode!=="auto")return CONFIG.languageMode;' +
'var browserLang=(navigator.language||navigator.userLanguage||"hu").toLowerCase();' +
'return browserLang.startsWith("en")?"en":"hu";' +
'}' +

'function t(key){return translations[state.language][key]||key;}' +

'function getCookie(name){' +
'var value="; "+document.cookie;' +
'var parts=value.split("; "+name+"=");' +
'if(parts.length===2)return parts.pop().split(";").shift();' +
'return null;' +
'}' +

'function setCookie(name,value,days){' +
'var date=new Date();' +
'date.setTime(date.getTime()+days*24*60*60*1000);' +
'var expires="expires="+date.toUTCString();' +
'var domain=CONFIG.cookieDomain?"; domain="+CONFIG.cookieDomain:"";' +
'document.cookie=name+"="+value+"; "+expires+"; path=/"+domain+"; secure; samesite=lax";' +
'}' +

'function deleteCookie(name){' +
'var domain=CONFIG.cookieDomain?"; domain="+CONFIG.cookieDomain:"";' +
'document.cookie=name+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"+domain;' +
'}' +

'function hasConsent(){return getCookie(CONFIG.cookieName)!==null;}' +

'function getConsentPreferences(){' +
'var cookie=getCookie(CONFIG.cookieName);' +
'if(!cookie)return null;' +
'try{return JSON.parse(decodeURIComponent(cookie));}catch(e){return null;}' +
'}' +

'function saveConsent(preferences){' +
'var consentMode={' +
'ad_storage:preferences.marketing?"granted":"denied",' +
'ad_user_data:preferences.marketing?"granted":"denied",' +
'analytics_storage:preferences.analytics?"granted":"denied",' +
'ad_personalization:preferences.marketing?"granted":"denied"' +
'};' +
'setCookie(CONFIG.cookieName,encodeURIComponent(JSON.stringify(consentMode)),CONFIG.cookieExpiryDays);' +
'if(typeof gtag==="function"){gtag("consent","update",consentMode);}' +
'if(window.dataLayer){window.dataLayer.push({event:"consent_updated"});}' +
'}' +

// CSS injection
'function injectStyles(){' +
'if(document.getElementById("dc-consent-styles"))return;' +
'var style=document.createElement("style");' +
'style.id="dc-consent-styles";' +
'style.textContent=' +
'".dc-consent-overlay{position:fixed!important;inset:0!important;background-color:rgba(0,0,0,0.5)!important;z-index:99998!important;}"' +
'+".dc-consent-overlay.dc-hidden{display:none!important;}"' +

// Position-specific styles
'+(CONFIG.bannerPosition==="center"?' +
'".dc-consent-banner{font-family:-apple-system,BlinkMacSystemFont,\\'Segoe UI\\',Roboto,\\'Helvetica Neue\\',Arial,sans-serif!important;position:fixed!important;top:50%!important;left:50%!important;transform:translate(-50%,-50%)!important;max-width:1024px!important;width:90%!important;background-color:#fff!important;border-radius:24px!important;box-shadow:0 4px 24px rgba(0,0,0,0.15)!important;z-index:99999!important;overflow:hidden!important;}"' +
':CONFIG.bannerPosition==="bottom"?' +
'".dc-consent-banner{font-family:-apple-system,BlinkMacSystemFont,\\'Segoe UI\\',Roboto,\\'Helvetica Neue\\',Arial,sans-serif!important;position:fixed!important;bottom:0!important;left:0!important;right:0!important;width:100%!important;background-color:#fff!important;border-radius:24px 24px 0 0!important;box-shadow:0 -4px 24px rgba(0,0,0,0.15)!important;z-index:99999!important;overflow:hidden!important;}"' +
':' +
'".dc-consent-banner{font-family:-apple-system,BlinkMacSystemFont,\\'Segoe UI\\',Roboto,\\'Helvetica Neue\\',Arial,sans-serif!important;position:fixed!important;bottom:20px!important;left:20px!important;max-width:420px!important;width:calc(100% - 40px)!important;background-color:#fff!important;border-radius:16px!important;box-shadow:0 4px 24px rgba(0,0,0,0.15)!important;z-index:99999!important;overflow:hidden!important;}"' +
')' +

'+".dc-consent-banner.dc-customize-view{max-width:900px!important;max-height:90vh!important;overflow-y:auto!important;}"' +
'+".dc-consent-banner.dc-hidden{display:none!important;}"' +
'+".dc-consent-title{background:"+CONFIG.colorStyle+"!important;color:white!important;text-align:center!important;font-size:20px!important;padding:14px 20px!important;margin:0!important;font-weight:700!important;}"' +
'+".dc-consent-text{font-size:14px!important;padding:20px!important;line-height:1.5!important;color:#333333!important;margin:0!important;}"' +
'+".dc-consent-text a{color:"+CONFIG.primaryColor+"!important;text-decoration:underline!important;}"' +
'+".dc-consent-text a:hover{opacity:0.8!important;}"' +
'+".dc-consent-buttons{display:flex!important;flex-direction:row!important;justify-content:center!important;gap:10px!important;padding:0 20px 20px 20px!important;flex-wrap:wrap!important;}"' +
'+".dc-consent-buttons button{border:none!important;padding:12px 24px!important;text-align:center!important;text-decoration:none!important;font-size:14px!important;cursor:pointer!important;border-radius:8px!important;font-weight:600!important;white-space:nowrap!important;min-width:140px!important;transition:all 0.2s ease!important;}"' +
'+".dc-btn-primary-fallback{background:"+CONFIG.colorStyle+"!important;color:white!important;}"' +
'+".dc-btn-primary-fallback:hover{opacity:0.9!important;}"' +
'+".dc-btn-secondary-fallback{background:#f3f4f6!important;color:#374151!important;border:1px solid #d1d5db!important;}"' +
'+".dc-btn-secondary-fallback:hover{background:#e5e7eb!important;}"' +
'+".dc-consent-categories{display:flex!important;flex-direction:column!important;gap:12px!important;padding:0 20px!important;margin-bottom:20px!important;}"' +
'+".dc-category{display:grid!important;grid-template-columns:1fr auto!important;gap:16px!important;align-items:start!important;padding:16px!important;border-radius:12px!important;background:#f8f8f8!important;}"' +
'+".dc-category-info{display:flex!important;flex-direction:column!important;gap:6px!important;}"' +
'+".dc-category-title{font-size:16px!important;font-weight:600!important;color:#333!important;margin:0!important;}"' +
'+".dc-category-description{font-size:13px!important;line-height:1.5!important;color:#666!important;margin:0!important;}"' +
'+".dc-category-toggle{display:flex!important;align-items:center!important;justify-content:center!important;padding-top:4px!important;}"' +
'+".dc-toggle{display:none!important;}"' +
'+".dc-toggle+.dc-toggle-btn{outline:0!important;display:block!important;width:50px!important;height:26px!important;position:relative!important;cursor:pointer!important;user-select:none!important;background:#ccc!important;border-radius:26px!important;padding:2px!important;transition:all 0.3s ease!important;}"' +
'+".dc-toggle+.dc-toggle-btn:after{position:absolute!important;display:block!important;content:\\"\\"!important;width:22px!important;height:22px!important;left:2px!important;top:2px!important;border-radius:50%!important;background:#fff!important;transition:all 0.2s ease!important;box-shadow:0 2px 4px rgba(0,0,0,0.2)!important;}"' +
'+".dc-toggle:checked+.dc-toggle-btn{background:"+CONFIG.colorStyle+"!important;}"' +
'+".dc-toggle:checked+.dc-toggle-btn:after{left:26px!important;}"' +
'+".dc-toggle-btn.dc-disabled{background:#999!important;cursor:not-allowed!important;opacity:0.7!important;}"' +
'+".dc-toggle-btn.dc-disabled:after{background:#e0e0e0!important;}"' +
// Mobile styles
'+"@media(max-width:768px){"' +
'+".dc-consent-banner{width:95%!important;max-height:85vh!important;overflow-y:auto!important;}"' +
'+".dc-consent-banner.dc-customize-view{max-height:90vh!important;}"' +
'+".dc-consent-title{font-size:18px!important;padding:12px 16px!important;}"' +
'+".dc-consent-text{font-size:13px!important;padding:16px!important;}"' +
'+".dc-consent-buttons{flex-direction:column!important;align-items:center!important;gap:8px!important;padding:0 16px 16px 16px!important;}"' +
'+".dc-consent-buttons button{width:100%!important;max-width:280px!important;padding:12px 16px!important;font-size:14px!important;}"' +
'+".dc-consent-categories{padding:0 16px!important;gap:10px!important;margin-bottom:16px!important;}"' +
'+".dc-category{gap:12px!important;padding:12px!important;align-items:center!important;}"' +
'+".dc-category-info{gap:4px!important;}"' +
'+".dc-category-title{font-size:14px!important;}"' +
'+".dc-category-description{font-size:12px!important;line-height:1.4!important;}"' +
'+".dc-category-toggle{padding-top:0!important;}"' +
'+"}"' +
';' +
'document.head.appendChild(style);' +
'}' +

// Check if class exists in stylesheet
'function classExists(className){' +
'if(!className)return false;' +
'try{' +
'for(var i=0;i<document.styleSheets.length;i++){' +
'var sheet=document.styleSheets[i];' +
'try{' +
'var rules=sheet.cssRules||sheet.rules;' +
'if(rules){' +
'for(var j=0;j<rules.length;j++){' +
'if(rules[j].selectorText&&rules[j].selectorText.indexOf("."+className)!==-1)return true;' +
'}' +
'}' +
'}catch(e){}' +
'}' +
'}catch(e){}' +
'return false;' +
'}' +

// Create banner
'function createBanner(){' +
'if(state.bannerElement)state.bannerElement.remove();' +
'if(state.overlayElement)state.overlayElement.remove();' +
'injectStyles();' +

'var overlay=document.createElement("div");' +
'overlay.className="dc-consent-overlay"+(CONFIG.showOverlay?"":" dc-hidden");' +
'overlay.id="dc-consent-overlay";' +
'overlay.onclick=function(){if(state.isRevisit)hideBanner();};' +

'var banner=document.createElement("div");' +
'banner.className="dc-consent-banner"+(state.view==="customize"?" dc-customize-view":"");' +
'banner.id="dc-consent-banner";' +

'var title=document.createElement("div");' +
'title.className="dc-consent-title";' +
'title.textContent=t("title");' +
'banner.appendChild(title);' +

'var desc=document.createElement("p");' +
'desc.className="dc-consent-text";' +
'desc.innerHTML=t("description")+" <a href=\\""+CONFIG.privacyPolicyUrl+"\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">"+t("linkText")+"</a> "+t("linkSuffix");' +
'banner.appendChild(desc);' +

'var usePrimaryClass=CONFIG.primaryButtonClass&&classExists(CONFIG.primaryButtonClass);' +
'var useSecondaryClass=CONFIG.secondaryButtonClass&&classExists(CONFIG.secondaryButtonClass);' +
'var primaryBtnClass=usePrimaryClass?CONFIG.primaryButtonClass:"dc-btn-primary-fallback";' +
'var secondaryBtnClass=useSecondaryClass?CONFIG.secondaryButtonClass:"dc-btn-secondary-fallback";' +

'if(state.view==="initial"){' +
'var buttons=document.createElement("div");' +
'buttons.className="dc-consent-buttons";' +

'var acceptAllBtn=document.createElement("button");' +
'acceptAllBtn.className=primaryBtnClass;' +
'acceptAllBtn.textContent=t("acceptAll");' +
'acceptAllBtn.onclick=handleAcceptAll;' +
'buttons.appendChild(acceptAllBtn);' +

'var customizeBtn=document.createElement("button");' +
'customizeBtn.className=secondaryBtnClass;' +
'customizeBtn.textContent=t("customize");' +
'customizeBtn.onclick=handleCustomize;' +
'buttons.appendChild(customizeBtn);' +

'banner.appendChild(buttons);' +
'}else{' +
'var categories=document.createElement("div");' +
'categories.className="dc-consent-categories";' +
'categories.appendChild(createCategory("necessary",t("necessary"),t("necessaryDesc"),true,true));' +
'categories.appendChild(createCategory("analytics",t("analytics"),t("analyticsDesc"),state.analyticsConsent,false));' +
'categories.appendChild(createCategory("marketing",t("marketing"),t("marketingDesc"),state.marketingConsent,false));' +
'banner.appendChild(categories);' +

'var buttons=document.createElement("div");' +
'buttons.className="dc-consent-buttons";' +

'var acceptAllBtn=document.createElement("button");' +
'acceptAllBtn.className=primaryBtnClass;' +
'acceptAllBtn.textContent=t("acceptAll");' +
'acceptAllBtn.onclick=handleAcceptAll;' +
'buttons.appendChild(acceptAllBtn);' +

'var selectedBtn=document.createElement("button");' +
'selectedBtn.className=secondaryBtnClass;' +
'selectedBtn.textContent=t("onlySelected");' +
'selectedBtn.onclick=handleAcceptSelected;' +
'buttons.appendChild(selectedBtn);' +

'var rejectBtn=document.createElement("button");' +
'rejectBtn.className=secondaryBtnClass;' +
'rejectBtn.textContent=t("rejectAll");' +
'rejectBtn.onclick=handleRejectAll;' +
'buttons.appendChild(rejectBtn);' +

'banner.appendChild(buttons);' +
'}' +

'document.body.appendChild(overlay);' +
'document.body.appendChild(banner);' +
'state.overlayElement=overlay;' +
'state.bannerElement=banner;' +
'}' +

// Create category
'function createCategory(id,title,description,checked,disabled){' +
'var category=document.createElement("div");' +
'category.className="dc-category";' +

'var info=document.createElement("div");' +
'info.className="dc-category-info";' +

'var titleEl=document.createElement("h3");' +
'titleEl.className="dc-category-title";' +
'titleEl.textContent=title;' +
'info.appendChild(titleEl);' +

'var descEl=document.createElement("p");' +
'descEl.className="dc-category-description";' +
'descEl.textContent=description;' +
'info.appendChild(descEl);' +

'category.appendChild(info);' +

'var toggleWrap=document.createElement("div");' +
'toggleWrap.className="dc-category-toggle";' +

'var toggle=document.createElement("input");' +
'toggle.type="checkbox";' +
'toggle.className="dc-toggle";' +
'toggle.id="dc-toggle-"+id;' +
'toggle.checked=checked;' +
'toggle.disabled=disabled;' +
'toggle.onchange=function(){' +
'if(id==="analytics")state.analyticsConsent=toggle.checked;' +
'else if(id==="marketing")state.marketingConsent=toggle.checked;' +
'};' +
'toggleWrap.appendChild(toggle);' +

'var label=document.createElement("label");' +
'label.className="dc-toggle-btn"+(disabled?" dc-disabled":"");' +
'label.htmlFor="dc-toggle-"+id;' +
'toggleWrap.appendChild(label);' +

'category.appendChild(toggleWrap);' +
'return category;' +
'}' +

// Event handlers
'function handleAcceptAll(){' +
'if(state.view==="customize"){' +
'state.analyticsConsent=true;' +
'state.marketingConsent=true;' +
'var analyticsToggle=document.getElementById("dc-toggle-analytics");' +
'var marketingToggle=document.getElementById("dc-toggle-marketing");' +
'if(analyticsToggle)analyticsToggle.checked=true;' +
'if(marketingToggle)marketingToggle.checked=true;' +
'setTimeout(function(){' +
'saveConsent({necessary:true,analytics:true,marketing:true});' +
'hideBanner();' +
'},200);' +
'}else{' +
'saveConsent({necessary:true,analytics:true,marketing:true});' +
'hideBanner();' +
'}' +
'}' +

'function handleCustomize(){' +
'state.view="customize";' +
'createBanner();' +
'}' +

'function handleAcceptSelected(){' +
'saveConsent({' +
'necessary:true,' +
'analytics:state.analyticsConsent,' +
'marketing:state.marketingConsent' +
'});' +
'hideBanner();' +
'}' +

'function handleRejectAll(){' +
'state.analyticsConsent=false;' +
'state.marketingConsent=false;' +
'var analyticsToggle=document.getElementById("dc-toggle-analytics");' +
'var marketingToggle=document.getElementById("dc-toggle-marketing");' +
'if(analyticsToggle)analyticsToggle.checked=false;' +
'if(marketingToggle)marketingToggle.checked=false;' +
'setTimeout(function(){' +
'saveConsent({necessary:true,analytics:false,marketing:false});' +
'hideBanner();' +
'},200);' +
'}' +

'function hideBanner(){' +
'state.view="initial";' +
'if(state.bannerElement){state.bannerElement.remove();state.bannerElement=null;}' +
'if(state.overlayElement){state.overlayElement.remove();state.overlayElement=null;}' +
'}' +

// Public API
'window[CONFIG.globalObjectName]={' +
'show:function(forceCustomize){' +
'state.isRevisit=true;' +
'state.view=forceCustomize?"customize":"initial";' +
'var existing=getConsentPreferences();' +
'if(existing){' +
'state.analyticsConsent=existing.analytics_storage==="granted";' +
'state.marketingConsent=existing.ad_storage==="granted";' +
'}else{' +
'state.analyticsConsent=false;' +
'state.marketingConsent=false;' +
'}' +
'createBanner();' +
'},' +
'hide:function(){hideBanner();},' +
'clearConsent:function(){' +
'deleteCookie(CONFIG.cookieName);' +
'state.analyticsConsent=false;' +
'state.marketingConsent=false;' +
'state.isRevisit=false;' +
'state.view="initial";' +
'createBanner();' +
'},' +
'getConsent:function(){return getConsentPreferences();},' +
'hasConsent:function(){return hasConsent();},' +
'setLanguage:function(lang){' +
'if(lang==="hu"||lang==="en"){' +
'state.language=lang;' +
'if(state.bannerElement)createBanner();' +
'}' +
'},' +
'getLanguage:function(){return state.language;}' +
'};' +

// Initialize
'function init(){' +
'if(!hasConsent()){state.isRevisit=false;createBanner();}' +
'else{' +
'var existing=getConsentPreferences();' +
'if(existing&&typeof gtag==="function")gtag("consent","update",existing);' +
'}' +
'}' +

'if(document.readyState==="loading"){' +
'document.addEventListener("DOMContentLoaded",init);' +
'}else{init();}' +

'})();';

// Inject the script
const scriptUrl = 'data:text/javascript;charset=utf-8,' + encodeUri(consentBarScript);

injectScript(scriptUrl, data.gtmOnSuccess, data.gtmOnFailure, 'dataCrewCMP');


___WEB_PERMISSIONS___

[
  {
    "instance": {
      "key": {
        "publicId": "logging",
        "versionId": "1"
      },
      "param": [
        {
          "key": "environments",
          "value": {
            "type": 1,
            "string": "debug"
          }
        }
      ]
    },
    "clientAnnotations": {
      "isEditedByUser": true
    },
    "isRequired": true
  },
  {
    "instance": {
      "key": {
        "publicId": "access_globals",
        "versionId": "1"
      },
      "param": [
        {
          "key": "keys",
          "value": {
            "type": 2,
            "listItem": [
              {
                "type": 3,
                "mapKey": [
                  {
                    "type": 1,
                    "string": "key"
                  },
                  {
                    "type": 1,
                    "string": "read"
                  },
                  {
                    "type": 1,
                    "string": "write"
                  },
                  {
                    "type": 1,
                    "string": "execute"
                  }
                ],
                "mapValue": [
                  {
                    "type": 1,
                    "string": "dataLayer"
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": false
                  }
                ]
              },
              {
                "type": 3,
                "mapKey": [
                  {
                    "type": 1,
                    "string": "key"
                  },
                  {
                    "type": 1,
                    "string": "read"
                  },
                  {
                    "type": 1,
                    "string": "write"
                  },
                  {
                    "type": 1,
                    "string": "execute"
                  }
                ],
                "mapValue": [
                  {
                    "type": 1,
                    "string": "gtag"
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": true
                  }
                ]
              }
            ]
          }
        }
      ]
    },
    "clientAnnotations": {
      "isEditedByUser": true
    },
    "isRequired": true
  },
  {
    "instance": {
      "key": {
        "publicId": "inject_script",
        "versionId": "1"
      },
      "param": [
        {
          "key": "urls",
          "value": {
            "type": 2,
            "listItem": [
              {
                "type": 1,
                "string": "data:*"
              }
            ]
          }
        }
      ]
    },
    "clientAnnotations": {
      "isEditedByUser": true
    },
    "isRequired": true
  },
  {
    "instance": {
      "key": {
        "publicId": "get_cookies",
        "versionId": "1"
      },
      "param": [
        {
          "key": "cookieAccess",
          "value": {
            "type": 1,
            "string": "any"
          }
        }
      ]
    },
    "clientAnnotations": {
      "isEditedByUser": true
    },
    "isRequired": true
  },
  {
    "instance": {
      "key": {
        "publicId": "set_cookies",
        "versionId": "1"
      },
      "param": [
        {
          "key": "allowedCookies",
          "value": {
            "type": 2,
            "listItem": [
              {
                "type": 3,
                "mapKey": [
                  {
                    "type": 1,
                    "string": "name"
                  },
                  {
                    "type": 1,
                    "string": "domain"
                  },
                  {
                    "type": 1,
                    "string": "path"
                  },
                  {
                    "type": 1,
                    "string": "secure"
                  },
                  {
                    "type": 1,
                    "string": "session"
                  }
                ],
                "mapValue": [
                  {
                    "type": 1,
                    "string": "*"
                  },
                  {
                    "type": 1,
                    "string": "*"
                  },
                  {
                    "type": 1,
                    "string": "*"
                  },
                  {
                    "type": 1,
                    "string": "any"
                  },
                  {
                    "type": 1,
                    "string": "any"
                  }
                ]
              }
            ]
          }
        }
      ]
    },
    "clientAnnotations": {
      "isEditedByUser": true
    },
    "isRequired": true
  },
  {
    "instance": {
      "key": {
        "publicId": "access_consent",
        "versionId": "1"
      },
      "param": [
        {
          "key": "consentTypes",
          "value": {
            "type": 2,
            "listItem": [
              {
                "type": 3,
                "mapKey": [
                  {
                    "type": 1,
                    "string": "consentType"
                  },
                  {
                    "type": 1,
                    "string": "read"
                  },
                  {
                    "type": 1,
                    "string": "write"
                  }
                ],
                "mapValue": [
                  {
                    "type": 1,
                    "string": "ad_storage"
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": true
                  }
                ]
              },
              {
                "type": 3,
                "mapKey": [
                  {
                    "type": 1,
                    "string": "consentType"
                  },
                  {
                    "type": 1,
                    "string": "read"
                  },
                  {
                    "type": 1,
                    "string": "write"
                  }
                ],
                "mapValue": [
                  {
                    "type": 1,
                    "string": "analytics_storage"
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": true
                  }
                ]
              },
              {
                "type": 3,
                "mapKey": [
                  {
                    "type": 1,
                    "string": "consentType"
                  },
                  {
                    "type": 1,
                    "string": "read"
                  },
                  {
                    "type": 1,
                    "string": "write"
                  }
                ],
                "mapValue": [
                  {
                    "type": 1,
                    "string": "ad_user_data"
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": true
                  }
                ]
              },
              {
                "type": 3,
                "mapKey": [
                  {
                    "type": 1,
                    "string": "consentType"
                  },
                  {
                    "type": 1,
                    "string": "read"
                  },
                  {
                    "type": 1,
                    "string": "write"
                  }
                ],
                "mapValue": [
                  {
                    "type": 1,
                    "string": "ad_personalization"
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": true
                  }
                ]
              },
              {
                "type": 3,
                "mapKey": [
                  {
                    "type": 1,
                    "string": "consentType"
                  },
                  {
                    "type": 1,
                    "string": "read"
                  },
                  {
                    "type": 1,
                    "string": "write"
                  }
                ],
                "mapValue": [
                  {
                    "type": 1,
                    "string": "functionality_storage"
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": true
                  }
                ]
              },
              {
                "type": 3,
                "mapKey": [
                  {
                    "type": 1,
                    "string": "consentType"
                  },
                  {
                    "type": 1,
                    "string": "read"
                  },
                  {
                    "type": 1,
                    "string": "write"
                  }
                ],
                "mapValue": [
                  {
                    "type": 1,
                    "string": "personalization_storage"
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": true
                  }
                ]
              },
              {
                "type": 3,
                "mapKey": [
                  {
                    "type": 1,
                    "string": "consentType"
                  },
                  {
                    "type": 1,
                    "string": "read"
                  },
                  {
                    "type": 1,
                    "string": "write"
                  }
                ],
                "mapValue": [
                  {
                    "type": 1,
                    "string": "security_storage"
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": true
                  }
                ]
              }
            ]
          }
        }
      ]
    },
    "clientAnnotations": {
      "isEditedByUser": true
    },
    "isRequired": true
  },
  {
    "instance": {
      "key": {
        "publicId": "write_data_layer",
        "versionId": "1"
      },
      "param": [
        {
          "key": "keyPatterns",
          "value": {
            "type": 2,
            "listItem": [
              {
                "type": 1,
                "string": "event"
              },
              {
                "type": 1,
                "string": "ads_data_redaction"
              },
              {
                "type": 1,
                "string": "url_passthrough"
              }
            ]
          }
        }
      ]
    },
    "clientAnnotations": {
      "isEditedByUser": true
    },
    "isRequired": true
  }
]


___TESTS___

scenarios: []


___NOTES___

Created on 2024
DataCrew CMP - Free Consent Management Platform
https://github.com/datacrew/datacrew-cmp

Features:
- Google Consent Mode v2 support
- Customizable colors (solid/gradient)
- Multiple banner positions (center, bottom, bottom-left)
- Multi-language support (HU/EN)
- Optional overlay
- Custom button classes with fallback
- Cookie domain configuration
