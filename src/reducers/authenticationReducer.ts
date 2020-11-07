import {
  AUTH_FAILURE,
  AUTH_LOGOUT,
  AUTH_START,
  AUTH_SUCCESS,
  AuthenticationActionTypes,
  SET_ALL_APP_USERS,
  SET_USER_DATA,
  SET_USER_ROLE,
  UserRole
} from '../types/actionTypes/authenticationActionTypes';
import { UserAuthData, UserDataInterface } from '../types/modelsTypes';

interface DefaultState {
  isLoading: boolean;
  isLoggedIn: boolean;
  token: string | null;
  refreshToken: string | null;
  error: string | null;
  userData: null | UserAuthData;
  role: UserRole;
  allAppUsers: UserDataInterface[];
}

const initialState: DefaultState = {
  isLoading: false,
  isLoggedIn: false,
  token: null,
  refreshToken: null,
  error: null,
  userData: null,
  role: UserRole.User,
  allAppUsers: []
};

export const authenticationReducer = (state = initialState, action: AuthenticationActionTypes): DefaultState => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        error: null,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken
      };
    case AUTH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        token: null,
        refreshToken: null,
        error: action.payload
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: null,
        token: null,
        refreshToken: null,
        userData: null
      };
    case SET_USER_ROLE:
      return {
        ...state,
        role: action.payload
      };
    case SET_USER_DATA:
      return {
        ...state,
        userData: {
          userId: action.payload.userId,
          email: action.payload.email,
          name: action.payload.name,
          lastName: action.payload.lastName,
          dateOfBirth: action.payload.dateOfBirth,
          phoneNumber: action.payload.phoneNumber,
          country: action.payload.country,
          city: action.payload.city,
          address: action.payload.address
        }
      };
    case SET_ALL_APP_USERS:
      return {
        ...state,
        allAppUsers: action.payload
      };
    default:
      return state;
  }
};
