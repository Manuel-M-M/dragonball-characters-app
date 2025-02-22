import { CharacterCard } from '../CharacterCard/CharacterCard';
import styled from 'styled-components';

interface CharacterListProps {
  characters: { id: number; name: string; image: string }[];
}

const CharactersListWrapper = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(188px, 1fr));
  margin: 0 auto;
  max-width: 1512px;
  padding: 0 48px;
  width: 100%;
`;

const NoCharacters = styled.p`
  color: gray;
  font-size: 18px;
  margin-top: 20px;
  text-align: center;
`;

export const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
  if (!characters.length) {
    return <NoCharacters>No characters available</NoCharacters>;
  }

  return (
    <CharactersListWrapper>
      {characters.map((char) =>
        char?.id && char?.name && char?.image ? (
          <CharacterCard key={char.id} id={char.id} name={char.name} image={char.image} />
        ) : null
      )}
    </CharactersListWrapper>
  );
};
