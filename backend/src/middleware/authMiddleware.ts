import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/AuthService';

export interface AuthRequest extends Request {
  userId?: number;
  username?: string;
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = await authService.verifyToken(token);
    req.userId = decoded.id;
    req.username = decoded.username;

    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err.message === 'Invalid credentials') {
    return res.status(401).json({ error: err.message });
  }

  if (err.message.includes('not found')) {
    return res.status(404).json({ error: err.message });
  }

  res.status(500).json({ error: 'Internal server error' });
};
