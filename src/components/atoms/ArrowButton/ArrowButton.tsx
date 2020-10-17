import React from 'react';
import { StyledArrowButton } from './ArrowButton.styles';
import { Direction } from '../../../types/globalTypes';

interface Props {
  onClick?: () => void;
  direction?: Direction;
  isHidden?: boolean;
}

const ArrowButton: React.FC<Props> = ({ onClick, direction, isHidden }) => {
  return <StyledArrowButton onClick={onClick} isHidden={!!isHidden} direction={direction ? direction : Direction.Right} />;
};

export default ArrowButton;
