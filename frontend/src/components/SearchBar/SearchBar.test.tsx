import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';
import { useCharacterListStore } from '../../store/CharactersListStore/CharactersListStore';

describe('SearchBar Component', () => {
  beforeEach(() => {
    useCharacterListStore.setState({
      characters: [
        { id: 1, name: 'Goku', image: '/images/characters/goku.webp' },
        { id: 2, name: 'Vegeta', image: '/images/characters/vegeta.webp' },
        { id: 3, name: 'Gohan', image: '/images/characters/gohan.webp' },
      ],
      filteredCharacters: [],
    });
  });

  it('should render the input field', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(/search a character/i);
    expect(input).toBeInTheDocument();
  });

  it('should filter characters based on input', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(/search a character/i);

    fireEvent.change(input, { target: { value: 'Go' } });

    expect(useCharacterListStore.getState().filteredCharacters).toEqual([
      { id: 1, name: 'Goku', image: '/images/characters/goku.webp' },
      { id: 3, name: 'Gohan', image: '/images/characters/gohan.webp' },
    ]);
  });

  it('should return all characters when input is cleared', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(/search a character/i);

    fireEvent.change(input, { target: { value: 'Go' } });
    fireEvent.change(input, { target: { value: '' } });

    expect(useCharacterListStore.getState().filteredCharacters).toEqual([
      { id: 1, name: 'Goku', image: '/images/characters/goku.webp' },
      { id: 2, name: 'Vegeta', image: '/images/characters/vegeta.webp' },
      { id: 3, name: 'Gohan', image: '/images/characters/gohan.webp' },
    ]);
  });

  it('should not return any character if no match is found', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(/search a character/i);

    fireEvent.change(input, { target: { value: 'Frieza' } });

    expect(useCharacterListStore.getState().filteredCharacters).toEqual([]);
  });
});
