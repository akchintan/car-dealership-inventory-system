import express from 'express';
import request from 'supertest';
import authMiddleware from '../../middleware/auth.middleware';

describe('authentication middleware', () => {
  it('rejects a request without an authorization token', async () => {
    const app = express();

    app.get('/api/protected', authMiddleware, (_req, res) => {
      res.status(200).json({ success: true });
    });

    const response = await request(app).get('/api/protected');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      success: false,
      message: 'Not authorized'
    });
  });
});
