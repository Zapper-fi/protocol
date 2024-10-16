const API_ROUTE = process.env.NEXT_PUBLIC_ZAPPER_API || '';

const fetcher = async (basePath: string, url: string, options?: RequestInit) => {
  console.log("request : ", basePath, url, options);
  const response = await fetch(`${basePath}${url}`, options);
  let json: Record<any, any> = {};
  console.log("response : ", response);
  try {
    json = await response.json();
  } catch (e) {}

  if (!response.ok) {
    const message = Array.isArray(json?.message) ? json?.message.join(' | ') : json?.message;
    throw new Error(`${response.status} - ${message}`);
  }

  return json;
};

export { fetcher, API_ROUTE };
