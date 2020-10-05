import React from 'react';
import { InputWrapper, StyledLabel, StyledInput } from './Input.styles';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
  required: boolean;
  readonly labelText: string;
  readonly isError?: boolean;
  readonly errorMessage?: string;
}

const Input: React.FC<Props> = ({ onChange, name, labelText, isError, errorMessage, ...props }) => {
  return (
    <InputWrapper>
      <StyledInput name={name} onChange={onChange} {...props} />
      <StyledLabel>{isError ? errorMessage : labelText}</StyledLabel>
    </InputWrapper>
  );
};

export default Input;
