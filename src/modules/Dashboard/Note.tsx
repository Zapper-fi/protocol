import { Card } from '@site/src/components/Card';
import { Info } from 'lucide-react';

export function Note() {
  return (
    <Card>
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 text-primary-default flex-shrink-0" />
        <p className="text-sm">
          Welcome to the Zapper API Dashboard. While the API is in alpha, each client may query up to 5,000 credits for
          free, providing at least 1,500 queries to test the API. Please note that query costs may change in the future.
        </p>
      </div>
    </Card>
  );
}
