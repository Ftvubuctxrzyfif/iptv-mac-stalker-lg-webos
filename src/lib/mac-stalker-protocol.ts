/**
 * Mac Stalker Protocol Client
 * Implements the full Mac Stalker middleware protocol flow
 */

interface MacStalkerConfig {
  host: string;
  macAddress: string;
  timezone?: string;
}

export interface Channel {
  id: string;
  name: string;
  logo: string;
  number: number;
  stream_source: string;
  cmd?: string;
  tv_genre_id?: number;
}

export interface Category {
  id: number;
  alias: string;
  title: string;
}

interface Profile {
  status: string;
  rest_api_url?: string;
}

export class MacStalkerClient {
  private config: MacStalkerConfig;
  private token: string | null = null;
  private profile: Profile | null = null;
  private baseHeaders: HeadersInit = {};

  constructor(config: MacStalkerConfig) {
    this.config = config;
  }

  /**
   * Step 1: Initialize connection
   */
  async init(): Promise<void> {
    const url = `http://${this.config.host}/server/load.php`;
    const params = new URLSearchParams({
      type: 'stb',
      action: 'handshake',
      token: '',
      'JsXMLHttpRequest': '1',
      'device_id': this.config.macAddress,
      'device_name': 'webos',
      'device_os': 'webOS',
      'datetime': new Date().toISOString(),
    });

    console.log('Mac Stalker: Connecting to', url);
    
    try {
      const response = await fetch(`${url}?${params.toString()}`, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (WebOS; Linux; SmartTV) AppleWebKit/537.36',
        },
      });

      console.log('Mac Stalker: Response status', response.status);

      if (!response.ok) {
        throw new Error(`Server returned ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Mac Stalker: Handshake response', data);
      
      if (data.js && data.token) {
        this.token = data.token;
        this.baseHeaders = {
          'Authorization': data.token,
          'User-Agent': 'Mozilla/5.0 (WebOS; Linux; SmartTV) AppleWebKit/537.36',
        };
      } else {
        throw new Error('Invalid response from server - missing token');
      }
    } catch (error: any) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('CORS error: Your IPTV server may not allow web connections. Try using a browser extension to bypass CORS or ensure your server supports cross-origin requests.');
      }
      throw error;
    }
  }

  /**
   * Step 2: Get token (if not received in handshake)
   */
  async getToken(): Promise<string> {
    if (this.token) return this.token;

    const url = `http://${this.config.host}/server/load.php`;
    const params = new URLSearchParams({
      type: 'stb',
      action: 'get_token',
      'device_id': this.config.macAddress,
    });

    const response = await fetch(`${url}?${params.toString()}`);
    const data = await response.json();

    if (data.token) {
      this.token = data.token;
      // Reconstruct headers to ensure proper typing
      const existingUserAgent = (this.baseHeaders as Record<string, string>)['User-Agent'] || 'Mozilla/5.0 (WebOS; Linux; SmartTV) AppleWebKit/537.36';
      this.baseHeaders = {
        'Authorization': data.token,
        'User-Agent': existingUserAgent,
      };
      return data.token;
    }

    throw new Error('Failed to get token');
  }

  /**
   * Step 3: Get profile information
   */
  async getProfile(): Promise<Profile> {
    const url = `http://${this.config.host}/server/load.php`;
    const params = new URLSearchParams({
      type: 'stb',
      action: 'get_profile',
    });

    console.log('Mac Stalker: Getting profile');
    
    const response = await fetch(`${url}?${params.toString()}`, {
      headers: this.baseHeaders,
    });

    if (!response.ok) {
      throw new Error(`Failed to get profile: ${response.status}`);
    }

    const data = await response.json();
    console.log('Mac Stalker: Profile response', data);
    
    this.profile = data;
    return data;
  }

  /**
   * Step 4: Get main info
   */
  async getMainInfo(): Promise<any> {
    const url = `http://${this.config.host}/server/load.php`;
    const params = new URLSearchParams({
      type: 'stb',
      action: 'get_main_info',
    });

    const response = await fetch(`${url}?${params.toString()}`, {
      headers: this.baseHeaders,
    });

    if (!response.ok) {
      throw new Error('Failed to get main info');
    }

    return await response.json();
  }

  /**
   * Step 5: Get categories
   */
  async getCategories(): Promise<Category[]> {
    const url = `http://${this.config.host}/server/load.php`;
    const params = new URLSearchParams({
      type: 'itv',
      action: 'get_genres',
    });

    const response = await fetch(`${url}?${params.toString()}`, {
      headers: this.baseHeaders,
    });

    if (!response.ok) {
      throw new Error('Failed to get categories');
    }

    const data = await response.json();
    return data || [];
  }

  /**
   * Step 6: Get all channels
   */
  async getAllChannels(): Promise<Channel[]> {
    const url = `http://${this.config.host}/server/load.php`;
    const params = new URLSearchParams({
      type: 'itv',
      action: 'get_all_channels',
      'pnums': '1000',
      'hd': '1',
    });

    const response = await fetch(`${url}?${params.toString()}`, {
      headers: this.baseHeaders,
    });

    if (!response.ok) {
      throw new Error('Failed to get channels');
    }

    const data = await response.json();
    return data || [];
  }

  /**
   * Step 7: Get channels by category
   */
  async getChannelsByCategory(categoryId: number): Promise<Channel[]> {
    const url = `http://${this.config.host}/server/load.php`;
    const params = new URLSearchParams({
      type: 'itv',
      action: 'get_channels',
      'genre': categoryId.toString(),
      'hd': '1',
    });

    const response = await fetch(`${url}?${params.toString()}`, {
      headers: this.baseHeaders,
    });

    if (!response.ok) {
      throw new Error('Failed to get channels for category');
    }

    const data = await response.json();
    return data || [];
  }

  /**
   * Step 8: Create stream link and get play URL
   */
  async createLink(channel: Channel): Promise<string> {
    const url = `http://${this.config.host}/server/load.php`;
    
    // Check if stream has cmd (command) or stream_source
    const streamId = channel.cmd || channel.stream_source;
    
    const params = new URLSearchParams({
      type: 'itv',
      action: 'create_link',
      'cmd': streamId,
      'series': '0',
      'forced_storage_priority': '-1',
      'disable_ad': '0',
      'download': '0',
      'watchdog': '1',
    });

    const response = await fetch(`${url}?${params.toString()}`, {
      headers: this.baseHeaders,
    });

    if (!response.ok) {
      throw new Error('Failed to create stream link');
    }

    const data = await response.json();
    
    // Return the stream URL
    return data.cmd || data.stream_source || streamId;
  }

  /**
   * Full authentication flow
   */
  async authenticate(): Promise<boolean> {
    try {
      console.log('Mac Stalker: Starting authentication flow');
      await this.init();
      await this.getToken();
      const profile = await this.getProfile();
      
      console.log('Mac Stalker: Profile status', profile.status);
      
      if (profile.status !== 'OK') {
        throw new Error(`Authentication failed: Server returned status "${profile.status}" - Check your MAC address and portal settings`);
      }

      console.log('Mac Stalker: Authentication successful');
      return true;
    } catch (error: any) {
      console.error('Mac Stalker: Authentication error', error);
      
      if (error.message.includes('CORS')) {
        throw new Error('CORS Error: Browser cannot connect to your IPTV server. Please check if your server allows web connections or try using this app on the same network as your server.');
      }
      
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Network Error: Cannot reach the server. Check your internet connection and verify the server address is correct.');
      }
      
      throw error;
    }
  }

  /**
   * Validate configuration
   */
  validateConfig(): boolean {
    const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    const macValid = macRegex.test(this.config.macAddress);
    const hostValid = this.config.host.length > 0;

    return macValid && hostValid;
  }

  setConfig(config: MacStalkerConfig): void {
    this.config = config;
    this.token = null;
    this.profile = null;
  }

  isAuthenticated(): boolean {
    return this.token !== null && this.profile?.status === 'OK';
  }
}
