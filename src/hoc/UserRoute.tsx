import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../reducers/rootReducer';
import { Redirect, Route } from 'react-router-dom';
import { UserRole } from '../types/actionTypes/authenticationActionTypes';

interface Props {
  component: React.FC;
  path: string;
  exact?: boolean;
}

type ConnectedProps = Props & LinkStateProps;

const UserRoute: React.FC<ConnectedProps> = ({ component: Component, path, exact, isLoggedIn, role }) => {
  return isLoggedIn && role === UserRole.User ? <Route path={path} exact={exact} component={Component} /> : <Redirect to='/login' />;
};

interface LinkStateProps {
  isLoggedIn: boolean;
  role: UserRole;
}

const mapStateToProps = ({ authenticationReducer: { isLoggedIn, role } }: AppState): LinkStateProps => {
  return { isLoggedIn, role };
};

export default connect(mapStateToProps)(UserRoute);
