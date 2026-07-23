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
    findByIdAndDelete: jest.fn()
  }
}));

describe('DELETE /api/cars/:id', () => {
  it('deletes a car by id', async () => {
    const carId = '123456789';
    const deletedCar = {
      _id: '123456789',
      brand: 'Toyota',
      model: 'Camry',
      year: 2024,
      price: 2500000,
      mileage: 15,
      status: 'available'
    };
    const mockedFindByIdAndDelete = Car.findByIdAndDelete as jest.Mock;
    mockedFindByIdAndDelete.mockResolvedValue(deletedCar);

    const response = await request(app).delete(`/api/cars/${carId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'Car deleted successfully'
    });
    expect(mockedFindByIdAndDelete).toHaveBeenCalledWith(carId);
  });
});
