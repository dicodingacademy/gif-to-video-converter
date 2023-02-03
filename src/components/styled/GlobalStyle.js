import { createGlobalStyle } from 'styled-components';
import { colors } from './utils';

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${colors.background};
    color: ${colors.color};
  }
`;

export default GlobalStyle;
