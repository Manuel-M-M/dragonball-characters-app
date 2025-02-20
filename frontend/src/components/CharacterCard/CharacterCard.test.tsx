import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CharacterDetailsPage } from '../../pages/CharacterDetailsPage/CharacterDetailsPage';
import { CharacterCard } from './CharacterCard';
import { useCharacterDetailsStore } from '../../store/CharacterDetailsStore/CharacterDetailsStore';

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

  it('renders character id, name and image', () => {
    render(
      <MemoryRouter>
        <CharacterCard
          id={mockCharacter.id}
          name={mockCharacter.name}
          image={mockCharacter.image}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', mockCharacter.image);
    expect(img).toHaveAttribute('alt', mockCharacter.name);
  });

  it('renders a favorite icon', () => {
    render(
      <MemoryRouter>
        <CharacterCard
          id={mockCharacter.id}
          name={mockCharacter.name}
          image={mockCharacter.image}
        />
      </MemoryRouter>,
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
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={<CharacterCard id={1} name="Goku" image="goku.webp" />}
          />
          <Route path="/character/:id" element={<CharacterDetailsPage />} />
        </Routes>
      </MemoryRouter>,
    );

    const image = screen.getByAltText('Goku');
    expect(image).toBeInTheDocument();

    console.log('👉 Clicking on image...');
    await userEvent.click(image);

    console.log('🔎 Checking for character name in details page...');
    await waitFor(() => {
      expect(screen.getByText('Goku')).toBeInTheDocument();
    });
  });
});
