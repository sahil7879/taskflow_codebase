import pool from '../database/connection';
import { Task } from '../models/types';

export class TaskRepository {
  async findById(id: number): Promise<Task | null> {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async findByProjectId(projectId: number): Promise<Task[]> {
    const result = await pool.query(
      'SELECT * FROM tasks WHERE project_id = $1 ORDER BY created_at DESC',
      [projectId]
    );
    return result.rows;
  }

  async create(
    projectId: number,
    title: string,
    description: string | null,
    status: string = 'todo'
  ): Promise<Task> {
    const result = await pool.query(
      'INSERT INTO tasks (project_id, title, description, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [projectId, title, description, status]
    );
    return result.rows[0];
  }

  async updateStatus(id: number, status: string): Promise<Task | null> {
    const result = await pool.query(
      'UPDATE tasks SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, id]
    );
    return result.rows[0] || null;
  }

  async update(
    id: number,
    title: string,
    description: string | null,
    status: string
  ): Promise<Task | null> {
    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, status = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
      [title, description, status, id]
    );
    return result.rows[0] || null;
  }

  async getAll(): Promise<Task[]> {
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    return result.rows;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    return result.rowCount ? result.rowCount > 0 : false;
  }

  async getByStatus(status: string): Promise<Task[]> {
    const result = await pool.query(
      'SELECT * FROM tasks WHERE status = $1 ORDER BY created_at DESC',
      [status]
    );
    return result.rows;
  }

  async getTaskCountByStatus(): Promise<{ status: string; count: number }[]> {
    const result = await pool.query(
      'SELECT status, COUNT(*) as count FROM tasks GROUP BY status'
    );
    return result.rows.map((row) => ({
      status: row.status,
      count: parseInt(row.count, 10),
    }));
  }
}

export const taskRepository = new TaskRepository();
