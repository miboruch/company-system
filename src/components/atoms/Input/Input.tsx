import React from 'react';
import { InputWrapper, StyledLabel, StyledInput } from './Input.styles';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value?: string | number;
  required: boolean;
  type: string;
  readonly labelText: string;
  readonly isError?: boolean;
  readonly errorMessage?: string;
}

const Input: React.FC<Props> = ({ onChange, name, value, required, type, labelText, isError, errorMessage, ...props }) => {
  return (
    <InputWrapper>
      <StyledInput name={name} onChange={onChange} value={value && value} required={required} type={type} {...props} />
      <StyledLabel>{isError ? errorMessage : labelText}</StyledLabel>
    </InputWrapper>
  );
};

export default Input;
