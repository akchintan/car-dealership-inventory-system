import bcrypt from 'bcryptjs';
import request from 'supertest';
import app from '../../app';
import User from '../../models/user.model';

jest.mock('../../models/user.model', () => ({
  __esModule: true,
  default: {
    findOne: jest.fn()
  }
}));

jest.mock('bcryptjs', () => ({
  __esModule: true,
  default: {
    compare: jest.fn()
  }
}));

describe('POST /api/auth/login', () => {
  it('logs in an existing user with valid credentials', async () => {
    const user = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashedPassword'
    };
    const mockedFindOne = User.findOne as jest.Mock;
    const mockedCompare = bcrypt.compare as jest.Mock;
    mockedFindOne.mockResolvedValue(user);
    mockedCompare.mockResolvedValue(true);

    const response = await request(app).post('/api/auth/login').send({
      email: 'john@example.com',
      password: 'Password123!'
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      token: expect.any(String)
    });
    expect(mockedFindOne).toHaveBeenCalledWith({ email: 'john@example.com' });
    expect(mockedCompare).toHaveBeenCalledWith('Password123!', 'hashedPassword');
  });
});
