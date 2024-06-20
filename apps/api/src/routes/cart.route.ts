import express from 'express';
import { verifyToken } from '@/middlewares/auth.middleware';
import {
  createCartItemController,
  deleteCartItemController,
  getCartByUserIDController,
} from '@/controllers/cart.controller';

const router = express.Router();

router.get('/user/:id', verifyToken, getCartByUserIDController);
router.post('/item', verifyToken, createCartItemController);
router.delete('/item/:id', verifyToken, deleteCartItemController);

export default router;
