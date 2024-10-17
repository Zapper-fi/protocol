const API_ROUTE = process.env.NEXT_PUBLIC_ZAPPER_API || '';

const fetcher = async (basePath: string, url: string, options: RequestInit = {}) => {
  const response = await fetch(`${basePath}${url}`, {
    method: 'POST',
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const json = await response.json().catch(() => ({}));
    const message = Array.isArray(json?.message) ? json?.message.join(' | ') : json?.message;
    throw new Error(`${response.status} - ${message}`);
  }

  return response.json();
};

export { fetcher, API_ROUTE };