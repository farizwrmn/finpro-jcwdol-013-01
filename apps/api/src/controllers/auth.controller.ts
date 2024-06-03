import { Request, Response, NextFunction } from 'express';
import { loginAction, registerAction } from '../actions/auth.action';

const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = await registerAction(req.body);

    res.status(200).json({
      message: 'Register success',
      data,
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
      message: 'login success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

export { registerController, loginController };
