import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Spinner = styled.div`
  width: 150px;
  height: 150px;
  border: 15px solid rgba(0, 0, 0, 0.1);
  border-top: 15px solid black;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const Loader: React.FC = () => (
  <LoaderWrapper>
    <Spinner aria-label="Loading..." />
  </LoaderWrapper>
);
