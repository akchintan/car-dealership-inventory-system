import { Request, Response } from 'express';
import User from '../models/user.model';

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as Request & { user: { id: string } }).user.id;
  const user = await User.findById(userId);

  res.status(200).json({
    success: true,
    user
  });
};
