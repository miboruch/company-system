export const SET_NOTIFICATION_MESSAGE = 'SET_NOTIFICATION_MESSAGE';

export enum NotificationTypes {
  Success = 'success',
  Error = 'error'
}

export interface SetNotificationMessage {
  type: typeof SET_NOTIFICATION_MESSAGE;
  message: string;
  notificationType: NotificationTypes;
}

export type ToggleActionTypes = SetNotificationMessage;
