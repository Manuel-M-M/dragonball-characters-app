import React from 'react';
import styled from 'styled-components';
import { CharacterResume } from './CharacterResume/CharacterResume';
import { CharacterTransformation } from './CharacterTransformations/CharacterTransformations';
import { Character } from '../../interfaces';

interface CharacterDetailsProps {
  character: Character | null;
}

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: auto;
`;

const NoTransformationsMessage = styled.p`
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  color: #999;
  margin-top: 200px;
`;

export const CharacterDetails: React.FC<CharacterDetailsProps> = ({
  character,
}) => (
  <DetailsContainer className="DetailsContainer">
    {character ? (
      <>
        <CharacterResume character={character} />
        {character.transformations && character.transformations.length > 0 ? (
          <CharacterTransformation
            transformations={character.transformations}
          />
        ) : (
          <NoTransformationsMessage>
            No transformations available
          </NoTransformationsMessage>
        )}
      </>
    ) : (
      <p>Character not found</p>
    )}
  </DetailsContainer>
);
