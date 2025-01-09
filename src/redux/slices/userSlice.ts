import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  createUserApiCall,
  updateUserApiCall,
  fetchSingleUserApiCall,
} from '@/services/userService';
import { TUser, TUserCreate } from '@/types/user';

import { setNotification } from './notificationSlice';

interface IUserState {
  user: TUserCreate | TUser;
  loading: boolean;
}

const initialState: IUserState = {
  user: {} as TUserCreate,
  loading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = {} as TUserCreate;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUserThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createUserThunk.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(createUserThunk.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateUserThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateUserThunk.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(updateUserThunk.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(fetchUserThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      fetchUserThunk.fulfilled,
      (state, action: PayloadAction<TUser>) => {
        state.loading = false;
        state.user = action.payload;
      },
    );

    builder.addCase(fetchUserThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

interface IUpdateUser {
  user: TUserCreate;
  id: string;
}

export const createUserThunk = createAsyncThunk<boolean, TUserCreate>(
  'createUser',
  async (newUser: TUserCreate, { dispatch }) => {
    const data = await createUserApiCall(newUser);
    dispatch(
      setNotification({
        message: 'Successfully created user',
        type: 'SUCCESS',
      }),
    );
    return data;
  },
);

export const updateUserThunk = createAsyncThunk<boolean, IUpdateUser>(
  'updateUser',
  async ({ user, id }: IUpdateUser, { dispatch }) => {
    const data = await updateUserApiCall(user, id);

    dispatch(
      setNotification({
        message: 'Successfully updated',
        type: 'SUCCESS',
      }),
    );

    return data;
  },
);

export const fetchUserThunk = createAsyncThunk<TUser, string>(
  'fetchUser',
  async (id: string) => {
    const data = await fetchSingleUserApiCall(id);
    return data;
  },
);

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
