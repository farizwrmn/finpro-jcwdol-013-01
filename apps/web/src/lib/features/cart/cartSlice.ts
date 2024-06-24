import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';

interface Cart {
  itemsCount: number,
  itemsPrice: number,
}

const cartState = {
  itemsCount: 0,
  itemsPrice: 0,
} as Cart;

const initialState = (
  typeof window !== "undefined" && localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart') || JSON.stringify(cartState))
    : cartState
) as Cart;

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCartState: (state: Cart, action: PayloadAction<Cart>) => {
      return action.payload;
    },
  },
});

export const refreshCart = (params: Cart) => async (dispatch: Dispatch) => {
  try {
    dispatch(updateCartState({ ...params }));
    localStorage.setItem("cart", JSON.stringify(params));
  } catch (err) {
    console.error(err);
  }
};

export const {
  updateCartState,
} = cartSlice.actions;

export default cartSlice.reducer;
