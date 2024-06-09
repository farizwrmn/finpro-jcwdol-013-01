import express from 'express';
import {
  registerController,
  loginController,
  verifyController,
  refreshTokenController,
} from '@/controllers/auth.controller';
import { verifyToken } from '@/middlewares/auth.middleware';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/', verifyToken, refreshTokenController);
router.post('/verify', verifyToken, verifyController);

export default router;
