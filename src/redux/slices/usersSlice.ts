import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsersApiCall } from '@/services/userService';
import { TUser } from '@/types/user';

import { setNotification } from './notificationSlice';

interface IUsersState {
  users: Array<TUser>;
  loading: boolean;
  sortBy?: string;
  order?: string;
  searchQuery?: string;
  message?: string;
}

interface IFetchUsersArgs {
  page: string;
  sortBy?: string;
  order?: string;
  searchQuery?: string;
}

const initialState: IUsersState = {
  users: [],
  loading: false,
};
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setOrderBy: (
      state,
      action: PayloadAction<{ orderBy: string; order: string }>,
    ) => {
      state.sortBy = action.payload.orderBy;
      state.order = action.payload.order;
    },
    setSearch: (state, action: PayloadAction<{ search: string }>) => {
      state.searchQuery = action.payload.search;
    },
    clearSearch: (state) => {
      state.searchQuery = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsersThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchUsersThunk.fulfilled, (state, action) => {
      state.users = action.payload as TUser[];
      state.loading = false;
    });

    builder.addCase(fetchUsersThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const fetchUsersThunk = createAsyncThunk<
  TUser[] | 'Not found',
  IFetchUsersArgs
>(
  'fetchUsers',
  async (
    { page, sortBy, order, searchQuery }: IFetchUsersArgs,
    { dispatch },
  ) => {
    const data = await fetchUsersApiCall(page, sortBy, order, searchQuery);
    if (data === 'Not found') {
      dispatch(
        setNotification({
          message: 'No records found',
          type: 'ERROR',
        }),
      );
    }

    return data;
  },
);

export const { setOrderBy, setSearch, clearSearch } = usersSlice.actions;

export default usersSlice.reducer;
