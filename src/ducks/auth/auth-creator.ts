import { Dispatch } from 'redux';
import { resetUserData } from './data/data';
import { resetCheckState } from './check/check';
import { resetTokens } from './tokens/tokens';

export const resetAuthState = () => (dispatch: Dispatch<any>): void => {
  dispatch(resetUserData);
  dispatch(resetCheckState);
  dispatch(resetTokens);
};
