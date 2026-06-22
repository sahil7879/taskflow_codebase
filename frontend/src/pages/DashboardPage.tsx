import { useEffect, useState } from 'react';
import { taskService } from '../services/taskService';
import { projectService } from '../services/projectService';
import { DashboardStats } from '../types';
import '../styles/dashboard.css';

export const DashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [totalProjects, setTotalProjects] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashboardStats, projects] = await Promise.all([
          taskService.getDashboardStats(),
          projectService.getAllProjects(),
        ]);
        setStats(dashboardStats);
        setTotalProjects(projects.length);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Projects</h3>
          <p className="stat-value">{totalProjects}</p>
        </div>

        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p className="stat-value">{stats?.totalTasks || 0}</p>
        </div>

        <div className="stat-card">
          <h3>Tasks by Status</h3>
          <div className="status-breakdown">
            {stats?.tasksByStatus.map((item) => (
              <div key={item.status} className="status-item">
                <span className="status-label">
                  {item.status.replace('_', ' ').charAt(0).toUpperCase() +
                    item.status.replace('_', ' ').slice(1)}
                </span>
                <span className="status-count">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
