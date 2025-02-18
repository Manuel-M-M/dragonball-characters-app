import { useEffect } from 'react';
import { useFavoritesStore } from '../../store/FavoritesStore/favoritesStore';
import { CharacterList } from '../../components/CharacterList/CharacterList';
import { Loader } from '../../components/Loader/Loader';

export const FavoritesListPage = () => {
  const { favoriteCharacters, loading, error, fetchFavorites } =
    useFavoritesStore();

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) return <Loader />;
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
