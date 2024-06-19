import { IStock } from '@/interfaces/stock.interface';
import { Stock, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createStockQuery = async (stockData: IStock): Promise<Stock> => {
  try {
    const trx = await prisma.$transaction(async (prisma) => {
      try {
        const stock = await prisma.stock.create({
          data: {
            ...stockData,
          },
        });

        await prisma.stockHistory.create({
          data: {
            stockProduct: {
              connect: {
                id: stock.id,
              },
            },
            type: stockData.type,
            stock: stockData.baseStock,
          },
        });

        return stock;
      } catch (err) {
        throw err;
      }
    });

    return trx;
  } catch (err) {
    throw err;
  }
};

const updateStockQuery = async (
  id: string,
  stockData: IStock,
): Promise<Stock> => {
  try {
    const stock = await prisma.stock.update({
      data: {
        ...stockData,
      },
      where: {
        id,
      },
    });

    if (!stock) throw new Error('Stock not found');

    let baseStock;
    let remainingStock;

    if (stockData.type === 'kurang') {
      baseStock = stock.baseStock - stockData.baseStock;
      remainingStock = stock.remainingStock - stockData.remainingStock;
    } else {
      baseStock = stock.baseStock + stockData.baseStock;
      remainingStock = stock.remainingStock + stockData.remainingStock;
    }

    const updatedStock = await prisma.stock.update({
      data: {
        baseStock,
        remainingStock,
      },
      where: {
        id,
      },
    });

    await prisma.stockHistory.create({
      data: {
        stockProduct: {
          connect: {
            id: stock.id,
          },
        },
        type: stockData.type,
        stock: stockData.baseStock,
      },
    });

    return updatedStock;
  } catch (err) {
    throw err;
  }
};

const getStocksByProductIDQuery = async (
  productId: string,
): Promise<Stock[] | null> => {
  try {
    const stocks = await prisma.stock.findMany({
      include: {
        store: true,
      },
      where: {
        productId,
      },
    });

    return stocks;
  } catch (err) {
    throw err;
  }
};

// const addStockQuery = async (id: string, stockData: IStock): Promise<Stock> => {
//   try {
//     const stock = await prisma.stock.update({
//       data: {
//         ...stockData,
//       },
//       where: {
//         id,
//       },
//     });

//     return stock;
//   } catch (err) {
//     throw err;
//   }
// };

const getStockByIDQuery = async (id: string): Promise<Stock | null> => {
  try {
    const stock = await prisma.stock.findUnique({
      where: {
        id,
      },
    });

    return stock;
  } catch (err) {
    throw err;
  }
};

export {
  createStockQuery,
  updateStockQuery,
  getStocksByProductIDQuery,
  // addStockQuery,
  getStockByIDQuery,
};
