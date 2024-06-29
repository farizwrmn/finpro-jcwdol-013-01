import express, { Application } from 'express';
import { API_PORT } from './config';
import { ErrorMiddleware } from './middlewares/error.middleware';
import cors from 'cors';
import path = require('path');

import authRouter from './routes/auth.route';
import userRouter from './routes/user.route';
import addressRouter from './routes/address.route';
import storeRouter from './routes/store.route';
import categoryRouter from './routes/category.route';
import productRouter from './routes/product.route';
import stocksRouter from './routes/stock.route';
import cartRouter from './routes/cart.route';
import shippingRouter from './routes/shipping.route';
import orderRouter from './routes/order.route';
import paymentRouter from './routes/payment.route';
import discountsRouter from './routes/discount.route';

const PORT: number = Number(API_PORT) || 8000;
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

// initialize endpoint
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/addresses', addressRouter);
app.use('/stores', storeRouter);
app.use('/categories', categoryRouter);
app.use('/products', productRouter);
app.use('/stocks', stocksRouter);
app.use('/cart', cartRouter);
app.use('/shipping', shippingRouter);
app.use('/orders', orderRouter);
app.use('/payment', paymentRouter);
app.use('/discounts', discountsRouter);

// initialize error middleware
app.use(ErrorMiddleware);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
