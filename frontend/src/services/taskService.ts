import apiClient from './apiClient';
import { Task, DashboardStats } from '../types';

export const taskService = {
  async getAllTasks(): Promise<Task[]> {
    const { data } = await apiClient.get('/tasks');
    return data;
  },

  async getTaskById(id: number): Promise<Task> {
    const { data } = await apiClient.get(`/tasks/${id}`);
    return data;
  },

  async getTasksByProjectId(projectId: number): Promise<Task[]> {
    const { data } = await apiClient.get(`/tasks/project/${projectId}`);
    return data;
  },

  async createTask(
    projectId: number,
    title: string,
    description?: string,
    status: string = 'todo'
  ): Promise<Task> {
    const { data } = await apiClient.post('/tasks', {
      projectId,
      title,
      description,
      status,
    });
    return data;
  },

  async updateTask(id: number, title: string, description?: string, status?: string): Promise<Task> {
    const { data } = await apiClient.put(`/tasks/${id}`, {
      title,
      description,
      status,
    });
    return data;
  },

  async updateTaskStatus(id: number, status: string): Promise<Task> {
    const { data } = await apiClient.put(`/tasks/${id}/status`, { status });
    return data;
  },

  async deleteTask(id: number): Promise<void> {
    await apiClient.delete(`/tasks/${id}`);
  },

  async getDashboardStats(): Promise<DashboardStats> {
    const { data } = await apiClient.get('/tasks/stats/dashboard');
    return data;
  },
};
