# TaskFlow

TaskFlow is a lightweight, Jira-style project and task management platform built as a modern full-stack application. It demonstrates clean architecture, enterprise patterns, and best practices suitable for team collaboration and project tracking.

## Version 1 Features

- **User Authentication**: JWT-based login system
- **Project Management**: Create and manage projects
- **Task Management**: Track tasks with status management (Todo, In Progress, Done)
- **Dashboard**: Overview of projects and task statistics
- **Kanban Board**: Visual task management by status

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **React Router** for navigation
- **Vite** for fast build and development
- **Axios** for HTTP requests
- **CSS** for styling

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **PostgreSQL** for data persistence
- **JWT** for authentication
- **bcrypt** for password hashing

### Infrastructure
- **Docker** & **Docker Compose** for containerization

## Project Structure

```
taskflow-codebase/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── pages/           # Page components
│   │   ├── components/      # Reusable components
│   │   ├── services/        # API service layer
│   │   ├── hooks/           # Custom React hooks
│   │   ├── types/           # TypeScript types
│   │   ├── styles/          # CSS styling
│   │   ├── App.tsx          # Main app component
│   │   └── main.tsx         # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── Dockerfile
│
├── backend/                  # Express backend API
│   ├── src/
│   │   ├── routes/          # API route definitions
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic
│   │   ├── repositories/    # Data access layer
│   │   ├── models/          # TypeScript types
│   │   ├── middleware/      # Express middleware
│   │   ├── database/        # Database connection & init
│   │   ├── app.ts           # Express app setup
│   │   └── index.ts         # Server entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
│
├── docker-compose.yml       # Docker Compose configuration
└── docs/                    # Documentation
    └── architecture.md      # Architecture documentation
```

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 15+ (or use Docker)
- npm

### Local Development

1. **Clone and navigate to the project:**
   ```bash
   cd taskflow-codebase
   ```

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   npm run dev
   ```

3. **In a new terminal, setup Frontend:**
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   npm run dev
   ```

4. **Initialize database (from backend directory):**
   ```bash
   npm run db:init
   ```

5. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api
   - Login with demo credentials: `demo` / `demo`

### Docker Deployment

1. **Start all services:**
   ```bash
   docker-compose up --build
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

3. **Initialize database:**
   ```bash
   docker-compose exec backend npm run db:init
   ```

## API Overview

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Projects
- `GET /api/projects` - List all projects
- `GET /api/projects/:id` - Get project by ID
- `GET /api/projects/user/me` - Get user's projects
- `POST /api/projects` - Create project (requires auth)
- `PUT /api/projects/:id` - Update project (requires auth)
- `DELETE /api/projects/:id` - Delete project (requires auth)

### Tasks
- `GET /api/tasks` - List all tasks
- `GET /api/tasks/:id` - Get task by ID
- `GET /api/tasks/project/:projectId` - Get tasks by project
- `GET /api/tasks/stats/dashboard` - Get dashboard statistics
- `POST /api/tasks` - Create task (requires auth)
- `PUT /api/tasks/:id` - Update task (requires auth)
- `PUT /api/tasks/:id/status` - Update task status (requires auth)
- `DELETE /api/tasks/:id` - Delete task (requires auth)

## Database Schema

### Users
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Projects
```sql
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Tasks
```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'todo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);
```

## Development

### Code Quality
- **Linting**: `npm run lint`
- **Formatting**: `npm run format`

### Testing
- **Backend**: `npm run test`
- **Frontend**: `npm run test`

### Building for Production
- **Backend**: `npm run build`
- **Frontend**: `npm run build`

## Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://taskflow:taskflow@localhost:5432/taskflow
DB_HOST=localhost
DB_PORT=5432
DB_NAME=taskflow
DB_USER=taskflow
DB_PASSWORD=taskflow
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRY=7d
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Architecture

TaskFlow follows a layered architecture pattern:

**Frontend:**
- Pages (UI screens)
- Components (reusable UI elements)
- Services (API communication)
- Hooks (state management)
- Types (TypeScript interfaces)

**Backend:**
- Routes (endpoint definitions)
- Controllers (request handlers)
- Services (business logic)
- Repositories (data access)
- Models (data types)
- Middleware (request/response processing)

## Future Enhancements

Planned features for future versions:
- Task assignment and comments
- Task labels and filtering
- User roles and RBAC
- Push notifications
- Audit logging
- Sprint planning
- Performance improvements
- Enhanced testing coverage
- Claude Code integrations

## Demo Credentials

The application comes pre-seeded with demo data:
- **Username**: `demo`
- **Password**: `demo`

Sample projects and tasks are created for testing the application.

## Contributing

This is a training and demonstration project. For contributions, please follow standard Git workflows and maintain code quality with linting and formatting.

## License

MIT License - See LICENSE file for details

## Support

For issues, questions, or suggestions, please review the documentation in `/docs` folder or check the architecture guide for implementation details.
