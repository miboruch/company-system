import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useHistory, Redirect, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import Routes from './routes/Routes';
import SelectPage from './pages/SelectPage/SelectPage';
import NotificationPopup from './components/molecules/NotificationPopup/NotificationPopup';
import RegisterFromLink from './pages/RegisterFromLink/RegisterFromLink';
import Spinner from './components/atoms/Spinner/Spinner';
import NotAuthRoute from './hoc/NotAuthRoute';

import { AppState, useAppDispatch } from 'store/store';
import { authCheck } from 'ducks/auth/check/check-creators';
import { handleCompanyRefreshToken, handleAuthRefreshToken } from 'api/middleware';
import { authApi, companyApi } from 'api';
import { MainSpinnerWrapper } from 'styles/shared';
import { fetchEmployeeData, fetchEmployees } from 'api/auth/auth';

import './App.css';

const App: React.FC = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { isLoading } = useSelector((state: AppState) => state.initialLoad);
  const { token } = useSelector((state: AppState) => state.auth.tokens);

  useEffect(() => {
    dispatch(authCheck(pathname, history));
    /*
     * company id should be fetched before tokens are set
     *
     */
  }, []);

  useEffect(() => {
    companyApi.interceptors.response.use((response: any) => {
      return response;
    }, handleCompanyRefreshToken);

    authApi.interceptors.response.use((response: any) => {
      return response;
    }, handleAuthRefreshToken);
  }, []);

  return (
    <Layout>
      {isLoading ? (
        <MainSpinnerWrapper>
          <Spinner />
        </MainSpinnerWrapper>
      ) : (
        <Switch>
          <Route path={'/'} exact component={SelectPage} />
          <Route path={'/select'} component={SelectPage} />
          <NotAuthRoute path={'/login'} exact component={LoginPage} />
          <NotAuthRoute path={'/register'} component={RegisterPage} />
          <NotAuthRoute path={'/link-register/:token'} component={RegisterFromLink} />
          <Routes />
          <Redirect from={'*'} to={'/select'} />
        </Switch>
      )}
      <NotificationPopup />
    </Layout>
  );
};

export default App;
