import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart } from '@src/types';
import { getUserCartThunk, postCartThunk } from './cartThunk';

type CartState = {
  loading?: boolean;
  saveCart?: Cart | null;
  error?: string | null | unknown;
};

const initialState: CartState = {
  loading: false,
  saveCart: [],
  error: null,
};

export const saveCartSlice = createSlice({
  name: 'saveCart',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserCartThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        getUserCartThunk.fulfilled,
        (state, action: PayloadAction<Cart>) => {
          state.loading = false;
          state.saveCart = [...action.payload];
        },
      )
      .addCase(getUserCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(postCartThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(postCartThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(postCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = saveCartSlice.actions;

export default saveCartSlice.reducer;
