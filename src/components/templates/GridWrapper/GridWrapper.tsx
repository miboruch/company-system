import React, { useState } from 'react';
import { StyledWrapper, TitleWrapper } from './GridWrapper.styles';
import { Title } from '../../../styles/shared';
import Header from '../../molecules/Header/Header';

interface Props {
  children?: React.ReactNode;
  onlyHeader?: boolean;
  mobilePadding: boolean;
  pageName: string;
  setFilterText?: (filterText: string) => void;
  render?: (isEditToggled: boolean, setEditToggled: (isToggled: boolean) => void, isDeleteOpen: boolean, setDeleteOpen: (isOpen: boolean) => void) => void;
}

//* This component will have grid declaration on hdReady resolutions

const GridWrapper: React.FC<Props> = ({ children, render, onlyHeader, mobilePadding, pageName, setFilterText }) => {
  const [isEditToggled, setEditToggled] = useState<boolean>(false);
  const [isDeleteOpen, setDeleteOpen] = useState<boolean>(false);

  return (
    <StyledWrapper mobilePadding={mobilePadding} onlyHeader={onlyHeader}>
      <Header setFilterText={setFilterText} />
      <TitleWrapper>
        <Title>{pageName}</Title>
      </TitleWrapper>
      {!!render ? render(isEditToggled, setEditToggled, isDeleteOpen, setDeleteOpen) : children}
    </StyledWrapper>
  );
};

export default GridWrapper;
