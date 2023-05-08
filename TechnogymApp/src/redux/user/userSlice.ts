import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { userInfo } from '@src/types';
import Toast from 'react-native-toast-message';
import { updatePasswordThunk, updateUserThunk } from './userThunk';

type UserState = {
  loading?: boolean;
  userProfile: userInfo | null;
  changePassResponse: string;
  error?: string | null | unknown;
};

const initialState: UserState = {
  loading: false,
  userProfile: {},
  changePassResponse: '',
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(updateUserThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        Toast.show({
          type: 'success',
          text1: 'Notification',
          text2: 'Update successfully!',
        });
        state.loading = false;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        Toast.show({
          type: 'error',
          text1: 'Notification',
          text2: 'Update failed!',
        });
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(updatePasswordThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        updatePasswordThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.changePassResponse = action.payload;
        },
      )
      .addCase(updatePasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
