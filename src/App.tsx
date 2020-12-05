import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, withRouter, useLocation, useHistory, Redirect } from 'react-router-dom';
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
import { authApi, companyApi } from './api';
import { handleCompanyRefreshToken, handleAuthRefreshToken } from './api/middleware';
import Spinner from './components/atoms/Spinner/Spinner';
import { MainSpinnerWrapper } from './styles/shared';
import NotAuthRoute from './hoc/NotAuthRoute';

const App: React.FC = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { isLoading } = useSelector((state: AppState) => state.initialLoad);
  const { token, refreshToken } = useSelector((state: AppState) => state.auth.tokens);
  const { role } = useSelector((state: AppState) => state.auth.roles);
  const { currentCompany } = useSelector((state: AppState) => state.company.currentCompany);

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

  // useEffect(() => {
  //   if (currentCompany && refreshToken) {
  //     adminInterceptors(refreshToken, currentCompany._id);
  //   }
  // }, [currentCompany, refreshToken]);

  // useEffect(() => {
  //   if (role === UserRole.Admin && currentCompany && refreshToken) {
  //     dispatch(getAdminAccessToken({ refreshToken, companyId: currentCompany._id }));
  //   }
  // }, [currentCompany, refreshToken]);

  return (
    <Layout>
      {isLoading ? (
        <MainSpinnerWrapper>
          <Spinner />
        </MainSpinnerWrapper>
      ) : (
        <Switch>
          {/*<Route path={'/'} exact component={} />*/}
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
