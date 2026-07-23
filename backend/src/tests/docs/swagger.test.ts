import request from 'supertest';
import app from '../../app';

describe('Swagger API documentation', () => {
  it('serves Swagger UI at GET /api-docs/', async () => {
    const response = await request(app).get('/api-docs/');

    expect(response.status).toBe(200);
    expect(response.text).toContain('Swagger UI');
  });
});
