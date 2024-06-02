import { Request, Response, NextFunction } from 'express';
import { loginAction, registerAction } from '../actions/auth.action';

const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { file } = req;
    const data = await registerAction(req.body, String(file?.filename));

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

const addNewImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { file } = req;

    if (!file) throw new Error('no file uploaded');
    console.log(file);
    res.status(200).json({
      message: 'file uploaded successfuly',
      data: file,
    });
  } catch (err) {
    next(err);
  }
};

const addNewImages = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { files } = req;

    if (!files?.length) throw new Error('no file uploaded');
    console.log(files);
    res.status(200).json({
      message: 'file uploaded successfuly',
      data: files,
    });
  } catch (err) {
    next(err);
  }
};

export { registerController, loginController, addNewImage, addNewImages };
