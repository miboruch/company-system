import React from 'react';
import { FieldInputProps } from 'formik';

import { InputWrapper, StyledLabel, StyledInput } from './Input.styles';
import { ShowPasswordIcon } from 'styles/iconStyles';

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  field?: FieldInputProps<any>;
  isPassword?: boolean;
  togglePasswordInputType?: () => void;
  spacing?: boolean;
  readonly labelText?: string;
  readonly isError?: boolean;
  readonly errorMessage?: string;
}

const Input: React.FC<InputProps> = ({ field, spacing, labelText, isPassword, errorMessage, togglePasswordInputType, ...props }) => {
  const label = errorMessage ? errorMessage : labelText;
  return (
    <InputWrapper>
      {/*@ts-ignore*/}
      <StyledInput {...props} {...field} spacing={spacing} />
      <StyledLabel htmlFor={field?.name}>{labelText}</StyledLabel>
      {!!isPassword && <ShowPasswordIcon onClick={togglePasswordInputType} data-testid={'password-icon'} />}
    </InputWrapper>
  );
};

export default Input;
