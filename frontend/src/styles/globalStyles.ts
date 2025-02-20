import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    overflow-x: hidden;
    background-color: #FFFFFF;
  }

  #root {
    display: flex;
    flex-direction: column;
  }
`;
