import React from 'react';
import { ApolloExplorer } from '@apollo/explorer/react';

const ApolloSandboxComponent: React.FC = () => {
  // This is our rate limited, public API key, for free use in the Apollo Sandbox
  // It is meant to be public
  const API_KEY = "Basic YWQwMTUyN2UtODEzMy00YTY4LWFkNjctZmJmOGQ5MDQwYWQxOg==";
  const TEST_ADDRESSES = ["0xd8da6bf26964af9d7eed9e03e53415d37aa96045", "0x6f6e75fb472ee39d847d825cc7c9a613e227e261"];

  return (
    <ApolloExplorer
      graphRef="zapper-public-api@current"
      persistExplorerState={false}
      initialState={{
        document: `query($addresses: [Address!]!) {
    portfolio(addresses: $addresses) {
      tokenBalances {
        address
        network
        token {
          balanceUSD
        }
      }
    }
  }
    `,
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
      className="apollo-sandbox"
    />
  );
};

export default ApolloSandboxComponent;
