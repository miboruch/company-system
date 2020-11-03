import React from 'react';
import { StyledLabel } from '../../../styles/shared';
import { StyledCheckbox, Wrapper } from './Checkbox.styles';

interface Props {
  onChange: () => {};
  name: string;
  labelText: string;
}

const Checkbox: React.FC<Props> = ({ onChange, name, labelText }) => {
  return (
    <Wrapper>
      <StyledLabel htmlFor={name}>{labelText}</StyledLabel>
      <StyledCheckbox type={'radio'} onChange={onChange} name={name} />
    </Wrapper>
  );
};

export default Checkbox;
