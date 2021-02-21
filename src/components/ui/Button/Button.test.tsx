import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, screen, fireEvent } from '@testing-library/react';

import Button from './Button';

import { theme } from 'styles/theme';

describe('button', () => {
  const buttonText = 'Submit';
  it('renders properly', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Button type={'button'}>{buttonText}</Button>
      </ThemeProvider>
    );

    expect(getByText(buttonText)).toBeInTheDocument();
  });
  it('renders disabled button', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Button type={'button'} disabled={true}>
          {buttonText}
        </Button>
      </ThemeProvider>
    );

    expect(getByText(buttonText)).toBeDisabled();
  });
  it('calls onClick', () => {
    const handleClick = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <Button type={'button'} onClick={handleClick}>
          {buttonText}
        </Button>
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText(buttonText));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <Button type={'button'} onClick={handleClick} disabled={true}>
          {buttonText}
        </Button>
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText(buttonText));

    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
