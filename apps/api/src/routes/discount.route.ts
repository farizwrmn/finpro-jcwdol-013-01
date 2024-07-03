import express from 'express';
import { adminGuard, verifyToken } from '@/middlewares/auth.middleware';
import {
  createDiscountController,
  getDiscountByIDController,
  getDiscountController,
  getDiscountsByStoreIDController,
  updateDiscountController,
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
router.get('/:id', verifyToken, adminGuard, getDiscountByIDController);
router.patch('/:id', verifyToken, adminGuard, updateDiscountController);

export default router;
