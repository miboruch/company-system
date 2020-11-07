import { NotificationInterface } from '../modelsTypes';

export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';

export interface SetNotifications {
  type: typeof SET_NOTIFICATIONS;
  payload: NotificationInterface[];
}

export type NotificationActionTypes = SetNotifications;
