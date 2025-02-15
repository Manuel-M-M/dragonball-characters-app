import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CharacterCard } from './CharacterCard';

describe('CharacterCard', () => {
  test('renders character card with name and image', () => {
    const mockCharacter = {
      name: 'Goku',
      image: 'https://dragonball-api.com/characters/goku.png',
    };

    render(
      <CharacterCard name={mockCharacter.name} image={mockCharacter.image} />,
    );

    const cardElement = screen.getByTestId('character-card');
    expect(cardElement).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    expect(screen.getByAltText(mockCharacter.name)).toBeInTheDocument();
  });
});
