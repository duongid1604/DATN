import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductList } from '@src/types';

import { getAllNewProductThunk } from './productThunk';

type ProductState = {
  loading?: boolean;
  productNew?: ProductList | null;
  error?: string | null | unknown;
};

const initialState: ProductState = {
  loading: false,
  productNew: [],
  error: null,
};

export const productNewSlice = createSlice({
  name: 'new_product',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllNewProductThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        getAllNewProductThunk.fulfilled,
        (state, action: PayloadAction<ProductList>) => {
          state.loading = false;
          state.productNew = [...action.payload];
        },
      )
      .addCase(getAllNewProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = productNewSlice.actions;

export default productNewSlice.reducer;
