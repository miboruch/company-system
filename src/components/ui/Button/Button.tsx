import React from 'react';

import { StyledButton } from './Button.styles';

interface Props {
  onClick?: () => void;
  children: React.ReactNode;
  isPrimary?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({ onClick, disabled, type = 'button', children, isPrimary }) => {
  return (
    <StyledButton type={type} onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

export default Button;
