import { api } from '../../../api';
import { getUserData } from '../data/data-creators';
import { authTimeout } from '../check/check-creators';
import { logout } from '../logout/logout-creators';
import { setTokens } from './tokens';
import { Dispatch } from '@reduxjs/toolkit';

interface GetNewAccessTokenInterface {
  refreshToken: string;
  successCallback?: () => void;
  errorCallback?: () => void;
}

export const getNewAccessToken = ({ refreshToken, successCallback, errorCallback }: GetNewAccessTokenInterface) => async (dispatch: Dispatch<any>): Promise<any> => {
  try {
    const { data } = await api.post(`/auth/token`, { refreshToken });

    dispatch(setTokens({ token: data.accessToken, refreshToken, expireIn: data.expireIn }));
    dispatch(getUserData());

    dispatch(authTimeout({ refreshToken, expireMilliseconds: data.expireIn - new Date().getTime() }));
    !!successCallback && successCallback();
    return data;
  } catch (error) {
    !!errorCallback && errorCallback();
    dispatch(logout(() => console.log('sign out')));
  }
};
