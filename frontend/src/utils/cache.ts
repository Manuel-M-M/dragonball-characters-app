export class CacheManager {
  static setCache(key: string, data: any, ttl: number) {
    const now = Date.now();
    const cacheData = {
      data,
      expiry: now + ttl,
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
  }

  static getCache<T>(key: string, ttl: number): T | null {
    const cachedItem = localStorage.getItem(key);
    if (!cachedItem) return null;

    const parsedItem = JSON.parse(cachedItem);
    const now = Date.now();

    if (now > parsedItem.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return parsedItem.data as T;
  }

  static clearCache(key: string) {
    localStorage.removeItem(key);
  }
}
