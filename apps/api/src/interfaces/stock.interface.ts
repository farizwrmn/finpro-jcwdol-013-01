import { Stock } from '@prisma/client';

export interface IStock {
  baseStock: number;
  usedStock?: number;
  remainingStock: number;
  storeId: string;
  productId: string;
  type: string;
}

export interface IUpdateStock {
  baseStock: number;
  usedStock?: number;
  remainingStock: number;
  type: string;
}

export interface IFilterStock {
  keyword?: string;
  page?: number;
  size?: number;
}

export interface IResultStock {
  stocks: Stock[];
  pages: number;
}
