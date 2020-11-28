import { Dispatch } from 'redux';
import { setTokens } from '../tokens/tokens';
import { getAdminAccessToken, getNewAccessToken } from '../tokens/tokens-creators';
import { getUserData } from '../data/data-creators';
import { clearStorage, logout } from '../logout/logout-creators';
import { setLoading } from './check';
import { AppDispatch, AppState } from '../../../store/test-store';
import { getUserNotifications } from '../../notifications/notifications-creators';
import { resetState } from '../../reset/reset-creators';
import { UserRole } from '../roles/roles';

interface AuthTimeoutInterface {
  refreshToken: string;
  expireMilliseconds: number;
}

export const authTimeout = ({ refreshToken, expireMilliseconds }: AuthTimeoutInterface) => (dispatch: Dispatch<any>, getState: () => AppState): ReturnType<typeof setTimeout> => {
  const { role } = getState().auth.roles;
  const { currentCompany } = getState().company.currentCompany;

  return setTimeout(async () => {
    role === UserRole.Admin && currentCompany ? dispatch(getAdminAccessToken({ refreshToken, companyId: currentCompany._id })) : dispatch(getNewAccessToken({ refreshToken }));
  }, expireMilliseconds);
};

interface AuthCheckInterface {
  successCallback: () => void;
  errorCallback: () => void;
}

export const authCheck = ({ successCallback, errorCallback }: AuthCheckInterface) => (dispatch: AppDispatch, getState: () => AppState): void => {
  const { role } = getState().auth.roles;
  const { currentCompany } = getState().company.currentCompany;

  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  const expireDate = localStorage.getItem('expireDate');

  if (token && refreshToken && expireDate) {
    dispatch(setLoading(true));
    const expDate = new Date(expireDate);
    if (expDate <= new Date()) {
      role === UserRole.Admin && currentCompany
        ? dispatch(getAdminAccessToken({ refreshToken, companyId: currentCompany._id, successCallback, errorCallback }))
        : dispatch(getNewAccessToken({ refreshToken, successCallback, errorCallback }));
      dispatch(setLoading(false));
    } else {
      dispatch(setTokens({ token, refreshToken, expireIn: expDate.getTime() }));
      dispatch(authTimeout({ refreshToken, expireMilliseconds: expDate.getTime() - new Date().getTime() }));
      dispatch(getUserData(token));
      dispatch(getUserNotifications(1));
      //TODO: get all app users
      successCallback();
      dispatch(setLoading(false));
    }
  } else {
    if (refreshToken) {
      console.log(refreshToken);
      dispatch(logout(() => console.log('sign out')));
      dispatch(setLoading(false));
    } else {
      dispatch(resetState());
      dispatch(clearStorage());
      errorCallback();
      dispatch(setLoading(false));
    }
  }
};
