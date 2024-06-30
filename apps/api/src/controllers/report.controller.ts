import { Request, Response, NextFunction } from 'express';
import { getSalesReportPerMonthAction } from '@/actions/report.action';

const getSalesReportPerMonthController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const filters = req.query;
    const data = await getSalesReportPerMonthAction(filters);

    res.status(200).json({
      message: 'Get sales report per month success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

export { getSalesReportPerMonthController };