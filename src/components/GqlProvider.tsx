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
      // TODO: Get Privy auth token from cookie in the BE then remove this
      'privy-token': token ? JSON.parse(token) : '',

      // TODO: Remove this once token parsing is implemented
      authorization: `Basic ${btoa('ec0888a7-9bd1-4e11-b862-a8d44d157afd:')}`,
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
