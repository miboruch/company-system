import { api } from '../../../api';
import { getUserData } from '../data/data-creators';
import { logout } from '../logout/logout-creators';
import { setTokens } from './tokens';
import { AppDispatch } from '../../../store/test-store';
import { setCompany } from '../../company/current-company/current-company';
import { getSingleCompany } from '../../company/current-company/current-company-creators';

interface GetNewAccessTokenInterface {
  refreshToken: string;
  successCallback?: () => void;
  errorCallback?: () => void;
}

export const getNewAccessToken = ({ refreshToken, successCallback, errorCallback }: GetNewAccessTokenInterface) => async (dispatch: AppDispatch): Promise<any> => {
  try {
    const { data } = await api.post(`/auth/token`, { refreshToken });

    dispatch(setTokens({ token: data.accessToken, refreshToken }));
    dispatch(getUserData(data.accessToken));

    !!successCallback && successCallback();

    return data;
  } catch (error) {
    !!errorCallback && errorCallback();
    dispatch(logout(() => history.pushState({}, '', '/login')));
  }
};

interface GetAdminTokenInterface {
  refreshToken: string;
  companyId: string;
  successCallback?: () => void;
  errorCallback?: () => void;
}

export const getCompanyAccessToken = ({ refreshToken, companyId, successCallback, errorCallback }: GetAdminTokenInterface) => async (dispatch: AppDispatch): Promise<any> => {
  try {
    const { data } = await api.post(`/auth/company-token`, { refreshToken, companyId });

    dispatch(setCompany(data.company));
    dispatch(setTokens({ token: data.accessToken, refreshToken }));
    console.log(data.company);
    // dispatch(getSingleCompany(data.company));
    !!successCallback && successCallback();
    dispatch(getUserData(data.accessToken));
    //TODO: this callback should finish before
    //TODO: response on company access token from backend

    return data;
  } catch (error) {
    !!errorCallback && errorCallback();
    dispatch(logout(() => history.pushState({}, '', '/login')));
  }
};
