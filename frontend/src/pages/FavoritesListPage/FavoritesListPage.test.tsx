import { render, screen } from '@testing-library/react';
import { useFavoritesStore } from '../../store/favoritesStore';
import { FavoritesListPage } from '../../pages/FavoritesListPage/FavoritesListPage';

jest.mock('../../store/favoritesStore', () => ({
  useFavoritesStore: jest.fn(),
}));

describe('FavoritesListPage', () => {
  it('should display favorite characters', () => {
    const mockFavorites = [
      { id: 1, name: 'Goku', image: 'goku.webp' },
      { id: 2, name: 'Vegeta', image: 'vegeta.webp' },
    ];

    (useFavoritesStore as unknown as jest.Mock).mockReturnValue({
      favorites: mockFavorites.map((c) => c.id),
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      isFavorite: (id: number) => mockFavorites.some((c) => c.id === id),
    });

    render(<FavoritesListPage />);

    expect(screen.getByText('Goku')).toBeInTheDocument();
    expect(screen.getByText('Vegeta')).toBeInTheDocument();
  });

  it('should display a message if there are no favorites', () => {
    (useFavoritesStore as unknown as jest.Mock).mockReturnValue({
      favorites: [],
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      isFavorite: jest.fn().mockReturnValue(false),
    });

    render(<FavoritesListPage />);

    expect(
      screen.getByText('No favorite characters found'),
    ).toBeInTheDocument();
  });
});
