# Contributing to TaskFlow

Thank you for your interest in contributing to TaskFlow! This guide will help you understand how to work with the codebase effectively.

## Code of Conduct

Be respectful and constructive in all interactions. We're building this together.

## Getting Started

### 1. Fork and Clone
```bash
git clone https://github.com/yourusername/taskflow-codebase.git
cd taskflow-codebase
```

### 2. Set Up Development Environment
```bash
# Backend
cd backend
npm install
cp .env.example .env

# Frontend
cd ../frontend
npm install
cp .env.example .env

# Initialize database
cd ../backend
npm run db:init
```

### 3. Start Development Servers
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

Visit http://localhost:3000 to see the application.

## Development Workflow

### 1. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

Use descriptive branch names:
- `feature/add-task-labels`
- `fix/auth-token-expiry`
- `docs/update-api-docs`

### 2. Make Changes

Follow the existing code style and architecture:

**Backend Changes:**
- Add routes to `backend/src/routes/`
- Update controllers in `backend/src/controllers/`
- Implement logic in `backend/src/services/`
- Add data access in `backend/src/repositories/`
- Update types in `backend/src/models/types.ts`

**Frontend Changes:**
- Add pages to `frontend/src/pages/`
- Create reusable components in `frontend/src/components/`
- Add API calls to `frontend/src/services/`
- Define types in `frontend/src/types/`
- Add styles to `frontend/src/styles/`

### 3. Code Quality

#### Linting
```bash
# Backend
cd backend
npm run lint

# Frontend
cd frontend
npm run lint
```

#### Formatting
```bash
# Backend
cd backend
npm run format

# Frontend
cd frontend
npm run format
```

### 4. Testing

#### Backend Tests
```bash
cd backend
npm run test
npm run test:watch
```

#### Frontend Tests
```bash
cd frontend
npm run test
```

Write tests for new features and ensure existing tests pass.

### 5. Commit Changes

Write clear, descriptive commit messages:

```bash
git add .
git commit -m "Add task labels feature

- Add label field to tasks table
- Implement label service and repository
- Create label management UI
- Add tests for label functionality"
```

Good commit messages:
- Start with a clear subject line (50 chars or less)
- Leave a blank line
- Add detailed description if needed
- Reference related issues: `Fixes #123`

### 6. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a PR on GitHub with:
- Clear title summarizing changes
- Description of what was changed and why
- Link to related issues
- Screenshots for UI changes
- Test results

## Code Style Guidelines

### TypeScript

```typescript
// Use strict types
const getUserId = (id: number): User | null => {
  // implementation
};

// Avoid any
const data: any = result; // BAD
const data: Record<string, unknown> = result; // GOOD

// Use interfaces for complex types
interface TaskFilters {
  status?: string;
  projectId?: number;
}

// Use const for immutability
const config = { /* ... */ };
```

### React Components

```typescript
// Use functional components
export const MyComponent = () => {
  const [state, setState] = useState<string>('');
  
  return (
    <div>
      {/* content */}
    </div>
  );
};

// Extract complex logic to hooks
export const useMyCustomLogic = () => {
  // logic here
};
```

### Naming Conventions

- **Files**: Use camelCase for most files, PascalCase for React components
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE for true constants
- **Functions**: camelCase for utility functions, PascalCase for React components
- **Classes**: PascalCase
- **Database fields**: snake_case

### Comments

Only add comments for non-obvious logic:

```typescript
// GOOD: Explains why, not what
// JWT token expires after 7 days, refresh on login
const tokenExpiry = '7d';

// BAD: Obvious from code
// Get user ID
const userId = user.id;
```

## Architecture Guidelines

### Backend Layers

```
Request → Routes → Controllers → Services → Repositories → Database
```

Each layer has a specific responsibility:
- **Routes**: Define endpoints
- **Controllers**: Validate and handle requests
- **Services**: Implement business logic
- **Repositories**: Handle database access

### Frontend Layers

```
UI → Pages/Components → Services → Data Models
```

- **Pages**: Full screen components
- **Components**: Reusable UI pieces
- **Services**: API communication
- **Hooks**: State and side effects

## Database Changes

When modifying the database schema:

1. Update `backend/src/database/init.ts`
2. Update type definitions in `backend/src/models/types.ts`
3. Add/update repository methods
4. Add/update service logic
5. Create migration or init script
6. Test with fresh database

```bash
# Reset database
npm run db:init
```

## Adding New Features

### Example: Add Task Priority

1. **Database**: Add priority column to tasks table
2. **Types**: Update Task interface with priority field
3. **Repository**: Add methods to query by priority
4. **Service**: Add business logic for priority
5. **Controller**: Add endpoint handlers
6. **Routes**: Define new endpoints
7. **Frontend**: Create UI components and services
8. **Tests**: Write tests for new functionality
9. **Docs**: Update API documentation

## Documentation

- Update `README.md` for setup changes
- Update `docs/architecture.md` for design changes
- Update `docs/API.md` for new endpoints
- Add inline comments for complex logic
- Keep code self-documenting with clear names

## Testing Guidelines

### Backend Tests

```typescript
describe('UserRepository', () => {
  it('should find user by username', async () => {
    const user = await userRepository.findByUsername('demo');
    expect(user).toBeDefined();
    expect(user?.username).toBe('demo');
  });
});
```

### Frontend Tests

```typescript
describe('TaskCard', () => {
  it('should render task title', () => {
    const { getByText } = render(
      <TaskCard task={mockTask} />
    );
    expect(getByText('Create wireframes')).toBeDefined();
  });
});
```

Aim for:
- Unit tests for services and utilities
- Integration tests for APIs
- Component tests for UI
- E2E tests for critical user flows

## Performance Considerations

- Minimize database queries (use JOINs, avoid N+1)
- Cache frequently accessed data
- Lazy load components in React
- Optimize bundle size
- Use indexes for frequently queried fields

## Security Considerations

- Never commit `.env` files or secrets
- Hash passwords with bcrypt
- Use parameterized queries to prevent SQL injection
- Validate and sanitize user input
- Use HTTPS in production
- Implement rate limiting for sensitive endpoints
- Keep dependencies updated

## Deployment

Changes are deployed via Docker:

```bash
docker-compose up --build
```

Test locally first:
1. Start fresh database
2. Run all tests
3. Test manually in browser
4. Check logs for errors

## Common Tasks

### Add a new API endpoint

1. Create route in `routes/`
2. Add controller method
3. Add service method
4. Add repository method if needed
5. Update types
6. Write tests
7. Update API documentation

### Add a new page

1. Create page component in `pages/`
2. Add route in `App.tsx`
3. Add navigation link
4. Style the page
5. Write tests

### Update database schema

1. Modify `database/init.ts`
2. Update types
3. Update repositories
4. Run `npm run db:init`
5. Test thoroughly

## Troubleshooting

### Database connection issues
```bash
# Check PostgreSQL is running
docker-compose ps

# Reset database
docker-compose exec backend npm run db:init
```

### Port already in use
```bash
# Find process on port 3000
lsof -i :3000
kill -9 <PID>
```

### Dependencies issues
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Getting Help

- Check existing documentation in `docs/`
- Review similar existing code
- Open an issue with questions
- Ask in pull request comments

## Review Process

1. All PRs require code review
2. CI tests must pass
3. No conflicts with main branch
4. Code follows style guidelines
5. Includes tests and documentation

## Release Process

1. Bump version number
2. Update CHANGELOG
3. Create release tag
4. Deploy to production

## Questions?

Open an issue or check the documentation:
- `docs/architecture.md` - System design
- `docs/API.md` - API endpoints
- `README.md` - General setup
- `.claude/CLAUDE.md` - Development context

Thank you for contributing! 🎉
