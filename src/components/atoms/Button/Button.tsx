import React from 'react';
import { StyledButton } from './Button.styles';



interface Props {
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset' | undefined;
  text: string;
  isPrimary?: boolean;
}

const Button: React.FC<Props> = ({ onClick, type, text, isPrimary }) => {
  return (
    <StyledButton onClick={onClick} type={type}>
      {text}
    </StyledButton>
  );
};

export default Button;
