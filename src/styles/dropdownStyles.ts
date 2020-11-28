import styled from 'styled-components';

const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
  width: 100%;
  position: relative;
  margin-top: 1.5rem;
`;

interface MenuProps {
  isOpen: boolean;
}

const Menu = styled.ul<MenuProps>`
  width: 100%;
  padding: 0;
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translateY(100%);
  z-index: 10;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.4s ease, visibility 0.4s ease;
`;

interface ItemInterface {
  isActive: boolean;
}

const Item = styled.li<ItemInterface>`
  list-style-type: none;
  height: 50px;
  padding: 1rem;
  width: 100%;
  transition: background-color 0.4s ease;
  background-color: ${({ isActive, theme }) => (isActive ? '#efefef' : theme.colors.white)};
  display: flex;
  align-items: center;
  font-size: 13px;
`;

export { Form, Menu, Item };
