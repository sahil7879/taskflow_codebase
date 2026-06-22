import apiClient from './apiClient';
import { Project } from '../types';

export const projectService = {
  async getAllProjects(): Promise<Project[]> {
    const { data } = await apiClient.get('/projects');
    return data;
  },

  async getUserProjects(): Promise<Project[]> {
    const { data } = await apiClient.get('/projects/user/me');
    return data;
  },

  async getProjectById(id: number): Promise<Project> {
    const { data } = await apiClient.get(`/projects/${id}`);
    return data;
  },

  async createProject(name: string, description?: string): Promise<Project> {
    const { data } = await apiClient.post('/projects', { name, description });
    return data;
  },

  async updateProject(id: number, name: string, description?: string): Promise<Project> {
    const { data } = await apiClient.put(`/projects/${id}`, { name, description });
    return data;
  },

  async deleteProject(id: number): Promise<void> {
    await apiClient.delete(`/projects/${id}`);
  },
};
