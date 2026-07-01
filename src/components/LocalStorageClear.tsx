import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface LocalStorageClearProps {
  onClear: () => void;
}

const LocalStorageClear = ({ onClear }: LocalStorageClearProps) => {
  const handleClear = () => {
    localStorage.removeItem('iptv_host');
    localStorage.removeItem('iptv_mac');
    toast.success('Configuration cleared', {
      description: 'You can now enter fresh settings'
    });
    onClear();
  };

  return (
    <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-medium text-amber-900 dark:text-amber-100">
              Still having connection issues?
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Clear your saved settings and try again
            </p>
          </div>
          <Button onClick={handleClear} variant="outline" size="sm">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocalStorageClear;
