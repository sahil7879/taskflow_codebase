import { Response } from 'express';
import { projectService } from '../services/ProjectService';
import { AuthRequest } from '../middleware/authMiddleware';

export class ProjectController {
  async getAll(req: AuthRequest, res: Response) {
    try {
      const projects = await projectService.getAllProjects();
      res.json(projects);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const project = await projectService.getProjectById(parseInt(id, 10));
      res.json(project);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async getByUserId(req: AuthRequest, res: Response) {
    try {
      if (!req.userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const projects = await projectService.getProjectsByUserId(req.userId);
      res.json(projects);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req: AuthRequest, res: Response) {
    try {
      if (!req.userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { name, description } = req.body;
      const project = await projectService.createProject(name, description, req.userId);
      res.status(201).json(project);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const project = await projectService.updateProject(parseInt(id, 10), name, description);
      res.json(project);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      await projectService.deleteProject(parseInt(id, 10));
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}

export const projectController = new ProjectController();
