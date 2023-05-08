import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { homeType } from '@src/types';
import { homeThunk } from './homeThunk';

type HomeState = {
  loading?: boolean;
  newData:  Array<homeType> | any ;
  error?: string | null | unknown;
};

const initialState: HomeState = {
  loading: false,
  newData: [],
  error: null,
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setNewDataReload(state) {
      state.newData = []
    }
  },
  extraReducers(builder) {
    builder
      .addCase(homeThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        homeThunk.fulfilled,
        (state, action: PayloadAction<Array<homeType>>) => {
          state.loading = false;
          state.newData = action.payload;
        },
      )
      .addCase(homeThunk.rejected, (state, action ) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setNewDataReload } = homeSlice.actions

export default homeSlice.reducer;
