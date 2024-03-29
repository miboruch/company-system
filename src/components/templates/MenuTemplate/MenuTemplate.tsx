import React from 'react';

import Menu from 'components/navigation/Menu/Menu';

import { MenuTemplateWrapper } from './MenuTemplate.styles';

interface Props {
  children: React.ReactNode;
}

const MenuTemplate: React.FC<Props> = ({ children }) => {
  return (
    <MenuTemplateWrapper>
      <Menu />
      {children}
    </MenuTemplateWrapper>
  );
};

export default MenuTemplate;
