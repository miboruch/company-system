import React from 'react';
import { UserRole } from '../types/actionTypes/authenticationActionTypes';
import { Switch } from 'react-router-dom';
import { adminRoutes } from './routesDefinition';
import AdminRoute from '../hoc/AdminRoute';

interface Props {}

const Routes: React.FC<Props> = () => {
  return (
    <Switch>
      {adminRoutes.map((route) => (
        <AdminRoute path={`/admin${route.path}`} exact={route.exact} component={route.component} />
      ))}
    </Switch>
  );
};

export default Routes;
