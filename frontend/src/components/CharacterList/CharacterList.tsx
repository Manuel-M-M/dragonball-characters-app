import { CharacterCard } from '../CharacterCard/CharacterCard';
import styled from 'styled-components';

interface CharacterListProps {
  characters: { id: number; name: string; image: string }[];
}

const CharactersListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(188px, 1fr));
  gap: 16px;
  padding: 0 48px;
  width: 100%;
  max-width: 1512px;
  margin: 0 auto;
`;

const NoCharacters = styled.p`
  text-align: center;
  font-size: 18px;
  color: gray;
  margin-top: 20px;
`;

export const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
  if (!characters.length) {
    return <NoCharacters>No characters available</NoCharacters>;
  }

  return (
    <CharactersListWrapper className="CharactersListWrapper">
      {characters.map((char) =>
        char?.id && char?.name && char?.image ? (
          <CharacterCard
            key={char.id}
            id={char.id}
            name={char.name}
            image={char.image}
          />
        ) : null,
      )}
    </CharactersListWrapper>
  );
};
