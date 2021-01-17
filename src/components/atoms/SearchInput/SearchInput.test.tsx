import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, screen, fireEvent } from '@testing-library/react';

import SearchInput from 'components/atoms/SearchInput/SearchInput';

import { theme } from 'styles/theme';

describe('search input', () => {
  it('should search input render when prop is passed', () => {
    const handleChange = jest.fn();

    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <SearchInput onChange={handleChange} />
      </ThemeProvider>
    );

    expect(getByTestId('search-input')).toBeInTheDocument();
  });

  it('calls onClick', () => {
    const handleChange = jest.fn();
    const {getByTestId } = render(
      <ThemeProvider theme={theme}>
        <SearchInput onChange={handleChange} />
      </ThemeProvider>
    );

    const input = getByTestId('search-input');

    fireEvent.change(input, {target: {value: 'test'}});

    expect(input).toBe('test');
  });
});
