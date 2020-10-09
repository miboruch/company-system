import React from 'react';
import { StyledWrapper } from './GridWrapper.styles';

interface Props {
  children: React.ReactNode;
}

//* This component will have grid declaration on desktop resolutions

const GridWrapper: React.FC<Props> = ({ children }) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};

export default GridWrapper;
