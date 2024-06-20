export type CartItem = {
  id: string;
  name: string;
  slug: string;
  image?: string;
  price: number;
  isUseStock: boolean;
  remainStock: number;
};

export type Cart = {
  cartItems: CartItem[];
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
};
