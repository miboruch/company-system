import React from 'react';

import { Direction } from 'types/globalTypes';
import { StyledArrowButton } from './ArrowButton.styles';

interface Props {
  onClick?: () => void;
  direction?: Direction;
  isHidden?: boolean;
  isSmaller?: boolean;
}

const ArrowButton: React.FC<Props> = ({ onClick, direction, isHidden, isSmaller }) => {
  return <StyledArrowButton className={'arrow'} onClick={onClick} isHidden={!!isHidden} isSmaller={!!isSmaller} direction={direction ? direction : Direction.Right} />;
};

export default ArrowButton;
