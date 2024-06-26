import createDiscountAction from '@/actions/discount.action';
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
      amount: params.amount,
      unit: params.unit,
      minimumPrice: params.minimumPrice,
      maximumDiscount: params.maximumDiscount,
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

export default createDiscountController;
