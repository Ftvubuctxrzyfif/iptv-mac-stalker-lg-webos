## IPK Package File Structure

This document describes the structure of the IPTV Mac Stalker IPK package.

### Package Information

- **File Name**: `iptv-mac-stalker-lg-webos-1.0.0.ipk`
- **Package ID**: `com.kamelkanane.iptv-mac-stalker`
- **Version**: 1.0.0
- **Type**: webOS Web Application
- **Approximate Size**: 2-3 MB

### Directory Structure

```
iptv-mac-stalker-lg-webos.ipk (ZIP archive)
├── appinfo.json              # Application manifest
├── config.xml                # Widget configuration
├── icon.png                  # 80x80 application icon
├── large-icon.png            # 130x130 application icon
├── LICENSE                   # MIT License
├── README-WEBOS.md          # WebOS documentation
├── index.html                # Main HTML entry point
├── main.js                   # Compiled JavaScript bundle
├── main.css                  # Compiled CSS bundle
├── assets/                   # Static assets
│   ├── icons/               # SVG icons
│   ├── images/              # Image files
│   └── fonts/               # Custom fonts (if any)
└── config.ini               # Default configuration
```

### Required Files

These files MUST be present for proper IPK installation:

1. **appinfo.json** - Main application manifest
2. **config.xml** - WebOS widget configuration
3. **icon.png** - Application icon (80x80)
4. **index.html** - Entry point
5. **main.js** - Compiled application code

### Optional Files

These files enhance the application but aren't strictly required:

- **large-icon.png** - High-resolution icon
- **LICENSE** - Legal information
- **README-WEBOS.md** - User documentation
- **config.ini** - Default settings

### File Specifications

#### Icons

- **icon.png**: 80x80 pixels, PNG format, transparent background preferred
- **large-icon.png**: 130x130 pixels, PNG format

#### Configuration Files

- **appinfo.json**: JSON format, UTF-8 encoding
- **config.xml**: XML format, UTF-8 encoding
- **config.ini**: INI format, UTF-8 encoding

#### Build Files

- **main.js**: Minified JavaScript, typically < 2MB
- **main.css**: Minified CSS, typically < 200KB
- **index.html**: HTML5, proper DOCTYPE declaration

### Installation Process

When you install the IPK on your LG TV:

1. **Package Validation**: TV checks file structure and signatures
2. **File Extraction**: Files are extracted to TV's app storage
3. **Registration**: App registered in webOS application manager
4. **Icon Creation**: App icon added to launcher
5. **Permission Grant**: Network permissions requested
6. **Ready**: App ready to launch from launcher

### Storage Requirements

The app requires approximately:

- **Installation**: ~3 MB
- **Runtime Memory**: ~50-100 MB
- **Cache Storage**: ~10 MB (for channel lists)
- **Total**: ~65 MB + streaming buffer

### Uninstallation

When removed from TV:

- App files deleted from storage
- Configuration data cleared
- Network settings removed
- No residual data remains

### Updates

Future updates will:

- Preserve user configuration
- Maintain channel lists
- Keep authentication tokens
- Automatic version checking

---

**Note**: The build script (`build-ipk.sh`) automatically creates the correct structure when you run `npm run package`.
