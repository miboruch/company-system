import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';

import Input from './Input';

import { theme } from 'styles/theme';

describe('input component', () => {
  const label = 'Test';
  it('renders properly', () => {
    const { getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <Input onChange={() => {}} name={'test'} required={true} type={'text'} labelText={label} />
      </ThemeProvider>
    );

    expect(getByLabelText(label)).toBeInTheDocument();
  });
  it('renders show password icon when prop is passed', () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Input onChange={handleChange} name={'test'} required={true} type={'password'} isPassword={true} labelText={'Password'} />
      </ThemeProvider>
    );

    expect(getByTestId('password-icon')).toBeInTheDocument();
  });
});
