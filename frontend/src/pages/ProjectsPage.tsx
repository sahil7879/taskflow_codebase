import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectService } from '../services/projectService';
import { Project } from '../types';
import '../styles/projects.css';

export const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await projectService.getAllProjects();
      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newProject = await projectService.createProject(formData.name, formData.description);
      setProjects([newProject, ...projects]);
      setFormData({ name: '', description: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="projects">
      <div className="projects-header">
        <h1>Projects</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'New Project'}
        </button>
      </div>

      {showForm && (
        <form className="project-form" onSubmit={handleCreateProject}>
          <input
            type="text"
            placeholder="Project name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <button type="submit" className="btn-primary">Create</button>
        </form>
      )}

      <div className="projects-grid">
        {projects.map((project) => (
          <Link key={project.id} to={`/projects/${project.id}`} className="project-card">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <small>{new Date(project.created_at).toLocaleDateString()}</small>
          </Link>
        ))}
      </div>

      {projects.length === 0 && (
        <p className="empty-state">No projects yet. Create one to get started!</p>
      )}
    </div>
  );
};
