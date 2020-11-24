import { UserRole } from '../../../types/actionTypes/authenticationActionTypes';
import {setRole} from './roles';
import { AppDispatch } from '../../../store/test-store';

export const changeUserRoleTo = (role: UserRole, callback: () => void) => (dispatch: AppDispatch): void => {
  dispatch(setRole(role));
  // dispatch(resetState());
  callback();
};