# IPTV Mac Stalker for LG webOS

A fast, modern IPTV client for LG webOS TVs with Mac Stalker middleware protocol support.

## Features

✅ **Mac Stalker Protocol Support** - Full implementation of Mac Stalker middleware  
✅ **Editable Playlists** - Save and manage multiple IPTV portal configurations  
✅ **Channel Categories** - Browse channels by genre/categories  
✅ **TV Remote Navigation** - Optimized for LG TV remote control  
✅ **Keyboard Shortcuts** - Full keyboard support for power users  
✅ **Dark Mode** - Automatic dark/light theme switching  
✅ **Responsive Design** - Works on all screen sizes  
✅ **CORS Proxy** - Built-in CORS bypass for web connections  

## Screenshots

Coming soon...

## Installation

### Method 1: Install from IPK File (Recommended)

1. Download the latest `iptv-mac-stalker-lg-webos.ipk` file
2. Enable Developer Mode on your LG TV:
   - Go to Settings → General → About This TV
   - Click 3 times on "TV Information" 
   - Enter the PIN (usually 0000)
   - Turn on "Developer Mode"
3. Install the webOS SDK on your computer
4. Use the webOS CLI to install:
   ```bash
   ares-install -d <TV_IP> iptv-mac-stalker-lg-webos.ipk
   ```

### Method 2: Browser (Testing Only)

For testing, you can also run this app in a web browser:

1. Open the app URL in your browser
2. Enter your IPTV portal credentials
3. **Note**: Browser mode has CORS limitations - use a browser extension to bypass

## Usage

### First Time Setup

1. Open the app on your LG TV
2. Click on the settings icon (⚙️)
3. Enter your IPTV portal details:
   - **Server Host**: Your Mac Stalker portal address (e.g., `portal.example.com`)
   - **MAC Address**: Your device MAC address (format: `XX:XX:XX:XX:XX:XX`)
4. Click "Save Configuration"

### Watching Channels

1. Browse channels by category using the left panel
2. Select a channel to start streaming
3. Use your TV remote to:
   - **Up/Down**: Navigate channels
   - **Enter/OK**: Select channel
   - **Back**: Return to channel list
   - **Green Button**: Quick access to settings

### Keyboard Shortcuts (Web Browser)

- **Arrow Keys**: Navigate channels
- **Enter**: Select channel
- **Escape**: Go back
- **Ctrl+F**: Search channels
- **Ctrl+K**: Quick jump to channel
- **F11**: Fullscreen mode

## Configuration

### Supported Mac Stalker Servers

This app supports any Mac Stalker middleware server. Common examples:
- Stalker Middleware
- Infomir
- Xtream Codes compatible servers

### Advanced Settings

The app automatically:
- Cleans URL formatting (handles http://, https://, ports)
- Generates proper device IDs for authentication
- Uses CORS proxy when needed
- Handles token management

## Building IPK File

### Prerequisites

- Node.js 18+ 
- npm or yarn
- webOS SDK (optional, for local testing)

### Build Steps

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the app:
   ```bash
   npm run build
   ```

3. Create IPK package:
   ```bash
   npm run package
   ```

The IPK file will be created as: `dist/iptv-mac-stalker-lg-webos.ipk`

## Troubleshooting

### Connection Issues

**Problem**: "Connection Failed" error

**Solutions**:
1. Check your portal URL is correct
2. Verify your MAC address format
3. Ensure your IPTV service is active
4. Try generating a new MAC address
5. Check browser console for detailed errors (F12)

### CORS Errors (Browser Mode)

**Problem**: Browser blocks connection

**Solution**:
- Install a "CORS Unblock" browser extension
- Use the IPK version on LG TV instead

### Stream Loading Issues

**Problem**: Channel won't play

**Solutions**:
1. Check your internet connection
2. Verify the channel is available in your subscription
3. Try another channel to test
4. Clear app data and reconfigure

## Development

### Project Structure

```
app/
├── src/
│   ├── components/      # React components
│   ├── lib/            # Utilities and protocols
│   ├── hooks/          # Custom React hooks
│   └── pages/          # Page components
├── public/             # Static assets
└── package.json
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run package` - Create IPK file

### Technology Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Components**: Radix UI
- **Routing**: React Router
- **Icons**: Lucide React

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on LG webOS if possible
5. Submit a pull request

## License

MIT License - See [LICENSE](LICENSE) file for details.

## Disclaimer

This application is a client interface for IPTV services. It does not provide any content or services. Users must have their own IPTV subscriptions and authorize the use of their accounts.

The developers are not responsible for:
- IPTV service availability
- Content quality or legality  
- Account authorization issues
- Service provider terms violations

## Support

- **Issues**: Report bugs on GitHub
- **Email**: K3nnkml2@gmail.com
- **Website**: iptv-mac-stalker-lg-webos.kliv.site

## Changelog

### Version 1.0.0 (2026-07-01)

- ✅ Initial release
- ✅ Full Mac Stalker protocol implementation
- ✅ LG webOS TV support
- ✅ Channel categorization
- ✅ TV remote optimization
- ✅ CORS proxy support
- ✅ Dark mode support
- ✅ Editable playlists

---

**Made with ❤️ for the webOS community**
