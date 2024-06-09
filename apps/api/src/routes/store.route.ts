import express from "express";
import { createStoreController, deleteStoreController, getStoreByIDController, getStoresController, updateStoreController } from "../controllers/store.controller";
import { superAdminGuard, verifyToken } from "@/middlewares/auth.middleware";

const router = express.Router();

router.get("/", getStoresController);
router.get("/:id", getStoreByIDController);
router.post("/", verifyToken, superAdminGuard, createStoreController);
router.patch("/:id", verifyToken, superAdminGuard, updateStoreController);
router.delete("/:id", verifyToken, superAdminGuard, deleteStoreController);

export default router;