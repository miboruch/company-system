import { setRole, UserRole } from './roles';
import { resetState } from '../../reset/reset-creators';
import { AppDispatch } from 'store/store';

export const changeUserRoleTo = (role: UserRole, callback: () => void) => (dispatch: AppDispatch): void => {
  dispatch(setRole(role));
  dispatch(resetState());
  callback();
};
