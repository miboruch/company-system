import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface IMenu {
  isOpen: boolean;
}

const MenuWrapper = styled.div<IMenu>`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.menuBackground};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  padding: 7rem 2.5rem 3rem;
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '-100%')});
  transition: transform 0.6s ease;

  ${({ theme }) => theme.mq.desktop} {
    width: 300px;
    position: static;
    transform: translateX(0);
  }
`;

interface LinkWrapperInterface {
  isActive: boolean;
}

const LinkWrapper = styled.div<LinkWrapperInterface>`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${({ isActive }) => (isActive ? '#212121' : '#CACACF')};

  svg {
    path {
      fill: ${({ isActive }) => (isActive ? '#212121' : '#CACACF')};
    }
  }
`;

const StyledLink = styled(Link)`
  color: inherit;
  font-size: 14px;
  padding: 2rem 0;
  margin-top: 4px;
`;

const MenuItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8rem;
`;

export { MenuWrapper, LinkWrapper, StyledLink, MenuItemsWrapper };
