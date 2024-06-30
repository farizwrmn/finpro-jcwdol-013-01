import express from 'express';
import { adminGuard, verifyToken } from '@/middlewares/auth.middleware';
import { getSalesReportPerMonthController } from '@/controllers/report.controller';

const router = express.Router();

router.get(
  '/sales/month',
  verifyToken,
  adminGuard,
  getSalesReportPerMonthController,
);

export default router;
