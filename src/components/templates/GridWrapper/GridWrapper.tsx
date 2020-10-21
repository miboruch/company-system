import React from 'react';
import { StyledWrapper } from './GridWrapper.styles';

interface Props {
  children: React.ReactNode;
  onlyHeader?: boolean;
  mobilePadding: boolean;
}

//* This component will have grid declaration on hdReady resolutions

const GridWrapper: React.FC<Props> = ({ children, onlyHeader, mobilePadding }) => {
  return (
    <StyledWrapper mobilePadding={mobilePadding} onlyHeader={onlyHeader}>
      {children}
    </StyledWrapper>
  );
};

export default GridWrapper;
