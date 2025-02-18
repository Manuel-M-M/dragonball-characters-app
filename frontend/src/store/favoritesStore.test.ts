import { act, waitFor } from '@testing-library/react';
import { useFavoritesStore } from '../store/favoritesStore';

jest.mock('../application/CharactersService', () => ({
  CharactersService: jest.fn().mockImplementation(() => ({
    getCharacters: jest.fn().mockResolvedValue({
      items: [
        { id: 1, name: 'Character 1', image: '/images/characters/1.webp' },
        { id: 2, name: 'Character 2', image: '/images/characters/2.webp' },
      ],
    }),
  })),
}));

describe('Favorites Store', () => {
  beforeEach(() => {
    useFavoritesStore.setState({
      favorites: [],
      favoriteCharacters: [],
      loading: false,
      error: '',
    });
  });

  it('should add a character to favorites', async () => {
    const store = useFavoritesStore.getState();

    act(() => {
      store.addFavorite(1);
    });

    await waitFor(() => {
      expect(useFavoritesStore.getState().favorites).toContain(1);
    });
  });

  it('should remove a character from favorites', async () => {
    const store = useFavoritesStore.getState();

    act(() => {
      store.addFavorite(1);
      store.removeFavorite(1);
    });

    await waitFor(() => {
      expect(useFavoritesStore.getState().favorites).not.toContain(1);
    });
  });

  it('should fetch favorite characters from the API', async () => {
    const store = useFavoritesStore.getState();

    act(() => {
      store.addFavorite(1);
    });

    await act(async () => {
      await store.fetchFavorites();
    });

    await waitFor(() => {
      expect(useFavoritesStore.getState().favoriteCharacters).toEqual([
        { id: 1, name: 'Character 1', image: '/images/characters/1.webp' },
      ]);
    });
  });

  it('should return true if a character is a favorite', async () => {
    const store = useFavoritesStore.getState();

    act(() => {
      store.addFavorite(1);
    });

    await waitFor(() => {
      expect(useFavoritesStore.getState().isFavorite(1)).toBe(true);
    });
  });

  it('should return false if a character is not a favorite', async () => {
    await waitFor(() => {
      expect(useFavoritesStore.getState().isFavorite(2)).toBe(false);
    });
  });
});
