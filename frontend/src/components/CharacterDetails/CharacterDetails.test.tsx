import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CharacterDetails } from './CharacterDetails';
import { MemoryRouter } from 'react-router-dom';

describe('CharacterDetails Component', () => {
  const mockCharacter = {
    id: 1,
    name: 'Goku',
    image: '/images/characters/goku.webp',
    description: 'A powerful Saiyan warrior.',
    transformations: [],
  };

  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <CharacterDetails character={mockCharacter} />
      </MemoryRouter>
    );
    expect(screen.getByText('Goku')).toBeInTheDocument();
    expect(screen.getByText('A powerful Saiyan warrior.')).toBeInTheDocument();
    expect(screen.getByAltText('Goku')).toBeInTheDocument();
  });

  it('should display a message if no character is provided', () => {
    render(
      <MemoryRouter>
        <CharacterDetails character={null} />
      </MemoryRouter>
    );
    expect(screen.getByText('Character not found')).toBeInTheDocument();
  });
});
