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
    find: jest.fn(),
    countDocuments: jest.fn()
  }
}));

describe('GET /api/cars?page=1&limit=10', () => {
  it('returns a paginated list of cars', async () => {
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
    const mockedCountDocuments = Car.countDocuments as jest.Mock;
    const query = {
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(cars)
    };
    mockedFind.mockReturnValue(query);
    mockedCountDocuments.mockResolvedValue(cars.length);

    const response = await request(app).get('/api/cars?page=1&limit=10');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      cars: expect.any(Array),
      page: 1,
      limit: 10,
      total: expect.any(Number)
    });
    expect(mockedFind).toHaveBeenCalled();
    expect(query.skip).toHaveBeenCalledWith(0);
    expect(query.limit).toHaveBeenCalledWith(10);
    expect(mockedCountDocuments).toHaveBeenCalled();
  });
});
