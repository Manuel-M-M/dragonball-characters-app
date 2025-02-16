import styled from 'styled-components';
import { CharacterHeartIcon } from '../CharacterHeartIcon/CharacterHeartIcon';

const Card = styled.div`
  width: 188.57px;
  min-width: 172.5px;
  height: 245.97px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: black;
  border-radius: 0 0 20px 0;
  padding: 10px;
  position: relative;
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
  border-radius: 0 0 20px 0;
`;

const Name = styled.p`
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 14px;
  color: white;
  margin: 0;
`;
interface CharacterCardProps {
  name: string;
  image: string;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  name,
  image,
}) => {
  return (
    <Card>
      <Image src={image} alt={name} />
      <InfoContainer>
        <Name>{name}</Name>
        <CharacterHeartIcon />
      </InfoContainer>
    </Card>
  );
};
