export class CharactersRepository {
  private readonly apiUrl = 'http://localhost:5000/api/characters';

  async getCharacters(page = 1, limit = 10) {
    const response = await fetch(this.apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch characters');
    }
    return response.json();
  }

  async getCharacterById(id: number) {
    const response = await fetch(`${this.apiUrl}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch character with ID ${id}`);
    }
    return response.json();
  }
}
