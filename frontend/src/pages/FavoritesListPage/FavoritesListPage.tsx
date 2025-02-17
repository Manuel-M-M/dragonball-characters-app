import { useEffect } from 'react';
import { useFavoritesStore } from '../../store/favoritesStore';
import { CharacterList } from '../../components/CharacterList/CharacterList';

export const FavoritesListPage = () => {
  const { favoriteCharacters, loading, error, fetchFavorites } =
    useFavoritesStore();

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {favoriteCharacters.length > 0 ? (
        <CharacterList characters={favoriteCharacters} />
      ) : (
        <p>No favorite characters selected.</p>
      )}
    </div>
  );
};
