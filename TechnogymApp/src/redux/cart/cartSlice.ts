import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart, ItemCart } from '@src/types';

const initialState: Cart = [];

export const productSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const product = state.findIndex(e => e.productID === action.payload);
      state[product].quantity += 1;
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const product = state.findIndex(e => e.productID === action.payload);
      state[product].quantity -= 1;
    },
    setCart: (state, action: PayloadAction<ItemCart>) => {
      state = [...state, action.payload];
      let myState = JSON.parse(JSON.stringify(state));
      let filterProduct = myState.filter(
        (val: ItemCart) => val.title === action.payload.title,
      );
      let filterExistProduct = myState.filter(
        (val: ItemCart) => val.title !== action.payload.title,
      );
      if (filterProduct.length > 1) {
        filterProduct[0].quantity = 1 + filterProduct[0].quantity;
        filterProduct.splice(1, filterProduct.length - 1);
      }
      state = [...filterExistProduct, ...filterProduct];
      return state;
    },
    removeItemCart(state, action: PayloadAction<ItemCart>) {
      state.filter(e => e.productID !== action.payload.productID);
      return state;
    },
    deleteCart(state) {
      state = [];
      return state;
    },
  },
});

export const {
  setCart,
  deleteCart,
  removeItemCart,
  increaseQuantity,
  decreaseQuantity,
} = productSlice.actions;

export default productSlice.reducer;
