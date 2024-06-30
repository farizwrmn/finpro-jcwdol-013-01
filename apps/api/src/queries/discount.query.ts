import {
  IDiscount,
  IFilterDiscount,
  IResultDiscount,
} from '@/interfaces/discount.interface';
import { Discount, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getDiscountQuery = async (
  filters: IFilterDiscount,
): Promise<IResultDiscount> => {
  try {
    const { keyword = '', page = 1, size = 1000 } = filters;

    const discounts = await prisma.discount.findMany({
      where: {
        type: {
          contains: keyword,
        },
      },
      skip: Number(page) > 0 ? (Number(page) - 1) * Number(size) : 0,
      take: Number(size),
    });

    const data = await prisma.discount.aggregate({
      _count: {
        id: true,
      },
      where: {
        type: {
          contains: keyword,
        },
      },
    });
    const count = data._count.id;
    const pages = Math.ceil(count / size);

    return { discounts, pages };
  } catch (err) {
    throw err;
  }
};

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

const getDiscountsByStoreIDQuery = async (
  storeId: string,
): Promise<Discount[] | null> => {
  try {
    const discounts = await prisma.discount.findMany({
      include: {
        product: true,
      },
      where: {
        storeId,
      },
    });

    return discounts;
  } catch (err) {
    throw err;
  }
};

export { createDiscountQuery, getDiscountQuery, getDiscountsByStoreIDQuery };
