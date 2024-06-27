import express from 'express';
import { verifyToken } from '@/middlewares/auth.middleware';
import { createPaymentController, updatePaymentStatusController } from "@/controllers/payment.controller";

const router = express.Router();

router.post('/', verifyToken, createPaymentController);
router.patch('/status/:id', verifyToken, updatePaymentStatusController);

export default router;
