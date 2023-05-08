import { createAsyncThunk } from '@reduxjs/toolkit';
import CartAPI from '@src/api/CartAPI';

import { MyCart, userInfo } from '@src/types';

export const getUserCartThunk = createAsyncThunk(
  'userCart/getUserCart',
  async ({ user }: { user: userInfo }, thunkApi) => {
    try {
      const response = await CartAPI.requestGetUserCart({
        user,
      });
      return response.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  },
);

export const postCartThunk = createAsyncThunk(
  'cart/postCart',
  async (
    {
      user,
      payload,
    }: {
      user: userInfo | null;
      payload: MyCart;
    },
    thunkApi,
  ) => {
    try {
      const response = await CartAPI.requestPostCart({
        user,
        payload,
      });
      return response.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  },
);
