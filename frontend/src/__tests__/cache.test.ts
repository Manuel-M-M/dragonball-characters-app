import { CacheManager } from '../utils/cache';

describe('CacheManager', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should store and retrieve cached data', () => {
    CacheManager.setCache('testKey', { name: 'Goku' }, 24 * 60 * 60 * 1000);
    const cachedData = CacheManager.getCache<{ name: string }>(
      'testKey',
      24 * 60 * 60 * 1000,
    );
    expect(cachedData).toEqual({ name: 'Goku' });
  });

  it('should return null for expired cache', () => {
    CacheManager.setCache('testKey', { name: 'Goku' }, -1);
    const cachedData = CacheManager.getCache('testKey', 24 * 60 * 60 * 1000);
    expect(cachedData).toBeNull();
  });
});
