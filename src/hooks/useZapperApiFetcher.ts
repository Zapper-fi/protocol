// src/hooks/useZapperApiFetcher.ts
import { fetcher, API_ROUTE } from '../lib/fetcher';

let cachedFetcher: (url: string, options?: RequestInit) => Promise<Record<any, any>>;

const useZapperApiFetcher = () => {
  // Use API key from environment variables
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  // Return cached fetcher if it exists
  if (cachedFetcher) {
    return cachedFetcher;
  }

  if (apiKey) {
    cachedFetcher = (url: string, options?: RequestInit) => {
      const authorization = `Basic ${Buffer.from(`${apiKey}:`, 'utf8').toString('base64')}`;
      const opts: RequestInit = options ?? {};
      opts.headers = {
        ...opts.headers,
        'Authorization': authorization,
        'Content-Type': 'application/json', // Optional: Can be moved to each request
      };

      return fetcher(API_ROUTE, url, opts);
    };
  }

  // Return the fetcher or null if the API key is not available
  return cachedFetcher ?? null;
};

export { useZapperApiFetcher };
