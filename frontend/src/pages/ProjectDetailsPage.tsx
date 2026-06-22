import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { projectService } from '../services/projectService';
import { taskService } from '../services/taskService';
import { Project, Task } from '../types';
import '../styles/projectDetails.css';

export const ProjectDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = Number(id);

  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', status: 'todo' });

  useEffect(() => {
    fetchProjectData();
  }, [id]);

  const fetchProjectData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [projectData, tasksData] = await Promise.all([
        projectService.getProjectById(projectId),
        taskService.getTasksByProjectId(projectId),
      ]);
      setProject(projectData);
      setTasks(tasksData);
    } catch (err) {
      console.error('Failed to fetch project details:', err);
      setError('Project not found');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newTask = await taskService.createTask(
        projectId,
        formData.title,
        formData.description,
        formData.status
      );
      setTasks([newTask, ...tasks]);
      setFormData({ title: '', description: '', status: 'todo' });
      setShowForm(false);
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  const handleStatusChange = async (taskId: number, newStatus: string) => {
    try {
      const updated = await taskService.updateTaskStatus(taskId, newStatus);
      setTasks(tasks.map((t) => (t.id === taskId ? updated : t)));
    } catch (err) {
      console.error('Failed to update task status:', err);
    }
  };

  if (isLoading) return <div className="loading">Loading...</div>;

  if (error || !project) {
    return (
      <div className="project-details">
        <p className="empty-state">{error || 'Project not found'}</p>
        <Link to="/projects" className="back-link">
          &larr; Back to Projects
        </Link>
      </div>
    );
  }

  const todoCount = tasks.filter((t) => t.status === 'todo').length;
  const inProgressCount = tasks.filter((t) => t.status === 'in_progress').length;
  const doneCount = tasks.filter((t) => t.status === 'done').length;

  return (
    <div className="project-details">
      <Link to="/projects" className="back-link">
        &larr; Back to Projects
      </Link>

      <div className="project-details-header">
        <div>
          <h1>{project.name}</h1>
          <p className="project-description">{project.description}</p>
          <small className="project-meta">
            Created {new Date(project.created_at).toLocaleDateString()}
          </small>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'New Task'}
        </button>
      </div>

      <div className="project-task-summary">
        <span className="summary-pill">Todo: {todoCount}</span>
        <span className="summary-pill">In Progress: {inProgressCount}</span>
        <span className="summary-pill">Done: {doneCount}</span>
      </div>

      {showForm && (
        <form className="task-form" onSubmit={handleCreateTask}>
          <input
            type="text"
            placeholder="Task title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="todo">Todo</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <button type="submit" className="btn-primary">Create Task</button>
        </form>
      )}

      <h2>Tasks</h2>
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(task.id, e.target.value)}
              className="status-select"
            >
              <option value="todo">Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <p className="empty-state">No tasks yet for this project. Create one to get started!</p>
      )}
    </div>
  );
};
