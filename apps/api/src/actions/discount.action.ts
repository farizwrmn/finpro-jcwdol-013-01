import { IDiscount } from '@/interfaces/discount.interface';
import createDiscountQuery from '@/queries/discount.query';
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

export default createDiscountAction;
