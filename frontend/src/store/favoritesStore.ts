import { create } from 'zustand';
import { CharactersService } from '../application/CharactersService';
import { CharactersRepository } from '../infrastructure/CharactersRepository';

interface Character {
  id: number;
  name: string;
  image: string;
}

interface FavoritesState {
  favorites: number[];
  favoriteCharacters: Character[];
  loading: boolean;
  error: string;
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  fetchFavorites: () => Promise<void>;
  isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  favoriteCharacters: [],
  loading: false,
  error: '',

  addFavorite: (id: number) => {
    const { favoriteCharacters, favorites } = get();
    if (favorites.includes(id)) return;

    set({ favorites: [...favorites, id] });

    const charactersList = get().favoriteCharacters;
    const existingCharacter = charactersList.find((char) => char.id === id);

    if (existingCharacter) {
      set({
        favoriteCharacters: [...favoriteCharacters, existingCharacter],
      });
    } else {
      get().fetchFavorites();
    }
  },

  removeFavorite: (id: number) => {
    set((state) => ({
      favorites: state.favorites.filter((fav) => fav !== id),
      favoriteCharacters: state.favoriteCharacters.filter(
        (char) => char.id !== id,
      ),
    }));
  },

  fetchFavorites: async () => {
    set({ loading: true, error: '' });

    try {
      const { favorites } = get();
      if (favorites.length === 0) {
        set({ favoriteCharacters: [], loading: false });
        return;
      }

      console.log('Fetching all characters...');
      const service = new CharactersService(new CharactersRepository());
      const response = await service.getCharacters();
      const allCharacters = response.items || [];

      console.log('Filtering favorite characters:', favorites);
      const favoriteData = allCharacters.filter((char: { id: number }) =>
        favorites.includes(char.id),
      );

      set({ favoriteCharacters: favoriteData, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch favorite characters', loading: false });
    }
  },

  isFavorite: (id) => get().favorites.includes(id),
}));
