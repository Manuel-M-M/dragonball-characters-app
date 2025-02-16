import { CharacterCard } from '../CharacterCard/CharacterCard';
import styled from 'styled-components';

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
interface CharacterListProps {
  characters: { id: number; name: string; image: string }[];
}

export const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
  if (!characters.length) {
    return <NoCharacters>No characters available</NoCharacters>;
  }

  return (
    <CharactersListWrapper>
      {characters.map((char) => (
        <CharacterCard key={char.id} name={char.name} image={char.image} />
      ))}
    </CharactersListWrapper>
  );
};
