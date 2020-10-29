import React from 'react';
import { connect } from 'react-redux';
import { UserRole } from '../types/actionTypes/authenticationActionTypes';
import { Switch } from 'react-router-dom';
import { adminRoutes, userRoutes } from './routesDefinition';
import AdminRoute from '../hoc/AdminRoute';
import { AppState } from '../reducers/rootReducer';
import PrivateRoute from '../hoc/PrivateRoute';

interface Props {}

type ConnectedProps = Props & LinkStateProps;

const Routes: React.FC<ConnectedProps> = ({role}) => {
  return (
    <Switch>
     {role === UserRole.Admin ? (
       adminRoutes.map((route) => (
         <AdminRoute path={route.path} exact={route.exact} component={route.component} />
       ))
     ) : (
       userRoutes.map((route) => (
         <PrivateRoute path={route.path} exact={route.exact} component={route.component} />
       ))
     )}
    </Switch>
  );
};

interface LinkStateProps {
 role: UserRole;
}

const mapStateToProps = ({ authenticationReducer: { role } }: AppState): LinkStateProps => {
 return { role };
};

export default connect(mapStateToProps)(Routes);
