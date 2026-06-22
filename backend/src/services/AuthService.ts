import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/UserRepository';
import { User, AuthResponse } from '../models/types';

export class AuthService {
  async authenticate(username: string, password: string): Promise<AuthResponse> {
    const user = await userRepository.findByUsername(username);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password || '');
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const signOptions: jwt.SignOptions = {
      expiresIn: (process.env.JWT_EXPIRY || '7d') as jwt.SignOptions['expiresIn'],
    };
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'secret',
      signOptions
    );

    const { password: _, ...userWithoutPassword } = user;

    return {
      token,
      user: userWithoutPassword as Omit<User, 'password'>,
    };
  }

  async verifyToken(token: string): Promise<{ id: number; username: string }> {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      return decoded as { id: number; username: string };
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  async registerUser(username: string, email: string, password: string): Promise<User> {
    const existingUser = await userRepository.findByUsername(username);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return userRepository.create(username, email, hashedPassword);
  }
}

export const authService = new AuthService();
