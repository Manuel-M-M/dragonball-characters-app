import { CharacterCard } from '../CharacterCard/CharacterCard';
import styled from 'styled-components';

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  padding: 20px;
`;

interface CharacterListProps {
  characters: { id: number; name: string; image: string }[];
}

export const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
  if (!characters.length) {
    return <p>No characters available</p>;
  }

  return (
    <ListContainer>
      {characters.map((char) => (
        <CharacterCard key={char.id} name={char.name} image={char.image} />
      ))}
    </ListContainer>
  );
};
