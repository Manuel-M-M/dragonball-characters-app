import { create } from 'zustand';
import { CharactersService } from '../../application/CharactersService';
import { CharactersRepository } from '../../infrastructure/CharactersRepository';
import { Character } from '../../interfaces';

interface CharacterListState {
  characters: Character[];
  filteredCharacters: Character[];
  loading: boolean;
  error: string;
  fetchCharacters: () => Promise<void>;
  searchCharacters: (query: string) => void;
}

export const useCharacterListStore = create<CharacterListState>((set, get) => ({
  characters: [],
  filteredCharacters: [],
  loading: false,
  error: '',

  fetchCharacters: async () => {
    set({ loading: true, error: '' });

    try {
      const service = new CharactersService(new CharactersRepository());
      const response = await service.getCharacters();
      const allCharacters = response.items || [];

      set({
        characters: allCharacters,
        filteredCharacters: allCharacters,
        loading: false,
      });
    } catch (error) {
      set({ error: 'Failed to fetch characters', loading: false });
    }
  },

  searchCharacters: (query: string) => {
    const { characters } = get();

    if (!query.trim()) {
      set({ filteredCharacters: characters });
      return;
    }

    const lowerQuery = query.toLowerCase();

    let filtered = characters.filter((char) =>
      char.name.toLowerCase().startsWith(lowerQuery),
    );

    if (filtered.length === 0) {
      filtered = characters.filter((char) =>
        char.name.toLowerCase().includes(lowerQuery),
      );
    }

    set({ filteredCharacters: filtered });
  },
}));
