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
    find: jest.fn()
  }
}));

describe('GET /api/cars?brand=Toyota&status=available', () => {
  it('searches and filters cars by brand and status', async () => {
    const filters = {
      brand: 'Toyota',
      status: 'available'
    };
    const cars = [
      {
        brand: 'Toyota',
        model: 'Camry',
        year: 2024,
        price: 2500000,
        mileage: 15,
        status: 'available'
      }
    ];
    const mockedFind = Car.find as jest.Mock;
    mockedFind.mockResolvedValue(cars);

    const response = await request(app).get('/api/cars?brand=Toyota&status=available');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      cars: expect.any(Array)
    });
    expect(mockedFind).toHaveBeenCalledWith(filters);
  });
});
