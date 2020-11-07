import { NotificationInterface } from '../types/modelsTypes';
import { NotificationActionTypes, SET_NOTIFICATIONS } from '../types/actionTypes/notificationActionTypes';

interface DefaultState {
  notifications: NotificationInterface[];
}

const initialState: DefaultState = {
  notifications: []
};

export const notificationReducer = (state = initialState, action: NotificationActionTypes): DefaultState => {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload
      };
    default:
      return state;
  }
};
