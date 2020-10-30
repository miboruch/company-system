import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../../atoms/Button/Button';

interface IMenu {
  isOpen: boolean;
}

const MenuWrapper = styled.div<IMenu>`
  width: 100%;
  height: 100vh;
  //background-color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.menuBackground};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  padding: 7rem 2.5rem 3rem;
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '-100%')});
  transition: transform 0.6s ease;

  ${({ theme }) => theme.mq.hdReady} {
    width: 300px;
    position: fixed;
    top: 0;
    left: 0;
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
      transition: fill 0.3s ease;
    }
  }
`;

const CompanyName = styled.h3`
  font-size: 18px;
  font-weight: ${({theme}) => theme.font.weight.bold};
  color: ${({theme}) => theme.colors.dark};
  letter-spacing: -1px;
`;

const StyledLink = styled(Link)`
  color: inherit;
  font-size: 14px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  padding: 2rem 0;
  margin-top: 4px;
  transition: color 0.3s ease;
`;

const MenuItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8rem;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 4rem;
  left: 2rem;
`;

export { MenuWrapper, LinkWrapper, StyledLink, CompanyName, MenuItemsWrapper, ButtonWrapper };
