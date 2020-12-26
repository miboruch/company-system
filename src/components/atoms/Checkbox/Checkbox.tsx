import React from 'react';

import { StyledLabel } from 'styles/shared';
import { StyledCheckbox, Wrapper } from './Checkbox.styles';

interface Props {
  onChange: (e: React.ChangeEvent<any>) => void;
  name: string;
  labelText: string;
  checked: boolean;
}

const Checkbox: React.FC<Props> = ({ onChange, name, checked, labelText }) => {
  return (
    <Wrapper>
      <StyledLabel htmlFor={name}>{labelText}</StyledLabel>
      <StyledCheckbox type={'radio'} checked={checked} onChange={onChange} name={name} />
    </Wrapper>
  );
};

export default Checkbox;
