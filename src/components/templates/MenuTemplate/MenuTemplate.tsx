import React from 'react';
import styled from 'styled-components';
import Menu from '../../organisms/Menu/Menu';

const MenuTemplateWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: row;
`;

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
