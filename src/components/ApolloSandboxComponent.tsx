import React from 'react';
import { ApolloExplorer } from '@apollo/explorer/react';

interface ApolloSandboxComponentProps {
  query: string;
  variables: Record<string, any>;
}

const ApolloSandboxComponent: React.FC<ApolloSandboxComponentProps> = ({ query, variables }) => {
  // This is our rate limited, public API key, for free use in the Apollo Sandbox
  // It is meant to be public
  const API_KEY = "Basic ODRjN2VjZGItM2Y5MS00ZWFjLWFjZDEtYjlkYWVjYjk3MTE1==";

  return (
    <ApolloExplorer
      graphRef="zapper-public-api@current"
      persistExplorerState={false}
      initialState={{
        document: query,
        variables: variables,
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