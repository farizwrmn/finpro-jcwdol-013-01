import express from "express";
import { createCategoryController, deleteCategoryController, getCategoryByIDController, getCategoriesController, updateCategoryController } from "../controllers/category.controller";
import { adminGuard, verifyToken } from "@/middlewares/auth.middleware";

const router = express.Router();

router.get("/", getCategoriesController);
router.get("/:id", getCategoryByIDController);
router.post("/", verifyToken, adminGuard, createCategoryController);
router.patch("/:id", verifyToken, adminGuard, updateCategoryController);
router.delete("/:id", verifyToken, adminGuard, deleteCategoryController);

export default router;