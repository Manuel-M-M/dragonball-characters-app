import { useEffect } from 'react';
import { useFavoritesStore } from '../../store/FavoritesStore/favoritesStore';
import { CharacterList } from '../../components/CharacterList/CharacterList';
import { Loader } from '../../components/Loader/Loader';
import { styled } from 'styled-components';
import { SearchBar } from '../../components/SearchBar/SearchBar';

const FavoritesListPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 0 auto;
  max-width: 1416px;
  padding: 84px 0;
  padding-top: 48px;
  width: 100%;
`;

const Title = styled.h2`
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
  padding-left: 48px;
  text-transform: uppercase;
`;

const NoFavoritesAndErrorMessage = styled.p`
  color: #999;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 18px;
  font-weight: 600;
  margin-top: 200px;
  text-align: center;
`;

export const FavoritesListPage = () => {
  const { favoriteCharacters, loading, error, fetchFavorites } = useFavoritesStore();

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) return <Loader />;
  if (error) return <NoFavoritesAndErrorMessage>{error}</NoFavoritesAndErrorMessage>;

  return (
    <FavoritesListPageContainer>
      <Title>FAVORITES</Title>
      <SearchBar resultsCount={favoriteCharacters.length} />
      {favoriteCharacters.length > 0 ? (
        <CharacterList characters={favoriteCharacters} />
      ) : (
        <NoFavoritesAndErrorMessage>No favorite characters selected.</NoFavoritesAndErrorMessage>
      )}
    </FavoritesListPageContainer>
  );
};
