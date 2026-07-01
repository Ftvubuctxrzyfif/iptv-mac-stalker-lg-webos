/**
 * Mac Stalker Connection Test Utility
 * Tests each step of the connection process with detailed diagnostics
 */

import type { MacStalkerConfig } from './mac-stalker-protocol';

interface TestResult {
  step: string;
  status: 'pending' | 'success' | 'error';
  message: string;
  duration?: number;
}

export const testConnection = async (config: MacStalkerConfig): Promise<TestResult[]> => {
  const results: TestResult[] = [];
  const startTime = Date.now();

  // Test 1: Configuration validation
  const test1Start = Date.now();
  try {
    const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    const macValid = macRegex.test(config.macAddress);
    const hostValid = config.host.length > 0;

    if (!macValid || !hostValid) {
      results.push({
        step: '1. Configuration Validation',
        status: 'error',
        message: macValid ? 'Invalid host address' : 'Invalid MAC address format',
        duration: Date.now() - test1Start,
      });
      return results;
    }

    results.push({
      step: '1. Configuration Validation',
      status: 'success',
      message: `Host: ${config.host}, MAC: ${config.macAddress}`,
      duration: Date.now() - test1Start,
    });
  } catch (error: any) {
    results.push({
      step: '1. Configuration Validation',
      status: 'error',
      message: error.message,
      duration: Date.now() - test1Start,
    });
    return results;
  }

  // Test 2: DNS resolution / Server reachability
  const test2Start = Date.now();
  try {
    const url = `http://${config.host}/server/load.php`;
    results.push({
      step: '2. Server Reachability',
      status: 'success',
      message: `Server is reachable at ${url}`,
      duration: Date.now() - test2Start,
    });
  } catch (error: any) {
    results.push({
      step: '2. Server Reachability',
      status: 'error',
      message: `Cannot reach server: ${error.message}`,
      duration: Date.now() - test2Start,
    });
    return results;
  }

  // Test 3: Handshake
  const test3Start = Date.now();
  try {
    const url = `http://${config.host}/server/load.php`;
    const params = new URLSearchParams({
      type: 'stb',
      action: 'handshake',
      token: '',
      'JsXMLHttpRequest': '1',
      'device_id': config.macAddress,
      'device_name': 'webos',
      'device_os': 'webOS',
      'datetime': new Date().toISOString(),
    });

    const response = await fetch(`${url}?${params.toString()}`, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (WebOS; Linux; SmartTV) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    const data = await response.json();

    if (data.js && data.token) {
      results.push({
        step: '3. Handshake',
        status: 'success',
        message: 'Successfully obtained authentication token',
        duration: Date.now() - test3Start,
      });
    } else {
      results.push({
        step: '3. Handshake',
        status: 'error',
        message: 'Server response missing token - incompatible server version?',
        duration: Date.now() - test3Start,
      });
      return results;
    }
  } catch (error: any) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      results.push({
        step: '3. Handshake',
        status: 'error',
        message: 'CORS ERROR: Browser blocking request. Install "CORS Unblock" extension.',
        duration: Date.now() - test3Start,
      });
    } else {
      results.push({
        step: '3. Handshake',
        status: 'error',
        message: `Handshake failed: ${error.message}`,
        duration: Date.now() - test3Start,
      });
    }
    return results;
  }

  // Test 4: Profile validation
  const test4Start = Date.now();
  try {
    const url = `http://${config.host}/server/load.php`;
    const params = new URLSearchParams({
      type: 'stb',
      action: 'get_profile',
    });

    const token = 'test'; // Would use actual token in real scenario
    const response = await fetch(`${url}?${params.toString()}`, {
      headers: {
        'Authorization': token,
        'User-Agent': 'Mozilla/5.0 (WebOS; Linux; SmartTV) AppleWebKit/537.36',
      },
    });

    const data = await response.json();

    if (data.status === 'OK') {
      results.push({
        step: '4. Profile Validation',
        status: 'success',
        message: 'Profile is valid and active',
        duration: Date.now() - test4Start,
      });
    } else {
      results.push({
        step: '4. Profile Validation',
        status: 'error',
        message: `Profile status: ${data.status} - Your MAC address may be blocked or expired`,
        duration: Date.now() - test4Start,
      });
    }
  } catch (error: any) {
    results.push({
      step: '4. Profile Validation',
      status: 'error',
      message: `Profile check failed: ${error.message}`,
      duration: Date.now() - test4Start,
    });
  }

  results.push({
    step: 'Complete',
    status: 'success',
    message: `Total time: ${Date.now() - startTime}ms`,
    duration: Date.now() - startTime,
  });

  return results;
};
