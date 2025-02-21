import { create } from 'zustand';
import { CharactersService } from '../../application/CharactersService';
import { CharactersRepository } from '../../infrastructure/CharactersRepository';
import { Character } from '../../interfaces';
import { CacheManager } from '../../utils/cache';

interface CharacterDetailsState {
  character: Character | null;
  loading: boolean;
  error: string;
  fetchCharacterById: (id: number) => Promise<void>;
}

const service = new CharactersService(new CharactersRepository());

export const useCharacterDetailsStore = create<CharacterDetailsState>((set) => ({
  character: null,
  loading: false,
  error: '',

  fetchCharacterById: async (id: number) => {
    set({ loading: true, error: '' });

    const cacheKey = `character-${id}`;
    const cachedCharacter = CacheManager.getCache<Character>(cacheKey);
    if (cachedCharacter) {
      set({ character: cachedCharacter, loading: false });
      return;
    }

    try {
      const response = await service.getCharacterById(id);
      if (response && typeof response === 'object' && !Array.isArray(response)) {
        set({ character: response, loading: false });
      } else {
        set({
          character: null,
          loading: false,
          error: 'Character not found',
        });
      }
    } catch {
      set({ character: null, loading: false, error: 'Failed to fetch' });
    }
  },
}));
