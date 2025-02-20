import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CharacterList } from './CharacterList';
import { MemoryRouter } from 'react-router-dom';

describe('CharacterList', () => {
  const mockCharacters = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Character ${i + 1}`,
    image: `https://dragonball-api.com/characters/character${i + 1}.png`,
  }));

  test('renders a list of 50 character cards', () => {
    render(
      <MemoryRouter>
        <CharacterList characters={mockCharacters} />
      </MemoryRouter>,
    );

    expect(screen.getAllByRole('img')).toHaveLength(50);
    expect(screen.getAllByText(/Character \d+/)).toHaveLength(50);
  });

  test('renders a message when the list is empty', () => {
    render(
      <MemoryRouter>
        <CharacterList characters={[]} />
      </MemoryRouter>,
    );

    expect(screen.getByText('No characters available')).toBeInTheDocument();
  });
});
