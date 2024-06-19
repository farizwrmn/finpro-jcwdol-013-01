import express from 'express';
import {
  createProductController,
  createProductImageController,
  deleteProductController,
  deleteProductImageController,
  getProductByIDController,
  getProductBySlugController,
  getProductsController,
  updateProductController,
} from '../controllers/product.controller';
import { adminGuard, verifyToken } from '@/middlewares/auth.middleware';
import { uploader } from "@/helpers/multer";

const router = express.Router();

router.get('/', getProductsController);
router.get('/:id', getProductByIDController);
router.get('/slug/:slug', getProductBySlugController);
router.post('/', verifyToken, adminGuard, createProductController);
router.patch('/:id', verifyToken, adminGuard, updateProductController);
router.delete('/:id', verifyToken, adminGuard, deleteProductController);
router.post(
  '/image',
  verifyToken,
  uploader('IMG_', '/products').single('image'),
  createProductImageController,
);
router.delete('/image/:id', verifyToken, adminGuard, deleteProductImageController);


export default router;
