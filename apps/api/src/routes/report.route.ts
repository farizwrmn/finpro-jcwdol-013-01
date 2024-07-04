import express from 'express';
import { adminGuard, verifyToken } from '@/middlewares/auth.middleware';
import {
  getSalesReportPerMonthController,
  getSalesReportPerProductController,
} from '@/controllers/report.controller';

const router = express.Router();

router.get(
  '/sales/month',
  verifyToken,
  adminGuard,
  getSalesReportPerMonthController,
);

router.get(
  '/sales/product',
  verifyToken,
  adminGuard,
  getSalesReportPerProductController,
);

export default router;
