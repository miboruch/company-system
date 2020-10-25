import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from './types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { authenticateCheck } from './actions/authenticationActions';
import PrivateRoute from './hoc/PrivateRoute';
import CompaniesPage from './pages/CompaniesPage/CompaniesPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import EmployeePage from './pages/EmployeePage/EmployeePage';
import TaskPage from './pages/TaskPage/TaskPage';
import ClientsPage from './pages/ClientsPage/ClientsPage';

interface Props {}

type ConnectedProps = Props & LinkDispatchProps & RouteComponentProps<any>;

const App: React.FC<ConnectedProps> = ({ history, authenticationCheck }) => {
  useEffect(() => {
    authenticationCheck(
      () => history.push('/companies'),
      () => history.push('/login')
    );
  }, []);

  return (
    <Layout>
      <Switch>
        <Route path={'/login'} component={LoginPage} />
        <Route path={'/register'} component={RegisterPage} />
        <PrivateRoute path={'/'} exact component={LandingPage} />
        <PrivateRoute path={'/home'} component={LandingPage} />
        <PrivateRoute path={'/companies'} component={CompaniesPage} />
        <PrivateRoute path={'/employees'} component={EmployeePage} />
        <PrivateRoute path={'/tasks'} component={TaskPage} />
        <PrivateRoute path={'/clients'} component={ClientsPage} />
      </Switch>
    </Layout>
  );
};

interface LinkDispatchProps {
  authenticationCheck: (successCallback: () => void, errorCallback: () => void) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    authenticationCheck: bindActionCreators(authenticateCheck, dispatch)
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
