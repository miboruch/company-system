import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from './types/appActionTypes';
import { bindActionCreators } from 'redux';
import { authenticateCheck } from './actions/authenticationActions';

interface Props {}

type ConnectedProps = Props & LinkDispatchProps;

const App: React.FC<ConnectedProps> = ({ authenticationCheck }) => {
  useEffect(() => {
    authenticationCheck();
  }, []);

  return (
    <Layout>
      <Router>
        <Switch>
          <Route path={'/'} exact component={LandingPage} />
          <Route path={'/login'} component={LoginPage} />
          <Route path={'/home'} component={LandingPage} />
        </Switch>
      </Router>
    </Layout>
  );
};

interface LinkDispatchProps {
  authenticationCheck: () => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    authenticationCheck: bindActionCreators(authenticateCheck, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(App);
