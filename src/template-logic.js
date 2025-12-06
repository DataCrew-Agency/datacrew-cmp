/**
 * DataCrew CMP - GTM Template Logic (Sandboxed JS)
 * 
 * This file contains the sandboxed JavaScript that runs in GTM.
 * It handles:
 * - Setting default consent state
 * - Reading existing consent from cookies
 * - Injecting the consent bar script
 */

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

// Set default consent state (MUST happen before any tags fire)
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

// Set default consent
setDefaultConsentState(defaultConsent);

// Enable URL passthrough and ads data redaction for better measurement
gtagSet('ads_data_redaction', true);
gtagSet('url_passthrough', true);

// Check for existing consent cookie and update if found
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

// Build and inject the consent bar script
// The script is injected as a data URI to avoid external dependencies
const consentBarScript = buildConsentBarScript({
  cookieName: cookieName,
  cookieDomain: cookieDomain,
  cookieExpiryDays: cookieExpiryDays,
  privacyPolicyUrl: privacyPolicyUrl,
  colorStyle: colorStyle,
  primaryColor: primaryColor,
  bannerPosition: bannerPosition,
  showOverlay: showOverlay,
  primaryButtonClass: primaryButtonClass,
  secondaryButtonClass: secondaryButtonClass,
  languageMode: languageMode,
  globalObjectName: globalObjectName
});

const scriptUrl = 'data:text/javascript;charset=utf-8,' + encodeUri(consentBarScript);

injectScript(scriptUrl, data.gtmOnSuccess, data.gtmOnFailure, 'dataCrewCMP');

// Helper function to build the consent bar script
function buildConsentBarScript(config) {
  // This would be the minified consent-bar.js with config values replaced
  // See template.tpl for the actual implementation
  return '...';
}
