import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { CharactersListPage } from './CharactersListPage';
import { CharactersRepository } from '../../infrastructure/CharactersRepository';

jest.mock('../../infrastructure/CharactersRepository');

describe('CharactersListPage', () => {
  const mockCharacters = [
    {
      id: 1,
      name: 'Goku',
      image: 'https://dragonball-api.com/characters/goku.png',
    },
    {
      id: 2,
      name: 'Vegeta',
      image: 'https://dragonball-api.com/characters/vegeta.png',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    (CharactersRepository.prototype.getCharacters as jest.Mock).mockReturnValue(
      new Promise(() => {}),
    );

    render(<CharactersListPage />);
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });

  test('renders character list when API call succeeds', async () => {
    (
      CharactersRepository.prototype.getCharacters as jest.Mock
    ).mockResolvedValue({
      items: mockCharacters,
      meta: {
        totalItems: 2,
        itemCount: 2,
        itemsPerPage: 10,
        totalPages: 1,
        currentPage: 1,
      },
    });

    render(<CharactersListPage />);

    await waitFor(() => expect(screen.getByText('Goku')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Vegeta')).toBeInTheDocument());
  });

  test('renders error message when API call fails', async () => {
    (
      CharactersRepository.prototype.getCharacters as jest.Mock
    ).mockRejectedValue(new Error('Failed to fetch characters'));

    render(<CharactersListPage />);

    await waitFor(() =>
      expect(
        screen.getByText(/failed to fetch characters/i),
      ).toBeInTheDocument(),
    );
  });
});
