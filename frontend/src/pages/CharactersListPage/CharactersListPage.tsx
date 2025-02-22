import { useEffect } from 'react';
import { useCharacterListStore } from '../../store/CharactersListStore/CharactersListStore';
import { CharacterList } from '../../components/CharacterList/CharacterList';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { Loader } from '../../components/Loader/Loader';
import styled from 'styled-components';

const CharactersListContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 0 auto;
  max-width: 1416px;
  padding: 84px 0;
  width: 100%;
`;

const ErrorMessage = styled.p`
  color: #999;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 18px;
  font-weight: 600;
  margin-top: 200px;
  text-align: center;
`;

export const CharactersListPage = () => {
  const { filteredCharacters, loading, error, fetchCharacters } = useCharacterListStore();

  useEffect(() => {
    fetchCharacters();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <CharactersListContainer>
      <SearchBar resultsCount={filteredCharacters.length} />
      <CharacterList characters={filteredCharacters} />
    </CharactersListContainer>
  );
};
