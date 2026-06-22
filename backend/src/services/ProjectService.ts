import { projectRepository } from '../repositories/ProjectRepository';
import { Project } from '../models/types';

export class ProjectService {
  async getProjectById(id: number): Promise<Project> {
    const project = await projectRepository.findById(id);
    if (!project) {
      throw new Error('Project not found');
    }
    return project;
  }

  async getProjectsByUserId(userId: number): Promise<Project[]> {
    return projectRepository.findByUserId(userId);
  }

  async getAllProjects(): Promise<Project[]> {
    return projectRepository.getAll();
  }

  async createProject(name: string, description: string | null, userId: number): Promise<Project> {
    if (!name || name.trim() === '') {
      throw new Error('Project name is required');
    }
    return projectRepository.create(name, description, userId);
  }

  async updateProject(id: number, name: string, description: string | null): Promise<Project> {
    if (!name || name.trim() === '') {
      throw new Error('Project name is required');
    }
    const updated = await projectRepository.update(id, name, description);
    if (!updated) {
      throw new Error('Project not found');
    }
    return updated;
  }

  async deleteProject(id: number): Promise<void> {
    const deleted = await projectRepository.delete(id);
    if (!deleted) {
      throw new Error('Project not found');
    }
  }
}

export const projectService = new ProjectService();
