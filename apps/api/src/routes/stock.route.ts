import express from 'express';
import {
  createStockController,
  getStocksByProductIDController,
  updateStockController,
  getStockByIDController,
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
router.post('/', verifyToken, adminGuard, createStockController);
router.patch('/:id', verifyToken, adminGuard, updateStockController);

export default router;
