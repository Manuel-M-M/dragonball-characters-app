import '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import { useCharacterDetailsStore } from './CharacterDetailsStore';
import { CharactersService } from '../../application/CharactersService';

jest.mock('../../application/CharactersService', () => ({
  CharactersService: jest.fn().mockReturnValue({
    getCharacterById: jest.fn(),
  }),
}));

describe('CharacterDetailStore', () => {
  beforeEach(() => {
    useCharacterDetailsStore.setState({
      character: null,
      loading: false,
      error: '',
    });

    jest.clearAllMocks();
  });

  const store = useCharacterDetailsStore.getState();

  it('should fetch a character by ID and update the state', async () => {
    const mockCharacter = {
      id: 1,
      name: 'Goku',
      image: '/images/characters/goku.webp',
      description: 'A Saiyan warrior',
    };

    (CharactersService as jest.Mock).mockImplementation(() => ({
      getCharacterById: jest.fn().mockResolvedValue(mockCharacter),
    }));

    await act(async () => {
      await store.fetchCharacterById(1);
    });

    expect(useCharacterDetailsStore.getState().character).toEqual(
      mockCharacter,
    );
    expect(useCharacterDetailsStore.getState().loading).toBe(false);
    expect(useCharacterDetailsStore.getState().error).toBe('');
  });

  it('should handle fetch failure and set an error', async () => {
    (CharactersService as jest.Mock).mockImplementation(() => ({
      getCharacterById: jest.fn().mockRejectedValue(new Error('Network error')),
    }));

    await act(async () => {
      await store.fetchCharacterById(1);
    });

    expect(useCharacterDetailsStore.getState().character).toBeNull();
    expect(useCharacterDetailsStore.getState().loading).toBe(false);
    expect(useCharacterDetailsStore.getState().error).toBe('Failed to fetch');
  });

  it('should set loading to true while fetching', async () => {
    act(() => {
      store.fetchCharacterById(1);
    });

    expect(useCharacterDetailsStore.getState().loading).toBe(true);
  });
});
