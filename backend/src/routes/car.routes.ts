import { Router } from 'express';
import { createCar } from '../controllers/car.controller';
import authMiddleware from '../middleware/auth.middleware';

const carRouter = Router();

carRouter.post('/', authMiddleware, createCar);

export default carRouter;
