import express from 'express';
import {
  createStockController,
  getStocksByProductIDController,
  updateStockController,
  getStockByIDController,
  getStockByProductIdAndStoreIdController,
} from '@/controllers/stock.controller';
import { adminGuard, verifyToken } from '@/middlewares/auth.middleware';

const router = express.Router();

router.get(
  '/product/:id',
  verifyToken,
  adminGuard,
  getStocksByProductIDController,
);
router.get('/:id', verifyToken, adminGuard, getStockByIDController);
router.get('/product/:productId/store/:storeId', verifyToken, getStockByProductIdAndStoreIdController);
router.post('/', verifyToken, adminGuard, createStockController);
router.patch('/:id', verifyToken, adminGuard, updateStockController);

export default router;