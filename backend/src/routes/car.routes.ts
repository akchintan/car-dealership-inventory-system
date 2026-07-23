import { Router } from 'express';
import { createCar, getCars } from '../controllers/car.controller';
import authMiddleware from '../middleware/auth.middleware';

const carRouter = Router();

carRouter.post('/', authMiddleware, createCar);
carRouter.get('/', authMiddleware, getCars);

export default carRouter;
