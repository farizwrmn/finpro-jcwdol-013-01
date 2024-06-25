import { Order } from "@prisma/client";

export interface IOrder {
  orderNumber: string;
  userId: string;
  userAddressId: string;
  storeId: string;
  itemsPrice: number;
  shippingPrice: number;
  discountPrice: number;
  totalPrice: number;
  paymentMethod: string;
  shippingCourier: string;
  shippingService: string;
  orderItems: IOrderItem[];
}

export interface IOrderItem {
  productId: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  quantity: number;
  price: number;
}

export interface IFilterOrder {
  userId?: string;
  storeId?: string;
  keyword?: string;
  page?: number;
  size?: number;
}

export interface IResultOrder {
  orders: Order[];
  pages: number;
}