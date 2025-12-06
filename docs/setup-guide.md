# DataCrew CMP - Setup Guide

## Quick Start

### 1. Import the Template

**Option A: From Community Template Gallery**
1. In GTM, go to **Templates** → **Search Gallery**
2. Search for "DataCrew CMP"
3. Click **Add to workspace**

**Option B: Manual Import**
1. Download `template.tpl` from GitHub
2. In GTM, go to **Templates** → **Tag Templates** → **New**
3. Click the three-dot menu → **Import**
4. Select the downloaded file and save

### 2. Create the Consent Tag

1. Go to **Tags** → **New**
2. Choose **DataCrew CMP - Consent Management**
3. Configure your settings (see below)
4. Set trigger to **Consent Initialization - All Pages**
5. Save and publish

## Configuration Options

### Appearance

| Setting | Description |
|---------|-------------|
| **Color Mode** | Choose between solid color or gradient |
| **Primary Color** | Main brand color (HEX format) |
| **Secondary Color** | Gradient end color (only for gradient mode) |
| **Banner Position** | Center (modal), Bottom bar, or Bottom-left corner |
| **Show Overlay** | Dark background overlay behind banner |

### Button Styling

| Setting | Description |
|---------|-------------|
| **Primary Button Class** | Your site's CSS class for primary buttons |
| **Secondary Button Class** | Your site's CSS class for secondary buttons |

**Note:** If the specified classes don't exist in your site's CSS, fallback styles will be used automatically.

### Cookie Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Cookie Name** | Name for the consent cookie | `consentMode` |
| **Cookie Domain** | Domain for the cookie (include leading dot for subdomains) | Current domain |
| **Cookie Expiry** | Days until the cookie expires | 365 |

### Language

| Setting | Description |
|---------|-------------|
| **Auto-detect** | Uses browser language (Hungarian or English) |
| **Hungarian** | Force Hungarian language |
| **English** | Force English language |

### Default Consent State

| Setting | Description |
|---------|-------------|
| **Wait for Update** | Pause tags until user makes a choice |
| **Wait Timeout** | Maximum wait time in milliseconds |
| **Region** | Apply defaults only to specific countries (ISO codes) |

## Consent Mode Integration

The template automatically manages Google Consent Mode v2 with these consent types:

| Consent Type | Category |
|--------------|----------|
| `analytics_storage` | Analytics |
| `ad_storage` | Marketing |
| `ad_user_data` | Marketing |
| `ad_personalization` | Marketing |
| `functionality_storage` | Always granted |
| `personalization_storage` | Always granted |
| `security_storage` | Always granted |

## JavaScript API

Access the consent banner programmatically:

```javascript
// Show the banner
DataCrewConsent.show();

// Show with customize view open
DataCrewConsent.show(true);

// Hide the banner
DataCrewConsent.hide();

// Clear consent and show banner
DataCrewConsent.clearConsent();

// Get current consent state
DataCrewConsent.getConsent();
// Returns: { ad_storage: 'granted', analytics_storage: 'denied', ... }

// Check if user has made a choice
DataCrewConsent.hasConsent();
// Returns: true or false

// Change language
DataCrewConsent.setLanguage('en');

// Get current language
DataCrewConsent.getLanguage();
```

## Adding a "Manage Cookies" Link

Add this to your footer or privacy policy page:

```html
<a href="#" onclick="DataCrewConsent.show(true); return false;">
  Manage Cookie Preferences
</a>
```

## Triggering Tags Based on Consent

### Google Analytics 4

1. Go to your GA4 tag settings
2. Under **Consent Settings**, enable "Require additional consent for tag to fire"
3. Add `analytics_storage` as required consent

### Google Ads

1. Go to your Google Ads tags
2. Under **Consent Settings**, enable "Require additional consent for tag to fire"
3. Add `ad_storage` and `ad_user_data` as required consent

### Facebook Pixel

For Facebook, create a Custom Event trigger:
- Trigger Type: Custom Event
- Event Name: `consent_updated`
- Add condition: Check that marketing consent is granted

## Testing

### GTM Preview Mode

1. Enable Preview mode in GTM
2. Check the **Consent** tab to see default and updated consent states
3. Verify tags fire/don't fire based on consent

### Browser DevTools

```javascript
// Check dataLayer for consent events
console.log(dataLayer.filter(e => e.event === 'consent_updated'));

// Check cookie value
document.cookie.split(';').find(c => c.includes('consentMode'));
```

## Troubleshooting

### Banner not appearing

1. Check GTM Preview mode for errors
2. Verify trigger is set to "Consent Initialization - All Pages"
3. Clear cookies and refresh

### Tags firing before consent

1. Ensure all tags have proper consent settings
2. Check that "Wait for Update" is enabled
3. Verify tag firing priority (consent tag should fire first)

### Button styles not matching site

1. Check that the CSS class names are correct
2. Verify the classes exist in your site's loaded stylesheets
3. Use browser DevTools to inspect the buttons

## Support

- [GitHub Issues](https://github.com/datacrew/datacrew-cmp/issues)
- [Documentation](https://github.com/datacrew/datacrew-cmp)
