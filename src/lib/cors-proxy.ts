/**
 * CORS Proxy for Mac Stalker connections
 * Routes requests through a CORS proxy to bypass browser restrictions
 */

class CORSProxy {
  private proxyUrl: string;

  constructor(proxyUrl?: string) {
    // Use corsproxy.io as default (free, no CORS restrictions)
    this.proxyUrl = proxyUrl || 'https://corsproxy.io/?';
  }

  /**
   * Proxy a fetch request through CORS proxy
   */
  async proxyFetch(url: string, options?: RequestInit): Promise<Response> {
    const proxiedUrl = `${this.proxyUrl}${encodeURIComponent(url)}`;
    
    console.log('CORS Proxy:', {
      original: url,
      proxied: proxiedUrl.substring(0, 100) + '...'
    });

    const response = await fetch(proxiedUrl, {
      ...options,
      headers: {
        ...options?.headers,
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    return response;
  }

  /**
   * Check if proxy is working
   */
  async testConnection(): Promise<boolean> {
    try {
      const testUrl = 'https://httpbin.org/get';
      const response = await this.proxyFetch(testUrl);
      return response.ok;
    } catch (error) {
      console.error('CORS Proxy test failed:', error);
      return false;
    }
  }
}

export const corsProxy = new CORSProxy();
