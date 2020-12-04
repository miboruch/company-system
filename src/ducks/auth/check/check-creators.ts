import { Dispatch } from 'redux';
import { setTokens } from '../tokens/tokens';
import { getCompanyAccessToken, getNewAccessToken } from '../tokens/tokens-creators';
import { getUserData } from '../data/data-creators';
import { clearStorage, logout } from '../logout/logout-creators';
import { AppDispatch, AppState } from '../../../store/test-store';
import { getUserNotifications } from '../../notifications/notifications-creators';
import { resetState } from '../../reset/reset-creators';
import { UserRole } from '../roles/roles';
import { getAllAppUsers } from '../../users/all-users-creators';
import { setRole } from '../roles/roles';
import { setLoading } from '../../app/initial-load';
import { getSingleCompany } from '../../company/current-company/current-company-creators';

export const authCheck = (pathname: string) => (dispatch: AppDispatch, getState: () => AppState): void => {
  dispatch(setLoading(true));
  const { role } = getState().auth.roles;

  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  const companyId = localStorage.getItem('companyId');

  if (refreshToken) {
    if (companyId) {
      dispatch(
        getCompanyAccessToken({
          refreshToken,
          companyId,
          successCallback: () => {
            pathname.includes('admin') ? dispatch(setRole(UserRole.Admin)) : dispatch(setRole(UserRole.User));
            // dispatch(getSingleCompany(companyId));
            //TODO: wait until this company fetch, then setInitialLoading = false

            console.log('refresh token and company');
          }
        })
      );
    } else {
      dispatch(getNewAccessToken({ refreshToken }));
      console.log('refresh token but no company');
    }
  } else {
    dispatch(clearStorage());
    dispatch(resetState());
    history.pushState({}, '', '/login');
    console.log('no refresh token');
  }
};
