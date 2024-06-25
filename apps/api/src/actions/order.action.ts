import { Order } from '@prisma/client';
import { IFilterOrder, IOrder, IResultOrder } from '@/interfaces/order.interface';
import {
  createOrderQuery,
  getOrderByIDQuery,
  getOrdersQuery,
} from '@/queries/order.query';
import { HttpException } from "@/exceptions/HttpException";

const getOrdersAction = async (filters: IFilterOrder): Promise<IResultOrder> => {
  try {
    const data = await getOrdersQuery(filters);
    return data;
  } catch (err) {
    throw err;
  }
}

const getOrderByIDAction = async (id: string): Promise<Order | null> => {
  try {
    const order = await getOrderByIDQuery(id);
    if (!order) throw new HttpException(404, "Data not found");

    return order;
  } catch (err) {
    throw err;
  }
}

const createOrderAction = async (
  data: IOrder,
): Promise<Order | null> => {
  try {
    const order = await createOrderQuery(data);
    return order;
  } catch (err) {
    throw err;
  }
};

export {
  getOrdersAction,
  getOrderByIDAction,
  createOrderAction,
};
