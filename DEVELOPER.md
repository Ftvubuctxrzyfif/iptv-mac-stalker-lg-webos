## WebOS Developer Documentation

### Testing on webOS Emulator

1. Install webOS SDK from LG's developer portal
2. Start the emulator:
   ```bash
  ares-launch-emulator
   ```
3. Install the app:
   ```bash
  npm run package
ares-install -e emulator dist/*.ipk
   ```
4. Launch the app:
   ```bash
ares-launch -e emulator com.kamelkanane.iptv-mac-stalker
   ```

### Testing on Real Device

1. Enable Developer Mode on your LG TV (Settings → About → 3x click on TV Info)
2. Get your TV's IP address
3. Install the app:
   ```bash
ares-install -d <TV_IP> dist/*.ipk
   ```
4. Launch and test:
   ```bash
ares-launch -d <TV_IP> com.kamelkanane.iptv-mac-stalker
   ```

### Debugging

View logs:
```bash
ares-log --device-info --device <TV_IP> --follow com.kamelkanane.iptv-mac-stalker
```

### Common Issues

**"Insufficient memory" error:**
- Reduce build size by removing unnecessary dependencies
- Optimize images and assets

**"App crashes on launch":**
- Check appinfo.json for syntax errors
- Verify all required files are included
- Check device logs for specific errors

**"Network errors":**
- Ensure proper permissions in appinfo.json
- Test network connectivity on the device
- Check CORS settings if testing in browser

### TV Remote Keys

Standard webOS remote key codes:
- Enter: 13
- Back: 27 (Escape)
- Up: 38
- Down: 40
- Left: 37
- Right: 39
- Red Button: 403
- Green Button: 404
- Yellow Button: 405
- Blue Button: 406

### Performance Optimization

1. **Code Splitting**: Use dynamic imports for large components
2. **Image Optimization**: Use WebP format and proper sizing
3. **Bundle Size**: Keep main bundle under 1MB
4. **Memory Management**: Clean up event listeners and timers

### TV Screen Sizes

Common LG TV resolutions:
- HD Ready: 1366x768
- Full HD: 1920x1080
- 4K UHD: 3840x2160

Design for 1920x1080 as baseline, scale up/down for others.
