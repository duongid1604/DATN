import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProductList } from '@src/types';
import { searchProductThunk } from './searchThunk';

type SearchState = {
  loading?: boolean;
  search?: ProductList | null;
  error?: string | null | unknown;
};

const initialState: SearchState = {
  loading: false,
  search: [],
  error: null,
};

export const SearchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(searchProductThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        searchProductThunk.fulfilled,
        (state, action: PayloadAction<ProductList>) => {
          state.loading = false;
          state.search = [...action.payload];
        },
      )
      .addCase(searchProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = SearchSlice.actions;

export default SearchSlice.reducer;
