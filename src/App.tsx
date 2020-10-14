import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from './types/appActionTypes';
import { bindActionCreators } from 'redux';
import { authenticateCheck } from './actions/authenticationActions';
import PrivateRoute from './hoc/PrivateRoute';
import CompaniesPage from './pages/CompaniesPage/CompaniesPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

interface Props {}

type ConnectedProps = Props & LinkDispatchProps & RouteComponentProps<any>;

const App: React.FC<ConnectedProps> = ({ history, authenticationCheck }) => {
  useEffect(() => {
    authenticationCheck(() => history.push('/home'));
  }, []);

  return (
    <Layout>
      <Switch>
        <Route path={'/login'} component={LoginPage} />
        <Route path={'/register'} component={RegisterPage} />
        <PrivateRoute path={'/'} exact component={LandingPage} />
        <PrivateRoute path={'/home'} component={LandingPage} />
        <PrivateRoute path={'/companies'} component={CompaniesPage} />
      </Switch>
    </Layout>
  );
};

interface LinkDispatchProps {
  authenticationCheck: (successCallback: () => void) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    authenticationCheck: bindActionCreators(authenticateCheck, dispatch)
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
