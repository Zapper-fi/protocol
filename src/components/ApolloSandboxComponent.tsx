import React from 'react';
import { ApolloSandbox } from '@apollo/sandbox/react';

const ApolloSandboxComponent: React.FC = () => (
  <ApolloSandbox
    initialEndpoint="https://public.zapper.xyz/graphql"
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
        addresses: ["0xd8da6bf26964af9d7eed9e03e53415d37aa96045", "0x6f6e75fb472ee39d847d825cc7c9a613e227e261"],
      },
    }}
    className="apollo-sandbox"
  />
);

export default ApolloSandboxComponent;
