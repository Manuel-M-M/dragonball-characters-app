import { CacheManager } from '../utils/cache';

export class CharactersRepository {
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000;

  async getCharacters(page: number = 1, limit: number = 50) {
    const cacheKey = `characters_page_${page}_limit_${limit}`;
    const cachedCharacters = CacheManager.getCache(
      cacheKey,
      this.CACHE_DURATION,
    );

    if (cachedCharacters) {
      console.log('🟢 Serving characters from cache');
      return cachedCharacters;
    }

    console.log('🔴 Fetching characters from API');
    const response = await fetch(
      `http://localhost:5000/api/characters?page=${page}&limit=${limit}`,
    );

    if (!response.ok) throw new Error('Failed to fetch characters');

    const data = await response.json();
    CacheManager.setCache(cacheKey, data, this.CACHE_DURATION);
    return data;
  }

  async getCharacterById(id: number) {
    const cacheKey = `character_${id}`;
    const cachedCharacter = CacheManager.getCache(
      cacheKey,
      this.CACHE_DURATION,
    );

    if (cachedCharacter) {
      return cachedCharacter;
    }

    const response = await fetch(`http://localhost:5000/api/characters/${id}`);

    if (!response.ok)
      throw new Error(`Failed to fetch character with ID ${id}`);

    const data = await response.json();
    CacheManager.setCache(cacheKey, data, this.CACHE_DURATION);
    return data;
  }
}
