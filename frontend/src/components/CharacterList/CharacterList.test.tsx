import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CharacterList } from './CharacterList';

describe('CharacterList', () => {
  const mockCharacters = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Character ${i + 1}`,
    image: `https://dragonball-api.com/characters/character${i + 1}.png`,
  }));

  test('renders a list of 50 character cards', () => {
    render(<CharacterList characters={mockCharacters} />);

    expect(screen.getAllByRole('img')).toHaveLength(50);
    expect(screen.getAllByText(/Character \d+/)).toHaveLength(50);
  });

  test('renders a message when the list is empty', () => {
    render(<CharacterList characters={[]} />);

    expect(screen.getByText('No characters available')).toBeInTheDocument();
  });
});
