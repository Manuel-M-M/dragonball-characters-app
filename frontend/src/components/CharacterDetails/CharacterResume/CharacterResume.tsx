import React from 'react';
import styled, { css } from 'styled-components';
import { CharacterHeartIcon } from '../../CharacterHeartIcon/CharacterHeartIcon';
import { Character } from '../../../interfaces';

interface CharacterResumeProps {
  character: Character;
}

const ResumeContainer = styled.section`
  background-color: #000;
  clip-path: polygon(0 0, 100% 0, 100% 92%, 98% 100%, 0 100%);
  color: #fff;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  position: relative;
  width: 100%;
  ${({ theme }) => css`
    @media (max-width: ${theme.breakpoints.md}) {
      align-items: center;
      clip-path: polygon(0 0, 100% 0, 100% 92%, 92% 100%, 0 100%);
      flex-direction: column;
    }
  `}
`;

const ResumeContent = styled.div`
  display: flex;
  align-items: center;
  width: 960px;
  height: 320px;
  position: relative;

  ${({ theme }) => css`
    @media (max-width: ${theme.breakpoints.md}) {
      flex-direction: column;
      width: 100%;
    }
  `}
`;

const CharacterImage = styled.img`
  width: 320px;
  height: 320px;
  object-fit: contain;

  ${({ theme }) => css`
    @media (max-width: ${theme.breakpoints.md}) {
      width: 100%;
      height: 160px;
    }
  `}
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

  ${({ theme }) => css`
    @media (max-width: ${theme.breakpoints.md}) {
      padding: 24px;
      text-align: center;
      height: auto;
      gap: 18px;
    }
  `}
`;

const TitleRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;

  ${({ theme }) => css`
    @media (max-width: ${theme.breakpoints.sm}) {
      gap: 80px
      justify-content: center;
  `}
`;

const CharacterName = styled.h2`
  color: #fff;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 40px;
  font-weight: 700;
  height: 47px;
  line-height: 46.88px;
  letter-spacing: 0;
  margin: 0;
  width: 272px;

  ${({ theme }) => css`
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: 32px;
      text-align: center;
      width: auto;
    }
  `}
`;

const HeartIconWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 32px;
  justify-content: center;
  width: 32px;

  svg {
    height: 100% !important;
    width: 100% !important;
  }
`;

const CharacterDescription = styled.p`
  color: #fff;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 16px;
  font-weight: 400;
  height: 57px;
  line-height: 18.75px;
  letter-spacing: 0;
  margin: 0;
  overflow: hidden;
  width: 529px;

  ${({ theme }) => css`
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: 14px;
      text-align: center;
      width: 100%;
    }
  `}
`;

export const CharacterResume: React.FC<CharacterResumeProps> = ({ character }) => {
  return (
    <ResumeContainer className="ResumeContainer">
      <ResumeContent className="ResumeContent">
        <CharacterImage src={character.image} alt={character.name} className="CharacterImage" />
        <InfoContainer className="InfoContainer">
          <TitleRow className="TitleRow">
            <CharacterName className="CharacterName">{character.name}</CharacterName>
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
