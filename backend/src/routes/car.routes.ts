import { Router } from 'express';
import { createCar, getCars, getSingleCar, updateCar } from '../controllers/car.controller';
import authMiddleware from '../middleware/auth.middleware';

const carRouter = Router();

carRouter.post('/', authMiddleware, createCar);
carRouter.get('/', authMiddleware, getCars);
carRouter.get('/:id', authMiddleware, getSingleCar);
carRouter.put('/:id', authMiddleware, updateCar);

export default carRouter;
