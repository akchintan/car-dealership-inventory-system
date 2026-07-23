import { Request, Response } from 'express';
import Car from '../models/car.model';

export const createCar = async (req: Request, res: Response): Promise<void> => {
  const car = await Car.create(req.body);

  res.status(201).json({
    success: true,
    car
  });
};

export const getCars = async (_req: Request, res: Response): Promise<void> => {
  const cars = await Car.find();

  res.status(200).json({
    success: true,
    cars
  });
};
