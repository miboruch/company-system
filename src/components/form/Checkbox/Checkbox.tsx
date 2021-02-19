import React from 'react';
import { FieldInputProps } from 'formik';

import { StyledLabel } from 'styles/shared';
import { StyledCheckbox, Wrapper } from './Checkbox.styles';

export interface CheckboxProps {
  field?: FieldInputProps<any>;
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ field, label }) => {
  return (
    <Wrapper>
      <StyledLabel htmlFor={field?.name}>{label}</StyledLabel>
      <StyledCheckbox type={'radio'} {...field} />
    </Wrapper>
  );
};

export default Checkbox;
