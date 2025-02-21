import React from 'react';
import styled, { css } from 'styled-components';
import { CharacterHeartIcon } from '../../CharacterHeartIcon/CharacterHeartIcon';
import { Character } from '../../../interfaces';

interface CharacterResumeProps {
  character: Character;
}

const ResumeContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #000;
  color: #fff;
  margin: 0 auto;
  position: relative;
  clip-path: polygon(0 0, 100% 0, 100% 90%, 98% 100%, 0 100%);
  height: 607.89px;

  ${({ theme }) => css`
    @media (max-width: ${theme.breakpoints.md}) {
      flex-direction: column;
      align-items: center;
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
      height: auto;
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
      height: auto;
      max-height: 400px;
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
    }
  `}
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  ${({ theme }) => css`
    @media (max-width: ${theme.breakpoints.md}) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  `}
`;

const CharacterName = styled.h2`
  width: 272px;
  height: 47px;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 40px;
  font-weight: 700;
  line-height: 46.88px;
  letter-spacing: 0;
  color: #fff;
  margin: 0;

  ${({ theme }) => css`
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: 32px;
      width: auto;
      text-align: left;
    }
  `}
`;

const HeartIconWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
`;

const CharacterDescription = styled.p`
  width: 529px;
  height: auto;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 18.75px;
  color: #fff;
  margin: 0;
  letter-spacing: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;

  ${({ theme }) => css`
    @media (max-width: ${theme.breakpoints.md}) {
      width: 100%;
      font-size: 16px;
      text-align: left;
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
