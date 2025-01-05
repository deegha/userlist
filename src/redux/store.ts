import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import themReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    theme: themReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
