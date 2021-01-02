import { History } from 'history';
import { getCompanyAccessToken, getNewAccessToken } from '../tokens/tokens-creators';
import { clearStorage } from '../logout/logout-creators';
import { AppDispatch } from 'store/store';
import { resetState } from '../../reset/reset-creators';
import { UserRole } from '../roles/roles';
import { setRole } from '../roles/roles';
import { setLoading } from '../../app/initial-load';

export const authCheck = (pathname: string, history: History) => (dispatch: AppDispatch): void => {
  dispatch(setLoading(true));
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
