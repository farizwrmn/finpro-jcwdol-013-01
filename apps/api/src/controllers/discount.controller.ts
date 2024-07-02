import {
  createDiscountAction,
  getDiscountAction,
  getDiscountByIDAction,
  getDiscountsByStoreIDAction,
  updateDiscountAction,
} from '@/actions/discount.action';
import { Request, Response, NextFunction } from 'express';

const createDiscountController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const params = req.body;
    const data = await createDiscountAction({
      type: params.type,
      amount: Number(params.amount),
      unit: params.unit,
      minimumPrice: Number(params.minimumPrice),
      maximumDiscount: Number(params.maximumDiscount),
      minimumOrders: Number(params.minimumOrders),
      storeId: params.storeId,
      productId: params.productId,
    });

    res.status(200).json({
      message: 'Create Discount success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const getDiscountController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const filters = req.query;
    const data = await getDiscountAction(filters);

    res.status(200).json({
      message: 'Get discount success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const getDiscountsByStoreIDController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { storeId } = req.params;
    const data = await getDiscountsByStoreIDAction(storeId);

    res.status(200).json({
      message: 'Get discounts success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const getDiscountByIDController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const data = await getDiscountByIDAction(id);

    res.status(200).json({
      message: 'Get discount success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const updateDiscountController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const params = req.body;
    const data = await updateDiscountAction(id, {
      type: params.type,
      amount: Number(params.amount),
      unit: params.unit,
      minimumPrice: Number(params.minimumPrice),
      maximumDiscount: Number(params.maximumDiscount),
      minimumOrders: Number(params.minimumOrders),
      storeId: params.storeId,
      productId: params.productId,
    });

    res.status(200).json({
      message: 'Update Discount success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

export {
  updateDiscountController,
  getDiscountByIDController,
  createDiscountController,
  getDiscountController,
  getDiscountsByStoreIDController,
};
