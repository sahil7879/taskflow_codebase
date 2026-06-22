# TaskFlow Architecture

## Overview

TaskFlow is a full-stack web application designed using clean, layered architecture patterns. This document outlines the high-level system design, component interactions, and technology decisions.

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              React Frontend (Port 3000)                 │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │ │
│  │  │  Pages       │  │  Components  │  │  Services    │  │ │
│  │  │  - Login     │  │  - Nav       │  │  - API Calls │  │ │
│  │  │  - Dashboard │  │  - Forms     │  │  - Auth      │  │ │
│  │  │  - Projects  │  │  - Cards     │  │  - Projects  │  │ │
│  │  │  - Tasks     │  │  - Kanban    │  │  - Tasks     │  │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  │ │
│  └──────────────────────────────────────────────────────────┘ │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/REST + JWT
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                     API Layer                                │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │      Express Server (Port 5000)                         │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │ │
│  │  │  Routes      │  │  Controllers │  │  Middleware  │  │ │
│  │  │  - /auth     │  │  - Auth      │  │  - Auth      │  │ │
│  │  │  - /projects │  │  - Projects  │  │  - Error     │  │ │
│  │  │  - /tasks    │  │  - Tasks     │  │  - Logging   │  │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  │ │
│  └──────────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │      Business Logic Layer                               │ │
│  │  ┌──────────────┐  ┌──────────────┐                     │ │
│  │  │  Services    │  │  Repositories│                     │ │
│  │  │  - Auth      │  │  - User      │                     │ │
│  │  │  - Projects  │  │  - Project   │                     │ │
│  │  │  - Tasks     │  │  - Task      │                     │ │
│  │  └──────────────┘  └──────────────┘                     │ │
│  └──────────────────────────────────────────────────────────┘ │
└──────────────────────┬──────────────────────────────────────┘
                       │ SQL
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                     Data Layer                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  PostgreSQL Database (Port 5432)                        │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │ │
│  │  │  users       │  │  projects    │  │  tasks       │  │ │
│  │  │  - id        │  │  - id        │  │  - id        │  │ │
│  │  │  - username  │  │  - name      │  │  - title     │  │ │
│  │  │  - email     │  │  - desc      │  │  - status    │  │ │
│  │  │  - password  │  │  - user_id   │  │  - proj_id   │  │ │
│  │  │  - created   │  │  - created   │  │  - created   │  │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  │ │
│  └──────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Frontend Architecture

### Directory Structure
```
frontend/src/
├── pages/               # Page-level components (screens)
│   ├── LoginPage.tsx    # Authentication screen
│   ├── DashboardPage.tsx# Overview and statistics
│   ├── ProjectsPage.tsx # Project listing and creation
│   └── TasksPage.tsx    # Task management and Kanban
│
├── components/          # Reusable UI components
│   ├── Navigation.tsx   # Main navigation bar
│   └── ProtectedRoute.tsx# Route protection wrapper
│
├── services/            # API communication layer
│   ├── apiClient.ts     # Axios instance with interceptors
│   ├── authService.ts   # Authentication API calls
│   ├── projectService.ts# Project API calls
│   └── taskService.ts   # Task API calls
│
├── hooks/               # Custom React hooks
│   └── useAuth.ts       # Authentication state management
│
├── types/               # TypeScript interfaces
│   └── index.ts         # Shared type definitions
│
├── styles/              # CSS modules and global styles
│   ├── index.css        # Global styles
│   ├── auth.css         # Login page styles
│   ├── navigation.css   # Navigation styles
│   ├── dashboard.css    # Dashboard styles
│   ├── projects.css     # Projects page styles
│   └── tasks.css        # Tasks/Kanban styles
│
├── App.tsx              # Main app component with routing
└── main.tsx             # React entry point
```

### Key Components

**LoginPage**: Handles user authentication with JWT token management
- Input validation
- Error handling
- Demo credentials support
- Token storage in localStorage

**DashboardPage**: Displays project and task overview
- Real-time statistics
- Task status breakdown
- Project count

**ProjectsPage**: Project management interface
- Create new projects
- Display project list
- Navigate to project details

**TasksPage**: Kanban board for task management
- Organize tasks by status (Todo, In Progress, Done)
- Drag-and-drop interface (future enhancement)
- Quick status updates

### State Management

Frontend state is managed through:
- React hooks (useState, useEffect)
- Custom hooks (useAuth)
- localStorage for auth token and user info
- Service layer for API communication

### API Communication

The `apiClient` service provides:
- Centralized HTTP client configuration
- Automatic JWT token injection in Authorization headers
- Request/response interceptors
- Error handling with auto-logout on 401

## Backend Architecture

### Directory Structure
```
backend/src/
├── routes/              # Express route definitions
│   ├── authRoutes.ts    # /api/auth endpoints
│   ├── projectRoutes.ts # /api/projects endpoints
│   └── taskRoutes.ts    # /api/tasks endpoints
│
├── controllers/         # Request handlers
│   ├── AuthController.ts    # Auth logic
│   ├── ProjectController.ts # Project logic
│   └── TaskController.ts    # Task logic
│
├── services/            # Business logic layer
│   ├── AuthService.ts   # Authentication logic
│   ├── ProjectService.ts# Project operations
│   └── TaskService.ts   # Task operations
│
├── repositories/        # Data access layer
│   ├── UserRepository.ts    # User data access
│   ├── ProjectRepository.ts # Project data access
│   └── TaskRepository.ts    # Task data access
│
├── models/              # TypeScript type definitions
│   └── types.ts         # Shared interfaces
│
├── middleware/          # Express middleware
│   └── authMiddleware.ts    # JWT verification & error handling
│
├── database/            # Database utilities
│   ├── connection.ts    # PostgreSQL connection pool
│   └── init.ts          # Database schema initialization
│
├── app.ts               # Express app configuration
└── index.ts             # Server entry point
```

### Request Flow

```
HTTP Request
    ↓
Routes (Express routing)
    ↓
Middleware (Authentication, error handling)
    ↓
Controllers (Extract and validate input)
    ↓
Services (Business logic and validation)
    ↓
Repositories (Database queries)
    ↓
PostgreSQL
    ↓
Response → HTTP
```

### Layer Responsibilities

**Routes**: Define API endpoints and HTTP methods
```typescript
router.post('/login', (req, res) => authController.login(req, res));
```

**Controllers**: Handle HTTP requests/responses
```typescript
async login(req, res) {
  const { username, password } = req.body;
  const result = await authService.authenticate(username, password);
  res.json(result);
}
```

**Services**: Implement business logic
```typescript
async authenticate(username: string, password: string) {
  const user = await userRepository.findByUsername(username);
  // Validate password, create JWT token
  return { token, user };
}
```

**Repositories**: Handle database operations
```typescript
async findByUsername(username: string): Promise<User | null> {
  const result = await pool.query(
    'SELECT * FROM users WHERE username = $1',
    [username]
  );
  return result.rows[0] || null;
}
```

### Authentication Flow

1. User submits credentials to `/api/auth/login`
2. AuthController validates input
3. AuthService:
   - Finds user in database
   - Compares password with bcrypt
   - Creates JWT token
4. Client stores token in localStorage
5. Subsequent requests include token in Authorization header
6. authMiddleware verifies token and attaches userId to request

### Error Handling

- Controllers catch service errors
- Services throw descriptive errors
- Middleware catches all errors and returns appropriate HTTP status codes
- Frontend displays errors to user

## Database Design

### Schema Design

**Users Table**
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Projects Table**
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

**Tasks Table**
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

### Indexing Strategy

- Primary keys on all tables
- Foreign key constraints for referential integrity
- Index on `projects.user_id` for efficient user queries
- Index on `tasks.project_id` for project task queries
- Index on `tasks.status` for status filtering

### Data Relationships

- One user can have many projects (1:N)
- One project can have many tasks (1:N)
- Tasks belong to exactly one project
- Projects belong to exactly one user

## API Design

### RESTful Principles

- **Resources**: Users, Projects, Tasks
- **HTTP Methods**: GET (read), POST (create), PUT (update), DELETE (remove)
- **Status Codes**: 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 500 (Server Error)

### Authentication

- JWT-based stateless authentication
- Token included in `Authorization: Bearer <token>` header
- 7-day expiration (configurable)
- Automatic refresh on valid operations

### Response Format

Consistent JSON responses:
```json
{
  "id": 1,
  "username": "demo",
  "email": "demo@taskflow.local",
  "created_at": "2024-01-01T00:00:00Z"
}
```

Errors:
```json
{
  "error": "Invalid credentials"
}
```

## Infrastructure

### Docker Compose Setup

Services:
- **postgres**: PostgreSQL 15 database
- **backend**: Express API server
- **frontend**: React application

Volume Management:
- `postgres_data`: Persistent database storage
- Source code mounted for hot reloading in development

Health Checks:
- PostgreSQL health check to ensure database readiness
- Backend depends on PostgreSQL health

### Networking

Services communicate via Docker network:
- Frontend → Backend: `http://backend:5000`
- Backend → PostgreSQL: `postgres:5432`

### Environment Variables

Configuration through `.env` files:
- Database credentials
- JWT secrets
- API base URLs
- Node environment (development/production)

## Scalability Considerations

### For Future Growth

1. **Database**
   - Add database indexes for frequently queried fields
   - Implement connection pooling
   - Consider partitioning for large task tables

2. **API**
   - Add caching layer (Redis)
   - Implement rate limiting
   - Add request logging and monitoring
   - Load balancing for multiple instances

3. **Frontend**
   - Code splitting and lazy loading
   - Progressive Web App (PWA) support
   - Offline capabilities

4. **Features**
   - Task assignment and notifications
   - Real-time updates with WebSockets
   - File attachments
   - Activity audit logs
   - User roles and permissions

## Development Workflow

### Code Organization

- Clear separation of concerns
- Single responsibility principle
- DRY (Don't Repeat Yourself)
- Consistent naming conventions

### Type Safety

- TypeScript for all code
- Strict type checking enabled
- Shared type definitions

### Code Quality

- ESLint for code style
- Prettier for formatting
- Unit tests for critical paths
- Integration tests for API endpoints

## Deployment Considerations

### Environment-Specific Configuration

- Development: Hot reload, verbose logging
- Production: Optimized builds, security headers

### Security

- Password hashing with bcrypt
- JWT for stateless authentication
- CORS configuration
- Environment variable secrets management
- SQL parameterization to prevent injection

### Performance

- Database connection pooling
- Caching strategies
- Frontend bundle optimization
- Lazy loading of routes

## Future Architecture Enhancements

1. **Microservices**: Split backend into services (auth, projects, tasks)
2. **Message Queue**: Add Redis for notifications and async processing
3. **Search**: Implement Elasticsearch for full-text task search
4. **Real-time**: WebSocket support for live updates
5. **Analytics**: Event tracking and dashboards
6. **Monitoring**: Logging, tracing, and performance monitoring
