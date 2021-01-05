import React from 'react';

import { InputWrapper, StyledLabel, StyledInput } from './Input.styles';
import { ShowPasswordIcon } from 'styles/iconStyles';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value?: string | number;
  required: boolean;
  type: string;
  disabled?: boolean;
  isPassword?: boolean;
  togglePasswordInputType?: () => void;
  readonly labelText: string;
  readonly isError?: boolean;
  readonly errorMessage?: string;
}

const Input: React.FC<Props> = ({ onChange, name, value, required, isPassword, disabled, togglePasswordInputType, type, labelText, isError, errorMessage, ...props }) => {
  const label = isError ? errorMessage : labelText;
  return (
    <InputWrapper>
      <StyledInput id={name} name={name} onChange={onChange} value={value && value} required={required} type={type} disabled={disabled} {...props} />
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      {!!isPassword && <ShowPasswordIcon onClick={togglePasswordInputType} data-testid={'password-icon'} />}
    </InputWrapper>
  );
};

export default Input;
