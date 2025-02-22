import styled from 'styled-components';
import { CharacterHeartIcon } from '../CharacterHeartIcon/CharacterHeartIcon';
import { Link } from 'react-router-dom';

interface CharacterCardProps {
  id: number;
  name: string;
  image: string;
}

const Card = styled.div`
  align-items: center;
  background: black;
  clip-path: polygon(0 0, 100% 0, 100% 96%, 92% 100%, 0 100%);
  display: flex;
  flex-direction: column;
  height: 245.97px;
  min-width: 172.5px;
  padding: 10px;
  position: relative;
  width: 188.57px;
`;

const ImageLink = styled(Link)`
  cursor: pointer;
  display: block;
  height: 189.97px;
  width: 188.57px;
`;

const Image = styled.img`
  border-bottom: 4px solid red;
  height: 189.97px;
  width: 188.57px;
`;

const InfoContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  width: 100%;
`;

const Name = styled.p`
  color: white;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 14px;
  margin: 0;
`;

export const CharacterCard: React.FC<CharacterCardProps> = ({ id, name, image }) => {
  return (
    <Card>
      <ImageLink to={`/character/${id}`}>
        <Image src={image} alt={name} />
      </ImageLink>
      <InfoContainer>
        <Name>{name}</Name>
        <CharacterHeartIcon characterId={id} />
      </InfoContainer>
    </Card>
  );
};
