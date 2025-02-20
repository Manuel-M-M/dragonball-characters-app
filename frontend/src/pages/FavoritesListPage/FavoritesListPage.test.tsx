import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import { FavoritesListPage } from '../../pages/FavoritesListPage/FavoritesListPage';
import { useFavoritesStore } from '../../store/FavoritesStore/favoritesStore';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../store/FavoritesStore/favoritesStore', () => ({
  useFavoritesStore: jest.fn(),
}));

describe('FavoritesListPage', () => {
  it('should display favorite characters', async () => {
    const mockFavorites = [
      { id: 1, name: 'Goku', image: 'goku.webp' },
      { id: 2, name: 'Vegeta', image: 'vegeta.webp' },
    ];

    (useFavoritesStore as unknown as jest.Mock).mockReturnValue({
      favoriteCharacters: mockFavorites,
      loading: false,
      error: '',
      fetchFavorites: jest.fn(),
    });

    render(
      <MemoryRouter>
        <FavoritesListPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('Goku')).toBeInTheDocument();
    expect(screen.getByText('Vegeta')).toBeInTheDocument();
  });

  it('should display a message if there are no favorites', async () => {
    (useFavoritesStore as unknown as jest.Mock).mockReturnValue({
      favoriteCharacters: [],
      loading: false,
      error: '',
      fetchFavorites: jest.fn(),
    });

    render(
      <MemoryRouter>
        <FavoritesListPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByText('No favorite characters selected.'),
    ).toBeInTheDocument();
  });

  it('should display loading state', async () => {
    (useFavoritesStore as unknown as jest.Mock).mockReturnValue({
      favoriteCharacters: [],
      loading: true,
      error: '',
      fetchFavorites: jest.fn(),
    });

    render(
      <MemoryRouter>
        <FavoritesListPage />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });

  it('should display error message if fetching fails', async () => {
    (useFavoritesStore as unknown as jest.Mock).mockReturnValue({
      favoriteCharacters: [],
      loading: false,
      error: 'Failed to fetch favorites',
      fetchFavorites: jest.fn(),
    });

    render(
      <MemoryRouter>
        <FavoritesListPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('Failed to fetch favorites')).toBeInTheDocument();
  });

  it('should call fetchFavorites on mount', async () => {
    const mockFetchFavorites = jest.fn();

    (useFavoritesStore as unknown as jest.Mock).mockReturnValue({
      favoriteCharacters: [],
      loading: false,
      error: '',
      fetchFavorites: mockFetchFavorites,
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <FavoritesListPage />
        </MemoryRouter>,
      );
    });

    expect(mockFetchFavorites).toHaveBeenCalled();
  });
});
