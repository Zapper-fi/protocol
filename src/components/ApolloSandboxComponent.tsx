import type React from 'react';
import { ApolloExplorer } from '@apollo/explorer/react';
import BrowserOnly from '@docusaurus/BrowserOnly';

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

interface ApolloSandboxComponentProps {
  query: string;
  variables: Record<string, JsonValue>;
}

const ApolloSandboxComponent: React.FC<ApolloSandboxComponentProps> = () => {
  // This is our rate limited, public API key, for free use in the Apollo Sandbox
  // It is meant to be public
  const API_KEY = 'Basic ODRjN2VjZGItM2Y5MS00ZWFjLWFjZDEtYjlkYWVjYjk3MTE1==';
  const TEST_ADDRESSES = ['0xd8da6bf26964af9d7eed9e03e53415d37aa96045', '0x6f6e75fb472ee39d847d825cc7c9a613e227e261'];

  return (
    <ApolloExplorer
      graphRef="zapper-public-api@current"
      persistExplorerState={false}
      initialState={{
        document: `query($addresses: [Address!]) {
          accountsTimeline(addresses: $addresses) {
            edges {
              node {
                transaction {
                  fromUser {
                    address
                    displayName {
                      value
                    }
                  }
                  toUser {
                    displayName {
                      value
                    }
                  }
                }
                interpretation {
                  processedDescription
                }
              }
            }
          }
        }`,
        variables: {
          addresses: TEST_ADDRESSES,
        },
        headers: {
          Authorization: API_KEY,
        },
        displayOptions: {
          showHeadersAndEnvVars: false,
          docsPanelState: 'open',
          theme: 'dark',
        },
      }}
      className="h-[600px] overflow-hidden"
    />
  );
};

export default function ClientApolloSandboxComponent() {
  return <BrowserOnly>{() => <ApolloSandboxComponent />}</BrowserOnly>;
}
