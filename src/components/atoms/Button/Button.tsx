import React from 'react';

import { StyledButton } from './Button.styles';

interface Props {
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset' | undefined;
  text: string;
  isPrimary?: boolean;
  disabled?:boolean;
}

const Button: React.FC<Props> = ({ onClick, type, text, disabled, isPrimary }) => {
  return (
    <StyledButton onClick={onClick} type={type} disabled={disabled}>
      {text}
    </StyledButton>
  );
};

export default Button;
