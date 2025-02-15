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
  });

  test('should fetch a list of characters with pagination', async () => {
    const { items, meta } = await charactersRepository.getCharacters(1, 10);
    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBeGreaterThan(0);
    expect(meta).toHaveProperty('totalItems');
    expect(meta).toHaveProperty('totalPages');
  });
});
