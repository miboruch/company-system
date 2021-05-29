import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import MenuItemsRenderer from './components/MenuItemsRenderer/MenuItemsRenderer';

import { AppState } from 'store/store';
import { MenuContext } from 'providers/MenuContext/MenuContext';

import {
  CompanyName,
  MenuItemsWrapper,
  MenuWrapper,
  RedirectPanel,
  StyledMenuSvg,
  ArrowIcon,
  ArrowWrapper,
  RedirectText
} from './Menu.styles';

const Menu: React.FC = () => {
  const history = useHistory();
  const { currentCompany } = useSelector((state: AppState) => state.company.currentCompany);
  const { isMenuOpen } = useContext(MenuContext);

  const changePanelTo = `Przejdź do innej firmy`;

  const selectCompaniesRedirect = () => history.push('/companies');

  return (
    <MenuWrapper isOpen={isMenuOpen}>
      {currentCompany && <CompanyName>{currentCompany.name}</CompanyName>}
      <MenuItemsWrapper>
        <MenuItemsRenderer />
      </MenuItemsWrapper>
      <RedirectPanel>
        <StyledMenuSvg />
        <RedirectText>{changePanelTo}</RedirectText>
        <ArrowWrapper onClick={selectCompaniesRedirect}>
          <ArrowIcon />
        </ArrowWrapper>
      </RedirectPanel>
    </MenuWrapper>
  );
};

export default Menu;
