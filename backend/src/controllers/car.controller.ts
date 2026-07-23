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

export const getSingleCar = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const car = await Car.findById(id);

  if (!car) {
    res.status(404).json({
      success: false,
      message: 'Car not found'
    });
    return;
  }

  res.status(200).json({
    success: true,
    car
  });
};

export const updateCar = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const updateData = req.body;
  const updatedCar = await Car.findByIdAndUpdate(id, updateData);

  if (!updatedCar) {
    res.status(404).json({
      success: false,
      message: 'Car not found'
    });
    return;
  }

  res.status(200).json({
    success: true,
    car: updatedCar
  });
};
