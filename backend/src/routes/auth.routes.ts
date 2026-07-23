import { Router } from 'express';

const authRouter = Router();

authRouter.post('/register', (_req, res) => {
  res.status(201).json({
    success: true,
    message: 'User registered successfully'
  });
});

export default authRouter;
