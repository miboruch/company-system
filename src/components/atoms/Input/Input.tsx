import React from 'react';
import { InputWrapper, StyledLabel, StyledInput } from './Input.styles';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value?: string | number;
  required: boolean;
  type: string;
  disabled?: boolean;
  readonly labelText: string;
  readonly isError?: boolean;
  readonly errorMessage?: string;
}

const Input: React.FC<Props> = ({ onChange, name, value, required, disabled, type, labelText, isError, errorMessage, ...props }) => {
  return (
    <InputWrapper>
      <StyledInput name={name} onChange={onChange} value={value && value} required={required} type={type} disabled={disabled} {...props} />
      <StyledLabel>{isError ? errorMessage : labelText}</StyledLabel>
    </InputWrapper>
  );
};

export default Input;
