import { useEffect } from 'react';
import { useCharacterListStore } from '../../store/CharactersListStore/CharactersListStore';
import { CharacterList } from '../../components/CharacterList/CharacterList';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { Loader } from '../../components/Loader/Loader';
import styled from 'styled-components';

const CharactersListContainer = styled.section`
  width: 100%;
  max-width: 1416px;
  margin: 0 auto;
  padding: 16px 48px;
`;

export const CharactersListPage = () => {
  const { filteredCharacters, loading, error, fetchCharacters } =
    useCharacterListStore();

  useEffect(() => {
    fetchCharacters();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <CharactersListContainer>
      <SearchBar />
      <CharacterList characters={filteredCharacters} />
    </CharactersListContainer>
  );
};
