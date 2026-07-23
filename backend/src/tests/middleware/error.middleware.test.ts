import express, { Request, Response } from 'express';
import request from 'supertest';
import errorMiddleware from '../../middleware/error.middleware';

const app = express();

app.get('/api/test-error', (_req: Request, _res: Response) => {
  throw new Error('Test error');
});

app.use(errorMiddleware);

describe('global error middleware', () => {
  it('catches thrown errors and returns the standard error response', async () => {
    const response = await request(app).get('/api/test-error');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      success: false,
      message: 'Test error'
    });
  });
});
