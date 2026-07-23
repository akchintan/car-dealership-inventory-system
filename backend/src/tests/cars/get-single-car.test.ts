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
    findById: jest.fn()
  }
}));

describe('GET /api/cars/:id', () => {
  it('returns a single car by id', async () => {
    const carId = '123456789';
    const car = {
      _id: '123456789',
      brand: 'Toyota',
      model: 'Camry',
      year: 2024,
      price: 2500000,
      mileage: 15,
      status: 'available'
    };
    const mockedFindById = Car.findById as jest.Mock;
    mockedFindById.mockResolvedValue(car);

    const response = await request(app).get(`/api/cars/${carId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      car: expect.any(Object)
    });
    expect(mockedFindById).toHaveBeenCalledWith(carId);
    expect(response.body.car).toEqual(car);
  });
});
