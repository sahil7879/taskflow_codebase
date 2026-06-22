import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/navigation.css';

export const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">TaskFlow</Link>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
        <li>
          <Link to="/tasks">Tasks</Link>
        </li>
      </ul>

      <div className="nav-user">
        <span className="username">{user.username}</span>
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </div>
    </nav>
  );
};
