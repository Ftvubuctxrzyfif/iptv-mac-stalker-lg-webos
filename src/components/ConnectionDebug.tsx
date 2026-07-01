import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, AlertTriangle, Loader2 } from 'lucide-react';

interface ConnectionTestResults {
  step: string;
  status: 'pending' | 'success' | 'error';
  message: string;
  duration?: number;
}

interface ConnectionDebugProps {
  results: ConnectionTestResults[];
  isRunning: boolean;
  onRunTest: () => void;
}

const ConnectionDebug = ({ results, isRunning, onRunTest }: ConnectionDebugProps) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            Connection Diagnostics
            <Button onClick={onRunTest} disabled={isRunning} size="sm">
              {isRunning ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Running...
                </>
              ) : (
                'Run Test'
              )}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {results.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                Click "Run Test" to diagnose your connection
              </p>
            ) : (
              results.map((result, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 p-3 rounded-lg border ${
                    result.status === 'success'
                      ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800'
                      : result.status === 'error'
                      ? 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800'
                      : 'bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700'
                  }`}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {result.status === 'pending' ? (
                      <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                    ) : result.status === 'success' ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{result.step}</span>
                      {result.duration && (
                        <Badge variant="outline" className="text-xs">
                          {result.duration}ms
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{result.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {results.some(r => r.status === 'error') && (
            <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                    Common Issues:
                  </h4>
                  <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-1">
                    <li>• <strong>CORS Error:</strong> Install a "CORS Unblock" browser extension</li>
                    <li>• <strong>Network Error:</strong> Check if server address is correct</li>
                    <li>• <strong>Auth Failed:</strong> Your MAC address may be blocked - generate a new one</li>
                    <li>• <strong>Server Not Responding:</strong> Your IPTV service might be down</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ConnectionDebug;
