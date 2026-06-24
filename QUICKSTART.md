# TaskFlow Quick Start Guide

Get TaskFlow running in 5 minutes!

## Option 1: Local Development (Recommended for Development)

Runs PostgreSQL in Docker and the backend/frontend directly with `npm` for fast hot-reload. No local PostgreSQL install needed.

### Prerequisites
- Node.js 18+
- npm
- Docker (for PostgreSQL only)

### Steps

1. **Clone and Navigate**
   ```bash
   git clone https://github.com/sahil7879/taskflow_codebase.git
   cd taskflow-codebase
   ```

2. **Start PostgreSQL in Docker**
   ```bash
   docker run -d --name taskflow-db \
     -e POSTGRES_DB=taskflow \
     -e POSTGRES_USER=taskflow \
     -e POSTGRES_PASSWORD=taskflow \
     -p 5432:5432 \
     postgres:15-alpine
   ```

3. **Setup Backend** (new terminal)
   ```bash
   cd backend
   npm install
   cp .env.example .env
   npm run dev
   ```
   The backend automatically creates the schema and seeds the demo data on startup.

4. **Setup Frontend** (new terminal)
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   npm run dev
   ```

5. **Access the App**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api
   - Demo login: `demo` / `demo`

## Option 2: Docker (Easiest Setup)

### Prerequisites
- Docker
- Docker Compose

### Steps

1. **Start Services**
   ```bash
   docker-compose up --build
   ```
   The backend automatically creates the schema and seeds the demo data on startup — no manual init step needed.

2. **Access the App**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api
   - Demo login: `demo` / `demo`

3. **Stop Services**
   ```bash
   docker-compose down
   ```

## What's Included

✅ **Frontend**
- React 18 with TypeScript
- Modern UI with navigation
- Pages: Login, Dashboard, Projects, Tasks
- Kanban board for task management

✅ **Backend**
- Express REST API
- JWT authentication
- PostgreSQL integration
- Layered architecture (routes → controllers → services → repositories)

✅ **Database**
- PostgreSQL with seed data
- 3 tables: users, projects, tasks
- Sample projects and tasks included

✅ **Documentation**
- Architecture guide (`docs/architecture.md`)
- API documentation (`docs/API.md`)
- Development guide (`docs/DEVELOPMENT.md`)
- Contributing guidelines (`CONTRIBUTING.md`)

## Common Commands

### Backend
```bash
cd backend

npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Run production build
npm run test         # Run tests
npm run lint         # Check code style
npm run format       # Format code
npm run db:init      # Re-run schema/seed manually (runs automatically on `npm run dev`)
```

### Frontend
```bash
cd frontend

npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run tests
npm run lint         # Check code style
npm run format       # Format code
```

### Docker
```bash
docker-compose up            # Start all services
docker-compose up --build    # Rebuild images
docker-compose down          # Stop services
docker-compose logs -f       # View logs
docker-compose exec backend npm run db:init  # Initialize database
```

## Demo Credentials

```
Username: demo
Password: demo
```

The database comes pre-seeded with:
- 1 demo user
- 3 sample projects
- 9 sample tasks across multiple statuses

## File Structure

```
taskflow-codebase/
├── frontend/              # React application
│   ├── src/
│   │   ├── pages/        # Login, Dashboard, Projects, Tasks
│   │   ├── components/   # Navigation, ProtectedRoute
│   │   ├── services/     # API communication
│   │   ├── hooks/        # useAuth
│   │   ├── types/        # TypeScript interfaces
│   │   └── styles/       # CSS files
│   └── Dockerfile
│
├── backend/               # Express API
│   ├── src/
│   │   ├── routes/       # Endpoint definitions
│   │   ├── controllers/  # Request handlers
│   │   ├── services/     # Business logic
│   │   ├── repositories/ # Data access
│   │   ├── models/       # Type definitions
│   │   ├── middleware/   # Auth, error handling
│   │   └── database/     # Connection, init
│   └── Dockerfile
│
├── docker-compose.yml     # Container orchestration
├── docs/                  # Documentation
└── README.md             # Full documentation
```

## Architecture Overview

```
Frontend (React)
    ↓ (HTTP REST + JWT)
Backend (Express)
    ↓ (SQL)
Database (PostgreSQL)
```

## Next Steps

1. **Explore the UI** - Navigate through pages and features
2. **Read Documentation** - Check `README.md` and `docs/`
3. **Look at Code** - Understand the layered architecture
4. **Try the API** - Use curl or Postman to test endpoints
5. **Add Features** - Follow `CONTRIBUTING.md` to add new features

## Troubleshooting

### Port Already in Use
```bash
# Find process on port 3000 or 5000
lsof -i :3000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

### Database Connection Failed
```bash
# Reset database
docker-compose down -v
docker-compose up -d
docker-compose exec backend npm run db:init
```

### Dependencies Issues
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Can't Connect to API
- Check backend is running on port 5000
- Check `VITE_API_BASE_URL` in frontend `.env`
- Check no firewall blocking connections

## API Endpoints

**Public:**
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/health` - Health check

**Requires Authentication:**
- `GET /api/projects` - List projects
- `POST /api/projects` - Create project
- `GET /api/tasks` - List tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id/status` - Update task status

See `docs/API.md` for full API documentation.

## Environment Variables

**Backend (.env):**
```
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=taskflow
DB_USER=taskflow
DB_PASSWORD=taskflow
JWT_SECRET=dev-secret
JWT_EXPIRY=7d
```

**Frontend (.env):**
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Performance Tips

- **Development**: Use hot reload with `npm run dev`
- **Production**: Build with `npm run build` then deploy
- **Database**: Indexes are already added for common queries
- **Frontend**: Code is optimized with Vite bundler

## Security Notes

- Passwords are hashed with bcrypt
- Authentication uses JWT tokens
- Database credentials are in `.env` (never commit this file)
- Change JWT_SECRET in production

## Support

- **Documentation**: See `README.md` and `docs/` folder
- **Issues**: Check GitHub issues or open a new one
- **Contributing**: Follow `CONTRIBUTING.md`

## License

MIT License

---

**Ready to develop?** 

Start with:
```bash
docker-compose up --build
docker-compose exec backend npm run db:init
```

Then visit http://localhost:3000 🚀
