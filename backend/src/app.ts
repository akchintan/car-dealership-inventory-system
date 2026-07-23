import express from 'express';
import authRouter from './routes/auth.routes';
import carRouter from './routes/car.routes';
import userRouter from './routes/user.routes';

const app = express();

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/cars', carRouter);
app.use('/api/users', userRouter);

app.get('/', (_req, res) => {
  res.json({ message: 'Car Dealership Inventory API is running' });
});

export default app;
