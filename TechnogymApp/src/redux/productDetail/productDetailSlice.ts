import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProductItem } from '@src/types';
import { getDetailProductThunk } from './productDetailThunk';

type DetailProductState = {
  loading?: boolean;
  product?: ProductItem | null;
  error?: string | null | unknown;
};

const initialState: DetailProductState = {
  loading: false,
  product: null,
  error: null,
};

export const productDetailSlice = createSlice({
  name: 'detailProduct',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getDetailProductThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        getDetailProductThunk.fulfilled,
        (state, action: PayloadAction<ProductItem>) => {
          state.loading = false;
          state.product = { ...action.payload };
        },
      )
      .addCase(getDetailProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = productDetailSlice.actions;

export default productDetailSlice.reducer;
