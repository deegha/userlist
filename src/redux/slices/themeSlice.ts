import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TTheme = 'light' | 'dark';

interface ITheme {
  theme: TTheme;
}

const initialState: ITheme = {
  theme: 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<{ theme: TTheme }>) => {
      state.theme = action.payload.theme;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
