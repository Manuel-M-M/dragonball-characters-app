import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';
import { useCharacterListStore } from '../../store/CharactersListStore/CharactersListStore';

describe('SearchBar Component', () => {
  beforeEach(() => {
    useCharacterListStore.setState({
      characters: [
        {
          id: 1,
          name: 'Goku',
          image: '/images/characters/goku.webp',
          description: 'asdfas',
          transformations: [],
        },
        {
          id: 2,
          name: 'Vegeta',
          image: '/images/characters/vegeta.webp',
          description: 'efdsaf',
          transformations: [],
        },
        {
          id: 3,
          name: 'Gohan',
          image: '/images/characters/gohan.webp',
          description: 'cbfgfg',
          transformations: [],
        },
      ],
      filteredCharacters: [],
    });
  });

  it('should render the input field', () => {
    render(<SearchBar resultsCount={0} />);
    const input = screen.getByPlaceholderText(/search a character/i);
    expect(input).toBeInTheDocument();
  });

  it('should filter characters based on input', () => {
    render(<SearchBar resultsCount={0} />);
    const input = screen.getByPlaceholderText(/search a character/i);

    fireEvent.change(input, { target: { value: 'Go' } });

    expect(useCharacterListStore.getState().filteredCharacters).toEqual([
      {
        id: 1,
        name: 'Goku',
        image: '/images/characters/goku.webp',
        description: 'asdfas',
        transformations: [],
      },
      {
        id: 3,
        name: 'Gohan',
        image: '/images/characters/gohan.webp',
        description: 'cbfgfg',
        transformations: [],
      },
    ]);
  });

  it('should return all characters when input is cleared', () => {
    render(<SearchBar resultsCount={0} />);
    const input = screen.getByPlaceholderText(/search a character/i);

    fireEvent.change(input, { target: { value: 'Go' } });
    fireEvent.change(input, { target: { value: '' } });

    expect(useCharacterListStore.getState().filteredCharacters).toEqual([
      {
        id: 1,
        name: 'Goku',
        image: '/images/characters/goku.webp',
        description: 'asdfas',
        transformations: [],
      },
      {
        id: 2,
        name: 'Vegeta',
        image: '/images/characters/vegeta.webp',
        description: 'efdsaf',
        transformations: [],
      },
      {
        id: 3,
        name: 'Gohan',
        image: '/images/characters/gohan.webp',
        description: 'cbfgfg',
        transformations: [],
      },
    ]);
  });

  it('should not return any character if no match is found', () => {
    render(<SearchBar resultsCount={0} />);
    const input = screen.getByPlaceholderText(/search a character/i);

    fireEvent.change(input, { target: { value: 'Frieza' } });

    expect(useCharacterListStore.getState().filteredCharacters).toEqual([]);
  });
});
