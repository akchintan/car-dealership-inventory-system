import express from 'express';
import swaggerUi from 'swagger-ui-express';
import authRouter from './routes/auth.routes';
import carRouter from './routes/car.routes';
import swaggerSpec from './config/swagger';
import errorMiddleware from './middleware/error.middleware';
import userRouter from './routes/user.routes';

const app = express();

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/cars', carRouter);
app.use('/api/users', userRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (_req, res) => {
  res.json({ message: 'Car Dealership Inventory API is running' });
});

app.use(errorMiddleware);

export default app;
