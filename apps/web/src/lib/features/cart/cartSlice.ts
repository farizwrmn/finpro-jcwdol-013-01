import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';

interface Cart {
  itemsCount: number,
  itemsPrice: number,
  storeId: string,
  userAddressId: string,
  origin: string,
  destination: string,
  shippingCourier: string,
  shippingService: string,
  shippingPrice: number,
  paymentMethod: string,
  discountPrice: number,
  totalPrice: number
}

const cartState = {
  itemsCount: 0,
  itemsPrice: 0,
  storeId: '',
  userAddressId: '',
  origin: '',
  destination: '',
  shippingCourier: '',
  shippingService: '',
  shippingPrice: 0,
  paymentMethod: '',
  discountPrice: 0,
  totalPrice: 0
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
    updateCartItemsState: (state: Cart, action: PayloadAction<{ itemsCount: number, itemsPrice: number }>) => {
      state.itemsCount = action.payload.itemsCount;
      state.itemsPrice = action.payload.itemsPrice;
      return updateCart(state);
    },
    updateCartStoreState: (state: Cart, action: PayloadAction<{ storeId: string }>) => {
      state.storeId = action.payload.storeId;
      return updateCart(state);
    },
    updateCartOriginState: (state: Cart, action: PayloadAction<{ origin: string }>) => {
      state.origin = action.payload.origin;
      return updateCart(state);
    },
    updateCartDestinationState: (state: Cart, action: PayloadAction<{ destination: string, userAddressId: string }>) => {
      state.destination = action.payload.destination;
      state.userAddressId = action.payload.userAddressId;
      return updateCart(state);
    },
    updateCartShippingState: (state: Cart, action: PayloadAction<{ shippingCourier: string, shippingService: string, shippingPrice: number }>) => {
      state.shippingCourier = action.payload.shippingCourier;
      state.shippingService = action.payload.shippingService;
      state.shippingPrice = action.payload.shippingPrice;
      return updateCart(state);
    },
    updateCartPaymentState: (state: Cart, action: PayloadAction<{ paymentMethod: string }>) => {
      state.paymentMethod = action.payload.paymentMethod;
      return updateCart(state);
    },
    resetCartState: (state: Cart) => {
      localStorage.removeItem("cart");
      return cartState;
    },
  },
});

const updateCart = (state: Cart) => {
  state.totalPrice = Number(state.itemsPrice) + Number(state.shippingPrice) - Number(state.discountPrice);
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
}

export const {
  updateCartItemsState,
  updateCartStoreState,
  updateCartOriginState,
  updateCartDestinationState,
  updateCartShippingState,
  updateCartPaymentState,
  resetCartState,
} = cartSlice.actions;

export default cartSlice.reducer;