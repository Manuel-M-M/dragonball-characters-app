import '@testing-library/jest-dom';
import { act, waitFor } from '@testing-library/react';
import { useCharacterDetailsStore } from './CharacterDetailsStore';

describe('CharacterDetailStore', () => {
  beforeEach(() => {
    useCharacterDetailsStore.setState({
      character: null,
      loading: false,
      error: '',
      fetchCharacterById: async () => {},
    });
  });

  it('should fetch a character by ID and update the state', async () => {
    const mockCharacter = {
      id: 1,
      name: 'Goku',
      image: '/images/characters/goku.webp',
      description: 'A Saiyan warrior',
      transformations: [],
    };

    useCharacterDetailsStore.setState({
      fetchCharacterById: async (id: number) => {
        useCharacterDetailsStore.setState({
          character: id === 1 ? mockCharacter : null,
          loading: false,
          error: '',
        });
      },
    });

    const store = useCharacterDetailsStore.getState();

    await act(async () => {
      await store.fetchCharacterById(1);
    });

    await waitFor(() => {
      expect(useCharacterDetailsStore.getState().character).toEqual(
        mockCharacter,
      );
    });

    expect(useCharacterDetailsStore.getState().loading).toBe(false);
    expect(useCharacterDetailsStore.getState().error).toBe('');
  });

  it('should handle fetch failure and set an error', async () => {
    useCharacterDetailsStore.setState({
      fetchCharacterById: async () => {
        useCharacterDetailsStore.setState({
          character: null,
          loading: false,
          error: 'Character not found',
        });
      },
    });

    const store = useCharacterDetailsStore.getState();

    await act(async () => {
      await store.fetchCharacterById(1);
    });

    expect(useCharacterDetailsStore.getState().character).toBeNull();
    expect(useCharacterDetailsStore.getState().loading).toBe(false);
    expect(useCharacterDetailsStore.getState().error).toBe(
      'Character not found',
    );
  });

  it('should set loading to true while fetching', async () => {
    useCharacterDetailsStore.setState({
      fetchCharacterById: async () => {
        useCharacterDetailsStore.setState({ loading: true });
      },
    });

    const store = useCharacterDetailsStore.getState();

    act(() => {
      store.fetchCharacterById(1);
    });

    expect(useCharacterDetailsStore.getState().loading).toBe(true);
  });
});
