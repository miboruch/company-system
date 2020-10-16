import React from 'react';
import { StyledArrowButton } from './ArrowButton.styles';
import { Direction } from '../../../types/globalTypes';

interface Props {
  onClick?: () => void;
  // type?: 'button' | 'submit' | 'reset' | undefined;
  // disabled?: boolean;
  direction?: Direction;
}

const ArrowButton: React.FC<Props> = ({ onClick, direction }) => {
  return <StyledArrowButton onClick={onClick} direction={direction ? direction : Direction.Right} />;
};

export default ArrowButton;
