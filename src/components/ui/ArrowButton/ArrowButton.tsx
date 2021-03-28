import React from 'react';

import { StyledArrowButton } from './ArrowButton.styles';

export type ArrowDirections = 'left' | 'right' | 'bottom';

interface Props {
  onClick?: () => void;
  direction?: ArrowDirections;
  isHidden?: boolean;
  isSmaller?: boolean;
}

const ArrowButton: React.FC<Props> = ({ onClick, direction, isHidden, isSmaller }) => {
  return (
    <StyledArrowButton
      className={'arrow'}
      onClick={onClick}
      isHidden={!!isHidden}
      isSmaller={!!isSmaller}
      direction={direction || 'right'}
    />
  );
};

export default ArrowButton;
