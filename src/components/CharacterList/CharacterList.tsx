import React from 'react';
import { CharacterCard } from '../CharacterCard/CharacterCard';
import styled from 'styled-components';

interface Character {
  id: number;
  name: string;
  image: string;
}

interface CharacterListProps {
  characters: Character[];
}

export const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
  return (
    <ListContainer>
      {characters.length > 0 ? (
        characters.map((character) => (
          <CharacterCard
            key={character.id}
            name={character.name}
            image={character.image}
          />
        ))
      ) : (
        <NoCharacters>No characters available</NoCharacters>
      )}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  padding: 20px;
`;

const NoCharacters = styled.p`
  font-size: 18px;
  text-align: center;
  color: #ccc;
`;
