# DataCrew CMP - Free Consent Management Platform for GTM

A lightweight, free, and fully customizable Consent Management Platform (CMP) implemented as a Google Tag Manager template. Fully compatible with Google Consent Mode v2.

## Features

- ✅ **Google Consent Mode v2** compatible (including `ad_user_data` and `ad_personalization`)
- ✅ **No external dependencies** - everything runs from the GTM template
- ✅ **Fully customizable** - colors, texts, positioning
- ✅ **Multi-language support** - configure your own translations
- ✅ **GDPR compliant** - granular consent options
- ✅ **Lightweight** - minimal impact on page performance
- ✅ **Open source** - MIT licensed

## Quick Start

### Option 1: Community Template Gallery (Recommended)
1. In GTM, go to Templates → Search Gallery
2. Search for "DataCrew CMP"
3. Add to workspace
4. Create a new tag using the template

### Option 2: Manual Import
1. Download `template.tpl` from this repository
2. In GTM, go to Templates → Tag Templates → New
3. Click the three dots menu → Import
4. Select the downloaded `template.tpl` file
5. Save the template
6. Create a new tag using the template

## Configuration

### Basic Setup

1. **Create the Consent Tag**
   - Trigger: Consent Initialization - All Pages
   - Configure your preferred settings

2. **Default Consent State**
   The template automatically sets default consent to `denied` for all categories:
   - `analytics_storage`
   - `ad_storage`
   - `ad_user_data`
   - `ad_personalization`
   - `functionality_storage`
   - `personalization_storage`
   - `security_storage`

3. **Consent Categories**
   - **Necessary**: Always granted (security_storage)
   - **Analytics**: analytics_storage
   - **Marketing**: ad_storage, ad_user_data, ad_personalization
   - **Functionality**: functionality_storage, personalization_storage

### Customization Options

| Setting | Description | Default |
|---------|-------------|---------|
| Banner Position | top, bottom | bottom |
| Primary Color | HEX color code | #3B82F6 |
| Text Color | HEX color code | #1F2937 |
| Background Color | HEX color code | #FFFFFF |
| Cookie Name | Name for storing consent | datacrew_consent |
| Cookie Duration | Days until expiry | 365 |
| Banner Title | Main heading text | Cookie Settings |
| Banner Description | Description text | Customizable |
| Accept All Button | Button text | Accept All |
| Reject All Button | Button text | Reject All |
| Save Preferences | Button text | Save Preferences |

## How It Works

```
Page Load
    ↓
GTM Consent Initialization Trigger fires
    ↓
DataCrew CMP Tag executes
    ↓
Check for existing consent cookie
    ↓
┌─────────────────────────────────────┐
│ Cookie exists?                       │
│   YES → Apply saved consent state    │
│   NO  → Show consent banner          │
└─────────────────────────────────────┘
    ↓
User interacts with banner
    ↓
Update consent state via gtag()
    ↓
Save to cookie
    ↓
GTM triggers fire based on consent
```

## Consent Mode Integration

The template integrates with GTM's built-in Consent Mode:

```javascript
// Default state (on page load)
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'functionality_storage': 'denied',
  'personalization_storage': 'denied',
  'security_storage': 'granted',
  'wait_for_update': 500
});

// After user consent
gtag('consent', 'update', {
  'analytics_storage': 'granted',
  'ad_storage': 'granted',
  // ... based on user selection
});
```

## Development

### Project Structure

```
datacrew_cmp/
├── README.md
├── LICENSE
├── CHANGELOG.md
├── template.tpl              # Main GTM template file
├── metadata.yaml             # Community Gallery metadata
├── src/
│   ├── consent-bar.js        # Consent bar UI & logic
│   ├── consent-bar.css       # Styles
│   └── template-logic.js     # Sandboxed JS for GTM
├── test/
│   ├── test.html             # Standalone test page
│   └── gtm-test-container.json
├── docs/
│   ├── setup-guide.md
│   └── screenshots/
└── build/
    └── build.js              # Build script
```

### Building

```bash
npm install
npm run build
```

This will generate the final `template.tpl` from source files.

### Testing

1. **Standalone testing** (without GTM):
   Open `test/test.html` in a browser

2. **GTM testing**:
   - Import `template.tpl` into GTM
   - Use Preview mode
   - Check browser console for consent state changes

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) for details.

## Support

- 📖 [Documentation](docs/setup-guide.md)
- 🐛 [Issue Tracker](https://github.com/datacrew/datacrew-cmp/issues)
- 💬 [Discussions](https://github.com/datacrew/datacrew-cmp/discussions)

## Credits

Created and maintained by [DataCrew Kft.](https://datacrew.hu)

---

⭐ If you find this useful, please star the repository!
