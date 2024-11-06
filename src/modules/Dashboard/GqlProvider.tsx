import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const API_KEY = 'ec0888a7-9bd1-4e11-b862-a8d44d157afd';

const httpLink = createHttpLink({
  uri: 'https://api.zapper.xyz/z/graphql',
});

const authLink = setContext((_, { headers }) => {
  const authorization = `Basic ${btoa(`${API_KEY}:`)}`;
  const clientId = localStorage.getItem('zapper.clientId');

  return {
    headers: {
      ...headers,
      authorization,
      'x-zapper-client-id': clientId,
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
