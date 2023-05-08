import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '@src/types';
import { getUserOrderThunk, postOrderThunk, putOrderThunk } from './orderThunk';

type OrderState = {
  loading?: boolean;
  orderData: Array<Order> ;
  error?: string | null | unknown;
};

const initialState: OrderState = {
  loading: false,
  orderData: [],
  error: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserOrderThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        getUserOrderThunk.fulfilled,
        (state, action: PayloadAction<Array<Order>>) => {
          state.loading = false;
          state.orderData = [...action.payload];
        },
      )
      .addCase(getUserOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(postOrderThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        postOrderThunk.fulfilled,
        (state, action: PayloadAction<Array<Order>>) => {
          state.loading = false;
        },
      )
      .addCase(postOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(putOrderThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        putOrderThunk.fulfilled,
        (state, action: PayloadAction<Array<Order>>) => {
          state.loading = false;
        },
      )
      .addCase(putOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
