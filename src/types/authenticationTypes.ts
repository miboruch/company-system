export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export interface AuthStart {
  type: typeof AUTH_START;
}

export interface AuthSuccess {
  type: typeof AUTH_SUCCESS;
  payload: {
    token: string;
    userId: string;
    expireIn: number;
  };
}

export interface AuthFailure {
  type: typeof AUTH_FAILURE;
  payload: string;
}

export interface AuthLogout {
  type: typeof AUTH_LOGOUT;
}
