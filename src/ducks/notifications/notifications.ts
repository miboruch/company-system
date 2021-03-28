import { NotificationModel } from 'types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserNotifications } from './notifications-creators';

interface InitialStateInterface {
  areNotificationsLoading: boolean;
  notifications: NotificationModel[];
  notificationsError: string | undefined;
}

const initialState: InitialStateInterface = {
  areNotificationsLoading: false,
  notifications: [],
  notificationsError: undefined
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserNotifications.pending.type, (state) => {
      state.areNotificationsLoading = true;
      state.notificationsError = undefined;
    });
    builder.addCase(getUserNotifications.fulfilled.type, (state, { payload }: PayloadAction<NotificationModel[]>) => {
      state.areNotificationsLoading = false;
      state.notifications = payload;
    });
    builder.addCase(getUserNotifications.rejected.type, (state, { payload }: PayloadAction<string | undefined>) => {
      state.areNotificationsLoading = false;
      state.notificationsError = payload;
    });
  }
});

export default notificationSlice.reducer;
