export const SET_NOTIFICATION_MESSAGE = 'SET_NOTIFICATION_MESSAGE';

export enum NotificationTypes {
  Success = 'success',
  Error = 'error'
}

export interface NotificationMessage {
  notificationType: NotificationTypes;
  message: string;
}

export interface SetNotificationMessage {
  type: typeof SET_NOTIFICATION_MESSAGE;
  message: string | null;
  notificationType: NotificationTypes | null;
}

export type ToggleActionTypes = SetNotificationMessage;
