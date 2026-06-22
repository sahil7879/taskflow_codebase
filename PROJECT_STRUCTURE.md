# TaskFlow Project Structure

Complete overview of the TaskFlow v1 starter application.

## Summary

TaskFlow is a full-stack Jira-style project management platform built with:
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL 15
- **Infrastructure**: Docker & Docker Compose

**Total Files Created**: 60+
**Lines of Code**: ~3,500+

## Directory Structure

```
taskflow-codebase/
│
├── 📂 frontend/                           # React Frontend Application
│   ├── 📂 src/
│   │   ├── 📂 pages/                      # Page Components (Full-screen views)
│   │   │   ├── LoginPage.tsx              # Authentication screen
│   │   │   ├── DashboardPage.tsx          # Overview & statistics
│   │   │   ├── ProjectsPage.tsx           # Project management
│   │   │   └── TasksPage.tsx              # Kanban board
│   │   │
│   │   ├── 📂 components/                 # Reusable Components
│   │   │   ├── Navigation.tsx             # Main navbar
│   │   │   ├── Navigation.test.tsx        # Component test
│   │   │   └── ProtectedRoute.tsx         # Route protection wrapper
│   │   │
│   │   ├── 📂 services/                   # API Communication Layer
│   │   │   ├── apiClient.ts               # Axios instance with interceptors
│   │   │   ├── authService.ts             # Auth API calls
│   │   │   ├── projectService.ts          # Project API calls
│   │   │   └── taskService.ts             # Task API calls
│   │   │
│   │   ├── 📂 hooks/                      # Custom React Hooks
│   │   │   └── useAuth.ts                 # Auth state management
│   │   │
│   │   ├── 📂 types/                      # TypeScript Interfaces
│   │   │   └── index.ts                   # Shared type definitions
│   │   │
│   │   ├── 📂 styles/                     # Global & Component Styles
│   │   │   ├── index.css                  # Global styles
│   │   │   ├── auth.css                   # Login page styles
│   │   │   ├── navigation.css             # Navbar styles
│   │   │   ├── dashboard.css              # Dashboard styles
│   │   │   ├── projects.css               # Projects page styles
│   │   │   └── tasks.css                  # Kanban board styles
│   │   │
│   │   ├── App.tsx                        # Main app component with routing
│   │   └── main.tsx                       # React entry point
│   │
│   ├── index.html                         # HTML entry point
│   ├── package.json                       # Dependencies & scripts
│   ├── tsconfig.json                      # TypeScript config
│   ├── tsconfig.node.json                 # Vite TypeScript config
│   ├── vite.config.ts                     # Vite build configuration
│   ├── vitest.config.ts                   # Test runner config
│   ├── .eslintrc.json                     # Linting rules
│   ├── .env.example                       # Environment variables template
│   ├── Dockerfile                         # Docker image config
│   └── README.md (in root)
│
├── 📂 backend/                            # Express Backend API
│   ├── 📂 src/
│   │   ├── 📂 routes/                     # Express Route Definitions
│   │   │   ├── authRoutes.ts              # Authentication endpoints
│   │   │   ├── projectRoutes.ts           # Project endpoints
│   │   │   └── taskRoutes.ts              # Task endpoints
│   │   │
│   │   ├── 📂 controllers/                # Request Handlers
│   │   │   ├── AuthController.ts          # Auth request handling
│   │   │   ├── ProjectController.ts       # Project request handling
│   │   │   └── TaskController.ts          # Task request handling
│   │   │
│   │   ├── 📂 services/                   # Business Logic Layer
│   │   │   ├── AuthService.ts             # Authentication logic
│   │   │   ├── AuthService.test.ts        # Auth service tests
│   │   │   ├── ProjectService.ts          # Project operations
│   │   │   └── TaskService.ts             # Task operations
│   │   │
│   │   ├── 📂 repositories/               # Data Access Layer
│   │   │   ├── UserRepository.ts          # User database access
│   │   │   ├── ProjectRepository.ts       # Project database access
│   │   │   └── TaskRepository.ts          # Task database access
│   │   │
│   │   ├── 📂 models/                     # Type Definitions
│   │   │   └── types.ts                   # Shared interfaces
│   │   │
│   │   ├── 📂 middleware/                 # Express Middleware
│   │   │   └── authMiddleware.ts          # JWT verification & error handling
│   │   │
│   │   ├── 📂 database/                   # Database Utilities
│   │   │   ├── connection.ts              # PostgreSQL connection pool
│   │   │   └── init.ts                    # Schema initialization & seeding
│   │   │
│   │   ├── app.ts                         # Express app configuration
│   │   └── index.ts                       # Server entry point
│   │
│   ├── package.json                       # Dependencies & scripts
│   ├── tsconfig.json                      # TypeScript config
│   ├── jest.config.js                     # Test runner config
│   ├── .eslintrc.json                     # Linting rules
│   ├── .env.example                       # Environment variables template
│   ├── Dockerfile                         # Docker image config
│   └── README.md (in root)
│
├── 📂 docs/                               # Documentation
│   ├── architecture.md                    # System architecture & design
│   ├── API.md                             # Complete API documentation
│   └── DEVELOPMENT.md                     # Development workflows & tips
│
├── 📂 .claude/                            # Claude Code Configuration
│   └── CLAUDE.md                          # Development context for Claude
│
├── docker-compose.yml                     # Container orchestration
├── .gitignore                             # Git ignore rules
├── .prettierrc                            # Code formatter config
├── .prettierignore                        # Prettier ignore rules
├── README.md                              # Project overview & setup
├── QUICKSTART.md                          # Quick start guide
├── CONTRIBUTING.md                        # Contributing guidelines
└── PROJECT_STRUCTURE.md                   # This file
```

## File Statistics

### Frontend
- **Pages**: 4 (Login, Dashboard, Projects, Tasks)
- **Components**: 3 (Navigation, ProtectedRoute)
- **Services**: 4 (API client, Auth, Projects, Tasks)
- **Hooks**: 1 (useAuth)
- **Styles**: 6 CSS files
- **Tests**: 2 test files
- **Configuration**: 6 files (tsconfig, vite, eslint, etc.)

### Backend
- **Routes**: 3 files (auth, projects, tasks)
- **Controllers**: 3 files (Auth, Projects, Tasks)
- **Services**: 4 files (Auth, Projects, Tasks with tests)
- **Repositories**: 3 files (Users, Projects, Tasks)
- **Middleware**: 1 file (Auth & Error handling)
- **Database**: 2 files (Connection, Initialization)
- **Configuration**: 5 files (tsconfig, jest, eslint, etc.)

### Documentation
- **API Reference**: Complete endpoint documentation
- **Architecture Guide**: System design and patterns
- **Development Guide**: Workflows and best practices
- **Contributing Guide**: How to contribute
- **Quick Start**: Fast setup instructions

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Projects Table
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

### Tasks Table
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

### Indexes
- `users.username` - UNIQUE
- `projects.user_id` - Indexed
- `tasks.project_id` - Indexed
- `tasks.status` - Indexed

## Seed Data

The database includes sample data:
- 1 User: `demo` / `demo`
- 3 Projects: Website Redesign, Mobile App, API Improvements
- 9 Tasks: Mix of todo, in_progress, and done statuses

## API Overview

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Projects (CRUD)
- `GET /api/projects` - List all
- `GET /api/projects/:id` - Get one
- `GET /api/projects/user/me` - User's projects
- `POST /api/projects` - Create
- `PUT /api/projects/:id` - Update
- `DELETE /api/projects/:id` - Delete

### Tasks (CRUD + Status)
- `GET /api/tasks` - List all
- `GET /api/tasks/:id` - Get one
- `GET /api/tasks/project/:projectId` - By project
- `GET /api/tasks/stats/dashboard` - Statistics
- `POST /api/tasks` - Create
- `PUT /api/tasks/:id` - Update
- `PUT /api/tasks/:id/status` - Update status
- `DELETE /api/tasks/:id` - Delete

## Technology Stack Details

### Frontend Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI framework |
| TypeScript | 5.3.3 | Type safety |
| Vite | 5.0.8 | Build tool |
| React Router | 6.20.0 | Routing |
| Axios | 1.6.4 | HTTP client |
| Vitest | 1.0.4 | Test runner |

### Backend Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | Runtime |
| Express | 4.18.2 | Web framework |
| TypeScript | 5.3.3 | Type safety |
| PostgreSQL | 15 | Database |
| pg | 8.11.3 | DB driver |
| bcrypt | 5.1.1 | Password hashing |
| JWT | 9.1.2 | Authentication |
| Jest | 29.7.0 | Test runner |

### Infrastructure
| Technology | Purpose |
|------------|---------|
| Docker | Containerization |
| Docker Compose | Orchestration |
| PostgreSQL | Persistent data |

## Architecture Patterns

### Backend Layered Architecture
```
HTTP Request
    ↓
Routes (Express routing)
    ↓
Middleware (Auth, errors)
    ↓
Controllers (Validation)
    ↓
Services (Business logic)
    ↓
Repositories (Database)
    ↓
PostgreSQL
```

### Frontend Component Architecture
```
App (Router)
    ├── Pages (Full screens)
    │   ├── Components
    │   ├── Hooks (State)
    │   └── Services (API)
    └── Navigation
```

## Configuration Files

### Backend Configuration
- `tsconfig.json` - TypeScript strict mode enabled
- `jest.config.ts` - Unit testing configuration
- `.eslintrc.json` - ESLint rules
- `package.json` - Dependencies and scripts
- `.env.example` - Environment variable template
- `Dockerfile` - Production image

### Frontend Configuration
- `tsconfig.json` - TypeScript strict mode
- `vite.config.ts` - Vite bundler settings
- `vitest.config.ts` - Test runner setup
- `.eslintrc.json` - ESLint + React rules
- `package.json` - Dependencies and scripts
- `.env.example` - Environment variable template
- `Dockerfile` - Multi-stage production build

### Root Configuration
- `.gitignore` - Git ignore patterns
- `.prettierrc` - Code formatter config
- `.prettierignore` - Prettier ignore patterns
- `docker-compose.yml` - Container orchestration

## Development Workflow

### Local Development
```bash
# Backend terminal
cd backend && npm run dev

# Frontend terminal
cd frontend && npm run dev

# Database (first time)
cd backend && npm run db:init
```

### Docker Development
```bash
docker-compose up --build
docker-compose exec backend npm run db:init
```

### Testing
```bash
# Backend unit tests
cd backend && npm run test

# Frontend component tests
cd frontend && npm run test
```

### Code Quality
```bash
# Linting
npm run lint

# Formatting
npm run format
```

## Key Features

✅ **User Authentication**
- JWT-based stateless auth
- Secure password hashing with bcrypt
- Automatic token refresh

✅ **Project Management**
- Create projects with descriptions
- User-based project ownership
- Full CRUD operations

✅ **Task Management**
- Organize tasks by status (Todo, In Progress, Done)
- Kanban board view
- Quick status updates

✅ **Dashboard**
- Project statistics
- Task overview
- Status breakdown

✅ **Security**
- Password hashing
- JWT token validation
- SQL injection prevention
- CORS protection

✅ **Code Quality**
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Testing examples

✅ **Documentation**
- Complete API reference
- Architecture guide
- Development guide
- Contributing guide

## Deployment Ready

### Docker Images
- **Frontend**: Multi-stage build for optimized size
- **Backend**: Production-ready Node.js image
- **Database**: PostgreSQL 15 Alpine image

### Environment Configuration
- Development configuration included
- Production configuration ready
- Security considerations documented

## Extensibility

The architecture supports adding:
- Task assignment and comments
- Labels and filtering
- User roles and permissions
- Notifications
- Audit logging
- Real-time updates
- Advanced search
- File attachments
- Sprint planning

## Quality Metrics

- **Code Coverage**: Example tests included
- **Type Safety**: TypeScript strict mode
- **Code Style**: ESLint + Prettier
- **Documentation**: Comprehensive guides
- **Test Examples**: Unit & component tests

## Getting Started

1. **Quick Start**: Read `QUICKSTART.md`
2. **Full Setup**: Follow `README.md`
3. **Architecture**: Review `docs/architecture.md`
4. **API Reference**: See `docs/API.md`
5. **Development**: Check `docs/DEVELOPMENT.md`
6. **Contributing**: View `CONTRIBUTING.md`

## Version Information

- **Version**: 1.0.0
- **Status**: Stable
- **Created**: 2024
- **License**: MIT

## Next Steps for Users

1. ✅ Clone or download the repository
2. ✅ Follow QUICKSTART.md to set up
3. ✅ Explore the application
4. ✅ Review the documentation
5. ✅ Understand the architecture
6. ✅ Start developing features

---

**Total Development Time**: Complete starter application ready for training, demonstration, and expansion.

**Ready to build?** Start with `QUICKSTART.md` or `README.md` 🚀
