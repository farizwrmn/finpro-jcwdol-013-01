import { IDiscount } from '@/interfaces/discount.interface';
import { Discount, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createDiscountQuery = async (
  discountData: IDiscount,
): Promise<Discount> => {
  try {
    const trx = await prisma.$transaction(async (prisma) => {
      try {
        const discount = await prisma.discount.create({
          data: {
            type: discountData.type,
            amount: discountData.amount,
            unit: discountData.unit,
            minimumPrice: discountData.minimumPrice,
            maximumDiscount: discountData.maximumDiscount,
            storeId: discountData.storeId,
            productId: discountData.productId,
          },
        });

        return discount;
      } catch (err) {
        throw err;
      }
    });

    return trx;
  } catch (err) {
    throw err;
  }
};

export default createDiscountQuery;
