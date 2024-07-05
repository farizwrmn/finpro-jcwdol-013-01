import { Request, Response, NextFunction } from 'express';

import {
  createStockAction,
  getStocksByProductIDAction,
  updateStockAction,
  getStockByIDAction,
  getStockByProductIdAndStoreIdAction,
} from '@/actions/stock.action';

const createStockController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const params = req.body;
    const data = await createStockAction({
      productId: params.productId,
      storeId: params.storeId,
      baseStock: Number(params.stock),
      remainingStock: Number(params.stock),
      type: 'tambah',
    });

    res.status(200).json({
      message: 'Create stock success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const updateStockController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const params = req.body;
    const data = await updateStockAction(id, {
      type: params.type,
      baseStock: Number(params.stock),
      remainingStock: Number(params.stock),
    });

    res.status(200).json({
      message: 'Add stock success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const getStocksByProductIDController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const data = await getStocksByProductIDAction(id);

    res.status(200).json({
      message: 'Get stock success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const getStockByIDController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const data = await getStockByIDAction(id);

    res.status(200).json({
      message: 'Get stock success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const getStockByProductIdAndStoreIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { productId, storeId } = req.params;
    const data = await getStockByProductIdAndStoreIdAction(productId, storeId);

    res.status(200).json({
      message: 'Get stock success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

export {
  createStockController,
  updateStockController,
  getStocksByProductIDController,
  getStockByIDController,
  getStockByProductIdAndStoreIdController,
};