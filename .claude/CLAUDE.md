# Claude Code Configuration for TaskFlow

## Project Overview

TaskFlow is a full-stack Jira-style project management application. This document provides context for Claude Code to effectively work with the codebase.

## Codebase Structure

- **backend/**: Node.js Express API with PostgreSQL
- **frontend/**: React + TypeScript SPA with Vite
- **docker-compose.yml**: Local development environment
- **docs/**: Architecture and setup documentation

## Key Technologies

- Frontend: React 18, TypeScript, Vite, React Router
- Backend: Node.js, Express, TypeScript, PostgreSQL
- Database: PostgreSQL 15
- Infrastructure: Docker, Docker Compose

## Architecture Patterns

The backend follows a clean layered architecture:
1. **Routes** → HTTP endpoints
2. **Controllers** → Request handling
3. **Services** → Business logic
4. **Repositories** → Data access
5. **Models** → Type definitions

Frontend architecture:
1. **Pages** → Screen-level components
2. **Components** → Reusable UI elements
3. **Services** → API communication
4. **Hooks** → State management
5. **Types** → TypeScript interfaces

## Development Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 15 (or Docker)
- npm

### Quick Start
```bash
# Backend
cd backend && npm install && npm run dev

# Frontend (new terminal)
cd frontend && npm install && npm run dev

# Initialize database
cd backend && npm run db:init
```

### Docker
```bash
docker-compose up --build
docker-compose exec backend npm run db:init
```

## Important Files

- **Backend API**: `backend/src/app.ts` - Express app setup
- **Frontend App**: `frontend/src/App.tsx` - React routing
- **Database Init**: `backend/src/database/init.ts` - Schema and seeds
- **Documentation**: `docs/architecture.md` - Detailed architecture
- **Docker**: `docker-compose.yml` - Container orchestration

## API Overview

- **Auth**: POST `/api/auth/login`, POST `/api/auth/register`
- **Projects**: GET/POST/PUT/DELETE `/api/projects`
- **Tasks**: GET/POST/PUT/DELETE `/api/tasks`
- **Health**: GET `/api/health`

## Database

PostgreSQL with three main tables:
- **users**: User accounts with hashed passwords
- **projects**: Projects linked to users
- **tasks**: Tasks linked to projects (status: todo/in_progress/done)

Demo user: `username: demo`, `password: demo`

## Code Quality

- ESLint for code style
- Prettier for formatting
- TypeScript strict mode enabled
- Tests: Jest (backend), Vitest (frontend)

## Common Tasks

### Add a new API endpoint
1. Create route in `backend/src/routes/`
2. Add controller method in `backend/src/controllers/`
3. Add service logic in `backend/src/services/`
4. Add repository method if needed in `backend/src/repositories/`

### Add a new frontend page
1. Create page component in `frontend/src/pages/`
2. Add route in `frontend/src/App.tsx`
3. Add navigation link in `frontend/src/components/Navigation.tsx`

### Modify database schema
1. Update `backend/src/database/init.ts`
2. Clear database and reinitialize
3. Update type definitions in `backend/src/models/types.ts`

## Environment Variables

Backend: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `JWT_SECRET`, `PORT`
Frontend: `VITE_API_BASE_URL`

See `.env.example` files for templates.

## Deployment

Applications are containerized and ready for Docker deployment:
- Frontend builds to static files
- Backend runs as Node.js process
- PostgreSQL persistent volume

## Current Version

Version 1.0.0 - Stable starter project with core functionality

## Future Enhancements

Planned features for v2:
- Task assignment and comments
- Labels and filtering
- User roles and RBAC
- Notifications
- Sprint planning
- Enhanced testing

## Support Resources

- Architecture: `docs/architecture.md`
- README: `README.md`
- API endpoints in controllers
- Type definitions in `*/types/` directories

## Tips for Working with Claude Code

1. **Type Safety**: Leverage TypeScript strict mode for refactoring
2. **Layered Architecture**: Understand the request flow through layers
3. **Database Changes**: Schema updates require repository method updates
4. **Frontend State**: Services handle API communication, hooks handle state
5. **Error Handling**: Consistent error handling pattern through middleware

## Git Workflow

- Branch from `main` for features
- Keep commits focused and descriptive
- Include related changes together
- Test locally before pushing

---

Last Updated: 2024
Version: 1.0.0
