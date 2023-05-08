import { createAsyncThunk } from '@reduxjs/toolkit';
import OrderAPI from '@src/api/OrderAPI';

import { Order, userInfo } from '@src/types';

export const getUserOrderThunk = createAsyncThunk(
  'userOrder/getUserOrder',
  async ({ user }: { user: userInfo | null }, thunkApi) => {
    try {
      const response = await OrderAPI.requestGetUserOrder({
        user,
      });
      return response.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  },
);

export const postOrderThunk = createAsyncThunk(
  'order/postOrder',
  async (
    {
      user,
      payload,
    }: {
      user: userInfo | null;
      payload: Order | null;
    },
    thunkApi,
  ) => {
    try {
      const response = await OrderAPI.requestPostOrder({
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

export const putOrderThunk = createAsyncThunk(
  'updateOrder/putUpdateOrder',
  async (
    {
      user,
      payload,
    }: {
      user: userInfo | null;
      payload: Order;
    },
    thunkApi,
  ) => {
    try {
      const response = await OrderAPI.requestPutOrder({
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
