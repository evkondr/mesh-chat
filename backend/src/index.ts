import express from 'express';
const app = express();
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/auth', authRouter);
app.get('/', (req, res) => {
  res.send(`
    <h1>Добро пожаловать на домашнюю страницу!</h1>
    <p>Сервер Express.js готов. Отправьте POST-запрос на / с JSON для теста.</p>
    <pre>Пример: {"message": "Hello!"}</pre>
  `);
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});