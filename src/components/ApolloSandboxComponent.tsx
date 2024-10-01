import React from 'react';
import { ButtonType, LinkButton } from './LinkButton';

const ApolloSandboxComponent: React.FC = () => {
  return (
    <LinkButton
      type={ButtonType.Primary}
      buttonCopy="Open Apollo Sandbox"
      href="https://studio.apollographql.com/sandbox/explorer?endpoint=https://public.zapper.xyz/graphql"
    />
  );
};

export default ApolloSandboxComponent;
