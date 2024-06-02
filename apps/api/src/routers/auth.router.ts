import { Router } from 'express';
import {
  loginController,
  registerController,
  addNewImage,
  addNewImages,
} from '../controllers/auth.controller';
import { uploader } from '../helpers/multer';

const router = Router();

router.post(
  '/register',
  uploader('IMG', '/avatar').single('file'),
  registerController,
);
router.post('/login', loginController);
router.post('/single', uploader('IMG', '/avatar').single('file'), addNewImage);
router.post(
  '/multiple',
  uploader('IMG', '/random').array('files', 3),
  addNewImages,
);

export default router;
