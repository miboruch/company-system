import React from 'react';
import styled from 'styled-components';

const MenuWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #ccc;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  ${({ theme }) => theme.mq.standard} {
    width: 300px;
    position: static;
  }
`;

interface Props {}

const Menu: React.FC<Props> = () => {
  return (
    <MenuWrapper>
      <p>Hello</p>
    </MenuWrapper>
  );
};

export default Menu;
