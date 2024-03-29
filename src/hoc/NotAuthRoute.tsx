import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import { AppState } from 'store/store';

interface Props {
  component: React.FC<any>;
  path: string;
  exact?: boolean;
}

const NotAuthRoute: React.FC<Props> = ({ component: Component, path, exact }) => {
  const { isLoggedIn } = useSelector((state: AppState) => state.auth.check);

  return !(isLoggedIn && localStorage.getItem('refreshToken')) ? <Route path={path} exact={exact} component={Component} /> : <Redirect to='/select' />;
};

export default NotAuthRoute;
