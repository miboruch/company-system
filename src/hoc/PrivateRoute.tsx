import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../reducers/rootReducer';
import { Route, Redirect } from 'react-router-dom';

interface Props {
  component: React.FC;
  path: string;
  exact?: boolean;
}

type ConnectedProps = Props & LinkStateProps;

const PrivateRoute: React.FC<ConnectedProps> = ({ component: Component, path, exact, isLoggedIn }) => {
  return isLoggedIn ? <Route path={path} exact={exact} component={Component} /> : <Redirect to='/login' />;
};

interface LinkStateProps {
  isLoggedIn: boolean;
}

const mapStateToProps = ({ authenticationReducer: { isLoggedIn } }: AppState): LinkStateProps => {
  return { isLoggedIn };
};

export default connect(mapStateToProps)(PrivateRoute);
