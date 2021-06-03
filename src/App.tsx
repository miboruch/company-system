import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useHistory, Redirect, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout';
import Login from 'pages/Login/Login';
import Register from 'pages/Register/Register';
import Select from 'pages/Select/Select';
import Company from 'pages/Company/Company';
import RegisterFromLink from './pages/RegisterFromLink/RegisterFromLink';
import NotAuthRoute from './hoc/NotAuthRoute';
import { Spinner, NotificationPopup } from 'components';
import { useFetch, useUser } from 'components/hooks';
import { authCheck } from 'ducks/auth/check/check-creators';
import { handleCompanyRefreshToken, handleAuthRefreshToken } from 'api/middleware';
import { AppState, useAppDispatch } from 'store/store';
import { authApi, companyApi, fetchUserData } from 'api';

import { MainSpinnerWrapper } from 'styles/shared';

import './App.css';
import Companies from 'pages/Companies/Companies';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { setUser } = useUser();
  const { pathname } = useLocation();
  const { isLoading } = useSelector((state: AppState) => state.initialLoad);

  useFetch(fetchUserData, { onSuccess: (payload) => setUser(payload) });

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
          <Route path={'/'} exact component={Select} />
          <Route path={'/select'} component={Select} />
          <NotAuthRoute path={'/login'} exact component={Login} />
          <NotAuthRoute path={'/register'} component={Register} />
          <NotAuthRoute path={'/link-register/:token'} component={RegisterFromLink} />
          <Route path={'/company/:id'} component={Company} />
          <Route path={'/companies'} component={Companies} />
          {/*<Routes />*/}
          <Redirect from={'*'} to={'/select'} />
        </Switch>
      )}
      <NotificationPopup />
    </Layout>
  );
};

export default App;
