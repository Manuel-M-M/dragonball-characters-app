import React from 'react';
import styled from 'styled-components';
import { CharacterHeartIcon } from '../../CharacterHeartIcon/CharacterHeartIcon';
import { Character } from '../../../interfaces';

// interface Character {
//   id: number;
//   name: string;
//   image: string;
//   description: string;
// }

interface CharacterResumeProps {
  character: Character;
}

// const ResumeContainer = styled.section`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: #000;
//   color: #fff;
//   padding: 83.94px 48px;
//   max-width: 1512px;
//   margin: 0 auto;
//   position: relative;
// `;

const ResumeContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #000;
  color: #fff;
  margin: 0 auto;
  position: relative;
  clip-path: polygon(0 0, 100% 0, 100% 90%, 98% 100%, 0 100%);
`;

const ResumeContent = styled.div`
  display: flex;
  align-items: center;
  width: 960px;
  height: 320px;
  position: relative;
`;

const CharacterImage = styled.img`
  width: 320px;
  height: 320px;
  object-fit: contain;
`;

const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 320px;
  justify-content: center;
  gap: 24px;
  padding: 48px 0 48px 48px;
  color: white;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const CharacterName = styled.h2`
  widht: 272px;
  height: 47px;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 40px;
  font-weight: 700;
  line-height: 46.88px;
  letter-spacing: 0;
  color: #fff;
  margin: 0;
`;

// const StyledHeartIcon = styled(CharacterHeartIcon)`
//   width: 32px !important;
//   height: 32px !important;
//   fill: red !important; /* Ejemplo de color */
// `;

const HeartIconWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100% !important;
    height: 100% !important;
  }
`;

const CharacterDescription = styled.p`
  width: 529px;
  height: 57px;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 18.75px;
  color: #fff;
  margin: 0;
  letter-spacing: 0;
  overflow: hidden; /* ✅ Oculta el texto que sobrepasa */
`;

export const CharacterResume: React.FC<CharacterResumeProps> = ({
  character,
}) => {
  return (
    <ResumeContainer className="ResumeContainer">
      <ResumeContent className="ResumeContent">
        <CharacterImage
          src={character.image}
          alt={character.name}
          className="CharacterImage"
        />
        <InfoContainer className="InfoContainer">
          <TitleRow className="TitleRow">
            <CharacterName className="CharacterName">
              {character.name}
            </CharacterName>
            <HeartIconWrapper>
              <CharacterHeartIcon characterId={character.id} />
            </HeartIconWrapper>
          </TitleRow>
          <CharacterDescription className="CharacterDescription">
            {character.description}
          </CharacterDescription>
        </InfoContainer>
      </ResumeContent>
    </ResumeContainer>
  );
};
