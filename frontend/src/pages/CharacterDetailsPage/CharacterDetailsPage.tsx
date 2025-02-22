import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCharacterDetailsStore } from '../../store/CharacterDetailsStore/CharacterDetailsStore';
import { Loader } from '../../components/Loader/Loader';
import styled from 'styled-components';
import { CharacterDetails } from '../../components/CharacterDetails/CharacterDetails';

const CharacterDetailsContainer = styled.section`
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  min-height: 100vh;
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

export const CharacterDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { character, loading, error, fetchCharacterById } = useCharacterDetailsStore();

  const stableFetchCharacterById = useCallback(() => {
    if (id && (!character || character.id !== Number(id))) {
      fetchCharacterById(Number(id));
    }
  }, [id, character, fetchCharacterById]);

  useEffect(() => {
    stableFetchCharacterById();
  }, [stableFetchCharacterById]);

  return (
    <CharacterDetailsContainer className="CharacterDetailsContainer">
      {loading && <Loader />}
      {error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <CharacterDetails character={character ?? null} />
      )}
    </CharacterDetailsContainer>
  );
};
