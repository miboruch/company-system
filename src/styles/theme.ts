interface Breakpoints {
  [mobile: string]: number;
  tabletS: number;
  tablet: number;
  standard: number;
  desktop: number;
}

export const breakpoints: Breakpoints = {
  mobile: 340,
  tabletS: 512,
  tablet: 710,
  standard: 1024,
  desktop: 1440
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
    background: '#f6f6f1',
    infoButton: 'rgba(0,0,0,0.8)',
    // infoButton: '#aeaeae',
    green: '#429f33',
    darkGreen: '#3e6406',
    red: '#9f3333',
    footerLinks: '#b6b6b6',
    landingBackground: '#0E0E0E',
    landingGray: '#5A5A5A',
    white: '#f5f5f5',
    qrBackground: '#50D889',
    blue: '#1573E3'
  }
};
