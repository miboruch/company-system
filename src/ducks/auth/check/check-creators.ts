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
  console.log('CHECK');

  if (token && refreshToken && expireDate) {
    console.log('all tokens');
    dispatch(setLoading(true));
    const expDate = new Date(expireDate);
    if (expDate <= new Date()) {
      console.log('exp date');
      dispatch(getNewAccessToken({ refreshToken, successCallback, errorCallback }));
    } else {
      console.log('continue');
      console.log(token, refreshToken);
      dispatch(setTokens({ token, refreshToken, expireIn: new Date(expireDate).getTime() }));
      dispatch(getUserData());
      dispatch(authTimeout({ refreshToken, expireMilliseconds: expDate.getTime() - new Date().getTime() }));
      successCallback();
    }
  } else {
    if (refreshToken) {
      console.log('no all tokens but refresh');
      dispatch(logout(() => console.log('sign out')));
      //auth logout
    } else {
      console.log('nothing');
      //resetState full state
      dispatch(clearStorage());
      errorCallback();
    }
  }
};
