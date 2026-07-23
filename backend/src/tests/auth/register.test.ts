import request from 'supertest';
import app from '../../app';
import User from '../../models/user.model';

jest.mock('../../models/user.model', () => ({
  __esModule: true,
  default: {
    create: jest.fn()
  }
}));

describe('POST /api/auth/register', () => {
  it('registers a user successfully', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123!'
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      success: true,
      message: 'User registered successfully'
    });
  });

  it('creates a user when registration is valid', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'Password123!'
    };
    const mockedCreate = User.create as jest.Mock;
    mockedCreate.mockResolvedValue(userData);

    const response = await request(app).post('/api/auth/register').send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      success: true,
      message: 'User registered successfully'
    });
    expect(mockedCreate).toHaveBeenCalledWith({
      name: userData.name,
      email: userData.email,
      password: userData.password
    });
  });

  it('returns an error when name is missing', async () => {
    const response = await request(app).post('/api/auth/register').send({
      email: 'john@example.com',
      password: 'Password123!'
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: 'Name is required'
    });
  });

  it('returns an error when email is missing', async () => {
    const response = await request(app).post('/api/auth/register').send({
      name: 'John Doe',
      password: 'Password123!'
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: 'Email is required'
    });
  });

  it('returns an error when email format is invalid', async () => {
    const response = await request(app).post('/api/auth/register').send({
      name: 'John Doe',
      email: 'invalid-email',
      password: 'Password123!'
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: 'Invalid email format'
    });
  });

  it('returns an error when password is missing', async () => {
    const response = await request(app).post('/api/auth/register').send({
      name: 'John Doe',
      email: 'john@example.com'
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: 'Password is required'
    });
  });

  it('returns an error when password is too short', async () => {
    const response = await request(app).post('/api/auth/register').send({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123'
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: 'Password must be at least 8 characters'
    });
  });

  it('returns an error when password is weak', async () => {
    const response = await request(app).post('/api/auth/register').send({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: 'Password must contain uppercase, lowercase, number and special character'
    });
  });
});
