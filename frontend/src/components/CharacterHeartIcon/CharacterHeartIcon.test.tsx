import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CharacterHeartIcon } from './CharacterHeartIcon';
import { useFavoritesStore } from '../../store/FavoritesStore/favoritesStore';

describe('CharacterHeartIcon', () => {
  beforeEach(() => {
    useFavoritesStore.setState({
      favorites: [],
      addFavorite: jest.fn((id) =>
        useFavoritesStore.setState((state) => ({
          favorites: [...state.favorites, id],
        }))
      ),
      removeFavorite: jest.fn((id) =>
        useFavoritesStore.setState((state) => ({
          favorites: state.favorites.filter((favId) => favId !== id),
        }))
      ),
      isFavorite: (id) => useFavoritesStore.getState().favorites.includes(id),
    });
  });

  test('toggles favorite state on click', () => {
    const characterId = 1;
    render(<CharacterHeartIcon characterId={characterId} />);

    const heartIconContainer = screen.getByTestId('favorite-icon');

    expect(useFavoritesStore.getState().isFavorite(characterId)).toBe(false);

    fireEvent.click(heartIconContainer);
    expect(useFavoritesStore.getState().isFavorite(characterId)).toBe(true);

    fireEvent.click(heartIconContainer);
    expect(useFavoritesStore.getState().isFavorite(characterId)).toBe(false);
  });
});
