# Development Guide for TaskFlow

This guide provides practical tips and workflows for developing TaskFlow.

## Quick Reference

### Start Development

```bash
# Terminal 1: Start backend
cd backend && npm run dev

# Terminal 2: Start frontend
cd frontend && npm run dev

# Terminal 3: Initialize database (if needed)
cd backend && npm run db:init
```

### With Docker

```bash
# Start all services
docker-compose up --build

# Initialize database
docker-compose exec backend npm run db:init

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop services
docker-compose down
```

## Common Workflows

### Adding a New API Endpoint

1. **Define the route** in `backend/src/routes/`
   ```typescript
   router.get('/tasks/:id', (req, res) => taskController.getById(req, res));
   ```

2. **Implement the controller** in `backend/src/controllers/`
   ```typescript
   async getById(req, res) {
     try {
       const task = await taskService.getTaskById(parseInt(req.params.id));
       res.json(task);
     } catch (error) {
       res.status(404).json({ error: error.message });
     }
   }
   ```

3. **Add service logic** in `backend/src/services/`
   ```typescript
   async getTaskById(id: number): Promise<Task> {
     const task = await taskRepository.findById(id);
     if (!task) throw new Error('Task not found');
     return task;
   }
   ```

4. **Add repository method** in `backend/src/repositories/` (if needed)
   ```typescript
   async findById(id: number): Promise<Task | null> {
     const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
     return result.rows[0] || null;
   }
   ```

5. **Update types** in `backend/src/models/types.ts`

6. **Test the endpoint**
   ```bash
   curl http://localhost:5000/api/tasks/1
   ```

### Adding a New Frontend Page

1. **Create the page component** in `frontend/src/pages/`
   ```typescript
   // frontend/src/pages/NewPage.tsx
   import { useEffect, useState } from 'react';
   
   export const NewPage = () => {
     const [data, setData] = useState(null);
     
     useEffect(() => {
       // Fetch data
     }, []);
     
     return <div>{/* Page content */}</div>;
   };
   ```

2. **Add service methods** in `frontend/src/services/`
   ```typescript
   export const newService = {
     async fetchData() {
       const { data } = await apiClient.get('/endpoint');
       return data;
     },
   };
   ```

3. **Add route** in `frontend/src/App.tsx`
   ```typescript
   <Route path="/new-page" element={<NewPage />} />
   ```

4. **Add navigation link** in `frontend/src/components/Navigation.tsx`
   ```typescript
   <li><Link to="/new-page">New Page</Link></li>
   ```

5. **Add styles** in `frontend/src/styles/`
   ```css
   .new-page { /* styles */ }
   ```

### Modifying Database Schema

1. **Update schema** in `backend/src/database/init.ts`
   ```typescript
   CREATE TABLE IF NOT EXISTS new_table (
     id SERIAL PRIMARY KEY,
     // columns...
   );
   ```

2. **Update types** in `backend/src/models/types.ts`
   ```typescript
   export interface NewTable {
     id: number;
     // fields...
   }
   ```

3. **Create repository** or update existing in `backend/src/repositories/`

4. **Reinitialize database**
   ```bash
   cd backend
   npm run db:init
   ```

## Testing

### Backend Unit Tests

```bash
cd backend
npm run test
npm run test:watch
```

Example test:
```typescript
describe('TaskService', () => {
  it('should create a task', async () => {
    const task = await taskService.createTask(1, 'Test', null);
    expect(task.title).toBe('Test');
  });
});
```

### Frontend Component Tests

```bash
cd frontend
npm run test
```

Example test:
```typescript
import { render, screen } from '@testing-library/react';
import { DashboardPage } from './DashboardPage';

describe('DashboardPage', () => {
  it('should render dashboard', () => {
    render(<DashboardPage />);
    expect(screen.getByText('Dashboard')).toBeDefined();
  });
});
```

## Debugging

### Backend Debugging

1. **Enable verbose logging** in your code:
   ```typescript
   console.log('DEBUG:', variable);
   console.error('ERROR:', error);
   ```

2. **Check server logs**:
   ```bash
   docker-compose logs -f backend
   ```

3. **Use VS Code debugger**:
   - Install Debugger for Chrome
   - Add breakpoints
   - Run `npm run dev` with debugger attached

### Frontend Debugging

1. **Use browser DevTools**:
   - F12 or Cmd+Option+I
   - Console tab for logs
   - Network tab for API calls
   - Sources tab for breakpoints

2. **React DevTools**:
   - Install React DevTools browser extension
   - Inspect component props and state

3. **API calls debugging**:
   - Check Network tab in DevTools
   - Look for 401, 404, or 500 responses
   - Check Authorization header is present

## Performance Optimization

### Backend

1. **Database queries**: Use indexes on frequently searched columns
   ```sql
   CREATE INDEX idx_tasks_project_id ON tasks(project_id);
   ```

2. **Caching**: Add Redis for frequently accessed data (future enhancement)

3. **Query optimization**: Use JOINs instead of N+1 queries

### Frontend

1. **Code splitting**: Lazy load routes
   ```typescript
   const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));
   ```

2. **Memoization**: Use `React.memo()` for expensive components
   ```typescript
   export const TaskCard = React.memo(({ task }) => {
     return <div>{task.title}</div>;
   });
   ```

3. **Bundle analysis**: Check what's in your bundle
   ```bash
   npm run build -- --analyze
   ```

## Code Style

### TypeScript

```typescript
// Good: Type everything
const getUserTasks = async (userId: number): Promise<Task[]> => {
  return taskService.getTasksByUserId(userId);
};

// Avoid: Any types
const getUserTasks = async (userId: any): Promise<any> => {
  return taskService.getTasksByUserId(userId);
};
```

### React

```typescript
// Good: Functional component with hooks
export const TaskList = ({ tasks }: { tasks: Task[] }) => {
  const [filtered, setFiltered] = useState<Task[]>(tasks);
  
  return <div>{filtered.map(t => <TaskCard key={t.id} task={t} />)}</div>;
};

// Avoid: Class components (unless necessary)
class TaskList extends React.Component { /* ... */ }
```

### CSS

```css
/* Good: Descriptive class names */
.kanban-column {
  display: flex;
}

/* Avoid: Generic names */
.container { /* ... */ }
.col { /* ... */ }
```

## Git Workflow

### Before Starting

```bash
# Update main branch
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/my-feature
```

### During Development

```bash
# Stage changes
git add src/myfile.ts

# Commit with descriptive message
git commit -m "Add task labels feature"

# Push regularly
git push origin feature/my-feature
```

### Creating Pull Request

1. Push your branch
2. Go to GitHub
3. Create PR with clear title and description
4. Link related issues: `Fixes #123`
5. Wait for review

### After Review

```bash
# Update with feedback
git add .
git commit -m "Address review feedback"
git push origin feature/my-feature

# After approval, merge to main
git checkout main
git pull origin main
git merge feature/my-feature
git push origin main
```

## Environment Variables

### Backend .env

```env
# Server
NODE_ENV=development
PORT=5000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=taskflow
DB_USER=taskflow
DB_PASSWORD=taskflow

# JWT
JWT_SECRET=dev-secret-change-in-production
JWT_EXPIRY=7d
```

### Frontend .env

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Project Dependencies

### Backend Key Dependencies

- `express` - Web framework
- `pg` - PostgreSQL driver
- `bcrypt` - Password hashing
- `jsonwebtoken` - JWT authentication
- `dotenv` - Environment variables

### Frontend Key Dependencies

- `react` - UI library
- `react-router-dom` - Routing
- `axios` - HTTP client
- `vite` - Build tool

## Docker Workflow

### Building Images

```bash
# Build specific service
docker-compose build backend
docker-compose build frontend

# Rebuild with no cache
docker-compose build --no-cache
```

### Inspecting Containers

```bash
# View logs
docker-compose logs backend
docker-compose logs -f backend  # Follow logs

# Execute command in container
docker-compose exec backend npm run lint

# Access container shell
docker-compose exec backend sh
```

### Database Management

```bash
# Connect to database
docker-compose exec postgres psql -U taskflow -d taskflow

# View tables
\dt

# Exit psql
\q

# Backup database
docker-compose exec postgres pg_dump -U taskflow taskflow > backup.sql

# Restore database
docker-compose exec -T postgres psql -U taskflow taskflow < backup.sql
```

## Troubleshooting

### Port Already in Use

```bash
# Find process
lsof -i :3000
lsof -i :5000

# Kill process
kill -9 <PID>
```

### Database Connection Failed

```bash
# Check database is running
docker-compose ps postgres

# Reset database
docker-compose down -v  # Remove volumes
docker-compose up -d
docker-compose exec backend npm run db:init
```

### Module Not Found

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors

Check backend is running and API_BASE_URL in frontend is correct.

## Performance Tips

1. **Development**: Use `npm run dev` for hot reload
2. **Production**: Build with `npm run build`
3. **Database**: Add indexes for common queries
4. **Caching**: Use HTTP caching headers
5. **Bundling**: Keep bundle size small

## Security Tips

1. **Secrets**: Never commit `.env` files
2. **Input validation**: Validate all user input
3. **SQL injection**: Use parameterized queries
4. **XSS**: Sanitize user-generated content
5. **CORS**: Configure properly for production

## Resources

- [Express Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Docker Documentation](https://docs.docker.com/)

## Getting Help

1. Check existing issues
2. Review documentation in `docs/`
3. Look at similar code
4. Ask in pull request comments
5. Open a new issue

---

Happy coding! 🚀
