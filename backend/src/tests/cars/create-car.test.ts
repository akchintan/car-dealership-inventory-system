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
    create: jest.fn()
  }
}));

describe('POST /api/cars', () => {
  it('creates a car successfully', async () => {
    const carData = {
      brand: 'Toyota',
      model: 'Camry',
      year: 2024,
      price: 2500000,
      mileage: 15,
      status: 'available'
    };
    const mockedCreate = Car.create as jest.Mock;
    mockedCreate.mockResolvedValue(carData);

    const response = await request(app).post('/api/cars').send(carData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      success: true,
      car: expect.any(Object)
    });
    expect(mockedCreate).toHaveBeenCalledWith(carData);
  });
});
