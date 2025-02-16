import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CharacterCard } from './CharacterCard';

describe('CharacterCard', () => {
  const mockCharacter = {
    id: 1,
    name: 'Goku',
    image: 'https://dragonball-api.com/characters/goku.png',
  };

  test('renders character name and image', () => {
    render(
      <CharacterCard name={mockCharacter.name} image={mockCharacter.image} />,
    );

    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', mockCharacter.image);
    expect(img).toHaveAttribute('alt', mockCharacter.name);
  });

  test('renders a favorite icon', () => {
    render(
      <CharacterCard name={mockCharacter.name} image={mockCharacter.image} />,
    );

    expect(screen.getByTestId('favorite-icon')).toBeInTheDocument();
  });
});
