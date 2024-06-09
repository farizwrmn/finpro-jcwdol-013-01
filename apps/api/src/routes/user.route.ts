import express from 'express';
import {
  updateUserController,
  updateAvatarController,
} from '@/controllers/user.controller';
import { uploader } from '@/helpers/multer';

// const router = express.Router();

router.patch('/:id', updateUserController);
router.patch(
  '/:id/avatar',
  uploader('AVATAR_', '/avatar').single('image'),
  updateAvatarController,
);

// export default router;
