import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/auth.css';

export const LoginPage = () => {
  const [username, setUsername] = useState('demo');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      // Error is handled by useAuth hook
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>TaskFlow</h1>
        <p className="subtitle">Project Management Platform</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="demo-hint">
          <p>Demo Credentials:</p>
          <p>Username: <strong>demo</strong></p>
          <p>Password: <strong>demo</strong></p>
        </div>
      </div>
    </div>
  );
};
