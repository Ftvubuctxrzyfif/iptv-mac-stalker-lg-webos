import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Save, CheckCircle2, XCircle } from 'lucide-react';

interface IPTVConfigProps {
  onSave: (host: string, macAddress: string) => void;
  initialHost?: string;
  initialMacAddress?: string;
}

const IPTVConfig = ({ onSave, initialHost = '', initialMacAddress = '' }: IPTVConfigProps) => {
  const [host, setHost] = useState(initialHost);
  const [macAddress, setMacAddress] = useState(initialMacAddress);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const validateMAC = (mac: string): boolean => {
    const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    return macRegex.test(mac);
  };

  const handleMACChange = (value: string) => {
    // Auto-format MAC address
    let formatted = value.toUpperCase().replace(/[^0-9A-F]/g, '');
    
    // Add colons every 2 characters
    if (formatted.length > 2) {
      formatted = formatted.match(/.{1,2}/g)?.join(':') || formatted;
    }
    
    // Limit to 17 characters (XX:XX:XX:XX:XX:XX)
    formatted = formatted.substring(0, 17);
    
    setMacAddress(formatted);
    setIsValid(validateMAC(formatted));
  };

  const handleSave = () => {
    if (host && validateMAC(macAddress)) {
      onSave(host, macAddress);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const generateRandomMAC = () => {
    const hex = '0123456789ABCDEF';
    let mac = '';
    for (let i = 0; i < 6; i++) {
      mac += hex[Math.floor(Math.random() * 16)];
      mac += hex[Math.floor(Math.random() * 16)];
      if (i < 5) mac += ':';
    }
    setMacAddress(mac);
    setIsValid(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
              <Settings className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">IPTV Configuration</CardTitle>
          <CardDescription>
            Enter your Mac Stalker server details to connect
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="host">Server Host</Label>
            <Input
              id="host"
              placeholder="portal.example.com"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              className="text-lg"
            />
            <p className="text-sm text-muted-foreground">
              Enter your IPTV portal address (with or without http://)
              <br />
              <span className="text-xs">Examples: portal.example.com, http://portal.com, 192.168.1.100</span>
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mac">MAC Address</Label>
            <div className="flex gap-2">
              <Input
                id="mac"
                placeholder="XX:XX:XX:XX:XX:XX"
                value={macAddress}
                onChange={(e) => handleMACChange(e.target.value)}
                maxLength={17}
                className="text-lg font-mono"
              />
              <Button
                onClick={generateRandomMAC}
                variant="outline"
                size="icon"
                title="Generate random MAC"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Your device's MAC address (format: XX:XX:XX:XX:XX:XX)
            </p>
          </div>

          {isValid !== null && (
            <div className={`flex items-center gap-2 p-3 rounded-lg ${
              isValid ? 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400'
            }`}>
              {isValid ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">Configuration is valid!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5" />
                  <span className="font-medium">Please check your configuration</span>
                </>
              )}
            </div>
          )}

          <Button
            onClick={handleSave}
            disabled={!host || !validateMAC(macAddress)}
            className="w-full"
            size="lg"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Configuration
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            <p>You can change these settings later from the menu</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IPTVConfig;
