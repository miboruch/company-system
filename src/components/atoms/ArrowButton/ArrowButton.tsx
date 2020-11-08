import React from 'react';
import { StyledArrowButton } from './ArrowButton.styles';
import { Direction } from '../../../types/globalTypes';

interface Props {
  onClick?: () => void;
  direction?: Direction;
  isHidden?: boolean;
  isSmaller?: boolean
}

const ArrowButton: React.FC<Props> = ({ onClick, direction, isHidden, isSmaller }) => {
  return <StyledArrowButton className={'arrow'} onClick={onClick} isHidden={!!isHidden} isSmaller={!!isSmaller} direction={direction ? direction : Direction.Right} />;
};

export default ArrowButton;
