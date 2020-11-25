import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../store/test-store';
import { Redirect, Route } from 'react-router-dom';
import { UserRole } from '../types/actionTypes/authenticationActionTypes';

interface Props {
  component: React.FC;
  path: string;
  exact?: boolean;
}

const UserRoute: React.FC<Props> = ({ component: Component, path, exact }) => {
  const { role } = useSelector((state: AppState) => state.auth.roles);
  const { isLoggedIn } = useSelector((state: AppState) => state.auth.check);

  return isLoggedIn && role === UserRole.User ? <Route path={path} exact={exact} component={Component} /> : <Redirect to='/login' />;
};

export default UserRoute;
