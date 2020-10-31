import React, { useState } from 'react';
import { StyledWrapper, TitleWrapper } from './GridWrapper.styles';
import { Title } from '../../../styles/shared';
import Header from '../../molecules/Header/Header';

interface Props {
  onlyHeader?: boolean;
  mobilePadding: boolean;
  pageName: string;
  setFilterText?: (filterText: string) => void;
}

interface ChildrenPropsInterface extends Props {
  children: React.ReactNode;
  render?: never;
}

interface RenderPropsInterface extends Props{
  children?: never;
  render: (isEditToggled: boolean, setEditToggled: (isToggled: boolean) => void, isDeleteOpen: boolean, setDeleteOpen: (isOpen: boolean) => void) => void;
}

type ConnectedProps = ChildrenPropsInterface | RenderPropsInterface;

//* This component will have grid declaration on hdReady resolutions
const GridWrapper: React.FC<ConnectedProps> = ({ children, render, onlyHeader, mobilePadding, pageName, setFilterText }) => {
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
