import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProductItem, ProductList } from '@src/types';
import { getAllFavoriteProductThunk } from './favoriteThunk';

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

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    getUserIdFavorite(state, action: PayloadAction<string | undefined>) {
      let userId = action.payload;
      const favoriteFilter = state?.product?.filter((val: ProductItem) =>
        val?.favorite?.includes(String(userId)),
      );
      state.product = favoriteFilter;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllFavoriteProductThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        getAllFavoriteProductThunk.fulfilled,
        (state, action: PayloadAction<ProductList>) => {
          state.loading = false;
          state.product = [...action.payload];
        },
      )
      .addCase(getAllFavoriteProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { getUserIdFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
