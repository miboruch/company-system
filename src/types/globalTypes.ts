export enum Direction {
  Left = 'left',
  Right = 'right',
  Bottom = 'bottom'
}

export interface Coords {
  lat: number | null;
  long: number | null;
}

export enum NotificationTypes {
  Success = 'success',
  Error = 'error'
}

export interface CurrencyInterface {
  name: string;
  value: number;
}

export interface NotificationMessage {
  notificationType?: NotificationTypes;
  message: string;
}
