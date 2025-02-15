import { CharactersRepository } from '../infrastructure/CharactersRepository';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        items: [
          { id: 1, name: 'Goku', race: 'Saiyan' },
          { id: 2, name: 'Vegeta', race: 'Saiyan' },
        ],
        meta: {
          totalItems: 58,
          itemCount: 2,
          itemsPerPage: 10,
          totalPages: 6,
          currentPage: 1,
        },
      }),
  }),
) as jest.Mock;

describe('CharactersRepository', () => {
  let charactersRepository: CharactersRepository;

  beforeEach(() => {
    charactersRepository = new CharactersRepository();
    jest.clearAllMocks();
  });

  test('should fetch a list of characters with pagination', async () => {
    const { items, meta } = await charactersRepository.getCharacters(1, 10);
    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBeGreaterThan(0);
    expect(meta).toHaveProperty('totalItems');
    expect(meta).toHaveProperty('totalPages');
  });

  test('should fetch a single character by ID from the API', async () => {
    const characterId = 1;
    const mockCharacter = {
      id: 1,
      name: 'Goku',
      race: 'Saiyan',
      gender: 'Male',
      affiliation: 'Z Fighter',
    };

    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockCharacter),
    } as unknown as Response);

    const character = await charactersRepository.getCharacterById(characterId);

    expect(character).toBeDefined();
    expect(character).toHaveProperty('id', characterId);
    expect(character).toHaveProperty('name', 'Goku');
    expect(character).toHaveProperty('race', 'Saiyan');
    expect(character).toHaveProperty('gender', 'Male');
  });
});
