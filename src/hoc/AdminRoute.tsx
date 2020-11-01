import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../reducers/rootReducer';
import { Redirect, Route } from 'react-router-dom';
import { UserRole } from '../types/actionTypes/authenticationActionTypes';
import { CompanyInterface } from '../types/modelsTypes';

type ConnectedProps = Props & LinkStateProps;

interface Props {
  component: React.FC<any>;
  path: string;
  exact?: boolean;
}

const AdminRoute: React.FC<ConnectedProps> = ({ component: Component, path, exact, isLoggedIn, role }) => {
  //TODO: add another condition -
  return isLoggedIn && role === UserRole.Admin ? <Route path={path} exact={exact} component={Component} /> : <Redirect to='/login' />;
};

interface LinkStateProps {
  isLoggedIn: boolean;
  role: UserRole;
  // currentCompany: CompanyInterface | null;
}

const mapStateToProps = ({ authenticationReducer: { isLoggedIn, role } }: AppState): LinkStateProps => {
  return { isLoggedIn, role };
};

export default connect(mapStateToProps)(AdminRoute);