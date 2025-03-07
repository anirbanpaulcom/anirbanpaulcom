export const fetcher = <T>(
  url: string,
  options: RequestInit = {},
  returnType: 'object' | 'string' | 'raw' = 'raw',
  timeout: number = 10000,
): Promise<T> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  return fetch(url, {
    ...options,
    signal: controller.signal,
  })
    .then(async (res) => {
      clearTimeout(timeoutId);
      const response = res.headers
        .get('Content-Type')
        ?.includes('application/json')
        ? await res.json()
        : await res.text();

      console.log(`${res.status} ${url} ----------- ${response}`);
      if (res.status >= 400 && res.status < 600) {
        if (typeof window !== 'undefined')
          if (!res.ok) {
            console.error(
              response?.message ||
                response ||
                'An error occurred while fetching',
            );
          }
        return null;
      }
      return returnType === 'object'
        ? (() => {
            try {
              return JSON.parse(response);
            } catch {
              return response;
            }
          })()
        : returnType === 'string'
          ? (() => {
              try {
                return JSON.stringify(response);
              } catch {
                return response;
              }
            })()
          : response || null;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
};
