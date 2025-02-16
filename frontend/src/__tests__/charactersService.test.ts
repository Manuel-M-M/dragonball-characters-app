import { CharactersService } from '../application/CharactersService';
import { CharactersRepository } from '../infrastructure/CharactersRepository';

describe('CharactersService', () => {
  let charactersService: CharactersService;
  let mockRepository: jest.Mocked<CharactersRepository>;

  beforeEach(() => {
    mockRepository = {
      getCharacters: jest.fn(),
      getCharacterById: jest.fn(),
    } as unknown as jest.Mocked<CharactersRepository>;

    charactersService = new CharactersService(mockRepository);
  });

  test('should fetch a paginated list of characters', async () => {
    const mockCharacters = {
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
    };

    mockRepository.getCharacters.mockResolvedValue(mockCharacters);

    const characters = await charactersService.getCharacters(1, 10);

    expect(characters.items.length).toBe(2);
    expect(characters.items[0].name).toBe('Goku');
    expect(mockRepository.getCharacters).toHaveBeenCalledWith(1, 10);
  });

  test('should fetch a character by ID', async () => {
    const mockCharacter = { id: 1, name: 'Goku', race: 'Saiyan' };

    mockRepository.getCharacterById.mockResolvedValue(mockCharacter);

    const character = await charactersService.getCharacterById(1);

    expect(character).toBeDefined();
    expect(character.name).toBe('Goku');
    expect(mockRepository.getCharacterById).toHaveBeenCalledWith(1);
  });
});
