import express from 'express';
import { createUserController, deleteUserController, getUserByIDController, getUsersController, updateUserController, updateAvatarController } from "../controllers/user.controller";
import { uploader } from "@/helpers/multer";
import { adminGuard, verifyToken } from "@/middlewares/auth.middleware";

const router = express.Router();

router.get("/", getUsersController);
router.get("/:id", getUserByIDController);
router.post("/", verifyToken, adminGuard, createUserController);
// add adminGuard for update user store admin
router.patch("/:id", verifyToken, updateUserController);
router.delete("/:id", verifyToken, adminGuard, deleteUserController);
router.patch(
  '/:id/avatar',
  uploader('AVATAR_', '/avatar').single('image'),
  updateAvatarController,
);

export default router;
