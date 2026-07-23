import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';

const jwt = require('jsonwebtoken');

export const registerUser = async (req: Request, res: Response): Promise<void> => {
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

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
    res.status(400).json({
      success: false,
      message: 'Invalid email format'
    });
    return;
  }

  if (typeof req.body.password !== 'string' || req.body.password.trim() === '') {
    res.status(400).json({
      success: false,
      message: 'Password is required'
    });
    return;
  }

  if (req.body.password.length < 8) {
    res.status(400).json({
      success: false,
      message: 'Password must be at least 8 characters'
    });
    return;
  }

  if (
    !/[A-Z]/.test(req.body.password) ||
    !/[a-z]/.test(req.body.password) ||
    !/\d/.test(req.body.password) ||
    !/[^A-Za-z0-9]/.test(req.body.password)
  ) {
    res.status(400).json({
      success: false,
      message: 'Password must contain uppercase, lowercase, number and special character'
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  res.status(201).json({
    success: true,
    message: 'User registered successfully'
  });
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  await bcrypt.compare(password, user!.password);
  const token = jwt.sign({ id: user!._id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '1d'
  });

  res.status(200).json({
    success: true,
    token
  });
};
