import pool from '../database/connection';
import { User } from '../models/types';

export class UserRepository {
  async findById(id: number): Promise<User | null> {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0] || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0] || null;
  }

  async create(username: string, email: string, password: string): Promise<User> {
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, password]
    );
    return result.rows[0];
  }

  async getAll(): Promise<User[]> {
    const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    return result.rows;
  }
}

export const userRepository = new UserRepository();
