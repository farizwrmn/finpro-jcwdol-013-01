import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Cart {
  itemsCount: number,
  itemsPrice: number,
}

const initialState: Cart = {
  itemsCount: 0,
  itemsPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCartState: (state: Cart, action: PayloadAction<Cart>) => {
      state = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  updateCartState,
} = cartSlice.actions;

export default cartSlice.reducer;
