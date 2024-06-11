import { Request, Response, NextFunction } from 'express';
import {
  loginAction,
  registerAction,
  verifyAction,
  refreshTokenAction,
} from '../actions/auth.action';
import { verify } from 'jsonwebtoken';
import { API_KEY } from '@/config';

const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await registerAction(req.body);

    res.status(200).json({
      message:
        'Register success, please verify your account trough your email first before Sign in.',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = await loginAction(req.body);

    res.status(200).json({
      message: 'Login Success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const refreshTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const email = req.user?.email as string;

    const result = await refreshTokenAction(email);

    res.status(200).json({
      message: 'Refresh token success',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const verifyController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const email = req.user?.email as string;
    const password = req.body.password;

    await verifyAction({
      email,
      password,
    });

    res.status(200).json({
      message: 'Verify success',
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  registerController,
  loginController,
  verifyController,
  refreshTokenController,
};
