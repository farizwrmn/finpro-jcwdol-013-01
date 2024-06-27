import express from 'express';
import { adminGuard, verifyToken } from '@/middlewares/auth.middleware';
import createDiscountController from '@/controllers/discount.controller';

const router = express.Router();

router.post('/', verifyToken, adminGuard, createDiscountController);

export default router;
