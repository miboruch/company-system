import React from 'react';
import { useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';

import AdminRoute from '../hoc/AdminRoute';
import UserRoute from '../hoc/UserRoute';

import { AppState } from 'store/store';
import { UserRole } from 'ducks/auth/roles/roles';
import { adminRoutes, userRoutes } from 'routes/menu.routes';

const Routes: React.FC = () => {
  const { role } = useSelector((state: AppState) => state.auth.roles);

  return (
    <Switch>
      {role === UserRole.Admin
        ? adminRoutes.map((route) => <AdminRoute key={route.path} {...route} />)
        : userRoutes.map((route) => <UserRoute key={route.path} {...route} />)}
    </Switch>
  );
};

export default Routes;
