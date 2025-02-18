import { create } from 'zustand';
import { CharactersService } from '../../application/CharactersService';
import { CharactersRepository } from '../../infrastructure/CharactersRepository';

interface Character {
  id: number;
  name: string;
  image: string;
  description: string;
}

interface CharacterDetailsState {
  character: Character | null;
  loading: boolean;
  error: string;
  fetchCharacterById: (id: number) => Promise<void>;
}

export const useCharacterDetailsStore = create<CharacterDetailsState>(
  (set) => ({
    character: null,
    loading: false,
    error: '',

    fetchCharacterById: async (id: number) => {
      set({ loading: true, error: '' });

      try {
        const service = new CharactersService(new CharactersRepository());
        const character = await service.getCharacterById(id);

        set({ character, loading: false });
      } catch (error) {
        set({ character: null, loading: false, error: 'Failed to fetch' });
      }
    },
  }),
);
