___INFO___

{
  "type": "TAG",
  "id": "cvt_temp_public_id",
  "version": 1,
  "securityGroups": [],
  "displayName": "DataCrew CMP - Consent Management",
  "brand": {
    "id": "datacrew",
    "displayName": "DataCrew",
    "thumbnail": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADaklEQVR4nO2ZW4hNURjHf2MYl1wSuZQHLyIPeJAHkTy4vEhK8qBckksu5cFl8OJS4kEeJJcHpCQPLi+SB5cXISTXKJfBOGbG+LXW2Wf2nH322XvtM3Nmzv7X02z2d/n+e6+11l4bUqRIkSJFihQp/g8UAiuAI8B14DXwDmgG2oCvwAfgMXAHuAYcBVYChT2VeCowFjgNvAHa8ccP4CZwEBgXd+LCYC9wF/gVYeKdoQU4D+TGkXwRcCvG5DtDE3AEyEhW8unAUYKbJZHoAs4CyxKd/Ayg1mfyTcBxYBSwQ63wCEAzsMabRB8/k58MnAJqIiZfDRQBdxKYfCuwLGLyM4FVwN0EJl8DbIuY/DRgPVCZwOSrgLMRk58ArAYeJjD5a8DxCMn3BTYAD0I+qwK4EkHyqcBGoDbkszLgUoTJZwIbgYaQzyqBSxGSHwJsBhpDPisHLkdIfhiwBWgK+ewpcClC8rW7gKaQz8qASxGSnwBsB5pDPnsJXI6Q/GRgJ9AS8tlz4HKE5GcAe4C2kM+eAVfCkh8AbAW+hHxWAlyNkPxsYB/wLeSzx8C1sOQHApuATyGfPQKuh83EPGAj8D7gs4fA9bCZWAAUAx8CPrsP3AhLfhGwDnjr89k94GZY8muApcArn8/uALfCkl8PrACafT67DdwOS349sA5o8fmsArgTlvwmYCXQ6vPZTeBuWPKbgDVAm89nN4B7YclvAdYCnT6fXQceREl+O7AO6PL57BrwIEryO4H1QLfPZ1eBh1GS3w2sB372+OwK8ChK8vuBjcCvHp9dAh5HSf4AsAno9vnsIvAkSvJHgM1Az9vIi8DTKJ9VBJbQPX5OTqWEJd8AnIqQ/P+GKAUupwNb6R4fp4RSYU0cNYUldwlY3sOyfxqW3GVgZQ8m/xRYFeKzS8CakM8qgXVhyV0BNvRg8k+BTWHJXQU2h3xWAWwJS74K2BI2eVcNTCX43lwBbIuQ/PW0T7uJ1WkfARG4AeyIkPzNtP9A4vJwE7gnQvK30v7s/xJgbdpf/ufhNnBfhOTvpP3Rfx7uAQ9ESP5e2h/9y3EOHkZI/n7an/zL8RgeRUj+Qdof/A9FccIjeBIh+Udpf+6/Hy+Bp0M+e5r2x/59cYIzeBYh+adp/61/rEoRANXAc+AXUaPtfALYR7UgAAAASUVORK5CYII="
  },
  "description": "Free, lightweight Consent Management Platform with Google Consent Mode v2 support.",
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
        "valueHint": "#FA4716"
      },
      {
        "type": "TEXT",
        "name": "secondaryColor",
        "displayName": "Secondary Color (HEX)",
        "simpleValueType": true,
        "defaultValue": "#FA6212",
        "valueHint": "#FA6212",
        "enablingConditions": [
          {
            "paramName": "colorMode",
            "paramValue": "gradient",
            "type": "EQUALS"
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
            "value": "bottomleft",
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
        "defaultValue": true
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
        "help": "CSS class name for primary buttons (e.g. btn-primary). Leave empty for default styling."
      },
      {
        "type": "TEXT",
        "name": "secondaryButtonClass",
        "displayName": "Secondary Button CSS Class",
        "simpleValueType": true,
        "defaultValue": "",
        "help": "CSS class name for secondary buttons (e.g. btn-secondary). Leave empty for default styling."
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
        "name": "cookieDomain",
        "displayName": "Cookie Domain",
        "simpleValueType": true,
        "defaultValue": "",
        "help": "Leave empty for current domain. Use .example.com for all subdomains."
      },
      {
        "type": "TEXT",
        "name": "cookieExpiryDays",
        "displayName": "Cookie Expiry (days)",
        "simpleValueType": true,
        "defaultValue": "365"
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
        "displayName": "Privacy Policy URL",
        "simpleValueType": true,
        "defaultValue": "/privacy-policy/"
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
        "displayName": "Language",
        "macrosInSelect": false,
        "selectItems": [
          {
            "value": "auto",
            "displayValue": "Auto-detect"
          },
          {
            "value": "hu",
            "displayValue": "Hungarian"
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
    "groupStyle": "ZIPPY_OPEN",
    "subParams": [
      {
        "type": "SELECT",
        "name": "defaultAdStorage",
        "displayName": "ad_storage",
        "macrosInSelect": false,
        "selectItems": [
          {
            "value": "denied",
            "displayValue": "denied"
          },
          {
            "value": "granted",
            "displayValue": "granted"
          }
        ],
        "simpleValueType": true,
        "defaultValue": "denied",
        "help": "Controls storage for advertising purposes (e.g., cookies for ads)"
      },
      {
        "type": "SELECT",
        "name": "defaultAdUserData",
        "displayName": "ad_user_data",
        "macrosInSelect": false,
        "selectItems": [
          {
            "value": "denied",
            "displayValue": "denied"
          },
          {
            "value": "granted",
            "displayValue": "granted"
          }
        ],
        "simpleValueType": true,
        "defaultValue": "denied",
        "help": "Controls sending user data to Google for advertising purposes"
      },
      {
        "type": "SELECT",
        "name": "defaultAdPersonalization",
        "displayName": "ad_personalization",
        "macrosInSelect": false,
        "selectItems": [
          {
            "value": "denied",
            "displayValue": "denied"
          },
          {
            "value": "granted",
            "displayValue": "granted"
          }
        ],
        "simpleValueType": true,
        "defaultValue": "denied",
        "help": "Controls personalized advertising (remarketing)"
      },
      {
        "type": "SELECT",
        "name": "defaultAnalyticsStorage",
        "displayName": "analytics_storage",
        "macrosInSelect": false,
        "selectItems": [
          {
            "value": "denied",
            "displayValue": "denied"
          },
          {
            "value": "granted",
            "displayValue": "granted"
          }
        ],
        "simpleValueType": true,
        "defaultValue": "denied",
        "help": "Controls storage for analytics purposes (e.g., visit duration)"
      },
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
        "displayName": "Wait timeout (ms)",
        "simpleValueType": true,
        "defaultValue": "500",
        "enablingConditions": [
          {
            "paramName": "waitForUpdate",
            "paramValue": true,
            "type": "EQUALS"
          }
        ]
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
        "displayName": "API Object Name",
        "simpleValueType": true,
        "defaultValue": "DataCrewConsent"
      },
      {
        "type": "CHECKBOX",
        "name": "adsDataRedaction",
        "checkboxText": "Enable ads_data_redaction (default: enabled)",
        "simpleValueType": true,
        "defaultValue": true,
        "help": "When enabled, ad click identifiers are redacted when ad_storage is denied. Automatically disabled when marketing consent is granted."
      },
      {
        "type": "CHECKBOX",
        "name": "urlPassthrough",
        "checkboxText": "Enable url_passthrough (default: disabled)",
        "simpleValueType": true,
        "defaultValue": false,
        "help": "When enabled, ad click info is passed through URL parameters. Automatically set to false when consent is given."
      }
    ]
  }
]


___SANDBOXED_JS_FOR_WEB_TEMPLATE___

const setDefaultConsentState = require('setDefaultConsentState');
const updateConsentState = require('updateConsentState');
const getCookieValues = require('getCookieValues');
const JSON = require('JSON');
const makeNumber = require('makeNumber');
const gtagSet = require('gtagSet');
const setInWindow = require('setInWindow');
const injectScript = require('injectScript');

var colorMode = data.colorMode || 'gradient';
var primaryColor = data.primaryColor || '#FA4716';
var secondaryColor = data.secondaryColor || '#FA6212';
var bannerPosition = data.bannerPosition || 'center';
var showOverlay = data.showOverlay !== false;
var primaryButtonClass = data.primaryButtonClass || '';
var secondaryButtonClass = data.secondaryButtonClass || '';
var cookieDomain = data.cookieDomain || '';
var cookieExpiryDays = makeNumber(data.cookieExpiryDays) || 365;
var privacyPolicyUrl = data.privacyPolicyUrl || '/privacy-policy/';
var languageMode = data.languageMode || 'auto';
var waitForUpdate = data.waitForUpdate !== false;
var waitForUpdateMs = makeNumber(data.waitForUpdateMs) || 500;
var globalObjectName = data.globalObjectName || 'DataCrewConsent';
var adsDataRedaction = data.adsDataRedaction !== false;
var urlPassthrough = data.urlPassthrough === true;

var colorStyle = colorMode === 'gradient' 
  ? 'linear-gradient(135deg, ' + primaryColor + ' 0%, ' + secondaryColor + ' 100%)'
  : primaryColor;

var defaultConsent = {
  'ad_storage': data.defaultAdStorage || 'denied',
  'ad_user_data': data.defaultAdUserData || 'denied',
  'ad_personalization': data.defaultAdPersonalization || 'denied',
  'analytics_storage': data.defaultAnalyticsStorage || 'denied'
};

if (waitForUpdate) {
  defaultConsent.wait_for_update = waitForUpdateMs;
}

setDefaultConsentState(defaultConsent);
gtagSet('ads_data_redaction', adsDataRedaction);
gtagSet('url_passthrough', urlPassthrough);

var cookieName = 'datacrew-consent';
var existingConsent = getCookieValues(cookieName);
if (existingConsent && existingConsent.length > 0) {
  var parsed = JSON.parse(existingConsent[0]);
  if (parsed) {
    var hasMarketing = false;
    var hasStatistics = false;
    if (parsed.indexOf) {
      hasMarketing = parsed.indexOf('marketing') > -1;
      hasStatistics = parsed.indexOf('statistics') > -1;
    }
    updateConsentState({
      'ad_storage': hasMarketing ? 'granted' : 'denied',
      'ad_user_data': hasMarketing ? 'granted' : 'denied',
      'ad_personalization': hasMarketing ? 'granted' : 'denied',
      'analytics_storage': hasStatistics ? 'granted' : 'denied'
    });
  }
}

var config = {
  cd: cookieDomain,
  ce: cookieExpiryDays,
  pp: privacyPolicyUrl,
  cs: colorStyle,
  pc: primaryColor,
  bp: bannerPosition,
  so: showOverlay ? 1 : 0,
  pb: primaryButtonClass,
  sb: secondaryButtonClass,
  lm: languageMode,
  go: globalObjectName,
  adr: adsDataRedaction,
  up: urlPassthrough
};

setInWindow('__dcCmpConfig', config, true);

injectScript('https://cdn.jsdelivr.net/gh/DataCrew-Agency/datacrew-cmp@bd4e0a7/dist/consent-bar.min.js', data.gtmOnSuccess, data.gtmOnFailure, 'dataCrewCMP');


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
                    "string": "__dcCmpConfig"
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
                "string": "https://cdn.jsdelivr.net/gh/DataCrew-Agency/datacrew-cmp@bd4e0a7/*"
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

DataCrew CMP - Free Consent Management Platform
https://github.com/DataCrew-Agency/datacrew-cmp

Cookie format: ["statistics","marketing"] - only granted categories are stored

API Methods:
- DataCrewConsent.show() - Show consent banner
- DataCrewConsent.show(true) - Show customization view
- DataCrewConsent.hide() - Hide banner
- DataCrewConsent.revisitConsent() - Reopen consent settings
- DataCrewConsent.clearConsent() - Clear consent and show banner
- DataCrewConsent.getConsent() - Get current consent state
- DataCrewConsent.hasConsent() - Check if consent exists
- DataCrewConsent.setLanguage('hu'|'en') - Change language
