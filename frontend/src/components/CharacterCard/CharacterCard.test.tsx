import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CharacterDetailsPage } from '../../pages/CharacterDetailsPage/CharacterDetailsPage';
import { CharacterCard } from './CharacterCard';
import { useCharacterDetailsStore } from '../../store/CharacterDetailsStore/CharacterDetailsStore';
import { ThemeProvider } from 'styled-components';

const theme = {
  breakpoints: {
    sm: '480px',
    md: '768px',
    lg: '1024px',
  },
};

describe('CharacterCard', () => {
  const mockCharacter = {
    id: 1,
    name: 'Goku',
    image: 'https://dragonball-api.com/characters/goku.png',
  };

  beforeEach(() => {
    useCharacterDetailsStore.setState({
      character: null,
      loading: false,
      error: '',
      fetchCharacterById: jest.fn(),
    });
  });

  const renderWithTheme = (ui: React.ReactElement) => {
    return render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>{ui}</MemoryRouter>
      </ThemeProvider>
    );
  };

  it('renders character id, name and image', () => {
    renderWithTheme(
      <CharacterCard id={mockCharacter.id} name={mockCharacter.name} image={mockCharacter.image} />
    );

    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', mockCharacter.image);
    expect(img).toHaveAttribute('alt', mockCharacter.name);
  });

  it('renders a favorite icon', () => {
    renderWithTheme(
      <CharacterCard id={mockCharacter.id} name={mockCharacter.name} image={mockCharacter.image} />
    );

    expect(screen.getByTestId('favorite-icon')).toBeInTheDocument();
  });

  it('should navigate to the character details page when clicking the image', async () => {
    useCharacterDetailsStore.setState({
      character: {
        id: 1,
        name: 'Goku',
        image: 'goku.webp',
        description: 'Saiyan warrior',
        transformations: [],
      },
      loading: false,
      error: '',
    });

    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<CharacterCard id={1} name="Goku" image="goku.webp" />} />
            <Route path="/character/:id" element={<CharacterDetailsPage />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );

    const image = screen.getByAltText('Goku');
    expect(image).toBeInTheDocument();

    await userEvent.click(image);

    await waitFor(() => {
      expect(screen.getByText('Goku')).toBeInTheDocument();
    });
  });
});
