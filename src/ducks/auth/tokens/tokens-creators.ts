import { api } from '../../../api';
import { getUserData } from '../data/data-creators';
import { authTimeout } from '../check/check-creators';
import { logout } from '../logout/logout-creators';
import { setTokens } from './tokens';
import { AppDispatch } from '../../../store/test-store';

interface GetNewAccessTokenInterface {
  refreshToken: string;
  successCallback?: () => void;
  errorCallback?: () => void;
}

export const getNewAccessToken = ({ refreshToken, successCallback, errorCallback }: GetNewAccessTokenInterface) => async (dispatch: AppDispatch): Promise<any> => {
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

interface GetAdminTokenInterface {
  refreshToken: string;
  companyId: string;
  successCallback?: () => void;
  errorCallback?: () => void;
}

export const getAdminAccessToken = ({ refreshToken, companyId, successCallback, errorCallback }: GetAdminTokenInterface) => async (dispatch: AppDispatch): Promise<any> => {
  try {
    const { data } = await api.post(`/auth/admin-token`, { refreshToken, companyId });

    dispatch(setTokens({ token: data.accessToken, refreshToken, expireIn: data.expireIn }));
    dispatch(getUserData(data.accessToken));

    dispatch(authTimeout({ refreshToken, expireMilliseconds: data.expireIn - new Date().getTime() }));
    !!successCallback && successCallback();

    return data;
  } catch (error) {
    !!errorCallback && errorCallback();
    dispatch(logout(() => console.log('sign out')));
  }
};
