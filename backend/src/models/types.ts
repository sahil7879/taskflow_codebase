export interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
  created_at: Date;
}

export interface Project {
  id: number;
  name: string;
  description?: string;
  user_id: number;
  created_at: Date;
}

export interface Task {
  id: number;
  project_id: number;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'done';
  created_at: Date;
  updated_at: Date;
}

export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: Omit<User, 'password'>;
}
