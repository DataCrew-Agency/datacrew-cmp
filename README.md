# DataCrew CMP - Consent Management Platform

A free, lightweight, open-source Consent Management Platform (CMP) with full Google Consent Mode v2 support. Designed as a Google Tag Manager custom template for easy deployment.

## Features

- **Google Consent Mode v2** - Full support for all consent types
- **Lightweight** - Minimal footprint, fast loading
- **Customizable** - Colors, position, button styling, and more
- **Multi-language** - Hungarian and English with auto-detection
- **GDPR Compliant** - Proper consent collection and storage
- **Free & Open Source** - MIT License

## Supported Consent Types

The following Google Consent Mode v2 consent types are managed:

- `ad_storage` - Controls storage for advertising purposes
- `ad_user_data` - Controls sending user data to Google for advertising
- `ad_personalization` - Controls personalized advertising (remarketing)
- `analytics_storage` - Controls storage for analytics purposes

## Installation

### Option 1: Import Template in GTM

1. Download `template.tpl` from this repository
2. In Google Tag Manager, go to **Templates** > **Tag Templates** > **New**
3. Click the three dots menu and select **Import**
4. Select the downloaded `template.tpl` file
5. Save the template

### Option 2: Community Template Gallery

Coming soon - the template will be submitted to the GTM Community Template Gallery.

## Configuration

### Appearance

| Setting | Description | Default |
|---------|-------------|---------|
| Color Mode | Solid or Gradient | Gradient |
| Primary Color | Main color (HEX) | #FA4716 |
| Secondary Color | Gradient end color (HEX) | #FA6212 |
| Banner Position | Center, Bottom, or Bottom Left | Center |
| Show Overlay | Background overlay behind banner | Enabled |

### Button Styling

| Setting | Description | Default |
|---------|-------------|---------|
| Primary Button CSS Class | Custom class for accept buttons | (empty) |
| Secondary Button CSS Class | Custom class for other buttons | (empty) |

### Cookie Settings

| Setting | Description | Default |
|---------|-------------|---------|
| Cookie Domain | Domain for cookie (e.g., .example.com) | (current domain) |
| Cookie Expiry | Days until cookie expires | 365 |

### Default Consent State

Configure the default state for each consent type before user interaction:

| Setting | Options | Default |
|---------|---------|---------|
| ad_storage | denied / granted | denied |
| ad_user_data | denied / granted | denied |
| ad_personalization | denied / granted | denied |
| analytics_storage | denied / granted | denied |
| Wait for Update | Wait for user consent before firing tags | Enabled |
| Wait Timeout | Milliseconds to wait | 500 |

### DataLayer Events

| Setting | Description | Default |
|---------|-------------|---------|
| Fire 'cookie_consent_update' | Fires on every page load with existing consent and after user consent | Enabled |
| Fire 'first_cookie_consent_update' | Fires only once immediately after first consent | Disabled |

### Advanced

| Setting | Description | Default |
|---------|-------------|---------|
| API Object Name | Global JavaScript object name | DataCrewConsent |
| ads_data_redaction | Redact ad click IDs when denied | Enabled |
| url_passthrough | Pass ad click info via URL | Disabled |

## Cookie Format

Consent is stored in a cookie named `datacrew-consent` with the following format:

```json
["statistics","marketing"]
```

Only granted categories are included in the array. An empty array `[]` means all optional categories were denied.

## JavaScript API

The CMP exposes a JavaScript API for programmatic control:

```javascript
// Show consent banner (initial view)
DataCrewConsent.show();

// Show consent banner with customization view
DataCrewConsent.show(true);

// Hide consent banner
DataCrewConsent.hide();

// Reopen consent settings (for "manage cookies" links)
DataCrewConsent.revisitConsent();

// Clear consent and show banner again
DataCrewConsent.clearConsent();

// Get current consent state
DataCrewConsent.getConsent();
// Returns: { ad_storage: "granted", analytics_storage: "denied", ... }

// Check if consent has been given
DataCrewConsent.hasConsent();
// Returns: true/false

// Change language
DataCrewConsent.setLanguage('hu'); // or 'en'

// Get current language
DataCrewConsent.getLanguage();
// Returns: 'hu' or 'en'
```

### Example: "Manage Cookies" Link

```html
<a href="#" onclick="DataCrewConsent.revisitConsent(); return false;">
  Manage Cookie Settings
</a>
```

## DataLayer Events

When enabled, the following events are pushed to the dataLayer:

### cookie_consent_update

Fired on every page load (when consent exists) and immediately after user gives consent:

```javascript
{
  event: "cookie_consent_update",
  consent_analytics: "granted", // or "denied"
  consent_marketing: "granted"  // or "denied"
}
```

### first_cookie_consent_update

Fired only once, immediately after user gives consent for the first time:

```javascript
{
  event: "first_cookie_consent_update",
  consent_analytics: "granted", // or "denied"
  consent_marketing: "granted"  // or "denied"
}
```

## Consent Categories

The banner presents three categories to users:

| Category | Consent Types Affected |
|----------|----------------------|
| Necessary (always on) | - |
| Statistics | analytics_storage |
| Marketing | ad_storage, ad_user_data, ad_personalization |

## License

MIT License - see [LICENSE](LICENSE) file.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

- **Issues**: [GitHub Issues](https://github.com/DataCrew-Agency/datacrew-cmp/issues)
- **Website**: [datacrew.hu](https://datacrew.hu)

---

Made with ❤️ by [DataCrew Agency](https://datacrew.hu)
