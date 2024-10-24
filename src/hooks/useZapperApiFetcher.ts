import { fetcher, API_ROUTE } from '../lib/fetcher';

type GraphQLVariables = Record<string, any>;

const useZapperApiFetcher = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  if (!apiKey || !API_ROUTE) {
    console.error('Missing API key or API URL');
    return null;
  }

  return async (query: string, variables?: GraphQLVariables) => {
    const authorization = `Basic ${btoa(`${apiKey}:`)}`;
    
    try {
      return await fetcher(API_ROUTE, '/graphql', {
        headers: {
          'Authorization': authorization,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });
    } catch (error) {
      console.error('GraphQL query failed:', error);
      throw error;
    }
  };
};

export { useZapperApiFetcher };