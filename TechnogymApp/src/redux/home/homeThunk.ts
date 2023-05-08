import { createAsyncThunk } from '@reduxjs/toolkit';

import HomeAPI from '@src/api/HomeAPI';

export const homeThunk = createAsyncThunk(
  'home/getHome',
  async (payload, thunkApi) => {
    try {
      const response = await HomeAPI.requestGetAllNew();
      return response.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  },
);
