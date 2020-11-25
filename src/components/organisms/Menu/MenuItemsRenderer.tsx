import React, { useContext } from 'react';
import { connect, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { UserRole } from '../../../types/actionTypes/authenticationActionTypes';
import { adminRoutes, userRoutes } from '../../../routes/routesDefinition';
import { LinkWrapper, StyledLink } from './Menu.styles';
import { AppState } from '../../../store/test-store';
import { MenuContext } from '../../../providers/MenuContext/MenuContext';
import { CompanyInterface, UserAuthData } from '../../../types/modelsTypes';

interface Props {}

type ConnectedProps = Props & LinkStateProps & RouteComponentProps;

const MenuItemsRenderer: React.FC<ConnectedProps> = ({ location, currentCompany }) => {
  const { role } = useSelector((state: AppState) => state.auth.roles);
  const { userData } = useSelector((state: AppState) => state.auth.data);
  const { token } = useSelector((state: AppState) => state.auth.tokens);
  const { setMenuOpen } = useContext(MenuContext);

  const condition: boolean = !!(userData && token && currentCompany);

  const renderAdminRoutes = adminRoutes
    .filter((route) => (condition ? route : !route.isGuarded))
    .map(({ name, path, icon }) => (
      <LinkWrapper isActive={path.includes(location.pathname)} key={path}>
        {icon}
        <StyledLink to={path} onClick={() => setMenuOpen(false)}>
          {name}
        </StyledLink>
      </LinkWrapper>
    ));

  const renderUserRoutes = userRoutes
    .filter((route) => (condition ? route : !route.isGuarded))
    .map(({ name, path, icon }) => (
      <LinkWrapper isActive={path.includes(location.pathname)} key={path}>
        {icon}
        <StyledLink to={path} onClick={() => setMenuOpen(false)}>
          {name}
        </StyledLink>
      </LinkWrapper>
    ));

  return <>{role === UserRole.Admin ? renderAdminRoutes : renderUserRoutes}</>;
};

interface LinkStateProps {
  currentCompany: CompanyInterface | null;
}

const mapStateToProps = ({ companyReducer: { currentCompany } }: AppState): LinkStateProps => {
  return { currentCompany };
};

export default withRouter(connect(mapStateToProps)(MenuItemsRenderer));
