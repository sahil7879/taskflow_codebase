import apiClient from './apiClient';
import { AuthResponse, User } from '../types';

export const authService = {
  async login(username: string, password: string): Promise<AuthResponse> {
    const { data } = await apiClient.post('/auth/login', { username, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  },

  async register(username: string, email: string, password: string): Promise<User> {
    const { data } = await apiClient.post('/auth/register', {
      username,
      email,
      password,
    });
    return data;
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },
};
