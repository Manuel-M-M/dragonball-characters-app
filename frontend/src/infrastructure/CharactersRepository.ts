import { log } from 'console';

export class CharactersRepository {
  async getCharacters(page: number = 1, limit: number = 50) {
    const response = await fetch(
      `https://dragonball-api.com/api/characters?page=${page}&limit=${limit}`,
    );
    if (!response.ok) throw new Error('Failed to fetch characters');

    return await response.json();
  }

  async getCharacterById(id: number) {
    const response = await fetch(`http://localhost:5000/api/characters?${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch character with ID ${id}`);
    }

    return response.json();
  }

  async getCharactersByIds(ids: number[]) {
    const queryString = ids.map((id) => `id=${id}`).join('&');
    const response = await fetch(
      `http://localhost:5000/api/characters?${queryString}`,
    );
    if (!response.ok) {
      throw new Error('Failed to fetch characters by IDs');
    }
    const data = await response.json();

    return data;
  }
}
