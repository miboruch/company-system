import styled from 'styled-components';

export enum ColorTheme {
  Light = 'light',
  Dark = 'dark'
}

interface ColorThemeInterface {
  colorTheme: ColorTheme;
}

const Wrapper = styled.div<ColorThemeInterface>`
  width: 100%;
  height: 86px;
  border-bottom: 1px solid ${({ colorTheme, theme }) => (colorTheme === ColorTheme.Light ? theme.colors.borderBottomDark : theme.colors.borderBottomLight)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2.5rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme, colorTheme }) => (colorTheme === ColorTheme.Light ? '#1d1d1d' : theme.colors.backgroundHover)};
  }
`;

const Name = styled.p<ColorThemeInterface>`
  font-size: 14px;
  color: ${({ theme, colorTheme }) => (colorTheme === ColorTheme.Light ? theme.colors.white : theme.colors.dark)};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin: 0.2rem 0;
`;

const Subparagraph = styled.p<ColorThemeInterface>`
  color: ${({ theme, colorTheme }) => (colorTheme === ColorTheme.Light ? theme.colors.textGray : theme.colors.textGray)};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  font-size: 11px;
  margin: 0;
`;

const ContentWrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export { Wrapper, ContentWrapper, Name, Subparagraph };
