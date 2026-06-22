import { Response } from 'express';
import { authService } from '../services/AuthService';
import { AuthRequest } from '../middleware/authMiddleware';

export class AuthController {
  async login(req: AuthRequest, res: Response) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
      }

      const result = await authService.authenticate(username, password);
      res.json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  async register(req: AuthRequest, res: Response) {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required' });
      }

      const user = await authService.registerUser(username, email, password);
      res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.created_at,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export const authController = new AuthController();
