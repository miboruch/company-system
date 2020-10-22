import React from 'react';
import { StyledWrapper } from './GridWrapper.styles';
import { Title } from '../../../styles/sharedStyles';
import Header from '../../molecules/Header/Header';

interface Props {
  children: React.ReactNode;
  onlyHeader?: boolean;
  mobilePadding: boolean;
  pageName: string;
}

//* This component will have grid declaration on hdReady resolutions

const GridWrapper: React.FC<Props> = ({ children, onlyHeader, mobilePadding, pageName }) => {
  return (
    <StyledWrapper mobilePadding={mobilePadding} onlyHeader={onlyHeader}>
      <Header isMenuOpen={false} toggleMenu={() => {}} />
      <Title>{pageName}</Title>
      {children}
    </StyledWrapper>
  );
};

export default GridWrapper;
