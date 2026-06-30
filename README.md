# IPTV Mac Stalker for LG webOS

A fast, web-based IPTV Mac Stalker client optimized for LG webOS TVs. This app implements the complete Mac Stalker middleware protocol with a TV-optimized interface and remote control navigation.

## Features

✅ **Complete Mac Stalker Protocol Implementation**
- Full authentication flow: Init → Handshake → Get Token → Get Profile → Get Main Info
- Channel and category retrieval from Mac Stalker servers
- Stream link generation and playback

✅ **TV-Optimized Interface**
- Large, touch-friendly UI elements perfect for TV screens
- Dark mode support for better viewing in low light
- Responsive design that works on various screen sizes

✅ **Remote Control Navigation**
- D-pad navigation support (Up/Down/Left/Right)
- OK/Enter button to select and play channels
- Back button to navigate through categories
- Keyboard support for testing on desktop browsers

✅ **Configuration Management**
- Editable server host and MAC address
- Random MAC address generation
- Configuration saved to browser storage
- Easy settings access from header

✅ **Channel Browser**
- Search channels by name or number
- Filter by categories
- Alphabetical grouping for easy navigation
- Channel logos and numbering display

✅ **Video Player**
- HTML5 video streaming
- Custom controls optimized for TV
- Volume control and fullscreen
- Cast support (when available)
- Error handling with user feedback

## How to Use

### Initial Setup

1. **Open the app** - You'll see the configuration screen
2. **Enter your server details**:
   - **Server Host**: Your Mac Stalker portal address (e.g., `portal.example.com` or `192.168.1.100`)
   - **MAC Address**: Your device's MAC address in format `XX:XX:XX:XX:XX:XX`
3. **Click "Save Configuration"** - The app will connect and load channels

### Using the App

**With LG TV Remote:**
- **Up/Down**: Navigate through channels
- **OK/Enter**: Play selected channel
- **Back**: Return to channel list or clear search

**With Keyboard:**
- **Arrow Keys**: Navigate
- **Enter/Space**: Play channel
- **Escape**: Go back

### Managing Configuration

- Click the **Settings icon** in the header to change server details
- Your configuration is automatically saved and persists between sessions
- Generate a random MAC address if needed for testing

## Technical Details

### Mac Stalker Protocol Flow

The app implements the complete Mac Stalker middleware protocol:

1. **Init/Handshake**: Establish connection with server
2. **Get Token**: Retrieve authentication token
3. **Get Profile**: Validate user profile
4. **Get Main Info**: Retrieve server information
5. **Get Categories**: Load channel categories
6. **Get All Channels**: Retrieve complete channel list
7. **Create Link**: Generate stream URL for playback

### Architecture

- **React + TypeScript**: Modern, type-safe development
- **Tailwind CSS**: Beautiful, responsive styling
- **Mac Stalker Protocol Client**: Custom implementation of the protocol
- **Local Storage**: Configuration persistence
- **HTML5 Video**: Stream playback support

### Components

- **`MacStalkerClient`**: Protocol implementation
- **`IPTVConfig`**: Configuration management UI
- **`ChannelList`**: Channel browser with search and categories
- **`VideoPlayer`**: TV-optimized video player
- **`Header`**: App navigation and status
- **`StatusBar`**: Connection info and channel count

## Browser Compatibility

This app is designed to work in modern browsers, including:
- LG webOS browser (primary target)
- Chrome/Edge (for testing)
- Firefox
- Safari

## Important Notes

⚠️ **This is a web application, not a native webOS app**
- Runs in the browser, not as a native .ipk package
- Can be accessed via LG webOS browser or other modern browsers
- Cannot be installed from outside the LG Content Store

⚠️ **Server Requirements**
- Requires a Mac Stalker middleware server
- Server must support HTTP (not HTTPS) for proper protocol communication
- Some features may depend on server configuration

⚠️ **Network Considerations**
- Best performance on local network
- May have latency issues with remote servers
- Stream quality depends on your internet connection

## Development

Built with Kliv platform - React, Vite, TypeScript, and Tailwind CSS.

### Key Files

- `/app/src/lib/mac-stalker-protocol.ts` - Protocol implementation
- `/app/src/components/` - UI components
- `/app/src/pages/Index.tsx` - Main application
- `/app/src/hooks/` - Custom hooks for navigation

## Future Enhancements

Potential features for future versions:
- Favorites/channels list
- Electronic Program Guide (EPG)
- Recording support (if server supports it)
- Multiple server profiles
- Parental controls
- Multiple audio track support

## License

This is a personal project. Use responsibly and only with IPTV services you have legitimate access to.
