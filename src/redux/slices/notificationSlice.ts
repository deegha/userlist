import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TNotificationType = 'ERROR' | 'SUCCESS';

interface INotification {
  hasNotification: boolean;
  message?: string;
  type?: TNotificationType;
}

const initialState: INotification = {
  hasNotification: false,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (
      state,
      action: PayloadAction<{ message: string; type: TNotificationType }>,
    ) => {
      console.log('called notifications');
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.hasNotification = true;
    },
    clearNotification: (state) => {
      console.log('clear notifications');
      state.message = undefined;
      state.type = undefined;
      state.hasNotification = false;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
