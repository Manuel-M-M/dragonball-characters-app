import { act, renderHook } from '@testing-library/react';
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

  it('should add a character to favorites', () => {
    const { result } = renderHook(() => useFavoritesStore());

    act(() => {
      result.current.addFavorite(1);
    });

    expect(result.current.favorites).toContain(1);
  });

  it('should remove a character from favorites', () => {
    const { result } = renderHook(() => useFavoritesStore());

    act(() => {
      result.current.addFavorite(1);
      result.current.removeFavorite(1);
    });

    expect(result.current.favorites).not.toContain(1);
  });

  it('should fetch favorite characters from the API', async () => {
    const { result } = renderHook(() => useFavoritesStore());

    act(() => {
      result.current.addFavorite(1);
    });

    await act(async () => {
      await result.current.fetchFavorites();
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.favoriteCharacters).toEqual([
      { id: 1, name: 'Character 1', image: '/images/characters/1.webp' },
    ]);
  });

  it('should return true if a character is a favorite', () => {
    const { result } = renderHook(() => useFavoritesStore());

    act(() => {
      result.current.addFavorite(1);
    });

    expect(result.current.isFavorite(1)).toBe(true);
  });

  it('should return false if a character is not a favorite', () => {
    const { result } = renderHook(() => useFavoritesStore());

    expect(result.current.isFavorite(2)).toBe(false);
  });
});
