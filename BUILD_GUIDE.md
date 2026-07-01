# IPK Build Instructions

Complete guide for building the IPTV Mac Stalker IPK package.

## Prerequisites

### Required Software

1. **Node.js** (v18 or higher)
   - Download from https://nodejs.org
   - Verify installation: `node --version`

2. **npm or yarn**
   - Comes with Node.js
   - Verify installation: `npm --version`

3. **Git** (optional)
   - For cloning repositories
   - Verify installation: `git --version`

### Optional Software

4. **ImageMagick** (for icon generation)
   - Download from https://imagemagick.org
   - Or use package managers: `brew install imagemagick` (Mac)

5. **webOS SDK** (for device testing)
   - Download from LG's developer portal
   - Required for testing on real TVs

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Build Application

```bash
npm run build
```

### 3. Create IPK Package

```bash
npm run package
```

The IPK file will be created at: `dist/iptv-mac-stalker-lg-webos-1.0.0.ipk`

## Detailed Build Process

### Step 1: Environment Setup

```bash
# Verify Node.js version
node --version  # Should be v18+

# Install project dependencies
npm install

# Verify installation
npm list --depth=0
```

### Step 2: Development Build (Optional)

If you want to test changes first:

```bash
# Start development server
npm run dev

# Open http://localhost:5173 in your browser
# Test the application before building
```

### Step 3: Production Build

```bash
# Build for production
npm run build

# This will:
# - Compile TypeScript to JavaScript
# - Optimize and minify code
# - Process CSS with Tailwind
# - Create asset bundles
# - Output to dist/ directory
```

Build output should be in `dist/` directory.

### Step 4: IPK Package Creation

```bash
# Create IPK package
npm run package

# This will:
# - Create proper webOS package structure
# - Generate application icons
# - Package everything into IPK file
# - Output: dist/iptv-mac-stalker-lg-webos-1.0.0.ipk
```

## Troubleshooting Build Issues

### Issue: "Module not found" Error

**Solution**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Build Fails with TypeScript Errors

**Solution**:
```bash
# Type check only
npm run type-check

# Fix specific TypeScript errors in files
# Then rebuild
npm run build
```

### Issue: "Cannot find module" errors

**Solution**:
```bash
# Verify all dependencies are installed
npm list --depth=0

# Install missing dependencies
npm install <missing-package>
```

### Issue: Icon Generation Fails

**Solution**:
- Install ImageMagick from https://imagemagick.org
- Or skip icon generation (placeholders will be used)

### Issue: IPK File Too Large

**Solution**:
- Check build output size
- Remove unnecessary dependencies
- Optimize images
- Enable code splitting

## Testing the Build

### 1. Local Testing

```bash
# Preview production build
npm run preview

# This serves the dist/ directory locally
# Open http://localhost:4173
```

### 2. WebOS Emulator Testing

```bash
# Install webOS SDK first
# Then test on emulator

# Start emulator
ares-launch-emulator

# Install IPK
ares-install -e emulator dist/*.ipk

# Launch app
ares-launch -e emulator com.kamelkanane.iptv-mac-stalker
```

### 3. Real Device Testing

```bash
# Enable Developer Mode on LG TV
# Get TV IP address

# Install IPK
ares-install -d <TV_IP> dist/*.ipk

# Launch app
ares-launch -d <TV_IP> com.kamelkanane.iptv-mac-stalker

# View logs
ares-log -d <TV_IP> -f com.kamelkanane.iptv-mac-stalker
```

## Advanced Options

### Custom Build Configuration

Edit `vite.config.ts` for custom build settings:

```typescript
export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,  // Enable source maps
    minify: 'terser',  // Minification
    target: 'es2015'  // Target browsers
  }
})
```

### Environment Variables

Create `.env` file for environment-specific settings:

```bash
VITE_APP_TITLE=IPTV Mac Stalker
VITE_DEFAULT_CORS_PROXY=true
VITE_LOG_LEVEL=info
```

### Code Splitting

For better performance, enable code splitting:

```typescript
// In your components
const VideoPlayer = lazy(() => import('./components/VideoPlayer'));
```

## Build Scripts Reference

Available npm scripts:

- `npm run dev` - Development server (http://localhost:5173)
- `npm run build` - Production build
- `npm run preview` - Preview production build
- `npm run package` - Create IPK package
- `npm run type-check` - TypeScript type checking
- `npm run lint` - ESLint linting

## Release Process

When ready for release:

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Update `appinfo.json` version
4. Test thoroughly
5. Build IPK: `npm run package`
6. Test IPK on real device
7. Distribute IPK file

---

**Happy Building! 🚀**
