import express from 'express';
const app = express();
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';
import errorMiddleware from './middleware/error.middleware.js';
import userRouter from './routes/user.route.js';
import fileUpload from 'express-fileupload';
import limiter from './middleware/rate.limit.middleware.js';
import messageRouter from './routes/message.route.js';
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 3000;
app.use(express.json({ limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(fileUpload());
app.use(limiter);
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

//ROUTES
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/messages', messageRouter);


app.use(errorMiddleware);
app.get('/', (req, res) => {
  res.send('chat api');
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

