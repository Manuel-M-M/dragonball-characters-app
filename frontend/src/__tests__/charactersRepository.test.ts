import { CharactersRepository } from '../infrastructure/CharactersRepository';

describe('CharactersRepository', () => {
  let charactersRepository: CharactersRepository;

  beforeEach(() => {
    charactersRepository = new CharactersRepository();
    jest.clearAllMocks();
  });

  test('should fetch 50 characters from the API', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            items: new Array(50).fill({ id: 1, name: 'Mock Character' }),
            meta: {
              totalItems: 50,
              itemCount: 50,
              itemsPerPage: 50,
              totalPages: 1,
              currentPage: 1,
            },
          }),
      })
    ) as jest.Mock;

    const { items, meta } = await charactersRepository.getCharacters(1, 50);

    expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/characters?page=1&limit=50');

    expect(items).toHaveLength(50);
    expect(meta).toHaveProperty('itemsPerPage', 50);
  });
});
