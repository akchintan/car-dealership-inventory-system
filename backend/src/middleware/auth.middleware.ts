import { NextFunction, Request, Response } from 'express';

const jwt = require('jsonwebtoken');

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    res.status(401).json({
      success: false,
      message: 'Not authorized'
    });
    return;
  }

  const token = authorizationHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET || 'secret');
  next();
};

export default authMiddleware;
