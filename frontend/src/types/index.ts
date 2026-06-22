export interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

export interface Project {
  id: number;
  name: string;
  description?: string;
  user_id: number;
  created_at: string;
}

export interface Task {
  id: number;
  project_id: number;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'done';
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface DashboardStats {
  totalProjects: number;
  totalTasks: number;
  tasksByStatus: Array<{ status: string; count: number }>;
}
