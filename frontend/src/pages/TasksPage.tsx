import { useEffect, useState } from 'react';
import { taskService } from '../services/taskService';
import { projectService } from '../services/projectService';
import { Task, Project } from '../types';
import '../styles/tasks.css';

export const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    projectId: '',
    title: '',
    description: '',
    status: 'todo',
  });

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const data = await projectService.getAllProjects();
      setProjects(data);
      if (data.length > 0) {
        setFormData((prev) => ({ ...prev, projectId: String(data[0].id) }));
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newTask = await taskService.createTask(
        parseInt(formData.projectId),
        formData.title,
        formData.description,
        formData.status
      );
      setTasks([newTask, ...tasks]);
      setFormData({ projectId: '', title: '', description: '', status: 'todo' });
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleStatusChange = async (taskId: number, newStatus: string) => {
    try {
      const updated = await taskService.updateTaskStatus(taskId, newStatus);
      setTasks(tasks.map((t) => (t.id === taskId ? updated : t)));
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  if (isLoading) return <div className="loading">Loading...</div>;

  const todoTasks = tasks.filter((t) => t.status === 'todo');
  const inProgressTasks = tasks.filter((t) => t.status === 'in_progress');
  const doneTasks = tasks.filter((t) => t.status === 'done');

  return (
    <div className="tasks">
      <div className="tasks-header">
        <h1>Tasks</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'New Task'}
        </button>
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
            value={formData.projectId}
            onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
            required
          >
            <option value="" disabled>
              Select a project
            </option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="todo">Todo</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button type="submit" className="btn-primary">Create</button>
        </form>
      )}

      <div className="kanban-board">
        <div className="kanban-column">
          <h3>Todo ({todoTasks.length})</h3>
          <div className="task-list">
            {todoTasks.map((task) => (
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
        </div>

        <div className="kanban-column">
          <h3>In Progress ({inProgressTasks.length})</h3>
          <div className="task-list">
            {inProgressTasks.map((task) => (
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
        </div>

        <div className="kanban-column">
          <h3>Done ({doneTasks.length})</h3>
          <div className="task-list">
            {doneTasks.map((task) => (
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
        </div>
      </div>
    </div>
  );
};
