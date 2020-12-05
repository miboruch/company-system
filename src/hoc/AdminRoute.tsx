import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../store/store';
import { Redirect, Route } from 'react-router-dom';
import { UserRole } from '../ducks/auth/roles/roles';

interface Props {
  component: React.FC<any>;
  path: string;
  exact?: boolean;
}

const AdminRoute: React.FC<Props> = ({ component: Component, path, exact }) => {
  const { role } = useSelector((state: AppState) => state.auth.roles);
  const { isLoggedIn } = useSelector((state: AppState) => state.auth.check);

  return isLoggedIn && role === UserRole.Admin ? <Route path={path} exact={exact} component={Component} /> : <Redirect to='/login' />;
};

export default AdminRoute;
