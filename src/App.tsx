import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage/LoginPage';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from './types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { getAllAppUsers } from './actions/authenticationActions';
import { authCheck } from './ducks/auth/check/check-creators';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import Routes from './routes/Routes';
import SelectPage from './pages/SelectPage/SelectPage';
import NotificationPopup from './components/molecules/NotificationPopup/NotificationPopup';
import RegisterFromLink from './pages/RegisterFromLink/RegisterFromLink';
import { getUserNotifications } from './actions/notificationActions';
import { useAppDispatch } from './store/test-store';

type ConnectedProps = LinkDispatchProps & RouteComponentProps<any>;

const App: React.FC<ConnectedProps> = ({ history, getAllAppUsers, getUserNotifications }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      authCheck({
        successCallback: () => {
          // getAllAppUsers();
          history.push('/select');
          getUserNotifications(1);
        },
        errorCallback: () => history.push('/test')
      })
    );
  }, []);

  useEffect(() => {}, []);

  return (
    <Layout>
      <Switch>
        <Route path={'/login'} component={LoginPage} />
        <Route path={'/register'} component={RegisterPage} />
        <Route path={'/select'} component={SelectPage} />
        <Route path={'/link-register/:token'} component={RegisterFromLink} />
        <Routes />
      </Switch>
      <NotificationPopup />
    </Layout>
  );
};

interface LinkDispatchProps {
  getAllAppUsers: () => void;
  getUserNotifications: (page: number) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    getAllAppUsers: bindActionCreators(getAllAppUsers, dispatch),
    getUserNotifications: bindActionCreators(getUserNotifications, dispatch)
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
