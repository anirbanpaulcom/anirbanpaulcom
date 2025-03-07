const cache = new Map<unknown, { data: unknown; timestamp: number }>();
const CACHE_EXPIRATION_TIME = 1 * 60 * 1000;

export default async function Cached<T>(
  key: string,
  fetcher: () => Promise<T>,
): Promise<T | null> {
  const now = Date.now();
  console.log('sssssssssssssssssssssssssseeeeeeeeee  enterrrr');
  if (cache.has(key)) {
    const { data, timestamp } = cache.get(key)!;
    if (now - timestamp < CACHE_EXPIRATION_TIME) {
      console.log('sssssssssssssssssssssssssseeeeeeeeee  using');

      return data as T;
    } else {
      cache.delete(key);
    }
  }

  try {
    const newData = await fetcher();
    console.log('sssssssssssssssssssssssssseeeeeeeeee  set');

    cache.set(key, { data: newData, timestamp: now });
    return newData;
  } catch (error) {
    console.error(`Error fetching data for ${key}:`, error);
    return null;
  }
}
