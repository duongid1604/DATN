import { createAsyncThunk } from '@reduxjs/toolkit';

import ProductAPI from '@src/api/ProductAPI';
import { userInfo } from '@src/types';

export const getAllProductThunk = createAsyncThunk(
  'allProduct/getAllProduct',
  async (payload: userInfo, thunkApi) => {
    try {
      const response = await ProductAPI.requestGetAllProduct(payload);
      return response.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  },
);

export const getAllNewProductThunk = createAsyncThunk(
  'allNewProduct/getAllNewProduct',
  async (payload: userInfo | null, thunkApi) => {
    try {
      const response = await ProductAPI.requestGetAllNewProduct(payload);
      return response.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  },
);

export const getProductThunk = createAsyncThunk(
  'product/getProduct',
  async (
    { user, category }: { user: userInfo | null; category: string },
    thunkApi,
  ) => {
    try {
      const response = await ProductAPI.requestGetProduct({ user, category });
      return response.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  },
);

export const favoriteProductThunk = createAsyncThunk(
  'favoriteProduct/patchFavoriteProduct',
  async (
    { user, productID }: { user: userInfo | null; productID: string },
    thunkApi,
  ) => {
    try {
      const response = await ProductAPI.requestFavoriteProduct({
        user,
        productID,
      });
      return response.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  },
);
