import { PrismaClient, Order } from '@prisma/client';
import { IOrder, IFilterOrder, IResultOrder } from '../interfaces/order.interface';

const prisma = new PrismaClient();

const getOrdersQuery = async (filters: IFilterOrder): Promise<IResultOrder> => {
  try {
    const { userId = "", storeId = "", keyword = "", page = 1, size = 1000 } = filters;
    const conditions: any = {
      orderNumber: {
        contains: keyword
      }
    };
    if (userId) conditions.userId = userId;
    if (storeId) conditions.storeId = storeId;

    const orders = await prisma.order.findMany({
      include: {
        store: true,
        user: true,
      },
      where: {
        ...conditions
      },
      skip: Number(page) > 0 ? (Number(page) - 1) * Number(size) : 0,
      take: Number(size),
    });

    const data = await prisma.order.aggregate({
      _count: {
        id: true
      },
      where: {
        ...conditions,
      },
    });
    const count = data._count.id;
    const pages = Math.ceil(count / size);

    return { orders, pages };
  } catch (err) {
    throw err;
  }
}

const getOrderByIDQuery = async (id: string): Promise<Order | null> => {
  try {
    const order = await prisma.order.findUnique({
      include: {
        store: true,
        user: true,
        orderItems: {
          include: {
            product: true
          }
        }
      },
      where: {
        id
      }
    });

    return order;
  } catch (err) {
    throw err;
  }
}

const createOrderQuery = async (data: IOrder): Promise<Order> => {
  try {
    const order = await prisma.order.create({
      data: {
        ...data,
        orderItems: {
          createMany: {
            data: data.orderItems
          }
        }
      },
    });

    return order;
  } catch (err) {
    throw err;
  }
};

export {
  getOrdersQuery,
  getOrderByIDQuery,
  createOrderQuery,
};
