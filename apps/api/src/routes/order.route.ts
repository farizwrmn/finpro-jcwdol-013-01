import express from 'express';
import { verifyToken } from '@/middlewares/auth.middleware';
import { createOrderController, getOrderByIDController, getOrdersController } from "@/controllers/order.controller";

const router = express.Router();

router.get("/", verifyToken, getOrdersController);
router.get("/:id", verifyToken, getOrderByIDController);
router.post('/', verifyToken, createOrderController);

export default router;
