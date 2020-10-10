import { AuthenticationActionTypes, AUTH_START, AUTH_SUCCESS, AUTH_FAILURE, AUTH_LOGOUT, SET_USER_DATA } from '../types/authenticationTypes';

interface DefaultState {
  isLoading: boolean;
  isLoggedIn: boolean;
  token: string | null;
  userId: string | null;
  error: string | null;
  userData: null | {
    email: string;
    name: string;
    lastName: string;
    dateOfBirth: string | Date;
    country: string;
    city: string;
    address: string;
  };
}

const initialState: DefaultState = {
  isLoading: false,
  isLoggedIn: false,
  token: null,
  userId: null,
  error: null,
  userData: null
};

export const authenticationReducer = (state = initialState, action: AuthenticationActionTypes): DefaultState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        token: action.payload.token,
        userId: action.payload.userId
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        token: null,
        userId: null,
        error: action.payload
      };
    case 'AUTH_LOGOUT':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: null,
        token: null,
        userId: null,
        userData: null
      };
    case 'SET_USER_DATA':
      return {
        ...state,
        userData: {
          email: action.payload.email,
          name: action.payload.name,
          lastName: action.payload.lastName,
          dateOfBirth: action.payload.dateOfBirth,
          country: action.payload.country,
          city: action.payload.city,
          address: action.payload.address
        }
      };
    default:
      return state;
  }
};
