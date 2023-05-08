import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductList } from '@src/types';

import { getAllProductThunk } from './productThunk';

type ProductState = {
  loading?: boolean;
  product?: ProductList | null;
  error?: string | null | unknown;
};

const initialState: ProductState = {
  loading: false,
  product: [],
  error: null,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllProductThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        getAllProductThunk.fulfilled,
        (state, action: PayloadAction<ProductList>) => {
          state.loading = false;
          state.product = [...action.payload];
        },
      )
      .addCase(getAllProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = productSlice.actions;

export default productSlice.reducer;
