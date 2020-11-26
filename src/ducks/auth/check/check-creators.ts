import { Dispatch } from 'redux';
import { setTokens } from '../tokens/tokens';
import { getNewAccessToken } from '../tokens/tokens-creators';
import { getUserData } from '../data/data-creators';
import { clearStorage, logout } from '../logout/logout-creators';
import { setLoading } from './check';
import { AppDispatch } from '../../../store/test-store';

interface AuthTimeoutInterface {
  refreshToken: string;
  expireMilliseconds: number;
}

export const authTimeout = ({ refreshToken, expireMilliseconds }: AuthTimeoutInterface) => (dispatch: Dispatch<any>): ReturnType<typeof setTimeout> => {
  return setTimeout(async () => {
    dispatch(getNewAccessToken({ refreshToken }));
  }, expireMilliseconds);
};

interface AuthCheckInterface {
  successCallback: () => void;
  errorCallback: () => void;
}

export const authCheck = ({ successCallback, errorCallback }: AuthCheckInterface) => (dispatch: AppDispatch): void => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  const expireDate = localStorage.getItem('expireDate');

  if (token && refreshToken && expireDate) {
    dispatch(setLoading(true));
    const expDate = new Date(expireDate);
    if (expDate <= new Date()) {
      dispatch(getNewAccessToken({ refreshToken, successCallback, errorCallback }));
      dispatch(setLoading(false));
    } else {
      dispatch(setTokens({ token, refreshToken, expireIn: new Date(expireDate).getTime() }));
      dispatch(authTimeout({ refreshToken, expireMilliseconds: expDate.getTime() - new Date().getTime() }));
      dispatch(getUserData());
      successCallback();
      dispatch(setLoading(false));
    }
  } else {
    if (refreshToken) {
      dispatch(logout(() => console.log('sign out')));
      dispatch(setLoading(false));
      //auth logout
    } else {
      //resetState full state
      dispatch(clearStorage());
      errorCallback();
      dispatch(setLoading(false));
    }
  }
};
