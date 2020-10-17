interface Breakpoints {
  [mobile: string]: number;
  tabletS: number;
  tablet: number;
  standard: number;
  hdReady: number;
  quadHd: number;
  fullHd: number;
}

export const breakpoints: Breakpoints = {
  mobile: 340,
  tabletS: 512,
  tablet: 710,
  standard: 1024,
  hdReady: 1280,
  quadHd: 1440,
  fullHd: 1920
};

export const theme = {
  mq: Object.keys(breakpoints).reduce((acc, breakpoint) => {
    acc[breakpoint] = `@media all and (min-width: ${breakpoints[breakpoint]}px)`;

    return acc;
  }, {} as { [key: string]: string }),
  font: {
    family: {
      avantGarde: 'Avant Garde, sans-serif'
    },
    weight: {
      bold: 700,
      demi: 600,
      medium: 500,
      book: 400,
      light: 300
    }
  },
  colors: {
    green: '#54C172',
    darkGreen: '#4C522A',
    lightGray: '#BCBCBC',
    dark: '#212121',
    inputColorStandard: '#1d1d1d',
    textGray: '#c8c8c9',
    backgroundHover: '#F3F3F5',
    emptyText: '#d6d6d6',
    impactGray: '#ebebf3',
    gray: '#d9d9d9',
    menuBackground: '#F8F8FA',
    buttonColor: 'rgba(0,0,0,0.8)',
    white: '#fff',
    black: '#000',
    landingGray: '#5A5A5A'
  }
};
