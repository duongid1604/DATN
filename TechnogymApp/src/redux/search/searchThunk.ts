import { createAsyncThunk } from '@reduxjs/toolkit';

import ProductAPI from '@src/api/ProductAPI';
import { userInfo } from '@src/types';

export const searchProductThunk = createAsyncThunk(
  'searchProduct/getSearchProduct',
  async (payload: userInfo | null, thunkApi) => {
    try {
      const response = await ProductAPI.requestGetAllProduct(payload);
      return response.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  },
);
