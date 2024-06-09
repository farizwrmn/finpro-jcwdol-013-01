// import { Request, Response, NextFunction } from 'express';
// import { updateUserAction } from '@/actions/user.action';

// const updateUserController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const data = req.body;
//     const user = await updateUserAction(id, data);

//     res.status(200).json({
//       message: 'Update user success',
//       data: user,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

const updateAvatarController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { file } = req;

    const data = await updateUserAction(id, {
      image: String(file?.filename),
    });

    res.status(200).json({
      message: 'Update avatar success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

export { updateUserController, updateAvatarController };
