import { Response } from 'express';
import { taskService } from '../services/TaskService';
import { AuthRequest } from '../middleware/authMiddleware';

export class TaskController {
  async getAll(req: AuthRequest, res: Response) {
    try {
      const tasks = await taskService.getAllTasks();
      res.json(tasks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const task = await taskService.getTaskById(parseInt(id, 10));
      res.json(task);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async getByProjectId(req: AuthRequest, res: Response) {
    try {
      const { projectId } = req.params;
      const tasks = await taskService.getTasksByProjectId(parseInt(projectId, 10));
      res.json(tasks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req: AuthRequest, res: Response) {
    try {
      const { projectId, title, description, status } = req.body;

      if (!projectId) {
        return res.status(400).json({ error: 'Project ID is required' });
      }

      const task = await taskService.createTask(projectId, title, description, status);
      res.status(201).json(task);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateStatus(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ error: 'Status is required' });
      }

      const task = await taskService.updateTaskStatus(parseInt(id, 10), status);
      res.json(task);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { title, description, status } = req.body;
      const task = await taskService.updateTask(parseInt(id, 10), title, description, status);
      res.json(task);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      await taskService.deleteTask(parseInt(id, 10));
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async getDashboardStats(req: AuthRequest, res: Response) {
    try {
      const stats = await taskService.getDashboardStats();
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export const taskController = new TaskController();
