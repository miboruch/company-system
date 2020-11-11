import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
  }
  
  *::-webkit-scrollbar {
    -webkit-appearance: none !important;
    width: 0;
  }

  *::-webkit-scrollbar-thumb {
    -webkit-appearance: none !important;
    
  }
  
  html {
    font-size: 62.5%;
  }
  
  body {
    margin: 0;
    font-weight: 400;
    font-size: 1.6rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: "Avant Garde", sans-serif;
  }
  
  a{
    text-decoration: none;
  }
`;

export default GlobalStyle;
