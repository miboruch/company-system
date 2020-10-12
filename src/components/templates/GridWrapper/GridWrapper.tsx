import React from 'react';
import { StyledWrapper } from './GridWrapper.styles';

interface Props {
  children: React.ReactNode;
  onlyHeader?: boolean;
}

//* This component will have grid declaration on hdReady resolutions

const GridWrapper: React.FC<Props> = ({ children, onlyHeader }) => {
  return <StyledWrapper onlyHeader={onlyHeader}>{children}</StyledWrapper>;
};

export default GridWrapper;
