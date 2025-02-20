import styled from 'styled-components';
import { CharacterHeartIcon } from '../CharacterHeartIcon/CharacterHeartIcon';
import { Link } from 'react-router-dom';

interface CharacterCardProps {
  id: number;
  name: string;
  image: string;
}

const Card = styled.div`
  width: 188.57px;
  min-width: 172.5px;
  height: 245.97px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: black;
  padding: 10px;
  position: relative;
  clip-path: polygon(0 0, 100% 0, 100% 96%, 92% 100%, 0 100%);
`;

const ImageLink = styled(Link)`
  width: 188.57px;
  height: 189.97px;
  display: block;
  cursor: pointer;
`;

const Image = styled.img`
  width: 188.57px;
  height: 189.97px;
  border-bottom: 4px solid red;
`;

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

const Name = styled.p`
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 14px;
  color: white;
  margin: 0;
`;

export const CharacterCard: React.FC<CharacterCardProps> = ({
  id,
  name,
  image,
}) => {
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
