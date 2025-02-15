import React from 'react';
import styled from 'styled-components';

interface CharacterCardProps {
  name: string;
  image: string;
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  width: 150px;
  background-color: white;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
`;

const CharacterImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const CharacterName = styled.h3`
  margin-top: 10px;
  font-size: 16px;
  text-align: center;
`;

export const CharacterCard: React.FC<CharacterCardProps> = ({
  name,
  image,
}) => {
  return (
    <Card data-testid="character-card">
      <CharacterImage src={image} alt={name} />
      <CharacterName>{name}</CharacterName>
    </Card>
  );
};
