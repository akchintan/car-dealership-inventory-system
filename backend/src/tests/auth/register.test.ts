import request from 'supertest';
import app from '../../app';

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
});
