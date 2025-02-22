import React from 'react';
import styled, { css } from 'styled-components';
import { Transformation } from '../../../interfaces';
import { sortTransformationsByKi } from '../../../utils/kiTransformationsSorter';

interface CharacterTransformationProps {
  transformations: Transformation[];
}

const TransformationContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 526.8px;
  justify-content: center;
  margin: 0 auto;
  padding: 32px 0;
  width: 960px;

  ${({ theme }) => css`
    @media (max-width: ${theme.breakpoints.md}) {
      align-items: center;
      width: 100%;
    }
  `}
`;

const Title = styled.h2`
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
  text-transform: uppercase;

  ${({ theme }) => css`
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: 18px;
    }
  `}
`;

const TransformationList = styled.div`
  display: flex;
  flex-wrap: nowrap; /* ✅ Evita que los elementos se envuelvan */
  gap: 16px;
  min-width: 960px;
  overflow-x: scroll;
  overscroll-behavior-x: contain;
  padding-bottom: 0 20px 10px 20px;
  scroll-snap-type: x proximity;

  &::-webkit-scrollbar {
    background: #d9d9d9;
    border-radius: 3px;
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ec1d24;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #8b0000;
  }

  &::-webkit-scrollbar-track {
    background: ##d9d9d9;
    border-radius: 3px;
  }

  ${({ theme }) => css`
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: 14px;
      min-width: 350px;
      text-align: center;
      width: 500px;
  `}

  ${({ theme }) => css`
    @media (max-width: ${theme.breakpoints.sm}) {
      font-size: 14px;
      min-width: 200px;
      width: 350px;
  `}
`;

const TransformationCard = styled.div`
  flex: 0 0 auto;
  position: relative;
  scroll-snap-align: center;
  text-align: center;
  width: 150px;
`;

const TransformationImage = styled.img`
  border-radius: 8px;
  height: 200px;
  object-fit: cover;
  width: 100%;
`;

const TransformationName = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin: 8px 0 4px;
`;

const KiText = styled.p`
  color: gray;
  font-size: 14px;
`;

export const CharacterTransformation: React.FC<CharacterTransformationProps> = ({
  transformations,
}) => {
  const sortedTransformations = sortTransformationsByKi(transformations);

  return (
    <TransformationContainer>
      <Title>Transformations</Title>
      <TransformationList>
        {sortedTransformations.map((transformation) => (
          <TransformationCard key={transformation.id}>
            <TransformationImage src={transformation.image} alt={transformation.name} />
            <TransformationName>{transformation.name}</TransformationName>
            <KiText>KI: {transformation.ki}</KiText>
          </TransformationCard>
        ))}
      </TransformationList>
    </TransformationContainer>
  );
};
