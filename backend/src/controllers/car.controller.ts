import { Request, Response } from 'express';
import Car from '../models/car.model';

export const createCar = async (req: Request, res: Response): Promise<void> => {
  const car = await Car.create(req.body);

  res.status(201).json({
    success: true,
    car
  });
};
