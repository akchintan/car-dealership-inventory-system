import { NextFunction, Request, Response } from 'express';

const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
};

export default errorMiddleware;
