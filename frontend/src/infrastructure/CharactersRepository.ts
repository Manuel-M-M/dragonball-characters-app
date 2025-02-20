export class CharactersRepository {
  async getCharacters(page: number = 1, limit: number = 50) {
    const response = await fetch(
      `http://localhost:5000/api/characters?page=${page}&limit=${limit}`,
    );
    if (!response.ok) throw new Error('Failed to fetch characters');

    return await response.json();
  }

  async getCharacterById(id: number) {
    const response = await fetch(`http://localhost:5000/api/characters/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch character with ID ${id}`);
    }

    return response.json();
  }
}
