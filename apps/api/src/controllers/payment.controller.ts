import { createPaymentAction, updatePaymentStatusAction } from "@/actions/payment.action";
import { Request, Response, NextFunction } from 'express';

const createPaymentController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const orderId = req.body.orderId;
    const data = await createPaymentAction(orderId);

    res.status(200).json({
      message: 'Create payment success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const updatePaymentStatusController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body;
    const data = await updatePaymentStatusAction(id, paymentStatus);

    res.status(200).json({
      message: "Update payment status success",
      data
    });
  } catch (err) {
    next(err);
  }
}

export {
  createPaymentController,
  updatePaymentStatusController,
};