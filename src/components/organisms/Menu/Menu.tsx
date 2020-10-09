import React from 'react';
import styled from 'styled-components';

interface IMenu {
  isOpen: boolean;
}

const MenuWrapper = styled.div<IMenu>`
  width: 100%;
  height: 100vh;
  background-color: #ccc;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  padding: 7rem 2rem 3rem;
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '-100%')});
  transition: transform 0.6s ease;

  ${({ theme }) => theme.mq.desktop} {
    width: 300px;
    position: static;
    transform: translateX(0);
  }
`;

interface Props {
  isOpen: boolean;
}

const Menu: React.FC<Props> = ({ isOpen }) => {
  return (
    <MenuWrapper isOpen={isOpen}>
      <p>Hello</p>
    </MenuWrapper>
  );
};

export default Menu;
