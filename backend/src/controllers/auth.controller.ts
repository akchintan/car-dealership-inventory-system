import { Request, Response } from 'express';

export const registerUser = (_req: Request, res: Response): void => {
  res.status(201).json({
    success: true,
    message: 'User registered successfully'
  });
};
