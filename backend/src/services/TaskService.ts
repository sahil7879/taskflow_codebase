import { taskRepository } from '../repositories/TaskRepository';
import { Task } from '../models/types';

export class TaskService {
  async getTaskById(id: number): Promise<Task> {
    const task = await taskRepository.findById(id);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  async getTasksByProjectId(projectId: number): Promise<Task[]> {
    return taskRepository.findByProjectId(projectId);
  }

  async getAllTasks(): Promise<Task[]> {
    return taskRepository.getAll();
  }

  async createTask(
    projectId: number,
    title: string,
    description: string | null,
    status?: string
  ): Promise<Task> {
    if (!title || title.trim() === '') {
      throw new Error('Task title is required');
    }
    return taskRepository.create(projectId, title, description, status || 'todo');
  }

  async updateTaskStatus(id: number, status: string): Promise<Task> {
    const validStatuses = ['todo', 'in_progress', 'done'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status');
    }
    const updated = await taskRepository.updateStatus(id, status);
    if (!updated) {
      throw new Error('Task not found');
    }
    return updated;
  }

  async updateTask(
    id: number,
    title: string,
    description: string | null,
    status: string
  ): Promise<Task> {
    if (!title || title.trim() === '') {
      throw new Error('Task title is required');
    }
    const validStatuses = ['todo', 'in_progress', 'done'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status');
    }
    const updated = await taskRepository.update(id, title, description, status);
    if (!updated) {
      throw new Error('Task not found');
    }
    return updated;
  }

  async deleteTask(id: number): Promise<void> {
    const deleted = await taskRepository.delete(id);
    if (!deleted) {
      throw new Error('Task not found');
    }
  }

  async getTaskCountByStatus(): Promise<{ status: string; count: number }[]> {
    return taskRepository.getTaskCountByStatus();
  }

  async getDashboardStats(): Promise<{
    totalProjects: number;
    totalTasks: number;
    tasksByStatus: { status: string; count: number }[];
  }> {
    const projects = await taskRepository.getTaskCountByStatus();
    const allTasks = await taskRepository.getAll();
    const tasksByStatus = await taskRepository.getTaskCountByStatus();

    return {
      totalProjects: 0,
      totalTasks: allTasks.length,
      tasksByStatus,
    };
  }
}

export const taskService = new TaskService();
