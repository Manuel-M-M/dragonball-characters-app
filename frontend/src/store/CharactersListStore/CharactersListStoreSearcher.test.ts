import { act, waitFor } from '@testing-library/react';
import { useCharacterListStore } from '../../store/CharactersListStore/CharactersListStore';

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

describe('CharacterList Store - Searching', () => {
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

  it('should filter characters by search term', async () => {
    await act(async () => {
      await store.fetchCharacters();
    });

    await waitFor(() => {
      expect(
        useCharacterListStore.getState().characters.length,
      ).toBeGreaterThan(0);
    });

    act(() => {
      store.searchCharacters('Goku');
    });

    await waitFor(() => {
      expect(useCharacterListStore.getState().filteredCharacters).toEqual([
        { id: 1, name: 'Goku', image: '/images/characters/goku.webp' },
      ]);
    });
  });

  it('should return all characters if search term is empty', async () => {
    await act(async () => {
      await store.fetchCharacters();
    });

    act(() => {
      store.searchCharacters('');
    });

    await waitFor(() => {
      expect(useCharacterListStore.getState().filteredCharacters).toEqual([
        { id: 1, name: 'Goku', image: '/images/characters/goku.webp' },
        { id: 2, name: 'Vegeta', image: '/images/characters/vegeta.webp' },
        { id: 3, name: 'Gohan', image: '/images/characters/gohan.webp' },
      ]);
    });
  });

  it('should return an empty array if no characters match the search', async () => {
    await act(async () => {
      await store.fetchCharacters();
    });

    act(() => {
      store.searchCharacters('Frieza');
    });

    await waitFor(() => {
      expect(useCharacterListStore.getState().filteredCharacters).toEqual([]);
    });
  });

  it('should return characters that match a partial search term', async () => {
    await act(async () => {
      await store.fetchCharacters();
    });

    act(() => {
      store.searchCharacters('go');
    });

    await waitFor(() => {
      expect(useCharacterListStore.getState().filteredCharacters).toEqual([
        { id: 1, name: 'Goku', image: '/images/characters/goku.webp' },
        { id: 3, name: 'Gohan', image: '/images/characters/gohan.webp' },
      ]);
    });
  });
});
