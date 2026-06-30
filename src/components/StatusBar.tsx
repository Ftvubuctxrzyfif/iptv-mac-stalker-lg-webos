import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wifi, Signal, Clock } from 'lucide-react';

interface StatusBarProps {
  isConnected: boolean;
  channelCount?: number;
  latency?: number;
}

const StatusBar = ({ isConnected, channelCount, latency }: StatusBarProps) => {
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <Card className="border-t rounded-none">
      <CardContent className="px-4 py-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Wifi className={`w-4 h-4 ${isConnected ? 'text-green-500' : 'text-gray-400'}`} />
              <span className={isConnected ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}>
                {isConnected ? 'Online' : 'Offline'}
              </span>
            </div>

            {channelCount !== undefined && (
              <Badge variant="secondary" className="text-xs">
                {channelCount} channels
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-4">
            {latency !== undefined && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Signal className="w-4 h-4" />
                <span className="text-xs">{latency}ms</span>
              </div>
            )}

            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-xs">{timeString}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusBar;
