# Build Scripts for IPK Package

This directory contains scripts and configurations for building the webOS IPK package.

## Files

- `build-ipk.sh` - Main build script for creating IPK files
- `ipk-scripts.json` - Additional NPM scripts for IPK building

## Usage

From the root directory, run:

```bash
npm run package
```

This will:
1. Build the React app with Vite
2. Create proper webOS package structure
3. Generate icon files
4. Create the IPK archive
5. Output to `dist/iptv-mac-stalker-lg-webos-1.0.0.ipk`

## Manual IPK Creation

If you want to create the IPK manually:

1. Build the app: `npm run build`
2. Copy build contents to a temporary directory
3. Add webOS files (appinfo.json, icon.png, etc.)
4. Create a ZIP file with `.ipk` extension
5. Rename to proper format

## Requirements

- Bash shell (Linux/Mac) or WSL (Windows)
- Node.js and npm
- ImageMagick (for icon generation, optional)
- ZIP utility

## Troubleshooting

**"Permission denied" on build-ipk.sh:**
```bash
chmod +x build-ipk.sh
```

**"ImageMagick not found":**
The script will create placeholder icons if ImageMagick is not available.

**"ares-command not found":**
Install webOS SDK from LG's developer portal.

## Testing on Device

After building:

```bash
ares-install -d <TV_IP> dist/*.ipk
ares-launch -d <TV_IP> com.kamelkanane.iptv-mac-stalker
```
