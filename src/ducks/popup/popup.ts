import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { NotificationMessage, NotificationTypes } from '../../types/actionTypes/toggleAcitonTypes';

interface InitialStateInterface {
  isNotificationOpen: boolean;
  notificationMessage: NotificationMessage | null;
}

const initialState: InitialStateInterface = {
  isNotificationOpen: false,
  notificationMessage: null
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    setNotificationMessage: (state, { payload }: PayloadAction<NotificationMessage>) => {
      state.isNotificationOpen = !!payload.message;
      state.notificationMessage = { notificationType: payload.notificationType || NotificationTypes.Success, message: payload.message };
    }
  }
});

export const { setNotificationMessage } = popupSlice.actions;

export default popupSlice.reducer;
