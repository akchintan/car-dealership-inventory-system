import { NextFunction, Request, Response } from 'express';
import request from 'supertest';
import app from '../../app';
import User from '../../models/user.model';

jest.mock('../../middleware/auth.middleware', () => ({
  __esModule: true,
  default: (
    req: Request & { user?: { id: string } },
    _res: Response,
    next: NextFunction
  ) => {
    req.user = { id: '123' };
    next();
  }
}));

jest.mock('../../models/user.model', () => ({
  __esModule: true,
  default: {
    findById: jest.fn()
  }
}));

describe('GET /api/users/me', () => {
  it('returns the authenticated user profile', async () => {
    const mockedFindById = User.findById as jest.Mock;
    mockedFindById.mockResolvedValue({
      id: '123',
      name: 'John Doe',
      email: 'john@example.com'
    });

    const response = await request(app).get('/api/users/me');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      user: expect.any(Object)
    });
    expect(mockedFindById).toHaveBeenCalledWith('123');
  });
});
