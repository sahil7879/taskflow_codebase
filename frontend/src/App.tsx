import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailsPage } from './pages/ProjectDetailsPage';
import { TasksPage } from './pages/TasksPage';
import { Navigation } from './components/Navigation';
import { ProtectedRoute } from './components/ProtectedRoute';
import './styles/index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div>
                <Navigation />
                <Routes>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/projects/:id" element={<ProjectDetailsPage />} />
                  <Route path="/tasks" element={<TasksPage />} />
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
