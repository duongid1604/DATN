import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductList } from '@src/types';

import { getProductThunk } from './productThunk';

type CategoryProductState = {
  loading?: boolean;
  product?: ProductList | null;
  error?: string | null | unknown;
};

const initialState: CategoryProductState = {
  loading: false,
  product: [],
  error: null,
};

export const categoryProductSlice = createSlice({
  name: 'category_product',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProductThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        getProductThunk.fulfilled,
        (state, action: PayloadAction<ProductList>) => {
          state.loading = false;
          state.product = [...action.payload];
        },
      )
      .addCase(getProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = categoryProductSlice.actions;

export default categoryProductSlice.reducer;
