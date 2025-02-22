import React from 'react';
import styled from 'styled-components';
import { CharacterResume } from './CharacterResume/CharacterResume';
import { CharacterTransformation } from './CharacterTransformations/CharacterTransformations';
import { Character } from '../../interfaces';

interface CharacterDetailsProps {
  character: Character | null;
}

const DetailsContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 100%;
`;

const NoTransformationsMessage = styled.p`
  color: #999;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 18px;
  font-weight: 600;
  margin-top: 200px;
  text-align: center;
`;

export const CharacterDetails: React.FC<CharacterDetailsProps> = ({ character }) => (
  <DetailsContainer className="DetailsContainer">
    {character ? (
      <>
        <CharacterResume character={character} />
        {character.transformations && character.transformations.length > 0 ? (
          <CharacterTransformation transformations={character.transformations} />
        ) : (
          <NoTransformationsMessage>No transformations available</NoTransformationsMessage>
        )}
      </>
    ) : (
      <p>Character not found</p>
    )}
  </DetailsContainer>
);
