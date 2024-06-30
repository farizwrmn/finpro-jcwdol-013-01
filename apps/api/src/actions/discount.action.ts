import { HttpException } from '@/exceptions/HttpException';
import {
  IDiscount,
  IFilterDiscount,
  IResultDiscount,
} from '@/interfaces/discount.interface';
import {
  createDiscountQuery,
  getDiscountQuery,
  getDiscountsByStoreIDQuery,
} from '@/queries/discount.query';
import { Discount } from '@prisma/client';

const createDiscountAction = async (
  discountData: IDiscount,
): Promise<Discount> => {
  try {
    const discount = await createDiscountQuery(discountData);
    return discount;
  } catch (err) {
    throw err;
  }
};

const getDiscountAction = async (
  filters: IFilterDiscount,
): Promise<IResultDiscount> => {
  try {
    const data = await getDiscountQuery(filters);
    return data;
  } catch (err) {
    throw err;
  }
};

const getDiscountsByStoreIDAction = async (
  storeId: string,
): Promise<Discount[] | null> => {
  try {
    const discounts = await getDiscountsByStoreIDQuery(storeId);

    if (!discounts) throw new HttpException(404, 'Data not found');

    return discounts;
  } catch (err) {
    throw err;
  }
};

export { createDiscountAction, getDiscountAction, getDiscountsByStoreIDAction };
