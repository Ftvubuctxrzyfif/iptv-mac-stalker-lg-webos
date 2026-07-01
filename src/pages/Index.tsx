import { useState, useEffect } from 'react';
import { MacStalkerClient, Channel, Category } from '@/lib/mac-stalker-protocol';
import IPTVConfig from '@/components/IPTVConfig';
import ChannelList from '@/components/ChannelList';
import VideoPlayer from '@/components/VideoPlayer';
import Header from '@/components/Header';
import StatusBar from '@/components/StatusBar';
import LocalStorageClear from '@/components/LocalStorageClear';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  // Configuration state
  const [host, setHost] = useState('');
  const [macAddress, setMacAddress] = useState('');
  const [showConfig, setShowConfig] = useState(false);

  // App state
  const [client, setClient] = useState<MacStalkerClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  // Content state
  const [categories, setCategories] = useState<Category[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);


  // Player state
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [streamUrl, setStreamUrl] = useState<string | null>(null);
  const [isPlayerLoading, setIsPlayerLoading] = useState(false);
  const [playerError, setPlayerError] = useState<string | null>(null);

  // Load config from localStorage on mount
  useEffect(() => {
    const savedHost = localStorage.getItem('iptv_host');
    const savedMac = localStorage.getItem('iptv_mac');
    
    if (savedHost && savedMac) {
      setHost(savedHost);
      setMacAddress(savedMac);
      
      // Auto-connect if config exists
      const newClient = new MacStalkerClient({ host: savedHost, macAddress: savedMac }, true);
      setClient(newClient);
      connect(newClient);
    } else {
      setShowConfig(true);
    }
  }, []);

  const connect = async (newClient: MacStalkerClient) => {
    if (!newClient.validateConfig()) {
      toast.error('Invalid configuration. Please check your settings.');
      return;
    }

    setIsConnecting(true);
    setConnectionError(null);

    try {
      // Run through the Mac Stalker protocol flow
      await newClient.authenticate();
      
      // Get categories and channels
      const [cats, chans] = await Promise.all([
        newClient.getCategories(),
        newClient.getAllChannels(),
      ]);

      setCategories(cats);
      setChannels(chans);
      setIsConnected(true);
      setShowConfig(false);
      
      toast.success(`Connected! ${chans.length} channels loaded`, {
        description: 'Successfully authenticated with your IPTV portal'
      });
    } catch (error: any) {
      console.error('Connection error:', error);
      
      let errorMessage = 'Failed to connect to server';
      
      if (error.message) {
        errorMessage = error.message;
      }
      
      // Add helpful hints
      if (errorMessage.includes('CORS')) {
        errorMessage += '\n\n💡 Try installing a "CORS Unblock" browser extension or use a browser that allows cross-origin requests.';
      } else if (errorMessage.includes('Network')) {
        errorMessage += '\n\n💡 Make sure the server address is correct and your internet connection is stable.';
      } else if (errorMessage.includes('MAC') || errorMessage.includes('profile')) {
        errorMessage += '\n\n💡 Generate a new random MAC address if your current one is blocked or expired.';
      }
      
      setConnectionError(errorMessage);
      setIsConnected(false);
      toast.error('Connection failed', {
        description: 'Check your settings and try again'
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSaveConfig = (newHost: string, newMac: string) => {
    // Validate
    const newClient = new MacStalkerClient({ host: newHost, macAddress: newMac }, true);
    
    if (!newClient.validateConfig()) {
      toast.error('Invalid configuration');
      return;
    }

    // Save to localStorage
    localStorage.setItem('iptv_host', newHost);
    localStorage.setItem('iptv_mac', newMac);
    
    setHost(newHost);
    setMacAddress(newMac);
    setClient(newClient);
    
    // Try to connect
    connect(newClient);
  };

  const handleChannelSelect = async (channel: Channel) => {
    if (!client) return;

    setSelectedChannel(channel);
    setStreamUrl(null);
    setIsPlayerLoading(true);
    setPlayerError(null);

    try {
      const url = await client.createLink(channel);
      setStreamUrl(url);
      toast.success(`Now playing: ${channel.name}`);
    } catch (error: any) {
      console.error('Stream error:', error);
      setPlayerError(error.message || 'Failed to load stream');
      toast.error('Failed to load stream');
    } finally {
      setIsPlayerLoading(false);
    }
  };

  const handleRefresh = () => {
    if (client) {
      connect(client);
    }
  };

  const handleGoHome = () => {
    setSelectedChannel(null);
    setStreamUrl(null);
    setPlayerError(null);
  };

  const handleClearConfig = () => {
    setHost('');
    setMacAddress('');
    setClient(null);
    setShowConfig(true);
    setConnectionError(null);
  };

  // Show config screen
  if (showConfig) {
    return (
      <IPTVConfig
        onSave={handleSaveConfig}
        initialHost={host}
        initialMacAddress={macAddress}
      />
    );
  }

  // Main app layout
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      <Header
        onOpenSettings={() => setShowConfig(true)}
        onGoHome={handleGoHome}
        isConnected={isConnected}
      />

      <div className="flex-1 overflow-hidden">
        {isConnecting ? (
          <div className="h-full flex items-center justify-center">
            <Card className="max-w-md mx-4">
              <CardContent className="p-8 text-center">
                <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Connecting to Server</h3>
                <p className="text-muted-foreground">
                  Running Mac Stalker protocol...
                </p>
                <div className="mt-4 text-sm text-muted-foreground space-y-1">
                  <p>→ Init handshake</p>
                  <p>→ Get token</p>
                  <p>→ Get profile</p>
                  <p>→ Load channels</p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : connectionError ? (
          <div className="h-full flex items-center justify-center">
            <Card className="max-w-md mx-4">
              <CardContent className="p-8 text-center">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Connection Failed</h3>
                <p className="text-muted-foreground mb-4 whitespace-pre-line text-left text-sm">
                  {connectionError}
                </p>
                
                <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6 text-left">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">🔧 Troubleshooting Tips:</h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• Double-check your portal address and MAC address</li>
                    <li>• Make sure your IPTV service is active</li>
                    <li>• Try generating a new random MAC address</li>
                    <li>• Check if your browser is blocking the connection (CORS)</li>
                    <li>• Open browser console (F12) for detailed error logs</li>
                  </ul>
                </div>
                
                <div className="flex gap-2 justify-center">
                  <Button onClick={handleRefresh} variant="default">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                  <Button onClick={() => setShowConfig(true)} variant="outline">
                    Settings
                  </Button>
                </div>
                
                <LocalStorageClear onClear={handleClearConfig} />
              </CardContent>
            </Card>
          </div>
        ) : selectedChannel ? (
          <VideoPlayer
            channel={selectedChannel}
            streamUrl={streamUrl}
            isLoading={isPlayerLoading}
            error={playerError}
            onClose={handleGoHome}
          />
        ) : (
          <div className="h-[calc(100vh-140px)]">
            <ChannelList
              channels={channels}
              categories={categories}
              onChannelSelect={handleChannelSelect}
              isLoading={false}
            />
          </div>
        )}
      </div>

      <StatusBar
        isConnected={isConnected}
        channelCount={channels.length}
      />
    </div>
  );
};

export default Index;
