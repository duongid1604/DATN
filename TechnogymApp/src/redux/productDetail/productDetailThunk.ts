import { createAsyncThunk } from '@reduxjs/toolkit';

import ProductAPI from '@src/api/ProductAPI';
import { userInfo } from '@src/types';

export const getDetailProductThunk = createAsyncThunk(
  'detailProduct/getDetailProduct',
  async (
    { user, productId }: { user: userInfo | null; productId: string },
    thunkApi,
  ) => {
    try {
      const response = await ProductAPI.requestDetailGetProduct({
        user,
        productId,
      });
      return response.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  },
);
