import { gql } from '@apollo/client';
import { useAuthQuery } from '@site/src/helpers/useAuthQuery';
import { Card } from '@site/src/components/Card';
import { Button } from '@site/src/components/Button';
import { usePrivy } from '@privy-io/react-auth';
import { Copy, Info } from 'lucide-react';
import { useState, useEffect } from 'react';
import styles from '@site/src/pages/index.module.scss';

export function Note() {
  return (
    <Card>
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm">
          Welcome to the Zapper Protocol Dashboard. While the API is in beta, each client may query up to 10k credits
          freely, which rounds up to about 1000 requests. Please note that query costs may change during beta.
        </p>
      </div>
    </Card>
  );
}
