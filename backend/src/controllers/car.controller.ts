import { Request, Response } from 'express';
import Car from '../models/car.model';

export const createCar = async (req: Request, res: Response): Promise<void> => {
  const car = await Car.create(req.body);

  res.status(201).json({
    success: true,
    car
  });
};

export const getCars = async (req: Request, res: Response): Promise<void> => {
  const filters: { brand?: string; status?: string } = {};

  if (typeof req.query.brand === 'string') {
    filters.brand = req.query.brand;
  }

  if (typeof req.query.status === 'string') {
    filters.status = req.query.status;
  }

  const hasPagination = req.query.page !== undefined || req.query.limit !== undefined;

  if (!hasPagination) {
    const cars = await Car.find(filters);

    res.status(200).json({
      success: true,
      cars
    });
    return;
  }

  const currentPage = Number(req.query.page) || 1;
  const currentLimit = Number(req.query.limit) || 10;
  const skip = (currentPage - 1) * currentLimit;
  const cars = await Car.find(filters).skip(skip).limit(currentLimit);
  const totalCars = await Car.countDocuments(filters);

  res.status(200).json({
    success: true,
    cars,
    page: currentPage,
    limit: currentLimit,
    total: totalCars
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

export const deleteCar = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const deletedCar = await Car.findByIdAndDelete(id);

  if (!deletedCar) {
    res.status(404).json({
      success: false,
      message: 'Car not found'
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: 'Car deleted successfully'
  });
};
