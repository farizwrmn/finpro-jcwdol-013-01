import { Request, Response, NextFunction } from 'express';
import {
  createCartItemAction,
  deleteCartItemAction,
  getCartByUserIDAction,
} from '@/actions/cart.action';

const getCartByUserIDController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const data = await getCartByUserIDAction(id);

    res.status(200).json({
      message: 'Get cart success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const createCartItemController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = await createCartItemAction(req.body);

    res.status(200).json({
      message: 'Create cart item success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const deleteCartItemController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const data = await deleteCartItemAction(id);

    res.status(200).json({
      message: 'Delete cart item success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

export {
  createCartItemController,
  deleteCartItemController,
  getCartByUserIDController,
};
