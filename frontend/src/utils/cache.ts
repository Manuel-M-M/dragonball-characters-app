export class CacheManager {
  private static DEFAULT_TTL = 24 * 60 * 60 * 1000;

  static setCache<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL) {
    const now = Date.now();
    const cacheData = {
      data,
      expiry: now + ttl,
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
  }

  static getCache<T>(key: string): T | null {
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
