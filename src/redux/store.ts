import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import userReducer from './slices/userSlice';
import themeReducer from './slices/themeSlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    theme: themeReducer,
    user: userReducer,
    notifications: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
