import { Button } from '@/components/ui/button';
import { Settings, Home } from 'lucide-react';

interface HeaderProps {
  onOpenSettings: () => void;
  onGoHome: () => void;
  isConnected: boolean;
}

const Header = ({ onOpenSettings, onGoHome, isConnected }: HeaderProps) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onGoHome} className="text-white">
            <Home className="w-5 h-5" />
          </Button>
          
          <div>
            <h1 className="text-xl font-bold text-white">IPTV Mac Stalker</h1>
            <p className="text-xs text-blue-100">
              {isConnected ? '● Connected' : '○ Not Connected'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onOpenSettings} className="text-white">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
