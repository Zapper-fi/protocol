import { Card } from '@site/src/components/Card';
import { Info } from 'lucide-react';

export function Note() {
  return (
    <Card>
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 text-primary-default flex-shrink-0" />
        <p className="text-sm">
          Welcome to the Zapper Protocol Dashboard. While the API is in beta, each client may query up to 10k credits
          freely, which rounds up to about 1000 requests. Please note that query costs may change during beta.
        </p>
      </div>
    </Card>
  );
}
