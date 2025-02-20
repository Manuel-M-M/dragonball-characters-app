import { act, waitFor } from '@testing-library/react';
import { useCharacterListStore } from '../../store/CharactersListStore/CharactersListStore';
import { CharactersService } from '../../application/CharactersService';

jest.mock('../../application/CharactersService', () => {
  return {
    CharactersService: jest.fn().mockReturnValue({
      getCharacters: jest.fn().mockResolvedValue({
        items: [
          { id: 1, name: 'Goku', image: '/images/characters/goku.webp' },
          { id: 2, name: 'Vegeta', image: '/images/characters/vegeta.webp' },
          { id: 3, name: 'Gohan', image: '/images/characters/gohan.webp' },
        ],
      }),
    }),
  };
});

describe('CharacterList Store', () => {
  beforeEach(() => {
    useCharacterListStore.setState({
      characters: [],
      filteredCharacters: [],
      loading: false,
      error: '',
    });

    jest.clearAllMocks();
  });

  const store = useCharacterListStore.getState();

  it('should fetch characters from the API', async () => {
    await act(async () => {
      await store.fetchCharacters();
    });

    await waitFor(() => {
      expect(useCharacterListStore.getState().characters).toEqual([
        { id: 1, name: 'Goku', image: '/images/characters/goku.webp' },
        { id: 2, name: 'Vegeta', image: '/images/characters/vegeta.webp' },
        { id: 3, name: 'Gohan', image: '/images/characters/gohan.webp' },
      ]);
    });
  });

  it('should set loading to true while fetching', async () => {
    act(() => {
      store.fetchCharacters();
    });

    expect(useCharacterListStore.getState().loading).toBe(true);
  });

  it('should set an error message if fetching fails', async () => {
    (CharactersService as jest.Mock).mockImplementation(() => ({
      getCharacters: jest.fn().mockRejectedValue(new Error('Network error')),
    }));

    await act(async () => {
      await store.fetchCharacters();
    });

    await waitFor(() => {
      expect(useCharacterListStore.getState().error).toBe(
        'Failed to fetch characters',
      );
    });
  });
});
