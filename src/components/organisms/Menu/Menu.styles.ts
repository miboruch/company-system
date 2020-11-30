import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { ReactComponent as MenuSvg } from '../../../assets/icons/menuDraw.svg';
import { ReactComponent as Arrow } from '../../../assets/icons/arrow.svg';

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

  ${({ theme }) => theme.mq.tablet} {
    width: 400px;
  }

  ${({ theme }) => theme.mq.hdReady} {
    width: 360px;
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
      transition: fill 0.3s ease;
    }
  }
`;

const CompanyName = styled.h3`
  font-size: 18px;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.dark};
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

const RedirectPanel = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
`;

const StyledMenuSvg = styled(MenuSvg)`
  width: 220px;
  height: 150px;

  ${({ theme }) => theme.mq.hdReady} {
    width: 220px;
    height: 130px;
  }
`;

const ArrowIcon = styled(Arrow)`
  fill: #fff;
  width: 15px;
  height: 15px;
`;

const ArrowWrapper = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.dark};
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: pointer;
`;

const RedirectText = styled.p`
  font-weight: ${({ theme }) => theme.font.weight.demi};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 1rem;
`;

export { MenuWrapper, LinkWrapper, StyledLink, CompanyName, MenuItemsWrapper, ButtonWrapper, RedirectPanel, StyledMenuSvg, ArrowIcon, ArrowWrapper, RedirectText };
