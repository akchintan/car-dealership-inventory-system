import { NextFunction, Request, Response } from 'express';
import request from 'supertest';
import app from '../../app';
import Car from '../../models/car.model';

jest.mock('../../middleware/auth.middleware', () => ({
  __esModule: true,
  default: (_req: Request, _res: Response, next: NextFunction) => next()
}));

jest.mock('../../models/car.model', () => ({
  __esModule: true,
  default: {
    findByIdAndUpdate: jest.fn()
  }
}));

describe('PUT /api/cars/:id', () => {
  it('updates a car by id', async () => {
    const carId = '123456789';
    const updateData = {
      price: 2700000,
      status: 'sold'
    };
    const updatedCar = {
      _id: '123456789',
      brand: 'Toyota',
      model: 'Camry',
      year: 2024,
      price: 2700000,
      mileage: 15,
      status: 'sold'
    };
    const mockedFindByIdAndUpdate = Car.findByIdAndUpdate as jest.Mock;
    mockedFindByIdAndUpdate.mockResolvedValue(updatedCar);

    const response = await request(app).put(`/api/cars/${carId}`).send(updateData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      car: expect.any(Object)
    });
    expect(mockedFindByIdAndUpdate).toHaveBeenCalledWith(carId, updateData);
    expect(response.body.car).toEqual(updatedCar);
  });
});
