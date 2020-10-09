import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import GlobalStyle from '../styles/GlobalStyle';
import Menu from './organisms/Menu/Menu';
import SEO from './SEO';

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  position: relative;
`;

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <SEO />
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Menu />
          {children}
        </Wrapper>
      </ThemeProvider>
    </>
  );
};

export default Layout;
