import express from 'express';
import { adminGuard, verifyToken } from '@/middlewares/auth.middleware';
import {
  createDiscountController,
  getDiscountController,
  getDiscountsByStoreIDController,
} from '@/controllers/discount.controller';

const router = express.Router();

router.get('/', verifyToken, adminGuard, getDiscountController);
router.post('/', verifyToken, adminGuard, createDiscountController);
router.get(
  '/store/:storeId',
  verifyToken,
  adminGuard,
  getDiscountsByStoreIDController,
);

export default router;
