import React, { useState } from 'react';

import Header from 'components/navigation/Header/Header';

import { StyledWrapper, TitleWrapper } from './GridWrapper.styles';
import { PageNameHeading } from 'styles';

interface Props {
  onlyHeader?: boolean;
  mobilePadding: boolean;
  isSettingsPage?: boolean;
  pageName: string;
  setFilterText?: (filterText: string) => void;
  color?: string;
}

interface ChildrenPropsInterface extends Props {
  children: React.ReactNode;
  render?: never;
}

interface RenderPropsInterface extends Props {
  children?: never;
  render: (
    isEditToggled: boolean,
    setEditToggled: (isToggled: boolean) => void,
    isDeleteOpen: boolean,
    setDeleteOpen: (isOpen: boolean) => void
  ) => void;
}

type ConnectedProps = ChildrenPropsInterface | RenderPropsInterface;

//* This component will have grid declaration on hdReady resolutions
const GridWrapper: React.FC<ConnectedProps> = ({
  children,
  render,
  onlyHeader,
  mobilePadding,
  isSettingsPage,
  pageName,
  setFilterText,
  color
}) => {
  const [isEditToggled, setEditToggled] = useState<boolean>(false);
  const [isDeleteOpen, setDeleteOpen] = useState<boolean>(false);

  return (
    <StyledWrapper mobilePadding={mobilePadding} onlyHeader={onlyHeader} isSettingsPage={!!isSettingsPage} color={color}>

      <Header setFilterText={setFilterText} color={color} />
      <TitleWrapper color={color}>
        <PageNameHeading>{pageName}</PageNameHeading>
      </TitleWrapper>
      {render ? render(isEditToggled, setEditToggled, isDeleteOpen, setDeleteOpen) : children}
    </StyledWrapper>
  );
};

export default GridWrapper;
