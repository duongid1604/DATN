import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { userInfo } from '@src/types';
import Toast from 'react-native-toast-message';
import { getUserThunk } from '../user/userThunk';
import {
  forgotPasswordThunk,
  loginThunk,
  logoutThunk,
  registerThunk,
} from './authThunk';

type LoginState = {
  loading?: boolean;
  userInfo: userInfo | null;
  error?: string | null | unknown;
};

const initialState: LoginState = {
  loading: false,
  userInfo: null,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setReload(state) {
      state.error = null;
      state.userInfo = null;
    },
    setUser(state, action) {
      state = action.payload;
      return state;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        getUserThunk.fulfilled,
        (state, action: PayloadAction<userInfo>) => {
          state.loading = false;
          state.userInfo = {
            myInfo: { ...action.payload },
            accessToken: state.userInfo?.accessToken,
          };
        },
      )
      .addCase(getUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(loginThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        loginThunk.fulfilled,
        (state, action: PayloadAction<userInfo>) => {
          state.loading = false;
          state.userInfo = action.payload;
        },
      )
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(registerThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        registerThunk.fulfilled,
        (state, action: PayloadAction<userInfo>) => {
          Toast.show({
            type: 'success',
            text1: 'Notification',
            text2: 'Register successfully now you can login!',
          });
          state.loading = false;
          state.userInfo = action.payload;
        },
      )
      .addCase(registerThunk.rejected, (state, action) => {
        Toast.show({
          type: 'error',
          text1: 'Notification',
          text2: 'Fail to register!',
        });
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(forgotPasswordThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        forgotPasswordThunk.fulfilled,
        (state, action: PayloadAction<userInfo>) => {
          Toast.show({
            type: 'success',
            text1: 'Notification',
            text2: 'Please check the new password in email',
          });
          state.loading = false;
          state.userInfo = action.payload;
        },
      )
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        Toast.show({
          type: 'error',
          text1: 'Notification',
          text2: 'Fail reset password!',
        });
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(logoutThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setUser, setReload } = authSlice.actions;

export default authSlice.reducer;
