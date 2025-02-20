import { useEffect } from 'react';
import { useCharacterListStore } from '../../store/CharactersListStore/CharactersListStore';
import { CharacterList } from '../../components/CharacterList/CharacterList';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { Loader } from '../../components/Loader/Loader';
import styled from 'styled-components';

const CharactersListContainer = styled.section`
  width: 100%;
  max-width: 1416px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 0 auto;
  padding: 84px 0;
`;

const ErrorMessage = styled.p`
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  color: #999;
  margin-top: 200px;
`;

export const CharactersListPage = () => {
  const { filteredCharacters, loading, error, fetchCharacters } =
    useCharacterListStore();

  useEffect(() => {
    fetchCharacters();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <CharactersListContainer className="CharactersListContainer">
      <SearchBar resultsCount={filteredCharacters.length} />
      <CharacterList characters={filteredCharacters} />
    </CharactersListContainer>
  );
};
