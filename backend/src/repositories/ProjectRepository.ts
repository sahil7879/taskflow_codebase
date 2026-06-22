import pool from '../database/connection';
import { Project } from '../models/types';

export class ProjectRepository {
  async findById(id: number): Promise<Project | null> {
    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async findByUserId(userId: number): Promise<Project[]> {
    const result = await pool.query(
      'SELECT * FROM projects WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return result.rows;
  }

  async create(name: string, description: string | null, userId: number): Promise<Project> {
    const result = await pool.query(
      'INSERT INTO projects (name, description, user_id) VALUES ($1, $2, $3) RETURNING *',
      [name, description, userId]
    );
    return result.rows[0];
  }

  async getAll(): Promise<Project[]> {
    const result = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    return result.rows;
  }

  async update(id: number, name: string, description: string | null): Promise<Project | null> {
    const result = await pool.query(
      'UPDATE projects SET name = $1, description = $2 WHERE id = $3 RETURNING *',
      [name, description, id]
    );
    return result.rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM projects WHERE id = $1', [id]);
    return result.rowCount ? result.rowCount > 0 : false;
  }
}

export const projectRepository = new ProjectRepository();
