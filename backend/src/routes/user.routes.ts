import { Router } from 'express';
import { getProfile } from '../controllers/user.controller';
import authMiddleware from '../middleware/auth.middleware';

const userRouter = Router();

userRouter.get('/me', authMiddleware, getProfile);

export default userRouter;
