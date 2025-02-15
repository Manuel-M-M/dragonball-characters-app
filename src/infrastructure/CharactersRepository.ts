export class CharactersRepository {
  private readonly apiUrl = 'https://www.dragonball-api.com/api/characters';

  async getCharacters(page = 1, limit = 10) {
    const response = await fetch(this.apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch characters');
    }
    return response.json();
  }
}
