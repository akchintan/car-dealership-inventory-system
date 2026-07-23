import { Request, Response } from 'express';

export const registerUser = (req: Request, res: Response): void => {
  if (typeof req.body.name !== 'string' || req.body.name.trim() === '') {
    res.status(400).json({
      success: false,
      message: 'Name is required'
    });
    return;
  }

  if (typeof req.body.email !== 'string' || req.body.email.trim() === '') {
    res.status(400).json({
      success: false,
      message: 'Email is required'
    });
    return;
  }

  res.status(201).json({
    success: true,
    message: 'User registered successfully'
  });
};
