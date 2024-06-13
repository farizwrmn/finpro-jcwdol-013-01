import express from 'express';
import {
  registerController,
  loginController,
  verifyController,
  refreshTokenController,
  getTokenController,
} from '@/controllers/auth.controller';
import { verifyToken } from '@/middlewares/auth.middleware';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/', verifyToken, refreshTokenController);
router.post('/', getTokenController);
router.post('/verify', verifyToken, verifyController);

export default router;
