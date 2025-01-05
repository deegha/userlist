import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsersApiCall } from '@/services/userService';
import { TUser } from '@/types/user';

interface IUsersState {
  users: Array<TUser>;
  loading: boolean;
  error: boolean;
  sortBy?: string;
  order?: string;
}

interface IFetchUsersArgs {
  page: string;
  sortBy?: string;
  order?: string;
}

const initialState: IUsersState = {
  users: [],
  loading: false,
  error: false,
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsersThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchUsersThunk.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchUsersThunk.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const fetchUsersThunk = createAsyncThunk<TUser[], IFetchUsersArgs>(
  'fetchUsers',
  async ({ page, sortBy, order }: IFetchUsersArgs) => {
    const data = await fetchUsersApiCall(page, sortBy, order);
    return data;
  },
);

export const { setOrderBy } = usersSlice.actions;

export default usersSlice.reducer;
