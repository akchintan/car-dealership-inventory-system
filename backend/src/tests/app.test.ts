import request from 'supertest';
import app from '../app';

describe('GET /', () => {
  it('returns the API running message', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Car Dealership Inventory API is running'
    });
  });
});
