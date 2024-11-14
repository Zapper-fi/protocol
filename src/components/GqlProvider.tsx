import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://api.zapper.xyz/z/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('privy:token');

  return {
    headers: {
      ...headers,
      // TODO: Cleanup
      'privy-token': token ? JSON.parse(token) : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export function GqlProvider({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
