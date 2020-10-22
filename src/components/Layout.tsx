import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import GlobalStyle from '../styles/GlobalStyle';
import SEO from './SEO';
import MenuContextProvider from '../providers/MenuContext/MenuContext';

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  position: relative;
  display: flex;
  flex-direction: row;
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
        <MenuContextProvider>
          <Wrapper>{children}</Wrapper>
        </MenuContextProvider>
      </ThemeProvider>
    </>
  );
};

export default Layout;
