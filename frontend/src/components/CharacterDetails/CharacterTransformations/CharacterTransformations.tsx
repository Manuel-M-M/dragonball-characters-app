import React from 'react';
import styled from 'styled-components';
import { Transformation } from '../../../interfaces';

interface CharacterTransformationProps {
  transformations: Transformation[];
}

const TransformationContainer = styled.section`
  height: 526.8px;
  width: 960px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  margin: 0 auto;
  padding: 32px 0;
`;

const Title = styled.h2`
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 16px;
`;

const TransformationList = styled.div`
  display: flex;
  justify-content: center;
  overflow-x: scroll;
  overscroll-behavior-x: contain;
  scroll-snap-type: x proximity;
  gap: 16px;
  padding-bottom: 10px;
  flex-wrap: nowrap; /* ✅ Evita que los elementos se envuelvan */
  min-width: 960px;

  /* ✅ Scrollbar Estilizado */
  &::-webkit-scrollbar {
    height: 6px;
    background: #d9d9d9; /* Barra gris */
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ec1d24; /* Scroll deslizante en rojo */
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #8b0000; /* Oscurece un poco cuando se pasa el mouse */
  }

  &::-webkit-scrollbar-track {
    background: ##d9d9d9; /* Color gris de fondo */
    border-radius: 3px;
  }
`;

const TransformationCard = styled.div`
  flex: 0 0 auto;
  width: 150px;
  text-align: center;
  position: relative;
  scroll-snap-align: center;
`;

const TransformationImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

const TransformationName = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin: 8px 0 4px;
`;

const KiText = styled.p`
  font-size: 14px;
  color: gray;
`;

export const CharacterTransformation: React.FC<CharacterTransformationProps> = ({
  transformations,
}) => {
  const sortedTransformations = [...transformations].sort(
    (a, b) => parseFloat(b.ki.replace(/\D/g, '')) - parseFloat(a.ki.replace(/\D/g, ''))
  );

  return (
    <TransformationContainer className="TransformationContainer">
      <Title className="Title">Transformations</Title>
      <TransformationList className="TransformationList">
        {sortedTransformations.map((transformation) => (
          <TransformationCard key={transformation.id} className="TransformationCard">
            <TransformationImage
              src={transformation.image}
              alt={transformation.name}
              className="TransformationImage"
            />
            <TransformationName className="TransformationName">
              {transformation.name}
            </TransformationName>
            <KiText className="KiText">KI: {transformation.ki}</KiText>
          </TransformationCard>
        ))}
      </TransformationList>
    </TransformationContainer>
  );
};
