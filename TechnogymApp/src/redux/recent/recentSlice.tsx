import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductItem } from '@src/types';

export type Recent = Array<ProductItem>;

const initialState: Recent = [];

export const RecentSlice = createSlice({
  name: 'recent',
  initialState,
  reducers: {
    setRecent: (state, action) => {
      state = [...state, action.payload];
      const clone: Recent = JSON.parse(JSON.stringify(state));
      const filter = clone.filter(
        (val: ProductItem) => val.title === action.payload.title,
      );
      const restFilter = clone.filter(
        (val: ProductItem) => val.title !== action.payload.title,
      );
      if (filter.length > 1) {
        filter.splice(0, 1);
      }
      state = [...restFilter, ...filter];
      return state;
    },
    removeRecent: state => {
      state = [];
      return state;
    },
  },
});

export const { setRecent, removeRecent } = RecentSlice.actions;

export default RecentSlice.reducer;
