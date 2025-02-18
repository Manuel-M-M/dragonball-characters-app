import { create } from 'zustand';
import { CharactersService } from '../../application/CharactersService';
import { CharactersRepository } from '../../infrastructure/CharactersRepository';

interface Character {
  id: number;
  name: string;
  image: string;
}

interface CharacterListState {
  characters: Character[];
  loading: boolean;
  error: string;
  fetchCharacters: () => Promise<void>;
}

export const useCharacterListStore = create<CharacterListState>((set) => ({
  characters: [],
  loading: false,
  error: '',

  fetchCharacters: async () => {
    set({ loading: true, error: '' });

    try {
      const service = new CharactersService(new CharactersRepository());
      const response = await service.getCharacters();
      set({ characters: response.items, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch characters', loading: false });
    }
  },
}));
