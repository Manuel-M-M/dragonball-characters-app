import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCharacterDetailsStore } from '../../store/CharacterDetailsStore/CharacterDetailsStore';
import { Loader } from '../../components/Loader/Loader';
import styled from 'styled-components';
import { CharacterDetails } from '../../components/CharacterDetails/CharacterDetails';

const CharacterDetailsContainer = styled.section`
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const ErrorMessage = styled.p`
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  color: #999;
  margin-top: 200px;
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
