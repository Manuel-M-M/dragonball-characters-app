import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import { CharacterDetailsPage } from './CharacterDetailsPage';
import { useCharacterDetailsStore } from '../../store/CharacterDetailsStore/CharacterDetailsStore';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

const theme = {
  breakpoints: {
    sm: '480px',
    md: '768px',
    lg: '1024px',
  },
};

jest.mock('../../store/CharacterDetailsStore/CharacterDetailsStore', () => ({
  useCharacterDetailsStore: jest.fn(),
}));

describe('CharacterDetailsPage', () => {
  it('should display character details', async () => {
    const mockCharacter = { id: 1, name: 'Goku', image: 'goku.webp' };

    (useCharacterDetailsStore as unknown as jest.Mock).mockReturnValue({
      character: mockCharacter,
      loading: false,
      error: '',
      fetchCharacterById: jest.fn(),
    });

    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={['/character/1']}>
          <Routes>
            <Route path="/character/:id" element={<CharacterDetailsPage />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(await screen.findByText('Goku')).toBeInTheDocument();
    expect(screen.getByAltText('Goku')).toBeInTheDocument();
  });

  it('should display a loading state', async () => {
    (useCharacterDetailsStore as unknown as jest.Mock).mockReturnValue({
      character: null,
      loading: true,
      error: '',
      fetchCharacterById: jest.fn(),
    });

    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={['/character/1']}>
          <Routes>
            <Route path="/character/:id" element={<CharacterDetailsPage />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByLabelText('Loading...')).toBeInTheDocument();
  });

  it('should display an error message if fetching fails', async () => {
    (useCharacterDetailsStore as unknown as jest.Mock).mockReturnValue({
      character: null,
      loading: false,
      error: 'Failed to fetch character',
      fetchCharacterById: jest.fn(),
    });

    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={['/character/1']}>
          <Routes>
            <Route path="/character/:id" element={<CharacterDetailsPage />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByText('Failed to fetch character')).toBeInTheDocument();
  });

  it('should call fetchCharacterById on mount', async () => {
    const mockFetchCharacterById = jest.fn();

    (useCharacterDetailsStore as unknown as jest.Mock).mockReturnValue({
      character: null,
      loading: false,
      error: '',
      fetchCharacterById: mockFetchCharacterById,
    });

    await act(async () => {
      render(
        <ThemeProvider theme={theme}>
          <MemoryRouter initialEntries={['/character/1']}>
            <Routes>
              <Route path="/character/:id" element={<CharacterDetailsPage />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      );
    });

    expect(mockFetchCharacterById).toHaveBeenCalledWith(1);
  });
});
