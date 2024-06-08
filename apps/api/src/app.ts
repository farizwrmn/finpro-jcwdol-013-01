import express, { Application } from 'express';
import { API_PORT } from './config';

import authRouter from './routes/auth.route';
// import userRouter from './routes/user.route';
import { ErrorMiddleware } from './middlewares/error.middleware';
import cors from 'cors';

const PORT: number = Number(API_PORT) || 8000;

const app: Application = express();

// initialize middleware
app.use(express.json());

// CORS
app.use(cors());

// initialize endpoint
app.use('/auth', authRouter);
// app.use('/users', userRouter);

// initialize error middleware
app.use(ErrorMiddleware);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
