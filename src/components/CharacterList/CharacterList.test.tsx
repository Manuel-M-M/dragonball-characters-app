import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CharacterList } from './CharacterList';

describe('CharacterList', () => {
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

  test('renders a list of character cards', () => {
    render(<CharacterList characters={mockCharacters} />);

    expect(screen.getByText('Goku')).toBeInTheDocument();
    expect(screen.getByText('Vegeta')).toBeInTheDocument();
  });

  test('renders a message when the list is empty', () => {
    render(<CharacterList characters={[]} />);

    expect(screen.getByText('No characters available')).toBeInTheDocument();
  });
});
