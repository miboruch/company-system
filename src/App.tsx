import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage/LoginPage';
import { getAllAppUsers } from './ducks/users/all-users-creators';
import { authCheck } from './ducks/auth/check/check-creators';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import Routes from './routes/Routes';
import SelectPage from './pages/SelectPage/SelectPage';
import NotificationPopup from './components/molecules/NotificationPopup/NotificationPopup';
import RegisterFromLink from './pages/RegisterFromLink/RegisterFromLink';
import { AppState, useAppDispatch } from './store/test-store';

type ConnectedProps = RouteComponentProps<any>;

const App: React.FC<ConnectedProps> = ({ history }) => {
  const dispatch = useAppDispatch();
  const { token, refreshToken } = useSelector((state: AppState) => state.auth.tokens);
  const { role } = useSelector((state: AppState) => state.auth.roles);
  const { currentCompany } = useSelector((state: AppState) => state.company.currentCompany);

  useEffect(() => {
    dispatch(
      authCheck({
        successCallback: () => {
          dispatch(getAllAppUsers());
          history.push('/select');
        },
        errorCallback: () => history.push('/login')
      })
    );
  }, []);

  // useEffect(() => {
  //   if (role === UserRole.Admin && currentCompany && refreshToken) {
  //     dispatch(getAdminAccessToken({ refreshToken, companyId: currentCompany._id }));
  //   }
  // }, [currentCompany, refreshToken]);

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

export default withRouter(App);
