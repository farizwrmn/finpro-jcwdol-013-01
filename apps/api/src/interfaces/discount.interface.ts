export interface IDiscount {
  type: string;
  amount: number;
  unit: string;
  minimumPrice: number;
  maximumDiscount: number;
  storeId: string;
  productId: string;
}
