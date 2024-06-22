import { HttpException } from '@/exceptions/HttpException';
import { IStock, IUpdateStock } from '@/interfaces/stock.interface';
import {
  createStockQuery,
  getStocksByProductIDQuery,
  getStockByIDQuery,
  updateStockQuery,
} from '@/queries/stock.query';
import { Stock } from '@prisma/client';

const createStockAction = async (stockData: IStock): Promise<Stock> => {
  try {
    const stock = await createStockQuery(stockData);
    return stock;
  } catch (err) {
    throw err;
  }
};

const updateStockAction = async (
  id: string,
  stockData: IUpdateStock,
): Promise<Stock> => {
  try {
    const stock = await updateStockQuery(id, stockData);
    return stock;
  } catch (err) {
    throw err;
  }
};

const getStocksByProductIDAction = async (
  productId: string,
): Promise<Stock[] | null> => {
  try {
    const stocks = await getStocksByProductIDQuery(productId);

    if (!stocks) throw new HttpException(404, 'Data not found');

    return stocks;
  } catch (error) {
    throw error;
  }
};

const getStockByIDAction = async (id: string): Promise<Stock | null> => {
  try {
    const stock = await getStockByIDQuery(id);

    if (!stock) throw new HttpException(404, 'Data not found');

    return stock;
  } catch (err) {
    throw err;
  }
};

export {
  createStockAction,
  updateStockAction,
  getStocksByProductIDAction,
  getStockByIDAction,
};
