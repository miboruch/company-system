import React from 'react';
import { useSelector } from 'react-redux';
import { UserRole } from '../ducks/auth/roles/roles';
import { Switch } from 'react-router-dom';
import { adminRoutes, userRoutes } from './routesDefinition';
import AdminRoute from '../hoc/AdminRoute';
import { AppState } from '../store/store';
import UserRoute from '../hoc/UserRoute';

const Routes: React.FC = () => {
  const { role } = useSelector((state: AppState) => state.auth.roles);

  return (
    <Switch>
      {role === UserRole.Admin
        ? adminRoutes.map((route) => <AdminRoute key={route.path} path={route.path} exact={route.exact} component={route.component} />)
        : userRoutes.map((route) => <UserRoute key={route.path} path={route.path} exact={route.exact} component={route.component} />)}
    </Switch>
  );
};

export default Routes;
