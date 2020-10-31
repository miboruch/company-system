import React from 'react';
import { StyledWrapper, TitleWrapper } from './GridWrapper.styles';
import { Title } from '../../../styles/shared';
import Header from '../../molecules/Header/Header';

interface Props {
  children: React.ReactNode;
  onlyHeader?: boolean;
  mobilePadding: boolean;
  pageName: string;
  setFilterText?: (filterText: string) => void;
}

//* This component will have grid declaration on hdReady resolutions

const GridWrapper: React.FC<Props> = ({ children, onlyHeader, mobilePadding, pageName, setFilterText }) => {
  return (
    <StyledWrapper mobilePadding={mobilePadding} onlyHeader={onlyHeader}>
      <Header setFilterText={setFilterText} />
      <TitleWrapper>
        <Title>{pageName}</Title>
      </TitleWrapper>
      {children}
    </StyledWrapper>
  );
};

export default GridWrapper;
