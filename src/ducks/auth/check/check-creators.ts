import { Dispatch } from 'redux';
import { setTokens } from '../tokens/tokens';
import { getCompanyAccessToken, getNewAccessToken } from '../tokens/tokens-creators';
import { getUserData } from '../data/data-creators';
import { clearStorage, logout } from '../logout/logout-creators';
import { AppDispatch, AppState } from '../../../store/store';
import { getUserNotifications } from '../../notifications/notifications-creators';
import { resetState } from '../../reset/reset-creators';
import { UserRole } from '../roles/roles';
import { getAllAppUsers } from '../../users/all-users-creators';
import { setRole } from '../roles/roles';
import { setLoading } from '../../app/initial-load';
import { getSingleCompany } from '../../company/current-company/current-company-creators';
import { History } from 'history';

export const authCheck = (pathname: string, history: History) => (dispatch: AppDispatch, getState: () => AppState): void => {
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
          }
        })
      );
    } else {
      dispatch(getNewAccessToken({ refreshToken, successCallback: () => history.push('/select') }));
    }
  } else {
    dispatch(clearStorage());
    dispatch(resetState());
    history.push('/login');
  }
};
