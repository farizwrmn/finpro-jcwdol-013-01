export interface ICart {
  userId: string;
  itemsPrice: number;
  storeId?: string;
}

export interface ICartItem {
  cartId: string;
  productId: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  quantity: number;
  slicedPrice: number;
  sellingPrice: number;
}
