import { fetcher, API_ROUTE } from '../lib/fetcher';

const useZapperApiFetcher = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  if (apiKey) {

    return (url: string, options?: RequestInit) => {

      const authorization = `Basic ${btoa(`${apiKey}:`)}`;
      const opts: RequestInit = options ?? {};
      opts.headers = {
        ...opts.headers,
        'Authorization': authorization,
        'Content-Type': 'application/json',
      };

      return fetcher(API_ROUTE, url, opts);
    };
  }

  return null;
};

export { useZapperApiFetcher };
