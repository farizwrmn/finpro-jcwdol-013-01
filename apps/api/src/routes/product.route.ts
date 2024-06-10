import express from "express";
import { createProductController, deleteProductController, getProductByIDController, getProductsController, updateProductController } from "../controllers/product.controller";
import { adminGuard, verifyToken } from "@/middlewares/auth.middleware";

const router = express.Router();

router.get("/", getProductsController);
router.get("/:id", getProductByIDController);
router.post("/", verifyToken, adminGuard, createProductController);
router.patch("/:id", verifyToken, adminGuard, updateProductController);
router.delete("/:id", verifyToken, adminGuard, deleteProductController);

export default router;